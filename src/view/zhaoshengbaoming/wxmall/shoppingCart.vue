<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">今日</Button>
        <Button type="success" ghost @click="search(3)">本周</Button>
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
        <Table
          border
          ref="selection"
          :columns="colData"
          :data="tableData"
        ></Table>
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
    // selectsearchForm,
    // inputsearchForm,
    // datesearchForm,
  },
  data() {
    return {
      menuID: "123",
      colData: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        // },
        {
          title: "商品名称",
          key: "goodsName",
          align: "center",
          // width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "商品名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.goodsName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "规格",
          key: "guige",
          align: "center",
          // width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "规格",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.guige = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "价格",
          key: "price",
          align: "center",
          // width: 100,
        },
        {
          title: "添加人",
          key: "addUserName",
          align: "center",
          // width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "添加人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.addUser = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "下单时间",
          align: "center",
          render: function (createElement, { row: { addDateTime } }) {
            return createElement(
              "div",
              toolbox.dateFtt(addDateTime,"yyyy-MM-dd")
            );
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "下单时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.datesoe = value ? value.join("_") : null;
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
        goodsName:null,
        guige:null,
        addUser:null,
        datesoe:null,
        searchType: null,
      },
    };
  },
  methods: {
    getShoppingCatList() {
      api.get("/xwcloud-wsc/wsc/wsc/getShoppingCatPage",this.searchObj).then((res) => {
        if ((res.code = "success")) {
          // console.log(res.obj);
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.searchObj.current = current;
      this.getShoppingCatList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
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
        goodsName:null,
        guige:null,
        addUser:null,
        datesoe:null,
          searchType: null,
        };
      }
      this.getShoppingCatList();
    },
  },
  mounted () {
    this.getShoppingCatList();
  }
};
</script>

<style lang="" scoped>
</style>