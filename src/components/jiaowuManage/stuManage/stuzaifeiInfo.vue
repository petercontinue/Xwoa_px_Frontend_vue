<template>
  <Modal
    v-model="show"
    title="杂费信息"
    @on-ok="ok"
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
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
export default {
  name: "stuzaifeiInfo",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    qdID: { type: String },
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
        qdID: 0,
      },
      columns6: [
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.type) {
              case 1:
                state = "签单杂费";
                break;
              case 2:
                state = "教学用品购买交费";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "金额",
          key: "zongMoney",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getzafeiInfoPage"]),

    getzafeiInfo() {
      this.getzafeiInfoPage(this.params).then((res) => {
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
      this.getzafeiInfo();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getzafeiInfo();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.qdID = this.qdID;
        this.getzafeiInfo();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
