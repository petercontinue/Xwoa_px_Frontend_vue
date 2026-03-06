<template>
  <Modal
    v-model="show"
    title="收入详细"
    footer-hide
    :width="1000"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Tabs value="name1">
      <TabPane label="课程费明细" name="name1">
        <Row style="margin-top: 20px">
          <Col span="24">
            <Table
              border
              ref="selection"
              :columns="columns6"
              :data="data"
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
      </TabPane>
      <TabPane label="杂费明细" name="name2">
        <Row style="margin-top: 20px">
          <Col span="24">
            <Table
              border
              ref="selection"
              :columns="zafei"
              :data="zafeidata"
            ></Table>
          </Col>
        </Row>
        <Row style="margin-top: 15px">
          <Page
            :total="zafeitotal"
            show-elevator
            show-total
            prev-text="上一页"
            next-text="下一页"
            @on-change="zafeichangePage"
            @on-page-size-change="zafeichangePageSize"
          />
        </Row>
      </TabPane>
      <TabPane label="商品明细" name="name3">
        <Row style="margin-top: 20px">
          <Col span="24">
            <Table
              border
              ref="selection"
              :columns="shanping"
              :data="shanpingdata"
            ></Table>
          </Col>
        </Row>
        <Row style="margin-top: 15px">
          <Page
            :total="shanpingtotal"
            show-elevator
            show-total
            prev-text="上一页"
            next-text="下一页"
            @on-change="shangpingchangePage"
            @on-page-size-change="shangpingchangePageSize"
          />
        </Row>
      </TabPane>
    </Tabs>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "shourumingxi",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    liushuiID: {},
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
          title: "姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "单科总价:元",
          key: "zongjia",
          align: "center",
        },
        {
          title: "购买课时",
          key: "buykeshiNum",
          align: "center",
        },
        {
          title: "实际单价:元",
          key: "kechengprice",
          align: "center",
        },
        {
          title: "原单价:元",
          key: "originalprice",
          align: "center",
        },
      ],
      zafei: [
        {
          title: "ID",
          key: "id",
          align: "center",
        },
        {
          title: "费用名称",
          key: "otherMoneyName",
          align: "center",
        },
        {
          title: "金额:元",
          key: "zongMoney",
          align: "center",
        },
      ],
      shanping: [
        {
          title: "商品名称",
          key: "Name",
          align: "center",
        },
        {
          title: "商品单价",
          key: "BuyPrice",
          align: "center",
        },
        {
          title: "购买数量",
          key: "BuySum",
          align: "center",
        },
        {
          title: "商品总价",
          key: "SumMoney",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      zafeidata: [],
      shanpingdata: [],
      total: 0,
      zafeitotal: 0,
      shanpingtotal: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        liushuiID: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      zafeiparams: {
        size: 10,
        current: 1,
        liushuiID: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      shangpingparams: {
        size: 10,
        current: 1,
        liushuiID: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    getDetailedIncomeDetailsList() {
      api.get("xwcloud-caiwu/caiwu/tongji/yejipaiming/getDetailedIncomeDetails",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    getDetailedZafeiDetailsPageList() {
      api.get("xwcloud-caiwu/caiwu/tongji/yejipaiming/getDetailedZafeiDetailsPage",this.zafeiparams).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.zafeidata = res.obj.records;
          this.zafeitotal = Number(res.obj.total);
        }
      });
    },
    getDetailedShangpingDetailsPageList() {
      api.get("xwcloud-caiwu/caiwu/tongji/yejipaiming/getDetailedShangpingDetailsPage",this.shangpingparams).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.shanpingdata = res.obj.records;
          this.shanpingtotal = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getDetailedIncomeDetailsList();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getDetailedIncomeDetailsList();
    },
    zafeichangePage(current) {
      // 翻页
      this.params.current = current;
      this.getDetailedZafeiDetailsPageList();
    },
    zafeichangePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getDetailedZafeiDetailsPageList();
    },
    shangpingchangePage(current) {
      // 翻页
      this.params.current = current;
      this.getDetailedShangpingDetailsPageList();
    },
    shangpingchangePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getDetailedShangpingDetailsPageList();
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
        this.params.liushuiID = this.liushuiID;
        this.zafeiparams.liushuiID = this.liushuiID;
        this.shangpingparams.liushuiID = this.liushuiID;
        this.getDetailedIncomeDetailsList();
        this.getDetailedZafeiDetailsPageList();
        this.getDetailedShangpingDetailsPageList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
