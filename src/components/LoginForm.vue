<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="loginformRule"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="userName">
      <Input
        v-model="form.userName"
        placeholder="请输入用户名"
        @on-change="changeUserName"
      >
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="qiyeID" v-if="qiyeData.length > 1">
      <Select v-model="form.qiyeID" placeholder="请选择登录企业">
        <Option v-for="item in qiyeData" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
    </FormItem>
    <!-- <FormItem prop="qiyeID">
      <Input v-model="form.qiyeID" placeholder="请输入企业ID">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem> -->
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="txyzm">
      <Input
        v-model="form.txyzm"
        placeholder="请输入图形验证码"
        style="width: 60%"
      ></Input>
      <div style="width: 35%; float: right">
        <div style="width: 100%; height: 32px; border-radius: 4px">
          <VerificationCode
            identifyCodes="ABCD"
            @changeyanzhengma="changeyanzhengma"
          ></VerificationCode>
        </div>
        <!-- <img
          :src="yzmsrc"
          alt=""
          @click="refreshCaptcha"
          style="width: 100%; height: 32px; border-radius: 4px"
        /> -->
      </div>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" size="large" long
        >登录</Button
      >
      <a @click="resetUsermima" class="forgetPasswdA">忘记密码?</a>
    </FormItem>
    <resetpassword v-model="showupdatepassword"></resetpassword>
  </Form>
</template>

<script>
import VerificationCode from "../components/identify";
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import resetpassword from "../components/resetpassword";
export default {
  components: {
    VerificationCode,
    resetpassword,
  },
  name: "login-form",
  props: {},
  data() {
    return {
      form: {
        userName: "13888888888",
        password: "",
        qiyeID: "",
        txyzm: "",
      },
      identifyCode: "", //当前生成的验证码
      yzmsrc: "",
      loginformRule: {
        userName: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
            type: "string",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change",
            type: "string",
          },
        ],
        txyzm: [
          {
            required: true,
            message: "图形验证码不能为空",
            trigger: "blur",
            type: "string",
          },
        ],
      },
      qiyeData: [],
      yzmuuID: "",
      showupdatepassword: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions(["GetAllqiyeInfoByuserPhone"]),
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit("on-success-valid", {
            username: this.form.userName,
            password: this.form.password,
            grant_type: "password",
            client_id: "web",
            scope: "all",
            client_secret: "123456",
            qiyeID: this.form.qiyeID,
            vcode: this.yzmuuID + "_" + this.form.txyzm,
            logintype: 2,
          });
        }
      });
    },
    //刷新获取验证码
    refreshCaptcha: function () {
      axios
        .request({
          method: "get",
          url: "/xwcloud-sys/weixin/createImg",
          responseType: "blob",
        })
        .then((res) => {
          this.yzmsrc = window.URL.createObjectURL(res);
        });
    },
    changeyanzhengma(data) {
      console.log(data);
      this.yzmuuID = data.split("_")[0];
    },
    changeUserName() {
      if (this.form.userName.length == 11) {
        this.GetAllqiyeInfoByuserPhone({
          PhoneNumber: this.form.userName,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            if (res.obj.length == 1) {
              this.form.qiyeID = res.obj[0].id;
            }
            this.qiyeData = res.obj;
          }
        });
      }
    },
    resetUsermima() {
      console.log("重置密码");
      this.showupdatepassword = true;
    },
  },
  mounted() {
    this.changeUserName();
    //刷新获取验证码
    this.refreshCaptcha();
  },
};
</script>

<style scoped lang="less">
</style>