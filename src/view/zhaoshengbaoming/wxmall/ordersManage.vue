<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>1 全部完成以下三个步骤才完成商品的添加；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 商品返佣比例不设置的话，就是使用通用的返佣比例；</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
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
      v-on:handleSearch="getOrdersList"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
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
    <daochuOrder v-model="daochuShow"></daochuOrder>
    <goodsDetail
      v-model="detailShow"
      :orderNumber="orderNumber"
      :paystyle="payStyle"
    ></goodsDetail>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import daochuOrder from "@/components/zhaoshengbaoming/wxmall/daochuOrder";
import goodsDetail from "@/components/zhaoshengbaoming/wxmall/goodsDetail";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    daochuOrder,
    goodsDetail,
    // selectsearchForm,
    // inputsearchForm,
    // datesearchForm,
  },
  data() {
    return {
      menuID: "122",
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
          title: "订单状态",
          align: "center",
          render: function (createElement, { row: { orderState } }) {
            let returnStr = ""; //订单状态：1下单未支付、2下单已支付（未发货），3已发货（待收货），4已完成，5退款，6已关闭的订单
            let returnColor = "";
            switch (orderState) {
              case 1:
                returnStr = "待支付";
                returnColor = "#dc3545";
                break;
              case 2:
                returnStr = "未发货";
                returnColor = "#ffc107";
                break;
              case 3:
                returnStr = "待收货";
                returnColor = "#007bff";
                break;
              case 4:
                returnStr = "已完成";
                returnColor = "#28a745";
                break;
              case 5:
                returnStr = "退款";
                returnColor = "#dc3545";
                break;
              case 6:
                returnStr = "已关闭";
                break;
            }
            return createElement(
              "div",
              {
                style: {
                  color: returnColor,
                },
              },
              returnStr
            );
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "订单状态",
                  data: [
                    { id: 1, name: "待支付" },
                    { id: 2, name: "未发货" },
                    { id: 3, name: "待收货" },
                    { id: 4, name: "已完成" },
                    { id: 5, name: "退款" },
                    { id: 6, name: "已关闭" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.orderState = value == -1 ? null : value;
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
            { row: { goodsCount, huodongid, huodongName, orderNumber, payStyle } }
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
                    // console.log(this);
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
          title: "支付金额",
          key: "payMoney",
          align: "center",
        },
        {
          title: "支付方式",
          align: "center",
          render: function (createElement, { row: { payStyle } }) {
            let returnStr = ""; //0.余额支付 1.微信支付 2.积分支付
            switch (payStyle) {
              case 0:
                returnStr = "余额支付";
                break;
              case 1:
                returnStr = "微信支付";
                break;
              case 2:
                returnStr = "积分支付";
                break;
            }
            return createElement("div", returnStr);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "支付方式",
                  data: [
                    { id: 0, name: "余额支付" },
                    { id: 1, name: "微信支付" },
                    { id: 2, name: "积分支付" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.payStyle = value == -1 ? null : value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "支付积分",
          key: "payJifen",
          align: "center",
        },
        {
          title: "订单备注",
          key: "beizhu",
          align: "center",
        },
        {
          title: "下单时间",
          align: "center",
          render: function (createElement, { row: { orderDateTime } }) {
            return createElement("div", toolbox.dateFtt(orderDateTime,"yyyy-MM-dd hh:mm:ss"));
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
        {
          title: "下单客户",
          key: "orderUserName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "下单客户",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.orderUserName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "联系人",
          key: "receiveName",
          align: "center",
          render: (h, params) => {
            if (params.row.receiveName) {
              return h("div", [h("span", params.row.receiveName)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
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
          render: (h, params) => {
            if (params.row.lianxiTel) {
              return h("div", [h("span", params.row.lianxiTel)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
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
        // {
        //   title: "意向校区",
        //   align: "center",
        //   render:
        //   function (createElement, { row: { type, receiveDizhi } }) {
        //     let returnStr = type == 2 ? receiveDizhi : "-";
        //     return createElement("div", returnStr);
        //   },
        // },
        {
          title: "物流送货地址",
          key: "receiveDizhi",
          align: "center",
        },
        {
          title: "订单来源",
          align: "center",
          render: (h, params) => {
            if (params.row.orderFrom == 1) {
              return h("div", [h("span", "微信端")]);
            } else {
              return h("div", [h("span", "抖音")]);
            }
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
        type: null,
        receiveName: null,
        receiveDizhi: null,
        lianxiTel: null,
        payStyle: null,
        orderFrom: null,
        orderUserName: null,
        orderState: null,
        datesoe: null,
        searchType: null,
      },
      daochuShow: false,
      detailShow: false,
      orderNumber: null,
      payStyle: null,
    };
  },
  methods: {
    getOrdersList() {
      api.get("/xwcloud-wsc/wsc/wsc/getWscOrderPage",this.searchObj).then((res) => {
        if ((res.code = "success")) {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);

          this.tableData.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },
    onClickRow(row, index) {
      this.selection = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
      } else {
        this.$refs.selection.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.selection.push(this.$refs.selection.data[index]);
        console.log(this.selection);
      }
    },

    changePage(current) {
      this.searchObj.current = current;
      this.getOrdersList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.getOrdersList();
    },
    clickShijian(onclicks) {
      let evalStr = "this." + onclicks;
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
          orderNumber: null,
          type: null,
          receiveName: null,
          receiveDizhi: null,
          lianxiTel: null,
          payStyle: null,
          orderFrom: null,
          orderUserName: null,
          orderState: null,
          datesoe: null,
          searchType: null,
        };
      }
      this.getOrdersList();
    },
    //发货
    fahuo() {
      if (this.selection.length > 0) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定要发货吗</p>",
          loading: true,
          onOk: () => {
            // console.log("发货啦");
            let diss = this.selection.find((item) => {
              return item.orderState != 2;
            });
            if (diss) {
              this.$Message.error("含有不需要操作发货的订单");
              return;
            }
            let ids = this.selection.map((item) => {
              return item.id;
            });
            // console.log(ids);
            api.post("/xwcloud-wsc/wsc/wsc/orderFahuo",ids).then((res) => {
              if (res.code == "success") {
                this.getOrdersList();
                this.$Message.success(res.msg);
              } else {
                this.$Message.error(res.msg);
              }
            });
            this.$Modal.remove();
          },
          onCancel: () => {},
        });
      } else {
        this.$Message.error("请至少选择一行操作");
      }
    },
    //完成订单
    wancheng() {
      if (this.selection.length == 1) {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定订单完成吗？</p>",
          loading: true,
          onOk: () => {
            // console.log("发货啦");
            if (this.selection[0].orderState != 3) {
              this.$Message.error("该订单不需要操作完成");
              return;
            }
            // console.log(ids);
            api.post("/xwcloud-wsc/wsc/wsc/orderWancheng",{ orderID: this.selection[0].id }).then((res) => {
              if (res.code == "success") {
                this.getOrdersList();
                this.$Message.success(res.msg);
              } else {
                this.$Message.error(res.msg);
              }
            });
            this.$Modal.remove();
          },
          onCancel: () => {},
        });
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    //导出订单
    derivedd() {
      this.daochuShow = true;
    },
  },
  mounted() {
    this.getOrdersList();
  },
};
</script>

<style lang="" scoped></style>
