<template>
  <Modal
    v-model="show"
    title="修改补习方式"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="buxistyleForm"
      :model="buxistyleForm"
      :rules="buxistyleFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="补习方式" prop="buxiStyleName">
        <input
          type="text"
          placeholder="请输入补习方式"
          v-model="buxistyleForm.buxiStyleName"
          style="width: 100%"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "updatebuxistyle",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdataID: {
      type: String,
    },
    buxiStyleName: {
      type: String,
    },
    qiyeID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      buxistyleForm: {
        buxiStyleName: "",
        id: "",
        qiyeID: "",
      },
      buxistyleFormRule: {
        buxiStyleName: [
          { required: true, message: "请输入补习方式", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["buxistyleForm"].validate((valid) => {
        if (valid) {
          console.log(this.buxistyleForm),
          api.post("/xwcloud-sys/sys/SystemSetting/updatebuxistyle",{
              id: this.buxistyleForm.id,
              buxiStyleName: this.buxistyleForm.buxiStyleName,
              qiyeID: this.buxistyleForm.qiyeID,
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
        this.$refs["buxistyleForm"].resetFields();
        // console.log("=======0:");
        // console.log(this.editdataID);
        // console.log("=======1:");
        // console.log(this.buxiStyleName);

        this.buxistyleForm.id = this.editdataID;
        this.buxistyleForm.buxiStyleName = this.buxiStyleName;
        this.buxistyleForm.qiyeID = this.qiyeID;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>

