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
    <exporttuisong-form v-model="showexport"></exporttuisong-form>
    <stutuisong-form
      v-model="showstutuisong"
      v-on:handleSearch="loadTableData"
    ></stutuisong-form>
    <classtuisong-form
      v-model="showclasstuisong"
      v-on:handleSearch="loadTableData"
    ></classtuisong-form>
    <campustuisong-form
      v-model="showcampustuisong"
      v-on:handleSearch="loadTableData"
    ></campustuisong-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import exporttuisongForm from "../../../components/jiaowuManage/exporttuisongForm.vue";
import stutuisongForm from "../../../components/jiaowuManage/stutuisongForm.vue";
import classtuisongForm from "../../../components/jiaowuManage/classtuisongForm.vue";
import campustuisongForm from "../../../components/jiaowuManage/campustuisongForm.vue";
import * as api from "@/api/api.js";
export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    exporttuisongForm,
    stutuisongForm,
    classtuisongForm,
    campustuisongForm,
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
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
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
            let state = "";
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
              state = params.row.id;
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
                    this.stuNo = value;
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
                    this.stuName = value;
                    this.search();
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
            if (params.row.banzhuren) {
              return h("div", [h("span", params.row.banzhuren)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
        {
          title: "推送类型",
          key: "tuisongType",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "推送类型",
                  data: this.alltypeData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.type = value;
                      this.search();
                    } else {
                      this.type = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "微信通知",
          align: "center",
          key: "note",
        },
        {
          title: "推送时间",
          key: "addtime",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      size: 10,
      current: 1,
      menuID: "271",
      staffID: "11",
      // 控制弹窗
      campusID: 0,
      stuNo: "",
      stuName: "",
      type: 0,
      allcampusData: [],
      alltypeData: [],
      showexport: false,
      showstutuisong: false,
      showclasstuisong: false,
      showcampustuisong: false,
    };
  },
  methods: {
    ...mapActions(["GetStuWechatMessagePages", "getallcampusList", "GetAllTuisongType"]),
    loadTableData() {
      api
        .get("xwcloud-homeschool/homeschool/pxtuisongtable/GetStuWechatMessagePages", {
          size: this.size,
          current: this.current,
          campusID: this.campusID,
          stuNo: this.stuNo,
          stuName: this.stuName,
          type: this.type,
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
      this.loadTableData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.size = pageSize;
      this.loadTableData();
    },

    clickShijian(onclicks) {
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "xuanfasong()":
          this.showstutuisong = true;
          break;
        case "derive()":
          // 导出
          this.showexport = true;
          break;
        case "classfasong()":
          this.showclasstuisong = true;
          break;
        case "xiaoququnfa()":
          this.showcampustuisong = true;
          break;
        default:
          break;
      }
    },
    getCampusListData() {
      this.getWeixinqunfaCampusList({}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // 获取校区列表
          this.campusList = res.obj;
        }
      });
    },
    search() {
      this.current = 1;
      this.size = 10;
      this.loadTableData();
    },
    searchall() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.stuNo = "";
      this.stuName = "";
      this.type = 0;
      this.loadTableData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.loadTableData();
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: "271" })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    api
      .get("xwcloud-homeschool/homeschool/pxtuisongtable/GetAllTuisongType", {})
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.alltypeData = res.obj;
        }
      });
  },
};
</script>
