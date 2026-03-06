<template>
  <Modal
    v-model="show"
    title="归还详细"
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
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "guihuanxiangqing",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    jieshuid: {},
  },
  data() {
    return {
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "图书名称",
          key: "booksName",
          align: "center",
        },
        {
          title: "归还数量",
          key: "returnnum",
          align: "center",
        },
        {
          title: "借书人",
          key: "peopleName",
          align: "center",
        },
        {
          title: "角色",
          key: "role",
          align: "center",
          render: (h, params) => {
            if (params.row.role == 1) {
              return h("label", "老师");
            } else {
              return h("label", "学员");
            }
          },
        },
        {
          title: "归还时间",
          key: "returnDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.returnDate, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "说明",
          key: "beizhu",
          align: "center",
        },
        {
          title: "经办人",
          key: "dostaffName",
          align: "center",
        },
        {
          title: "经办时间",
          key: "doDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.doDate, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        jieshuID: this.jieshuid,
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    borrowingRecordsListPage() {
      api.get("xwcloud-homeschool/homeschool/pxbooks/borrowingRecordsPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.borrowingRecordsListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.borrowingRecordsListPage();
    },
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
  },
  mounted: function () {
    // 初始化页面
    this.borrowingRecordsListPage();
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    jieshuid(val) {
      this.params.jieshuID = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        // 获取校区列表
        this.params.current = 1;
        this.params.size = 10;
        this.borrowingRecordsListPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
