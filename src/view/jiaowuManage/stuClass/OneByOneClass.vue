<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="primary" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">班级启用</Button>
        <Button type="info" ghost @click="search(3)">班级不启用</Button>
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
    <edit1v1class
      v-model="editShow"
      :classID="editclassID"
      v-on:handleSearch="getStuClassListPage"
    ></edit1v1class>
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
import edit1v1class from "@/components/jiaowuManage/stuClass/edit1v1class";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    edit1v1class,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "232",
      allcampusData: [], //校区查询获取到的校区数据
      checkList: [],
      classIDList: {
        ids: "",
        isShow: 0,
      },
      editShow: false,
      editclassID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        is1v1Class: 1, //班课
        className: "",
        campusID: "",
        jingbanren: "",
        startDate: "",
        endDate: "",
        isShow: -1,
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
          title: "启用状态",
          key: "isShow",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            switch (params.row.isShow) {
              case 1:
                state = "启用";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "green" },
                    },
                    state
                  ),
                ]);
                break;
              case 0:
                state = "未启用";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "red" },
                    },
                    state
                  ),
                ]);
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "班级编号",
          key: "fankui",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiClassID == null || params.row.zidingyiClassID == "") {
              state = params.row.id;
            } else {
              state = params.row.zidingyiClassID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "校区",
          key: "campusName",
          align: "center",
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
          title: "班级名称",
          key: "className",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班级名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.className = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.classtype == "2") {
              state = "(赠送)" + params.row.className;
            } else {
              state = params.row.className;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "学员课程",
          key: "kc1v1Name",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.classtype == "2") {
              state = "(赠送)" + params.row.kc1v1Name;
            } else {
              state = params.row.kc1v1Name;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "操作人",
          key: "jingbanren",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "操作人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.jingbanren = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "建班时间",
          key: "addTime",
          align: "center",
          width: 200,
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "建班时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startDate = value[0];
                    this.params.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
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

    getStuClassListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/stuClass/getStuClassPage",this.params).then((res) => {
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
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
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
      } else if (onclicks == "Showbanji()") {
        this.onShowbanji(1);
      } else if (onclicks == "Hidebanji()") {
        this.onHidebanji();
      } else if (onclicks == "edit") {
        this.onedit();
      }
    },
    /**选中的数据 */
    addchecklist() {
      this.checkList = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkList.push({
            id: items.id,
          });
        }
      });
      this.classIDList.ids = JSON.stringify(this.checkList);
    },

    Onderive() {
      this.$Modal.confirm({
        title: "导出一对一班级",
        width: 30,
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                },
                style: {
                  margin: "30px",
                  width: "200px",
                },
                on: {
                  click: () => {
                    this.clickexport(1);
                  },
                },
              },
              "导出选中"
            ),
            h(
              "Button",
              {
                props: {
                  type: "primary",
                },
                style: {
                  marginLeft: "30px",
                  width: "200px",
                },
                on: {
                  click: () => {
                    this.clickexport(2);
                  },
                },
              },
              "导出全部"
            ),
          ]);
        },
        onOk: () => {},
        onCancel: () => {},
      });
    },
    clickexport(type) {
      this.addchecklist();
      let cls = "";
      if (type == 1) {
        //导出选中
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要修改的数据");
          return;
        } else {
          this.data.forEach((items) => {
            if (items._checked == true) {
              cls += items.id + ",";
            }
          });
        }
      }
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-stu/stu/stuClass/exportClassOtO",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: { clType: 1, classIDs: cls },
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
          link.setAttribute("download", "一对一班级管理导出.xls");
          link.click();
          link = null;
          this.$Message.success("导出成功");
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    },
    /**启用 */
    onShowbanji(va) {
      this.addchecklist();
      if (va == 1) {
        this.classIDList.isShow = 1;
      } else {
        this.classIDList.isShow = 0;
      }
      setTimeout(() => {
        if (this.checkList.length == 0) {
          this.$Message.error("请选择班级");
        } else {
          this.$Modal.confirm({
            title: "启用班级",
            content: "<p>确定修改选中班级启用状态吗?</p>",
            onOk: () => {
              api.post("xwcloud-stu/stu/stuClass/UpdateOtOIsShow",this.classIDList).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuClassListPage();
                  this.data.forEach((items) => {
                    //取消所有对象的勾选，_checked设置为false
                    this.$set(items, "_checked", false);
                  });
                } else {
                  this.$Notice.error({
                    top: 50,
                    desc: res.msg,
                    duration: 3,
                  });
                }
              });
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
    /**不启用 */
    onHidebanji() {
      this.onShowbanji(0);
    },
    /**修改 */
    onedit() {
      this.addchecklist();
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkList.length > 1) {
        this.$Message.error("请选择一行");
      } else {
        this.editclassID = this.checkList[0].id;
        this.editShow = true;
      }
    },

    /**
     * 快捷查询
     */
    search(type) {
      this.params.size = 10;
      this.params.current = 1;

      this.params.is1v1Class = 1;
      if (type == 1) {
        this.params.isShow = -1;
        this.params.className = "";
        this.params.campusID = "";
        this.params.jingbanren = "";
        this.params.startDate = "";
        this.params.endDate = "";
      } else if (type == 2) {
        this.params.isShow = 1;
      } else if (type == 3) {
        this.params.isShow = 0;
      }
      this.getStuClassListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuClassListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuClassListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuClassListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getStuClassListPage();
  },
};
</script>
