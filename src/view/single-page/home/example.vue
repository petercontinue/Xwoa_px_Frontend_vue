<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: {
    type: {
      //数据显示类型：1：7天；2:15天；3:30天；4:90天；5:半年；6：一年
      type: Number, // 父页面传来的值
      default: 1,
    },
    yejiDate: {
      type: String,
      default: "",
    },
    series:{
      type:Array,
    }
  },
  data() {
    return {
      dom: null,
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
  },
  mounted() {},
  watch: {
    type(type) {
      console.log("值改变了");
      console.log(JSON.parse(this.yejiDate));
      console.log(this.series);
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          top: "3%",
          left: "1.2%",
          right: "1%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: JSON.parse(this.yejiDate),
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series:this.series,
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    },
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
};
</script>
