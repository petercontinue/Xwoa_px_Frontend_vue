<template>
  <Modal
    v-model="show"
    title="课程信息"
    @on-ok="ok"
    :mask-closable="false"
    width="60"
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
  name: "kechengInfo",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
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
        stuID: 0,
        qdID: 0,
      },
      columns6: [
        {
          title: "科目",
          key: "subjectName",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
        },
        {
          title: "计费方式",
          key: "jifeiStyle",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.jifeiStyle) {
              case "1":
                state = "按课时计费";
                break;
              case "2":
                state = "按课时包计费";
                break;
              case "3":
                state = "按起止日期计费";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "开始时间",
          key: "startDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.startDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "结束时间",
          key: "endDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.endDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "单价",
          key: "kechengprice",
          align: "center",
          width: 150,
        },
        {
          title: "折扣",
          key: "zhekou",
          align: "center",
          width: 100,
        },
        {
          title: "总价",
          key: "zongjia",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getkechengInfoPage"]),

    getkechengInfo() {
      this.getkechengInfoPage(this.params).then((res) => {
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
      this.getkechengInfo();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getkechengInfo();
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
        this.params.qdID = this.qdID;
        this.getkechengInfo();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
