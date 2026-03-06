<template>
  <div>
    <Tabs value="name1">
      <TabPane label="科目学员占比" name="name1">
        <kemuxueyuanzhanbi></kemuxueyuanzhanbi>
      </TabPane>
      <TabPane label="科目新签占比" name="name2">
        <kemuxinqianzhanbi></kemuxinqianzhanbi>
      </TabPane>
      <TabPane label="科目续费占比" name="name3">
        <kemuxvfeizhanbi></kemuxvfeizhanbi>
      </TabPane>
      <TabPane label="科目新签续费占比" name="name4">
        <kemuxinqianandxvfeizhanbi></kemuxinqianandxvfeizhanbi>
      </TabPane>
      <TabPane label="科目收费课时占比" name="name5">
        <kemushoufeikeshizhanbi></kemushoufeikeshizhanbi>
      </TabPane>
      <TabPane label="科目课消占比" name="name6">
        <kemukexiaozhanbi></kemukexiaozhanbi>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import Xiaoquyuejunkehao from "../../components/shujutongji/xiaoquyuejunkehao.vue";
import Jiaoshigerenyuejunkehao from "../../components/shujutongji/jiaoshigerenyuejunkehao.vue";
import Kemuxueyuanzhanbi from "../../components/shujutongji/kemuxueyuanzhanbi.vue";
import Kemuxinqianzhanbi from "../../components/shujutongji/kemuxinqianzhanbi.vue";
import Kemuxvfeizhanbi from "../../components/shujutongji/kemuxvfeizhanbi.vue";
import Kemuxinqianandxvfeizhanbi from "../../components/shujutongji/kemuxinqianandxvfeizhanbi.vue";
import Kemushoufeikeshizhanbi from "../../components/shujutongji/kemushoufeikeshizhanbi.vue";
import Kemukexiaozhanbi from "../../components/shujutongji/kemukexiaozhanbi.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    Xiaoquyuejunkehao,
    Jiaoshigerenyuejunkehao,
    Kemuxueyuanzhanbi,
    Kemuxinqianzhanbi,
    Kemuxvfeizhanbi,
    Kemuxinqianandxvfeizhanbi,
    Kemushoufeikeshizhanbi,
    Kemukexiaozhanbi,
  },
  methods: {},
  mounted: function () {},
};
</script>