<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Button type="primary" @click="add()">添加</Button>
        <Button type="info" @click="edit()">修改</Button>
        <Button type="warning" @click="del()">删除</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          highlight-row
          @on-row-click="onClickRow"
          :columns="columns6"
          :data="data"
        ></Table>
      </Col>
    </Row>

    <Row style="margin-top: 15px">
      <Page
        :total="total"
        show-elevator
        show-total
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <bangdingzhengshu
      v-model="kcShow"
      :zsid="showzsid"
      v-on:handleSearch="getzhengshulistPage"
    ></bangdingzhengshu>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import bangdingzhengshu from "@/components/jiaowuManage/stuKecheng/bangdingzhengshu";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    bangdingzhengshu,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      checkList: [],
      dolist: {
        ids: "",
      },
      kcShow: false,
      showzsid: "",

      allkecheng: [],
      checkIn: [],
      bdkcID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        zsName: "",
      },
      checkAll: false,
      columns6: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.data.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "证书名称",
          key: "zsName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "证书名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.zsName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "绑定课程",
          key: "kcCount",
          align: "center",
          render: (h, params) => {
            if (params.row.kcCount == 0) {
              return h("div", "-");
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.lookBDkc(params);
                      },
                    },
                  },
                  params.row.kcCount + "-详情"
                ),
              ]);
            }
          },
        },
        {
          title: "操作",
          key: "caozuo",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "primary",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.OnbangDingZs(params);
                    },
                  },
                },
                "编辑/绑定课程"
              ),
            ]);
          },
        },
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getzhengshulistPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/buxikecheng/getzhengshuPage", this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);

          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },

    /**选中的数据 */
    addlist() {
      this.checkIn = [];
      this.checkList = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkIn = items;
          this.checkList.push({
            id: items.id,
          });
        }
      });
      this.dolist.ids = JSON.stringify(this.checkList);
    },
    /**添加 */
    add() {
      this.$Modal.confirm({
        title: "添加证书",
        width: 30,
        closable: true,
        render: (h) => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: "请输入证书名称",
            },
            on: {
              input: (val) => {
                this.value = val;
              },
            },
          });
        },
        onOk: () => {
          api
            .post("xwcloud-stu/stu/buxikecheng/addZs", { zsName: this.value })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getzhengshulistPage();
              } else {
                this.$Message.error(res.msg);
              }
            });
        },
        onCancel: () => {},
      });
    },
    /**修改 */
    edit() {
      this.addlist();
      setTimeout(() => {
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要修改的数据");
        } else if (this.checkList.length > 1) {
          this.$Message.error("请选择一行");
        } else {
          this.$Modal.confirm({
            title: "修改证书",
            width: 30,
            closable: true,
            render: (h) => {
              return h("Input", {
                props: {
                  value: this.checkIn.zsName,
                  autofocus: true,
                  placeholder: "请输入新的证书名称",
                },
                on: {
                  input: (val) => {
                    this.value = val;
                  },
                },
              });
            },
            onOk: () => {
              api
                .post("xwcloud-stu/stu/buxikecheng/updateZsList", {
                  id: this.checkList[0].id,
                  zsName: this.value,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getzhengshulistPage();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            },
            onCancel: () => {},
          });
        }
      }, 100);
    },
    del() {
      this.addlist();
      setTimeout(() => {
        //确保执行过addstulist
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.$Modal.confirm({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            onOk: () => {
              api.del("xwcloud-stu/stu/buxikecheng/delZs", this.dolist).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getzhengshulistPage();
                } else {
                  this.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
    OnbangDingZs(value) {
      let zsid = value.row.id;
      api.get("xwcloud-stu/stu/buxikecheng/getnewkcInfo", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allkecheng = res.obj;
          this.$Modal.confirm({
            title: "编辑绑定证书",
            render: (h) => {
              return h("div", [
                h(
                  "p",
                  {
                    style: { margin: "10px" },
                  },
                  "课程名称"
                ),
                h(
                  "Select",
                  {
                    props: {
                      filterable: true,
                    },
                    on: {
                      "on-change": (val) => {
                        this.bdkcID = val;
                      },
                    },
                  },
                  this.allkecheng.map((item) => {
                    return h("Option", {
                      props: { value: item.id, label: item.name },
                    });
                  })
                ),
              ]);
            },
            onOk: () => {
              console.log(zsid);
              console.log(this.bdkcID);
              api
                .post("xwcloud-stu/stu/buxikecheng/bangDingZs", {
                  zsID: zsid,
                  kcID: this.bdkcID,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getzhengshulistPage();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            },
            onCancel: () => {},
          });
        }
      });
    },
    lookBDkc(value) {
      this.showzsid = value.row.id;
      this.kcShow = true;
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuName = "";
      this.params.FZstate = -1;
      this.getzhengshulistPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getzhengshulistPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getzhengshulistPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getzhengshulistPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getzhengshulistPage();
  },
};
</script>
