<template>
  <Modal
    v-model="show"
    title="修改收费方式"
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
      :label-width="180"
      :label-colon="true"
    >
      <FormItem label="类型" prop="isshouOrzhichu">
        <Select
          v-model="shezhiForm.isshouOrzhichu"
          placeholder="请选择类型"
          style="width: 100%"
        >
          <Option value="1">收入</Option>
          <Option value="2">支出</Option>
        </Select>
      </FormItem>
      <FormItem label="财务流水项目名称" prop="shouzhiStyle">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.shouzhiStyle"
          placeholder="请输入财务流水项目名称"
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
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "editPayMoneyStyle",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        shouzhiStyle: "",
        isshouOrzhichu: "",
        beizhu: "",
        id: "",
      },
      shezhiFormRule: {
        isshouOrzhichu: [
          {
            required: true,
            message: "请选择收入还是支出",
            trigger: "change",
            type: "string",
          },
        ],
        shouzhiStyle: [
          {
            required: true,
            message: "请输入财务流水项目名称",
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
          console.log(this.shezhiForm),
          api.post("xwcloud-sys/sys/SystemSetting/editShouzhistyle",{
              id: this.shezhiForm.id,
              shouzhiStyle: this.shezhiForm.shouzhiStyle,
              isshouOrzhichu: this.shezhiForm.isshouOrzhichu,
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

      setTimeout(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 1000);
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
        api.get("xwcloud-sys/sys/SystemSetting/getshouzhistyleById",{ Id: this.editID }).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.shezhiForm.id = res.obj.id;
            this.shezhiForm.isshouOrzhichu = res.obj.isshouOrzhichu;
            this.shezhiForm.shouzhiStyle = res.obj.shouzhiStyle;
            this.shezhiForm.beizhu = res.obj.beizhu;
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
