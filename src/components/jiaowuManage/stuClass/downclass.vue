<template>
  <Modal v-model="show" title="退班" :mask-closable="false" width="25">
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="120"
      :label-colon="true"
    >
      <Row style="margin-top: 10px">
        <Col span="20">
          <FormItem label="校区">
            <Input v-model="campusName" readonly />
          </FormItem>
        </Col>
      </Row>
      <Row style="margin-top: 10px">
        <Col span="20">
          <FormItem label="课程">
            <Input v-model="kechengName" readonly />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="20">
          <FormItem label="退出班级" prop="classids">
            <Select v-model="selectclass" placeholder="请选择班级" @on-change="changeClass" multiple>
              <Option v-for="item in oldData" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row v-if="tuipaike">
        <Col span="20">
          <Tooltip content="从选择的排课开始（包含），退出排课" max-width="400" placement="top">
            <FormItem label="退出排课" prop="pkid">
              <Select v-model="logForm.pkid" placeholder="选择排课" style="width:300px">
                <Option
                  v-for="item in paikeDate"
                  :value="item.paikeid"
                  :key="item.paikeid"
                >{{ item.haveClassDate|formatDate}} {{item.startLessonDateTime}}-{{item.endLessonDateTime}}</Option>
              </Select>
            </FormItem>
          </Tooltip>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit()">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "edit1v1class",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxiID: { type: String },
    campusName: { type: String },
    kechengName: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        ids: "",
        classids: "",
        pkid: "", //单个班级退班时
      },
      selectclass: [],
      dataID: [],
      allbuxiID: [],
      oldData: [], // saveChangeClass
      logFormRule: {
        classids: [
          { required: true, message: "请选择退出班级", trigger: "change" },
        ],
        pkid: [
          { required: true, message: "请选择退出排课", trigger: "change" },
        ],
      },
      paikeDate: [],
      tuipaike: false,
    };
  },
  filters: {
    formatDate: function (value) {
      let datehave = toolbox.dateFtt(value, "yyyy-MM-dd");
      return datehave;
    },
  },
  methods: {
    handleSubmit() {
      this.logForm.ids = "";
      this.logForm.ids = JSON.stringify(this.allbuxiID);

      this.$refs["logForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          api.post("xwcloud-stu/stu/stuClass/tuichuClass",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.closeModal(false);
              this.dataID = [];
            } else {
              this.$Message.error(res.msg);
              this.closeModal(false);
            }
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    handleReset() {
      this.$refs["logForm"].resetFields();
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },

    getOldClassList() {
      api.get("xwcloud-stu/stu/stuClass/getOldClass",{ buxiID: this.buxiID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.oldData = res.obj;
        }
      });
    },

    changeClass() {
      this.logForm.classids = "";
      if (this.selectclass.length > 0) {
        this.selectclass.forEach((item) => {
          this.dataID.push({ id: item });
        });
        this.logForm.classids = JSON.stringify(this.dataID);
      }

      this.paikeDate = [];
      if (this.selectclass.length == 1) {
        api.get("xwcloud-stu/stu/stuClass/getInPaikeByClassandBuxi",{
          classID: this.selectclass[0],
          buxiID: this.buxiID,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            //说明是有排课，显示排课时间
            this.paikeDate = res.obj;
            if (res.obj.length <= 0) {
              //没有排课
              this.tuipaike = false;
            } else {
              this.tuipaike = true;
            }
          }
        });
      } else {
        this.tuipaike = false;
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
      this.selectclass = [];
      this.logForm.ids = "";
      this.logForm.classids = "";
      this.allbuxiID = [];
      this.dataID = [];
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.paikeDate = [];
        this.tuipaike = false;
        this.$refs["logForm"].resetFields();
        this.allbuxiID.push({ id: this.buxiID });
        this.getOldClassList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
