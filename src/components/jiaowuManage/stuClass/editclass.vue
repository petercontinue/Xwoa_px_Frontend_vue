<template>
  <Modal v-model="show" title="转班" :mask-closable="false" width="30">
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="120"
      :label-colon="true"
    >
      <Row style="margin-top: 10px">
        <Col span="15">
          <FormItem label="校区">
            <Input v-model="campusName" readonly />
          </FormItem>
        </Col>
      </Row>
      <Row style="margin-top: 10px">
        <Col span="15">
          <FormItem label="课程">
            <Input v-model="kechengName" readonly />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="15">
          <FormItem label="原班级" prop="oldClassID">
            <Select
              v-model="logForm.oldClassID"
              placeholder="请选择班级"
              @on-change="oldClass"
            >
              <Option v-for="item in oldData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row v-if="oldclassPk">
        <Col span="20">
          <Tooltip
            content="从选择的排课（包含）开始退出之后所有排课"
            max-width="300"
            placement="top"
          >
            <FormItem label="退出排课" prop="oldpkid">
              <Select
                v-model="logForm.oldpkid"
                placeholder="选择排课"
                style="width: 300px"
              >
                <Option
                  v-for="item in oldpaikeDate"
                  :value="item.paikeid"
                  :key="item.paikeid"
                  >{{ item.haveClassDate }} {{ item.startLessonDateTime }}-{{
                    item.endLessonDateTime
                  }}</Option
                >
              </Select>
            </FormItem>
          </Tooltip>
        </Col>
      </Row>

      <Row>
        <Col span="15">
          <FormItem label="新班级" prop="newClassID">
            <Select
              v-model="logForm.newClassID"
              placeholder="请选择班级"
              @on-change="newClass"
            >
              <Option v-for="item in allDate" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row v-if="newclassPk">
        <Col span="20">
          <Tooltip
            content="从选择的排课开始（包含），添加之后排课"
            max-width="400"
            placement="top"
          >
            <FormItem label="插入排课" prop="pkid">
              <Select v-model="logForm.pkid" placeholder="选择排课" style="width: 300px">
                <Option v-for="item in newpaikeDate" :value="item.id" :key="item.id"
                  >{{ item.haveClassDate | formatDate }} {{ item.startLessonDateTime }}-{{
                    item.endLessonDateTime
                  }}</Option
                >
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
    campusID: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        buxiID: "",
        oldClassID: "",
        newClassID: "",
        pkid: "",
        oldpkid: "",
      },
      oldData: [], // saveChangeClass
      allDate: [],
      logFormRule: {
        oldClassID: [{ required: true, message: "请选择原班级", trigger: "change" }],
        newClassID: [{ required: true, message: "请选择转入班级", trigger: "change" }],
        pkid: [{ required: true, message: "请选择退出排课", trigger: "change" }],
        oldpkid: [{ required: true, message: "请选择排课", trigger: "change" }],
      },
      InCampusID: "",
      oldclassPk: false,
      newclassPk: false,
      oldpaikeDate: [],
      newpaikeDate: [],
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
        if (valid) {
          api.post("xwcloud-stu/stu/stuClass/saveChangeClass",this.logForm).then((res) => {
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

    getallbankeList() {
      api.get("xwcloud-stu/stu/stuClass/getallbanke",{ campusID: this.InCampusID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allDate = res.obj;
        }
      });
    },

    getOldClassList() {
      api.get("xwcloud-stu/stu/stuClass/getOldClass",{ buxiID: this.logForm.buxiID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.oldData = res.obj;
        }
      });
    },

    oldClass() {
      api.get("xwcloud-stu/stu/stuClass/getInPaikeByClassandBuxi",{
        classID: this.logForm.oldClassID,
        buxiID: this.logForm.buxiID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          //说明是有排课，显示排课时间
          this.oldpaikeDate = res.obj;
          this.oldclassPk = true;
        } else {
          this.oldclassPk = false;
        }
      });
    },
    newClass() {
      api.get("xwcloud-stu/stu/stuClass/getPaikeByclassIDList",{ classID: this.logForm.newClassID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          //说明是有排课，显示排课时间

          this.newpaikeDate = res.obj;
          if (this.newpaikeDate.length == 0) {
            this.newclassPk = false;
          } else {
            this.newclassPk = true;
          }
        } else {
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["logForm"].resetFields();
        this.InCampusID = this.campusID;
        this.logForm.buxiID = this.buxiID;
        this.getOldClassList();
        this.getallbankeList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
