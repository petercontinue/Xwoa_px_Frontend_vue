<template>
  <Modal
    v-model="show"
    title="导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Alert show-icon>
      温馨提示：若不选择，则全部导出。
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
    </Alert>
    <Form ref="modalFrom" :model="params" :label-width="80">
      <FormItem label="日期" prop="date">
        <Date-picker
          v-model="params.date"
          type="daterange"
          placeholder="选择日期"
          style="width:100%"
        ></Date-picker>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import toolbox from "@/libs/toolbox";
export default {
  name: "daochuOrder",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      params: { date: null },
    };
  },
  methods: {
    ok() {
      let datesoe = null;
      if (this.params.date[0]) {
        datesoe =
          toolbox.dateFtt(this.params.date[0], "yyyy-MM-dd") +
          "_" +
          toolbox.dateFtt(this.params.date[1], "yyyy-MM-dd");
      }
      toolbox.exportExcel(
        "/xwcloud-wsc/wsc/wsc/exportOrder",
        {datesoe:datesoe},
        "订单信息",
        this
      );
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
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
        this.$refs["modalFrom"].resetFields();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>

<style lang="" scoped>
</style>