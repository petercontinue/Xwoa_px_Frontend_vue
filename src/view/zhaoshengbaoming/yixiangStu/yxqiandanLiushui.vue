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
      v-on:handleSearch="getYxqiandanLiushui"
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
  name: "yxqiandanLiushui",
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      menuID: "137",
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
          title: "签单实收",
          key: "qianDanMoney",
          align: "center",
          //   width: 100,
        },
        {
          title: "签单方式",
          key: "isBaomingOrChongzhi",
          align: "center",
          //   width: 100,
          render: function (h, { row }) {
            let returnStr = "报名";
            if (row.isBaomingOrChongzhi == "2") {
              returnStr = "充值";
            }
            return h("div", returnStr);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "签单方式",
                  data: [
                    { id: 1, name: "报名" },
                    { id: 2, name: "充值" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.isBaomingOrChongzhi =
                      value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "市场人",
          key: "scStaffName",
          align: "center",
          //   width: 100,
          render(h, params) {
            if (params.row.scStaffName) {
              return h("div", params.row.scStaffName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "市场人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.scStaffName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "负责人",
          key: "fzStaffName",
          align: "center",
          render(h, params) {
            if (params.row.fzStaffName) {
              return h("div", params.row.fzStaffName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "负责人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.fzStaffName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "签单人",
          key: "qdStaffName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "签单人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.qdStaffName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "登记日期",
          key: "yxDengjiDateTime",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "登记日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.yxDengjiDateTime = value
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
          title: "签单日期",
          key: "yxQiandanDateTime",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "签单日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.yxQiandanDateTime = value
                      ? value.join("_")
                      : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        campusID: null,
        stuName: null,
        isBaomingOrChongzhi: null,
        scStaffName: null,
        fzStaffName: null,
        qdStaffName: null,
        yxDengjiDateTime: null,
        yxQiandanDateTime: null,
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
      this.getYxqiandanLiushui();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.getYxqiandanLiushui();
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
          isBaomingOrChongzhi: null,
          scStaffName: null,
          fzStaffName: null,
          qdStaffName: null,
          yxDengjiDateTime: null,
          yxQiandanDateTime: null,
        };
      }
      this.getYxqiandanLiushui();
    },
    getYxqiandanLiushui() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getAllQiandanLiushuiPages",this.searchObj).then((res) => {
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
        "/xwcloud-zsbm/yxstu/YixiangStu/exportyxqiandanliushui",
        {},
        "意向签单流水导出",
        this,
        false
      );
    },
  },
  mounted() {
    this.getYxqiandanLiushui();
    this.getAllCampusList();
  },
};
</script>

<style scoped>
</style>