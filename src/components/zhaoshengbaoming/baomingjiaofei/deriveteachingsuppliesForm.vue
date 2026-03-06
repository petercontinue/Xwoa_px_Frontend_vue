<template>
  <Modal
    v-model="show"
    title="导出信息"
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
      <FormItem label="导出类型" prop="type">
        <Select v-model="logForm.type" placeholder="请选择导出类型">
          <Option key="3" value="3">商品信息导出</Option>
          <Option key="2" value="2">入库记录导出</Option>
          <Option key="1" value="1">出库记录导出</Option>
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
        type: 1,
      },
      logFormRule: {
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
      this.$refs["logForm"].validate((valid) => {
        if (valid) {
          this.$emit("increment", this.logForm);
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
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
        this.$refs["logForm"].resetFields();
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
