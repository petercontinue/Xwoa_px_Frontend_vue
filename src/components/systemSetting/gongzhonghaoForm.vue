<template>
  <Modal
    v-model="show"
    title="微信公众号配置"
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
      :label-width="200"
      :label-colon="true"
    >
      <FormItem label="开发者ID(AppID)" prop="AppID">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.AppID"
          placeholder="请输入开发者ID(AppID)"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="开发者密码(AppSecret)" prop="AppSecret">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.AppSecret"
          placeholder="开发者密码(AppSecret)"
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
    campusID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        AppID: "",
        AppSecret: "",
      },
      shezhiFormRule: {
        AppID: [
          {
            required: true,
            message: "请输入开发者ID(AppID)",
            trigger: "change",
            type: "string",
          },
        ],
        AppSecret: [
          {
            required: true,
            message: "请输入开发者密码(AppSecret)",
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
          console.log(this.shezhiForm.buxistyle);
          api.post("/xwcloud-sys/sys/SystemSetting/EditCampusgongzhonghaoSetting",{
            campusID: this.campusID,
            AppID: this.shezhiForm.AppID,
            AppSecret: this.shezhiForm.AppSecret,
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
        console.log(this.campusID);
        this.$refs["shezhiForm"].resetFields();
        api.get("/xwcloud-sys/sys/SystemSetting/GetCampusInfoByCampusID",{ CampusID: this.campusID }).then(
          (res) => {
            if (res.code == "Y" && res.success == true) {
              this.shezhiForm.AppID = res.obj.appID;
              this.shezhiForm.AppSecret = res.obj.appSecret;
            }
          }
        );
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
