<template>
  <Modal
    v-model="show"
    title="导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="laoshipingjiaFrom" :model="params" :rules="paramsRule" :label-width="100">
      <FormItem label="时间">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          type="daterange"
          v-model="joinTime"
          placeholder="选择起止日期"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "daochuyixiangqiandan",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        startDate: "",
        endDate: "",
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        exportType: [{}],
      },
      joinTime: "",
    };
  },
  methods: {
    ok() {
      this.$refs["laoshipingjiaFrom"].validate((valid) => {
        if (valid) {
          // 点击确定按钮时调用
          toolbox.exportExcel(
            "/xwcloud-caiwu/shujutongji/yixiang/exportYixiang",
            this.params,
            "意向统计",
            this
          );
        } else {
          this.$Message.error("请检查数据是否填对!");
        }
      });
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
        this.$refs["laoshipingjiaFrom"].resetFields();
        this.joinTime = "";
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
