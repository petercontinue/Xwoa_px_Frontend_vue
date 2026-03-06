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
            <test-edit
              ref="editData"
              :huodongID="canshu.huodongID"
              :mobanID="canshu.mobanID"
            ></test-edit>
            <div>
              <Button style="width: 50%" @click="jumptoyulan">预览活动</Button>
              <Button style="width: 50%; float: right" @click="saveHuodong"
                >保存活动</Button
              >
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
import testEdit from "@/components/zhaoshengbaoming/weixinyingxiao/testEdit.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    testEdit,
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
    saveHuodong() {
      if (this.$refs.editData.saveData.huodongEndDateTime == "") {
        this.$Message.error("请选择活动结束时间");
      } else {
        console.log(this.$refs.editData.saveData);
        api
          .post(
            "/xwcloud-wsc/zhaoxuexiu/SavezhaoxuexiuHuodongInfo",
            this.$refs.editData.saveData
          )
          .then((result) => {
            if (result.code == "Y" && result.success == true) {
              this.$Message.success(result.msg);
            }
          })
          .catch((err) => {
            this.$Message.error(result.msg);
          });
      }
    },
    jumptoyulan() {
      this.$router.push({
        path: "/zhaoxuexiuyulan",
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
