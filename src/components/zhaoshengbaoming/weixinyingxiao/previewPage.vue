<template>
  <div
    class="contentBGcolor"
    style="background-color: #6ac0bd;width：100%;height:100%;overflow: auto;"
  >
    <div>
      <img
        id="rotateImg"
        src="http://www.xw3q.com/allFile/h5Images/default/Image1552459584376.png"
        style="
          width: 48px;
          height: 48px;
          position: absolute;
          top: 20%;
          z-index: 10000000;
        "
      />
    </div>
    <div class="headbardiv">
      <span style="float: left">
        <span style="color: #fef139">10</span>
        <span style="color: #fff">人查看</span>
      </span>
      <span style="float: right">
        <span style="color: #fef139">5</span>
        <span style="color: #fff">人报名</span>
      </span>
    </div>
    <!--顶图-->
    <div class="container">
      <div class="headImgDiv">
        <img class="headImgSrcimg" :src="zhaoxuexiuData.huodongImage" />
      </div>
    </div>
    <div>
      <div class="title-djs">
        <!--活动结束倒计时-->
        结束倒计时29天21小时45分20秒
      </div>
      <div class="title-htext">{{ zhaoxuexiuData.huodongTitle }}</div>
    </div>
    <!--活动说明-->
    <div class="divWaib">
      <div class="divtitleimgwaib">
        <div class="divtitleimg">活动说明</div>
      </div>
      <div
        style="
          background-color: #fff3ad;
          border-radius: 5px;
          border: none;
          width: 90%;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 15px;
          text-align: center;
          overflow: hidden;
          zoom: 1;
          padding: 30px 0 30px;
        "
      >
        <div style="width: 50%; float: left; font-size: 16px">
          <span style="color: #000">本期名额</span>
          <span style="color: red">20</span>
        </div>
        <div style="width: 50%; float: right; font-size: 16px">
          <span style="color: #000">剩余名额</span>
          <span style="color: red">10</span>
        </div>
      </div>
      <div class="divcontent" v-html="zhaoxuexiuData.huodongShuoMing"></div>
    </div>
    <!--机构介绍-->
    <div class="divWaib">
      <div class="divtitleimgwaib">
        <div class="divtitleimg">机构介绍</div>
      </div>
      <div class="divcontent" id="jgjsContentDiv"></div>
      <div style="width: 100%; float: left; font-size: 12px">
        <hr class="hrCss" style="border: 1px dashed #ccc" />
      </div>
      <div
        style="
          width: 90%;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 15px;
          font-size: 16px;
          line-height: 1.5;
        "
      >
        机构名称：{{ zhaoxuexiuData.jigouName }}
      </div>
      <div
        style="
          width: 90%;
          margin-left: 5%;
          margin-right: 5%;
          margin-top: 15px;
          font-size: 16px;
          line-height: 1.5;
        "
      >
        机构电话：{{ zhaoxuexiuData.jigouTel }}
      </div>
    </div>
    <!--联系方式-->
    <div class="divWaib">
      <div class="divtitleimgwaib">
        <div class="divtitleimg">联系方式</div>
      </div>
      <pre><div class="divcontent">{{zhaoxuexiuData.lianxifangshi}}</div></pre>
      <div class="divcontent">
        <img :src="zhaoxuexiuData.zixunEwm" style="width: 100%" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
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
      zhaoxuexiuData: {
        mobanID: this.mobanID,
        zixunEwm: "",
        huodongTitle: "",
        huodongImage: "",
        jigouName: "",
        huodongEndDateTime: "",
        jigouTel: "",
        musicID: "",
        huodongShuoMing: "",
        lianxifangshi: "",
        maxStuNum: 0,
        jianjieNeirong: "",
      },
    };
  },
  methods: {
    ...mapActions([
      "GetH5MobanData",
      "GetMobanInfoDetail",
      "GetJigoujianjieInfo",
    ]),
  },
  mounted() {
    if (this.huodongID != "0") {
      this.GetH5MobanData({ huodongID: this.huodongID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
        }
      });
    } else {
      this.GetMobanInfoDetail({ mobanID: this.mobanID }).then((response) => {
        if (response.code == "Y" && response.success == true) {
          console.log(response);
          this.zhaoxuexiuData.huodongTitle = response.obj.mbName;
          this.zhaoxuexiuData.huodongImage = response.obj.mbImgUrl;
          this.zhaoxuexiuData.huodongShuoMing =
            "今年高考我校再创辉煌，截止目前，普通类第一段纯文化上线人数已达20人，其中王晓明以694分名列全市第一。\n感谢各级领导和社会各界人士对我校的关心，支持和厚爱。";
        }
      });
      this.GetJigoujianjieInfo({}).then((result) => {
        if (result.code == "Y" && result.success == true) {
          console.log(result);
          this.zhaoxuexiuData.jigouName = result.obj[0].mbSchoolName;
          this.zhaoxuexiuData.jigouTel = result.obj[0].mbschoolTel;
          this.zhaoxuexiuData.lianxifangshi = result.obj[0].mbLianxifangshi;
          this.zhaoxuexiuData.zixunEwm = result.obj[0].mbLianxifangshiUrl;
        }
      });
    }
  },
};
</script>
<style scoped>
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
.container {
  width: 100%;
  height: auto;
  margin: 0;
}

.headImgDiv {
  width: 100%;
  height: 330px;
}

.headImgDiv img {
  width: 100%;
  height: 330px;
}

.headbardiv {
  background-image: url(http://www.xw3q.com/allFile/h5Images/yulanzaImg/MGPX5skxHk.png);
  background-size: cover;
  height: 35px;
  line-height: 35px;
  float: inherit;
  width: 90%;
  margin: 0 10% 0 10%;
  /* position: absolute; */
  text-align: center;
  top: 30px;
  padding: 0 20% 0 20%;
  text-align: center;
}

.title-djs {
  color: #fff;
  float: left;
  height: 64px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  background: url(http://www.xw3q.com/images/h5Images/djsImg/Image1558520496132.png)
    no-repeat top center;
  background-size: 90%;
  margin-top: -1rem;
  margin-left: 45px;
}

.title-htext {
  color: #be2d0d;
  font-weight: 550;
  width: 100%;
  padding: 48px;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
}

.divWaib {
  background-color: #fff;
  width: 90%;
  margin: 0 5% 30px 5%;
  border-radius: 5px;
  padding-bottom: 30px;
  margin-bottom: 72px;
}

.divtitleimgwaib {
  display: flex;
  width: 100%;
  font-size: 20px;
}

.divtitleimg {
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

.divcontent {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 15px;
  font-size: 16px;
  line-height: 1.5;
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