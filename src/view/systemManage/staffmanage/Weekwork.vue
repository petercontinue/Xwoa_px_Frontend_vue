<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getWorkweekRecordPages"
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
    <addweekwork-form
      v-model="addShow"
      v-on:handleSearch="getWorkweekRecordPages"
    ></addweekwork-form>
    <deriveweekwork-form v-model="deriveShow"></deriveweekwork-form>
    <updateweekwork-form
      v-model="updateShow"
      :editdataID="editdataID"
      v-on:handleSearch="getWorkweekRecordPages"
    ></updateweekwork-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import addweekworkForm from "../../../components/staffinfo/addweekworkForm";
import updateweekworkForm from "../../../components/staffinfo/updateweekworkForm";
import deriveweekworkForm from "../../../components/staffinfo/deriveweekworkForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    addweekworkForm,
    updateweekworkForm,
    deriveweekworkForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerStaffNameVisible: false,
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
                          this.CampusName = element.name;
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
          title: "本周工作总结",
          key: "thisWeekRecord",
          align: "center",
        },
        {
          title: "下周工作总结",
          key: "nextWeekRecord",
          align: "center",
        },
        {
          title: "周起始日期",
          key: "startDate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.startDate, "yyyy-MM-dd")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "周起始日期",
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
        {
          title: "周终止日期",
          key: "endDate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.endDate, "yyyy-MM-dd")),
            ]);
          },
        },
        {
          title: "录入时间",
          key: "luruDate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.luruDate, "yyyy-MM-dd hh:mm:ss")),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      StaffPostName: "",
      StaffName: "",
      CampusName: "",
      SLogDate: "",
      ELogDate: "",
      menuID: "534",
      staffID: "11",
      allcampusData: [],
      staffpostDate: [],
      addShow: false,
      updateShow: false,
      deriveShow: false,
      editdataID: "",
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
    getWorkweekRecordPages() {
      api
        .get("/xwcloud-sys/sys/StaffManagement/GetweekrecordPages", {
          size: this.size,
          current: this.current,
          StaffName: this.StaffName,
          CampusName: this.CampusName,
          StaffPostName: this.StaffPostName,
          SstartDate: this.SLogDate,
          EstartDate: this.ELogDate,
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
      this.getWorkweekRecordPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getWorkweekRecordPages();
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
        api.del("/xwcloud-sys/sys/StaffManagement/Deleteweekrecord",{ Id: this.editdataID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.getWorkweekRecordPages();
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
    searchAll() {
      this.size = 10;
      this.current = 1;
      this.StaffName = "";
      this.CampusName = "";
      this.StaffPostName = "";
      this.SLogDate = "";
      this.ELogDate = "";
      this.TableSearch();
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
      this.getWorkweekRecordPages();
    },
  },
  mounted: function () {
    this.getWorkweekRecordPages();
    this.getAllCampusList();
  },
};
</script>
