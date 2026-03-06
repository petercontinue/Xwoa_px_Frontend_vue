<template>
  <Modal
    v-model="show"
    title="修改优惠政策信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="120"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select
              v-model="shezhiForm.campusID"
              placeholder="请选择校区"
              style="width: 75%"
            >
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="优惠类型" prop="youhuiType">
            <Select
              v-model="shezhiForm.youhuiType"
              placeholder="请选择优惠类型"
              style="width: 75%"
              @on-change="changeyouhuiType"
            >
              <Option v-for="item in allyouhuiType" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="年级">
            <Row>
              <Col span="12">
                <RadioGroup v-model="gradetype" @on-change="editgradesType">
                  <Radio label="全部年级"></Radio>
                  <Radio label="指定年级"></Radio>
                </RadioGroup>
              </Col>
              <Col span="12" v-if="gradeShow">
                <FormItem label prop="stuGradeIDs">
                  <Select
                    v-model="shezhiForm.stuGradeIDs"
                    placeholder="请选择年级"
                    style="width: 75%"
                    multiple
                    filterable
                  >
                    <Option
                      v-for="item in allcampusGrades"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.stugradename }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="开始时间" prop="startDateTime">
            <DatePicker
              type="date"
              placeholder="请选择开始时间"
              v-model="shezhiForm.startDateTime"
              style="width: 75%"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="结束时间" prop="endDatetime">
            <DatePicker
              type="date"
              placeholder="请选择结束时间"
              v-model="shezhiForm.endDatetime"
              style="width: 75%"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="条件金额" prop="xianzhijine">
            <InputNumber
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.xianzhijine"
              style="width: 75%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="优惠金额/折扣" prop="youhui">
            <InputNumber
              :max="maxyouhui"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.youhui"
              style="width: 75%"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="使用次数限制">
            <Row>
              <Col span="12">
                <RadioGroup v-model="timeType" @on-change="editTimeType">
                  <Radio label="不限次数"></Radio>
                  <Radio label="设置次数"></Radio>
                </RadioGroup>
              </Col>
              <Col span="12" v-if="timesShow">
                <FormItem prop="useTimes">
                  <InputNumber
                    :max="1000000"
                    :min="-1"
                    :step="1"
                    v-model="shezhiForm.useTimes"
                    style="width: 72%"
                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "editPayMoneyStyle",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdata: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        campusID: "",
        youhuiType: "",
        stuGradeIDs: "",
        startDateTime: "",
        endDatetime: "",
        xianzhijine: 0.01,
        youhui: 0.01,
        useTimes: -1,
      },
      gradetype: "全部年级",
      gradeShow: false,
      timeType: "不限次数",
      timesShow: false,
      shezhiFormRule: {
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        youhuiType: [
          {
            required: true,
            message: "请选择优惠类型",
            trigger: "change",
            type: "string",
          },
        ],
        stuGradeIDs: [
          {
            required: true,
            message: "请选择年级",
            trigger: "change",
            type: "array",
          },
        ],
        startDateTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change",
            type: "date",
          },
        ],
        endDatetime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change",
            type: "date",
          },
        ],
        xianzhijine: [
          {
            required: true,
            message: "请输入限制金额",
            trigger: "change",
            type: "number",
          },
        ],
        youhui: [
          {
            required: true,
            message: "请输入优惠金额/折扣",
            trigger: "change",
            type: "number",
          },
        ],
      },
      allcampusData: [],
      allcampusGrades: [],
      allyouhuiType: [
        { id: "1", name: "折扣" },
        { id: "2", name: "满减" },
      ],
      maxyouhui: 100000,
      updateData: [],
    };
  },
  methods: {
    editgradesType() {
      console.log(this.gradetype);
      if (this.gradetype == "全部年级") {
        this.shezhiForm.stuGradeIDs = -1;
        this.gradeShow = false;
      } else if (this.gradetype == "指定年级") {
        this.gradeShow = true;
      }
    },
    editTimeType() {
      console.log(this.timeType);
      if (this.timeType == "不限次数") {
        this.shezhiForm.useTimes = -1;
        this.timesShow = false;
      } else if (this.timeType == "设置次数") {
        this.timesShow = true;
      }
    },

    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          let nianji = "";
          if (this.shezhiForm.stuGradeIDs == -1) {
          } else {
            this.shezhiForm.stuGradeIDs.forEach((element) => {
              nianji += element + ",";
            });
            this.shezhiForm.stuGradeIDs = nianji.substring(0, nianji.length - 1);
          }
          api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateYouhuiZhengce",{
            id: this.updateData.id,
            youhuiType: this.shezhiForm.youhuiType,
            xianzhijine: this.shezhiForm.xianzhijine,
            youhui: this.shezhiForm.youhui,
            startDateTime: toolbox.dateFtt(this.shezhiForm.startDateTime, "yyyy-MM-dd"),
            endDatetime: toolbox.dateFtt(this.shezhiForm.endDatetime, "yyyy-MM-dd"),
            campusID: this.shezhiForm.campusID,
            qiyeID: this.updateData.qiyeID,
            stuGradeIDs: this.shezhiForm.stuGradeIDs,
            useTimes: this.shezhiForm.useTimes,
          }).then((res) => {
            console.log(res);
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
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
        }
      });
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changeyouhuiType() {
      if (this.shezhiForm.youhuiType == "1") {
        this.maxyouhui = 10;
      } else {
        this.maxyouhui = 100000;
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shezhiForm"].resetFields();
        console.log(JSON.parse(this.editdata));
        let data = JSON.parse(this.editdata);
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetYouhuizhengceInfos",{ Id: data.id }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.updateData = res.obj;
            this.shezhiForm.campusID = res.obj.campusID;
            this.shezhiForm.youhuiType = res.obj.youhuiType + "";
            if (res.obj.stuGradeIDs == -1) {
              this.gradetype = "全部年级";
              this.gradeShow = false;
              this.shezhiForm.stuGradeIDs = -1;
            } else {
              this.gradetype = "指定年级";
              this.gradeShow = true;
              let arr = [];
              res.obj.stuGradeIDs.split(",").forEach((element) => {
                arr.push(element);
              });
              this.shezhiForm.stuGradeIDs = arr;
            }

            this.shezhiForm.xianzhijine = res.obj.xianzhijine;
            this.shezhiForm.youhui = res.obj.youhui;
            this.shezhiForm.startDateTime = toolbox.dateFtt(
              res.obj.startDateTime,
              "yyyy-MM-dd"
            );
            this.shezhiForm.endDatetime = toolbox.dateFtt(
              res.obj.endDatetime,
              "yyyy-MM-dd"
            );
            this.shezhiForm.useTimes = res.obj.useTimes;
            if (res.obj.useTimes == -1) {
              this.timeType = "不限次数";
              this.timesShow = false;
            } else {
              this.timeType = "设置次数";
              this.timesShow = true;
            }
          }
        });
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 149 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-sys/sys/SystemSetting/GetAllStuGradeList",{ campusID: this.shezhiForm.campusID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusGrades = res.obj;
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
