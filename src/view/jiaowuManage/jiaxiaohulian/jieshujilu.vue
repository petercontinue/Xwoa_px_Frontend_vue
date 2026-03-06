<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-page-size-change="changePageSize"
        @on-change="changePage"
      />
    </Row>
    <guihuanxiangqing-form
      v-model="showguihuan"
      :jieshuid="jieshuID"
    ></guihuanxiangqing-form>
    <huanshu-form
      v-model="showhuanshu"
      :jieshuid="jieshuID"
      :bookID="bookID"
      @handleSearch="getBorrowingRecordsListPage"
    ></huanshu-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import GuihuanxiangqingForm from "../../../components/jiaowuManage/guihuanxiangqingForm.vue";
import HuanshuForm from "../../../components/jiaowuManage/huanshuForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    GuihuanxiangqingForm,
    HuanshuForm,
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
          title: "图书名称",
          key: "bookName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "图书名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.bookName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "借阅数量",
          key: "borrownum",
          align: "center",
        },
        {
          title: "借书人",
          key: "peopleName",
          align: "center",
        },
        {
          title: "角色",
          key: "role",
          align: "center",
          render: (h, params) => {
            if (params.row.role == 1) {
              return h("div", [h("span", "教师")]);
            } else if (params.row.role == 2) {
              return h("div", [h("span", "学生")]);
            } else {
              return h("div", [h("span", "未知")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "角色",
                  data: this.roleData,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.role = value;
                      this.search();
                    } else {
                      this.params.role = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
          // renderHeader: (h, params) => {
          //   return h("div", [
          //     h(inputsearchForm, {
          //       props: {
          //         placement: "bottom-start",
          //         showArrow: false,
          //         content: "角色",
          //       },
          //       on: {
          //         "on-clickSearch": (value) => {
          //           this.params.role = value;
          //           this.search();
          //         },
          //       },
          //     }),
          //   ]);
          // },
        },
        {
          title: "归还日期",
          align: "center",
          key: "endDate",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.endDate, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "归还日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.returnstartDate = value[0];
                    this.params.returnendDate = value[1];
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "剩余天数",
          key: "surplusDays",
          align: "center",
          render: (h, params) => {
            if (params.row.surplusDays <= 0) {
              return h("span", "已过期");
            } else {
              return h("span", params.row.surplusDays);
            }
          },
        },
        {
          title: "说明",
          key: "beizhu",
          align: "center",
        },
        {
          title: "经办人",
          key: "dostaffName",
          align: "center",
        },
        {
          title: "经办时间",
          key: "doDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.doDate, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "经办时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.dostartDate = value[0];
                    this.params.doendDate = value[1];
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "归还数",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.clickXiangqing(params.row.booksID);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.clickHuanshu(params.row.id, params.row.booksID);
                    },
                  },
                },
                "还书"
              ),
            ]);
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        bookName: "",
        role: "",
        returnstartDate: "",
        returnendDate: "",
        dostaffName: "",
        dostartDate: "",
        doendDate: "",
      },
      campusList: [],
      showguihuan: false,
      showhuanshu: false,
      jieshuID: "",
      bookID: "",
      roleData: [
        { id: 2, name: "学生" },
        { id: 1, name: "教师" },
      ],
    };
  },
  methods: {
    getBorrowingRecordsListPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxbooks/getBorrowingRecordsPage", this.params)
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
      this.getBorrowingRecordsListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getBorrowingRecordsListPage();
    },
    clickXiangqing(val) {
      console.log(val);
      this.showguihuan = true;
      this.jieshuID = val;
    },
    clickHuanshu(val, bookid) {
      this.showhuanshu = true;
      this.jieshuID = val;
      this.bookID = bookid;
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getBorrowingRecordsListPage();
    },
    searchAll() {
      this.params.current = 1;
      this.params.size = 10;
      this.params.campusID = "";
      this.params.bookName = "";
      this.params.role = "";
      this.params.returnstartDate = "";
      this.params.returnendDate = "";
      this.params.dostaffName = "";
      this.params.dostartDate = "";
      this.params.doendDate = "";
      this.getBorrowingRecordsListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getBorrowingRecordsListPage();
    api.get("xwcloud-homeschool/homeschool/public/getCampusList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        // 获取班级列表
        this.campusList = res.obj;
        this.campusList.forEach((item) => {
          item.name = item.campusName;
        });
      }
    });
  },
};
</script>
