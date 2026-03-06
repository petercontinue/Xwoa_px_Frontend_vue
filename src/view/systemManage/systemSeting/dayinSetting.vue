<template>
  <div>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >【新签】报名打印的默认纸张格式：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="openSetting('101')" >查看/设置</Button>
        是指要打印小票，还是三联收据；小票或三联收据的纸张的长和宽可以自己设置
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >【续费】报名打印的默认纸张格式：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="openSetting('102')" >查看/设置</Button>
        是指要打印小票，还是三联收据；小票或三联收据的纸张的长和宽可以自己设置
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >【充值】报名打印的默认纸张格式：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="openSetting('103')" >查看/设置</Button>
        是指要打印小票，还是三联收据；小票或三联收据的纸张的长和宽可以自己设置
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >【退费】报名打印的默认纸张格式：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="openSetting('104')" >查看/设置</Button>
        是指要打印小票，还是三联收据；小票或三联收据的纸张的长和宽可以自己设置
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >【消课】打印的默认纸张格式：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="openSetting('105')" >查看/设置</Button>
        是指要打印小票，还是三联收据；小票或三联收据的纸张的长和宽可以自己设置
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >校区打印二维码：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" >查看/设置</Button>
        是指打印的时候显示在收据上的二维码；如果各校区的二维码用一个，就只用设置一个；如果部分校区的二维码不同，则按各个校区分别设
      </Col>
    </Row>

    <dayinsetting-form
      v-model="ShowEdit"
      :editID="editID"
    ></dayinsetting-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import dayinsettingForm from "../../../components/systemSetting/dayinsetting/dayinsettingForm"
export default {
  components: {
    dayinsettingForm
  },
  data() {
    return {
      ShowEdit:false,
      editID:"",
    };
  },
  methods: {
    openSetting(Id){
      this.editID=Id;
      this.ShowEdit=true;
    }
  },
  mounted: function () {},
};
</script>