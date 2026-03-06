<style lang="less">
@import "./login.less";
</style>

<template>
  <div style="width:100%;height:100%;">
    <div class="loginLeft">
      <div class="centerImgDiv">
        <img src="../../assets/loginProduct.png" alt="">
      </div>
      <div class="jianjieDiv">
        校君宝：培训机构在线招生、营销商城、教务管理、家校互联、数据统计、大数据分析一站式SAAS软件平台。高性价比教培解决方案。
      </div>
      <div class="downDiv">
        <span class="downloadBtn"><span class="iconfont icon-xiazai" style="color:#61d4ca;padding-right:5px;" @click="downloadapp"></span>下载手机APP</span>
        <span class="downloadBtn"><span class="iconfont icon-xiazai" style="color:#61d4ca;padding-right:5px;"></span><a href = "https://www.google.cn/intl/zh-CN/chrome/" target="_blank">下载专用浏览器</a></span>
      </div>
      <div class="jishuzhichiDiv">版权所有 <a href="http://www.xw3q.com" target="_blank">校君宝</a> <a href="http://www.xw3q.com" target="_blank">www.xw3q.com</a></div>
    </div>
    <div class="loginRight">
      <div class="login-con">
        <div class="sysTitleLine">
          <div class="logoDiv"><img class="loginewm" src="../../assets/logo-min.png" alt=""></div>
          <div class="sysTitle">校君宝</div>
        </div>
        
        <!-- <Card icon="log-in" title="欢迎登录" :bordered="false">
          <div class="form-con">
            <login-form @on-success-valid="handleSubmit"></login-form>
          </div>
        </Card> -->
        <!-- <div class="loginHeader">
          <span :class=thisLoginStyleCss1 @click="loginStyle(1)">账号密码登录</span>
          <span :class=thisLoginStyleCss2 @click="loginStyle(2)">APP扫码登录</span>
        </div> -->

        <div class="form-con" v-if="thisloginStyle == 1">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
        <div class="form-con" style="text-align:center;" v-if="thisloginStyle == 2">
          <img class="loginewm" src="../../assets/xjb.jpg" alt="">
        </div>
      </div>
    </div>
    
  </div>

</template>

<script>
import LoginForm from "../../components/LoginForm";
import { mapActions } from "vuex";

export default {
  components: {
    LoginForm,
  },
  data(){
    return{
      thisLoginStyleCss1:"loginstyleCss active",
      thisLoginStyleCss2:"loginstyleCss",
      thisloginStyle:1,
    }
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    loginStyle(type){
      this.thisloginStyle = type;
      if(type == 1){
        this.thisLoginStyleCss1 = "loginstyleCss active";
        this.thisLoginStyleCss2 = "loginstyleCss";
      }else{
        this.thisLoginStyleCss1 = "loginstyleCss";
        this.thisLoginStyleCss2 = "loginstyleCss active";
      }
    },
    handleSubmit({
      username,
      password,
      grant_type,
      client_id,
      scope,
      client_secret,
      qiyeID,
      vcode,
      logintype
    }) {
      this.handleLogin({
        username,
        password,
        grant_type,
        client_id,
        scope,
        client_secret,
        qiyeID,
        vcode,
        logintype
      }).then((res) => {
        // console.log("====handleLogin res:");
        // console.log(res);
        if(res.code == "200"){
          this.getUserInfo().then((res) => {
            this.$router.push({
              name: this.$config.homeName,
            });
          });
        }else{
          this.$Message.error(res.data.msg);
        }

      });
    },
    //即将上架，敬请期待
    downloadapp(){
       this.$Message.info('即将上架，敬请期待');
    }
  },
  mounted() {
  },
};
</script>

<style>
</style>
