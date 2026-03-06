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
      v-on:handleSearch="getstaffwechatmessagePages"
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
    <addweixinqunfa-form
      v-model="addShow"
      v-on:handleSearch="getstaffwechatmessagePages"
    ></addweixinqunfa-form>
    <addgangweiqunfa-form
      v-model="deriveShow"
      :editdataID="editdataID"
      v-on:handleSearch="getstaffwechatmessagePages"
    >
    </addgangweiqunfa-form>
    <addxiaoququnfa-form
      v-model="updateShow"
      :editdataID="editdataID"
      v-on:handleSearch="getstaffwechatmessagePages"
    ></addxiaoququnfa-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import addweixinqunfaForm from "../../../components/staffinfo/addweixinqunfaForm";
import addxiaoququnfaForm from "../../../components/staffinfo/addxiaoququnfaForm";
import addgangweiqunfaForm from "../../../components/staffinfo/addgangweiqunfaForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    addweixinqunfaForm,
    addxiaoququnfaForm,
    addgangweiqunfaForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerStaffNameVisible: false,
      headerSearchtuitypeVisible: false,
      columns: [
        // {
        //   title: "选择操作",
        //   align: "center",
        //   key: "checkBox",
        //   render: (h, params) => {
        //     return h("div", [
        //       h("Checkbox", {
        //         props: {
        //           value: params.row.checkBox,
        //         },
        //         on: {
        //           "on-change": (e) => {
        //             this.data.forEach((items) => {
        //               //先取消所有对象的勾选，checkBox设置为false
        //               this.$set(items, "checkBox", false);
        //             });
        //             this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
        //           },
        //         },
        //       }),
        //     ]);
        //   },
        // },
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
                          this.campusID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.campusID = 0;
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
          title: "推送类型",
          key: "tuisongType",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "推送类型",
                  data: this.alltuisongtype,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.alltuisongtype.forEach((element) => {
                        if (element.id == value) {
                          this.tuisongType = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.tuisongType = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "微信通知",
          key: "note",
          align: "center",
        },
        {
          title: "推送时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.addTime) {
              datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss");
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      StaffPostName: "",
      StaffName: "",
      campusID: 0,
      tuisongType: 0,
      menuID: "532",
      staffID: "11",
      allcampusData: [],
      alltuisongtype: [],
      addShow: false,
      updateShow: false,
      deriveShow: false,
      editdataID: "",
    };
  },
  methods: {
    getstaffwechatmessagePages() {
      let staffName = this.StaffName;
      let campusID = this.campusID;
      let tuisongType = this.tuisongType;
      let size = this.size;
      let current = this.current;
      api.get("/xwcloud-sys/sys/StaffManagement/GetWechatMessageStaffPages",{
        size,
        current,
        staffName,
        campusID,
        tuisongType,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.current = current;
      this.getstaffwechatmessagePages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getstaffwechatmessagePages();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    updateStaff() {
      this.updateShow = true;
    },
    derivedailkywork() {
      this.deriveShow = true;
    },
    onSearch(search) {
      window.console.log(search);
    },
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "xuanfasong()") {
        this.addstaffinfo();
      } else if (onclicks == "xiaoqufasong()") {
        this.updateStaff();
      } else if (onclicks == "gangweifasong()") {
        this.derivedailkywork();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    searchAll() {
      this.StaffName = "";
      this.campusID = 0;
      this.tuisongType = 0;
      this.size = 10;
      this.current = 1;
      this.getstaffwechatmessagePages();
    },
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
      api.get("/xwcloud-sys/sys/StaffManagement/GetTuisongTyleList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.alltuisongtype = res.obj;
        }
      });
    },
    TableSearch() {
      this.getstaffwechatmessagePages();
    },
  },
  mounted: function () {
    this.getstaffwechatmessagePages();
    this.getAllCampusList();
  },
};
</script>
