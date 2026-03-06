<template>
  <Modal
    v-model="show"
    title="导出发布约课信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="80">
      <FormItem label="校区" prop="campusID"> 
        <Select v-model="logForm.campusID" placeholder="请选择校区">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="上课日期" prop="joinTime">
        <DatePicker
          type="daterange"
          v-model="logForm.joinTime"
          placeholder="选择上课起止日期"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
    </Form>
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
      logForm: {
        campusID: 0,
        joinTime: "",
      },
      logFormRule: {},
      staffpostDate: [],
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      this.$emit("increment",this.logForm);
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
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{menuID:269}).then((res) => {
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
