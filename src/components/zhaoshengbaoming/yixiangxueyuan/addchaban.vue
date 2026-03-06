<template>
  <Modal
    v-model="isShow"
    title="插班试听"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form ref="chabanForm" :model="chabanForm" :label-width="80" label-position="left">
      <Row>
        <Col span="24">
          <FormItem
            label="班级"
            prop="classID"
            :rules="{
              required: true,
              message: '请选择班级',
              trigger: 'change',
            }"
          >
            <Select
              placeholder="请选择班级"
              clearable
              filterable
              v-model="chabanForm.classID"
              @on-change="classChange"
            >
              <Option
                v-for="classItem in classList"
                :key="classItem.id"
                :value="classItem.id"
                >{{ classItem.className }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem
            label="上课时间"
            prop="paikeID"
            :rules="{
              required: true,
              message: '请选择上课时间',
              trigger: 'change',
            }"
          >
            <Select
              placeholder="请选择上课时间"
              v-model="chabanForm.paikeID"
              clearable
              filterable
            >
              <Option
                v-for="paike in paikeListComputed"
                :key="paike.id"
                :value="paike.id"
                >{{ paike.value }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <FormItem
            label="试听费用"
            prop="shitingPrice"
            :rules="{
              required: true,
              message: '请输入试听费用',
              trigger: 'change',
              type: 'number',
            }"
          >
            <InputNumber
              v-model="chabanForm.shitingPrice"
              prefix="logo-usd"
              :min="0"
              :step="0.01"
              placeholder="试听费用"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            label="支付方式"
            prop="payMoneyStyle"
            :rules="{
              message: '试听有费用，此项必填',
              validator: payMoneyStyleValidatorChaban,
            }"
          >
            <Select
              placeholder="请选择支付方式"
              clearable
              filterable
              v-model="chabanForm.payMoneyStyle"
            >
              <Option
                v-for="payMoneyStyle in payMoneyStyleList"
                :key="payMoneyStyle.id"
                :value="payMoneyStyle.id"
                >{{ payMoneyStyle.moneystyleName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <FormItem
            label="是否计入上课人数"
            :label-width="135"
            prop="isKechengStuNum"
            :rules="{
              required: true,
              message: '开或者关？',
              trigger: 'change',
              type: 'boolean',
            }"
          >
            <i-switch v-model="chabanForm.isKechengStuNum">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="chabanSubmit">提交插班试听</Button>
      <Button type="error" @click="closeFormChaban">重置</Button>
    </div>
  </Modal>
</template>

<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "addchaban",
  props: {
    value: { default: false, type: Boolean },
    stuID: { default: "", type: String },
    payMoneyStyleList: { default: [], type: Array },
    campusID: { default: "", type: String },

    editcbdata: { default: "", type: String },
  },
  data() {
    return {
      isShow: this.value,
      chabanForm: {
        id: null,
        stuID: null,
        classID: null,
        paikeID: null,
        isKechengStuNum: true,
        shitingPrice: null,
        payMoneyStyle: null,
      },
      paikeList: [],
      classList: [],
    };
  },
  computed: {
    paikeListComputed() {
      return this.paikeList.map((val) => {
        let value =
          toolbox.dateFtt(val.haveClassDate, "yyyy-MM-dd") +
          " " +
          val.startLessonDateTime +
          ":" +
          val.endLessonDateTime +
          " " +
          val.teacherNames;
        return { id: val.id, value: value };
      });
    },
  },
  methods: {
    closeModal(val) {
      this.$refs["chabanForm"].resetFields();
      this.$emit("input", val);
    },
    chabanSubmit() {
      this.$refs["chabanForm"].validate((valid) => {
        if (valid) {
          this.chabanLoading = true;
          api.post("xwcloud-zsbm/yxstu/YixiangStu/saveChabanShiting",this.chabanForm).then((res) => {
            if (res.success) {
              this.$Message.success(res.msg);
              this.$refs["chabanForm"].resetFields();
              this.$emit("handleSearch");
              this.closeFormChaban();
            } else {
              if (res.code == "cz") {
                this.$Modal.error({
                  title: "提示",
                  content: res.msg,
                });
              } else {
                this.$Message.error(res.msg);
              }
            }
            this.chabanLoading = false;
          });
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },
    closeFormChaban() {
      this.closeModal();
    },

    classChange() {
      this.paikeList = [];
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getPaikeByClassID",{ classID: this.chabanForm.classID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.paikeList = res.obj;
        }
      });
      console.log(this.paikeList);
    },
    payMoneyStyleValidatorChaban(rule, value, callback) {
      if (value == undefined || value == null || value == "") {
        return this.chabanForm.shitingPrice ? false : true;
      }
      return true;
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      this.$refs["chabanForm"].resetFields();
      if (val) {
        if (this.editcbdata != "") {
          let getdata = JSON.parse(this.editcbdata);
          this.chabanForm.id = getdata.id;
          this.chabanForm.stuID = getdata.yxStuID;
          this.chabanForm.classID = getdata.classID;
          this.chabanForm.paikeID = getdata.paikeID;
          if (getdata.isAddStuNumToTeacher == 1) {
            this.chabanForm.isKechengStuNum = true;
          } else {
            this.chabanForm.isKechengStuNum = false;
          }
          this.chabanForm.shitingPrice = getdata.shitingPrice;
          this.chabanForm.payMoneyStyle = getdata.payMoneyStyle;
          this.classChange();
          console.log(this.chabanForm);
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    stuID(val) {
      console.log(val);
      if (val) {
        this.chabanForm.stuID = val;
      }
    },
    campusID(val) {
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getClassListNo1V1",val).then((res) => {
        if (res.success) {
          this.classList = res.obj;
        }
      });
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getYxChabanKc",val).then((res) => {
        if (res.success) {
          this.kechengList = res.obj;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style></style>
