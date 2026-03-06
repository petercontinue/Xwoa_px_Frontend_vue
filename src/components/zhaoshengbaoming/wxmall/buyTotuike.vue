<template>
  <Modal v-model="show" title="购买成为推客" :mask-closable="false" width="30">
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="120"
      :label-colon="true"
    >
      <FormItem label="购买推客级别" prop="buyTuikeLevelID">
        <Select
          v-model="shezhiForm.buyTuikeLevelID"
          placeholder="请选择购买推客级别"
          filterable
        >
          <Option v-for="item in tkData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>

      <FormItem label="真实姓名" prop="realName">
        <Input type="text" v-model="shezhiForm.realName" placeholder="请输入真实姓名" />
      </FormItem>

      <FormItem label="联系电话" prop="phone">
        <Input
          type="text"
          v-model="shezhiForm.phone"
          maxlength="11"
          placeholder="请输入联系电话"
        />
      </FormItem>

      <FormItem label="购买说明" prop="shuoming">
        <Input type="textarea" v-model="shezhiForm.shuoming" placeholder="请输入购买说明" />
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "edittuikelv",
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
      shezhiForm: {
        shuoming: "",
        buyTuikeLevelID: "",
        wscUserID: "",
        realName: "",
        phone: "",
      },
      shezhiFormRule: {
        buyTuikeLevelID: [
          {
            required: true,
            message: "请选择购买推客级别",
            trigger: "change",
          },
        ],
        shuoming: [
          {
            required: true,
            message: "请输入购买说明",
            trigger: "blur",
            type: "string",
          },
        ],
        realName: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur",
            type: "string",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
          {
            type: "string",
            max: 11,
            message: "请输入不超过11位的联系电话",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
      },
      tkData: [],
    };
  },
  methods: {
    ...mapActions(["buytuke", "getalltuikelvList"]),
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          this.buytuke(this.shezhiForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请将必填字段填写完整!");
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

        console.log(this.editID);
        this.shezhiForm.wscUserID = this.editID;
        this.getalltuikelvList().then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.tkData = res.obj;
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
