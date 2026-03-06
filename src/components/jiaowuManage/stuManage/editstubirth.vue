<template>
  <Modal v-model="show" title="修改生日" :mask-closable="false" @on-cancel="closeModal(false)">
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="80">
      <FormItem label="日期" prop="stubirth">
        <DatePicker type="date" v-model="logForm.stubirth" placeholder="选择生日" style="width: 100%"></DatePicker>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveStuBirth('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
export default {
  name: "editstubirth",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        id: "",
        stubirth: "",
      },
      logFormRule: {
        stubirth: [
          {
            required: true,
            type: "date",
            message: "请选择学员的生日",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["updateBirth"]),

    closeModal(val) {
      this.$emit("input", val);
    },
    /**保存学员生日 */
    saveStuBirth(name) {
      console.log(this.logForm);
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.logForm.stubirth = toolbox.dateFtt(
            this.logForm.stubirth,
            "yyyy-MM-dd"
          );
          this.updateBirth(this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.closeModal(false);
            } else {
              this.$Message.error(res.msg);
              this.closeModal(false);
            }
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    /**清除 */
    handleReset(name) {
      this.closeModal(false);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["logForm"].resetFields();
        this.logForm.id = this.stuID;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
