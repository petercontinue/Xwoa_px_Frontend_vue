<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="changepasswd">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <Modal v-model="editshow" title="修改密码">
      <Form
        ref="shezhiForm"
        :model="shezhiForm"
        :rules="shezhiFormRule"
        :label-width="120"
        :label-colon="true"
      >
        <FormItem label="用户">
          <Input type="text" v-model="staffName" style="width: 100%" />
        </FormItem>
        <FormItem label="原密码" prop="oldpwd">
          <Input
            type="text"
            v-model="shezhiForm.oldpwd"
            style="width: 100%"
            placeholder="请输入原密码"
          />
        </FormItem>
        <FormItem label="新密码" prop="pwd">
          <Input
            type="text"
            v-model="shezhiForm.pwd"
            style="width: 100%"
            placeholder="请输入新密码"
          />
        </FormItem>
        <FormItem label="确认密码" prop="anginpwd">
          <Input
            type="text"
            v-model="shezhiForm.anginpwd"
            style="width: 100%"
            placeholder="请输入确认密码"
          />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="ok()">保存</Button>
        <Button @click="closeModal()">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import "./user.less";
import { mapActions } from "vuex";
export default {
  name: "User",
  props: {
    userAvatar: {
      type: String,
      default: "",
    },
    messageUnreadCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      editshow: false,
      shezhiForm: {
        staffID: "",
        oldpwd: "",
        pwd: "",
        anginpwd: "",
      },
      shezhiFormRule: {
        oldpwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        anginpwd: [{ required: true, message: "请输人确认密码", trigger: "blur" }],
      },
      staffName: "",
      user: [],
    };
  },
  mounted: function () {
    this.$refs["shezhiForm"].resetFields();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.shezhiForm.staffID = this.user.staffID;
    this.staffName = this.user.staffName;
  },
  methods: {
    ...mapActions(["handleLogOut", "updateloginuserpwd"]),
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: "login",
        });
      });
    },
    message() {
      this.$router.push({
        name: "message_page",
      });
    },
    changepasswd() {
      this.editshow = true;
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
        case "changepasswd":
          this.changepasswd();
          break;
      }
    },

    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          if (this.shezhiForm.pwd != this.shezhiForm.anginpwd) {
            this.$Message.error("密码与确认密码不一致");
          } else {
            this.updateloginuserpwd({
              id: this.shezhiForm.staffID,
              oldpwd: this.shezhiForm.oldpwd,
              pwd: this.shezhiForm.pwd,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);

                this.$Message.success({
                  content: "密码修改成功，请重新登录。",
                  duration: 1,
                });
                setTimeout(() => {
                  this.logout();
                }, 1000);
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        } else {
          this.$Message.error("请将必填字段填写完整!");
        }
      });
    },
    closeModal() {
      this.$refs["shezhiForm"].resetFields();
      this.editshow = false;
    },
  },
};
</script>
