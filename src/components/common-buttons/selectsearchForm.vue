<style scoped>
</style> 
<template>
  <div>
    <Poptip placement="bottom" transfer v-model="headerSearchJointimeVisible">
      <span v-if="content.length > 0" style="cursor: pointer">
        {{ content }}
        <Icon
          type="ios-search"
          style="marginleft: 5px; fontsize: 20px; color: #333; cursor: pointer"
        ></Icon>
      </span>
      <Icon type="plus" v-else style="cursor: pointer"></Icon>
      <div slot="content">
        <Select
          v-model="localChoosedItem"
          placeholder="请选择条件进行查询"
          style="width: 100%"
          filterable
        >
          <Option
            v-for="(item, index) in data"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
        <div style="text-align: center; margin-top: 5px">
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
      localChoosedItem: "",
      headerSearchJointimeVisible: false,
    };
  },
  props: {
    placement: { type: String, default: "bottom-start" },
    showArrow: { type: Boolean, default: false },
    content: { type: String, default: "" },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    choosedItem: { type: String, default: "" },
  },
  watch: {
    choosedItem: {
      immediate: true,
      handler(newv, oldv) {
        this.localChoosedItem = newv;
      },
    },
  },
  created() {},
  methods: {
    ddClick() {
      this.headerSearchJointimeVisible = false;
      this.$emit("on-choosed", this.localChoosedItem);
    },
    cancelSearch() {
      this.$emit("on-choosed", "");
      this.headerSearchJointimeVisible = false;
    },
  },
};
</script>


