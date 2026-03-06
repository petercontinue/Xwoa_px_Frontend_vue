<template>
  <Modal
    v-model="show"
    title="系统日志导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select v-model="logForm.campusID" placeholder="请选择校区" style="width: 100%">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="操作人" prop="caozuostaff">
        <Select
          v-model="logForm.caozuostaff"
          placeholder="请选择操作人"
          style="width: 100%"
        >
          <Option v-for="item in AllStaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="操作类型" prop="logType">
        <Select
          v-model="logForm.logType"
          placeholder="请选择操作类型"
          style="width: 100%"
        >
          <Option value="1">员工日志</Option>
          <Option value="2">学员日志</Option>
          <Option value="3">系统自动产生的日志</Option>
        </Select>
      </FormItem>
      <FormItem label="日志时间" prop="logData">
        <DatePicker
          type="daterange"
          split-panels
          placeholder="请选择时间"
          v-model="logForm.logData"
          style="width: 80%; float: right"
        ></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "derivedailywork",
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
      logForm: {
        campusID: "",
        caozuostaff: "",
        logType: "",
        logData: "",
      },
      logFormRule: {},
      allcampusData: [],
      AllStaffData: [],
    };
  },
  methods: {
    ok() {
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-sys/sys/SystemLog/exportlogInfos",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            staffID: this.logForm.caozuostaff,
            campusID: this.logForm.campusID,
            startDate: "",
            endDate: "",
            logType: 0,
          },
          responseType: "blob",
        })
        .then((res) => {
          this.btnLoading = false;
          // 文件下载
          const blob = new Blob([res], {
            type: "application/vnd.ms-excel",
          });
          let link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", "操作日志导出.xls");
          link.click();
          link = null;
          this.$Message.success("导出成功");
          this.closeModal(false);
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    },
    checkstaffTel() {},
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
        this.$refs["logForm"].resetFields();
        api
          .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: "561" })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allcampusData = res.obj;
            }
          });
        api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList", {}).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.AllStaffData = res.obj;
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
