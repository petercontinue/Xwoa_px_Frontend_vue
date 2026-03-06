<template>
  <Modal
    v-model="show"
    title="添加培训方式"
    :loading="loading"
    :mask-closable="false"

    width="30"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="培训方式" prop="buxistyle">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.buxistyle"
          placeholder="请输入培训方式"
          style="width: 100%"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button> 
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
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
        buxistyle: "",
      },
      shezhiFormRule: {
        buxistyle: [
          {
            required: true,
            message: "请输入培训方式",
            trigger: "change",
            type: "string",
          },
        ],
      },
    };
  },
  methods: {
    ok(closeFlag) {
      console.log(this.shezhiForm.buxistyle);
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api.post("/xwcloud-sys/sys/SystemSetting/addbuxistyle",{
            buxiStyleName: this.shezhiForm.buxistyle,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              if(closeFlag == 2){
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
              
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
              this.loading = false;
              setTimeout(() => {
                this.loading = true;
              }, 0);
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
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
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
