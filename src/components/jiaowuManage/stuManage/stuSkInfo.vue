<template>
  <Modal
    v-model="show"
    title="上课信息"
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
  name: "stuSkInfo",
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
        stuID: 0,
      },
      columns6: [
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 100,
        },
        {
          title: "科目",
          key: "subjectNamem",
          align: "center",
          width: 100,
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "已上总课时",
          key: "keshiCount",
          align: "center",
          width: 120,
        },
        {
          title: "第一次上课日期",
          key: "firstDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.firstDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "最后一次上课日期",
          key: "lastDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.lastDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "目前状态",
          key: "haveke",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            if (params.row.haveke > 0) {
              state = "有课";
            } else {
              state = "无课";
            }
            return h("div", [h("span", state)]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getstuskInfoPage"]),

    getstuskInfo() {
      this.getstuskInfoPage(this.params).then((res) => {
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
      this.getstuskInfo();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getstuskInfo();
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
        this.getstuskInfo();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
