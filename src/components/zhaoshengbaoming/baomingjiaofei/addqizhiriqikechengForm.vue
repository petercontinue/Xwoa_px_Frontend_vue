<template>
  <Modal
    v-model="show"
    title="添加按起止日期计费课程"
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
      :label-width="100"
      :label-colon="true"
    >
      <Row>
        <Alert show-icon>
          <Icon type="ios-bulb-outline" slot="icon"></Icon>
          <Col>
            <span>温馨提示：</span>
          </Col>
          <Col style="margin-top: 10px">
            <span
              >1.【按起止日期计费】课程是只管开始/结束日期，不计课时的；切勿混淆；</span
            >
          </Col>
          <Col style="margin-top: 10px">
            <span
              >2.【一对一】课程不用插件，系统会自动创建一个一对一班级，自动完成插班；一对一课程报名后就可以排课了；</span
            >
          </Col>
          <Col style="margin-top: 10px">
            <span
              >3.【班课】可以在报名的时候直接插班；也可以先只是报名，在报名完成以后，在班级管理那里再去插班；</span
            >
          </Col>
        </Alert>
      </Row>
      <Row>
        <Col span="16">
          <FormItem label="培训课程" prop="kechengID">
            <Select
              v-model="shezhiForm.kechengID"
              placeholder="请选择培训课程"
              style="width: 100%"
              @on-change="selectkecheng"
              filterable
            >
              <Option v-for="item in keshikechengData" :value="item.id" :key="item.id">{{
                item.kechengName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px">
          培训课程<label style="color: #2d8cf0"
            >【<router-link to="/kechengshezhi">点击这里</router-link>】</label
          >自定义设置
        </Col>
      </Row>
      <Row>
        <Col span="8" v-if="byMonthOrDay == 1">
          <FormItem label="月数">
            <InputNumber
              :max="100000"
              :min="1"
              :step="1"
              v-model="days"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8" v-if="byMonthOrDay == 2">
          <FormItem label="天数">
            <InputNumber
              :max="100000"
              :min="1"
              :step="1"
              v-model="days"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="开始日期" prop="startDate">
            <DatePicker
              type="date"
              placeholder="请选择开始时间"
              v-model="shezhiForm.startDate"
              style="width: 100%"
              @on-change="startTimeChange"
              :editable="false"
              :options="startTimeOptions"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="结束日期" prop="endDate">
            <DatePicker
              type="date"
              placeholder="请选择结束时间"
              v-model="shezhiForm.endDate"
              style="width: 100%"
              @on-change="endTimeChange"
              :options="endTimeOptions"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="课程单价（元/天）" prop="DJ">
            <InputNumber
              :max="100000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.DJ"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="课时数（天）" prop="tianshu">
            <InputNumber
              :max="100000"
              :min="1"
              :step="1"
              v-model="shezhiForm.tianshu"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="课程总价" prop="ZJ">
            <InputNumber
              :max="100000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.ZJ"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="是否打折" prop="isdazge">
            <RadioGroup v-model="shezhiForm.isdazge" @on-change="changezkType">
              <Radio label="是">是</Radio>
              <Radio label="否">否</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12" v-if="isze">
          <FormItem label="折扣" prop="ZK">
            <InputNumber
              :max="10"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.ZK"
              style="width: 100%"
              @on-blur="changezhekou"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="是否插班">
            <RadioGroup v-model="crPaike" @on-change="charupaike">
              <Radio label="以后再插班"></Radio>
              <Radio label="现在插班"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row v-if="showPK">
        <Col span="12" v-if="showInclass">
          <FormItem label="插入班级">
            <Select
              v-model="shezhiForm.classID"
              placeholder="请选择插入班级"
              style="width: 100%"
              @on-change="getpaike"
              :filterable="true"
            >
              <Option v-for="item in allbanjiData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row v-if="showPK">
        <Col span="12">
          <FormItem label="插入班级排课">
            <Select
              v-model="shezhiForm.pkid"
              placeholder="请选择插入班级的开始排课次"
              style="width: 100%"
              :filterable="true"
            >
              <Option v-for="item in allpaike" :value="item.id" :key="item.id"
                >{{ item.haveClassDate | formatDate }} {{ item.startLessonDateTime }}-{{
                  item.endLessonDateTime
                }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
          <label style="color: #2d8cf0">温馨提示：这里是选择从哪次排课开始插入</label>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import * as moment from "moment";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    campusID: {
      type: String,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      crPaike: "以后再插班",
      showInclass: false,
      showPK: false,
      allpaike: [],
      shezhiForm: {
        id: "",
        buxiID: "",
        isShow: "",
        kcName: "",
        pxStyleName: "",
        kmName: "",
        bjName: "",
        classID: "",
        pkid: "",
        kechengID: "",
        buxistykeID: 0,
        KCID: "",
        YDJ: 0,
        DJ: 0,
        KS: 0,
        ZKS: 0,
        RKS: 0,
        ZJ: 0,
        ZK: 10,
        startDate: "",
        endDate: "",
        jifeistyle: 3,
        ckb: "",
        qdsID: 0,
        isdazge: "否",
        tianshu: 0,
        banjiID: 0,
      },
      days: 0,
      byMonthOrDay: "",
      shezhiFormRule: {
        kechengID: [
          {
            required: true,
            message: "请选择培训课程",
            trigger: "change",
            type: "string",
          },
        ],
        startDate: [
          {
            required: true,
            message: "请选择课程开始时间",
            trigger: "change",
            type: "string",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请选择课程结束时间",
            trigger: "change",
            type: "date",
          },
        ],
        YDJ: [
          {
            required: true,
            message: "请输入课程原单价",
            trigger: "change",
            type: "number",
          },
        ],
        DJ: [
          {
            required: true,
            message: "请输入课程单价",
            trigger: "change",
            type: "number",
          },
        ],
        KS: [
          {
            required: true,
            message: "请输入购买课时数",
            trigger: "change",
            type: "number",
          },
        ],
        tianshu: [
          {
            required: true,
            message: "请输入天数",
            trigger: "change",
            type: "number",
          },
        ],
      },
      showchaban: false,
      keshikechengData: [],
      allbanjiData: [],
      isze: false,
      oldzk: 10,
      endTimeOptions: {},
      startTimeOptions: {},
      kechengzongjia: 0,
    };
  },
  filters: {
    formatDate: function (value) {
      let datehave = toolbox.dateFtt(value, "yyyy-MM-dd");
      return datehave;
    },
  },
  methods: {
    startTimeChange: function (e) {
      //设置开始时间
      this.shezhiForm.startDate = e;
      this.endTimeOptions = {
        disabledDate: (date) => {
          let startTime = this.shezhiForm.startDate
            ? new Date(this.shezhiForm.startDate).valueOf()
            : "";
          return date && date.valueOf() < startTime;
        },
      };
      this.changeDate();
    },
    endTimeChange: function (e) {
      //设置结束时间
      this.shezhiForm.endDate = e;
      let endTime = this.shezhiForm.endDate
        ? new Date(this.shezhiForm.endDate).valueOf() - 1 * 24 * 60 * 60 * 1000
        : "";
      this.startTimeOptions = {
        disabledDate(date) {
          return date && date.valueOf() > endTime;
        },
      };
      this.changeDate();
    },

    getpaike() {
      this.shezhiForm.bjName = "";
      api
        .get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/xinqianGetPaikeByclassIDList", {
          classID: this.shezhiForm.classID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allpaike = res.obj;
          }
        });

      this.allbanjiData.forEach((item) => {
        if (item.id == this.shezhiForm.classID) {
          this.shezhiForm.bjName = item.name;
        }
      });
    },
    charupaike() {
      this.shezhiForm.ckb = "";
      if (this.crPaike == "以后再插班") {
        this.showInclass = false;
        this.showPK = false;
        this.shezhiForm.ckb = false;
      } else if (this.crPaike == "现在插班") {
        this.showInclass = true;
        this.showPK = true;
        this.shezhiForm.ckb = true;
      }
    },
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          this.shezhiForm.startDate = toolbox.dateFtt(
            this.shezhiForm.startDate,
            "yyyy-MM-dd"
          );
          this.shezhiForm.endDate = toolbox.dateFtt(
            this.shezhiForm.endDate,
            "yyyy-MM-dd"
          );
          this.shezhiForm.ZK =
            this.shezhiForm.DJ == 0 || this.shezhiForm.YDJ == 0
              ? 1
              : Number((this.shezhiForm.DJ / this.shezhiForm.YDJ).toFixed(2));
          this.shezhiForm.KCID = this.shezhiForm.kechengID;
          //点击确定，调用父页面的方法
          var array = [];
          array = this.shezhiForm;
          this.$emit("increment", JSON.stringify(array));
          this.closeModal(false);
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
    //选择课程
    selectkecheng() {
      var selected = [];
      this.keshikechengData.forEach((element) => {
        if (element.id == this.shezhiForm.kechengID) {
          selected = element;
          this.days = element.keshiNum;
          this.byMonthOrDay = element.byMonthOrDay;
          this.shezhiForm.KS = element.keshiNum;
          this.shezhiForm.ZJ = element.zongjia;
          this.kechengzongjia = element.zongjia;
          this.shezhiForm.pxStyleName = element.buxiStyleName;
          this.shezhiForm.kcName = element.kechengName;
          this.shezhiForm.kmName = element.subjectName;
          this.shezhiForm.buxistykeID = element.buxistyleid;
          this.shezhiForm.isShow = true;
          if (element.buxiStyleName == "一对一") {
            //一对一课程
            this.showchaban = false;
          } else {
            //非一对一课程
            this.showchaban = true;
          }
        }
      });
    },
    //更改日期
    changeDate() {
      if (this.shezhiForm.startDate != "" && this.shezhiForm.endDate == "") {
        if (this.byMonthOrDay == 1) {
          //按月数
          this.shezhiForm.endDate = moment(this.shezhiForm.startDate)
            .add(this.shezhiForm.KS, "M")
            .format("YYYY-MM-DD");
        } else if (this.byMonthOrDay == 2) {
          this.shezhiForm.endDate = moment(this.shezhiForm.startDate)
            .add(this.shezhiForm.KS, "d")
            .format("YYYY-MM-DD");

          //按天数
        }
      }
      if (this.shezhiForm.startDate != "" && this.shezhiForm.endDate != "") {
        this.shezhiForm.tianshu = this.DateDiffer(
          this.shezhiForm.startDate,
          this.shezhiForm.endDate
        );
        this.shezhiForm.DJ = Number(
          (this.shezhiForm.ZJ / this.shezhiForm.tianshu).toFixed(2)
        );
        this.shezhiForm.KS = this.shezhiForm.tianshu;
      }
    },

    //计算两个时间相差天数
    DateDiffer(Date_start, Date_end) {
      //date1结束时间
      let date1 = new Date(Date_end);
      //date2当前时间
      let date2 = new Date(Date_start);
      date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
      date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
      const diff = date1.getTime() - date2.getTime(); //目标时间减去当前时间
      const diffDate = diff / (24 * 60 * 60 * 1000); //计算当前时间与结束时间之间相差天数
      return diffDate;
    },

    changezhekou() {
      if (this.shezhiForm.ZK == 10) {
        let zks = Number(this.oldzk / 10);
        this.shezhiForm.DJ = Number(this.shezhiForm.DJ / zks).toFixed(2);
        this.shezhiForm.ZJ = Number(this.shezhiForm.ZJ / zks).toFixed(2);
      } else {
        console.log(this.shezhiForm);
        this.shezhiForm.ZJ = Number(
          ((this.kechengzongjia * this.shezhiForm.ZK) / 10).toFixed(2)
        );
        this.oldzk = this.shezhiForm.ZK;
        this.shezhiForm.DJ = Number(
          (this.shezhiForm.ZJ / this.shezhiForm.tianshu).toFixed(2)
        );
      }
    },
    changezkType() {
      if (this.shezhiForm.isdazge == "是") {
        this.isze = true;
      } else if (this.shezhiForm.isdazge == "否") {
        if (this.oldzk != 10) {
          let zks = Number(this.oldzk / 10);
          this.shezhiForm.DJ = Number((this.shezhiForm.DJ / zks).toFixed(2));
          this.shezhiForm.ZJ = Number((this.shezhiForm.ZJ / zks).toFixed(2));
          this.shezhiForm.ZK = 10;
        }
        this.oldzk = 10;
        this.isze = false;
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
        this.isze = false;
        this.days = 10;
        this.byMonthOrDay = "";
        this.crPaike = "以后再插班";
        this.showInclass = false;
        this.showPK = false;
        this.shezhiForm.ckb = false;
        if (this.editData != "") {
          this.shezhiForm = JSON.parse(this.editData);
        }
        api
          .get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllKechengBycampusID", {
            campusID: this.campusID,
            jifeiStyleID: 3,
          })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.keshikechengData = res.obj;
            }
          });
        api
          .get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllClassByCampusID", {
            campusID: this.campusID,
          })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allbanjiData = res.obj;
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
