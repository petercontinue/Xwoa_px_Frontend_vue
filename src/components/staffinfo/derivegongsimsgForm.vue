<template>
  <Modal
    v-model="show"
    title="导出公司消息"
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
      <FormItem label="发送时间" prop="fasongdate">
        <DatePicker
          type="daterange"
          v-model="logForm.fasongdate"
          placeholder="选择发送时间"
          style="width: 100%"
          :editable="false"
        ></DatePicker>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
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
        staffpostID: "",
        fasongdate: "",
      },
      logFormRule: {},
      allstaffpostData: [],
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-sys/sys/StaffManagement/exportgongsixiaoxi",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            SgonggaoDate: this.logForm.fasongdate[0],
            EgonggaoDate: this.logForm.fasongdate[1],
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
          link.setAttribute("download", "公司消息.xls");
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
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
