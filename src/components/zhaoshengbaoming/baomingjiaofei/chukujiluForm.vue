<template>
  <Modal
    v-model="show"
    title="入库记录"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="80"
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
    <div slot="footer">
      <Button type="primary" @click="ok()">关闭</Button>
    </div>
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
    suppliesID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      columns: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "名称",
          key: "name",
          align: "center",
        },
        {
          title: "类别",
          key: "typeName",
          align: "center",
        },
        {
          title: "规格",
          key: "specs",
          align: "center",
        },
        {
          title: "出库前数量",
          key: "stockNum",
          align: "center",
        },
        {
          title: "出库数量",
          key: "outNum",
          align: "center",
        },
        {
          title: "出库后数量",
          key: "outNum",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.stockNum - params.row.outNum),
            ]);
          },
        },
        {
          title: "数量单位",
          key: "stockUnit",
          align: "center",
        },
        {
          title: "出库说明",
          key: "outReason",
          align: "center",
        },
        {
          title: "出库时间",
          key: "outDate",
          align: "center",
        },
        {
          title: "领用人",
          key: "staffName",
          align: "center",
        },
        {
          title: "出库经办人",
          key: "ystaffName",
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
      api.get("xwcloud-zsbm/zsbm/JinXiaoCun/outTeachingSuppliesJilu",{
        size: this.size,
        current: this.current,
        suppliesID: this.suppliesID == "" ? 0 : this.suppliesID,
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
