<template>
  <div>
    <Row style="margin-bottom:24px;">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <!-- <Divider type="vertical" /> -->
      </Col>
    </Row>
    <Table
      border
      ref="selection"
      :columns="columns6"
      :data="data"
      :span-method="handleSpan"
    ></Table>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearRangeForm from "@/components/common-buttons/datesearchyearRangeForm";
import * as api from "@/api/api.js";

export default {
  name: "kehaoshourutongjibuanbi",
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
          render: (h, params) => {
            if (this.params.campusID != "") {
              return h("div", params.row.campusName);
            } else {
              return h("div", "总校区");
            }
          },
        },
        {
          title: "年份",
          key: "tyear",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchyearRangeForm, {
                props: {
                  showArrow: false,
                  content: "年",
                },
                on: {
                  "on-clickSearch": (searchDateS, searchDateE) => {
                    // console.log(searchDateS, searchDateE)
                    if (searchDateS && searchDateE) {
                      this.params.startDate = searchDateS;
                    this.params.endDate = searchDateE;
                    this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "1月",
          key: "JAN",
          align: "center",
        },
        {
          title: "2月",
          key: "FEB",
          align: "center",
        },
        {
          title: "3月",
          key: "MAR",
          align: "center",
        },
        {
          title: "4月",
          key: "APR",
          align: "center",
        },
        {
          title: "5月",
          key: "MAY",
          align: "center",
        },
        {
          title: "6月",
          key: "JUN",
          align: "center",
        },
        {
          title: "7月",
          key: "JUL",
          align: "center",
        },
        {
          title: "8月",
          key: "AUG",
          align: "center",
        },
        {
          title: "9月",
          key: "SEP",
          align: "center",
        },
        {
          title: "10月",
          key: "OCT",
          align: "center",
        },
        {
          title: "11月",
          key: "NOV",
          align: "center",
        },
        {
          title: "12月",
          key: "DECE",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        moneyStyle: 1,
        campusID: "",
        startDate: null,
        endDate: null,
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
      campusList: [],
    };
  },
  methods: {
    getKehaotongbihuanbiData() {
      api.get("xwcloud-caiwu/shujutongji/kehao/getKehaotongbihuanbi",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
          // console.log(this.data);
        }
      });
    },
    search(type = null) {
      this.params.current = 1;
      this.params.size = 10;
      if (type == 1) {
        this.params = {
          moneyStyle: 1,
          campusID: "",
          startDate: null,
          endDate: null,
        };
      }
      this.getKehaotongbihuanbiData();
    },
    handleSpan({ row, column, rowIndex, columnIndex }) {
      if (this.params.campusID == "") {
        if (rowIndex === 0 && columnIndex === 0) {
          return [this.data.length, 1];
        } else if (rowIndex > 0 && columnIndex == 0) {
          return [0, 0];
        }
      } else {
        return [1, 1];
      }
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
    this.getKehaotongbihuanbiData();
    this.getCampusListData();
  },
};
</script>
