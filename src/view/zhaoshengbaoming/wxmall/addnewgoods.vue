<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>1 全部完成以下三个步骤才完成商品的添加；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 商品返佣比例不设置的话，就是使用通用的返佣比例；</span>
        </Col>
      </Alert>
    </Row>
    <Collapse accordion v-model="selected">
      <Panel name="1">
        第一步 商品基本信息【点击设置】
        <div slot="content">
          <goods-info :goodsID="goodsID" @increment="savesuccess"></goods-info>
        </div>
      </Panel>
      <Panel name="2">
        第二步 设置商品规格【点击设置】
        <div slot="content">
          <goodsguige
            :goodsID="goodsID"
            :key="goodsID"
            @increment="saveguigeshuxing"
          ></goodsguige>
        </div>
      </Panel>
      <Panel name="3">
        第三步 设置商品规格属性对应的价格【点击设置】
        <div slot="content">
          <goodsguigeprice :goodsID="goodsID" :key="value"></goodsguigeprice>
        </div>
      </Panel>
    </Collapse>
  </div>

  <!-- <Tabs size="small">
    <TabPane label="商品信息"><goods-info :goodsID="goodsID"  @increment="savesuccess"></goods-info></TabPane>
    <TabPane label="商品规格" :disabled="goodsID == 0"><goodsguige :goodsID="goodsID"></goodsguige></TabPane>
    <TabPane label="商品价格" :disabled="goodsID == 0"><goodsguigeprice :goodsID="goodsID"></goodsguigeprice></TabPane>
  </Tabs> -->
</template>
<script>
import goodsInfo from "@/components/zhaoshengbaoming/wxmall/goodsInfo.vue";
import goodsguige from "@/components/zhaoshengbaoming/wxmall/goodsguige.vue";
import goodsguigeprice from "@/components/zhaoshengbaoming/wxmall/goodsguigeprice.vue";
import { mapActions } from "vuex";
import * as api from "@/api/api.js";

export default {
  components: {
    goodsInfo,
    goodsguige,
    goodsguigeprice,
  },
  data() {
    return {
      showgoodsInfo: true,
      goodsID: this.$route.query.goodsID,
      value: 0,
      selected: "1",
    };
  },
  methods: {
    savesuccess(data) {
      this.goodsID = data;
      if (this.goodsID) {
        this.selected = "2";
      }
      // this.reload();
    },
    saveguigeshuxing() {
      this.value++;
    },
  },
  mounted() {},
};
</script>
