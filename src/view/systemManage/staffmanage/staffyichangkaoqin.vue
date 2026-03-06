<template>
  <div>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getyichangkaoqinPages"
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
    <addstaffyichankaoqin-form
      v-model="addShow"
      v-on:handleSearch="getyichangkaoqinPages"
    ></addstaffyichankaoqin-form>
    <deriveyichangkaoqin-form v-model="deriveShow"> </deriveyichangkaoqin-form>
    <updateyichangkq-form
      v-model="updateShow"
      :editdataID="editdataID"
      v-on:handleSearch="getyichangkaoqinPages"
    ></updateyichangkq-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import addstaffyichankaoqinForm from "../../../components/staffinfo/addstaffyichankaoqinForm";
import updateyichangkqForm from "../../../components/staffinfo/updateyichangkqForm";
import deriveyichangkaoqinForm from "../../../components/staffinfo/deriveyichangkaoqinForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    addstaffyichankaoqinForm,
    updateyichangkqForm,
    deriveyichangkaoqinForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerStaffNameVisible: false,
      headerSearchVisible: false,
      columns: [
        {
          title: "选择操作",
          align: "center",
          key: "checkBox",
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
                          this.staffpostName = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.staffpostName = "";
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
                    this.staffName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "日期",
          key: "riqi",
          align: "center",
        },
        {
          title: "考勤类别",
          key: "type",
          align: "center",
          render: (h, params) => {
            if (params.row.type == 1) {
              return h("div", [h("span", "请假")]);
            } else if (params.row.type == 2) {
              return h("div", [h("span", "迟到")]);
            } else if (params.row.type == 3) {
              return h("div", [h("span", "早退")]);
            } else if (params.row.type == 4) {
              return h("div", [h("span", "旷工")]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "考勤类别",
                  data: this.allkaoqinData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.allkaoqinData.forEach((element) => {
                        if (element.id == value) {
                          this.type = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.type = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "考勤说明",
          key: "shuoMing",
          align: "center",
        },
        {
          title: "录入时间",
          key: "addDate",
          align: "center",
        },
        {
          title: "录入人",
          key: "lururen",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusName: "",
      staffpostName: "",
      staffName: "",
      type: 0,
      menuID: "535",
      staffID: "11",
      allcampusData: [],
      staffpostDate: [],
      addShow: false,
      updateShow: false,
      deriveShow: false,
      editdataID: "",
      allkaoqinData: [
        { id: 1, name: "请假" },
        { id: 2, name: "迟到" },
        { id: 3, name: "早退" },
        { id: 4, name: "旷工" },
      ],
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
    getyichangkaoqinPages() {
      api
        .get("/xwcloud-sys/sys/StaffManagement/GetyichangkaoqinPages", {
          size: this.size,
          current: this.current,
          campusName: this.campusName,
          staffpostName: this.staffpostName,
          staffName: this.staffName,
          type: this.type,
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
      this.getyichangkaoqinPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getyichangkaoqinPages();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    updateStaff() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
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
    onSearch(search) {},
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
          .del("/xwcloud-sys/sys/StaffManagement/Deleteyichangkaoqin", {
            Id: this.editdataID,
          })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getyichangkaoqinPages();
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
        this.staffpostName = "";
        this.SLogDate = "";
        this.ELogDate = "";
        this.getyichangkaoqinPages();
      }
    },
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 535 })
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
      this.getyichangkaoqinPages();
    },
    searchAll() {
      this.size = 10;
      this.current = 1;
      this.campusName = "";
      this.staffpostName = "";
      this.staffName = "";
      this.type = 0;
      this.getyichangkaoqinPages();
    },
  },
  mounted: function () {
    this.getyichangkaoqinPages();
    this.getPowerButtons();
    this.getAllCampusList();
  },
};
</script>
