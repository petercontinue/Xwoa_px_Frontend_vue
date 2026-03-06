<template>
  <Modal
    v-model="show"
    title="学员签到详情"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
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
  name: "qiandaostuInfo",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
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
        stuID: "",
      },
      columns6: [
        {
          title: "签到类型",
          key: "qtype",
          align: "center",
        },
        {
          title: "签到时间",
          key: "qianDatetime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.qianDatetime, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "是否推送成功",
          key: "tstype",
          align: "center",
        },
        {
          title: "添加人",
          key: "staffName",
          align: "center",
        },
      ],
    };
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    getstuqiaoDaoNumListPage() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getstuqiaoDaoNumPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(this.data);
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
      this.getstuqiaoDaoNumListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getstuqiaoDaoNumListPage();
    },
    qiandaoNum() {
      console.log("ss");
    },
    /**
     * 初始化页面
     */
    mounted: function () {
      this.getstuqiaoDaoNumListPage();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        console.log(this.stuID);
        this.params.stuID = this.stuID;
        this.getstuqiaoDaoNumListPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
