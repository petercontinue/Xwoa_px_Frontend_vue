<template>
  <Modal
    v-model="show"
    title="商品分类添加/修改"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="25"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="分类名称" prop="typeName">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.typeName"
          placeholder="请输入分类名称"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)">关闭</Button>
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
    editdata: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        id: 0,
        typeName: "",
      },
      shezhiFormRule: {
        typeName: [
          {
            required: true,
            message: "请输入分类名称",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          if (this.shezhiForm.id == 0) {
            api.post("xwcloud-zsbm/zsbm/JinXiaoCun/AddTeachingSuppliesType",{
              typeName: this.shezhiForm.typeName,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
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
            api.post("xwcloud-zsbm/zsbm/JinXiaoCun/UpdateTeachingSuppliesType",{
              id: this.shezhiForm.id,
              typeName: this.shezhiForm.typeName,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
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
        if (this.editdata != "") {
          this.shezhiForm.id = JSON.parse(this.editdata).id;
          this.shezhiForm.typeName = JSON.parse(this.editdata).typeName;
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
