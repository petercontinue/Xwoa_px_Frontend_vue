<template>
  <Modal
    v-model="show"
    title="修改周工作总结"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="周起始日期：" prop="startDate">
        <DatePicker
          type="date"
          placeholder="请选择周起始日期"
          v-model="logForm.startDate"
          style="width: 100%"
          :editable="false"
        ></DatePicker>
      </FormItem>
      <FormItem label="本周工作总结：" prop="thisWeekRecord">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="logForm.thisWeekRecord"
          placeholder="请输入本周工作总结"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="下周工作要点：" prop="nextWeekRecord">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="logForm.nextWeekRecord"
          placeholder="请输入下周工作要点"
          style="width: 100%"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import uploadimgForm from "../../components/common-buttons/uploadimgForm";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "updatedailywork",
  components: {
    uploadimgForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdataID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      logForm: {
        id: "",
        thisWeekRecord: "",
        nextWeekRecord: "",
        startDate: "",
        staffID: "",
        endDate: "",
        imgsUrl: "",
        qiyeID: "",
      },
      logFormRule: {
        logContent: [{ required: true, message: "请输入日志内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["logForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-sys/sys/StaffManagement/Updateweekrecord",{
            id: this.logForm.id,
            startDate: this.getMonday("s", 0, this.logForm.startDate),
            endDate: this.getMonday("e", 0, this.logForm.startDate),
            thisWeekRecord: this.logForm.thisWeekRecord,
            nextWeekRecord: this.logForm.nextWeekRecord,
            imgsUrl: this.logForm.imgsUrl,
          }).then((res) => {
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
          this.$Message.error("表单验证不通过");
        }
        setTimeout(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 1000);
      });
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    getMonday(type, dates, date) {
      //  var now = new Date();
      var nowTime = date.getTime();
      var day = date.getDay();
      var longTime = 24 * 60 * 60 * 1000;
      var n = longTime * 7 * (dates || 0);
      if (type == "s") {
        var dd = nowTime - (day - 1) * longTime + n;
      }
      if (type == "e") {
        var dd = nowTime + (7 - day) * longTime + n;
      }
      dd = new Date(dd);
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      var day = y + "-" + m + "-" + d;
      return day;
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
        window.console.log(this.editdataID);
        api.get("xwcloud-sys/sys/StaffManagement/getWeekworkrecordInfoById",{ Id: this.editdataID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.logForm = res.obj;
            this.logForm.startDate = toolbox.dateFtt(
              this.logForm.startDate,
              "yyyy-MM-dd"
            );
            this.logForm.endDate = toolbox.dateFtt(this.logForm.endDate, "yyyy-MM-dd");
            this.logForm.luruDate = toolbox.dateFtt(this.logForm.luruDate, "yyyy-MM-dd");
            console.log(this.logForm);
          } else {
            this.$Message.error(res.msg);
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
