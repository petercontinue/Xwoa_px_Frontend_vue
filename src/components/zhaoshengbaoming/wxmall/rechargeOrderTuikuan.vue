<template>
  <Modal
    v-model="show"
    title="充值订单退款"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="modalFrom" :model="params" :label-width="80" @keydown.native.enter.prevent="()=>{}">
      <FormItem
        label="订单号"
        prop="orderNumber"
        :rules="{
          message: '请输入订单号',
          required: true,
          trigger: 'change',
        }"
      >
        <Input
          v-model="params.orderNumber"
          placeholder="请输入订单号"
        ></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import toolbox from "@/libs/toolbox";
import { mapActions } from "vuex";
export default {
  name: "rechargeOrderTuikuan",
  props: {
    value: { type: Boolean, default: false },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      params: {
        orderNumber: null,
      },
    };
  },
  methods: {
    ...mapActions(["rechargeOrderTuikuan"]),
    ok() {
      this.$refs["modalFrom"].validate((valide) => {
        // console.log(valid)
        if (valide) {
          // return;
          this.rechargeOrderTuikuan(this.params).then((res) => {
            if (res.code == "success") {
              this.$Message.success(res.msg);
              this.closeModal(false);
              this.$emit("refreshPage");
            } else {
              this.$Message.error(res.msg);
              this.loading = false;
              this.$nextTick(() => {
                this.loading = true;
              });
            }
          });
        } else {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
          this.$Message.error("请填写完整");
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