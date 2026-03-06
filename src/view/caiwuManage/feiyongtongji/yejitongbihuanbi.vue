<template>
  <div>
    <Tabs value="name1">
      <TabPane label="新签" name="name1"
        ><xinqian-table :type="'1'"></xinqian-table
      ></TabPane>
      <TabPane label="续费" name="name2"
        ><xinqian-table :type="'2'"></xinqian-table
      ></TabPane>
      <TabPane label="新签加续费" name="name3">
          <xinqian-table :type="'1,2'"></xinqian-table
      >
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import XinqianTable from "../../../components/caiwuManage/xinqianTable.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    XinqianTable,
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function () {},
};
</script>