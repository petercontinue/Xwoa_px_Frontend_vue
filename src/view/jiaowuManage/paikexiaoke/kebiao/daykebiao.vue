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
import datesearchForm from "@/components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      params: {
        current: 1,
        size: 10,
        campusID: "",
        teachName: "",
        StartDate: "",
        endDate: "",
        className: "",
      },
      allcampusData: [], //校区查询获取到的校区数据
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
          title: "教师",
          key: "teacherNames",
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
                    this.params.teachName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "星期",
          key: "weekN",
          align: "center",
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
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
                    this.params.StartDate = value[0];
                    this.params.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课时间",
          key: "startLessonDateTime",
          align: "center",
        },
        {
          title: "下课时间",
          key: "endLessonDateTime",
          align: "center",
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
        },
        {
          title: "学员",
          key: "stuName",
          align: "center",
          render: (h, params) => {
            return h("a", [
              h(
                "span",
                {
                  style: { color: "blue" },
                  on: {
                    click: () => {
                      this.lookstu(params);
                    },
                  },
                },
                "查看名单"
              ),
            ]);
          },
        },
        {
          title: "教室",
          key: "classRoomName",
          align: "center",
        },
      ],
    };
  },

  methods: {
    ...mapActions(["getDaykebiaopage", "getallcampusList"]),

    getDaykebiaoListpage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getDaykebiaopage", this.params)
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
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: "242" })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getDaykebiaoListpage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getDaykebiaoListpage();
    },
    TableSearch() {
      this.getDaykebiaoListpage();
    },
    lookstu(value) {
      this.$Modal.info({
        title: "详情",
        content: "<p>" + value.row.stuName + "</p>",
        closable: true,
        onOk: () => {},
        onCancel: () => {},
      });
    },
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.teachName = "";
      this.params.StartDate = "";
      this.params.endDate = "";
      this.params.className = "";
      this.getDaykebiaoListpage();
    },
  },
  mounted: function () {
    this.getDaykebiaoListpage();
    this.getAllCampusList();
  },
};
</script>
