<style scoped>
</style> 
<template>
  <div>
    <Poptip placement="bottom" transfer v-model="headerSearchJointimeVisible">
      <span v-if="content.length > 0" style="cursor: pointer">
        {{ content}}
      <Icon type="ios-search" style="marginLeft:5px; fontSize:14px;color:#333;cursor:pointer;"></Icon>
      </span>
      <Icon type="plus" v-else style="cursor: pointer"></Icon>
      <div slot="content">
        <Input v-model="inputText" placeholder="请输入搜索关键字" />
        <div style="text-align: center;margin-top:5px;">
          <Button style="margin-top: 3px" @click="cancelSearch">取消</Button>
          <Button type="primary" style="margin-top: 3px" @click="ddClick"
            >筛选</Button
          >
        </div>
      </div>
    </Poptip>
  </div>
</template> <script>
export default {
  data() {
    return {
      activeColor: "#008cee",
      defaultColor: "#495060",
      inputText: "",
      headerSearchJointimeVisible: false,
    };
  },
  props: {
    placement: { type: String, default: "bottom-start" },
    showArrow: { type: Boolean, default: false },
    content: { type: String, default: "" },
  },
  watch: {},
  created() {},
  methods: {
    ddClick() {
      this.$emit("on-clickSearch", this.inputText);
      this.headerSearchJointimeVisible = false;
    },
    cancelSearch() {
      this.headerSearchJointimeVisible = false;
      this.inputText = "";
      this.$emit("on-clickSearch", this.inputText);
    },
  },
};
</script>


