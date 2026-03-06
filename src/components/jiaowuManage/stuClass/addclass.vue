<template>
  <Modal v-model="show" title="建班" :mask-closable="false" width="40">
    <Form
      ref="addFrom"
      :model="addFrom"
      :rules="logFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <Row style="margin-top: 10px">
        <Col span="16">
          <FormItem label="校区">
            <Input v-model="lookcampusName" readonly />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="16">
          <FormItem label="班级编号">
            <Input v-model="addFrom.zidingyiClassID" placeholder="请输入班级编号..." />
          </FormItem>
        </Col>
        <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px;color: #2d8cf0;">
          选填
        </Col>
      </Row>
      <Row style="margin-top: 10px">
        <Col span="16">
          <FormItem label="班级名称" prop="className">
            <Input v-model="addFrom.className" placeholder="请输入班级名称..." />
          </FormItem>
        </Col>
      </Row>

      <Row style="margin-top: 10px">
        <Col span="16">
          <FormItem label="班级最大人数">
            <Input
              v-model="addFrom.maxStuNum"
              type="number"
              placeholder="班级最大人数，不输入则不限制"
            />
          </FormItem>
        </Col>
        <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px;color: #2d8cf0;">
          不填表示不限制
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
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "addclass",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    campusName: { type: String },
    campusID: { type: String },
    kecheng: { type: String },
  },
  data() {
    return {
      show: this.value,
      addFrom: {
        campusID: "",
        className: "",
        zidingyiClassID: "",
        maxStuNum: "",
      },
      lookcampusName: "",
      logFormRule: {
        className: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["addFrom"].validate((valid) => {
        console.log(valid);
        if (valid) {
          // if ((this.addFrom.maxStuNum = "")) {
          //   this.addFrom.maxStuNum = "-1";
          // }
          console.log(this.addFrom);
          api.post("xwcloud-stu/stu/stuClass/addClass",this.addFrom).then((res) => {
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
      this.$refs["addFrom"].resetFields();
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["addFrom"].resetFields();
        this.lookcampusName = this.campusName;
        this.addFrom.campusID = this.campusID;
        this.addFrom.className = this.kecheng;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
