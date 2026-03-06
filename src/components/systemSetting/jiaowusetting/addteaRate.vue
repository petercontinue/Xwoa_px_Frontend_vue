<template>
  <Modal v-model="show" title="添加考试类别" :mask-closable="false" width="50">
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="200"
      :label-colon="true"
    >
      <FormItem label="点评项目名称" prop="ratritem">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.ratritem"
          placeholder="请输入点评项目名称"
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
  name: "addteaRate",
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
      shezhiForm: {
        id: "",
        ratritem: "",
      },
      shezhiFormRule: {
        ratritem: [
          {
            required: true,
            message: "请输入点评项目名称",
            trigger: "blur",
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
          api.post("xwcloud-sys/sys/SystemSetting/addRate",this.shezhiForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              if (type == 1) {
                this.shezhiForm.id = "";
                this.shezhiForm.ratritem = "";
              } else if (type == 2) {
                this.shezhiForm.id = "";
                this.shezhiForm.ratritem = "";
                this.closeModal(false);
              }
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完成必填项！");
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
        this.shezhiForm.id = "";
        this.shezhiForm.ratritem = "";
        if (this.editdata != "") {
          console.log(JSON.parse(this.editdata));
          this.shezhiForm.ratritem = JSON.parse(this.editdata).pfName;
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
