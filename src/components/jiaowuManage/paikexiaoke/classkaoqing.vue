<template>
  <Modal
    v-model="show"
    title="考勤学员"
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
  name: "classkaoqing",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    kqdata: { type: String },
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
        paikeID: "",
        classID: "",
      },
      stukqdata: [],
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "学号",
          key: "stuGradeName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width:"140",
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
          width: "120",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "考勤状态",
          key: "kaoqing",
          align: "center",
          width: "100",
          render: (h, params) => {
            let state = "";
            switch (params.row.kaoqing) {
              case null:
                state = "未考勤";
                break;
              default:
                state = params.row.kaoqing;
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
      this.stukqdata = [];
      this.$emit("input", val);
    },
    getclasskaoqing() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getclasskaoqingPage",this.params).then((res) => {
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
      this.getclasskaoqing();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getclasskaoqing();
    },

    /**
     * 初始化页面
     */
    mounted: function () {
      this.getclasskaoqing();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        console.log(this.stukqdata);
        this.stukqdata.push(JSON.parse(this.kqdata));
        this.params.paikeID = this.stukqdata[0].id;
        this.params.classID = this.stukqdata[0].classID;
        console.log(this.params);
        this.getclasskaoqing();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
