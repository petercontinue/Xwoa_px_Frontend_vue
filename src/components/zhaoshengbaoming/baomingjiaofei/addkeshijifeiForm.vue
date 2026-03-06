<template>
  <Modal
    v-model="show"
    title="添加按课时计费课程"
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
      :label-width="150"
      :label-colon="true"
    >
      <Row>
        <Alert show-icon>
          <Icon type="ios-bulb-outline" slot="icon"></Icon>
          <Col>
            <span>温馨提示：</span>
          </Col>
          <Col style="margin-top: 10px">
            <span>1.【按课时计费】课程适合这员报名时的课时数量比较随机；</span>
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
              @on-change="changeKeshiKecheng"
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
        <Col span="8">
          <FormItem label="开始日期" prop="startDate">
            <DatePicker
              type="date"
              placeholder="请选择开始时间"
              v-model="shezhiForm.startDate"
              style="width: 100%"
              :editable="false"
              :options="startTimeOptions"
              @on-change="startTimeChange"
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
              :editable="false"
              :options="endTimeOptions"
              @on-change="endTimeChange"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="8"></Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="原单价" prop="YDJ">
            <InputNumber
              :max="100000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.YDJ"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="购买价" prop="DJ">
            <InputNumber
              :max="shezhiForm.YDJ"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.DJ"
              style="width: 100%"
              @on-change="jisuanzongjia"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="购买课时" prop="KS">
            <InputNumber
              :max="100000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.KS"
              style="width: 100%"
              @on-change="jisuanzongjia"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="赠送课时" prop="ZKS">
            <InputNumber
              :max="100000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.ZKS"
              style="width: 100%"
              @on-change="changekeshi"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="剩余课时" prop="RKS">
            <InputNumber
              :max="100000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.RKS"
              style="width: 100%"
              readonly
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
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row v-if="showchaban">
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
      showchaban: false,
      crPaike: "以后再插班",
      showInclass: false,
      showPK: false,
      shezhiForm: {
        id: "",
        buxiID: "",
        isShow: "", //是否启用
        kcName: "", //课程名称
        pxStyleName: "", //培训方式名称
        kmName: "", //科目名称
        bjName: "", //班级名称
        classID: "", //班级ID
        kechengID: "", //课程ID
        buxistykeID: 0, //培训方式ID
        KCID: "",
        YDJ: 0, //原单价
        DJ: 0, //单价
        KS: 0, //购买课时
        ZKS: 0, //赠送课时
        RKS: 0, //剩余课时
        ZJ: 0, //总价
        ZK: 0, //折扣
        startDate: "",
        endDate: "",
        jifeistyle: 1,
        ckb: "", //现在插班还是以后插班
        qdsID: 0,
        pkid: "", //排课ID
      },

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
            type: "string",
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
      },
      keshikechengData: [],
      allbanjiData: [],
      allpaike: [],
      endTimeOptions: {},
      startTimeOptions: {},
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
    },
    getpaike() {
      this.shezhiForm.bjName = "";
      api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/xinqianGetPaikeByclassIDList",{
        classID: this.shezhiForm.classID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res);
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
      if (this.shezhiForm.KS == 0 && this.shezhiForm.DJ == 0) {
        this.$Message.error("不允许添加课时和单价都是零的课程!");
      } else {
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
            this.shezhiForm.ZK = (this.shezhiForm.DJ / this.shezhiForm.YDJ).toFixed(2);
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
      }
    },
    checkstaffTel() {},
    closeModal(val) {
      //关闭弹出
      this.$emit("input", val);
    },
    changeKeshiKecheng() {
      var selected = [];
      this.keshikechengData.forEach((element) => {
        if (element.id == this.shezhiForm.kechengID) {
          selected = element;
        }
      });
      if (selected.buxiStyleName == "一对一") {
        //一对一课程
        this.showchaban = false;
      } else {
        //非一对一课程
        this.showchaban = true;
      }
      this.shezhiForm.pxStyleName = selected.buxiStyleName;
      this.shezhiForm.kcName = selected.kechengName;
      this.shezhiForm.kmName = selected.subjectName;
      this.shezhiForm.buxistykeID = selected.buxistyleid;
      this.shezhiForm.isShow = true;
    },
    jisuanzongjia() {
      if (this.shezhiForm.DJ != 0 && this.shezhiForm.KS != 0) {
        this.shezhiForm.ZJ = this.shezhiForm.DJ * this.shezhiForm.KS;
      }
      this.shezhiForm.RKS = this.shezhiForm.ZKS + this.shezhiForm.KS;
    },
    changekeshi() {
      this.shezhiForm.RKS = this.shezhiForm.ZKS + this.shezhiForm.KS;
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
        this.crPaike = "以后再插班";
        this.showInclass = false;
        this.showPK = false;
        this.shezhiForm.ckb = false;
        if (this.editData != "") {
          this.shezhiForm = JSON.parse(this.editData);
          this.changeKeshiKecheng();
        }
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllKechengBycampusID",{
          campusID: this.campusID,
          jifeiStyleID: 1,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.keshikechengData = res.obj;
            console.log(this.keshikechengData);
          }
        });
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllClassByCampusID",{ campusID: this.campusID }).then((res) => {
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
