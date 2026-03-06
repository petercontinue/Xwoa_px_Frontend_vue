<template>
  <div>
    <Tabs value="name1">
      <TabPane label="校区月均课耗" name="name1">
        <xiaoquyuejunkehao></xiaoquyuejunkehao>
      </TabPane>
      <TabPane label="教师个人的班级月均课耗" name="name2">
        <jiaoshigerenyuejunkehao></jiaoshigerenyuejunkehao>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import Xiaoquyuejunkehao from '../../components/shujutongji/xiaoquyuejunkehao.vue';
import Jiaoshigerenyuejunkehao from '../../components/shujutongji/jiaoshigerenyuejunkehao.vue';
import * as api from "@/api/api.js";


export default {
  components: {
    Xiaoquyuejunkehao,
    Jiaoshigerenyuejunkehao,
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function () {},
};
</script>