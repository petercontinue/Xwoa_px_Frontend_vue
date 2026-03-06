<template>
  <Modal
    v-model="show"
    title="设置共享课时"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="40"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="ruleValidate"
      label-position="right"
      :label-width="120"
      :label-colon="true"
    >
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：共享课程需要为相同课程时长的课程</span>
        </Col>
      </Alert>

      <Row>
        <Col span="12">
          <FormItem label="学员">
            <Input v-model="stuName" readonly />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="课程">
            <Input v-model="kcName" readonly />
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="共享类型">
            <RadioGroup v-model="logForm.sharetype" @on-change="chengeType">
              <Radio label="1">共享给自己的其他课程</Radio>
              <Radio label="2">共享给其他学员</Radio>
            </RadioGroup>
          </FormItem></Col
        >
      </Row>

      <Row>
        <Col span="12" v-if="logForm.sharetype === '2'">
          <FormItem label="其他学员" prop="otherStuID">
            <Select
              v-model="logForm.otherStuID"
              filterable
              placeholder="请选择学员"
              @on-change="checkStu"
            >
              <Option v-for="item in allStu" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="课程" prop="newbuxiID">
            <Select v-model="checkbuxi" multiple @on-change="checkkc">
              <Option v-for="item in allBuxi" :value="item.id" :key="item.id">{{
                item.kechengName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.divShow {
  /* text-align: center; */
  margin: 10px;
}
</style>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "sharekeshi",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    sharedata: { type: String },
    isshare: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      tuisong: false,
      logForm: {
        stuID: "",
        otherStuID: "",
        sharetype: "1",
        nowbuxiID: "",
        classTime: "",
        newbuxiID: "",
      },

      stuName: "",
      kcName: "",
      ruleValidate: {
        otherStuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        newbuxiID: [{ required: true, message: "请选择共享的课程", trigger: "change" }],
      },
      getdata: JSON,
      allStu: [],
      allBuxi: [],
      checkbuxi: [],
    };
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },

    chengeType() {
      this.logForm.newbuxiID = "";
      this.checkbuxi = [];
      if (this.logForm.sharetype == "1") {
        this.getOtherBuxi();
      }
    },

    getallstuList() {
      api.get("xwcloud-stu/stu/stuManagement/getallstu",{ menuID: 221 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStu = res.obj;
          console.log(res);
        }
      });
    },
    checkStu() {
      this.OtherStuBuxi();
    },

    OtherStuBuxi() {
      this.allBuxi = [];
      api.get("xwcloud-stu/stu/buxikecheng/getstuOtherbuxi",{
        stuID: this.logForm.otherStuID,
        buxiID: "",
        classTime: this.logForm.classTime,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allBuxi = res.obj;
          console.log(res);
        }
      });
    },

    checkkc() {
      console.log("1");
      this.logForm.newbuxiID = "";
      this.checkbuxi.forEach((item) => {
        this.logForm.newbuxiID += item + ",";
      });
    },

    getOtherBuxi() {
      this.allBuxi = [];
      api.get("xwcloud-stu/stu/buxikecheng/getstuOtherbuxi",{
        stuID: this.logForm.stuID,
        buxiID: this.logForm.nowbuxiID,
        classTime: this.logForm.classTime,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allBuxi = res.obj;
        }
      });
    },

    handleSubmit(name) {
      console.log(this.logForm);
      this.$refs[name].validate((valid) => {
        if (valid) {
          api.post("xwcloud-stu/stu/buxikecheng/savesharekeshi",{
            buxiID: this.logForm.nowbuxiID,
            sharebuxiID: this.logForm.newbuxiID,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.$emit("handleSearch");
              this.$refs[name].resetFields();
              this.closeModal();
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      this.$refs["logForm"].resetFields();
      if (val) {
        this.getdata = JSON.parse(this.sharedata);
        console.log(this.getdata);
        this.stuName = this.getdata.stuName;
        this.kcName = this.getdata.buxiCourse;
        this.logForm.stuID = this.getdata.stuID;
        this.logForm.nowbuxiID = this.getdata.id;
        this.logForm.classTime = this.getdata.courseTimeID;
        if (this.isshare != "0") {
          this.logForm.newbuxiID = this.isshare;
          this.checkbuxi = this.isshare.split(",");
          console.log(this.isshare);
        }
        this.getOtherBuxi();
        this.getallstuList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
