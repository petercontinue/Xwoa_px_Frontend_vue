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
    datesearchForm,
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
          title: "流水ID",
          key: "liushuiID",
          align: "center",
        },
        {
          title: "订单号",
          key: "orderNumber",
          align: "center",
        },
        {
          title: "金额",
          key: "shouruMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.shouruMoney > 0) {
              return h("div", [h("span", params.row.shouruMoney)]);
            } else {
              return h("div", [h("span", params.row.zhichuMoney)]);
            }
          },
        },
        {
          title: "流水产生时间",
          key: "luruTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.luruTime, "yyyy-MM-dd hh:mm:ss")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "流水产生时间",
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
        {
          title: "流水类型",
          align: "center",
          render: (h, params) => {
            if (params.row.shouruMoney > 0) {
              return h("div", [h("span", "收入")]);
            } else if (params.row.shouruMoney == 0) {
              return h("div", [h("span", "支出")]);
            }
          },
        },
        {
          title: "摘要",
          key: "liushuiZaiyao",
          align: "center",
        },
      ],
      tableData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        searchType: 0,
        Sdate: "",
        Edate: "",
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
      api.get("/xwcloud-wsc/wsc/wsc/getSqleLiushuiPages",this.searchObj).then((res) => {
        if ((res.code = "success")) {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        } else {
          this.$Message.error("查询信息失败");
        }
      });
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
      this.searchObj.searchType = type;
      if (type == 1) {
        this.searchObj = {
          size: 10,
          current: 1,
          searchType: type,
          Sdate: "",
          Edate: "",
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
