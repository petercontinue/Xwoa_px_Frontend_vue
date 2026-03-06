<template>
  <Modal
    v-model="show"
    title="转送导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem label="送学员校区" prop="campusID">
        <Select v-model="logForm.songcampusID" placeholder="请选择校区">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="收学员校区" prop="campusID">
        <Select v-model="logForm.shoucampusID" placeholder="请选择校区">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="日期" prop="joinTime">
        <DatePicker
          type="daterange"
          v-model="logForm.joinTime"
          placeholder="选择起止日期"
          style="width: 100%"
          format="yyyy-MM-dd"
        ></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "derivezhuansong",
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
        songcampusID: "",
        shoucampusID: "",
        joinTime: null,
      },
      startDate: "",
      endDate: "",
      logFormRule: {},
      allcampusData: [],
    };
  },
  methods: {
    ...mapActions(["getallcampusList"]),
    ok() {
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-stu/stu/buxikecheng/ExportTransfer",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: this.logForm.campusID,
            startDate: this.startDate,
            endDate: this.endDate,
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
          link.setAttribute("download", "转送.xls");
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
      this.$refs["logForm"].resetFields();
      if (val) {
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
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
