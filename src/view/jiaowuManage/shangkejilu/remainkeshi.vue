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
          width: 90,
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null||params.row.zidingyiStuID=="") {
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
          title: "课程计费方式",
          key: "jifeiStyleName",
          align: "center",
          width: 120,
          render: (h, params) => {
            let state = "";
            switch (params.row.jifeiStyleName) {
              case "1":
                state = "按课时计费";
                break;
              case "2":
                state = "按课时包计费";
                break;
              case "3":
                state = "起止日期计费"; //不应该出现的计费方式
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "购买课时",
          key: "buyN",
          align: "center",
          width: 100,
        },
        {
          title: "得到的赠送课时",
          key: "beGiven",
          align: "center",
          width: 100,
        },
        {
          title: "得到转送教课时",
          key: "forwarded",
          align: "center",
          width: 100,
        },
        {
          title: "送出课时",
          key: "give",
          align: "center",
          width: 100,
        },
        {
          title: "已上课时",
          key: "userd",
          align: "center",
          width: 100,
        },
        {
          title: "退费课时",
          key: "refund",
          align: "center",
          width: 100,
        },
        {
          title: "剩余课时",
          key: "allremainkeshi",
          align: "center",
          width: 100,
        },
        {
          title: "剩余课时预警课时",
          key: "yujing",
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
                params.row.yujing
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    getRemainkeshiDetailsListPage() {
      api.get("xwcloud-pkxk/kehao/ClassRecord/getRemainkeshiDetailsPage",this.params).then((res) => {
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
      this.getRemainkeshiDetailsListPage();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getRemainkeshiDetailsListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getRemainkeshiDetailsListPage();
    },
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 253 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },

    /**
     * 表头查询
     */
    TableSearch() {
      this.getRemainkeshiDetailsListPage();
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.getRemainkeshiDetailsListPage();
    this.getAllCampusList();
  },
};
</script>
