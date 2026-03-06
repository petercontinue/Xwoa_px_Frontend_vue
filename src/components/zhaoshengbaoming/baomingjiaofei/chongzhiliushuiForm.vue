<template>
  <Modal
    v-model="show"
    title="学员充值详情"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns"
          :data="data"
        ></Table>
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
import * as api from "@/api/api.js";

export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      columns: [
        {
          title: "变动金额",
          key: "money",
          align: "center",
        },
        {
          title: "赠送金额",
          key: "zengsongMoney",
          align: "center",
        },
        {
          title: "剩余总额",
          key: "remainChongzhi",
          align: "center"
        },
        {
          title: "业绩人",
          key: "yejistaffName",
          align: "center",
        },
        {
          title: "备注",
          key: "beizhu",
          align: "center",
          width: 400,
        },
        {
          title: "经办时间",
          key: "addTime",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
    };
  },
  methods: {
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      this.current = current;
      this.Getallchongzhixiangqing();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.Getallchongzhixiangqing();
    },
    onSearch(search) {
      window.console.log(search);
    },
    Getallchongzhixiangqing() {
      api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetUserChongzhixiangqingPages",{
        size: this.size,
        current: this.current,
        stuID: this.stuID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.Getallchongzhixiangqing();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
