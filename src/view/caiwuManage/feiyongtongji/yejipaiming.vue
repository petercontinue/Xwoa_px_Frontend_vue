<template>
  <div>
    <Row>
      <Col span="12">
        <nianduxiaoquyejipaiming></nianduxiaoquyejipaiming>
      </Col>
      <Col span="12"><yueduxiaoquyejipaiming></yueduxiaoquyejipaiming></Col>
    </Row>
    <Row>
      <Col span="12">
        <niandugerenyejipaiming></niandugerenyejipaiming>
      </Col>
      <Col span="12"><yuedugerenyejipaiming></yuedugerenyejipaiming></Col>
    </Row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";


import Yueduxiaoquyejipaiming from '@/components/caiwuManage/yueduxiaoquyejipaiming.vue';
import Nianduxiaoquyejipaiming from '../../../components/caiwuManage/nianduxiaoquyejipaiming.vue';
import Niandugerenyejipaiming from '../../../components/caiwuManage/niandugerenyejipaiming.vue';
import Yuedugerenyejipaiming from '../../../components/caiwuManage/yuedugerenyejipaiming.vue';
import * as api from "@/api/api.js";

export default {
  components: {
    Yueduxiaoquyejipaiming,
    Nianduxiaoquyejipaiming,
    Niandugerenyejipaiming,
    Yuedugerenyejipaiming,
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function () {},
};
</script>
