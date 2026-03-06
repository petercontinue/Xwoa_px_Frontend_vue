<template>
  <div style="background: #fff">
    <div
      id="bgimg-div"
      style="
        background: url(../../allFile/h5Images/bk3-1.png) center no-repeat;
        background-size: cover;
        height: 750px;
      "
    >
      <div style="height: 90%; width: 380px; margin-left: 32.5%">
        <div
          style="
            height: 100%;
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
            padding-bottom: 80px;
            padding-top: 40px;
            background: #fff;
            border-radius: 40px;
            box-shadow: 0 2px 30px 0 rgba(170, 187, 219, 0.6);
            display: block;
          "
        >
          <div
            style="
              margin: -5% 0 0 50%;
              float: left;
              transform: translateX(-50%);
              width: 75px;
              height: 5px;
              background: linear-gradient(180deg, #f5f6f7, #e3e4e5);
              border-radius: 3px;
            "
          ></div>
          <div
            style="
              height: 35px;
              width: 100%;
              background: #000;
              line-height: 35px;
              text-align: center;
              color: #fff;
            "
          >
            {{ canshu.mbName }}
          </div>
          <div style="height: 98%">
            <preview-page
              :huodongID="canshu.huodongID"
              :mobanID="canshu.mobanID"
            ></preview-page>
            <div>
              <Button style="width: 100%" @click="edithuodong">编辑活动</Button>
            </div>
          </div>
          <div
            style="
              background: #ecedee;
              width: 50px;
              height: 50px;
              border-radius: 25px;
              margin-left: 43%;
            "
          ></div>
          <!--margin-top: 5%;-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import previewPage from "@/components/zhaoshengbaoming/weixinyingxiao/previewPage.vue";
export default {
  components: {
    previewPage,
  },
  data() {
    return {
      canshu: {
        huodongID: this.$route.query.huodongID,
        mobanID: this.$route.query.mobanID,
        mbName: this.$route.query.mbName,
      },
    };
  },
  methods: {
    edithuodong() {
      this.$router.push({
        path: "/h5creat",
        query: {
          huodongID: this.$route.query.huodongID,
          mobanID: this.$route.query.mobanID,
          mbName: this.$route.query.mbName,
        },
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
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
  /* background-image: url(../../allFile/h5Images/yulanzaImg/MGPX5skxHk.png); */
  background-size: cover;
  height: 35px;
  line-height: 35px;
  float: inherit;
  width: 80%;
  margin: 0 10% 0 10%;
  position: absolute;
  text-align: center;
  top: 30px;
  padding: 0 20% 0 20%;
}

.title-djs {
  color: #fff;
  float: left;
  height: 64px;
  line-height: 50px;
  text-align: center;
  width: 100%;
  font-size: 16px;
  /* background: url(../../images/h5Images/djsImg/Image1558520496132.png) no-repeat top center; */
  background-size: 90%;
  margin-top: -1rem;
  position: fixed;
}

.title-htext {
  color: #fff;
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
  /* background: url(../../allFile/h5Images/xheadimg/Image1562219370717.png) no-repeat center; */
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