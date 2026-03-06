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
    <banjishoufeitongjixiangxi
      v-model="showxiangxi"
      :xiangxiobj="selectobj"
    ></banjishoufeitongjixiangxi>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import EditgongzifenpeiForm from "../../../components/caiwuManage/editgongzifenpeiForm.vue";
import Banjishoufeitongjixiangxi from "../../../components/caiwuManage/banjishoufeitongjixiangxi.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Banjishoufeitongjixiangxi,
  },
  data() {
    return {
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "班级名称",
          key: "className",
          align: "center",
        },
        {
          title: "收费",
          key: "zongjia",
          align: "center",
          render: (h, params) => {
            if (params.row.zongjia == null) {
              return h("div", "0");
            } else {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickxiangxi(params.row);
                    },
                  },
                },
                params.row.zongjia
              );
            }
          },
        },
        {
          title: "剩余学费",
          key: "remainXuefei",
          align: "center",
          render: (h, params) => {
            if (params.row.remainXuefei == null) {
              return h("div", "0");
            } else {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickxiangxi(params.row);
                    },
                  },
                },
                params.row.remainXuefei
              );
            }
          },
        },
        {
          title: "剩余课时",
          key: "remainkeshi",
          align: "center",
          render: (h, params) => {
            if (params.row.remainkeshi == null) {
              return h("div", "0");
            } else {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickxiangxi(params.row);
                    },
                  },
                },
                params.row.remainkeshi
              );
            }
          },
        },
        {
          title: "课耗收入统计",
          key: "totalkehao",
          align: "center",
          render: (h, params) => {
            if (params.row.totalkehao == null) {
              return h("div", "0");
            } else {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickxiangxi(params.row);
                    },
                  },
                },
                params.row.totalkehao
              );
            }
          },
        },
        {
          title: "课时统计",
          key: "keshi",
          align: "center",
          render: (h, params) => {
            if (params.row.keshi == null) {
              return h("div", "0");
            } else {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickxiangxi(params.row);
                    },
                  },
                },
                params.row.keshi
              );
            }
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "334",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        salaryStyle: "",
        isJia: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      showxiangxi: false,
      selectobj: "",
    };
  },
  methods: {
    getBanjishoufeiListPage() {
      api
        .get("xwcloud-caiwu/caiwu/tongji/banjishoufei/getBanjitongjiPage", this.params)
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
      this.getBanjishoufeiListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getBanjishoufeiListPage();
    },
    clickxiangxi(row) {
      this.selectobj = row;
      this.showxiangxi = true;
    },
    clickShijian(onclicks) {},
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getBanjishoufeiListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getBanjishoufeiListPage();
  },
};
</script>
