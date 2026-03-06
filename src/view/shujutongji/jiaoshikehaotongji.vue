<template>
  <div>
    <Tabs value="name1">
      <TabPane label="按年级统计" name="name1"
        ><annianjitongji></annianjitongji
      ></TabPane>
      <TabPane label="按班级统计" name="name2">
        <anbanjitongji></anbanjitongji>
      </TabPane>
      <TabPane label="按补习方式统计" name="name3">
        <anbuxifangshi></anbuxifangshi>
      </TabPane>
      <TabPane label="按科目统计" name="name4"
        ><ankemutongji></ankemutongji>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";

import Annianjitongji from "@/components/shujutongji/annianjitongji.vue";
import Anbanjitongji from "../../components/shujutongji/anbanjitongji.vue";
import Anbuxifangshi from "../../components/shujutongji/anbuxifangshi.vue";
import Ankemutongji from "../../components/shujutongji/ankemutongji.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    Annianjitongji,
    Anbanjitongji,
    Anbuxifangshi,
    Ankemutongji,
  },
  data() {
    return {};
  },
  methods: {
    
  },
  mounted: function () {},
};
</script>