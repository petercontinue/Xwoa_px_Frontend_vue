<template>
  <Tabs size="small">
    <TabPane label="全部相册" v-model="type" value="0">
      <allphoto></allphoto>
    </TabPane>
    <TabPane label="学员相册" v-model="type" value="1">
      <stuxiangce></stuxiangce>
    </TabPane>
    <TabPane label="班级相册" v-model="type" value="2">
      <classxiangce></classxiangce>
    </TabPane>
    <TabPane label="校区相册" v-model="type" value="3">
      <campusxiangce></campusxiangce>
    </TabPane>
  </Tabs>
</template>

<script>
import { mapActions } from "vuex";
import allphoto from "../../../components/jiaowuManage/allphoto.vue";
import stuxiangce from "../../../components/jiaowuManage/stuxiangce.vue";
import classxiangce from "../../../components/jiaowuManage/classxiangce.vue";
import campusxiangce from "../../../components/jiaowuManage/campusxiangce.vue"
export default {
  components: { allphoto, stuxiangce, classxiangce,campusxiangce },
  data() {
    return {
      type: "0",
    };
  },
};
</script>

<style>
</style>