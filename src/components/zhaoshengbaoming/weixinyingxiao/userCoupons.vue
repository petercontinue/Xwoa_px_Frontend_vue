<template>
  <Modal
    v-model="show"
    title="优惠券使用记录"
    @on-ok="ok"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
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
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
export default {
  name: "userCoupons",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: { type: Number },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      data: [], // 接口数据接收
      total: 0,
      params: {
        current: 1,
        size: 10,
        type: 0,
      },
      columns6: [
        {
          title: "名称",
          key: "couponsName",
          align: "center",
        },
        {
          title: "用户昵称",
          key: "nickName",
          align: "center",
        },
        {
          title: "抵扣金额",
          key: "youhuiMoney",
          align: "center",
        },
        {
          title: "金额限制",
          key: "manMoney",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.manMoney == null || params.row.manMoney == 0) {
              state = "无限制";
            } else {
              state = "满" + params.row.manMoney + "减" + params.row.youhuiMoney;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "商品种类",
          key: "goodleibie",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.goodleibie == null) {
              state = "无限制";
            } else {
              state = params.row.goodleibie;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "添加时间",
          key: "addDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.addDate,
              "yyyy-MM-dd - hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["Getuseryouhuiquan"]),

    getyouhuiquanPage() {
      this.Getuseryouhuiquan(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },
    ok() {
      this.$emit("input", val);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getyouhuiquanPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getyouhuiquanPage();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.type = this.type;
        console.log(this.params.type);
        this.getyouhuiquanPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
