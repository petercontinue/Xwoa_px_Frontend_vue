<template>
  <div>
    <div>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1.系统搭建的第一步就是完成本页面的各个设置项，建议从上至下顺序设置，必做步骤，特别重要；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2.注意：操作【课程设置】以前，请确认已经完成了【培训方式】、【课程时长】的设置；</span
          >
        </Col>
      </Alert>
    </div>
    <!-- <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >系统显示的机构名称：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" >查看/设置</Button>
        是指在系统里面显示的学校名称，它会显示在登录页的标题位置，系统主页面的左上角，以及微信消息最后显示（机构名称+校区名称）的机构名称
      </Col>
    </Row>-->
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >校区设置：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotocampusshezhi"
          >查看/设置</Button
        >是指校区的名称修改；校区公众号设置、商城设置、查询校区的软件服务到期时间；
      </Col>
    </Row>

    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >机构岗位与权限管理：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="jigouquanxian()"
          >查看/设置</Button
        >是指机构有哪些岗位；添加或设置员工的时候会要用到岗位；以及岗位的权限分配；
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >年级/年龄段：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="nianjinianlinduan()"
          >查看/设置</Button
        >是指学员的年级或年龄段有哪些
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >培训方式：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotobuxistyle()"
          >查看/设置</Button
        >是指一对一，班课……还有哪些培训方式
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >课程时长：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotokechengshichang()"
          >查看/设置</Button
        >是指课程的一个课时有多少分钟；如果是按次计费的课程则是1次；如果是按起止日期计费的课程则是1天
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >科目设置：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotosubject()"
          >查看/设置</Button
        >是指机构有哪些科目，设置了课程以后，在所有课程选择的地方才有课程数据；
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >课程设置：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotokechengPage()"
          >查看/设置</Button
        >是指机构有哪些课程，设置了课程以后，在所有课程选择的地方才有课程数据；
      </Col>
    </Row>

    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >教室设置：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotoclassroomSetting()"
          >查看/设置</Button
        >是指机构有哪些教室；在排课的时候需要选择教室，只有这里设置了教室，排课的时候才有排课教室可选
      </Col>
    </Row>
    <!-- <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >系统主页设置：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="shezhizhuye()">查看/设置</Button>
        是指系统视频教程、在线帮助文档、系统反馈与评价和人工客服是否显示
      </Col>
    </Row>-->

    <systemzhuye-form v-model="sheyeshezhi"></systemzhuye-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import systemzhuyeForm from "../../../components/systemSetting/systemzhuyeForm";
export default {
  components: {
    systemzhuyeForm,
  },
  data() {
    return {
      sheyeshezhi: false,
    };
  },
  methods: {
    //主页设置
    shezhizhuye() {
      this.sheyeshezhi = true;
    },
    //年级设置
    nianjinianlinduan() {
      this.$router.push({
        path: "/nianjishezhi",
        query: {},
      });
    },
    //培训方式设置
    gotobuxistyle() {
      this.$router.push({
        path: "/bixistyleSetting",
        query: {},
      });
    },
    //课程时长设置
    gotokechengshichang() {
      this.$router.push({
        path: "/kechengshichang",
        query: {},
      });
    },
    //教室设置
    gotoclassroomSetting() {
      this.$router.push({
        path: "/classroom",
        query: {},
      });
    },
    //校区名称设置
    gotocampusshezhi() {
      this.$router.push({
        path: "/campusInfo",
        query: {},
      });
    },
    //岗位管理-权限设置
    jigouquanxian() {
      this.$router.push({
        path: "/gangweiquanxian",
        query: {},
      });
    },

    gotokechengPage() {
      this.$router.push({
        path: "/kechengshezhi",
        query: {},
      });
    },

    gotosubject() {
      this.$router.push({
        path: "/kemushezhi",
        query: {},
      });
    },
  },
  mounted: function () {},
};
</script>
