<template>
  <Modal
    v-model="show"
    title="日收入对账"
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
        <Table border ref="selection" :columns="columns" :data="data"></Table>
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
      columns: [],
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
    getShouruDayData() {
      api.get("xwcloud-caiwu/caiwu/liushui/GetRishouRuDuizhangTableKey",{}).then((result) => {
        if (result.code == "Y" && result.success == true) {
          this.columns[0] = {
            title: "日期(年月)",
            key: "Date",
            align: "center",
          };
          result.obj.forEach((item) => {
            let columnsObj = {
              title: item.moneystyleName,
              key: item.moneystyleName,
              align: "center",
            };
            this.columns.push(columnsObj);
          });
        }
      });
      api.get("xwcloud-caiwu/caiwu/liushui/GetRishouruDuizhangList",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
        } else {
          this.$Message.error("加载数据出错了&&&&&&&");
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.columns=[];
      this.getShouruDayData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.columns=[];
      this.getShouruDayData();
    },
    changeDate(val) {
      this.params.Ym = toolbox.dateFtt(val, "yyyy-MM");
      this.columns=[];
      this.getShouruDayData();
      console.log(this.params.Ym);
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
        this.columns = [];
        this.params.Ym = toolbox.dateFtt(new Date(), "yyyy-MM");
        this.getShouruDayData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
