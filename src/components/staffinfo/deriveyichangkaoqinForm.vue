<template>
  <Modal
    v-model="show"
    title="导出员工异常考勤"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="45"
  >
    <Form
      ref="kaoqinForm"
      :model="kaoqinForm"
      :rules="kaoqinFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="kaoqinForm.campusID"
          placeholder="请选择校区"
          style="width: 100%"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="岗位" prop="staffPostID">
        <Select
          v-model="kaoqinForm.staffPostID"
          placeholder="请选择岗位"
          style="width: 100%"
        >
          <Option v-for="item in staffpostDate" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="类别" prop="type">
        <Select
          v-model="kaoqinForm.type"
          placeholder="请选择异常考勤类别"
          style="width: 100%"
        >
          <Option :value="1" :key="1">请假</Option>
          <Option :value="2" :key="2">迟到</Option>
          <Option :value="3" :key="3">早退</Option>
          <Option :value="4" :key="4">旷工</Option>
        </Select>
      </FormItem>
      <FormItem label="日期" prop="joinTime">
        <DatePicker
          type="daterange"
          v-model="kaoqinForm.joinTime"
          placeholder="选择起止日期"
          style="width: 100%"
          :editable="false"
        ></DatePicker>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok()">导出</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
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
      kaoqinForm: {
        campusID: "",
        joinTime: "",
        staffPostID: "",
        type: 0,
      },
      kaoqinFormRule: {},
      staffpostDate: [],
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      console.log(getToken());
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-sys/sys/StaffManagement/exportyichangkaoqinInfos",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: this.kaoqinForm.campusID,
            staffpostID: this.kaoqinForm.staffPostID,
            type: this.kaoqinForm.type,
            startDate: this.kaoqinForm.joinTime[0],
            endDate: this.kaoqinForm.joinTime[1],
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
          link.setAttribute("download", "员工异常考勤.xls");
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
        this.$refs["kaoqinForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 535 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffPostList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.staffpostDate = res.obj;
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
