<template>
  <Modal
    v-model="show"
    title="共享详情"
    @on-ok="ok"
    :mask-closable="false"
    width="30"
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
  name: "shareInfo",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxiIDs: { type: String },
  },
  data() {
    return {
      show: this.value,
      data: [], // 接口数据接收
      total: 0,
      params: {
        current: 1,
        size: 10,
        buxiIDs: "",
      },
      columns6: [
        {
          title: "姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "共享课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "共享课程剩余课时",
          key: "keshiNum",
          align: "center",
        },
      ],
    };
  },
  methods: {
    getshareInfoList() {
      api.get("xwcloud-stu/stu/buxikecheng/getshareInfo",this.params).then((res) => {
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
      this.getkxqinfoList();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getkxqinfoList();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        if (this.buxiIDs != "0") {
          this.params.buxiIDs = this.buxiIDs;
          this.getshareInfoList();
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
