<template>
  <Modal v-model="show" title="跨校区插班" :mask-closable="false" width="50">
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="230"
      :label-colon="true"
    >
      <Row class="F-r">
        <Col span="20">
          <FormItem label="选择跨校区上课学员" prop="stuid">
            <Select v-model="logForm.stuid" placeholder="请选择学员" @on-change="getbuxike">
              <Option v-for="item in stuData" :value="item.id" :key="item.id">
                {{
                item.name
                }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row class="F-r">
        <Col span="20">
          <FormItem label="选择要跨校区上课的课程" prop="buxiid">
            <Select v-model="logForm.buxiid" placeholder="请选择课程" @on-change="getcam">
              <Option v-for="item in bxkcDate" :value="item.id" :key="item.id">
                {{
                item.name
                }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row class="F-r">
        <Col span="20">
          <FormItem label="选择校区" prop="campusid">
            <Select v-model="logForm.campusid" placeholder="请选择校区" @on-change="gettoclass">
              <Option v-for="item in camData" :value="item.id" :key="item.id">
                {{
                item.name
                }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row class="F-r" v-if="classShow">
        <Col span="20">
          <FormItem label="跨校区后插入的班级" prop="classid">
            <Select v-model="logForm.classid" placeholder="请选择班级">
              <Option v-for="item in classData" :value="item.id" :key="item.id">
                {{
                item.name
                }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row class="F-r">
        <Col span="10" offset="8">
          <Checkbox v-model="logForm.cbckb">若插入的班级已有排课，同时加入现有排课中</Checkbox>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit()">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.F-r {
  margin-top: 10px;
}
</style>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "kxqupclass",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        stuid: null,
        buxiid: null,
        campusid: null,
        cbckb: true,
        classid: null,
      },
      stuData: [], // saveChangeClass
      bxkcDate: [],
      camData: [],
      classData: [],
      kcStyle: "",
      logFormRule: {
        stuid: [{ required: true, message: "请选择学员", trigger: "change" }],
        buxiid: [{ required: true, message: "请选择课程", trigger: "change" }],
        campusid: [
          { required: true, message: "请选择校区", trigger: "change" },
        ],
        classid: [
          { required: true, message: "请选择插入的班级", trigger: "change" },
        ],
      },
      classShow: true,
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["logForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          api.post("xwcloud-stu/stu/stuClass/savekxqClass",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.closeModal(false);
            } else {
              this.$Message.error(res.msg);
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

    GetkxqstuList() {
      api.get("xwcloud-stu/stu/stuClass/Getkxqstu",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stuData = res.obj;
        }
      });
    },

    getbuxike() {
      this.GetkxqbxkechengList();
    },

    GetkxqbxkechengList() {
      api.get("xwcloud-stu/stu/stuClass/Getkxqbxkecheng",{ stuID: this.logForm.stuid }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.bxkcDate = res.obj;
        }
      });
    },

    getcam() {
      api.get("xwcloud-stu/stu/stuClass/getbuxistyle",{ buxiID: this.logForm.buxiid }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.kcStyle = res.obj;
          console.log(res);
        }
      });

      if (this.kcStyle == "一对一") {
        this.classShow = false;
      }
      this.GetKxqCampusList();
    },

    GetKxqCampusList() {
      api.get("xwcloud-stu/stu/stuClass/GetKxqCampus",{ buxiID: this.logForm.buxiid }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.camData = res.obj;
        }
      });
    },
    gettoclass() {
      if (this.classShow) {
        this.getkxqclassList();
      }
    },
    getkxqclassList() {
      api.get("xwcloud-stu/stu/stuClass/getkxqclass",{ campusID: this.logForm.campusid }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.classData = res.obj;
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
        this.GetkxqstuList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
