<template>
  <Modal
    v-model="show"
    title="导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    :width="50"
  >
    <Form
      ref="kemutongjiFrom"
      :model="params"
      :rules="paramsRule"
      :label-width="120"
      :label-colon="true"
    >
      <FormItem label="" prop="campusID">
        <RadioGroup v-model="daochutype">
          <Radio label="1">全部导出</Radio>
          <Radio label="2">按月导出</Radio>
          <Radio label="3">按天导出</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="校区" prop="campusID">
        <Select v-model="params.campusID" placeholder="请选择校区">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="时间" prop="joinTime" v-show="showdata">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          type="daterange"
          v-model="joinTime"
          ref="rqshijian"
          placeholder="选择起止日期"
          style="width: 100%"
          @on-change="changeDate"
        ></DatePicker>
      </FormItem>
      <FormItem label="时间" prop="joinTime" v-show="showmonth">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          type="month"
          v-model="joinMonth"
          ref="rqshijian"
          placeholder="选择起止日期"
          style="width: 100%"
          @on-change="changeMonth"
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
  name: "daochukemutongji",
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
        campusID: "",
        startLiushuiDate: "",
        endLiushuiDate: "",
        month: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        joinTime: [{}],
        campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
      },
      joinTime: "",
      joinMonth: "",
      allcampusData: [],
      allkemuData: [],
      daochutype: "",
      showdata: true,
      showmonth: true,
    };
  },
  methods: {
    ok() {
      this.joinTime = "";
      this.joinMonth = "";
      this.$refs["kemutongjiFrom"].validate((valid) => {
        if (valid) {
          switch (this.daochutype) {
            case "1":
              this.params.startLiushuiDate = "";
              this.params.endLiushuiDate = "";
              this.params.month = "";
              toolbox.exportExcel(
                "/xwcloud-caiwu/caiwu/liushui/exportLiushuiList",
                this.params,
                "财务流水",
                this
              );
              break;
            case "2":
              this.params.startLiushuiDate = "";
              this.params.endLiushuiDate = "";
              toolbox.exportExcel(
                "/xwcloud-caiwu/caiwu/liushui/exportLiushuiList",
                this.params,
                "财务流水",
                this
              );
              break;
            case "3":
              this.params.month = "";
              toolbox.exportExcel(
                "/xwcloud-caiwu/caiwu/liushui/exportLiushuiList",
                this.params,
                "财务流水",
                this
              );
              break;
            default:
              break;
          }
        } else {
          this.$Message.error("请检查数据是否填对!");
        }
      });
    },
    changeDate(val) {
      this.params.startLiushuiDate = val[0];
      this.params.endLiushuiDate = val[1];
    },
    changeMonth(val) {
      this.joinMonth = val;
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
    daochutype(val) {
      switch (val) {
        case "1": // 全部导出
          this.showdata = false;
          this.showmonth = false;
          break;
        case "2": // 按月导出
          this.showdata = false;
          this.showmonth = true;
          break;
        case "3": // 按天导出
          this.showdata = true;
          this.showmonth = false;
          break;
      }
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["kemutongjiFrom"].resetFields();
        this.params.startDate = "";
        this.params.endDate = "";
        this.daochutype = "2";
        // 获取校区列表
        api
          .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: "341" })
          .then((res) => {
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
