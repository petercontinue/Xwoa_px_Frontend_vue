<template>
  <Modal
    v-model="show"
    title="修改日志信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="80"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="日志内容：" prop="logContent">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="logForm.logContent"
          placeholder="请输入日志内容"
        />
      </FormItem>

      <FormItem label="日志图片">
        <div class="demo-upload-list" v-for="(item, index) in uploadList">
          <template>
            <img :src="item" />
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg', 'jpeg', 'png']"
          :max-size="4096"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          :action="actionUrl"
          :headers="requestheader"
          style="display: inline-block; width: 58px"
        >
          <div style="width: 58px; height: 58px; line-height: 58px">
            <Icon type="ios-camera" size="20"></Icon>
          </div>
        </Upload>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import config from "@/config";
import uploadimgForm from "../../components/common-buttons/uploadimgForm";
import * as api from "@/api/api.js";

export default {
  name: "updatedailywork",
  components: {
    uploadimgForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdataID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      logForm: {
        logContent: "",
        id: "",
        staffID: "",
        LogDate: "",
        ImgsUrl: "",
      },
      imgurl: "",
      visible: false,
      uploadList: [],
      logFormRule: {
        logContent: [{ required: true, message: "请输入日志内容", trigger: "blur" }],
      },
      actionUrl: "", //上传文件的请求路径
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
    };
  },
  methods: {

    handleView(url) {
      this.imgurl = url;
      this.visible = true;
    },
    handleRemove(index) {
      this.uploadList.splice(index, 1);
    },
    handleSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.uploadList.push(res);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传失败",
        desc: file.name + " 不正确，请选择jpg或png。",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: file.name + " 太大，不超过4M。",
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多可以上传五张图片。",
        });
      }
      return check;
    },

    ok() {
      this.logForm.ImgsUrl = "";
      this.uploadList.forEach((item) => {
        this.logForm.ImgsUrl += item + ",";
      });
      console.log(this.logForm);
      this.$refs["logForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-sys/sys/StaffManagement/UpdateWorkdayRecord",{
            id: this.logForm.id,
            staffID: this.logForm.staffID,
            LogDate: this.logForm.LogDate,
            LogContent: this.logForm.logContent,
            ImgsUrl: this.logForm.ImgsUrl,
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
          this.$Message.error("表单验证不通过");
        }
        setTimeout(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 1000);
      });
    },
    closeModal(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    const baseUrl =
      process.env.NODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro;
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
        this.$refs["logForm"].resetFields();
        window.console.log(this.editdataID);
        api.get("xwcloud-sys/sys/StaffManagement/GetdailyworkInfobyId",{ Id: this.editdataID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.logForm = res.obj;
          } else {
            this.$Message.error(res.msg);
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
