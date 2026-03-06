<template>
  <Modal
    v-model="show"
    title="课程延期"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="25"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="80"
      :label-colon="true"
    >
      <FormItem label="日期" prop="endDate">
        <DatePicker
          type="date"
          v-model="logForm.endDate"
          placeholder="选择新的结束日期"
          style="width: 100%"
          :options="endTimeOptions"
        ></DatePicker>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="kcYangqi('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "kechengyangqi",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxiID: { type: String },
    endTime: { type: Number },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      logForm: {
        bxkeID: "",
        endDate: "",
      },
      logFormRule: {
        endDate: [
          {
            required: true,
            type: "date",
            message: "请选择结束日期",
            trigger: "change",
          },
        ],
      },
      endTimeOptions: {},
    };
  },
  methods: {
    /**保存 */
    kcYangqi(name) {
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.logForm.endDate = toolbox.dateFtt(this.logForm.endDate, "yyyy-MM-dd");
          console.log(this.logForm);
          api.post("xwcloud-stu/stu/buxikecheng/KechengYanqi",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    /**清除 */
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
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
      this.$refs["logForm"].resetFields();
      if (val) {
        this.logForm.bxkeID = this.buxiID;
        console.log(this.endTime);
        let Dt = toolbox.dateFtt(this.endTime, "yyyy-MM-dd");

        this.endTimeOptions = {
          disabledDate: (date) => {
            let endT = new Date(Dt).valueOf();
            return date && date.valueOf() < endT;
          },
        };
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
