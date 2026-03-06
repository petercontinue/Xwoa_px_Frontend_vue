<template>
  <Modal
    v-model="show"
    title="老学员回访导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="laoxueyuanhuifangFrom"
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
      <FormItem label="类型">
        <Select v-model="params.isHaveAReturnVisit" placeholder="请选择校区">
          <Option
            v-for="item in isHaveAReturnData"
            :value="item.value"
            :key="item.value"
            >{{ item.text }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="最后一次回访时间">
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="请选择日期"
          style="width: 100%"
          v-model="params.lasthuifangsj"
        ></DatePicker>
      </FormItem>
      <FormItem label="下次回访时间">
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="请选择日期"
          style="width: 100%"
          v-model="params.nexthuifangsj"
        ></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "daochulaoxueyuanhuifangForm",
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
        isHaveAReturnVisit: null,
        campusID: "",
        startLastHuifangTime: "", // 最后一次回访
        endLastHuifangTime: "",
        startNextHuifangTime: "", // 下一次回访
        endNextHuifangTime: "",
        lasthuifangsj: [],
        nexthuifangsj: [],
      },
      paramsRule: {
        // 验证输入
        //note: [{ required: true, message: "请输入评价", trigger: "blur" }],
      },
      allcampusData: [],
      isHaveAReturnData: [
        { text: "有回访", value: "true" },
        { text: "无回访", value: "false" },
      ],
    };
  },
  methods: {
    ok() {
      this.params.startLastHuifangTime = this.params.lasthuifangsj[0];
      this.params.endLastHuifangTime = this.params.lasthuifangsj[1];
      this.params.lasthuifangsj = "";
      this.params.startNextHuifangTime = this.params.nexthuifangsj[0];
      this.params.endNextHuifangTime = this.params.nexthuifangsj[1];
      this.params.nexthuifangsj = "";
      // 点击确定按钮时调用
      toolbox.exportExcel(
        "/xwcloud-homeschool/homeschool/oldstupxhuifang/exportStuHuifang",
        this.params,
        "老学员回访",
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
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["laoxueyuanhuifangFrom"].resetFields();
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
