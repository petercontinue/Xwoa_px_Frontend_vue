<template>
  <Modal
    v-model="isShow"
    title="分配负责人"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="20"
  >
    <Form ref="fenpei" :model="formData" :label-width="100">
      <FormItem
        label="负责人"
        prop="fenpeiStaffID"
        :rules="{
          required: true,
          message: '请选择负责人',
          trigger: 'change',
          type: 'string',
        }"
      >
        <Select clearable filterable v-model="formData.fenpeiStaffID" placeholder="请选择负责人">
          <Option v-for="item in staffList" :value="item.id" :key="item.id">
            {{
            item.staffName
            }}
          </Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
import * as api from "@/api/api.js";

export default {
  name: "fenpeiModal",
  props: {
    value: { default: false, type: Boolean },
    stuIDs: { default: [], type: Array },
    staffList: { default: [], type: Array },
  },
  data() {
    return {
      isShow: this.value,
      loading: true,
      formData: {
        fenpeiStaffID: null,
        stuIDs: null,
      },
    };
  },
  computed: {},
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    ok() {
      this.$refs.fenpei.validate((valid) => {
        if (valid) {
          console.log(this.formData);
          api.post("xwcloud-zsbm/yxstu/YixiangStu/saveFenpeixingxi",this.formData).then((res) => {
            if (res.success) {
              this.$Message.success(res.msg);
              this.closeModal(false);
              this.$emit("refreshPage", "refresh");
            } else {
              this.$Message.error(res.msg);
              this.loading = false;
              this.$nextTick(() => {
                this.loading = true;
              });
            }
          });
        } else {
          this.$Message.error("请完善信息");
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }
      });
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs.fenpei.resetFields();
        setTimeout(() => {
          this.$refs.fenpei.resetFields();
        }, 10);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    stuIDs(val) {
      if (val) {
        this.formData.stuIDs = val;
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>