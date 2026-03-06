<template>
  <div>
    <Row>
      <Col span="8"
        ><span>时间段查询:</span>
        <DatePicker
          type="daterange"
          v-model="shijian"
          placement="bottom-start"
          placeholder="选择时间段"
          style="width: 200px"
          @on-change="changeDate"
        ></DatePicker
      ></Col>
    </Row>
    <Row>
      <Col span="24">
        <Card>
          <chart-pie
            style="height: 300px"
            v-model="pieData"
            text="招生途径分布比率图"
          ></chart-pie> </Card
      ></Col>
    </Row>
    <Row>
      <Col span="24">
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
      </Col>
    </Row>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import { ChartPie, ChartBar } from "@/components/charts";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    ChartPie,
  },
  data() {
    return {
      pieData: [],
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
                      this.params.campusID = value;
                      this.search();
                    } else {
                      this.params.campusID = "";
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
          render: (h, params) => {
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
              return h("div", [h("span", params.row.id)]);
            } else {
              return h("div", [h("span", params.row.zidingyiStuID)]);
            }
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
                    this.params.stuXuehao = value;
                    this.search();
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
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年级",
                  data: this.stugrade,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.stugrade.forEach((element) => {
                        if (element.id == value) {
                          this.params.gradeID = element.id;
                          this.search();
                        }
                      });
                    } else {
                      this.params.gradeID = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "来源老师",
          key: "oldSchoolTeacherName",
          align: "center",
          render: (h, params) => {
            if (params.row.oldSchoolTeacherName) {
              return h("div", [h("span", params.row.oldSchoolTeacherName)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "来源老师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.oldTeacher = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "35",
      total: 0,
      // 搜索参数
      params: {
        size: "",
        current: "",
        campusID: "",
        stuXuehao: "",
        stuName: "",
        gradeID: "",
        oldTeacher: "",
        startDate: "",
        endDate: "",
      },
      pieparams: {
        startDate: "",
        endDate: "",
      },
      campusList: [],
      stugrade: [],
      laiyuantujing: [],
      shijian: "",
    };
  },
  methods: {
    getTeacherlBiliData() {
      api
        .get("xwcloud-caiwu/shujutongji/oldteacher/getTeacherlBili", this.pieparams)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.pieData = [];
            for (let item in res.obj) {
              if (res.obj[item].oldSchoolTeacherName == undefined) {
                res.obj[item].oldSchoolTeacherName = "其他";
              }
              this.pieData.push({
                value: res.obj[item].bili,
                name: res.obj[item].oldSchoolTeacherName,
              });
            }
          }
        });
    },
    getTeacherlPageData() {
      api
        .get("xwcloud-caiwu/shujutongji/oldteacher/getTeacherlPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getTeacherlPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getTeacherlPageData();
    },
    changeDate(val) {
      this.pieparams.startDate = val[0];
      this.pieparams.endDate = val[1];
      this.params.startDate = val[0];
      this.params.endDate = val[1];
      this.getTeacherlPageData();
      this.getTeacherlBiliData();
    },
    search() {
      this.getTeacherlPageData();
    },
    clickShijian() {},
  },
  mounted: function () {
    // 初始化页面
    this.getTeacherlBiliData();
    this.getTeacherlPageData();
    api.get("xwcloud-homeschool/homeschool/public/getCampusList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.campusList = res.obj;
        this.campusList.forEach((item) => {
          item.name = item.campusName;
        });
      } else {
        this.$Message.error(res.msg);
      }
    });
    api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.stugrade = res.obj;
      }
    });
    api
      .get("xwcloud-caiwu/shujutongji/zhaosheng/getLaiyuantujingList", {})
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.laiyuantujing = res.obj;
          this.laiyuantujing.forEach((item) => {
            item.name = item.telFromName;
          });
        }
      });
  },
};
</script>

<style></style>
