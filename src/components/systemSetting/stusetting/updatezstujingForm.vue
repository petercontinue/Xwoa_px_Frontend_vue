<template>
  <Modal v-model="show" title="修改招生途径" :mask-closable="false" width="55">
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="招生途径" prop="telFromName">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.telFromName"
          placeholder="请输入招生途径"
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
      <Button type="primary" @click="ok()">保存并关闭</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "updatebuxistyle",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      shezhiForm: {
        telFromName: "",
        beizhu: "",
        id: "",
      },
      shezhiFormRule: {
        telFromName: [
          {
            required: true,
            message: "请输入招生途径",
            trigger: "change",
            type: "string",
          },
        ],
        beizhu: [
          {
            required: true,
            message: "请输入备注",
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
          api.post("/xwcloud-sys/sys/SystemSetting/Updateyxtelfrom",{
            id: this.shezhiForm.id,
            telFromName: this.shezhiForm.telFromName,
            beizhu: this.shezhiForm.beizhu,
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
        this.shezhiForm.id = JSON.parse(this.editData).id;
        this.shezhiForm.telFromName = JSON.parse(this.editData).telFromName;
        this.shezhiForm.beizhu = JSON.parse(this.editData).beizhu;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
