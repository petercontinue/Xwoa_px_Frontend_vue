<template>
  <div>
    <Card>
      <p slot="title">月度个人业绩排名</p>
      <Table border ref="selection" :columns="columns6" :data="data"></Table>
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
    </Card>
    <yuedugerenyejixiangxi v-model="showyejixiangxi" :yejixiangxi="selectObj"></yuedugerenyejixiangxi>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import datesearchyearmonthForm from "@/components/common-buttons/datesearchyearmonthForm";
import Yuedugerenyejixiangxi from "./yuedugerenyejixiangxi.vue";
import * as api from "@/api/api.js";

export default {
  name: "yuedugerenyejipaiming",
  components: {
    Yuedugerenyejixiangxi,
  },
  data() {
    return {
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.campusID = value;
                      this.search();
                    } else {
                      this.params.campusID = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "岗位",
          key: "staffpostName",
          align: "center",
        },
        {
          title: "个人",
          key: "staffName",
          align: "center",
        },
        {
          title: "年",
          key: "liushuidate",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchyearmonthForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年月",
                },
                on: {
                  "on-clickSearch": (value) => {
                    let ym = value.split("-");
                    this.params.year = ym[0];
                    this.params.month = ym[1];
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "业绩(单位:元)",
          key: "yeji",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.clickShuju(params.row);
                  },
                },
              },
              params.row.yeji
            );
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        year: "",
        month: "",
        campusID: ""
      },
      show: this.value, // 父页面传来的值
      loading: true,
      showyejixiangxi: false,
      campusList: [],
      selectObj: {},
    };
  },
  methods: {
    getGerenMonthPageData() {
      api.get("xwcloud-caiwu/caiwu/tongji/yejipaiming/getGerenMonthPage",this.params).then((res) => {
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
      this.getGerenMonthPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getGerenMonthPageData();
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getGerenMonthPageData();
    },
    clickShuju(row) {
      console.log(row);
      this.showyejixiangxi = true;
      this.selectObj = row;
    },
    getCampusListData() {
      api.get("xwcloud-homeschool/homeschool/public/getCampusList",{
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // 获取班级列表
          this.campusList = res.obj;
          this.campusList.forEach((item) => {
            item.name = item.campusName;
          });
        }
      });
    },
  },
  mounted: function () {
    // 初始化页面
    this.getGerenMonthPageData();
    this.getCampusListData();
  },
};
</script>
