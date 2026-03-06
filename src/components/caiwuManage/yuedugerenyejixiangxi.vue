<template>
  <div>
    <Modal
      v-model="show"
      title="工资详细"
      @on-ok="ok"
      :loading="loading"
      :mask-closable="false"
      @on-cancel="closeModal(false)"
      :width="60"
    >
      <Row>
        <Col span="4">
          <Button type="info" @click="daochu">导出</Button>
        </Col>
        <Col span="20"></Col>
      </Row>
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
    <shourumingxi v-model="showshourumingxi" :liushuiID="selectID"></shourumingxi>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import Shourumingxi from "./shourumingxi.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    Shourumingxi,
  },
  name: "yuedugerenyejixiangxi",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    yejixiangxi: {},
  },
  data() {
    return {
      columns6: [
        {
          title: "业绩流水时间",
          key: "liushuidate",
          align: "center",
        },
        {
          title: "费用说明",
          key: "liushuiZaiyao",
          align: "center",
        },
        {
          title: "付款方式",
          key: "moneystyleName",
          align: "center",
        },
        {
          title: "收支类别",
          key: "shouzhiStyle",
          align: "center",
        },
        {
          title: "业绩收入",
          key: "shouruMoney",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.clickyeji(params.row);
                  },
                },
              },
              params.row.shouruMoney
            );
          },
        },
        {
          title: "支出(退费)",
          key: "zhichuMoney",
          align: "center",
        },
        {
          title: "录入时间",
          key: "luruTimea",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        year: "",
        month: "",
        campusID: "",
        staffID: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      showshourumingxi: false,
      selectID: "",
      loading: true,
    };
  },
  methods: {
    getGerenMonthDetailPageData() {
      api.get("xwcloud-caiwu/caiwu/tongji/yejipaiming/getGerenMonthDetailPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getGerenMonthDetailPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getGerenMonthDetailPageData();
    },
    clickyeji(row) {
      this.selectID = row.id;
      this.showshourumingxi = true;
    },
    daochu() {
      toolbox.exportExcel(
        "/xwcloud-caiwu/caiwu/tongji/yejipaiming/exportGerenyejixiangxi",
        this.params,
        "个人月度业绩详情",
        this
      );
    },
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
  },
  mounted: function () {
    // 初始化页面
    this.getGerenMonthDetailPageData();
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        // 获取校区列表
        console.log(this.yejixiangxi);
        this.params.campusID = this.yejixiangxi.campusID;
        this.params.staffID = this.yejixiangxi.staffID;
        let ym = this.yejixiangxi.liushuidate.split("-");
        this.params.year = ym[0];
        this.params.month = ym[1];
        this.getGerenMonthDetailPageData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
