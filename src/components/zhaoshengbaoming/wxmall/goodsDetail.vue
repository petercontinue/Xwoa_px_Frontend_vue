<template>
  <Modal
    v-model="show"
    title="查看订单"
    :mask-closable="false"
    :footer-hide="true"
    @on-cancel="closeModal(false)"
    width="60"
  >
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
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
export default {
  name: "goodsDetail",
  props: {
    value: { type: Boolean, default: false },
    orderNumber: { type: String, default: null },
    paystyle: { type: Number, default: null },
  },
  data() {
    return {
      show: this.value,
      colData: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center",
        // },
        {
          title: "商品",
          key: "goodsName",
          align: "center",
        },
        {
          title: "规格",
          key: "goodsParam",
          align: "center",
        },
        {
          title: "购买数量",
          key: "nums",
          align: "center",
        },
        {
          title: "支付金额/积分",
          key: "payMoney",
          align: "center",
          render: (createElement, { row: { payMoney } }) => {
            let returnStr = "￥" + payMoney;
            if (this.paystyle == 2) {
              returnStr = payMoney + "积分";
            }
            return createElement("div", returnStr);
          },
        },
        {
          title: "购物满意度",
          align: "center",
          render: function (createElement, { row: { pingjiaType } }) {
            let returnStr = "";
            //0.非常满意 1.满意 2.一般 3.很糟糕
            switch (pingjiaType) {
              case 0:
                returnStr = "非常满意";
                break;
              case 1:
                returnStr = "满意";
                break;
              case 2:
                returnStr = "一般";
                break;
              case 3:
                returnStr = "很糟糕";
                break;
            }
            return createElement("div", returnStr);
          },
        },
        {
          title: "评价内容",
          key: "pingjia",
          align: "center",
        },
        {
          title: "评价时间",
          key: "pingjiaDate",
          align: "center",
        },
      ],
      tableData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        orderNumber: null,
      },
    };
  },
  methods: {
    ...mapActions(["getOrderGoodsDetailByOrderNumberPage"]),
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    getOrderGoodsDetailByOrderNumberList() {
      this.getOrderGoodsDetailByOrderNumberPage(this.searchObj).then((res) => {
        if ((res.code = "success")) {
          // console.log(res.obj);
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.tableData.current = current;
      this.getOrderGoodsDetailByOrderNumberList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.tableData.size = pageSize;
      this.getOrderGoodsDetailByOrderNumberList();
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      if (!val) {
        this.closeModal(val);
      }
    },
    orderNumber(val) {
      if (val) {
        this.searchObj.orderNumber = val;
        this.getOrderGoodsDetailByOrderNumberList();
      }
    },
  },
};
</script>

<style lang="" scoped>
</style>