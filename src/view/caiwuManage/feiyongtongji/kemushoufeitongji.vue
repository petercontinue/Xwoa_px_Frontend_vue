<template>
  <div>
    <Tabs value="name1">
      <TabPane label="科目收费" name="name1"
        ><kemushoufei-table></kemushoufei-table></TabPane>
      <TabPane label="科目课耗" name="name2"
        ><kemukehao-table></kemukehao-table></TabPane>
      <TabPane label="科目余额" name="name3">
          <kemuyufree-table></kemuyufree-table>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import XinqianTable from "../../../components/caiwuManage/xinqianTable.vue";
import KemushoufeiTable from '../../../components/caiwuManage/kemushoufeiTable.vue';
import KemukehaoTable from '../../../components/caiwuManage/kemukehaoTable.vue';
import KemuyufreeTable from '../../../components/caiwuManage/kemuyufreeTable.vue';
import * as api from "@/api/api.js";

export default {
  components: {
    XinqianTable,
    KemushoufeiTable,
    KemukehaoTable,
    KemuyufreeTable,
  },
  data() {
    return {};
  },
  methods: {},
  mounted: function () {},
};
</script>