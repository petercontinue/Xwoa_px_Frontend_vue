<template>
  <Modal
    v-model="show"
    title="导出教师上课流水"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem label="校区*" prop="campusID">
        <Select v-model="logForm.campusID" placeholder="请选择校区">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
      </FormItem>
      <FormItem label="类型*" prop="type">
        <Select v-model="logForm.type" placeholder="请选择类型">
          <Option v-for="item in typeList" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="年月" prop="joinTime">
        <DatePicker type="month" v-model="logForm.joinTime" placeholder="选择年月" style="width: 100%"></DatePicker>
      </FormItem>
      <FormItem label="年份" prop="yearTime">
        <DatePicker type="year" v-model="logForm.yearTime" placeholder="选择年月" style="width: 100%"></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "deriveteakehao",
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
        joinTime: "",
        yearTime: "",
        type: "",
      },
      logFormRule: {},
      allcampusData: [],
      typeList: [
        { id: 1, name: "导出流水" },
        { id: 2, name: "导出统计" },
      ],
    };
  },
  methods: {
    ok() {
      //console.log(getToken());

      if (this.logForm.joinTime != "") {
        this.logForm.joinTime = toolbox.dateFtt(
          this.logForm.joinTime,
          "yyyy-MM"
        );
      }
      if (this.logForm.yearTime != "") {
        this.logForm.yearTime = toolbox.dateFtt(this.logForm.yearTime, "yyyy");
      }
      let lal = "";
      if (this.logForm.type == 1) {
        lal = "教师上课流水导出.xls";
      } else if (this.logForm.type == 2) {
        lal = "教师上课统计导出.xls";
      }
      this.btnLoading = true;
      console.log(this.logForm.campusID);
      console.log(this.logForm.joinTime);
      console.log(this.logForm.yearTime);

      console.log(this.logForm.type);
      axios
        .request({
          method: "get",
          url: "/xwcloud-pkxk/kehao/ClassRecord/ExportTeakehao",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: this.logForm.campusID,
            yearMouth: this.logForm.joinTime,
            year: this.logForm.yearTime,
            type: this.logForm.type,
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
          link.setAttribute("download", lal);
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
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: "252" }).then((res) => {
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
