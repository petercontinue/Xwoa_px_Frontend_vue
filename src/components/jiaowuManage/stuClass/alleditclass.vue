<template>
  <Modal v-model="show" title="批量转班" :mask-closable="false" width="30">
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="120"
      :label-colon="true"
    >
      <Row>
        <Col span="24">
          <div>
            <Alert show-icon style="margin-top: 0px">
              <Icon type="ios-bulb-outline" slot="icon"></Icon>
              <Col>
                <span>温馨提示：</span>
              </Col>
              <Col style="margin-top: 10px">
                <span>批量转班时,选中学员退出原班级-操作时间当天及以后的全部排课、全部班级，并都添加到转入班级选中的插入排课次之后的排课内</span>
              </Col>
            </Alert>
          </div>
        </Col>
      </Row>
      <Row style="margin-top: 10px">
        <Col span="20">
          <FormItem label="校区">
            <Input v-model="campus" readonly />
          </FormItem>
        </Col>
      </Row>
      <Row style="margin-top: 10px">
        <Col span="20">
          <FormItem label="转入班级" prop="classid">
            <Select v-model="logForm.classid" placeholder="选择转入班级" @on-change="checkClass">
              <Option v-for="item in allbankeData" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row v-if="newhavepaike">
        <Col span="20">
          <Tooltip content="从选择的排课开始（包含），添加之后排课" max-width="400" placement="top">
            <FormItem label="插入排课" prop="pkid">
              <Select v-model="logForm.pkid" placeholder="选择排课" style="width:300px">
                <Option
                  v-for="item in newpaikeDate"
                  :value="item.id"
                  :key="item.id"
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
  name: "alleditclass",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxiID: { type: String },
    campus: { type: String },
    campusID: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        classid: "",
        ids: "",
        pkid: "",
      },
      allbankeData: [], //校区查询获取到的校区数据
      logFormRule: {
        classid: [{ required: true, message: "请选择班级", trigger: "change" }],
        pkid: [{ required: true, message: "请选择排课", trigger: "change" }],
      },
      InCampusID: "",
      newpaikeDate: [],
      newhavepaike: false,
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
      this.$refs["logForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          api.post("xwcloud-stu/stu/stuClass/saveplChangeClass",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.closeModal(false);
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
    getallbankeData() {
      api.get("xwcloud-stu/stu/stuClass/getallbanke",{ campusID: this.InCampusID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allbankeData = res.obj;
        }
      });
    },

    checkClass() {
      api.get("xwcloud-stu/stu/stuClass/getPaikeByclassIDList",{ classID: this.logForm.classid }).then(
        (res) => {
          if (res.code == "Y" && res.success == true) {
            //说明是有排课，显示排课时间
            this.newpaikeDate = res.obj;
            this.newhavepaike = true;
          } else {
            this.newhavepaike = false;
          }
        }
      );
    },
  },
  watch: {
    value(val) {
      this.show = val;
      this.logForm.classid = "";
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.newhavepaike = false;
        this.newpaikeDate = [];
        this.$refs["logForm"].resetFields();
        this.InCampusID = this.campusID;
        this.logForm.ids = this.buxiID;
        this.getallbankeData();
        console.log(this.campus);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
