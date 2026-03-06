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
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns6"
          :data="data"
          show-summary
          :summary-method="handleSummary"
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
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import EditgongzifenpeiForm from "@/components/caiwuManage/editgongzifenpeiForm.vue";
import Banjishoufeitongjixiangxi from "@/components/caiwuManage/banjishoufeitongjixiangxi.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Banjishoufeitongjixiangxi,
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
          title: "班主任",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班主任",
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
          title: "学员总数",
          key: "stuNum",
          align: "center",
        },
        {
          title: "一对一上课次数",
          key: "1v1kcNum",
          align: "center",
        },
        {
          title: "班课上课次数",
          key: "bankeNum",
          align: "center",
        },
        {
          title: "一对一课时数",
          key: "1v1keshiNum",
          align: "center",
        },
        {
          title: "班课课时数",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "一对一课耗金额",
          key: "1v1kehaoNum",
          align: "center",
        },
        {
          title: "班课课耗金额",
          key: "kehaoNum",
          align: "center",
        },
        {
          title: "课耗总金额",
          key: "total",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "424",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: null,
        staffName: null,
        datesoe: null,
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      showxiangxi: false,
      nianjiSum: "",
      datesoe: null,
    };
  },
  methods: {
    getBanzhurenPageData() {
      api
        .get("xwcloud-caiwu/shujutongji/kehao/getBanzhurenPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            this.nianjiSum = res.obj.countId;
            console.log(res);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getBanzhurenPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getBanzhurenPageData();
    },
    clickxiangxi(row) {
      this.selectobj = row;
      this.showxiangxi = true;
    },
    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 9) {
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
    clickShijian(onclicks) {
      if (onclicks == "derive()") {
        toolbox.exportExcel(
          "/xwcloud-caiwu/shujutongji/kehao/exportBanzhuren",
          {
            // qiyeID:this.$store.state.kehoupingjia.qiyeID,
          },
          "班主任课耗",
          this
        );
      }
    },
    search(type = null) {
      this.params.current = 1;
      this.params.size = 10;
      if (type == 1) {
        this.datesoe = null;
        this.params = {
          size: 10,
          current: 1,
          campusID: null,
          staffName: null,
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
      this.getBanzhurenPageData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getBanzhurenPageData();
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 532 })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
        }
      });
  },
};
</script>
