<template>
  <div>
    <Card>
      <p slot="title">年度校区业绩排名</p>
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
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import * as api from "@/api/api.js";

export default {
  name: "nianduxiaoquyejipaiming",
  data() {
    return {
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "年",
          key: "yearstr",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchyearForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.year = value;
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
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        year: ""
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    ...mapActions(["getCampusYearPage"]),
    getCampusYearPageData() {
      api.get("xwcloud-caiwu/caiwu/tongji/yejipaiming/getCampusYearPage",this.params).then((res) => {
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
      this.getCampusYearPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getCampusYearPageData();
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getCampusYearPageData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getCampusYearPageData();
  },
};
</script>
