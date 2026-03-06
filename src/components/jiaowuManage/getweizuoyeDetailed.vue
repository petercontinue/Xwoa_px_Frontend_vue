<template>
  <Modal
    v-model="show"
    title="作业详细"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
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
  name: "editweizuoye",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    zuoyeid: {
      type: String, // 父页面传来的值
      default: "",
    },
  },
  data() {
    return {
      columns6: [
        {
          title: "学员名称",
          key: "stuName",
          align: "center",
        },
        {
          title: "交作业时间",
          key: "jiaozuoyeDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (
              params.row.jiaozuoyeDateTime != "" ||
              params.row.jiaozuoyeDateTime != null
            ) {
              datehave = toolbox.dateFtt(
                params.row.jiaozuoyeDateTime,
                "yyyy-MM-dd"
              );
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "备注",
          key: "beizhu",
          align: "center",
        },
        {
          title: "附件",
          key: "otherFile",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "273",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        Id: "",
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    getZuoyeListPage() {
      api.get("xwcloud-homeschool/homeschool/pxzuoyetable/getZuoyeDetaile",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(this.data);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getZuoyeListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getZuoyeListPage();
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
    this.getZuoyeListPage();
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    zuoyeid(val) {
      this.params.Id = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        // 获取校区列表
        this.params.current = 1;
        this.params.size = 10;
        this.getZuoyeListPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
