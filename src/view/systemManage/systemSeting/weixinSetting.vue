<template>
  <div>
    <Card title="微信配置" style="margin-top: 15px">
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >微信推送总开关：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch size="large">
            <span slot="open" value="true">开</span>
            <span slot="close" value="false">关</span>
          </i-switch>
          是指管理所有微信推送，当处于关闭状态时所有微信消息均不推送；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员生日自定义祝福语：
        </Col>
        <Col span="18" style="text-align: left">
          <Button
            type="primary"
            icon="md-settings"
            size="small"
            @click="openSetting('16')"
            >查看/设置</Button
          >
          是指学员生日微信推送的祝福语；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >营销活动新报名推送:
        </Col>
        <Col span="18" style="text-align: left">
          <Button
            type="primary"
            icon="md-settings"
            size="small"
            @click="openSetting('17')"
            >查看/设置</Button
          >
          微信上有新的充值、活动报名、活动下单、商城下单，推送给哪个员工；可以多选；
        </Col>
      </Row>

      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >小程序新微信动态推送:
        </Col>
        <Col span="18" style="text-align: left">
          <Button
            type="primary"
            icon="md-settings"
            size="small"
            @click="openSetting('112')"
            >查看/设置</Button
          >
          指如果小程序上有人发表了微信动态，推送给谁；可多选
        </Col>
      </Row>

      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >营销活动截止时间到期推送:
        </Col>
        <Col span="18" style="text-align: left">
          <Button
            type="primary"
            icon="md-settings"
            size="small"
            @click="openSetting('111')"
            >查看/设置</Button
          >
          是指营销活动截止到期了，提醒消息推送给谁；可多选
        </Col>
      </Row>

      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >小程序端机构简介:</Col
        >
        <Col span="18" style="text-align: left">
          <Button type="primary" icon="md-settings" size="small" @click="jigoujianjie()"
            >查看/设置</Button
          >是指微信小程序端首页机构简介点击之后显示的信息
        </Col>
      </Row>

      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >小程序端轮播图设置:</Col
        >
        <Col span="18" style="text-align: left">
          <Button type="primary" icon="md-settings" size="small" @click="lunbotuSetting()"
            >查看/设置</Button
          >是指微信小程序端首页显示的轮播图设置
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >微商城首页轮播图:</Col
        >
        <Col span="18" style="text-align: left">
          <Button
            type="primary"
            icon="md-settings"
            size="small"
            @click="sclunbotuSetting()"
            >查看/设置</Button
          >是指微信小程序端商城首页显示的轮播图设置
        </Col>
      </Row>
      <!-- <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >营销活动启用设置:</Col
        >
        <Col span="18" style="text-align: left">
          <Button type="primary" icon="md-settings" size="small" @click="shezhihuodong"
            >查看/设置</Button
          >配置小程序端是否展示活动信息
        </Col>
      </Row> -->
      <!-- <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px">推客等级设置:</Col>
        <Col span="18" style="text-align: left">
          <Button type="primary" icon="md-settings" size="small" @click="shezhifanyong"
            >查看/设置</Button
          >设置推客等级、反佣比例设置
        </Col>
      </Row> -->
    </Card>

    <Card title="微信消息开关(对学员/家长)" style="margin-top: 15px">
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >微信自定义群发通知：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="zidingyiqf"
            @on-change="changemyd(21, zidingyiqf)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指:给学员微信群发的开关是否开启；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员签到微信消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="qiandaoxiaoxi"
            @on-change="changemyd(1, qiandaoxiaoxi)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指:学员到校签到以后是否给学员家长推送孩子到校的微信消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px">学员签退消息： </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="qiantuixiaoxi"
            @on-change="changemyd(2, qiantuixiaoxi)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；学员离开学校的时候签退时给学员家长推送的微信消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px">学员消课消息： </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="kehaoxiaoxi"
            @on-change="changemyd(3, kehaoxiaoxi)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；学员消课以后给家长推送的消课的微信消息；如果处于低课时，消息内容中还会提醒家长续费；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >低剩余课时预警消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="dikeshiyujing"
            @on-change="changemyd(7, dikeshiyujing)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；学员的剩余课时小于系统设置的预警值的时候，学员消课时会在推送消息中添加提醒家长续费的信息内容；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >提醒学员第二天上课消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="shangketixing"
            @on-change="changemyd(5, shangketixing)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；如果第二天有排课，系统自动提醒学员第二天上课的消息；包括上课课程、班级、上课时间、上课教室等信息；上课当天提醒学员;
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员生日祝福消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch size="large" v-model="stubirth" @on-change="changemyd(8, stubirth)">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；学员生日的当天，系统自动以学校的名义给学员家长推送一条生日祝福消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员约课审批结果消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="yuekeshenpi"
            @on-change="changemyd(9, yuekeshenpi)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；学员在微信端操作约课以后，老师会进行审批，审批后的结果会微信通知学员/家长；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员请假审批结果消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="qingjiashenpi"
            @on-change="changemyd(10, qingjiashenpi)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；学员在微信端操作约课以后，老师会进行审批，审批后的结果会微信通知学员/家长；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >老师评价学生的消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="pingjiatuisong"
            @on-change="changemyd(23, pingjiatuisong)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；课后老师给学员的课后评价信息会以微信消息推送给学员家长；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员相册有新照片提醒：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="xiangcegengxin"
            @on-change="changemyd(19, xiangcegengxin)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指；系统电子相册中如果有学员的新照片上传的话，会以微信消息提醒学员家长；
        </Col>
      </Row>
    </Card>

    <Card title="微信消息开关(对老师)" style="margin-top: 15px">
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >员工生日祝福微信消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="ygshengri"
            @on-change="changemyd(14, ygshengri)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：员工生日祝福微信消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >课表更新微信消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="ygkebiaogengxin"
            @on-change="changemyd(12, ygkebiaogengxin)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：课表更新微信消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >第二天上课提醒微信消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="ygsktixing"
            @on-change="changemyd(13, ygsktixing)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：第二天上课提醒微信消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员约课申请微信消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="ygyuekeshenqing"
            @on-change="changemyd(15, ygyuekeshenqing)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：学员约课申请微信消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员请假申请微信消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="ygqingjiashenqing"
            @on-change="changemyd(16, ygqingjiashenqing)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：学员请假申请微信消息；
        </Col>
      </Row>

      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >学员作业上交消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="zuoyeShow"
            @on-change="changemyd(25, zuoyeShow)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：学员作业上交消息；
        </Col>
      </Row>
      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >作业上交截止时间已到消息：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="zuoyeTimeout"
            @on-change="changemyd(26, zuoyeTimeout)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：作业上交截止时间已到消息；
        </Col>
      </Row>

      <Row style="margin: 15px">
        <Col span="6" style="text-align: right; padding-right: 5px"
          >意向学员跟进微信提示：
        </Col>
        <Col span="18" style="text-align: left">
          <i-switch
            size="large"
            v-model="ygyxstugenjin"
            @on-change="changemyd(20, ygyxstugenjin)"
          >
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
          是指：意向学员跟进微信提示(设置了意向学员下次跟进时间以后，就会有这个微信提醒消息)；
        </Col>
      </Row>
    </Card>
    <editweixinsetting-form
      v-model="showEdit"
      :shezhiID="typeID"
    ></editweixinsetting-form>
    <addjigoujianjie v-model="showjigoujianjie"></addjigoujianjie>
    <sanjifanyong v-model="showfanyong" :shezhiID="typeID"></sanjifanyong>
    <AppletslunbotuSetting v-model="lbtShow"></AppletslunbotuSetting>
    <sclunboimgsetting v-model="sclbtShow"></sclunboimgsetting>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import editweixinsettingForm from "../../../components/systemSetting/weixinsetting/editweixinsettingForm";
import addjigoujianjie from "@/components/systemSetting/addjigoujianjie";
import sanjifanyong from "@/components/systemSetting/weixinsetting/sanjifanyong";
import AppletslunbotuSetting from "@/components/systemSetting/weixinsetting/AppletslunbotuSetting";
import sclunboimgsetting from "@/components/systemSetting/weixinsetting/sclunboimgsetting";

export default {
  components: {
    editweixinsettingForm,
    addjigoujianjie,
    sanjifanyong,
    AppletslunbotuSetting,
    sclunboimgsetting,
  },
  data() {
    return {
      showjigoujianjie: false,
      jzmyd: false,
      zidingyiqf: false,
      qiandaoxiaoxi: false,
      qiantuixiaoxi: false,
      kehaoxiaoxi: false,
      dikeshiyujing: false,
      shangketixing: false,
      stubirth: false,
      yuekeshenpi: false,
      qingjiashenpi: false,
      pingjiatuisong: false,
      xiangcegengxin: false,
      ygshengri: false,
      ygkebiaogengxin: false,
      ygsktixing: false,
      ygyuekeshenqing: false,
      ygqingjiashenqing: false,

      zuoyeShow: false,
      zuoyeTimeout: false,
      ygyxstugenjin: false,

      showEdit: false,
      typeID: "",
      showfanyong: false,
      lbtShow: false,
      sclbtShow: false,
    };
  },
  methods: {
    ...mapActions(["UpdateTuisongKaiGuan", "GetAlltsKaiguangValue"]),
    changemyd(Id, value) {
      this.UpdateTuisongKaiGuan({ value: value, Id: Id })
        .then((result) => {
          if (result.code == "Y" && result.success == true) {
            this.$Message.success(result.msg);
          } else {
            this.$Message.error(result.msg);
          }
        })
        .catch((err) => {});
    },
    openSetting(Id) {
      this.typeID = Id;
      this.showEdit = true;
    },
    //小程序机构简介
    jigoujianjie() {
      this.showjigoujianjie = true;
    },
    shezhihuodong() {
      this.$router.push({
        path: "/yingxiaohuodong",
        query: {},
      });
    },
    shezhifanyong() {
      // this.typeID = "110";
      // this.showfanyong = true;

      this.$router.push({
        path: "/tuikefangyonglevel",
        query: {},
      });
    },
    lunbotuSetting() {
      this.lbtShow = true;
    },
    sclunbotuSetting() {
      this.sclbtShow = true;
    },
  },
  mounted: function () {
    this.GetAlltsKaiguangValue({})
      .then((result) => {
        if (result.code == "Y" && result.success == true) {
          for (let item of result.obj) {
            if (item.tstypeID == 22) {
              this.jzmyd = item.value == "true" ? true : false;
            } else if (item.tstypeID == 21) {
              this.zidingyiqf = item.value == "true" ? true : false;
            } else if (item.tstypeID == 1) {
              this.qiandaoxiaoxi = item.value == "true" ? true : false;
            } else if (item.tstypeID == 2) {
              this.qiantuixiaoxi = item.value == "true" ? true : false;
            } else if (item.tstypeID == 3) {
              this.kehaoxiaoxi = item.value == "true" ? true : false;
            } else if (item.tstypeID == 7) {
              this.dikeshiyujing = item.value == "true" ? true : false;
            } else if (item.tstypeID == 5) {
              this.shangketixing = item.value == "true" ? true : false;
            } else if (item.tstypeID == 8) {
              this.stubirth = item.value == "true" ? true : false;
            } else if (item.tstypeID == 9) {
              this.yuekeshenpi = item.value == "true" ? true : false;
            } else if (item.tstypeID == 10) {
              this.qingjiashenpi = item.value == "true" ? true : false;
            } else if (item.tstypeID == 23) {
              this.pingjiatuisong = item.value == "true" ? true : false;
            } else if (item.tstypeID == 19) {
              this.xiangcegengxin = item.value == "true" ? true : false;
            } else if (item.tstypeID == 14) {
              this.ygshengri = item.value == "true" ? true : false;
            } else if (item.tstypeID == 12) {
              this.ygkebiaogengxin = item.value == "true" ? true : false;
            } else if (item.tstypeID == 13) {
              this.ygsktixing = item.value == "true" ? true : false;
            } else if (item.tstypeID == 15) {
              this.ygyuekeshenqing = item.value == "true" ? true : false;
            } else if (item.tstypeID == 16) {
              this.ygqingjiashenqing = item.value == "true" ? true : false;
            } else if (item.tstypeID == 18) {
              // this.ygpingjia = item.value == "true" ? true : false;
            } else if (item.tstypeID == 20) {
              this.ygyxstugenjin = item.value == "true" ? true : false;
            } else if (item.tstypeID == 25) {
              this.zuoyeShow = item.value == "true" ? true : false;
            } else if (item.tstypeID == 26) {
              this.zuoyeTimeout = item.value == "true" ? true : false;
            }
          }
          console.log(this.jzmyd);
        } else {
        }
      })
      .catch((err) => {});
  },
};
</script>
