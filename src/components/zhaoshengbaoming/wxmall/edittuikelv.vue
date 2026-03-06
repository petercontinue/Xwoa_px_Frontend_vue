<template>
  <Modal v-model="show" title="修改推客级别" :mask-closable="false" width="50">
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="推客新级别" prop="newtk_lv">
        <Select v-model="shezhiForm.newtk_lv" placeholder="请选择新的推客级别" filterable>
          <Option v-for="item in tkData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>

      <FormItem label="修改说明" prop="shuoming">
        <Input type="textarea" v-model="shezhiForm.shuoming" placeholder="请输入说明" />
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
        newtk_lv: "",
        wscUserID: "",
      },
      shezhiFormRule: {
        newtk_lv: [
          {
            required: true,
            message: "请选择新的推客级别",
            trigger: "change",
          },
        ],
        shuoming: [
          {
            required: true,
            message: "请输入修改说明",
            trigger: "change",
            type: "string",
          },
        ],
      },
      tkData: [],
    };
  },
  methods: {
    ...mapActions(["edittuikelevel", "getalltuikelvList"]),
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          this.edittuikelevel(this.shezhiForm).then((res) => {
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
