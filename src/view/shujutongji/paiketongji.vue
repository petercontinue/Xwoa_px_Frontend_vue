<template>
  <div>
    <Tabs value="name1">
      <TabPane label="学生排课统计" name="name1">
        <xueshengpaiketongji></xueshengpaiketongji>
      </TabPane>
      <TabPane label="按教师统计" name="name2">
        <paikeanjiaoshitongji></paikeanjiaoshitongji>
      </TabPane>
      <TabPane label="按校区统计" name="name3">
        <paiketongjianxiaoqutongji></paiketongjianxiaoqutongji>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import Xueshengpaiketongji from "@/components/shujutongji/xueshengpaiketongji.vue";
import Paikeanjiaoshitongji from "../../components/shujutongji/paikeanjiaoshitongji.vue";
import Paiketongjianxiaoqutongji from "../../components/shujutongji/paiketongjianxiaoqutongji.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    Xueshengpaiketongji,
    Paikeanjiaoshitongji,
    Paiketongjianxiaoqutongji,
  },
};
</script>