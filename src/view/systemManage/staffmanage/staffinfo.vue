<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            1
            手机号码即员工账号，默认登录密码123456；若密码忘记了，可以在这里操作重置密码；
          </span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2.员工账号在系统中存在着大量的数据关联，所以对于不再使用的账号不支持删除，只能冻结和离职；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >3.冻结和离职的区别：冻结账号在业务数据的下拉框中还可以选择到该员工，但离职账号就不会再显示了；</span
          >
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">在职员工</Button>
        <Button type="warning" ghost @click="search(3)">离职员工</Button>
        <Button type="error" ghost @click="search(4)">本月新入职</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getpxstaffPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns6"
          :data="data"
          @on-row-click="onClickRow"
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
    <addstaff-form v-model="addShow" v-on:handleSearch="getpxstaffPages"></addstaff-form>
    <updatestaff-form
      v-model="updateShow"
      :staffID="editstaffID"
      v-on:handleSearch="getpxstaffPages"
    ></updatestaff-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import addstaffForm from "../../../components/staffinfo/addstaffForm";
import updatestaffForm from "../../../components/staffinfo/updatestaffForm";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    addstaffForm,
    updatestaffForm,
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      headerPersonVisible: false,
      headerStaffNameVisible: false,
      headerSearchVisible: false,
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerSearchJointimeVisible: false,
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
                      item.checkBox = this.value; //全选|全取消
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
                  value: params.row.checkBox,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "手机号码",
          key: "staffTel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "手机号码",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.staffTel = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "真实姓名",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "真实姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.staffName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "性别",
          key: "staffSex",
          align: "center",
          render: (h, params) => {
            if (params.row.staffSex) {
              return h("div", [h("span", params.row.staffSex)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "性别",
                  data: [
                    { id: 1, name: "男" },
                    { id: 2, name: "女" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.staffSex = value == 1 ? "男" : "女";
                    this.TableSearch();
                  },
                },
              }),
            ]);
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
                      this.campusID = value;
                      this.TableSearch();
                    } else {
                      this.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "身份",
          key: "role",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "身份",
                  data: this.allrole,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.role = value;
                      this.TableSearch();
                    } else {
                      this.role = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            switch (params.row.role) {
              case "1":
                state = "普通账号";
                break;
              case "2":
                state = "管理员";
                break;
              case "3":
                state = "超级管理员";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "岗位",
          key: "staffpostName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "岗位",
                  data: this.staffpostDate,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.staffpostDate.forEach((element) => {
                        if (element.id == value) {
                          this.staffPostID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.staffPostID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "任教科目",
          key: "teaSubject",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.teaSubject == null || params.row.teaSubject == "") {
              state = "-";
            } else {
              state = params.row.teaSubject;
            }
            return h("label", state);
          },
        },
        {
          title: "入职日期",
          key: "joinTime",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "入职时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.sjoinTime = value[0];
                    this.ejoinTime = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.joinTime != "" && params.row.joinTime != null) {
              state = params.row.joinTime.substring(0, 10);
            } else {
              state = "-";
            }
            return h("label", state);
          },
        },
        {
          title: "员工状态",
          key: "staffState",
          align: "center",
          render: (h, params) => {
            if (params.row.staffState == 1) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  "在职"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  { style: { color: "red" } },
                  params.row.staffState == 2 ? "冻结" : "离职"
                ),
              ]);
            }
          },
        },
        {
          title: "员工生日",
          key: "staffBirthday",
          align: "center",
          render: (h, params) => {
            if (params.row.staffBirthday) {
              return h("div", [
                h("span", toolbox.dateFtt(params.row.staffBirthday, "yyyy-MM-dd")),
              ]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "员工生日",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.sbirthDay = value[0];
                    this.ebirthDay = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "绑定微信昵称",
          key: "nickName",
          align: "center",
          render: (h, params) => {
            if (params.row.nickName) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  params.row.nickName
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  "未绑定"
                ),
              ]);
            }
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      staffTel: "",
      staffName: "",
      staffSex: "",
      campusID: "",
      staffPostID: "",
      sjoinTime: "",
      ejoinTime: "",
      sbirthDay: "",
      ebirthDay: "",
      addShow: false,
      updateShow: false,
      editstaffID: "",
      menuID: "531",
      staffID: "11",
      type: 1,
      role: "",
      allcampusData: [],
      staffpostDate: [],
      checkAll: false,
      allrole: [
        { id: "1", name: "普通账号" },
        { id: "2", name: "管理员" },
        { id: "3", name: "超级管理员" },
      ],
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
    },
    getpxstaffPages() {
      api
        .get("xwcloud-sys/sys/StaffManagement/getPxstafftablePage", {
          size: this.size,
          current: this.current,
          staffTel: this.staffTel,
          staffName: this.staffName,
          staffSex: this.staffSex,
          campusID: this.campusID,
          staffPostID: this.staffPostID,
          sjoinTime: this.joinTime,
          ejoinTime: this.ejoinTime,
          sbirthDay: this.sbirthDay,
          ebirthDay: this.ebirthDay,
          type: this.type,
          role: this.role,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            this.data.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "checkBox", false);
            });
          }
        });
    },
    changePage(current) {
      this.current = current;
      this.getpxstaffPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getpxstaffPages();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    updateStaff() {
      let i = 0;
      this.editstaffID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editstaffID = items.id;
          i += 1;
        }
      });
      if (i == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (i > 1) {
        this.$Message.error("只能选择一行");
      } else this.updateShow = true;
    },

    dongjieStaff() {
      this.editstaffID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editstaffID += items.id + ",";
        }
      });
      if (this.editstaffID == "") {
        this.$Message.error("请选择要冻结的员工");
      } else {
        this.$Modal.confirm({
          title: "冻结员工",
          content: "<p>是否冻结当前选中的员工</p>",
          onOk: () => {
            api
              .get("/xwcloud-sys/sys/StaffManagement/UpdateStaffSate", {
                id: this.editstaffID,
                staffState: 2,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("冻结员工操作成功");
                  this.getpxstaffPages();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {
            this.$Message.info("取消了冻结员工");
          },
        });
      }
    },
    jiefongStaff() {
      this.editstaffID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editstaffID += items.id + ",";
        }
      });
      if (this.editstaffID == "") {
        this.$Message.error("请选择要解除冻结的员工");
      } else {
        this.$Modal.confirm({
          title: "解除冻结员工",
          content: "<p>是否解除冻结当前选中的员工</p>",
          onOk: () => {
            api
              .get("/xwcloud-sys/sys/StaffManagement/UpdateStaffSate", {
                id: this.editstaffID,
                staffState: 1,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("解除冻结操作成功");
                  this.getpxstaffPages();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {
            this.$Message.info("取消了解除冻结");
          },
        });
      }
    },

    resetpassword() {
      this.editstaffID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editstaffID += items.id + ",";
        }
      });

      console.log(this.editstaffID);
      if (this.editstaffID == "") {
        this.$Message.error("请选择要重置密码的员工");
      } else {
        this.$Modal.confirm({
          title: "重置员工密码",
          content: "<p>是否重置当前选中的员工密码</p>",
          onOk: () => {
            api.get("/xwcloud-sys/sys/StaffManagement/ResetTsaffPassword",{
              Id: this.editstaffID,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("重置员工密码操作成功");
                this.getpxstaffPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {
            this.$Message.info("取消了重置员工密码");
          },
        });
      }
    },

    staffLizhi() {
      let tc = 1;
      this.editstaffID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          if (items.staffState == 3) {
            this.$Message.info("选中员工中当前已经是离职状态");
            tc = 2;
          } else {
            this.editstaffID += items.id + ",";
          }
        }
      });
      if (tc == 2) {
        tc = 1;
        return;
      }
      if (this.editstaffID == "") {
        this.$Message.error("请选择要操作离职的员工");
      } else {
        this.$Modal.confirm({
          title: "离职员工",
          content: "<p>确定对该员工进行离职操作</p>",
          onOk: () => {
            api
              .get("/xwcloud-sys/sys/StaffManagement/UpdateStaffSate", {
                id: this.editstaffID,
                staffState: 3,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("离职员工操作成功");
                  this.getpxstaffPages();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {
            this.$Message.info("取消了离职员工");
          },
        });
      }
    },

    staaffFuzhi() {
      let tc = 1;
      this.editstaffID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          if (items.staffState == 1) {
            this.$Message.info("选中员工中现在已是在职状态");
            tc = 2;
          } else {
            this.editstaffID += items.id + ",";
          }
        }
      });
      if (tc == 2) {
        tc = 1;
        return;
      }
      if (this.editstaffID == "") {
        this.$Message.error("请选择要复职操作的员工");
      } else {
        this.$Modal.confirm({
          title: "复职操作",
          content: "<p>确定对员工进行复职操作</p>",
          onOk: () => {
            api
              .get("/xwcloud-sys/sys/StaffManagement/UpdateStaffSate", {
                id: this.editstaffID,
                staffState: 1,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("复职操作成功");
                  this.getpxstaffPages();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {
            this.$Message.info("取消了复职操作");
          },
        });
      }
    },
    jiechuweixinbind() {
      this.editstaffID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editstaffID += items.id + ",";
        }
      });
      if (this.editstaffID == "") {
        this.$Message.error("请选择要解除绑定的员工");
      } else {
        this.$Modal.confirm({
          title: "解绑微信",
          content: "<p>确定解除该员工的微信绑定</p>",
          onOk: () => {
            api.get("/xwcloud-sys/sys/StaffManagement/jiechuStaffWeixinBind",{
              staffID: this.editstaffID,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("解除微信绑定成功");
                this.getpxstaffPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {
            this.$Message.info("取消了解除微信绑定");
          },
        });
      }
    },
    onSearch(search) {
      window.console.log(search);
    },
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "addinfo") {
        this.addstaffinfo();
      } else if (onclicks == "edit") {
        this.updateStaff();
      } else if (onclicks == "ksdongjie()") {
        this.dongjieStaff();
      } else if (onclicks == "ksjiedong()") {
        this.jiefongStaff();
      } else if (onclicks == "chongzhi()") {
        this.resetpassword();
      } else if (onclicks == "lizhi()") {
        this.staffLizhi();
      } else if (onclicks == "fuzhi()") {
        this.staaffFuzhi();
      } else if (onclicks == "jiechuWeixinBind()") {
        this.jiechuweixinbind();
      } else if (onclicks == "guanlirenjiaokemu()") {
        this.editstaffID = "";
        let i = 0;
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editstaffID = items.id;
            i += 1;
          }
        });
        if (i == 0) {
          this.$Message.error("请选择要管理任教科目的员工");
        } else if (i > 1) {
          this.$Message.error("只能选中一行");
        } else {
          this.$router.push({
            path: "/rejiaokemu",
            query: { id: this.editstaffID },
          });
        }
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    search(type) {
      window.console.log(type);
      this.type = type;
      if (type == 1) {
        this.size = 10;
        this.current = 1;
        this.staffTel = "";
        this.staffName = "";
        this.staffSex = "";
        this.campusID = "";
        this.staffPostID = "";
        this.joinTime = "";
        this.sbirthDay = "";
        this.ebirthDay = "";
        this.role = "";
        this.getpxstaffPages();
      } else if (type == 2 || type == 3 || type == 4) {
        this.size = 10;
        this.current = 1;
        this.type = type;
        this.getpxstaffPages();
      }
    },
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
      api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffPostList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.staffpostDate = res.obj;
        }
      });
    },
    TableSearch() {
      this.getpxstaffPages();
    },
  },
  mounted: function () {
    this.getpxstaffPages();
    this.getAllCampusList();
  },
};
</script>
