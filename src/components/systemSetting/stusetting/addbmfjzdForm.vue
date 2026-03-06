<template>
  <Modal
    v-model="show"
    title="添加报名附加字段"
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
      <FormItem label="字段名称" prop="stuParamTypeName">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.stuParamTypeName"
          placeholder="请输入字段名称"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="是否必填" prop="IsBiTian">
        <Select
          v-model="shezhiForm.IsBiTian"
          placeholder="请选择是否必填"
          style="width: 100%"
        >
          <Option value="1">是</Option>
          <Option value="2">否</Option>
        </Select>
      </FormItem>
      <FormItem label="类型" prop="widthType">
        <Select
          v-model="shezhiForm.widthType"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <Option value="0">短框</Option>
          <Option value="1">长框</Option>
          <Option value="2">下拉框</Option>
        </Select>
      </FormItem>
    </Form>
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
        stuParamTypeName: "",
        IsBiTian: "",
        widthType: "",
      },
      shezhiFormRule: {
        stuParamTypeName: [
          {
            required: true,
            message: "请输入字段名称",
            trigger: "change",
            type: "string",
          },
        ],
        IsBiTian: [
          {
            required: true,
            message: "请选择是否必填",
            trigger: "change",
            type: "string",
          },
        ],
        widthType: [
          {
            required: true,
            message: "请选择是否必填",
            trigger: "change",
            type: "string",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-sys/sys/SystemSetting/AddStuParamTypeInfo",{
            StuParamTypeName: this.shezhiForm.stuParamTypeName,
            IsBiTian: this.shezhiForm.IsBiTian == 1 ? true : false,
            widthType: this.shezhiForm.widthType,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.loading = false;
              setTimeout(() => {
                this.loading = true;
              }, 0);
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
