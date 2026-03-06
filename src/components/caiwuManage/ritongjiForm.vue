<template>
  <Modal
    v-model="show"
    title="日统计"
    @on-ok="ok"
    fullscreen
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form :model="params">
      <FormItem label="选择年月查询:">
        <DatePicker
          type="month"
          v-model="params.Ym"
          placeholder="请选择年月"
          style="width: 200px"
          @on-change="changeDate"
        ></DatePicker>
      </FormItem>
    </Form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
      </Col>
    </Row>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "getGongzixiangxiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      columns6: [
        {
          title: "日期(年月)",
          key: "days",
          align: "center",
        },
        {
          title: "日收入合计(元)",
          key: "shouruMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.shouruMoney !== undefined) {
              return h("div", params.row.shouruMoney);
            } else {
              return h("div", "0");
            }
          },
        },
        {
          title: "日支出合计(元)",
          key: "zhichuMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.zhichuMoney !== undefined) {
              return h("div", params.row.zhichuMoney);
            } else {
              return h("div", "0");
            }
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        Ym: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    getLiushuiDayData() {
      api.get("xwcloud-caiwu/caiwu/liushui/getLiushuiDay",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getLiushuiDayData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getLiushuiDayData();
    },
    changeDate(val){
        this.params.Ym=toolbox.dateFtt(val, "yyyy-MM");
        this.getLiushuiDayData();
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
    this.getLiushuiDayData();
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
        this.params.Ym = toolbox.dateFtt(new Date(), "yyyy-MM");
        this.getLiushuiDayData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
