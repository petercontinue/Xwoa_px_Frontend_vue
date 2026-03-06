<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1
            学员主动向老师发起约课目前只支持一对一上课约课，不支持学员发起班课的约课；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2 学员发起的约课，在上课前X小时内不允许取消约课（x 在【系统设置-教务设置
            撤消约课时间限制】自定义设置）；</span
          >
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchall()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          highlight-row
          @on-row-click="onClickRow"
          :columns="columns6"
          :data="data"
        ></Table>
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
    <stuyuekeshenhetongguo
      v-model="shenheShow"
      :IDs="selectIds"
      v-on:handleSearch="getYuekeListPage"
    ></stuyuekeshenhetongguo>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import AddweizuoyeForm from "../../../components/jiaowuManage/addweizuoyeForm.vue";
import EditweizuoyeForm from "../../../components/jiaowuManage/editweizuoyeForm.vue";
import GetweizuoyeDetailed from "../../../components/jiaowuManage/getweizuoyeDetailed.vue";

import Stuyuekeshenhetongguo from "../../../components/jiaowuManage/stuyuekeshenhetongguo.vue";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    AddweizuoyeForm,
    EditweizuoyeForm,
    GetweizuoyeDetailed,
    Stuyuekeshenhetongguo,
    // 按钮控件
  },
  data() {
    return {
      columns6: [
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
                      item._checked = this.value; //全选|全取消
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
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "课程名称",
          key: "kechengName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.kechengName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "发起学生",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "发起学生",
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
          title: "教师",
          key: "teacherName",
          align: "center",
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
                    this.search();
                  },
                },
              }),
            ]);
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
          title: "开始时间",
          align: "center",
          key: "haveLessonStartTime",
        },
        {
          title: "结束时间",
          key: "haveLessonEndTime",
          align: "center",
        },
        {
          title: "类型",
          key: "buxiStyleName",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.buxiStyle) {
              case 1:
                state = "一对一";
                break;
              case 2:
                state = "班课";
                break;
              default:
                state = "未知";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "状态",
          key: "yuekeShenheState",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "状态",
                  data: this.ShenheState,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.status = value;
                      this.search();
                    } else {
                      this.params.status = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            switch (params.row.yuekeShenheState) {
              case 1:
                state = "未审核";
                break;
              case 2:
                state = "已审核通过";
                break;
              case 3:
                state = "审核未通过";
                break;
              default:
                state = "未审核";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "发起时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "274",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        kechengName: "",
        stuName: "",
        teacherName: "",
        status: "",
      },
      shenheShow: false,
      selectIds: "",
      ShenheState: [
        { id: 1, name: "未审核" },
        { id: 2, name: "已审核通过" },
        { id: 3, name: "审核未通过" },
      ],
    };
  },
  methods: {
    getYuekeListPage() {
      api
        .get(
          "xwcloud-homeschool/homeschool/pxyuekestufaqitable/getYuekePage",
          this.params
        )
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);

            this.data.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "_checked", false);
            });
            console.log(this.data);
          }
        });
    },
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getYuekeListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getYuekeListPage();
    },
    daochu() {
      toolbox.exportExcel(
        "/xwcloud-homeschool/homeschool/pxyuekestufaqitable/exportStuyueke",
        {},
        "导出学生约课",
        this,
        false
      );
    },
    Naudit(Ids) {
      // 审核不通过
      api
        .post("xwcloud-homeschool/homeschool/pxyuekestufaqitable/auditNotPassed", {
          id: Ids,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.getYuekeListPage();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    Yaudit(Ids) {
      this.selectIds = Ids;
      this.shenheShow = true;
    },
    clickShijian(onclicks) {
      let IDs = "";
      let isshenhe = false;
      this.data.forEach((items) => {
        if (items._checked) {
          IDs += items.id + ",";
          if (items.yuekeShenheState == 2 || items.yuekeShenheState == 3) {
            this.$Message.error("该记录已审核！");
            isshenhe = true;
            return;
          }
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);
      // 按钮事件
      window.console.log(onclicks);
      if (isshenhe == false) {
        switch (onclicks) {
          case "Yaudit()":
            if (IDs == "") {
              this.$Message.error("请选择数据");
            } else {
              this.Yaudit(IDs);
            }

            break;
          case "Naudit()":
            if (IDs == "") {
              this.$Message.error("请选择数据");
            } else {
              this.Naudit(IDs, 3);
            }
            break;
          case "derive()":
            this.daochu();
            break;
        }
      }
    },
    search() {
      this.getYuekeListPage();
    },
    searchall() {
      this.params.size = 10;
      this.params.curren = 1;
      this.params.kechengName = "";
      this.params.stuName = "";
      this.params.teacherName = "";
      this.params.status = "";
      this.getYuekeListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getYuekeListPage();
  },
};
</script>
