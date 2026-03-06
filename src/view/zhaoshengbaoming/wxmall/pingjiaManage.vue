<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">今日</Button>
        <Button type="success" ghost @click="search(3)">本周内</Button>
        <Button type="warning" ghost @click="search(4)">本月</Button>
      </Col>
      <!---->
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getShoppingCatList"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="colData" :data="tableData"></Table>
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
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    // datesearchForm,
  },
  data() {
    return {
      menuID: "125",
      colData: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        // },
        {
          title: "订单ID",
          key: "orderNumber",
          align: "center",
          // width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "订单ID",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.orderNumber = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "订单商品详情",
          key: "goodsName",
          align: "center",
        },
        {
          title: "规格",
          key: "shuxingName",
          align: "center",
        },
        {
          title: "评价内容",
          key: "pingjia",
          align: "center",
        },
        {
          title: "评价类型",
          key: "pingjiaType",
          align: "center",
          //0.非常满意 1.满意 2.一般 3.很糟糕
          render: (h, params) => {
            if (params.row.pingjiaType == 0) {
              return h("div", [h("span", { style: { color: "#19be6b" } }, "非常满意")]);
            } else if (params.row.pingjiaType == 1) {
              return h("div", [h("span", { style: { color: "#2d8cf0" } }, "满意")]);
            } else if (params.row.pingjiaType == 2) {
              return h("div", [h("span", { style: { color: "#ff9900" } }, "一般")]);
            } else if (params.row.pingjiaType == 3) {
              return h("div", [h("span", { style: { color: "#ed4014" } }, "很糟糕")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "评价类型",
                  data: this.pingjiatypaData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.searchObj.pingjiaType = value;
                      this.search();
                    } else {
                      this.searchObj.pingjiaType = 0;
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "评价人",
          key: "nickName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "评价人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.pingjiaren = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "评价时间",
          key: "pingjiaDate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.pingjiaDate, "yyyy-MM-dd")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "评价时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.Sdate = value[0];
                    this.searchObj.Edate = value[1];
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        orderNumber: "",
        pingjiaType: 0,
        pingjiaren: "",
        Sdate: "",
        Edate: "",
        searchType: 0,
      },
      //0.非常满意 1.满意 2.一般 3.很糟糕
      pingjiatypaData: [
        { id: 0, name: "非常满意" },
        { id: 1, name: "满意" },
        { id: 2, name: "一般" },
        { id: 3, name: "很糟糕" },
      ],
    };
  },
  methods: {
    getShoppingCatList() {
      console.log(this.searchObj);
      api.get("/xwcloud-wsc/wsc/wsc/getorderpingjiaPages",this.searchObj).then((res) => {
        if ((res.code = "success")) {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        } else {
          this.$Message.error("查询信息失败");
        }
      });
    },
    TableSearch() {
      this.getShoppingCatList();
    },
    changePage(current) {
      this.tableData.current = current;
      this.getShoppingCatList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.tableData.size = pageSize;
      this.getShoppingCatList();
    },
    clickShijian(onclicks) {
      console.log(onclicks);
      let evalStr = "this." + onclicks;
      // if (onclicks.indexOf("addinfo") > -1 || onclicks.indexOf("edit") > -1) {
      //   evalStr += "()";
      // }
      eval(evalStr);
    },
    search(type = null) {
      this.searchObj.current = 1;
      this.searchObj.size = 10;
      this.searchObj.searchType = type == null ? 0 : type;
      if (type == 1) {
        this.searchObj = {
          size: 10,
          current: 1,
          orderNumber: "",
          pingjiaType: 0,
          pingjiaren: "",
          Sdate: "",
          Edate: "",
          searchType: 0,
        };
      }
      this.getShoppingCatList();
    },
  },
  mounted() {
    this.getShoppingCatList();
  },
};
</script>

<style lang="" scoped></style>
