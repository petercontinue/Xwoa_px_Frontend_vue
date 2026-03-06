<template>
  <Modal
    v-model="show"
    title="工资信息导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="35"
  >
    <Form
      ref="laoshipingjiaFrom"
      :model="params"
      :rules="paramsRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区">
        <Select v-model="params.campusID" placeholder="请选择校区">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="员工">
        <Select v-model="params.staffID" placeholder="请选择员工">
          <Option
            v-for="item in allstaffData"
            :value="item.id"
            :key="item.id"
            >{{ item.staffName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="时间">
        <DatePicker
          type="daterange"
          v-model="joinTime"
          placeholder="选择起止日期"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "editLaoshikehoupingjia",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        staffID: "",
        campusID: "",
        startDate: "",
        endDate: "",
      },
      paramsRule: {
        // 验证输入
        exportType: [
          {
            required: true,
            type: "number",
            message: "请选择类型",
            trigger: "blur",
          },
        ],
      },
      joinTime: "",
      allcampusData: [],
      qzrq: false,
      allstaffData: [],
    };
  },
  methods: {
    ok() {
      this.params.startDate = this.joinTime[0];
      this.params.endDate = this.joinTime[1];
      this.joinTime = "";
      this.$refs["laoshipingjiaFrom"].validate((valid) => {
        if (valid) {
          // 点击确定按钮时调用
          toolbox.exportExcel(
            "xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/exportGongziList",
            this.params,
            "导出工资信息",
            this
          );
        } else {
          this.$Message.error("请检查数据是否填对!");
        }
      });
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    "params.exportType"(val) {
      this.qzrq = val != 1;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["laoshipingjiaFrom"].resetFields();
        // 获取校区列表
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 531 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((res) => {
            console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.allstaffData = res.obj;
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
