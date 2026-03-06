<template>
  <Modal
    v-model="show"
    title="导出充值信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="80">
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="logForm.campusID"
          placeholder="请选择校区"
          style="width: 100%"
        >
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <!-- <FormItem label="日期" prop="joinTime">
        <DatePicker
          type="daterange"
          v-model="logForm.joinTime"
          placeholder="选择起止日期"
          style="width: 100%"
        ></DatePicker>
      </FormItem> -->
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok()">确认导出</Button>
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
      logForm: {
        campusID: "",
        joinTime: "",
      },
      logFormRule: {},
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
          url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/exportChongzhi",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: this.logForm.campusID,
            // startDate: this.logForm.joinTime[0],
            // endDate: this.logForm.joinTime[1],
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
          link.setAttribute("download", "充值信息.xls");
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
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 143 }).then((res) => {
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
