<template>
  <div>
    <Poptip
      placement="bottom"
      transfer
      v-model="visiblePopTip"
    >
      <span v-if="content.length > 0" style="cursor: pointer">
        {{ content
        }}<Icon
          type="ios-search"
          style="marginleft: 5px; fontsize: 20px; color: #333; cursor: pointer"
        ></Icon>
      </span>
      <Icon type="plus" v-else style="cursor: pointer"></Icon>
      <div slot="content">
        <DatePicker
          type="year"
          @on-change="changeDate($event, 1)"
          style="width: 80px"
        >
        </DatePicker>
        <Divider type="vertical" />
        <DatePicker
          type="year"
          @on-change="changeDate($event, 2)"
          style="width: 80px"
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
      // startDate: null,
      // entDate: "",
      searchDateS: null,
      searchDateE: null,
      visiblePopTip: false,
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
      // console.log(this.searchDate);
      this.$emit("on-clickSearch", this.searchDateS, this.searchDateE);
      this.visiblePopTip = false;
    },
    cancelSearch() {
      this.searchDateS = null;
      this.searchDateE = null;
      this.$emit("on-clickSearch", this.searchDateS, this.searchDateE);
      this.visiblePopTip = false;
    },
    changeDate(event, type) {
      if (type == 1) {
        this.searchDateS = event;
        this.searchDateE = null;
      } else {
        this.searchDateE = event;
      }
      // 时间校验
      if (this.searchDateS && this.searchDateE) {
        if (this.searchDateS >= this.searchDateE) {
          this.$Message.error("请选择正确的时间");
          // 清空结束时间选择
          // console.log(this.endDate);
          // this.endDate = "";
        }
      }

      // console.log(event, type);
      // this.searchDate=event;

      // console.log(this.searchDateS, this.searchDateE);
    },
  },
};
</script>