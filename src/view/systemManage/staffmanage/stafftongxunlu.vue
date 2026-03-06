<template>
  <div>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getStaffTelsPages"
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
    <updatestafftel-form
      v-model="updateShow"
      :editdataID="editdataID"
      :stafftel="editstafftel"
      v-on:handleSearch="getStaffTelsPages"
    ></updatestafftel-form>
    <derivestafftel-form v-model="deriveShow"> </derivestafftel-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import updatestafftelForm from "../../../components/staffinfo/updatestafftelForm";
import derivestafftelForm from "../../../components/staffinfo/derivestafftelForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    updatestafftelForm,
    derivestafftelForm,
    selectsearchForm,
    inputsearchForm,
  },
  data() {
    return {
      headerStaffNameVisible: false,
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerSearchstaffTelVisible: false,
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
          title: "联系电话",
          key: "stafftel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "联系电话",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.stafftel = value;
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
      UserName: "",
      staffName: "",
      campusName: "",
      staffPostName: "",
      stafftel: "",
      addShow: false,
      updateShow: false,
      deriveShow: false,
      editdataID: "",
      editstafftel: "",
      menuID: "536",
      staffID: "11",
      allbtnData: [],
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
    getStaffTelsPages() {
      api
        .get("/xwcloud-sys/sys/StaffManagement/GetAllStaffTelPages", {
          size: this.size,
          current: this.current,
          UserName: this.UserName,
          staffName: this.staffName,
          campusName: this.campusName,
          staffPostName: this.staffPostName,
          stafftel: this.stafftel,
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
    getPowerButtons() {
      api
        .get("/xwcloud-sys/sys/PowerManagement/GetPowerButton", {
          menuID: this.menuID,
          staffID: this.staffID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allbtnData = res.obj;
          }
        });
    },
    changePage(current) {
      this.current = current;
      this.getStaffTelsPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getStaffTelsPages();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    updateStaff() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
          this.editstafftel = items.stafftel;
        }
      });
      if (this.editdataID == "" || this.editstafftel == "") {
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
              this.getStaffTelsPages();
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
        this.getStaffTelsPages();
      } else if (type == 2) {
        var date = new Date();
        var month = date.getMonth() + 1;
        this.SLogDate =
          date.getFullYear() + "-" + month + "-" + date.getDate() + " 00:00:00";
        this.ELogDate =
          date.getFullYear() + "-" + month + "-" + date.getDate() + " 23:59:59";
        this.getStaffTelsPages();
      } else if (type == 3) {
        this.SLogDate = this.getMonday("s", 0);
        this.ELogDate = this.getMonday("e", 0);
        this.getStaffTelsPages();
      } else if (type == 4) {
        this.SLogDate = this.getMonth("s", 0);
        this.ELogDate = this.getMonth("e", 0);
        this.getStaffTelsPages();
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
      this.getStaffTelsPages();
    },
    getMonday(type, dates) {
      var now = new Date();
      var nowTime = now.getTime();
      var day = now.getDay();
      var longTime = 24 * 60 * 60 * 1000;
      var n = longTime * 7 * (dates || 0);
      if (type == "s") {
        var dd = nowTime - (day - 1) * longTime + n;
      }
      if (type == "e") {
        var dd = nowTime + (7 - day) * longTime + n;
      }
      dd = new Date(dd);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      var day = y + "-" + m + "-" + d;
      return day;
    },
    getMonth(type, months) {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      if (Math.abs(months) > 12) {
        months = months % 12;
      }
      if (months != 0) {
        if (month + months > 12) {
          year++;
          month = (month + months) % 12;
        } else if (month + months < 1) {
          year--;
          month = 12 + month + months;
        } else {
          month = month + months;
        }
      }
      month = month < 10 ? "0" + month : month;
      var date = d.getDate();
      var firstday = year + "-" + month + "-" + "01";
      var lastday = "";
      if (
        month == "01" ||
        month == "03" ||
        month == "05" ||
        month == "07" ||
        month == "08" ||
        month == "10" ||
        month == "12"
      ) {
        lastday = year + "-" + month + "-" + 31;
      } else if (month == "02") {
        if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
          lastday = year + "-" + month + "-" + 29;
        } else {
          lastday = year + "-" + month + "-" + 28;
        }
      } else {
        lastday = year + "-" + month + "-" + 30;
      }
      var day = "";
      if (type == "s") {
        day = firstday;
      } else {
        day = lastday;
      }
      return day;
    },
  },
  mounted: function () {
    this.getStaffTelsPages();
    this.getPowerButtons();
    this.getAllCampusList();
  },
};
</script>
