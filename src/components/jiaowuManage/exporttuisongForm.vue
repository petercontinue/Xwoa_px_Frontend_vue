<template>
  <Modal
    v-model="show"
    title="导出推送消息"
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
      <FormItem label="推送类型" prop="type">
        <Select v-model="logForm.type" placeholder="请选择推送类型">
          <Option
            v-for="item in alltuisongtypeData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="推送日期" prop="tuisongData">
        <DatePicker
          type="daterange"
          v-model="logForm.tuisongData"
          placeholder="选择推送起止日期"
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
        type: 0,
        tuisongData: "",
      },
      logFormRule: {},
      alltuisongtypeData: [],
    };
  },
  methods: {
    ok() {
      console.log(getToken());
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-homeschool/homeschool/pxtuisongtable/exportMassPostingHistory",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            type: this.logForm.type,
            startDate: this.logForm.tuisongData[0],
            endDate: this.logForm.tuisongData[1],
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
          link.setAttribute("download", "微信群发信息.xls");
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
        api.get("xwcloud-homeschool/homeschool/pxtuisongtable/GetAllTuisongType",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.alltuisongtypeData = res.obj;
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
