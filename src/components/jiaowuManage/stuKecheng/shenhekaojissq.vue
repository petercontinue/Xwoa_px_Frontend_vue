<template>
  <Modal
    v-model="show"
    title="审核考级申请"
    @on-ok="ok"
    :mask-closable="false"
    width="60"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem>
        <Row class="divShow">
          <Col span="2" offset="1">学员<font style="color: red">*</font>:</Col>
          <Col span="4"><Input v-model="stuName" disabled /></Col>
          <Col span="2" offset="1">科目<font style="color: red">*</font>:</Col>
          <Col span="4"><Input v-model="kemuName" disabled /></Col>
          <Col span="2" offset="1">申请等级<font style="color: red">*</font>:</Col>
          <Col span="4"><Input v-model="jibie" disabled /></Col>
        </Row>
      </FormItem>
    </Form>
  </Modal>
</template>
<style>
.divShow {
  margin-top: 10px;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "addkaojissq",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    msg: { type: String },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {},
      getData: JSON,
      typesT: "",
      logForm: {
        kaojisqID: "",
      },
      kemuName: "",
      stuName: "",
      jibie: "",
    };
  },
  methods: {
    ok() {
      api.post("xwcloud-stu/stu/buxikecheng/shKaoJisq",this.logForm).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success("保存成功");
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
          this.logForm = this.$options.data().logForm;
          this.kemuName = "";
          this.stuName = "";
          this.jibie = "";
          this.closeModal(false);
        } else {
          this.$Message.error("保存失败");
          this.closeModal(false);
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
      if (val) {
        this.getData = JSON.parse(this.msg);
        this.logForm.kaojisqID = this.getData.id;
        this.stuName = this.getData.stuName;
        this.kemuName = this.getData.subjectName;
        this.jibie = this.getData.sqjibie;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
