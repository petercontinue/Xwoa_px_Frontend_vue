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
    <buttons-form v-model="menuID" v-on:handleSearch="getTuihuokuanList" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="colData"
          :data="tableData"
          @on-row-click="onClickRow"
        >
          <template slot-scope="{ row, storageStateValue }" slot="tuikuanState">
            <span v-show="false">
              {{
              (storageStateValue = getTuikuanStateValuie(row.tuikuanState))
              }}
            </span>
            <Tooltip
              placement="top"
              :content="'退款说明：' + row.chuliTuikuanShuoming"
              v-if="row.tuikuanState != 0"
            >
              <div :style="{ color: storageStateValue.color }">{{ storageStateValue.value }}</div>
            </Tooltip>
            <div v-else>{{ storageStateValue.value }}</div>
          </template>

          <template slot-scope="{ row, storageStateValue }" slot="tuihuoState">
            <span v-show="false">
              {{
              (storageStateValue = getTuihuoStateValue(row.tuihuoState))
              }}
            </span>
            <Tooltip
              placement="top"
              :content="'退货说明：' + row.chuliTuihuoShuoming"
              v-if="row.tuihuoState != 0"
            >
              <div :style="{ color: storageStateValue.color }">{{ storageStateValue.value }}</div>
            </Tooltip>
            <div v-else>{{ storageStateValue.value }}</div>
          </template>
        </Table>
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
    <goodsDetail v-model="detailShow" :orderNumber="orderNumber" :paystyle="payStyle"></goodsDetail>
    <agreeTuikuan
      v-model="tuikuanData.agreeTuikuanShow"
      :orderNumber="tuikuanData.orderNumber"
      :tuifeiID="tuikuanData.tuifeiID"
      @refreshPage="search()"
    ></agreeTuikuan>
    <refuseTuikuan
      v-model="tuikuanData.refuseTuikuanShow"
      :tuifeiID="tuikuanData.tuifeiID"
      @refreshPage="search()"
    ></refuseTuikuan>
    <rechargeOrderTuikuan v-model="rechargeTuikuanData.rechargeTuikuanShow" @refreshPage="search()"></rechargeOrderTuikuan>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import goodsDetail from "@/components/zhaoshengbaoming/wxmall/goodsDetail";
import agreeTuikuan from "@/components/zhaoshengbaoming/wxmall/agreeTuikuan";
import refuseTuikuan from "@/components/zhaoshengbaoming/wxmall/refuseTuikuan";
import rechargeOrderTuikuan from "@/components/zhaoshengbaoming/wxmall/rechargeOrderTuikuan";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    goodsDetail,
    agreeTuikuan,
    refuseTuikuan,
    rechargeOrderTuikuan,
    // selectsearchForm,
    // inputsearchForm,
    // datesearchForm,
  },
  data() {
    return {
      menuID: "124",
      colData: [
        {
          title: " ",
          align: "center",
          key: "checkBox",
          width: 60,
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {
                  "on-change": (e) => {},
                },
              }),
            ]);
          },
        },
        {
          title: "订单号",
          key: "orderNumber",
          align: "center",
          // width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "订单号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.orderNumber = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "订单商品详情",
          align: "center",
          render: (
            h,
            {
              row: {
                goodsCount,
                huodongid,
                huodongName,
                orderNumber,
                payStyle,
              },
            }
          ) => {
            let returnStr = "";
            if (huodongid) {
              returnStr = "招学秀_" + huodongName + "_" + goodsCount + "件";
            } else {
              returnStr = "微商城订单_" + goodsCount + "件";
            }
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.detailShow = true;
                    this.orderNumber = orderNumber;
                    this.payStyle = payStyle;
                  },
                },
              },
              returnStr
            );
          },
        },
        {
          title: "联系人",
          key: "receiveName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "联系人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.receiveName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "联系电话",
          key: "lianxiTel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "联系电话",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.lianxiTel = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "下单客户",
          key: "nickName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "下单客户",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.userName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "退款原因",
          key: "tuikuanShuoming",
          align: "center",
        },
        {
          title: "申请时间",
          align: "center",
          render: function (createElement, { row: { tuikuanTime } }) {
            return createElement(
              "div",
              toolbox.dateFtt(tuikuanTime, "yyyy-MM-dd")
            );
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "申请时间",
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
        {
          title: "退款处理状态",
          align: "center",
          slot: "tuikuanState",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "退款处理状态",
                  data: [
                    { id: 0, name: "待审核" },
                    { id: 1, name: "退款中" },
                    { id: 2, name: "拒绝退款" },
                    { id: 3, name: "退款成功" },
                    { id: 4, name: "退款失败" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.tuikuanState = value == -1 ? null : value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "退货处理状态",
          align: "center",
          slot: "tuihuoState",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "退货处理状态",
                  data: [
                    { id: 0, name: "待审核" },
                    { id: 1, name: "已退货" },
                    { id: 2, name: "拒绝退货" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.tuihuoState = value == -1 ? null : value;
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
      selection: [],
      searchObj: {
        size: 10,
        current: 1,
        orderNumber: null,
        receiveName: null,
        lianxiTel: null,
        userName: null,
        datesoe: null,
        tuikuanState: null,
        tuihuoState: null,
        searchType: null,
      },
      detailShow: false,
      orderNumber: null,
      payStyle: null,

      tuikuanData: {
        orderNumber: null,
        agreeTuikuanShow: false,
        tuifeiID: null,
        refuseTuikuanShow: null,
      },

      rechargeTuikuanData: {
        rechargeTuikuanShow: false,
      },
    };
  },
  methods: {
    getTuihuokuanList() {
      api.get("/xwcloud-wsc/wsc/wsc/getTuihuokuanPage",this.searchObj).then((res) => {
        if ((res.code = "success")) {
          // console.log(res.obj);
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);

          this.tableData.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
          console.log(this.tableData);
        }
      });
    },
    onClickRow(row, index) {
      this.selection = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked =
          !this.$refs.selection.data[index]._checked;
      } else {
        this.$refs.selection.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked =
          !this.$refs.selection.data[index]._checked;
        this.selection.push(this.$refs.selection.data[index]);
        console.log(this.selection);
      }
    },

    changePage(current) {
      this.tableData.current = current;
      this.getTuihuokuanList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.tableData.size = pageSize;
      this.getTuihuokuanList();
    },
    clickShijian(onclicks) {
      // console.log(onclicks);
      let evalStr = "this." + onclicks;
      // if (onclicks.indexOf("addinfo") > -1 || onclicks.indexOf("edit") > -1) {
      //   evalStr += "()";
      // }
      eval(evalStr);
    },
    selectTableChange(selection) {
      // console.log(selection)
      this.selection = selection;
    },
    search(type = null) {
      this.searchObj.current = 1;
      this.searchObj.size = 10;
      this.searchObj.searchType = type;
      if (type == 1) {
        this.searchObj = {
          size: 10,
          current: 1,
          orderNumber: null,
          receiveName: null,
          lianxiTel: null,
          userName: null,
          datesoe: null,
          tuikuanState: null,
          tuihuoState: null,
          searchType: null,
        };
      }
      this.getTuihuokuanList();
    },
    getTuikuanStateValuie(tuikuanState) {
      let returnStr = "";
      let returnColor = "";
      switch (tuikuanState) {
        case 0:
          returnStr = "待审核";
          break;
        case 1:
          returnStr = "退款中";
          returnColor = "blue";
          break;
        case 2:
          returnStr = "拒绝退款";
          returnColor = "red";
          break;
        case 3:
          returnStr = "退款成功";
          returnColor = "green";
          break;
        case 4:
          returnStr = "退款失败";
          returnColor = "red";
          break;
      }
      return { value: returnStr, color: returnColor };
    },
    getTuihuoStateValue(tuihuoState) {
      let returnStr = "";
      let returnColor = "";
      switch (tuihuoState) {
        case 0:
          returnStr = "待审核";
          break;
        case 1:
          returnStr = "已退货";
          returnColor = "green";
          break;
        case 2:
          returnStr = "拒绝退货";
          returnColor = "red";
          break;
      }
      return { value: returnStr, color: returnColor };
    },
    TYrefund() {
      if (this.selection.length == 1) {
        this.tuikuanData = {
          orderNumber: this.selection[0].orderNumber,
          agreeTuikuanShow: true,
          tuifeiID: this.selection[0].id,
        };
        // console.log(this.tuikuanData)
      } else {
        this.$Message.error("请至少选择一行");
      }
    },
    JJrefund() {
      if (this.selection.length == 1) {
        this.tuikuanData = {
          refuseTuikuanShow: true,
          tuifeiID: this.selection[0].id,
        };
        // console.log(this.tuikuanData)
      } else {
        this.$Message.error("请至少选择一行");
      }
    },
    cztui() {
      this.rechargeTuikuanData.rechargeTuikuanShow = true;
    },
    tuihuo() {},
    noTuihuo() {},
  },
  mounted() {
    this.getTuihuokuanList();
  },
};
</script>

<style lang="" scoped>
</style>