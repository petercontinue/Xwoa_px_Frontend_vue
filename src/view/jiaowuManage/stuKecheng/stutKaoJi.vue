<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

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
    <addOreditkaoji
      v-model="AEkaojiShow"
      :kjdata="kjdata"
      :type="kjtype"
      v-on:handleSearch="getKaoJiListPage"
    ></addOreditkaoji>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import addOreditkaoji from "@/components/jiaowuManage/stuKecheng/addOreditkaoji";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    addOreditkaoji,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "226",
      allcampusData: [], //校区查询获取到的校区数据
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuName: "",
        campusID: "",
      },
      AEkaojiShow: false,
      kjdata: "",
      kjtype: -1,

      checkList: [],
      dolist: {
        ids: "",
      },
      deleteids: "",
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
          title: "校区",
          key: "campusName",
          align: "center",
          width: 200,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "校区",
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "年级/年龄段",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 120,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
        },
        {
          title: "当前等级",
          key: "jibie",
          align: "center",
        },
        {
          title: "考级申请",
          key: "campusName",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.OnsqInfo(params);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
        {
          title: "添加人",
          key: "staffName",
          align: "center",
        },
        {
          title: "添加时间",
          key: "addDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.addDateTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.addDateTime, "yyyy-MM-dd hh:mm");
            }
            return h("div", [h("span", datehave)]);
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

    getKaoJiListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/buxikecheng/getKaoJiPage", this.params).then((res) => {
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

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.Onderive();
      } else if (onclicks == "addinfo") {
        this.Onaddinfo();
      } else if (onclicks == "edit") {
        this.Onedit();
      } else if (onclicks == "del()") {
        this.Ondel();
      }
    },

    addlist() {
      this.checkList = [];
      this.deleteids = "";
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.deleteids += items.id + ",";
          this.checkList.push({
            id: items.id,
          });
        }
      });
      this.dolist.ids = JSON.stringify(this.checkList);
    },

    Onderive() {
      this.$Modal.confirm({
        title: "导出",
        content: "是否导出考级信息",
        onOk: () => {
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-stu/stu/buxikecheng/ExportKaoJi",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: {},
              responseType: "blob",
            })
            .then((res) => {
              this.btnLoading = false;
              // 文件下载
              const blob = new Blob([res], {
                type: "application/vnd.ms-excel",
              });
              let link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.setAttribute("download", "考级.xls");
              link.click();
              link = null;
              this.$Message.success("导出成功");
            })
            .catch((err) => {
              this.btnLoading = false;
              this.$Message.error("下载失败");
            });
        },
        onCancel: () => {},
      });
    },
    Onaddinfo() {
      this.kjtype = 1;
      this.AEkaojiShow = true;
    },
    Onedit() {
      this.kjdata == "";
      let i = 0;
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.kjdata = JSON.stringify(items);
          i++;
        }
      });
      setTimeout(() => {
        if (this.kjdata == "") {
          this.$Message.error("请选择要修改的数据");
        } else if (i > 1) {
          this.$Message.error("请选择一行");
        } else {
          this.kjtype = 2;
          this.AEkaojiShow = true;
        }
      }, 100);
    },
    Ondel() {
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
              api.del("xwcloud-stu/stu/buxikecheng/delKaoJi",{ids: this.deleteids}).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getKaoJiListPage();
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
    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuName = "";

      this.getKaoJiListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getKaoJiListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getKaoJiListPage();
    },
    OnsqInfo(value) {
      console.log(value);
      let stuall = JSON.stringify(value.row);
      this.$router.push({
        path: "/kaojishenqing",
        query: { stu: stuall },
      });
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getKaoJiListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getKaoJiListPage();
  },
};
</script>
