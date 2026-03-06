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
        <DatePicker
          type="daterange"
          placement="left-start"
          @on-change="changeDate"
        >
        </DatePicker>
        <div style="text-align: center">
          <Button style="margin-top: 3px" @click="cancelSearch">取消</Button>
          <Button type="primary" style="margin-top: 3px" @click="ddClick"
            >筛选</Button
          >
        </div>
      </div>
    </Poptip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeColor: "#008cee",
      defaultColor: "#495060",
      searchDate: "",
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
      this.headerSearchJointimeVisible = false;
      this.$emit("on-clickSearch", this.searchDate);
    },
    cancelSearch() {
      this.headerSearchJointimeVisible = false;
      this.searchDate = "";
      this.$emit("on-clickSearch", this.searchDate);
    },
    changeDate(event) {
      this.searchDate = event;
    },
  },
};
</script>