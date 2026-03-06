<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
      </Col>
      <!---->
    </Row>
    <!-- <Alert show-icon style="margin-top: 30px">
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
      温馨提示：是指在微信学员端的登录页的“我要留言”提交的信息，会显示在这里；
    </Alert> -->
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getyaoyueDaofangLiushui"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="data"
          @on-selection-change="selectTableChange"
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
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";
export default {
  name: "yaoyueDaofangLiushui",
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      menuID: "136",
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        // },
        {
          title: "校区",
          key: "campusName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.campusID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学员姓名",
          key: "stuName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "学员姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.stuName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "邀约时间",
          key: "invitationTime",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "邀约时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.invitationTime = value
                      ? value.join("_")
                      : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "邀约状态",
          key: "invitationZhuangtai",
          align: "center",
          //   width: 100,
          render(h, { row }) {
            let returnStr = "";
            let returnColor = "";
            if (row.invitationZhuangtai) {
              switch (row.invitationZhuangtai) {
                case "1":
                  returnStr = "已邀约";
                  returnColor = "green";
                  break;
                case "2":
                  returnStr = "爽约";
                  returnColor = "red";
                  break;
                case "3":
                  returnStr = "已到访";
                  break;
              }
            }
            return h(
              "div",
              {
                style: {
                  color: returnColor,
                },
              },
              returnStr
            );
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "邀约状态", //1：已邀约 2：爽约  3已到访
                  data: [
                    { id: 1, name: "已邀约" },
                    { id: 2, name: "爽约" },
                    { id: 3, name: "已到访" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.invitationZhuangtai =
                      value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "邀约人",
          key: "staffName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "邀约人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.staffName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "到访时间",
          key: "daofangDate",
          align: "center",
          render(h, params) {
            if (params.row.daofangDate) {
              return h("div", params.row.daofangDate);
            } else {
              return h("div", "-");
            }
          },
          //   width: 100,
        },
        {
          title: "到访人",
          key: "daofangStaffName",
          align: "center",
          //   width: 100,
          render(h, params) {
            if (params.row.daofangStaffName) {
              return h("div", params.row.daofangStaffName);
            } else {
              return h("div", "-");
            }
          },
        },
        {
          title: "情况说明",
          key: "shuoMing",
          align: "center",
          render(h, params) {
            if (params.row.shuoMing) {
              return h("div", params.row.shuoMing);
            } else {
              return h("div", "-");
            }
          },
          //   width: 100,
        },
      ],
      data: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        campusID: null,
        stuName: null,
        invitationTime: null,
        invitationZhuangtai: null,
        staffName: null,
      },
      selection: [],
      stuGradeList: [],
      campusList: [],
      staffPostList: [],
    };
  },
  methods: {
    clickShijian(onclicks) {
      // console.log(onclicks);
      let evalStr = "this." + onclicks;
      // if (onclicks.indexOf("addinfo") > -1 || onclicks.indexOf("edit") > -1) {
      //   evalStr += "()";
      // }
      eval(evalStr);
    },
    changePage(current) {
      this.searchObj.current = current;
      this.getyaoyueDaofangLiushui();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.getyaoyueDaofangLiushui();
    },
    selectTableChange(selection) {
      // console.log(selection)
      this.selection = selection;
    },
    search(val = null) {
      this.searchObj.size = 10;
      this.searchObj.current = 1;
      this.searchObj.type = val;
      if (val == "1") {
        this.searchObj = {
          size: 10,
          current: 1,
          campusID: null,
          stuName: null,
          invitationTime: null,
          invitationZhuangtai: null,
          staffName: null,
        };
      }
      this.getyaoyueDaofangLiushui();
    },
    getyaoyueDaofangLiushui() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getyaoyueDaofangPages",this.searchObj).then((res) => {
        if (res.code == "success") {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.$refs.selection.selectAll(false);
        }
      });
    },
    /**
     * 获取校区
     */
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
        }
      });
    },
    derive() {
      toolbox.exportExcel(
        "/xwcloud-zsbm/yxstu/YixiangStu/exportYaoyuedaofangliushui",
        {},
        "邀约到访流水",
        this,
        false
      );
    },
  },
  mounted() {
    this.getyaoyueDaofangLiushui();
    this.getAllCampusList();
  },
};
</script>

<style scoped>
</style>