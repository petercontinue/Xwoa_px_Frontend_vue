<template>
  <Modal
    v-model="show"
    title="盈亏总账导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="laoshipingjiaFrom"
      :model="laoshipingjia"
      :rules="laoshipingjiaRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select v-model="laoshipingjia.campusID" placeholder="请选择校区">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.campusName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="开始时间" prop="joinTime">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          type="daterange"
          v-model="laoshipingjia.joinTime"
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
  name: "daochuyinkuizongzhang",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    fileName: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      laoshipingjia: {
        campusID: "",
        startDate: "",
        endDate: "",
        joinTime: "",
      },
      laoshipingjiaRule: {
        // 验证输入
        //note: [{ required: true, message: "请输入评价", trigger: "blur" }],
      },
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      this.laoshipingjia.startDate = this.laoshipingjia.joinTime[0];
      this.laoshipingjia.endDate = this.laoshipingjia.joinTime[1];
      console.log(this.laoshipingjia);
      this.laoshipingjia.joinTime = "";
      // 点击确定按钮时调用
      toolbox.exportExcel(
        "/xwcloud-caiwu/caiwu/liushui/ExportYinkuiList",
        this.laoshipingjia,
        this.fileName,
        this
      );
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
    pingjiatype(val) {
      this.laoshipingjia.type = this.pingjiatype;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["laoshipingjiaFrom"].resetFields();

        api.get("xwcloud-homeschool/homeschool/public/getCampusList",this.laoshipingjia).then((res) => {
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
