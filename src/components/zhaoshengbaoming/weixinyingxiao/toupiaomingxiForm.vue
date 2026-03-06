<template>
  <Modal
    v-model="show"
    title="投票明细"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="65"
  >
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border @on-search="onSearch" ref="selection" :columns="columns" :data="data"></Table>
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
import toolbox from "@/libs/toolbox";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdata: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      columns: [
        {
          title: "参赛学员",
          key: "stuName",
          align: "center",
        },
        {
          title: "投票人微信昵称",
          key: "userName",
          align: "center",
        },
        {
          title: "投票时间时间",
          key: "toupiaotime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.toupiaotime, "yyyy-MM-dd")),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
    };
  },
  methods: {
    ...mapActions(["getWhdToupiaoRecordPage"]),
    ok() {},
    getWhdToupiaoRecordPageList() {
      this.getWhdToupiaoRecordPage({
        size: this.size,
        current: this.current,
        huodongID: JSON.parse(this.editdata).id,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.current = current;
      this.getPagesAssetsList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getPagesAssetsList();
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    onSearch() {},
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.getWhdToupiaoRecordPageList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
