<template>
  <Modal
    v-model="show"
    title="班级学员名单"
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
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "classStuMD",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    classID: { type: String },
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
        classID: "",
      },
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
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
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "是否显示",
          key: "isShow",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.isShow) {
              case "1":
                state = "启用";
                break;
              case "0":
                state = "未启用";
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

    getstumingdanList() {
      api.get("xwcloud-stu/stu/stuClass/getstumingdan",this.params).then((res) => {
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
      this.getstumingdanList();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getstumingdanList();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.classID = this.classID;
        this.getstumingdanList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
