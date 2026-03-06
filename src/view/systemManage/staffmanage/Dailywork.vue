<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">今天</Button>
        <Button type="warning" ghost @click="search(3)">本周</Button>
        <Button type="error" ghost @click="search(4)">本月</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getWorkdayRecordPages"
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
    <adddaylywork-form
      v-model="addShow"
      v-on:handleSearch="getWorkdayRecordPages"
    ></adddaylywork-form>
    <derivedailywork-form v-model="deriveShow"></derivedailywork-form>
    <updatdailywork-form
      v-model="updateShow"
      :editdataID="editdataID"
      v-on:handleSearch="getWorkdayRecordPages"
    ></updatdailywork-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import adddaylyworkForm from "../../../components/staffinfo/adddailyworkForm";
import derivedailyworkForm from "../../../components/staffinfo/derivedailyworkForm";
import updatdailyworkForm from "../../../components/staffinfo/updatedailyworkForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    adddaylyworkForm,
    derivedailyworkForm,
    updatdailyworkForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      headerStaffNameVisible: false,
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerSearchJointimeVisible: false,
      columns: [
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
                    this.StaffName = value;
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
                          this.CampusName = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.CampusName = "";
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
                          this.StaffPostName = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.StaffPostName = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "日志内容",
          key: "logContent",
          align: "center",
        },
        {
          title: "日志图片",
          key: "imgsUrl",
          align: "center",
          render: (h, params) => {
            if (params.row.imgsUrl) {
              return h(
                "div",
                {
                  attrs: {
                    style: "width: 60px;height: 60px;",
                  },
                },
                [
                  h("img", {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    attrs: {
                      src: params.row.imgsUrl.split(",")[0],
                      style: "width: 60px;height: 60px;border-radius: 2px;",
                    },
                    style: {},
                  }),
                ]
              );
            } else {
              return h("div", "暂无图片");
            }
          },
        },
        {
          title: "日期",
          key: "logDate",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "日志日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.SLogDate = value[0];
                    this.ELogDate = value[1];
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
      StaffName: "",
      CampusName: "",
      StaffPostName: "",
      SLogDate: "",
      ELogDate: "",
      addShow: false,
      updateShow: false,
      deriveShow: false,
      editdataID: "",
      menuID: "533",
      staffID: "11",
      allbtnData: [],
      type: 1,
      allcampusData: [],
      staffpostDate: [],
      checkAll: false,
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
    },
    getWorkdayRecordPages() {
      api
        .get("/xwcloud-sys/sys/StaffManagement/GetAllWorkdayRecordPages", {
          size: this.size,
          current: this.current,
          StaffName: this.StaffName,
          CampusName: this.CampusName,
          StaffPostName: this.StaffPostName,
          SLogDate: this.SLogDate,
          ELogDate: this.ELogDate,
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
      this.getWorkdayRecordPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getWorkdayRecordPages();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    updateStaff() {
      this.editdataID = "";
      let i = 0;
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
          i += 1;
        }
      });
      if (i == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (i > 1) {
        this.$Message.error("只能选中一行进行修改");
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
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID += items.id + ",";
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        api
          .del("/xwcloud-sys/sys/StaffManagement/DeleteWorkdayRecord", {
            Id: this.editdataID,
          })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getWorkdayRecordPages();
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
        this.getWorkdayRecordPages();
      } else if (type == 2) {
        var date = new Date();
        var month = date.getMonth() + 1;
        this.SLogDate =
          date.getFullYear() + "-" + month + "-" + date.getDate() + " 00:00:00";
        this.ELogDate =
          date.getFullYear() + "-" + month + "-" + date.getDate() + " 23:59:59";
        this.getWorkdayRecordPages();
      } else if (type == 3) {
        this.SLogDate = this.getMonday("s", 0);
        this.ELogDate = this.getMonday("e", 0);
        this.getWorkdayRecordPages();
      } else if (type == 4) {
        this.SLogDate = this.getMonth("s", 0);
        this.ELogDate = this.getMonth("e", 0);
        this.getWorkdayRecordPages();
      }
    },
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 533 })
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
      this.getWorkdayRecordPages();
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
    this.getWorkdayRecordPages();
    this.getPowerButtons();
    this.getAllCampusList();
  },
};
</script>
