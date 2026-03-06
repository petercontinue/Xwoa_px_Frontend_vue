<template>
  <Modal
    v-model="show"
    title="学员微信账号"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="updatephoneFrom"
      :model="updatephone"
      :rules="updatephoneRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="手机号码" prop="campusID">
        <Input v-model="updatephone.phoneNumber" type="tel" placeholder="请输入修改的电话号码" />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "addLaoshikehoupingjia",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    stuID: {
      //学生ID
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      updatephone: {
        phoneNumber: "",
      },
      updatephoneRule: {
        // 验证输入
        phoneNumber: [
          {
            required: true,
            message: "请输入正确的电话号码",
            trigger: "blur",
            type: "string",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      // 点击确定按钮时调用
      this.$refs["updatephoneFrom"].validate((valid) => {
        if (valid) {
          api.get("xwcloud-homeschool/homeschool/pxstuweixin/editStuWxInfo",{
            id: this.stuID,
            tel: this.updatephone.phoneNumber,
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
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
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
        this.$refs["updatephoneFrom"].resetFields();
        console.log(this.stuID);
        // 获取校区列表
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
