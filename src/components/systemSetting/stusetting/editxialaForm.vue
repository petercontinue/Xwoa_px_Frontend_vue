<template>
  <Modal
    v-model="show"
    title="添加/修改下拉选项"
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
      <FormItem label="下拉选项" prop="stuParamTypeName">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.stuParamTypeName"
          placeholder="请输入下拉选项"
          style="width: 100%"
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
    paramsID: {
      type: String,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        stuParamTypeName: "",
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
      },
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          if (this.editData == "") {
            api.post("/xwcloud-sys/sys/SystemSetting/AddOptions",{
              stuParamTypeId: this.paramsID,
              DropDownOptions: this.shezhiForm.stuParamTypeName,
            })
              .then((result) => {
                if (result.code == "Y" && result.success == true) {
                  this.$Message.success(result.msg);
                  this.$emit("handleSearch");
                  this.closeModal(false);
                } else {
                  this.$Message.error(result.msg);
                  this.loading = false;
                  setTimeout(() => {
                    this.loading = true;
                  }, 0);
                }
              })
              .catch((err) => {});
          } else {
            api.post("/xwcloud-sys/sys/SystemSetting/EditOptions",{
              id: JSON.parse(this.editData).id,
              DropDownOptions: this.shezhiForm.stuParamTypeName,
            }).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.$Message.success(result.msg);
                this.$emit("handleSearch");
                this.closeModal(false);
              } else {
                this.$Message.error(result.msg);
                this.loading = false;
                setTimeout(() => {
                  this.loading = true;
                }, 0);
              }
            });
          }
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

        if (this.editData != "") {
          this.shezhiForm.stuParamTypeName = JSON.parse(
            this.editData
          ).dropDownOptions;
        } else {
          this.shezhiForm.stuParamTypeName = "";
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
