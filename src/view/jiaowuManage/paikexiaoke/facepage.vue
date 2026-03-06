<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

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
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <deriveshaukaxiaoke-form v-model="deriveShow"></deriveshaukaxiaoke-form>
    <shualiankaoqing v-model="showshualiankq"></shualiankaoqing>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import deriveshaukaxiaokeForm from "@/components/jiaowuManage/paikexiaoke/deriveshaukaxiaokeForm";
//src\components\jiaowuManage\paikexiaoke\shualian\shualiankaoqing.vue
import shualiankaoqing from "@/components/jiaowuManage/paikexiaoke/shualian/shualiankaoqing";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    deriveshaukaxiaokeForm,
    shualiankaoqing,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "567",
      deriveShow: false,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuName: "",
        campusID: 0,
        teacherName: "",
        buxiStyleID: 0,
        startshangkeDate: "",
        endshangkeDate: "",
      },
      columns6: [
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
          },
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
                    this.params.stuID = value;
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
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "教师",
          key: "teacherName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.teacherName == null) {
              state = "-";
            } else {
              state = params.row.teacherName;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "教师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.teacherName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课时",
          key: "keshiNum",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.keshiNum == null) {
              state = "-";
            } else {
              state = params.row.keshiNum;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.buxiStyleName == null) {
              state = "-";
            } else {
              state = params.row.buxiStyleName;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "班主任",
          key: "banzhuren",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.banzhuren == null) {
              state = "-";
            } else {
              state = params.row.banzhuren;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "上课时间",
          key: "startLessonDateTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (
              params.row.startLessonDateTime == null ||
              params.row.startLessonDateTime == null
            ) {
              state = "-";
            } else {
              state = params.row.startLessonDateTime + "-" + params.row.endLessonDateTime;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "刷脸时间",
          key: "addtime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addtime, "yyyy-MM-dd - hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      showshualiankq: false,
    };
  },

  methods: {
    getshuakaxiaokeListPage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/GetshualianxiaokeInfoPages", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
          }
        });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 244 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },
    clickShijian(onclicks) {
      if (onclicks == "touxiangcaiji()") {
        console.log("学生头像信息采集");
        this.$router.push({
          path: "/touxiangcaiji",
          query: {},
        });
      } else if (onclicks == "shualianqdqt()") {
        console.log("刷脸签到签退");
        this.showshualiankq = true;
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.params.stuName = "";
      this.params.campusID = 0;
      this.params.teacherName = "";
      this.params.buxiStyleID = 0;
      this.params.startshangkeDate = "";
      this.params.endshangkeDate = "";
      this.getshuakaxiaokeListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getshuakaxiaokeListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getshuakaxiaokeListPage();
    },
    derive() {
      this.deriveShow = true;
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getshuakaxiaokeListPage();
    },
    toshakaTime() {
      this.$Modal.info({
        content: "<p>确定跳转设置刷卡时间段?</p>",
        onOk: () => {
          this.$router.push({
            path: "/jiaowushezhi",
            query: {},
          });
        },
        onCancel: () => {},
      });
    },
  },

  mounted: function () {
    // 初始化页面
    this.getshuakaxiaokeListPage();
    this.getAllCampusList();
  },
};
</script>
