<template>
  <div>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >报名自定义字段：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotobmfjzd()">查看/设置</Button>
        是指学生报名页面那里除了现有的一些报名字段以后，还需要哪些字段。可以在这里自定义设置
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >来源途径：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotozhaoshengtj()">查看/设置</Button>
        是指招生途径，即学生是怎么招来的，比如:地推，传统媒体，自媒体，微信，直访，短信等
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >意向学员权限人：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="toyxquanxianren('85')">查看/设置</Button>
        是指设置权限为个人数据的时候，是哪个角色能看到数据；具体是指意向学员的负责人？登记人？市场人？
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >意向学员重复录入限制：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="toyxquanxianren('84')">查看/设置</Button>
        是指意向学员哪种情况不能录入:（1）姓名和电话两个都相同，就不能重复录入；（2）只是姓名相同就不能重复录入；（3）只是电话相同就不能重复录入
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >意向客户未跟进天数（天）：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="toyxquanxianren('87')">查看/设置</Button>
        是指意向客户多少天未跟进，就自动返回未分配状态，即成为公海学员；
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >意向学员下次跟进时间：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="toyxquanxianren('86')">查看/设置</Button>
        是指设置意向学员跟进时候，下次跟进时间是否设置为必填项，默认是非必填
      </Col>
    </Row>
    <Row style="margin: 15px;">
      <Col span="6" style="text-align: right;padding-right:5px;"
        >意向程度设置：
      </Col>
      <Col span="18" style="text-align: left;">
        <Button type="primary" icon="md-settings" size="small" @click="gotoyixiangchengdu()">查看/设置</Button>
        是指对意向学员打标签或分类分级；比如:非常反感、意向一般、有报名意向、重点意向等，可以自定义设置
      </Col>
    </Row>

    <addstusetting-form
      v-model="showEdit"
      :shezhiID="typeID"
    ></addstusetting-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addstusettingForm from "../../../components/systemSetting/stusetting/addstusettingForm";
export default {
  components: {
    addstusettingForm,
  },
  data() {
    return {
      typeID: "",
      showEdit: false,
    };
  },
  methods: {
    gotobmfjzd() {
      this.$router.push({
        path: "/bmfujiaziduan",
        query: {},
      });
    },
    gotozhaoshengtj() {
      this.$router.push({
        path: "/zhaoshengtujing",
        query: {},
      });
    },
    toyxquanxianren(type) {
      this.typeID = type;
      this.showEdit = true;
    },
    gotoyixiangchengdu() {
      this.$router.push({
        path: "/yixiangcd",
        query: {},
      });
    },
  },
  mounted: function () {},
};
</script>