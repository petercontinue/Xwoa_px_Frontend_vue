<template>
  <Modal
    v-model="isShow"
    title="导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Alert show-icon style="margin: 24px 0">
      温馨提示：若不选择，则全部导出。
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
    </Alert>
    <Form ref="formRef" :model="formData" :label-width="80">
      <FormItem label="校区" prop="campusID">
        <Select v-model="formData.campusID">
          <Option v-for="item in campusList" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="日期" prop="datesoe">
        <Date-picker
          v-model="formData.datesoe"
          type="daterange"
          placeholder="选择日期"
          style="width: 100%"
        ></Date-picker>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "daochuClassPorfit",
  props: {
    value: { default: false, type: Boolean },
    campusList: { default: [], type: Array },
  },
  data() {
    return {
      isShow: this.value,
      loading: true,
      formData: {
        campusID: null,
        datesoe: null,
      },
    };
  },
  computed: {},
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    ok() {
      let datesoe = null;
      if (this.formData.datesoe) {
        // console.log(this.formData.datesoe);
        if (this.formData.datesoe[0] && this.formData.datesoe[1]) {
          datesoe =
            toolbox.dateFtt(this.formData.datesoe[0], "yyyy-MM-dd") +
            "_" +
            toolbox.dateFtt(this.formData.datesoe[1], "yyyy-MM-dd");
        }
      }
      toolbox.exportExcel(
        "/xwcloud-caiwu/shujutongji/other/exportClassProfit",
        { campusID: this.formData.campusID, datesoe: datesoe },
        "导出班课收益",
        this
      );
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs.formRef.resetFields();
        setTimeout(()=> {
          this.$refs.formRef.resetFields();
        }, 10);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>