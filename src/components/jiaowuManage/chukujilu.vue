<template>
  <Modal
    v-model="show"
    title="图书出库记录"
    footer-hide
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "chukujilu",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    IDs: {
      type: String, // 父页面传来的值
      default: "",
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "图书名称",
          key: "bookName",
          align: "center",
        },
        {
          title: "出库数量",
          key: "outnum",
          align: "center",
        },
        {
          title: "经办人",
          key: "addstaffName",
          align: "center",
        },
        {
          title: "经办时间",
          align: "center",
          key: "outDate",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.outDate,
              "yyyy-MM-dd hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1
      },
    };
  },
  methods: {
    outboundRecordsListPage() {
      api.get("xwcloud-homeschool/homeschool/pxbooks/outboundRecordsPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.outboundRecordsListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.outboundRecordsListPage();
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.outboundRecordsListPage();
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
  },
  mounted: function () {
    // 初始化页面
    this.outboundRecordsListPage();
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      if (val) {
        this.params.current = 1;
        this.params.size = 10;
        this.outboundRecordsListPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
