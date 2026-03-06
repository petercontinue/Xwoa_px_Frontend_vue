<template>
  <div>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >新签续费退费录入限制（天）：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshezhi('43')">查看/设置</Button>
        是指多少天以前的新签或续费或退费不可以录入；这个功能是为了防止无意的错录或恶意错录
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >杂费自定义字段：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshoufeizidingyi()">查看/设置</Button>
        自定义其它费用自定义字段类型用于报名:例如教材费，服务费，学杂费，住宿费等可自定义
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >收费方式：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshoufeistyle()">查看/设置</Button>
        是指新签字、续费、充值等收费的收费方式:如现金、刷卡、微信、支付宝、对公转账等，可以自定义
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >最低收费标准设置：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="zuidishoufeibiaozhun()">查看/设置</Button>
        是指新签或续费录单的时候，各个年级相应的培训方式的最低收费单价；如果设置了这个最低单价，则录单的时候单价低于这个设定值就无法录单
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >财务流水类别：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotocaiwuliushuileibie()">查看/设置</Button>
        是指财务流水中的支出和收入项目有哪些；录入财务流水时需要支出或收入类别
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >财务流水限制（天）：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshezhi('42')">查看/设置</Button>
        是指多少天以前的财务流水（收入或支出）不允许录入；这个功能是为了防止无意的错录或恶意的错录
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >工资审核人：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshezhi('20')">查看/设置</Button>
        是指工资数据可以由谁来审核，可以设定多个人
      </Col>
    </Row>
    
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >新签审批开关：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshezhi('107')">查看/设置</Button>
        是否开启新签审批流程(默认不开启)，开启审批流程后通过分配审批权限来设置审批人；
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >续费审批开关：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshezhi('108')">查看/设置</Button>
        是否开启续费审批流程(默认不开启)，开启审批流程后通过分配审批权限来设置审批人；
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >退费审批开关：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoshezhi('106')">查看/设置</Button>
        退费是否开启审批流程(默认不开启)，开启审批流程后通过分配审批权限来设置审批人；
      </Col>
    </Row>
    
    <caiwusetting-form
      v-model="showEdit"
      :shezhiID="typeID"
    ></caiwusetting-form>
    <updateshenpi-form  
    v-model="showEditshenpi"
      :shezhiID="typeID"></updateshenpi-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import caiwusettingForm from "../../../components/systemSetting/caiwushezhi/caiwusettingForm";
//src\components\systemSetting\caiwushezhi\updateshenpiForm.vue
import updateshenpiForm from "../../../components/systemSetting/caiwushezhi/updateshenpiForm.vue";
export default {
  components: {
    caiwusettingForm,
    updateshenpiForm,
  },
  data() {
    return {
      typeID: "",
      showEdit: false,
      showEditshenpi: false,
    };
  },
  methods: {
    gotoshezhi(type) {
      this.typeID = type;
      console.log(type != "106" && type != "107" && type != "108");
      if (type != "106" && type != "107" && type != "108") {
        this.showEdit = true;
      } else {
        this.showEditshenpi = true;
      }
    },
    gotoshoufeizidingyi() {
      this.$router.push({
        path: "/shoufeizidingyi",
        query: {},
      });
    },
    gotoshoufeistyle() {
      this.$router.push({
        path: "/shoufeistyle",
        query: {},
      });
    },
    gotocaiwuliushuileibie() {
      this.$router.push({
        path: "/liushuileibie",
        query: {},
      });
    },
    zuidishoufeibiaozhun() {
      this.$router.push({
        path: "/shoufeibiaozhun",
        query: {},
      });
    },
  },
  mounted: function () {},
};
</script>