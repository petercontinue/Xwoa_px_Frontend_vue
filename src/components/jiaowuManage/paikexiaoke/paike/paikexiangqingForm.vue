<template>
  <div>
    <Modal
      v-model="show"
      title="排课详情"
      @on-ok="ok"
      :loading="loading"
      :mask-closable="true"
      :mask="true"
      :footer-hide="true"
      @on-cancel="closeModal(false)"
      width="30"
    >
      <div>
        <Row style="text-align: center">
          <Col span="8"
            ><Button type="success" @click="chongpaiAll">重排所有</Button></Col
          >
          <Col span="8"><Button type="success" @click="jixupaike">继续排课</Button></Col>
          <Col span="8"
            ><Button type="warning" @click="deleteAllpaike">删除所有</Button></Col
          >
        </Row>
        <Row style="margin-top: 8px">
          <Col span="16">上课日期：{{ shangkeTime }}</Col>
          <Col span="8">
            <Button type="info" size="small" @click="updatepaike">修改</Button>
            <Button type="error" size="small" @click="deletedayPaike">删除</Button></Col
          >
        </Row>
        <Row style="margin-top: 8px">
          <Col>上课时间：{{ shangkeData }}</Col>
        </Row>
        <Row style="margin-top: 8px">
          <Col>课程：{{ kechengName }}</Col>
        </Row>
        <Row style="margin-top: 8px">
          <Col>班级：{{ classname }}</Col>
        </Row>
        <Row style="margin-top: 8px">
          <Col>学生姓名：{{ stuName }}</Col>
        </Row>
        <Row style="margin-top: 8px">
          <Col>教室：{{ classroom }}</Col>
        </Row>
        <Row style="margin-top: 8px">
          <Col>任课教师：{{ renketeacher }}</Col>
        </Row>
      </div>
    </Modal>
    <deletepaike-form v-model="showdeletePaike" :paikeData="paikeData"></deletepaike-form>
    <addpaike-form
      v-model="showupdatePaike"
      :paikeData="paikeData"
      :savetype="savetype"
      @handleSearch="rload"
    ></addpaike-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import deletepaikeForm from "../../../../components/jiaowuManage/paikexiaoke/paike/deletepaikeForm.vue";
import addpaikeForm from "../../../../components/jiaowuManage/paikexiaoke/paike/addpaikeForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    deletepaikeForm,
    addpaikeForm,
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shangkeTime: "",
      shangkeData: "",
      kechengName: "",
      classname: "",
      stuName: "",
      classroom: "",
      renketeacher: "",
      showdeletePaike: false,
      paikeData: "",
      showupdatePaike: false,
      savetype: 1,
    };
  },
  props: {
    value: { type: Boolean, default: false },
    paikeID: { type: String },
  },
  watch: {},
  created() {},
  methods: {
    rload() {
      this.closeModal(false);
      this.$emit("handleSearch");
    },
    ok() {},
    closeModal(val) {
      this.$emit("input", val);
    },
    deletedayPaike() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该排课信息？</p>",
        onOk: () => {
          api.del("xwcloud-pkxk/paike/paikexiaoke/Delpaike",{ id: this.paikeID }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.closeModal(false);
              this.$Message.success("排课删除成功！");
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
      });
    },
    deleteAllpaike() {
      this.showdeletePaike = true;
    },
    chongpaiAll() {
      this.savetype = 2;
      this.showupdatePaike = true;
    },
    jixupaike() {
      this.savetype = 3;
      this.showupdatePaike = true;
    },
    updatepaike() {
      this.savetype = 4;
      this.showupdatePaike = true;
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表
      if (val) {
        api.get("xwcloud-pkxk/paike/paikexiaoke/getpaikeInfo",{ id: this.paikeID })
          .then((result) => {
            if (result.code == "Y" && result.success == true) {
              this.shangkeTime = toolbox.dateFtt(
                result.obj[0].haveClassDate,
                "yyyy-MM-dd"
              );
              this.shangkeData =
                result.obj[0].startLessonDateTime + "-" + result.obj[0].endLessonDateTime;
              this.classname = result.obj[0].className;
              this.classroom = result.obj[0].classRoomName;
              this.renketeacher = result.obj[0].teacherNames;
              this.kechengName = result.obj[0].kechengName;
              this.stuName = result.obj[0].xkstuName;
              this.paikeData = JSON.stringify(result.obj[0]);
            }
          })
          .catch((err) => {});
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
