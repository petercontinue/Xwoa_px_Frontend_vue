<template>
  <Modal
    v-model="isShow"
    title="一对一试听"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form
      ref="oneToOneForm"
      :model="oneToOneForm"
      :label-width="80"
      label-position="left"
    >
      <Row>
        <Col span="24">
          <FormItem
            label="课程"
            prop="kechengID"
            :rules="{
              required: true,
              message: '请选择课程',
              trigger: 'change',
            }"
          >
            <Select
              placeholder="请选择课程"
              clearable
              filterable
              v-model="oneToOneForm.kechengID"
              @on-change="kechangChange"
            >
              <Option
                v-for="kecheng in kechengList"
                :key="kecheng.id"
                :value="kecheng.id"
                >{{ kecheng.kechengName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <FormItem
            label="教师"
            prop="staffID"
            :rules="{
              required: true,
              message: '请选择教师',
              trigger: 'change',
            }"
          >
            <Select
              placeholder="请选择教师"
              clearable
              filterable
              v-model="oneToOneForm.staffID"
            >
              <Option
                v-for="staff in staffList"
                :key="staff.id"
                :value="staff.id"
                :disabled="staff.disable"
                >{{ staff.staffName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            label="教室"
            prop="classRoomID"
            :rules="{
              required: true,
              message: '请选择教室',
              trigger: 'change',
            }"
          >
            <Select
              placeholder="请选择教室"
              clearable
              filterable
              v-model="oneToOneForm.classRoomID"
            >
              <Option
                v-for="classRoom in classRoomList"
                :key="classRoom.id"
                :value="classRoom.id"
                >{{ classRoom.classroomname }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
          <FormItem
            label="试听日期"
            prop="haveClassDate"
            :rules="{
              required: true,
              type: 'date',
              message: '选择试听日期',
              trigger: 'change',
            }"
          >
            <Date-picker
              type="date"
              placeholder="选择试听日期"
              v-model="oneToOneForm.haveClassDate"
            ></Date-picker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            label="试听时间"
            prop="haveClassTime"
            :rules="{
              required: true,
              message: '选择试听时间',
              trigger: 'change',
              type: 'array',
              fields: {
                0: {
                  required: true,
                  message: '选择试听时间',
                  trigger: 'change',
                },
                1: {
                  required: true,
                  message: '选择试听时间',
                  trigger: 'change',
                },
              },
            }"
          >
            <TimePicker
              format="HH:mm"
              type="timerange"
              placeholder="选择试听时间"
              v-model="oneToOneForm.haveClassTime"
            ></TimePicker>
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
              message: '请输入试听费用，免费试听填0',
              trigger: 'change',
              type: 'number',
            }"
          >
            <InputNumber
              v-model="oneToOneForm.shitingPrice"
              prefix="logo-usd"
              :min="0"
              :step="0.01"
              placeholder="免费试听填0"
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
              validator: payMoneyStyleValidatorOneToOne,
            }"
          >
            <Select
              placeholder="请选择支付方式"
              clearable
              filterable
              v-model="oneToOneForm.payMoneyStyle"
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
            <i-switch v-model="oneToOneForm.isKechengStuNum">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            label="检测排课冲突"
            :label-width="135"
            prop="ctjcSwitch"
            :rules="{
              required: true,
              message: '冲突检测必须是开或者关',
              trigger: 'change',
              type: 'boolean',
            }"
          >
            <i-switch v-model="oneToOneForm.ctjcSwitch">
              <span slot="open">开</span>
              <span slot="close">关</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="oneToOneSubmit">提交一对一试听</Button>
      <Button type="error" @click="closeFormOneToOne">重置</Button>
    </div>
  </Modal>
</template>

<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "OneByOnechaban",
  props: {
    value: { default: false, type: Boolean },
    stuID: { default: "", type: String },
    payMoneyStyleList: { default: [], type: Array },
    campusID: { default: "", type: String },
    editOTOcbdata: { default: "", type: String },
  },
  data() {
    return {
      isShow: this.value,
      oneToOneForm: {
        id: null,
        stuID: null,
        kechengID: null,
        staffID: null,
        classRoomID: null,
        haveClassDate: null,
        haveClassTime: null,
        ctjcSwitch: true,
        isKechengStuNum: true,
        shitingPrice: null,
        payMoneyStyle: null,
      },
      kechengList: [],
      staffList: [{ id: "", staffName: "请先选择课程", disable: true }],
      classRoomList: [],
      oneToOneLoading: false,
    };
  },
  computed: {},
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    kechangChange() {
      this.staffList = [];
      api
        .get("xwcloud-zsbm/yxstu/YixiangStu/getSubjectTeacher", {
          kechengID: this.oneToOneForm.kechengID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.staffList = res.obj;
          }
        });
    },
    payMoneyStyleValidatorOneToOne(rule, value, callback) {
      if (value == undefined || value == null || value == "") {
        return this.oneToOneForm.shitingPrice ? false : true;
      }
      return true;
    },
    closeFormOneToOne() {
      this.$refs["oneToOneForm"].resetFields();
    },
    oneToOneSubmit() {
      this.$refs["oneToOneForm"].validate((valid) => {
        if (valid) {
          this.oneToOneLoading = true;
          let haveClassTime = this.oneToOneForm.haveClassTime;

          if (haveClassTime[0] == haveClassTime[1]) {
            this.oneToOneLoading = false;
            this.$Message.error("上下课时间不能是同一个时间");
            return;
          }

          this.oneToOneForm.haveClassDate = toolbox.dateFtt(
            this.oneToOneForm.haveClassDate,
            "yyyy-MM-dd"
          );

          this.oneToOneForm.haveClassTime = this.oneToOneForm.haveClassTime.join("-");

          api
            .post("xwcloud-zsbm/yxstu/YixiangStu/saveChabanShiting", this.oneToOneForm)
            .then((res) => {
              this.oneToOneForm.haveClassDate = null;
              if (res.success) {
                this.$emit("handleSearch");
                this.$Message.success(res.msg);
                this.$refs["oneToOneForm"].resetFields();
                this.closeModal();
              } else {
                if (res.msg.indexOf("冲突") > -1) {
                  this.$Modal.error({
                    title: "提示",
                    content: res.msg,
                  });
                } else {
                  this.$Message.error(res.msg);
                }
              }
              this.oneToOneLoading = false;
            });
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        if (this.editOTOcbdata != "") {
          let getdata = JSON.parse(this.editOTOcbdata);
          this.oneToOneForm.id = getdata.id;
          this.oneToOneForm.stuID = getdata.yxStuID;
          this.oneToOneForm.kechengID = getdata.kechengID;
          this.oneToOneForm.staffID = getdata.stTeacher;
          this.oneToOneForm.classRoomID = getdata.classRoomID;
          this.oneToOneForm.haveClassDate = getdata.haveClassDate;
          this.oneToOneForm.haveClassTime = getdata.haveLessTime.split("-");
          if (getdata.isAddStuNumToTeacher == 1) {
            this.oneToOneForm.isKechengStuNum = true;
          } else {
            this.oneToOneForm.isKechengStuNum = false;
          }
          this.oneToOneForm.shitingPrice = getdata.shitingPrice;
          this.oneToOneForm.payMoneyStyle = getdata.payMoneyStyle;
          this.kechangChange();
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    stuID(val) {
      if (val) {
        this.oneToOneForm.stuID = val;
      }
    },
    campusID(val) {
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getClassListNo1V1", val).then((res) => {
        if (res.success) {
          this.classList = res.obj;
        }
      });
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getYxChabanKc", val).then((res) => {
        if (res.success) {
          this.kechengList = res.obj;
        }
      });
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getClassRoom", val).then((res) => {
        if (res.success) {
          this.classRoomList = res.obj;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style></style>
