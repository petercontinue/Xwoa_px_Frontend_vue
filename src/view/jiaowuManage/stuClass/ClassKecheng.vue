<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1.班课类的班级或一对一班级，操作不启用时，该班级会自动删除当前时间以后的所有排课，但学员未自动退班；重新启用时需重新排课；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2.班课类的班级学员单独退班时，要选择从哪一次排课开始退出现有排课；单个学员插班时也要选择从哪一次排课开始加入；单个学员转班时也需要选择从原班级的哪一次排课退出，从新班级的哪一次排课开始加入；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >3.批量退班时，默认是从当前时间开始退出排课；批量转班时，默认也是从当前时间开始退出原有排课，从当前时间开始插入新班级的排课；</span
          >
        </Col>
      </Alert>
    </Row>

    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="primary" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">启用班级</Button>
        <Button type="info" ghost @click="search(3)">未启用班级</Button>
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
          stripe
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
    <addOreditclass
      v-model="addOreditShow"
      :classID="editclassID"
      :type="AEtype"
      v-on:handleSearch="getStuClassListPage"
    ></addOreditclass>
    <LookClassBystu v-model="lookclassShow"></LookClassBystu>
    <classStuMD v-model="mingdanShow" :classID="mdclassID"></classStuMD>
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
import addOreditclass from "@/components/jiaowuManage/stuClass/addOreditclass";
import LookClassBystu from "@/components/jiaowuManage/stuClass/LookClassBystu";
import classStuMD from "@/components/jiaowuManage/stuClass/classStuMD";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    addOreditclass,
    LookClassBystu,
    classStuMD,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "231",
      allcampusData: [], //校区查询获取到的校区数据

      //----------------------按钮事件数据--------------------------
      addOreditShow: false,
      lookclassShow: false,
      mingdanShow: false,
      mdclassID: "",
      editclassID: "",
      AEtype: "",
      checkList: [],
      classIDList: {
        ids: "",
        isShow: 0,
      },
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        is1v1Class: 0, //班课
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
          key: "classID",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiClassID == null) {
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
        },
        {
          title: "班级最大人数",
          key: "maxStuNum",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.maxStuNum == -1) {
              state = "不限制人数";
            } else {
              state = params.row.maxStuNum + "人";
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "班级人数及名单",
          key: "className",
          align: "center",
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
                      this.lookstu(params);
                    },
                  },
                },
                params.row.mingdan + "人-名单"
              ),
            ]);
          },
        },
        {
          title: "操作人",
          key: "jingbanren",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.jingbanren == "" || params.row.jingbanren == null) {
              state = "-";
            } else {
              state = params.row.jingbanren;
            }
            return h("div", [h("span", state)]);
          },
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
      deleteIds:"",
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
      api.get("xwcloud-stu/stu/stuClass/getStuClassPage", this.params).then((res) => {
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
      if (onclicks == "addinfo") {
        this.Onaddinfo();
      } else if (onclicks == "edit") {
        this.Onedit();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "derive()") {
        this.Onderive();
      } else if (onclicks == "banjiStuGuanli()") {
        this.OnbanjiStuGuanli();
      } else if (onclicks == "Showbanji()") {
        this.OnShowbanji(1);
      } else if (onclicks == "Hidebanji()") {
        this.OnHidebanji();
      } else if (onclicks == "searchStu()") {
        this.OnsearchStu();
      }
    },
    /**选中的数据 */
    addchecklist() {
      this.checkList = [];
      this.deleteIds="";
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkList.push({
            id: items.id,
          });
          this.deleteIds+=items.id+",";
        }
      });
      this.classIDList.ids = JSON.stringify(this.checkList);
    },
    /**添加班级 */
    Onaddinfo() {
      this.addOreditShow = true;
      this.AEtype = "1";
    },

    Onedit() {
      this.addchecklist();
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkList.length > 1) {
        this.$Message.error("请选择一行");
      } else {
        this.editclassID = this.checkList[0].id;
        this.AEtype = "2";
        this.addOreditShow = true;
      }
    },
    Ondel() {
      this.addchecklist();
      setTimeout(() => {
        //确保执行过addstulist
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          console.log(this.classIDList);
          this.$Modal.confirm({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            onOk: () => {
              console.log(this.classIDList);
              api
                .del("xwcloud-stu/stu/stuClass/delClass",{ids: this.deleteIds})
                .then((res) => {
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
    Onderive() {
      this.$Modal.confirm({
        title: "导出班课",
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
          params: { clType: 0, classIDs: cls },
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
          link.setAttribute("download", "班级管理导出.xls");
          link.click();
          link = null;
          this.$Message.success("导出成功");
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    },
    //按钮事件：插班/转班/退班
    OnbanjiStuGuanli() {
      this.$router.push({
        path: "/zhuanbanchaban",
        query: {},
      });
    },
    /**启用 班级 */
    OnShowbanji(va) {
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
              api
                .post("xwcloud-stu/stu/stuClass/UpdateOtOIsShow", this.classIDList)
                .then((res) => {
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
    OnHidebanji() {
      this.OnShowbanji(0);
    },
    OnsearchStu() {
      this.lookclassShow = true;
    },
    lookstu(value) {
      this.mdclassID = value.row.id;
      this.mingdanShow = true;
    },
    /**
     * 快捷查询
     */
    search(type) {
      this.params.size = 10;
      this.params.current = 1;

      this.params.is1v1Class = 0;
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
