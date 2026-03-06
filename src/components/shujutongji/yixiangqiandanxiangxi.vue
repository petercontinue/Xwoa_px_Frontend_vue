<template>
  <Modal
    v-model="show"
    title="意向签单详细"
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
  name: "yixiangqiandanxiangxi",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    yixiangObj: {},
  },
  data() {
    return {
      columns6: [
        {
          title: "学员姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "签单金额",
          key: "qianDanMoney",
          align: "center",
        },
        {
          title: "签单类型",
          key: "isBaomingOrChongzhi",
          align: "center",

          render: (h, params) => {
            let state = "";
            switch (params.row.isBaomingOrChongzhi) {
              case 1:
                state = "报名";
                break;
              case 2:
                state = "充值";
                break;
              default:
                state = "-";
                break;
            }
            return h("label", state);
          },
        },
        {
          title: "签单时间",
          key: "yxQiandanDateTime",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              toolbox.dateFtt(params.row.yxQiandanDateTime, "yyyy-MM-dd hh:mm:ss")
            );
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        campusID: "",
        staffID: "",
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    getYixiangDetailData() {
      api.get("xwcloud-caiwu/shujutongji/yixiang/getYixiangDetail",this.params).then((res) => {
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
      this.getYixiangDetailData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getYixiangDetailData();
    },
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
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
        this.params.campusID = this.yixiangObj.campusID;
        this.params.staffID = this.yixiangObj.yxQiandanRenID;
        this.getYixiangDetailData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
