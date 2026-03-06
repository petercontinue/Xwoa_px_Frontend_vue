<template>
  <Modal
    v-model="show"
    title="工资详细"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    :width="50"
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
  name: "getGongzixiangxiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    gongziID: {},
  },
  data() {
    return {
      columns6: [
        {
          title: "工资项目",
          key: "salaryStyle",
          align: "center",
        },
        {
          title: "金额",
          key: "salarymoney",
          align: "center",
          render: (h, params) => {
            const regMobile = /^-\d+$/;
            let state = "";
            if (params.row.isJiaOrJianOrQiuhe == 2) {
              if (regMobile.test(params.row.salarymoney)) {
                state = params.row.salarymoney;
              } else {
                state = -params.row.salarymoney;
              }
            } else if (params.row.isJiaOrJianOrQiuhe == 1) {
              state = params.row.salarymoney;
            }
            return h("label", state);
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        salaryID: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    getGongziminxiListData() {
      api.get("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/getGongziminxiList",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getGongziminxiListData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getGongziminxiListData();
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
    this.getGongziminxiListData();
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        // 获取校区列表
        this.params.salaryID = this.gongziID;
        this.getGongziminxiListData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
