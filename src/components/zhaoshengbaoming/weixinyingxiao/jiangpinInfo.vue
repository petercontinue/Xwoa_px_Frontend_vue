<template>
  <Modal
    v-model="show"
    title="活动奖品信息"
    @on-ok="ok"
    :mask-closable="false"
    width="70"
    @on-cancel="closeModal(false)"
  >
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
      </Col>
    </Row>

    <Row style="margin-top: 15px">
      <Page
        :total="total"
        show-elevator
        show-total
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
export default {
  name: "jiangpinInfo",

  // CJjiangpinShow
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ID: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      data: [], // 接口数据接收
      total: 0,
      params: {
        current: 1,
        size: 10,
        huodongID: "",
      },
      columns6: [
        {
          title: "图片",
          key: "jiangpingimg",
          align: "center",

          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: "width: 40px;height: 40px;",
                },
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  attrs: {
                    src: params.row.jiangpingimg,
                    style: "width: 40px;height: 40px;border-radius: 2px;",
                  },
                  style: {},
                }),
              ]
            );
          },
        },
        {
          title: "活动名称",
          key: "choujiangHuodongName",
          align: "center",
        },
        {
          title: "奖品等级",
          key: "jiangpinglevel",
          align: "center",
        },
        {
          title: "类别",
          key: "type",
          align: "center",
        },
        {
          title: "活动奖品",
          key: "jiangpingname",
          align: "center",
        },
        {
          title: "数量",
          key: "jiangpingtotalnum",
          align: "center",
        },
        {
          title: "中奖率",
          key: "zhongjianggailv",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getWhdChoujiangJiangpinPage"]),

    ok() {
      this.$emit("input", val);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
    },

    getWhdChoujiangJiangpin() {
      console.log(this.params);
      this.getWhdChoujiangJiangpinPage(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(this.data);
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.huodongID = this.ID;
        this.getWhdChoujiangJiangpin();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
