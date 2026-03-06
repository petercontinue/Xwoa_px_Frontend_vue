<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchall()">全部</Button>
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
    <daochulaoshikehoupingjia-form
      v-model="daochuShow"
      v-on:handleSearch="getFeedbackListPage"
      :pingjiatype="type"
      fileName="学员反馈"
    ></daochulaoshikehoupingjia-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";

import DaochulaoshikehoupingjiaForm from "../../../components/jiaowuManage/daochulaoshikehoupingjiaForm.vue";
import * as api from "@/api/api.js";

export default {
  mounted: function () {
    // 初始化页面
    this.getFeedbackListPage();
    this.getAllCampusList();
  },
  components: {
    buttonsForm,
    DaochulaoshikehoupingjiaForm,
    // 按钮控件
  },
  data() {
    return {
      columns6: [
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
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.campusID = value;
                      this.search();
                    } else {
                      this.campusID = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学号",
          key: "zidingyiStuID",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.stuId = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "评价姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "评价姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.stuName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "上课时间",
          align: "center",
          render: (h, params) => {
            if (params.row.haveClassDate) {
              let datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
              let startLessonDateTime = params.row.startLessonDateTime;
              let endLessonDateTime = params.row.endLessonDateTime;
              return h("div", {
                domProps: {
                  innerHTML:
                    "<span>" +
                    datehave +
                    "<br/>" +
                    startLessonDateTime +
                    "~" +
                    endLessonDateTime +
                    "</span>",
                },
              });
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
        {
          title: "评语",
          key: "note",
          align: "center",
        },

        {
          title: "教师姓名",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "教师姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.teacherName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "评价时间",
          key: "addtime",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      size: 10,
      current: 1,
      menuID: "262",
      staffID: "11",
      // 控制弹窗
      daochuShow: false, // 导出数据控制
      // 表头弹窗控制
      headerSearchCampusVisible: false, // 查询校区
      headerSearchStuIDVisible: false, // 查询学号
      headerSearchStuNameVisible: false, // 查询学生名称
      headerSearchStaffNameVisible: false, // 查询老师名称
      verticalSearch: "", // 校区选择存储
      // 搜索数据字段
      type: 2,
      campusID: "",
      stuId: "",
      stuName: "",
      teacherName: "",
      // 临时存储字段
      campusList: [],
      editpingjiaID: "",
    };
  },
  methods: {
    getFeedbackListPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxevaluationtable/getFeedbackPage", {
          size: this.size,
          current: this.current,
          type: this.type,
          campusID: this.campusID,
          stuId: this.stuId,
          stuName: this.stuName,
          teacherName: this.teacherName,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.current = current;
      this.getFeedbackListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.size = pageSize;
      this.getFeedbackListPage();
    },
    daochuLaoshikehoupingjia() {
      // 弹出添加对话框
      this.daochuShow = true;
    },
    clickShijian(onclicks) {
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "derive()":
          // 导出
          this.daochuLaoshikehoupingjia();
          break;

        default:
          break;
      }
    },

    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
    },
    search() {
      this.getFeedbackListPage();
    },
    searchall() {
      this.size = 10;
      this.current = 1;
      this.typ = 2;
      this.campusID = "";
      this.stuId = "";
      this.stuName = "";
      this.teacherName = "";
      this.getFeedbackListPage();
    },
  },
};
</script>
