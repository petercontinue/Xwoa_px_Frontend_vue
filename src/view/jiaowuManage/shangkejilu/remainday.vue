<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

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
  </div>
</template>

<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      allcampusData: [], //校区查询获取到的校区数据
      isShowL: [
        { id: 1, name: "启用" },
        { id: 0, name: "未启用" },
      ],
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        className: "",
        stuID: "",
        stuName: "",
        subjectName: "",
        kechengName: "",
        isShow: -1,
      },
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          width: 200,
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
          width: 90,
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
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
          width: 90,
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
          title: "科目",
          key: "subjectName",
          align: "center",
          width: 90,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "科目",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.subjectName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
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
          title: "课程计费方式",
          key: "jifeiStyleName",
          align: "center",
          width: 120,
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班级",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.className = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.className) {
              state = params.row.className;
            } else {
              state = "-";
            }
            return h("div", [h("span", state)]);
          },
        },

        {
          title: "任课教师",
          key: "staffName",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            if (params.row.staffName) {
              state = params.row.staffName;
            } else {
              state = "-";
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "开始日期",
          key: "startDate",
          align: "center",
          width: 100,
        },
        {
          title: "结束日期",
          key: "endDate",
          align: "center",
          width: 100,
        },
        {
          title: "剩余天数",
          key: "days",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = params.row.days;
            if (params.row.days < 0) {
              state = 0;
            }
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "red",
                  },
                },
                state
              ),
            ]);
          },
        },
        {
          title: "剩余课时预警课时",
          key: "isKsyj",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "red",
                  },
                },
                params.row.isKsyj
              ),
            ]);
          },
        },
        {
          title: "显示状态",
          key: "isShow",
          align: "center",
          width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "显示状态",
                  data: this.isShowL,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.isShowL.forEach((element) => {
                        if (element.id == value) {
                          this.params.isShow = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.isShow = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getRemainDaysPage", "getallcampusList"]),
    getRemainDaysListPage() {
      api
        .get("xwcloud-pkxk/kehao/ClassRecord/getRemainDaysPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(res);
          }
        });
    },
    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.className = "";
      this.params.stuID = "";
      this.params.stuName = "";
      this.params.subjectName = "";
      this.params.kechengName = "";
      this.params.isShow = -1;
      this.getRemainDaysListPage();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getRemainDaysListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getRemainDaysListPage();
    },
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 253 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    /**
     * 表头查询
     */
    TableSearch() {
      this.getRemainDaysListPage();
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.getRemainDaysListPage();
    this.getAllCampusList();
  },
};
</script>
