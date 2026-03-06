<template>
  <Modal
    v-model="show"
    title="代金券信息"
    @on-ok="ok"
    :mask-closable="false"
    width="50"
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
  name: "studaijinquanInfo",
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
          title: "代金券金额",
          key: "money",
          align: "center",
        },
        {
          title: "使用时间",
          key: "creatTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.creatTime, "yyyy-MM-dd - hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "经办人",
          key: "staffName",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getstuIntegraInfoPage", "getdaijinquanInfoPage"]),

    getdaijinquanInfo() {
      this.getdaijinquanInfoPage(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },
    ok() {
      this.$emit("input", val);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getdaijinquanInfo();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getdaijinquanInfo();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.stuID = this.stuID;
        this.getdaijinquanInfo();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
