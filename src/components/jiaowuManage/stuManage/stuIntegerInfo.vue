<template>
  <Modal
    v-model="show"
    title="积分信息"
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
  name: "stuIntegerInfo",
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
          title: "变动类型",
          key: "type",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            switch (params.row.type) {
              case "1":
                state = "增加";
                break;
              case "2":
                state = "扣减";
                break;

              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "变动前积分",
          key: "oldIntegral",
          align: "center",
        },
        {
          title: "变动积分",
          key: "integral",
          align: "center",
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          width: 250,
        },
        {
          title: "经办人",
          key: "staffName",
          align: "center",
          width: 100,
        },
        {
          title: "变动时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.createTime,
              "yyyy-MM-dd - hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getstuIntegraInfoPage"]),

    getstuIntegraInfo() {
      this.getstuIntegraInfoPage(this.params).then((res) => {
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
      this.getstuIntegraInfo();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getstuIntegraInfo();
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
        this.getstuIntegraInfo();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
