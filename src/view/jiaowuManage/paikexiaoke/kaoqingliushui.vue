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
    <derivekaoqingliushui-form v-model="deriveShow"></derivekaoqingliushui-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import derivekaoqingliushuiForm from "@/components/jiaowuManage/paikexiaoke/derivekaoqingliushuiForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    derivekaoqingliushuiForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "248",
      deriveShow: false,
      allcampusData: [], //校区查询获取到的校区数据
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stuID: "",
        stuName: "",
        kechengName: "",
        tearch: "",
        startDate: "",
        endDate: "",
      },
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
          title: "课程",
          key: "kechengName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.kechengName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课教师",
          key: "tearch",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.tearch == null) {
              state = "-";
            } else {
              state = params.row.tearch;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上课教师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.tearch = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课日期",
          key: "haveclassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveclassDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上课日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startDate = value[0];
                    this.params.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上下课时间",
          key: "ClassTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            state =
              params.row.startClassDateTime.substring(0, 5) +
              "-" +
              params.row.endClassDateTime.substring(0, 5);
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "考勤状态",
          key: "kaoqingStyle",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.kaoqingStyle) {
              case "1":
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "green",
                      },
                    },
                    "正常"
                  ),
                ]);
              case "2":
                state = "请假";
                break;
              case "3":
                state = "旷课";
                break;
              case "4":
                state = "迟到";
                break;
              case "5":
                state = "早退";
                break;
              case "6":
                state = "补课";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
      ],
    };
  },

  methods: {
    /**
     * 页面加载
     */
    getKaoqingliushuiListPage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getKaoqingliushuiPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(res);
          }
        });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.derive();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuID = "";
      this.params.stuName = "";
      this.params.kechengName = "";
      this.params.tearch = "";
      this.params.startDate = "";
      this.params.endDate = "";
      this.getKaoqingliushuiListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getKaoqingliushuiListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getKaoqingliushuiListPage();
    },

    /**
     * 导出
     */
    derive() {
      this.deriveShow = true;
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getKaoqingliushuiListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getKaoqingliushuiListPage();
    this.getAllCampusList();
  },
};
</script>
