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
      v-on:handleSearch="getShitingLiushui"
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
  name: "shitingLiushui",
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
          title: "试听方式",
          key: "chabanOr1v1",
          align: "center",
          //   width: 100,
          render: function (h, { row }) {
            let returnStr = "插班试听";
            if (row.chabanOr1v1 == "2") {
              returnStr = "一对一试听";
            }
            return h(
              "div",
              {
                style:
                  row.chabanOr1v1 == "2"
                    ? {
                        color: "green",
                      }
                    : {},
              },
              returnStr
            );
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "试听方式", //插班试听：1    ，一对一：2
                  data: [
                    { id: 1, name: "插班试听" },
                    { id: 2, name: "一对一试听" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.chabanOr1v1 = value != "-1" ? value : null;
                    this.search();
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
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "班级名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.className = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "试听日期",
          key: "haveClassDate",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "试听日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.haveClassDate = value
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
          title: "上下课时间",
          key: "haveLessTime",
          align: "center",
          //   width: 100,
        },
        {
          title: "试听老师",
          key: "stTeachers",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "试听老师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.stTeachers = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "教室名称",
          key: "classRoomName",
          align: "center",
          //   width: 100,
        },
        {
          title: "试听满意度",
          key: "shiTingManyiduID",
          align: "center",
          //   width: 100,
          render: function (h, { row }) {
            let returnStr = "";
            let returnColor = "";
            switch (row.shiTingManyiduID) {
              case "1":
                returnStr = "不明确";
                returnColor = "blue";
                break;
              case "2":
                returnStr = "很不满意";
                returnColor = "red";
                break;
              case "3":
                returnStr = "不满意";
                returnColor = "red";
                break;
              case "4":
                returnStr = "基本满意";
                returnColor = "green";
                break;
              case "5":
                returnStr = "很满意";
                returnColor = "green";
                break;
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
                  content: "试听满意度",
                  data: [
                    { id: 1, name: "不明确" },
                    { id: 2, name: "很不满意" },
                    { id: 3, name: "不满意" },
                    { id: 4, name: "基本满意" },
                    { id: 5, name: "很满意" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.shiTingManyiduID =
                      value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "满意度说明",
          key: "shiTingShuoming",
          align: "center",
          render: (h, params) => {
            if (params.row.shiTingShuoming) {
              return h("div", [h("span", params.row.shiTingShuoming)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
        {
          title: "录入人",
          key: "staffName",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        campusID: null,
        stuName: null,
        chabanOr1v1: null,
        className: null,
        haveClassDate: null,
        stTeachers: null,
        shiTingManyiduID: null,
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
      this.getShitingLiushui();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.getShitingLiushui();
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
          chabanOr1v1: null,
          className: null,
          haveClassDate: null,
          stTeachers: null,
          shiTingManyiduID: null,
        };
      }
      this.getShitingLiushui();
    },
    getShitingLiushui() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getShitingRecordsPages",this.searchObj).then((res) => {
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
        "/xwcloud-zsbm/yxstu/YixiangStu/exportshitingliushui",
        {},
        "试听流水",
        this,
        false
      );
    },
  },
  mounted() {
    this.getShitingLiushui();
    this.getAllCampusList();
  },
};
</script>

<style scoped>
</style>