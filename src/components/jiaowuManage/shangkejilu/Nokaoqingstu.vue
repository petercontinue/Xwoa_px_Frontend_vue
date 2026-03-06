<template>
  <Modal
    v-model="show"
    title="缺课学员"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
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
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "Nokaoqingstu",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    tabID: { type: String },
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
        ID: this.tabID,
      },
      columns6: [
        {
          title: "学员姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "考勤状态",
          key: "kaoqingStyle",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.kaoqingStyle) {
              case "1":
                state = "正常";
                break;
              case "2":
                state = "请假";
                break;
              case "3":
                state = "旷课";
                break;
              case "4":
                state = "迟到";
                break;
              case "5":
                state = "早退";
                break;
              case "6":
                state = "补课";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
      ],
    };
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    NokaoqingstuPage() {
      api.get("xwcloud-pkxk/kehao/ClassRecord/NokaoqingstuPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = (Number)(res.obj.total);
        }
      });
    },
    ok() {
      this.closeModal(false);
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.NokaoqingstuPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.NokaoqingstuPage();
    },

    /**
     * 初始化页面
     */
    mounted: function () {
      this.NokaoqingstuPage();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        // console.log(this.tabID);
        this.params.ID=this.tabID;
        this.NokaoqingstuPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
