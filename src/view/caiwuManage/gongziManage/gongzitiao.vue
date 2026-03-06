<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
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
    <get-gongzixiangxi-form
      v-model="showxiangxi"
      @handleSearch="getgongziListPage"
      :gongziID="selectID"
    ></get-gongzixiangxi-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import GetGongzixiangxiForm from "../../../components/caiwuManage/getGongzixiangxiForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    GetGongzixiangxiForm,
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
          title: "员工",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "员工",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.staffName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "岗位",
          key: "postName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "岗位",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.staffPost = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "工资",
          key: "salaryMoney",
          align: "center",
        },
        {
          title: "时间",
          key: "salaryDate",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              toolbox.dateFtt(params.row.salaryDate, "yyyy-MM-dd hh:mm:ss")
            );
          },
        },
        {
          title: "详情",
          align: "center",
          render: (h, params) => {
            return h(
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
                    this.clickShuju(params.row.id);
                  },
                },
              },
              "详细"
            );
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "322",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        staffPost: "",
        staffName: "",
      },
      campusList: [],
      showxiangxi: false,
      selectID: "",
    };
  },
  methods: {
    getgongziListPage() {
      api
        .get("xwcloud-caiwu/caiwu/pxgongzitable/gongzitiao/getGongziPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(this.data);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getgongziListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getgongziListPage();
    },
    clickShijian(onclicks) {
      let IDs = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          IDs += items.id + ",";
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "derive()":
          toolbox.exportExcel(
            "/xwcloud-caiwu/caiwu/pxgongzitable/gongzitiao/exportGongzitiao",
            this.params,
            "工资条",
            this
          );
          break;
      }
    },
    clickShuju(gongziID) {
      this.selectID = gongziID;
      this.showxiangxi = true;
    },
    getCampusListData() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
      // this.getCampusList({
      //   qiyeID: this.$store.state.kehoupingjia.qiyeID,
      // }).then((res) => {
      //   if (res.code == "Y" && res.success == true) {
      //     // 获取班级列表
      //     this.campusList = res.obj;
      //     this.campusList.forEach((item) => {
      //       item.name = item.campusName;
      //     });
      //   }
      // });
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getgongziListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getgongziListPage();
    this.getCampusListData();
  },
};
</script>
