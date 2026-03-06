<template>
  <Modal
    v-model="show"
    title="重置密码"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    width="45"
  >
    <Form
      ref="changePasswordForm"
      :model="changePasswordForm"
      :rules="changePasswordFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <Row>
        <Col span="16">
          <FormItem label="手机号码" prop="telPhoneNumber">
            <Input
              type="tel"
              :maxlength="11"
              v-model="changePasswordForm.telPhoneNumber"
              placeholder="请输入手机号码"
              @on-change="changeUserName"
            />
          </FormItem>
        </Col>
        <Col span="6">
          <Button
            type="success"
            @click="getduanxinyanzhengma"
            :disabled="disabled"
            >获取短信验证码</Button
          >
        </Col>
      </Row>

      <FormItem label="验证码" prop="dxyanzhengma">
        <Input
          type="number"
          :maxlength="6"
          v-model="changePasswordForm.dxyanzhengma"
          placeholder="请输入验证码"
        />
      </FormItem>
      <FormItem label="选择企业" prop="qiyeID" v-if="qiyeData.length > 1">
        <Select v-model="changePasswordForm.qiyeID" placeholder="请选择企业">
          <Option v-for="item in qiyeData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="新密码" prop="newPassword">
        <Input
          type="password"
          :maxlength="50"
          v-model="changePasswordForm.newPassword"
          placeholder="请输入新密码"
        />
      </FormItem>
      <FormItem label="重输新密码" prop="checkNewPassword">
        <Input
          type="password"
          :maxlength="50"
          v-model="changePasswordForm.checkNewPassword"
          placeholder="请再次输入新密码"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "resetpassword",
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
      changePasswordForm: {
        telPhoneNumber: "",
        dxyanzhengma: "",
        oldPassword: "",
        newPassword: "",
        checkNewPassword: "",
        qiyeID: "1",
      },
      changePasswordFormRule: {
        telPhoneNumber: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur",
          },
        ],
        dxyanzhengma: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "blur",
          },
        ],
        oldPassword: [
          { required: true, message: "请输入旧的密码", trigger: "blur" },
          {
            type: "string",
            max: 50,
            min: 6,
            message: "密码最小长度为6",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            type: "string",
            max: 50,
            min: 6,
            message: "密码最小长度为6",
            trigger: "blur",
          },
        ],
        checkNewPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            type: "string",
            max: 50,
            min: 6,
            message: "密码最小长度为6",
            trigger: "blur",
          },
          {
            validator: this.validatorPassword({
              response: "exist",
            }),
            trigger: "blur",
          },
        ],
      },
      qiyeData: [],
      disabled: true,
    };
  },
  methods: {
    ...mapActions([
      "SendShortMessage",
      "GetAllqiyeInfoByuserPhone",
      "UpdateUserPassword",
    ]),
    ok() {
      this.$refs["changePasswordForm"].validate((valid) => {
        if (valid) {
          this.UpdateUserPassword({
            telPhoneNumber: this.changePasswordForm.telPhoneNumber,
            dxyanzhengma: this.changePasswordForm.dxyanzhengma,
            newPassword: this.changePasswordForm.newPassword,
            qiyeID: this.changePasswordForm.qiyeID,
          }).then((res) => {
            console.log(res);
            if (res.code == "Y" && res.success == true) {
              this.$message.success("重置密码成功，请重新登录");
              this.closeModal();
            } else {
              this.$Message.error(res.msg);
              // 官方目前没有解决方案
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
    closeModal(val) {
      this.$emit("input", val);
    },
    validatorPassword() {
      let _this = this;
      return function (rule, value, callback) {
        let newPassword = _this.changePasswordForm.newPassword;
        let checkNewPassword = _this.changePasswordForm.checkNewPassword;
        if (newPassword != "" && checkNewPassword != "") {
          if (newPassword != checkNewPassword) {
            callback(new Error("两次输入的密码不匹配"));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
    },
    getduanxinyanzhengma() {
      this.SendShortMessage({
        phoneNumber: this.changePasswordForm.telPhoneNumber,
      }).then((res) => {
        console.log(res);
        if (res.obj.body.code == "OK") {
          this.$Message.success("短信验证码发送成功，请注意查收");
        } else {
          this.$Message.Error("短信验证码发送失败，请稍后重试");
        }
      });
    },
    changeUserName() {
      if (this.changePasswordForm.telPhoneNumber.length == 11) {
        this.GetAllqiyeInfoByuserPhone({
          PhoneNumber: this.changePasswordForm.telPhoneNumber,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            if (res.obj.length < 1) {
              this.disabled = true;
              this.$Message.error("此用户不存在或账号已被冻结！");
            } else {
              this.disabled = false;
            }
            if (res.obj.length == 1) {
              this.changePasswordForm.qiyeID = res.obj[0].id;
            }
            this.qiyeData = res.obj;
          }
        });
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["changePasswordForm"].resetFields();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>