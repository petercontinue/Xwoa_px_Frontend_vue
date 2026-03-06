<template>
  <Modal
    v-model="show"
    title="导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
  <Alert show-icon>
        温馨提示：若不选择，则全部导出。
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
    </Alert>
    <Form ref="kemutongjiFrom" :model="params" :rules="paramsRule" :label-width="80">
      <FormItem label="校区" prop="campusID">
        <Select v-model="params.campusID" placeholder="请选择校区">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.campusName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="年级" prop="gradeID">
        <Select v-model="params.gradeID" placeholder="请选择年级">
          <Option
            v-for="item in allgradeData"
            :value="item.id"
            :key="item.id"
            >{{ item.stuGradeName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="时间" prop="joinTime">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          type="daterange"
          v-model="joinTime"
          placeholder="选择起止日期"
          style="width: 100%"
          @on-change="changeDate"
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
    daochutype: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        campusID: "",
        gradeID: "",
        startDate: "",
        endDate: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        joinTime: [{}],
        campusID: [{}],
        gradeID: [{}],
      },
      joinTime: "",
      allcampusData: [],
      allgradeData: [],
    };
  },
  methods: {
    ok() {
      this.joinTime = "";
      console.log(this.params);
      this.$refs["kemutongjiFrom"].validate((valid) => {
        if (valid) {
            toolbox.exportExcel(
                "/xwcloud-caiwu/shujutongji/other/exportTingkeStu",
                this.params,
                "长期停课预警",
                this
              );
        } else {
          this.$Message.error("请检查数据是否填对!");
        }
      });
    },
    changeDate(val) {
      this.params.startDate = val[0];
      this.params.endDate = val[1];
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
        this.$refs["kemutongjiFrom"].resetFields();
        this.params.startDate = "";
        this.params.endDate = "";
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        // 获取年级列表
        api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allgradeData = res.obj;
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
