<template>
  <div>
    <div class="demo-upload-list" v-for="item in uploadList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url" />
        <div class="demo-upload-list-cover">
          <Icon
            type="ios-eye-outline"
            @click.native="handleView(item.name)"
          ></Icon>
          <Icon
            type="ios-trash-outline"
            @click.native="handleRemove(item)"
          ></Icon>
        </div>
      </template>
      <template v-else>
        <Progress
          v-if="item.showProgress"
          :percent="item.percentage"
          hide-info
        ></Progress>
      </template>
    </div>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png']"
      :max-size="2048"
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
    <Modal title="View Image" v-model="visible">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { getToken } from "@/libs/util";
import config from '@/config';


export default {
  props: {
    goodsID: "",
  },
  data() {
    return {
      defaultList: [
        // {
        //   name:  "http://imgs.jxb666.com/087506d3-8db1-4e11-b2b8-66673b1a365b.jpg",
        //   url:
        //     "http://imgs.jxb666.com/087506d3-8db1-4e11-b2b8-66673b1a365b.jpg",
        // },
        // {
        //   name:  "http://imgs.jxb666.com/087506d3-8db1-4e11-b2b8-66673b1a365b.jpg",
        //   url:
        //    "http://imgs.jxb666.com/087506d3-8db1-4e11-b2b8-66673b1a365b.jpg",
        // },
      ],
      imgName: "",
      visible: false,
      uploadList: [],
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ...mapActions(["GetGoodsInfoDetail"]),
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = res;
      file.name = res;
      this.$emit("increment", JSON.stringify(this.uploadList));
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "格式错误",
        desc: "图片格式错误，只能选择.jpg或者.png格式的图片上传",
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "图片大小超过限制",
        desc: "上传图片太大，单个图片大小不能超过2M",
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多只能上传五张图片",
        });
      }
      return check;
    },
  },
  mounted() {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
    
    this.uploadList = this.$refs.upload.fileList;
    this.GetGoodsInfoDetail({ goodsID: this.goodsID }).then((response) => {
      if (response.code == "Y" && response.success == true) {
        if (response.obj.img1) {
          this.uploadList.push({ url: response.obj.img1, status: "finished" });
        }
        if (response.obj.img2) {
          this.uploadList.push({ url: response.obj.img2, status: "finished" });
        }
        if (response.obj.img3) {
          this.uploadList.push({ url: response.obj.img3, status: "finished" });
        }
        if (response.obj.img4) {
          this.uploadList.push({ url: response.obj.img4, status: "finished" });
        }
        if (response.obj.img5) {
          this.uploadList.push({ url: response.obj.img5, status: "finished" });
        }
      }
    });
  },
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
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
