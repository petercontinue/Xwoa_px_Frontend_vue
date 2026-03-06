<template>
  <Modal v-model="show" title="小程序端首页轮播图设置" :mask-closable="false" width="60">
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
      :action= actionUrl
      :headers="requestheader"
      style="display: inline-block; width: 58px"
    >
      <div style="width: 58px; height: 58px; line-height: 58px">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>

    <div slot="footer">
      <Button type="primary" @click="save">保存</Button>
      <Button style="margin-left: 8px" @click="closeModal(false)">取消</Button>
    </div>

    <Modal title="详情" v-model="visible">
      <img :src="imgurl" v-if="visible" style="width: 100%" />
    </Modal>
  </Modal>
</template>


<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import config from '@/config';
import * as api from "@/api/api.js";

export default {
  name: "AppletslunbotuSetting",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      logForm: {},
      ruleValidate: {},
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },

      imgurl: "",
      visible: false,
      uploadList: [],
      actionUrl: '',     //上传文件的请求路径
    };
  },

  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    save() {
      let value = "";

      this.uploadList.forEach((item) => {
        value += item + ",";
      });
      api.post("/xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",{
        id: 113,
        value: value,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    handleView(url) {
      this.imgurl = url;
      this.visible = true;
    },
    handleRemove(index) {
      this.uploadList.splice(index, 1);
    },
    handleSuccess(res, file) {
      //   console.log(res);
      //   console.log(file);
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
        api.get("/xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: 113 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res);
            if (
              res.obj.modifyValue.substring(
                res.obj.modifyValue.length - 1,
                res.obj.modifyValue.length
              ) == ","
            ) {
              this.uploadList = res.obj.modifyValue
                .substring(0, res.obj.modifyValue.length - 1)
                .split(",");
            } else {
              this.uploadList = res.obj.modifyValue.split(",");
            }
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

<style>
.demo-upload-list {
  display: inline-block;
  width: 200px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>