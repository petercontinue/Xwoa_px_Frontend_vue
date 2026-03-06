<template>
  <Modal
    v-model="show"
    title="图书导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Form
      ref="laoshipingjiaFrom"
      :model="params"
      :rules="paramsRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区">
        <Select v-model="params.campusID" placeholder="请选择校区">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.campusName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="导出类型" prop="exportType">
        <Select v-model="params.exportType" placeholder="请选择类型">
          <Option
            v-for="item in exportTypeData"
            :value="item.id"
            :key="item.id"
            >{{ item.text }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="时间" v-show="qzrq">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
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
        exportType: "",
        campusID: "",
        startDoDate: "",
        endDoDate: ""
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
      exportTypeData: [
        { id: 1, text: "图书记录导出" },
        { id: 2, text: "借阅记录导出" },
        { id: 3, text: "归还记录导出" },
      ],
      allcampusData: [],
      qzrq: false,
    };
  },
  methods: {
    ok() {
      this.params.startDoDate = this.joinTime[0];
      this.params.endDoDate = this.joinTime[1];
      this.joinTime = "";
      this.$refs["laoshipingjiaFrom"].validate((valid) => {
        if (valid) {
          // 点击确定按钮时调用
          toolbox.exportExcel(
            "/xwcloud-homeschool/homeschool/pxbooks/exportBooks",
            this.params,
            "图书记录",
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
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",this.params).then((res) => {
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
