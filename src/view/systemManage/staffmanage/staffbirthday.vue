<template>
  <div>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getStaffBirthPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns"
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
    <updatestaffbirth-form
      v-model="updateShow"
      :editdataID="editdataID"
      :staffbirth="editstaffbirth"
      v-on:handleSearch="getStaffBirthPages"
    ></updatestaffbirth-form>
    <derivestaffbirth-form v-model="deriveShow"> </derivestaffbirth-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import updatestaffbirthForm from "../../../components/staffinfo/updatestaffbirthForm";
import derivestaffbirthForm from "../../../components/staffinfo/derivestaffbirthForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    updatestaffbirthForm,
    derivestaffbirthForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      headerStaffNameVisible: false,
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerSearchstaffTelVisible: false,
      headerSearchJointimeVisible: false,
      columns: [
        {
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.data.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "员工姓名",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "员工姓名",
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
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.campusName = element.name;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.campusName = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "岗位",
          key: "staffPostName",
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
                          this.staffPostName = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.staffPostName = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "员工生日",
          key: "StaffBirthDay",
          align: "center",
          render: (h, params) => {
            if (params.row.StaffBirthDay) {
              return h("div", [h("span", params.row.StaffBirthDay)]);
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
                    this.Sstaffbirth = value[0];
                    this.Estaffbirth = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      staffName: "",
      campusName: "",
      staffPostName: "",
      stafftel: "",
      Sstaffbirth: "",
      Estaffbirth: "",
      addShow: false,
      updateShow: false,
      deriveShow: false,
      editdataID: "",
      editstaffbirth: "",
      menuID: "536",
      staffID: "11",
      // allbtnData: [],
      type: 1,
      allcampusData: [],
      staffpostDate: [],
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.data.forEach((items) => {
        //取消所有对象的勾选，checkBox设置为false
        this.$set(items, "checkBox", false);
      });
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
    },
    getStaffBirthPages() {
      api
        .get("/xwcloud-sys/sys/StaffManagement/GetAllStaffBirthPages", {
          size: this.size,
          current: this.current,
          staffName: this.staffName,
          campusName: this.campusName,
          staffPostName: this.staffPostName,
          Sstaffbirth: this.Sstaffbirth,
          Estaffbirth: this.Estaffbirth,
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
    // getPowerButtons() {
    //   this.GetallPowerMenuButtons({
    //     menuID: this.menuID,
    //     staffID: this.staffID,
    //   }).then((res) => {
    //     if (res.code == "Y" && res.success == true) {
    //       this.allbtnData = res.obj;
    //     }
    //   });
    // },
    changePage(current) {
      this.current = current;
      this.getStaffBirthPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getStaffBirthPages();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    updateStaff() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
          this.editstaffbirth = items.staffBirthDay;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.updateShow = true;
      }
    },
    derivedailkywork() {
      this.deriveShow = true;
    },
    onSearch(search) {
      window.console.log(search);
    },
    deleteDailywork() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        api
          .del("/xwcloud-sys/sys/StaffManagement/DeleteWorkdayRecord", {
            Id: this.editdataID,
          })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getStaffBirthPages();
            }
          });
      }
    },
    clickShijian(onclicks) {
      if (onclicks == "addinfo") {
        this.addstaffinfo();
      } else if (onclicks == "edit") {
        this.updateStaff();
      } else if (onclicks == "del()") {
        this.deleteDailywork();
      } else if (onclicks == "derive()") {
        this.derivedailkywork();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    search(type) {
      this.type = type;
      if (type == 1) {
        this.size = 10;
        this.current = 1;
        this.StaffName = "";
        this.CampusName = "";
        this.StaffPostName = "";
        this.SLogDate = "";
        this.ELogDate = "";
        this.getStaffBirthPages();
      } else if (type == 2) {
        var date = new Date();
        var month = date.getMonth() + 1;
        this.SLogDate =
          date.getFullYear() + "-" + month + "-" + date.getDate() + " 00:00:00";
        this.ELogDate =
          date.getFullYear() + "-" + month + "-" + date.getDate() + " 23:59:59";
        this.getStaffBirthPages();
      } else if (type == 3) {
        this.SLogDate = this.getMonday("s", 0);
        this.ELogDate = this.getMonday("e", 0);
        this.getStaffBirthPages();
      } else if (type == 4) {
        this.SLogDate = this.getMonth("s", 0);
        this.ELogDate = this.getMonth("e", 0);
        this.getStaffBirthPages();
      }
    },
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
      api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffPostList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.staffpostDate = res.obj;
        }
      });
    },
    TableSearch() {
      this.getStaffBirthPages();
    },
  },
  mounted: function () {
    this.getStaffBirthPages();
    // this.getPowerButtons();
    this.getAllCampusList();
  },
};
</script>
