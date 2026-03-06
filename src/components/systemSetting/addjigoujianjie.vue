<template>
  <Modal
    v-model="show"
    title="机构简介信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="机构简介">
        <edit @increment="changejigoujianjie"></edit>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    edit,
  },
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        imgs: "",
        jianjieneirong: "",
      },
      shezhiFormRule: {},
    };
  },
  methods: {
    ok() {
      api.post("/xwcloud-sys/sys/SystemSetting/savejigoujianjie",{
        jianjiecontent: this.shezhiForm.jianjieneirong,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
    },
    changejigoujianjie(data) {
      this.shezhiForm.jianjieneirong = data;
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shezhiForm"].resetFields();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
