<template>
  <Modal
    v-model="show"
    title="固定资产报废记录"
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
      <Button type="primary" @click="closeModal(false)">关闭</Button>
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
          title: "选择操作",
          align: "center",
          key: "checkBox",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.data.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "名称",
          key: "assetsName",
          align: "center",
        },
        {
          title: "类别",
          key: "styleName",
          align: "center",
        },
        {
          title: "数量",
          key: "num",
          align: "center",
        },
        {
          title: "备注",
          key: "beizhu",
          align: "center",
        },
        {
          title: "经办人",
          key: "jinbanStaffName",
          align: "center",
        },
        {
          title: "添加时间",
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
    ok() {},
    getAssetAddRecordsList() {
      api.get("/xwcloud-sys/sys/pxassets/getAssetOutRecords",{
        size: this.size,
        current: this.current,
        ID: JSON.parse(this.editdata).id,
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
        console.log(JSON.parse(this.editdata));
        this.getAssetAddRecordsList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
