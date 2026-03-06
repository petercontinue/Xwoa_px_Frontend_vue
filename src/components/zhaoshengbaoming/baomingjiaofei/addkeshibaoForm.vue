<template>
  <Modal
    v-model="show"
    title="添加按课时包计费课程"
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
              @on-change="selectKecheng"
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
              :min="0"
              :step="0.01"
              v-model="shezhiForm.YDJ"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="现单价" prop="DJ">
            <InputNumber
              :max="100000"
              :min="0"
              :step="0.01"
              v-model="shezhiForm.DJ"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="购买课时" prop="KS">
            <InputNumber
              :max="100000"
              :min="0"
              :step="0.01"
              v-model="shezhiForm.KS"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="赠送课时" prop="ZKS">
            <InputNumber
              :max="100000"
              :min="0"
              :step="0.01"
              v-model="shezhiForm.ZKS"
              style="width: 100%"
              @on-change="changeallks"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="实得课时">
            <InputNumber v-model="allksnum" style="width: 100%" readonly></InputNumber>
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
              @on-change="changeZongprice"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="4">
          <FormItem label="是否打折" prop="isdazge">
            <RadioGroup v-model="shezhiForm.isdazge" @on-change="changezkType">
              <Radio label="否">否</Radio>
              <Radio label="是">是</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="4" v-if="isze">
          <FormItem label="折扣" prop="ZK">
            <InputNumber
              :max="10"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.ZK"
              style="width: 100%"
              @on-change="changezhekou"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col
          span="12"
          v-if="isze"
          style="text-align: left; padding-left: 5px; padding-top: 8px; color: #2d8cf"
        >
          温馨提示：10表示不打折，九折输入9，九五折输入9.5，依此类推
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
import { mapActions } from "vuex";
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
        isShow: "",
        kcName: "",
        pxStyleName: "",
        kmName: "",
        classID: "",
        pkid: "",
        bjName: "",
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
        jifeistyle: 2,
        ckb: "",
        qdsID: 0,
        isdazge: "否",
      },
      allksnum: 0,
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
      isze: false,
      oldzk: 10,
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
      console.log(e);
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
      console.log(e);
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
          this.shezhiForm.ZK = Number(
            (this.shezhiForm.DJ / this.shezhiForm.YDJ).toFixed(2)
          );
          console.log(this.shezhiForm);
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
    changeallks() {
      this.allksnum = Number(this.shezhiForm.KS) + Number(this.shezhiForm.ZKS);
      this.shezhiForm.RKS = this.allksnum;
    },
    /**修改总价时计算剩余课时 */
    changeZongprice() {
      this.shezhiForm.KS = Number(this.shezhiForm.ZJ) / Number(this.shezhiForm.DJ);
      this.shezhiForm.RKS = this.shezhiForm.KS;
      this.allksnum = this.shezhiForm.KS + this.shezhiForm.ZKS;
    },
    closeModal(val) {
      this.$refs["shezhiForm"].resetFields();
      this.oldzk = 10;
      this.$emit("input", val);
    },
    selectKecheng() {
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
      api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/getKechengbykechengID",{ kechengID: this.shezhiForm.kechengID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.shezhiForm.YDJ = res.obj.kechengprice;
          this.shezhiForm.DJ = res.obj.kechengprice;
          this.shezhiForm.KS = res.obj.keshiNum;
          this.shezhiForm.ZJ = res.obj.buyZonjia;
          this.shezhiForm.RKS = res.obj.keshiNum;
          this.allksnum = res.obj.keshiNum;
        }
      });
    },
    changezhekou() {
      if (this.shezhiForm.ZK == 10) {
        let zks = Number(this.oldzk / 10);
        this.shezhiForm.DJ = Number(this.shezhiForm.DJ / zks).toFixed(2);
        this.shezhiForm.ZJ = Number(this.shezhiForm.ZJ / zks).toFixed(2);
      } else {
        this.oldzk = this.shezhiForm.ZK;
        this.shezhiForm.DJ = Number(
          ((this.shezhiForm.DJ * this.shezhiForm.ZK) / 10).toFixed(2)
        );
        this.shezhiForm.ZJ = this.shezhiForm.DJ * this.shezhiForm.KS;
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
        this.allksnum = 0;
        this.$refs["shezhiForm"].resetFields();
        this.showchaban = false;
        this.crPaike = "以后再插班";
        this.showInclass = false;
        this.shezhiForm.ckb = false;
        this.showPK = false;
        this.shezhiForm.isdazge = "否";
        this.isze = false;
        if (this.editData != "") {
          this.shezhiForm = JSON.parse(this.editData);

          console.log(this.shezhiForm);
          this.selectKecheng();
          this.allksnum = this.shezhiForm.KS + this.shezhiForm.ZKS;
        }
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllKechengBycampusID",{
          campusID: this.campusID,
          jifeiStyleID: 2,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.keshikechengData = res.obj;
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
