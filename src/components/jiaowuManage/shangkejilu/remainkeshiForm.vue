<template>
  <Modal
    v-model="show"
    title="导出剩余课时"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="150"
      :label-colon="true"
    >
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

      <FormItem label="类型" prop="type">
        <Select v-model="logForm.type" placeholder="请选择类型">
          <Option v-for="item in typeList" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
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
  name: "deriveremainkeshi",
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
        type: "",
      },
      logFormRule: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
      },
      allcampusData: [],
      typeList: [
        { id: "1", name: "剩余学费导出" },
        { id: "2", name: "剩余课时导出" },
      ],
    };
  },
  methods: {
    ...mapActions(["getallcampusList"]),
    ok() {
      this.btnLoading = true;
      this.$refs["logForm"].validate((valid) => {
        if (valid) {
              axios
        .request({
          method: "get",
          url: "/xwcloud-pkxk/kehao/ClassRecord/ExportReMoneyAndKeshi",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: this.logForm.campusID,
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
          link.setAttribute("download", "剩余课时/学费导出.xls");
          link.click();
          link = null;
          this.$Message.success("导出成功");
          this.closeModal(false);
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    
         } else {
          this.$Message.error("请完成必填项！!");
        }
      })
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
        this.getallcampusList({ menuID: "253" }).then((res) => {
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
