<template>
  <Modal
    v-model="show"
    title="参赛学员信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="55"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="学生姓名" prop="stuname">
        <Input
          type="text"
          v-model="shezhiForm.stuname"
          placeholder="请输入学生姓名"
        />
      </FormItem>
      <FormItem label="编号（可自定义）" prop="bianhao">
        <Input-number
          :max="10000000000"
          :min="1"
          :step="1"
          v-model="shezhiForm.bianhao"
          placeholder="请输入编号"
          style="width: 100%"
        ></Input-number>
      </FormItem>
      <FormItem label="初始票数" prop="piaoshu">
        <InputNumber
          :max="1000000000"
          :min="0"
          :step="1"
          v-model="shezhiForm.piaoshu"
          placeholder="请输入初始票数"
          style="width: 100%"
        ></InputNumber>
      </FormItem>
      <FormItem label="学员简介" prop="introduction">
        <Input
          type="textarea"
          :maxlength="50"
          v-model="shezhiForm.introduction"
          placeholder="请输入学员简介"
        />
      </FormItem>
      <FormItem label="参赛学员照片" prop="logo">
        <Upload
          type="drag"
          :action= actionUrl
          :headers="requestheader"
          :on-success="handleSuccess"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>图片拖拽到此处或点击上传</p>
          </div>
        </Upload>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { getToken } from "@/libs/util";
import config from '@/config';
import * as api from "@/api/api.js";

export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        stuname: "",
        introduction: "",
        piaoshu: 0,
        bianhao: 0,
        logo: "",
        toupiaohuodongid: this.$route.query.huodongID,
      },
      shezhiFormRule: {
        stuname: [
          {
            required: true,
            message: "请输入学员姓名",
            trigger: "change",
            type: "string",
          },
        ],
        bianhao: [
          {
            required: true,
            message: "请输入参赛学员编号",
            trigger: "change",
            type: "number",
          },
        ],
        piaoshu: [
          {
            required: true,
            message: "请输入初始票数",
            trigger: "change",
            type: "number",
          },
        ],
        introduction: [
          {
            required: true,
            message: "请输入学员简介",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-wsc/wsc/whdToupiao/addWhdToupiaoCansaiStu",this.shezhiForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
              this.loading = false;
              setTimeout(() => {
                this.loading = true;
              }, 0);
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
    handleSuccess(res, file) {
      this.shezhiForm.logo = res;
    },
  },
  mounted() {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shezhiForm"].resetFields();
        if (this.editData != "") {
          this.shezhiForm = JSON.parse(this.editData);
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
