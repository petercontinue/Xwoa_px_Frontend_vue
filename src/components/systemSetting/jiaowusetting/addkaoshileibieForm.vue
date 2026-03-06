<template>
  <Modal
    v-model="show"
    title="添加考试类别"
    :loading="loading"
    :mask-closable="false"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="200"
      :label-colon="true"
    >
      <FormItem label="考试类别名称" prop="testtype">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.testtype"
          placeholder="请输入考试类别名称"
          style="width: 100%"
        />
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import * as api from "@/api/api.js";

export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdata: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        id: "",
        testtype: "",
      },
      shezhiFormRule: {
        testtype: [
          {
            required: true,
            message: "请输入考试类别名称",
            trigger: "change",
            type: "string",
          },
        ],
      },
    };
  },
  methods: {
    ok(type) {
      console.log(type);
      api.post("xwcloud-sys/sys/SystemSetting/SaveKaoshileibie",this.shezhiForm).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
          if (type == 1) {
            this.$refs["shezhiForm"].resetFields();
          } else if (type == 2) {
            this.$refs["shezhiForm"].resetFields();
          }
          this.closeModal(false);
        } else {
          this.$Message.error(res.msg);
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
        if (this.editdata != "") {
          this.shezhiForm.testtype = JSON.parse(this.editdata).testType;
          this.shezhiForm.id = JSON.parse(this.editdata).id;
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
