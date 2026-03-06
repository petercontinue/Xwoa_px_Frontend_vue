<template>
  <div
    class="contentBGcolor"
    style="background-color: #6ac0bd;width：100%;height:100%;overflow: auto;"
  >
    <div class="titleDivbar">活动期内，学员可通过微传单直接进行线上报名</div>

    <!--活动设置-->
    <div class="divwaiold">
      <div class="divTitlewai">
        <div class="divImgTile">活动设置啦</div>
      </div>
      <div class="divItemTitle">
        <div class="divImgContent">活动主图</div>
        <div style="width: 100%; height: 250px; padding: 0 10% 0 10%">
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccesshd"
            :format="['jpg', 'jpeg', 'png']"
            :max-size="2048"
            type="drag"
            :action= actionUrl
              :headers="requestheader"
          >
            <img
              style="width: 100%; height: 250px; float: left"
              :src="saveData.huodongImage"
            />
          </Upload>
          <!-- <img style="width:100%;height:250px;float: left;" :src="saveData.huodongImage" />
                    <input type="file" accept="image/*" style="width:100%;height:250px;float: left; cursor:pointer;z-index: 2;opacity:0;margin:-250px 0 0 0" /> -->
        </div>
      </div>
      <div class="divItemTitle">
        <div class="divImgContent">活动标题</div>
        <div class="divItemContent">
          <Input placeholder="请输入活动标题" v-model="saveData.huodongTitle" />
        </div>
      </div>
      <hr class="hrCss" />
      <div class="divItemTitle">
        <div class="divImgContent">活动起止时间</div>
        <div class="divItemContent" style="display: flex">
          <DatePicker
            type="daterange"
            split-panels
            placeholder="选择日期"
            @on-change="changeHuodongDate"
          ></DatePicker>
        </div>
      </div>
    </div>

    <!--活动规则-->
    <div class="divwaiold">
      <div class="divTitlewai">
        <div class="divImgTile">活动规则</div>
      </div>
      <div class="divItemTitle">
        <div class="divKaiguanbtn">
          <div class="divKaiguanwai">
            <span style="float: left">是否限制报名人数</span>
            <i-switch
              size="default"
              style="float: right; text-align: center"
              v-model="mubanData.showxianzhiStu"
            >
              <span slot="true">on</span>
              <span slot="false">off</span>
            </i-switch>
          </div>
          <div class="divBottomtsstr">
            活动发布后，<span class="color-showred">不可修改</span>
          </div>
        </div>
        <div
          v-if="mubanData.showxianzhiStu"
          style="
            font-size: 16px;
            padding: 0 5% 0 5%;
            margin-bottom: 15px;
            height: 71px;
            line-height: 1.5;
          "
        >
          <div class="divKGshowstr">
            <span class="divKGshowstrnei-Left">限制报名人数</span>
            <InputNumber
              :max="100000"
              :min="1"
              v-model="saveData.maxStuNum"
            ></InputNumber>
            <span class="divKGshowstrnei-Right">个</span>
          </div>
          <div class="divBottomtsstr">
            活动发布后，报名人数只能<span class="color-showred">增加</span
            >，不能<span class="color-showred">减少</span>
          </div>
        </div>
      </div>
      <hr class="hrCss" />

      <div class="divItemTitle">
        <div class="divImgContent">活动说明</div>
        <div class="divItemContent">
          <edit @increment="changehuodongshuoming"></edit>
          <!-- <Input
            type="textarea"
            :rows="6"
            placeholder="活动说明"
            v-model="saveData.huodongShuoMing"
          /> -->
        </div>
      </div>
      <div class="divItemTitle">
        <div class="divImgContent">联系方式</div>
        <div class="divItemContent">
          <Input
            type="textarea"
            :rows="6"
            placeholder="联系方式"
            v-model="saveData.lianxifangshi"
          />
        </div>
      </div>
      <div class="divItemTitle">
        <div class="divImgContent">
          二维码图片<span style="color: #999"> （非必选）</span>
        </div>
        <div class="divItemContent">
          <div style="display: flex">
            <div
              style="
                float: left;
                width: 100px;
                height: 100px;
                text-align: center;
                margin-right: 10px;
                background-color: #f8f9fc;
              "
            >
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg', 'jpeg', 'png']"
                :max-size="2048"
                type="drag"
                :action= actionUrl
                  :headers="requestheader"
              >
                <div style="width: 100px; height: 100px; line-height: 58px">
                  <img
                    id="ewmImgShow"
                    style="width: 100px; height: 100px; margin-top: 0px"
                    :src="saveData.zixunEwm"
                  />
                </div>
              </Upload>
            </div>
            <div style="color: #999; height: 100px; line-height: 2">
              <div style="margin-top: 25px">建议上传老师二维码，</div>
              <div>方便家长咨询</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--机构介绍-->
    <div class="divwaiold">
      <div class="divTitlewai">
        <div class="divImgTile">机构介绍</div>
      </div>
      <div style="width: 90%; margin: 5%; display: flex">
        <div style="width: 100%">
          <div class="">
            <div style="font-size: 14px; text-align: center">机构名称</div>
            <div class="">
              <Input
                placeholder="请输入机构名称"
                v-model="saveData.jigouName"
              />
            </div>
          </div>
        </div>
      </div>
      <div style="width: 90%; margin: 5%; display: flex">
        <div style="width: 100%">
          <div class="">
            <div style="font-size: 14px; text-align: center">机构电话</div>
            <div class="">
              <Input placeholder="请输入机构电话" v-model="saveData.jigouTel" />
            </div>
            <div style="width: 100%; font-size: 12px; text-align: center">
              可快速拨打电话进行咨询
            </div>
          </div>
        </div>
      </div>
      <edit @increment="changejigouInfo"></edit>
    </div>
    <!--其他设置-->
    <div class="divwaiold">
      <div class="divTitlewai">
        <div class="divImgTile">其他设置</div>
      </div>
      <div class="divItemTitle">
        <div class="divImgContent">背景音乐</div>
        <div class="divItemContent">
          <Select v-model="saveData.musicID">
            <Option :value="item.id" :key="item.id" v-for="item in musicData">{{
              item.mbMusicName
            }}</Option>
          </Select>
        </div>
      </div>
      <hr class="hrCss" />
      <div class="divKaiguanbtn">
        <div class="divKaiguanwai">
          <span style="float: left">弹幕功能</span>
          <span style="float: right">
            <label class="toggle toggle-balanced" style="margin: 0">
              <Checkbox></Checkbox>
            </label>
          </span>
        </div>
        <div class="divBottomtsstr">实时展示学员参与情况，加强活动营销效果</div>
      </div>
      <hr class="hrCss" />
      <div class="divKaiguanbtn">
        <div class="divKaiguanwai">
          <span style="float: left">报名信息设置</span>
        </div>
        <div class="divBottomtsstr">
          <p>1、最多可设置<span class="color-showred">5</span>项</p>
          <p>
            2、勾选的字段为学员报名时<span class="color-showred">必填</span
            >的内容
          </p>
          <p>3、活动发布后，<span class="color-showred">不可再修改</span></p>
          <p>(温馨提示：填写项过多可能会影响学员报名)</p>
        </div>
        <div id="stuAttribute">
          <List>
            <ListItem style="border: none">
              <Checkbox :value="true" disabled>姓名</Checkbox>
            </ListItem>
            <ListItem style="border: none">
              <Checkbox :value="true" disabled>手机号</Checkbox>
            </ListItem>
            <ListItem style="border: none">
              <Checkbox v-model="saveData.haveStuSex">性别</Checkbox>
            </ListItem>
            <ListItem style="border: none">
              <Checkbox v-model="saveData.haveAge">年龄</Checkbox>
            </ListItem>
            <ListItem style="border: none">
              <Checkbox v-model="saveData.haveBirthday">出生年月</Checkbox>
            </ListItem>
            <ListItem style="border: none">
              <Checkbox v-model="saveData.haveSchool">在读学校</Checkbox>
            </ListItem>
            <ListItem style="border: none">
              <Checkbox v-model="saveData.haveGrade">年级</Checkbox>
            </ListItem>
            <ListItem style="border: none">
              <Checkbox v-model="saveData.haveYxkecheng">意向课程</Checkbox>
            </ListItem>
          </List>
        </div>
      </div>
      <hr style="width: 90%; border: dashed 0.5px #ccc" />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { getToken } from "@/libs/util";
import config from '@/config';
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";

export default {
  components: {
    edit,
  },
  props: {
    huodongID: {
      type: String,
      default: "",
    },
    mobanID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      mubanData: {
        data: [],
        showxianzhiStu: false,
      },
      saveData: {
        mobanID: this.mobanID,
        mbTypeID: "",
        zixunEwm: "",
        huodongTitle: "",
        huodongImage: "",
        jigouName: "",
        huodongEndDateTime: "",
        huodongStartDateTime: "",
        jigouTel: "",
        musicID: "",
        haveStuSex: false,
        haveAge: false,
        haveBirthday: false,
        haveSchool: false,
        haveGrade: false,
        haveYxkecheng: false,
        huodongShuoMing: "",
        lianxifangshi: "",
        maxStuNum: 0,
        jianjieNeirong: "",
      },
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      musicData: [],
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ...mapActions([
      "GetH5MobanData",
      "GetMobanInfoDetail",
      "GetJigoujianjieInfo",
      "getMobanMusicList",
    ]),
    loadMusic() {
      this.getMobanMusicList({}).then((response) => {
        console.log(response);
        if (response.code == "Y" && response.success == true) {
          this.musicData = response.obj;
        }
      });
    },
    handleSuccess(res, file) {
      this.$Message.success("上传成功！");
      this.saveData.zixunEwm = res;
    },
    handleSuccesshd(res, file) {
      this.$Message.success("活动主图上传成功");
      this.saveData.huodongImage = res;
    },
    changejigouInfo(data) {
      this.saveData.jianjieNeirong = data;
    },
    changehuodongshuoming(data) {
      this.saveData.huodongShuoMing = data;
    },
    changeHuodongDate(date) {
      this.saveData.huodongStartDateTime = date[0];
      this.saveData.huodongEndDateTime = date[1];
    },
  },
  mounted() {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro;
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
    
    this.loadMusic();
    if (this.huodongID != "0") {
      this.GetH5MobanData({ huodongID: this.huodongID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
        }
      });
    } else {
      this.GetMobanInfoDetail({ mobanID: this.mobanID }).then((response) => {
        if (response.code == "Y" && response.success == true) {
          console.log(response);
          this.mubanData.data = response.obj;
          this.saveData.huodongImage = this.mubanData.data.mbImgUrl;
          this.saveData.huodongTitle = this.mubanData.data.mbName;
          this.saveData.mbTypeID = this.mubanData.data.mbTypeID;
        }
      });
      this.GetJigoujianjieInfo({}).then((result) => {
        if (result.code == "Y" && result.success == true) {
          this.saveData.jigouName = result.obj[0].mbSchoolName;
          this.saveData.jigouTel = result.obj[0].mbschoolTel;
          this.saveData.lianxifangshi = result.obj[0].mbLianxifangshi;
          this.saveData.zixunEwm = result.obj[0].mbLianxifangshiUrl;
        }
      });
    }
  },
};
</script>
<style scoped>
@import url("../../../assets/icon_custom/iconfont.css");
@import url("../../../assets/icon-zhaoxuexiu/iconfont.css");

::-webkit-scrollbar {
  width: 3px;
  height: 1px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: none;
  background: #6ac0bd;
  -webkit-box-shadow: none;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
  border-radius: 10px;
  background: #06b0b9;
  -webkit-box-shadow: none;
}

.titleDivbar {
  min-height: 64px;
  line-height: 1.5;
  font-size: 16px;
  background: hsla(0, 0%, 100%, 0.6);
  color: #5c5757;
  padding: 20px 10% 20px 10%;
  margin-bottom: 48px;
}

.divwaiold {
  background-color: #fff;
  width: 90%;
  margin: 0 5% 30px 5%;
  border-radius: 5px;
  padding-bottom: 30px;
  margin-bottom: 72px;
}

.divImgTile {
  background: url(http://www.xw3q.com/allFile/h5Images/xheadimg/t1.png)
    no-repeat center;
  background-size: 90% 90%;
  color: #a45e00;
  height: 60px;
  text-align: center;
  line-height: 60px;
  margin-top: -30px;
  width: 100%;
}

.divImgContent {
  font-size: 14px;
  padding: 0 10% 0 10%;
  margin-bottom: 15px;
}

.divTitlewai {
  display: flex;
  width: 100%;
  font-size: 16px;
}

.divItemTitle {
  margin: 15px 0 15px 0;
}

.divItemContent {
  padding: 0 8% 0 10%;
}

.inputLandishuru {
  width: 100%;
  color: #666666;
  font-size: 12px;
  height: 38px;
  line-height: 1.5;
  background-color: #f8f9fc;
}

.hrCss {
  width: 90%;
  border: dashed 0.5px #ccc;
}

.divKaiguanbtn {
  font-size: 14px;
  padding: 0 10% 0 10%;
  margin-bottom: 15px;
  height: auto;
  line-height: 1.5;
}

.color-showred {
  color: #ff6152;
}

.divKaiguanwai {
  overflow: hidden;
  zoom: 1;
  line-height: 41px;
  margin-bottom: 10px;
}

.divBottomtsstr {
  color: #999;
  font-size: 12px;
}

.divKGshowstr {
  display: flex;
  line-height: 35px;
  margin-bottom: 10px;
}

.divKGshowstrnei-Left {
  float: left;
  min-width: 60%;
}

.divKGshowstrnei-Right {
  float: right;
  min-width: 10%;
}

.divKGthis {
  margin: -5px 5px;
  padding: 0;
}

.divUploadwai {
  margin-bottom: 10px;
}

.textarealandi {
  color: #666666;
  font-size: 12px;
  height: 125px;
  line-height: 1.5;
  background-color: #f8f9fc;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 15px;
}

.checkboxStr {
  font-size: 12px;
  line-height: 28px;
  margin-left: 5px;
}

.scroll {
  max-height: 265px;
}

.slide-in-right {
  -webkit-transform: translateX(-100%);
  transform: translateX(100%);
}

.slide-in-right.ng-enter,
.slide-in-right > .ng-enter {
  -webkit-transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
  transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
}

.slide-in-right.ng-enter-active,
.slide-in-right > .ng-enter-active {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.slide-in-right.ng-leave,
.slide-in-right > .ng-leave {
  -webkit-transition: all ease-in-out 250ms;
  transition: all ease-in-out 250ms;
}

.slide-in-left {
  -webkit-transform: translateX(-100%);
  transform: translateX(100%);
}

.slide-in-left.ng-enter,
.slide-in-left > .ng-enter {
  -webkit-transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
  transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;
}

.slide-in-left.ng-enter-active,
.slide-in-left > .ng-enter-active {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.slide-in-left.ng-leave,
.slide-in-left > .ng-leave {
  -webkit-transition: all ease-in-out 250ms;
  transition: all ease-in-out 250ms;
}
</style>