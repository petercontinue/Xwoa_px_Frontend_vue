<template>
  <div>
    <Tabs value="shoufei">
      <TabPane label="科目收费统计" name="shoufei">
          <subjectShouFeitongji></subjectShouFeitongji>
      </TabPane>
      <TabPane label="科目余额统计" name="yue">
        <subjectYuETongji></subjectYuETongji>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import subjectShouFeitongji from "@/components/shujutongji/subjectShouFeitongji";
import subjectYuETongji from "@/components/shujutongji/subjectYuETongji";
import * as api from "@/api/api.js";

export default {
  name: "subjectCaiwuTongji",
  components: {
    subjectShouFeitongji,
    subjectYuETongji,
  },
  data() {
    return {};
  },
};
</script>

<style lang="" scoped>
</style>