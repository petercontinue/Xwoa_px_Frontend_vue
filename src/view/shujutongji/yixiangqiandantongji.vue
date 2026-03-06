<template>
  <div>
    <Row>
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(0)">全部</Button>
        <Button type="success" ghost @click="search(1)">本月统计</Button>
        <Button type="warning" ghost @click="search(2)">下月统计</Button>
        <Divider type="vertical" />
        <span>按起止日期统计</span>
        <Date-picker
          v-model="datesoe"
          type="daterange"
          placeholder="选择日期"
          style="width: 200px"
          @on-change="search(3)"
        ></Date-picker>
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <yixiangqiandanxiangxi
      v-model="showxiangxi"
      :yixiangObj="selectobj"
    ></yixiangqiandanxiangxi>
    <daochuyixiangqiandantongji
      v-model="showdaochu"
    ></daochuyixiangqiandantongji>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import Yixiangqiandanxiangxi from "../../components/shujutongji/yixiangqiandanxiangxi.vue";
import Daochuyixiangqiandantongji from "../../components/shujutongji/daochuyixiangqiandantongji.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Yixiangqiandanxiangxi,
    Daochuyixiangqiandantongji,
  },
  data() {
    return {
      columns6: [
        {
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width: "100",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.data.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
              }),
            ]);
          },
        },
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
          title: "教师姓名",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "教师姓名",
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
          title: "人数",
          key: "stuNum",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  color: "blue",
                },
                on: {
                  click: () => {
                    this.clickShuju(params.row);
                  },
                },
              },
              params.row.stuNum
            );
          },
        },
        {
          title: "业绩",
          key: "qianDanMoney",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "412",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        staffName: "",
        startDate: "",
        endDate: "",
        type: null,
        datesoe: null,
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      datesoe: null,
      campusList: [],
      showxiangxi: false,
      selectobj: "",
      showdaochu: false,
    };
  },
  methods: {
    getYixiangPageData() {
      api.get("xwcloud-caiwu/shujutongji/yixiang/getYixiangPage",this.params).then((res) => {
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
      this.getYixiangPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getYixiangPageData();
    },
    clickShijian(onclicks) {
      let IDs = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          IDs += items.id + ",";
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "derive()":
          this.showdaochu = true;
          break;
      }
    },
    clickShuju(row) {
      this.selectobj = row;
      this.showxiangxi = true;
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
    search(type = -1) {
      this.params.type = type;
      if (type == 0) {
        this.params = {
          size: 10,
          current: 1,
          campusID: "",
          staffName: "",
          startDate: "",
          endDate: "",
          type: 0,
          datesoe: null,
        };
      } else if (type == 3) {
        if (this.datesoe) {
          this.params.datesoe =
            toolbox.dateFtt(this.datesoe[0], "yyyy-MM-dd") +
            "_" +
            toolbox.dateFtt(this.datesoe[1], "yyyy-MM-dd");
          // console.log(this.params.datesoe);
        }
      }
      // this.params.current = 1;
      // this.params.size = 10;
      this.getYixiangPageData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getYixiangPageData();
    this.getCampusListData();
  },
};
</script>
