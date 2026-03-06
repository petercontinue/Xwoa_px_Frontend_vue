<template>
  <Modal
    v-model="show"
    title="导出固定资产信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form
      ref="zichanForm"
      :model="zichanForm"
      :rules="zichanFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="zichanForm.campusID"
          placeholder="请选择校区"
          style="width: 100%"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="导出类型" prop="type">
        <Select
          v-model="zichanForm.type"
          placeholder="请选择导出类型"
          style="width: 100%"
        >
          <Option value="1">固定资产用品导出</Option>
          <Option value="2">登记记录导出</Option>
          <Option value="3">报废记录导出</Option>
        </Select>
      </FormItem>
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
      zichanForm: {
        campusID: "",
        type: "",
      },
      zichanFormRule: {
        type: [
          {
            required: true,
            message: "请选择导出类型",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      this.$refs["zichanForm"].validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-sys/sys/pxassets/exportgudingzichang",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: {
                campusID: this.zichanForm.campusID,
                type: this.zichanForm.type,
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
              link.setAttribute("download", "固定资产信息.xls");
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
        this.$refs["zichanForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 551 }).then((res) => {
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
