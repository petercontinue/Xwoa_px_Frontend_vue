<template>
  <Modal v-model="show" title="老师课后点评" :mask-closable="false" width="50">
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="200"
      :label-colon="true"
    >
      <FormItem label="老师" prop="teacherID">
        <Select v-model="shezhiForm.teacherID" placeholder="请选择老师">
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>

      <div v-for="(item, index) in ratelist" :key="index">
        <FormItem :label="item.pfName">
          <Rate v-model="item.pvalue" />
        </FormItem>
      </div>

      <FormItem label="评价图片">
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

      <FormItem label="评价音频">
        <div v-for="(item, index) in uploadMP3List">
          <template>
            <audio :src="item" controls="controls"></audio>
            <Icon
              type="ios-trash-outline"
              size="30"
              @click.native="mp3handleRemove(index)"
            ></Icon>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="mp3handleSuccess"
          :format="['mp3']"
          :max-size="20480"
          :on-format-error="mp3handleFormatError"
          :on-exceeded-size="mp3handleMaxSize"
          :before-upload="mp3handleBeforeUpload"
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

      <FormItem label="评价视频">
        <div v-if="havevedioShow">
          <template>
            <div class="demo">
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              >
              </video-player>
            </div>
            <Icon
              type="ios-trash-outline"
              size="30"
              @click.native="mp4handleRemove()"
            ></Icon>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :on-success="mp4handleSuccess"
          :format="['mp4']"
          :max-size="409600"
          :on-format-error="mp4handleFormatError"
          :on-exceeded-size="mp4handleMaxSize"
          :before-upload="mp4handleBeforeUpload"
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

      <FormItem label="学员总评" prop="sturateshuoming">
        <Input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="shezhiForm.sturateshuoming"
          placeholder="请输入学员总评"
          style="width: 100%"
        />
      </FormItem>
    </Form>

    <Modal title="详情" v-model="visible">
      <img :src="imgurl" v-if="visible" style="width: 100%" />
    </Modal>

    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import config from "@/config";
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import * as api from "@/api/api.js";

export default {
  name: "addteaEvaluation",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    value1: 0,
    editdata: { type: String },
  },
  components: {
    videoPlayer,
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "", // url地址
          },
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      },
      havevedioShow: false,
      show: this.value,
      ratelist: [],
      shezhiForm: {
        pkid: "",
        stuID: "",
        imgurl: "",
        mp3url: "",
        videourl: "",
        pfvalue: "",
        sturateshuoming: "",
        teacherID: "",
      },
      allstaffData: [],
      shezhiFormRule: {
        sturateshuoming: [
          {
            required: true,
            message: "请输入学员总评",
            trigger: "blur",
            type: "string",
          },
        ],
        teacherID: [
          {
            required: true,
            message: "请选择上课老师",
            trigger: "change",
          },
        ],
      },
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      imgurl: "",
      visible: false,
      uploadList: [],
      uploadMP3List: [],
      uploadMP4List: [],
      actionUrl: "", //上传文件的请求路径
    };
  },
  methods: {
    getAllRateList(type) {
      if (type == 1) {
        api.get("xwcloud-sys/sys/SystemSetting/getTeaRateitemList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.ratelist = res.obj;
            this.ratelist.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "pvalue", 0);
            });
          }
        });
      } else {
        console.log(JSON.parse(this.editdata).pjID);
        api.get("xwcloud-homeschool/homeschool/pxevaluationtable/gethavepjrate",{ pjID: JSON.parse(this.editdata).pjID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.ratelist = res.obj;
          }
        });
      }

      console.log(this.ratelist);
    },

    ok() {
      this.shezhiForm.pfvalue = JSON.stringify(this.ratelist);

      let value = "";
      this.uploadList.forEach((item) => {
        value += item + ",";
      });
      this.shezhiForm.imgurl = value;

      let mp3value = "";
      this.uploadMP3List.forEach((item) => {
        mp3value += item + ",";
      });
      this.shezhiForm.mp3url = mp3value;

      console.log(this.shezhiForm);

      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-homeschool/homeschool/pxevaluationtable/addFeedback",this.shezhiForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.shezhiForm.id = "";
              this.shezhiForm.pfvalue = "";
              this.shezhiForm.ratritem = "";
              this.closeModal(false);
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完成必填项！");
        }
      });
    },

    //--------------------------------------------图片上传------------------------------------------------

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

    //--------------------------------------------音频上传------------------------------------------------

    mp3handleRemove(index) {
      this.uploadMP3List.splice(index, 1);
    },
    mp3handleSuccess(res, file) {
      console.log(res);
      console.log(file);
      this.uploadMP3List.push(res);
    },
    mp3handleFormatError(file) {
      this.$Notice.warning({
        title: "上传失败",
        desc: file.name + " 格式不正确，请选择MP3",
      });
    },
    mp3handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: file.name + " 太大，不超过10M。",
      });
    },
    mp3handleBeforeUpload() {
      const check = this.uploadMP3List.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: "最多可以上传1个视频文件。",
        });
      }
      return check;
    },

    //--------------------------------------------视频上传------------------------------------------------

    mp4handleRemove() {
      this.uploadMP4List = [];
      this.playerOptions.sources[0].src = "";
      this.havevedioShow = false;
    },
    mp4handleSuccess(res, file) {
      this.shezhiForm.videourl = "";
      console.log(res);
      console.log(file);
      this.havevedioShow = true;
      this.uploadMP4List.push(res);
      this.playerOptions.sources[0].src = res;
      this.shezhiForm.videourl = res;
    },
    mp4handleFormatError(file) {
      this.$Notice.warning({
        title: "上传失败",
        desc: file.name + " 格式不正确，请选择MP4",
      });
    },
    mp4handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: file.name + " 太大，不超过10M。",
      });
    },
    mp4handleBeforeUpload() {
      const check = this.uploadMP4List.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "最多可以上传一个视频文件。",
        });
      }
      return check;
    },

    //------------------------------------------------

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
        this.shezhiForm.pkid = "";
        this.shezhiForm.pfvalue = "";
        this.shezhiForm.sturateshuoming = "";
        this.shezhiForm.stuID = "";
        this.shezhiForm.imgurl = "";
        this.shezhiForm.mp3url = "";
        this.shezhiForm.videourl = "";
        this.shezhiForm.teacherID = "";

        this.imgurl = "";
        this.visible = false;
        this.uploadList = [];
        this.uploadMP3List = [];
        this.uploadMP4List = [];
        this.havevedioShow = false;

        if (this.editdata != "") {
          let getdata = JSON.parse(this.editdata);
          console.log(getdata);
          this.shezhiForm.pkid = getdata.pkid;
          this.shezhiForm.stuID = getdata.stuID;
          this.shezhiForm.sturateshuoming = getdata.note;

          if (getdata.pjID) {
            this.getAllRateList(2);
          } else {
            this.getAllRateList(1);
          }

          if (getdata.pjimages) {
            if (
              getdata.pjimages.substring(
                getdata.pjimages.length - 1,
                getdata.pjimages.length
              ) == ","
            ) {
              this.uploadList = getdata.pjimages
                .substring(0, getdata.pjimages.length - 1)
                .split(",");
            }
          }

          if (getdata.pjmp3Url && getdata.pjmp3Url != "") {
            if (
              getdata.pjmp3Url.substring(
                getdata.pjmp3Url.length - 1,
                getdata.pjmp3Url.length
              ) == ","
            ) {
              this.uploadMP3List = getdata.pjmp3Url
                .substring(0, getdata.pjmp3Url.length - 1)
                .split(",");
            }
          }

          if (getdata.pjvideoUrl) {
            this.playerOptions.sources[0].src = getdata.pjvideoUrl;
            this.uploadMP4List.push(getdata.pjvideoUrl);
            this.havevedioShow = true;
          }
          if (getdata.pjteacherid) {
            this.shezhiForm.teacherID = getdata.pjteacherid;
          }
          api.get("xwcloud-homeschool/homeschool/public/getStaffList",{
            classID: getdata.classID,
            campusID: getdata.xkcampusID, //campusID 是学员的校区  xkcampusID 是消课时存的校区
            shangkesjd:
              toolbox.dateFtt(getdata.haveClassDate, "yyyy-MM-dd") +
              " " +
              getdata.startLessonDateTime.substring(0, 5) +
              "~" +
              getdata.endLessonDateTime.substring(0, 5),
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              // 获取老师列表
              this.allstaffData = res.obj;
            }
          });
        }
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
