<template>
  <div>
    <Row>
      <Col span="12">
        <span>校区:</span>
        <Select v-model="params.campusID" placeholder="请选择" style="width: 68%">
          <Option v-for="item in campusList" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </Col>
      <Col span="12">
        <span>年份:</span>
        <DatePicker
          type="year"
          placeholder="请选择年份"
          v-model="params.year"
          style="width: 80%"
          @on-change="changeDate"
        ></DatePicker>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
      </Col>
    </Row>

    <daochuyinkuizongzhang
      v-model="daochuShow"
      fileName="盈亏总账"
    ></daochuyinkuizongzhang>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import daochuyinkuizongzhang from "@/components/caiwuManage/daochuyinkuizongzhang";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    daochuyinkuizongzhang,
  },
  data() {
    return {
      columns6: [
        {
          title: "类别",
          key: "shouzhiStyle",
          align: "center",
        },
        {
          title: "合计",
          key: "SUM",
          align: "center",
        },
        {
          title: "一月",
          key: "JAN",
          align: "center",
        },
        {
          title: "二月",
          key: "FEB",
          align: "center",
        },
        {
          title: "三月",
          key: "MAR",
          align: "center",
        },
        {
          title: "四月",
          key: "APR",
          align: "center",
        },
        {
          title: "五月",
          key: "MAY",
          align: "center",
        },
        {
          title: "六月",
          key: "JUN",
          align: "center",
        },
        {
          title: "七月",
          key: "JUL",
          align: "center",
        },
        {
          title: "八月",
          key: "AUG",
          align: "center",
        },
        {
          title: "九月",
          key: "SEP",
          align: "center",
        },
        {
          title: "十月",
          key: "OCT",
          align: "center",
        },
        {
          title: "十一月",
          key: "NOV",
          align: "center",
        },
        {
          title: "十二月",
          key: "DECE",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "351",
      total: 0,
      // 搜索参数
      params: {
        year: "",
        campusID: "",
      },
      daochuShow: false,
      campusList: [],
    };
  },
  methods: {
    ...mapActions(["getYinkuiList", "getallcampusList"]),

    getYinkuiListData() {
      api.get("xwcloud-caiwu/caiwu/liushui/getYinkuiList", this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
          console.log(this.data);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.getYinkuiListData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.getYinkuiListData();
    },
    changeDate(val) {
      this.params.year = toolbox.dateFtt(val, "yyyy");
      this.getYinkuiListData();
    },
    search() {
      this.getYinkuiListData();
    },
    clickShijian(onclicks) {
      if (onclicks == "derive()") {
        // this.Onderive();
      }
    },
    Onderive() {
      this.daochuShow = true;
    },
  },
  mounted: function () {
    // 初始化页面
    this.params.year = toolbox.dateFtt(new Date(), "yyyy");
    this.getYinkuiListData();

    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
        }
      });
  },
  watch: {
    "params.campusID"(val) {
      this.params.year = toolbox.dateFtt(new Date(), "yyyy");
      this.getYinkuiListData();
    },
  },
};
</script>
