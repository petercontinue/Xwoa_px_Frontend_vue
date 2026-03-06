<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Divider type="vertical" />
        <span>按起止日期查询</span>
        <Date-picker
          v-model="datesoe"
          type="daterange"
          placeholder="选择日期"
          style="width: 200px"
          @on-change="search(2)"
        ></Date-picker>
        <Divider type="vertical" />
        <Button type="primary" ghost @click="exportT">导出</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns6"
          show-summary
          :summary-method="handleSummary"
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
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import * as api from "@/api/api.js";

export default {
  name: "anbuxifangshi",
  props: {
    type: {},
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
          title: "教师名称",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "教师名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.staffName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "补习方式",
          key: "buxiStyleName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "补习方式",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.buxiStyleName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课时数",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "课耗收入",
          key: "kehao",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: "1",
        campusID: "",
        staffName: "",
        buxiStyleName: "",
        datesoe: null,
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
      campusList: [],
      nianjiSum: "",
      datesoe: null,
    };
  },
  methods: {
    getBuxiStylePageData() {
      api.get("xwcloud-caiwu/shujutongji/kehao/getBuxiStylePage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.nianjiSum = res.obj.countId;
          // console.log(this.data);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getBuxiStylePageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getBuxiStylePageData();
    },
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 4) {
          sums[key] = {
            key,
            value: "合计:" + this.nianjiSum,
          };
          return;
        } else {
          sums[key] = {
            key,
            value: "",
          };
          return;
        }
      });

      return sums;
    },
    search(type = null) {
      this.params.current = 1;
      this.params.size = 10;
      if (type == 1) {
        this.datesoe = null;
        this.params = {
          size: 10,
          current: 1,
          campusID: "",
          staffName: "",
          buxiStyleName: "",
          datesoe: null,
        };
      } else if (type == 2) {
        if (this.datesoe) {
          this.params.datesoe =
            toolbox.dateFtt(this.datesoe[0], "yyyy-MM-dd") +
            "_" +
            toolbox.dateFtt(this.datesoe[1], "yyyy-MM-dd");
          // console.log(this.params.datesoe);
        }
      }
      this.getBuxiStylePageData();
    },
    getCampusListData() {
      api.get("xwcloud-homeschool/homeschool/public/getCampusList",{
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
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
    exportT() {
      toolbox.exportExcel(
        "/xwcloud-caiwu/shujutongji/kehao/exportBuxiStylePage",
        this.params,
        "教师课耗按补习方式统计导出",
        this,
        false
      );
    },
  },
  mounted: function () {
    // 初始化页面
    this.params.moneyStyle = this.type;
    this.data = [];
    this.getBuxiStylePageData();
    this.getCampusListData();
  },
};
</script>
