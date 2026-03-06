<template>
  <Modal
    v-model="show"
    title="查看点赞信息"
    :mask-closable="false"
    :footer-hide="true"
    @on-cancel="closeModal(false)"
    width="40"
  >
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="colData"
          :data="tableData"
        ></Table>
      </Col>
    </Row>
    <Row style="margin-top: 15px">
      <Page
        :total="total"
        show-elevator
        show-total
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
  name: "goodsDetail",
  props: {
    value: { type: Boolean, default: false },
    dongtaiID: { type: String, default: null },
  },
  data() {
    return {
      show: this.value,
      colData: [
        {
          title: "点赞用户昵称",
          key: "nickName",
          align: "center",
        },
        {
          title: "点赞时间",
          key: "dianzangDatetime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                toolbox.dateFtt(
                  params.row.dianzangDatetime,
                  "yyyy-MM-dd hh:mm:ss"
                )
              ),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        dongtaiID: "",
      },
    };
  },
  methods: {
    ...mapActions(["GetAlldianzanPages"]),
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    GetAlldongtaidianzanPages() {
      this.GetAlldianzanPages(this.searchObj).then((res) => {
        if ((res.code = "success")) {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.tableData.current = current;
      this.GetAlldongtaidianzanPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.tableData.size = pageSize;
      this.GetAlldongtaidianzanPages();
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      if (!val) {
        this.closeModal(val);
      }
    },
    dongtaiID(val) {
      this.searchObj.dongtaiID = val;
      this.GetAlldongtaidianzanPages();
    },
  },
};
</script>

<style lang="" scoped>
</style>