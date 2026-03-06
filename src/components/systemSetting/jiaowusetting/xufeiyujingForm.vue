<template>
  <Modal
    v-model="show"
    title="续费预警"
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
      <FormItem label="预警方式" prop="yujingtype">
        <Select
          v-model="shezhiForm.yujingtype"
          placeholder="请选择预警方式"
          style="width: 100%;"
        >
          <Option value="1">总课时预警</Option>
          <Option value="2">单科课时预警</Option>
        </Select>
      </FormItem>
      <FormItem label="剩余课时" prop="remainkeshi">
        <Input
          type="number"
          :maxlength="50"
          v-model="shezhiForm.remainkeshi"
          placeholder="请输入剩余课时"
          style="width: 100%;"
        />
      </FormItem>
      <FormItem label="剩余天数" prop="remainDays">
        <Input
          type="number"
          :maxlength="50"
          v-model="shezhiForm.remainDays"
          placeholder="请输入剩余天数"
          style="width: 100%;"
        />
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
        yujingtype: "",
        remainkeshi: "",
        remainDays: "",
      },
      shezhiFormRule: {
        yujingtype: [
          {
            required: true,
            message: "请选择预警类型",
            trigger: "change",
            type: "string",
          },
        ],
        remainkeshi: [
          {
            required: true,
            message: "请输入剩余课时",
            trigger: "change",
            type: "number",
          },
        ],
        remainDays: [
          {
            required: true,
            message: "请输入剩余天数",
            trigger: "change",
            type: "string",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      api.post("/xwcloud-sys/sys/SystemSetting/AddStuParamTypeInfo",{
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
          this.$Message.error(res.msg);
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
