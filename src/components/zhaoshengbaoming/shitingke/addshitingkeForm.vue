<template>
  <Modal
    v-model="show"
    title="添加试听课信息"
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
      <FormItem label="选择课程" prop="kechnegID">
        <Select v-model="shezhiForm.kechnegID" placeholder="请选择课程">
          <Option
            v-for="item in allkechengData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="任课教师" prop="teacherIDs">
            <Select
              v-model="shezhiForm.teacherIDs"
              placeholder="请选择任课教师"
              multiple
            >
              <Option
                v-for="item in teacherData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="教室" prop="classroomID">
            <Select v-model="shezhiForm.classroomID" placeholder="请选择教室">
              <Option
                v-for="item in classroomData"
                :value="item.id"
                :key="item.id"
                >{{ item.classroomname }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="上课时间" prop="shangkeDate">
            <DatePicker
              type="date"
              placeholder="请选择上课时间"
              v-model="shezhiForm.shangkeDate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="上课时间" prop="shangkeTime">
            <TimePicker
              format="HH:mm"
              type="timerange"
              placement="bottom-end"
              placeholder="请选择上课时间"
              style="width: 100%"
              v-model="shezhiForm.shangkeTime"
            ></TimePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="试听价格" prop="shitingPrice">
            <InputNumber
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.shitingPrice"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="试听标题" prop="title">
            <Input
              type="text"
              v-model="shezhiForm.title"
              placeholder="请输入试听标题"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="咨询电话" prop="zixunphone">
            <Input
              type="text"
              v-model="shezhiForm.zixunphone"
              placeholder="请输入咨询电话"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="试听课图片">
          <addgood-img @increment="changeImgs"></addgood-img>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="活动说明">
          <edit
            @increment="changehuodongshuoming"
            v-model="edshow"
            :detailInfo="shezhiForm.huodongshuoming"
          ></edit>
        </FormItem>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import addgoodImg from "@/components/zhaoshengbaoming/wxmall/addgoodImg.vue";
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    addgoodImg,
    edit,
  },
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
    },
    type: {
      type: Number,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      edshow: true,
      shezhiForm: {
        kechnegID: "",
        teacherIDs: "",
        classroomID: "",
        shangkeDate: "",
        shangkeTime: [],
        shitingPrice: 0,
        title: "",
        zixunphone: "",
        kechengImgs: "",
        huodongshuoming: "",
      },
      shezhiFormRule: {
        kechnegID: [
          {
            required: true,
            message: "请选择课程",
            trigger: "change",
            type: "string",
          },
        ],
        teacherIDs: [
          {
            required: true,
            message: "请选择上课教师",
            trigger: "change",
            type: "array",
          },
        ],
        classroomID: [
          {
            required: true,
            message: "请选择上课教室",
            trigger: "change",
            type: "string",
          },
        ],
        shangkeDate: [
          {
            required: true,
            message: "请选择上课日期",
            trigger: "change",
            type: "date",
          },
        ],
        // shangkeTime: [
        //   {
        //     required: true,
        //     message: "请选择上课时间",
        //     trigger: "change",
        //     type: "date",
        //   },
        // ],
      },
      allcampusData: [],
      allkechengData: [],
      teacherData: [],
      classroomData: [],
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          console.log(this.shezhiForm);
          let teacherIDs = "";
          let teacherNames = "";
          this.shezhiForm.teacherIDs.forEach((element) => {
            teacherIDs += element + ",";
            this.teacherData.forEach((element1) => {
              if (element1.id == element) {
                teacherNames += element1.name + ",";
              }
            });
          });
          api.post("xwcloud-pkxk/paike/paikexiaoke/SaveshitingkechengInfo",{
            startLessonDateTime: this.shezhiForm.shangkeTime[0],
            endLessonDateTime: this.shezhiForm.shangkeTime[1],
            haveClassDate: toolbox.dateFtt(
              this.shezhiForm.shangkeDate,
              "yyyy-MM-dd"
            ),
            teacherIDs: teacherIDs,
            teacherNames: teacherNames,
            classRoomID: this.shezhiForm.classroomID,
            maxStuNum: 10,
            kechengID: this.shezhiForm.kechnegID,
            huodongImg: this.shezhiForm.kechengImgs,
            huodongTitle: this.shezhiForm.title,
            huodongshuoming: this.shezhiForm.huodongshuoming,
            zixunphone: this.shezhiForm.zixunphone,
            shitingprice: this.shezhiForm.shitingPrice,
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
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
    },
    changehuodongshuoming(data) {
      this.shezhiForm.huodongshuoming = JSON.parse(this.editData).kechengInfo;
    },
    changeImgs(data) {
      console.log(JSON.parse(data));
      this.shezhiForm.kechengImgs = JSON.parse(data)[0].url;
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
        api.get("xwcloud-pkxk/paike/paikexiaoke/getallkechengByCampusId",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allkechengData = res.obj;
          }
        });
        api.get("xwcloud-caiwu/caiwu/pxtuifeitable/getallStaff",{}).then((result) => {
          if (result.code == "Y" && result.success == true) {
            this.teacherData = result.obj;
          }
        });
        api.get("xwcloud-pkxk/paike/paikexiaoke/GetAllClassRoom",{}).then((result) => {
          if (result.code == "Y" && result.success == true) {
            this.classroomData = result.obj;
          }
        });
        if (this.type == 2) {
          this.shezhiForm.kechnegID = JSON.parse(this.editData).kechengID;
          this.shezhiForm.teacherIDs = JSON.parse(
            this.editData
          ).teacherIDs.split(",");
          this.shezhiForm.classroomID = JSON.parse(this.editData).classRoomID;
          this.shezhiForm.shangkeDate = toolbox.dateFtt(
            JSON.parse(this.editData).haveClassDate,
            "yyyy-MM-dd"
          );
          let sl = [];
          sl.push(JSON.parse(this.editData).startLessonDateTime);
          sl.push(JSON.parse(this.editData).endLessonDateTime);
          this.shezhiForm.shangkeTime = sl;
          this.shezhiForm.shitingPrice = JSON.parse(this.editData).shitingprice;
          this.shezhiForm.title = JSON.parse(this.editData).huodongTitle;
          this.shezhiForm.zixunphone = JSON.parse(this.editData).zixunphone;
          this.shezhiForm.kechengImgs = "";
          this.shezhiForm.huodongshuoming = JSON.parse(
            this.editData
          ).kechengInfo;
        }
        this.edshow = true;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
