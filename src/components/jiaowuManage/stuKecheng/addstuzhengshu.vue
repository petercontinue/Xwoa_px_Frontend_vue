<template>
  <Modal
    v-model="show"
    title="发证书"
    @on-ok="ok"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem>
        <Card shadow>
          <Upload
            multiple
            type="drag"
            :action= actionUrl
            :headers="requestheader"
            :on-success="uploadSuccess"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖拽需要上传的文件到此处</p>
            </div>
          </Upload>
        </Card>
      </FormItem>
    </Form>
  </Modal>
</template>
<style>
.divShow {
  margin-top: 10px;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import config from '@/config';
import * as api from "@/api/api.js";


export default {
  name: "addstuzhengshu",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
    zSid: { type: String },
  },
  data() {
    return {
      show: this.value,
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      logFormRule: {},
      logForm: {
        fzSID: "",
        stuID: "",
        imgaddress: "",
      },
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ok() {
      api.post("xwcloud-stu/stu/buxikecheng/FZSave",this.logForm).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success("保存成功");
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
          this.closeModal(false);
        } else {
          this.$Message.error("保存失败");
          this.closeModal(false);
        }
      });
    },

    closeModal(val) {
      this.$emit("input", val);
    },
    uploadSuccess(res, file) {
      console.log(res);
      this.$Message.success("上传成功！");
      this.logForm.imgaddress = res;
    },
    uploadError(error) {
      this.$Message.error("文件上传失败");
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
      if (val) {
        this.logForm.fzSID = this.zSid;
        this.logForm.stuID = this.stuID;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
