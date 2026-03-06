<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
      </Col>
    </Row>
    <Row style="margin-top: 15px">
      <Page
        :total="total"
        show-elevator
        show-total
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import Stuyuekeshenhetongguo from "../../../components/jiaowuManage/stuyuekeshenhetongguo.vue";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    // 按钮控件
  },
  data() {
    return {
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "学员姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学员姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.stuName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班主任",
          key: "banzhurenName",
          align: "center",
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "家长账号",
          key: "parentTel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "家长账号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.parentTel = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "反馈内容",
          align: "center",
          key: "tousuContent",
        },
        {
          title: "反馈时间",
          key: "tousuDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.tousuDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "查阅状态",
          key: "chayueState",
          align: "center",
          render: (h, params) => {
            if (params.row.chayueState) {
              return h("div", [h("span", "已查阅")]);
            } else {
              return h("div", [h("span", "未查阅")]);
            }
          },
        },
        {
          title: "查阅时间",
          key: "chayueDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.chayueDate, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "查阅人",
          key: "chayueSatffName",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "277",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        stuName: "",
        parentTel: "",
      },
    };
  },
  methods: {
    getStuFeedbackPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxtousutable/getStuFeedback", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(this.data);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuFeedbackPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuFeedbackPage();
    },
    derive() {
      toolbox.exportExcel(
        "/xwcloud-homeschool/homeschool/pxtousutable/exportStuFeedback",
        {},
        "学员反馈",
        this
      );
    },
    clickShijian(onclicks) {
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "derive()":
          this.derive();
          break;
      }
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getStuFeedbackPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getStuFeedbackPage();
  },
};
</script>
