<template>
  <Modal
    v-model="show"
    :title="title"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Form
      ref="dayinForm"
      :model="dayinForm"
      :rules="dayinFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <Row
        type="flex"
        justify="space-between"
        class="code-row-bg"
        style="text-align: center"
      >
        <Col span="4">打印类型</Col>
        <Col span="4">宽（cm）</Col>
        <Col span="4">高（cm）</Col>
      </Row>
      <Row
        type="flex"
        justify="space-between"
        class="code-row-bg"
        style="margin-top: 25px; text-align: center"
      >
        <Col span="4">小票</Col>
        <Col span="4">
          <InputNumber
            :precision="2"
            :min="0.01"
            v-model="xpkuan"
          ></InputNumber>
        </Col>
        <Col span="4">
          <InputNumber :precision="2" :min="0.01" v-model="xpgao"></InputNumber
        ></Col>
      </Row>
      <Row
        type="flex"
        justify="space-between"
        class="code-row-bg"
        style="margin-top: 25px; text-align: center"
      >
        <Col span="4">三联收据</Col>
        <Col span="4">
          <InputNumber :precision="2" :min="0.01" v-model="slkuan"></InputNumber
        ></Col>
        <Col span="4">
          <InputNumber :precision="2" :min="0.01" v-model="slgao"></InputNumber
        ></Col>
      </Row>
      <Row
        type="flex"
        justify="space-between"
        class="code-row-bg"
        style="margin-top: 25px; text-align: center"
      >
        <Col span="4">A4纸</Col>
        <Col span="4">
          <InputNumber :precision="2" :min="0.01" v-model="a4kuan"></InputNumber
        ></Col>
        <Col span="4">
          <InputNumber :precision="2" :min="0.01" v-model="a4gao"></InputNumber
        ></Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import NumericInput from "../../common-buttons/NumericInput";
import * as api from "@/api/api.js";

export default {
  components: {
    NumericInput,
  },
  name: "addlog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      title: "【新签】报名打印的默认纸张格式",
      xpkuan: 0,
      xpgao: 0,
      slkuan: 0,
      slgao: 0,
      a4kuan: 0,
      a4gao: 0,
      dayinForm: {
        logContent: "",
      },
      dayinFormRule: {
        logContent: [
          { required: true, message: "请输入日志内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ok() {
      let value =
        "小票|" +
        this.xpkuan +
        "," +
        this.xpgao +
        "&&收据|" +
        this.slkuan +
        "," +
        this.slgao +
        "&&A4纸|" +
        this.a4kuan +
        "," +
        this.a4gao;
      console.log(value);
      api.post("xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",{
        id: this.editID,
        value: value,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
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
        this.$refs["dayinForm"].resetFields();
        api.get("xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: this.editID }).then((res) => {
          console.log(res);
          if (this.editID == "101") {
            this.title = "【新签】报名打印的默认纸张格式";
          } else if (this.editID == "102") {
            this.title = "【续费】报名打印的默认纸张格式";
          } else if (this.editID == "103") {
            this.title = "【充值】打印的默认纸张格式";
          } else if (this.editID == "104") {
            this.title = "【退费】打印的默认纸张格式";
          } else if (this.editID == "105") {
            this.title = "【消课】打印的默认纸张格式";
          }
          if (res.obj != null) {
            console.log(res.obj);
            this.xpkuan = Number(
              res.obj.modifyvalue.split("&&")[0].split("|")[1].split(",")[0]
            );
            this.xpgao = Number(
              res.obj.modifyvalue.split("&&")[0].split("|")[1].split(",")[1]
            );
            this.slkuan = Number(
              res.obj.modifyvalue.split("&&")[1].split("|")[1].split(",")[0]
            );
            this.slgao = Number(
              res.obj.modifyvalue.split("&&")[1].split("|")[1].split(",")[1]
            );
            this.a4kuan = Number(
              res.obj.modifyvalue.split("&&")[2].split("|")[1].split(",")[0]
            );
            this.a4gao = Number(
              res.obj.modifyvalue.split("&&")[2].split("|")[1].split(",")[1]
            );
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
