<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <!-- <Divider type="vertical" /> -->
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
import datesearchyearmonthForm from "@/components/common-buttons/datesearchyearmonthForm";
import * as api from "@/api/api.js";

export default {
  name: "xiaoquyuejunkehao",
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
          title: "年月",
          key: "Ym",
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
                    // let ym = value.split("-");
                    this.params.Ym = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "员工",
          key: "staffName",
          align: "center",
        },
        {
          title: "教师个人上课班级数",
          key: "classNum",
          align: "center",
        },
        {
          title: "教师个人的学员数",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "教师学员总课时数",
          key: "TkeshiNum",
          align: "center",
          render(h, params) {
            if (params.row.TkeshiNum) {
              return h("div", params.row.TkeshiNum);
            } else {
              return h("div", 0);
            }
          },
        },
        {
          title: "教师个人课时数",
          key: "tkeshiNum",
          align: "center",
          render(h, params) {
            if (params.row.tkeshiNum) {
              if (params.row.tkeshiNum) {
                return h("div", params.row.tkeshiNum);
              } else {
                return h("div", 0);
              }
            }
          },
        },
        {
          title: "班级月均课耗=教师个人课时数/教师个人上课班级数",
          key: "stuyuejun",
          align: "center",
          render(h, params) {
            if (params.row.stuyuejun) {
              return h("div", params.row.stuyuejun);
            } else {
              return h("div", 0);
            }
          },
        },
        {
          title: "课时收入（元）",
          key: "keshishouru",
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
        Ym: "",
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
      campusList: [],
      nianjiSum: "",
    };
  },
  methods: {
    getJiaoshiyuejunkehaoPageData() {
      api.get("xwcloud-caiwu/shujutongji/kehao/getJiaoshiyuejunkehaoPage",this.params).then((res) => {
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
      this.getJiaoshiyuejunkehaoPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getJiaoshiyuejunkehaoPageData();
    },
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 8) {
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
        this.params = {
          size: 10,
          current: "1",
          campusID: "",
          Ym: "",
        };
      }
      this.getJiaoshiyuejunkehaoPageData();
    },
    getCampusListData() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: "425" }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
        }
      });
    },
  },
  mounted: function () {
    // 初始化页面
    this.params.moneyStyle = this.type;
    this.data = [];
    this.getJiaoshiyuejunkehaoPageData();
    this.getCampusListData();
  },
};
</script>
