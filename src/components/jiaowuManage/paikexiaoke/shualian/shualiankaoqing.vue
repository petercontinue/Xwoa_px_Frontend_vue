<template>
  <Modal
    v-model="show"
    title="刷脸考勤"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="40"
  >
    <Form
      ref="imagesForm"
      :model="yangben"
      :rules="yangbenRule"
      :label-width="150"
      :label-colon="true"
    >
      <Row>
        <Button type="error" @click="close()">关闭摄像头</Button>
        <Button type="success" @click="playVideo()">开启摄像头</Button>
        <!-- <Button type="info" @click="tackPhoto()">拍照</Button>
        <Button type="success" @click="saveImages()">保存采集图片</Button> -->
      </Row>
      <FormItem>
        <video ref="refVideo" id="video" autoplay></video>
      </FormItem>
      <div>
        <span>{{ scanTip }}</span>
      </div>
      <div style="display: none">
        <img :src="imgUrl" alt="" />
        <canvas
          ref="refCanvas"
          :width="screenSize.width"
          :height="screenSize.height"
          :style="{ opacity: 0 }"
        ></canvas>
      </div>
    </Form>
  </Modal>
</template>
<script>
import "@/assets/faceshibie/tracking-min.js";
import "@/assets/faceshibie/face-min.js";
import oldaxios from "axios";
import { getToken } from "@/libs/util";
import config from "@/config";
import * as api from "@/api/api.js";

export default {
  name: "addxiaokeTouxiang",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      allstuData: [],
      yangben: {
        stuID: "",
      },
      yangbenRule: {
        stuID: [
          {
            required: true,
            message: "请选择学生",
            trigger: "change",
            type: "string",
          },
        ],
      },
      screenSize: { width: 320, height: 240 },
      context: null, // canvas上下文
      tracker: null,
      imgUrl: "",
      showcanves: false,
      actionUrl: "", //上传文件的请求路径
      profile: [], // 轮廓
      scanTip: "",
      tipFlag: false,
      flag: false,
    };
  },
  methods: {
    ok() {},
    closeModal(val) {
      this.close();
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    // 拍照
    tackPhoto() {
      this.context.drawImage(
        this.$refs.refVideo,
        0,
        0,
        this.screenSize.width,
        this.screenSize.height
      );
      // 保存为base64格式
      this.imgUrl = this.saveAsPNG(this.$refs.refCanvas);
      this.showcanves = true;
      /** 拿到base64格式图片之后就可以在this.compare方法中去调用后端接口比较了，也可以调用getBlobBydataURI方法转化成文件再去比较
       * 我们项目里有一个设置个人头像的地方，先保存一下用户的图片，然后去拿这个图片的地址和当前拍照图片给后端接口去比较。
       * */
      // this.compare(imgUrl)
      var blod = this.dataURItoBlob(this.imgUrl);
      let data = new FormData();
      data.append("file", blod);
      let config = {
        headers: {
          Authorization: "Bearer " + getToken(),
          "Content-Type": "multipart/form-data",
        },
      };
      oldaxios.post("http://43.228.77.84:8100/xwcloud-pkxk/paike/paikexiaoke/compareImgs", data, config).then((res) => {
          console.log(res);
      });
      //关闭摄相头
      //this.close()
    },
    playVideo() {
      this.getUserMedia(
        {
          video: {
            width: 320,
            height: 240,
            facingMode: "user",
          } /* 前置优先 */,
        },
        this.success,
        this.error
      );
    },
    // 人脸捕捉
    initTracker() {
      this.context = this.$refs.refCanvas.getContext("2d"); // 画布
      this.tracker = new tracking.ObjectTracker(["face"]); // tracker实例
      this.tracker.setStepSize(1.7); // 设置步长
      this.tracker.on("track", this.handleTracked); // 绑定监听方法
      try {
        tracking.track("#video", this.tracker); // 开始追踪
      } catch (e) {
        this.scanTip = "访问用户媒体失败，请重试";
        console.log("======3:" + this.scanTip);
      }
    },
    // 追踪事件
    handleTracked(e) {
      if (e.data.length === 0) {
        this.scanTip = "未检测到人脸";
      } else {
        if (!this.tipFlag) {
          this.recCount++;
        }
        // 1秒后拍照，仅拍一次
        if (!this.flag) {
          this.scanTip = "拍照中...";
          this.flag = true;
          this.removePhotoID = setTimeout(() => {
            this.tackPhoto();
            this.tipFlag = false;
            this.flag = false;
          }, 3000);
        }
        e.data.forEach(this.plot);
      }
    },
    // 绘制跟踪框
    plot({ x, y, width: w, height: h }) {
      // 创建框对象
      this.profile.push({ width: w, height: h, left: x, top: y });
    },
    // 访问用户媒体设备
    getUserMedia(constrains, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新标准API
        navigator.mediaDevices
          .getUserMedia(constrains)
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
      } else if (navigator.mozGetUserMedia) {
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(success).catch(error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
      } else {
        this.scanTip = "你的浏览器不支持访问用户媒体设备";
      }
    },
    success(stream) {
      this.streamIns = stream;
      // webkit内核浏览器
      this.URL = window.URL || window.webkitURL;
      if ("srcObject" in this.$refs.refVideo) {
        this.$refs.refVideo.srcObject = stream;
      } else {
        this.$refs.refVideo.src = this.URL.createObjectURL(stream);
      }
      this.$refs.refVideo.onloadedmetadata = (e) => {
        this.$refs.refVideo.play();
        this.initTracker();
      };
    },
    error(e) {
      this.$Message.error("请确保摄像头已连接");
      // this.scanTip = "访问用户媒体失败" + e.name + "," + e.message;
      // console.log("======2:" + this.scanTip);
    },
    // 保存为png,base64格式图片
    saveAsPNG(c) {
      return c.toDataURL("image/png", 0.3);
    },
    // 关闭并清理资源
    close() {
      this.imgUrl = "";
      this.tracker && this.tracker.removeListener("track", this.handleTracked);
      clearTimeout(this.removePhotoID);
      if (this.streamIns) {
        this.streamIns.enabled = false;
        this.streamIns.getTracks()[0].stop();
        this.streamIns.getVideoTracks()[0].stop();
      }
      this.streamIns = null;
    },
    dataURItoBlob(dataURI) {
      // base64 解码
      let byteString = window.atob(dataURI.split(",")[1]);
      let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      let T = mimeString.split("/")[1];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    saveImages() {
      this.$refs["imagesForm"].validate((valid) => {
        if (valid) {
          if (this.imgUrl == "") {
            this.$Message.error("请先拍照再保存！");
          } else {
            var blod = this.dataURItoBlob(this.imgUrl);
            let data = new FormData();
            data.append("file", blod);
            let config = {
              headers: {
                Authorization: "Bearer " + getToken(),
                "Content-Type": "multipart/form-data",
              },
            };
            oldaxios.post(this.actionUrl, data, config).then((res) => {
              api.get("xwcloud-pkxk/paike/paikexiaoke/SaveStuMubanImages",{
                StuID: this.yangben.stuID,
                imageUrl: res.data,
              }).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.yangben.stuID = "";
                  this.imgUrl = "";
                  this.$Message.success(res.msg);
                  this.$emit("handleSearch");
                } else {
                  this.$Message.error(res.msg);
                }
              });
            });
          }
        } else {
          this.$Message.error("请填写必填项");
        }
      });
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["imagesForm"].resetFields();
        this.imgUrl = "";
        api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList",{ menuID: "567" }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstuData = res.obj;
          } else {
            this.$Message.error("加载学生信息失败！");
          }
        });

        const baseUrl =
          process.env.NODE_ENV === "development"
            ? config.baseUrl.dev
            : config.baseUrl.pro;
        this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
