<template>
  <Modal
    v-model="show"
    title="参加及获奖详情"
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
  name: "huojiangInfo",
  // CJxiangqingShow
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
        huodongName: "",
        type: 0,
        userName: "",
      },
      columns6: [
        {
          title: "活动名称",
          key: "choujiangHuodongName",
          align: "center",
        },
        {
          title: "抽奖人",
          key: "userName",
          align: "center",
        },
        {
          title: "类型",
          key: "jptype",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.jptype) {
              case 0:
                state = "无奖品";
                return h("div", [h("span", state)]);
              case 1:
                state = "是奖品";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "blue" },
                    },
                    state
                  ),
                ]);
              default:
                state = "-";
                break;
            }
          },
        },
        {
          title: "获奖名称",
          key: "jiangpingName",
          align: "center",
        },
        {
          title: "获奖等级",
          key: "jiangpingLevel",
          align: "center",
        },
        {
          title: "奖品发放状态",
          key: "jiangpingFafangState",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.jiangpingFafangState) {
              case 0:
                state = "未发放";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "red" },
                    },
                    state
                  ),
                ]);
              case 1:
                state = "已发放";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "green" },
                    },
                    state
                  ),
                ]);
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "备注",
          key: "shuoming",
          align: "center",
          render: (h, params) => {
            let val = "-";
            if (params.row.shuoming) {
              val = params.row.shuoming;
            }
            return h("div", [h("span", val)]);
          },
        },
        {
          title: "抽奖时间",
          key: "choujiangTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.choujiangTime,
              "yyyy-MM-dd hh:mm"
            );
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "操作人",
          key: "ffStaffName",
          align: "center",
          render: (h, params) => {
            let val = "-";
            if (params.row.jiangpingFFTime) {
              val = params.row.jiangpingFFTime;
            }
            return h("div", [h("span", val)]);
          },
        },
        {
          title: "操作时间",
          key: "jiangpingFFTime",
          align: "center",
          render: (h, params) => {
            let datehave = "-";
            if (params.row.jiangpingFFTime) {
              datehave = toolbox.dateFtt(
                params.row.jiangpingFFTime,
                "yyyy-MM-dd hh:mm"
              );
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getWhdChoujiangRecordPage"]),

    getWhdChoujiangRecord() {
      this.getWhdChoujiangRecordPage(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);

          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
          console.log(this.data);
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
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
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
        this.getWhdChoujiangRecord();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
