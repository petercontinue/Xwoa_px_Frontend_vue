<template>
  <div>
    <Row>
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="info" ghost @click="search(2)">本月教师排课统计</Button>
        <Button type="info" ghost @click="search(3)">下月教师排课统计</Button>
        <span>按起止日期查询</span>
        <Date-picker
          v-model="datesoe"
          type="daterange"
          placeholder="选择日期"
          style="width: 200px"
          @on-change="search(4)"
        ></Date-picker>
        <Divider type="vertical" />
      </Col>
    </Row>
    <Row>
      <Col span="24">
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
            show-sizer
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          />
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import { ChartPie, ChartBar } from "@/components/charts";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import * as api from "@/api/api.js";

export default {
  name: "xueshengpaiketongji",
  components: {
    buttonsForm,
    ChartPie,
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
          title: "姓名",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "姓名",
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
          title: "排课总课时",
          key: "paikeNum",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      params: {
        size: 10,
        current: 1,
        campusID: "",
        gradeID: "",
        stuName: "",
        startDate: "",
        endDate: "",
          type:null,
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      datesoe: null,
    };
  },
  methods: {
    getTeacherpaikePageData() {
      api.get("xwcloud-caiwu/shujutongji/paike/getTeacherpaikePage",this.params).then((res) => {
        this.data = res.obj.records;
        this.total = Number(res.obj.total);
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getTeacherpaikePageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getTeacherpaikePageData();
    },
    search(type = null) {
      this.params.current = 1;
      this.params.size = 10;
      this.params.type = type;
      if (type == 1) {
        this.datesoe = null;
        this.params = {
        size: 10,
        current: 1,
        campusID: "",
        gradeID: "",
        stuName: "",
        startDate: "",
        endDate: "",
          type:null,
        };
      } else if (type == 4) {
        if (this.datesoe) {
          this.params.startDate = toolbox.dateFtt(
            this.datesoe[0],
            "yyyy-MM-dd"
          );
          this.params.endDate = toolbox.dateFtt(this.datesoe[1], "yyyy-MM-dd");

          // console.log(this.params.datesoe);
        }
      }
      this.getTeacherpaikePageData();
    },
    clickShijian() {},
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
  },
  mounted: function () {
    // 初始化页面
    this.getTeacherpaikePageData();
    this.getCampusListData();
  },
};
</script>

<style>
</style>