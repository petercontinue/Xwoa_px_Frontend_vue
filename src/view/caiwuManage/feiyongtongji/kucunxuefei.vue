<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
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
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
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
          title: "在读库存学费(单位:元)",
          key: "zaidu",
          align: "center",
        },
        {
          title: "停课1-2个月学员库存学费(单位：元)",
          key: "ergy",
          align: "center",
        },
        {
          title: "停课3-5个月学员库存学费(单位：元)",
          key: "swgy",
          align: "center",
        },
        {
          title: "停课6个月以上学员库存学费(单位：元)",
          key: "liugy",
          align: "center",
        },
        {
          title: "总库存学费(单位：元)",
          key: "remainXuefei",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "334",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        salaryStyle: "",
        isJia: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      showxiangxi: false,
      selectobj: "",
    };
  },
  methods: {
    getKucunxuefeiData() {
      api
        .get("xwcloud-caiwu/caiwu/tongji/kucunxuefei/getKucunxuefei", this.params)
        .then((res) => {
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
      this.getKucunxuefeiData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getKucunxuefeiData();
    },
    clickxiangxi(row) {
      this.selectobj = row;
      this.showxiangxi = true;
    },
    clickShijian(onclicks) {},
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getKucunxuefeiData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getKucunxuefeiData();
  },
};
</script>
