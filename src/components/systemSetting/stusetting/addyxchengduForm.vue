<template>
  <Modal v-model="show" title="添加意向程度" :mask-closable="false" width="700">
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="意向程度" prop="telLevelName">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.telLevelName"
          placeholder="请输入意向程度"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="备注" prop="beizhu">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="shezhiForm.beizhu"
          placeholder="请输入备注"
          style="width: 100%"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "AddYixiangchengdu",
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
        telLevelName: "",
        beizhu: "",
      },
      shezhiFormRule: {
        telLevelName: [
          {
            required: true,
            message: "请输入意向程度",
            trigger: "change",
            type: "string",
          },
        ],
      },
    };
  },
  methods: {
    ok(type) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          console.log(this.shezhiForm.telLevelName);
          api.post("/xwcloud-sys/sys/SystemSetting/AddYixiangchengdu",{
            telLevelName: this.shezhiForm.telLevelName,
            beizhu: this.shezhiForm.beizhu,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              if (type == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              } else {
                this.$refs["shezhiForm"].resetFields();
              }
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

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
