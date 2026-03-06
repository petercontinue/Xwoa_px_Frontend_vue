<template>
  <div>
    <Row>
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Divider type="vertical" />
        <span
          >按收益区间查询查询
          <Tooltip placement="bottom" max-width="300">
            <Icon type="md-help-circle" />
            <div slot="content">
              <div>温馨提示：</div>
              <div>&iquest;是指班课一个课时班级所有学员的课时学费总和。</div>
              <div>&iquest;该功能是帮我们查询出哪些班级是亏本的班级。</div>
            </div>
          </Tooltip>
          ：</span
        >
        <InputNumber v-model="params.small" :min="0"></InputNumber>
        <span>至</span>
        <InputNumber
          v-model="params.big"
          :min="params.small + 1"
          :active-change="false"
        ></InputNumber>
        <Button type="info" ghost @click="search(2)">查询</Button>
      </Col>
    </Row>
    <Alert show-icon style="margin: 24px 0">
      温馨提示：该功能是帮我们查询出哪些班级是亏本的班级；
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
    </Alert>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin: 24px 0">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
      </Col>
    </Row>
    <Row>
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
    <daochuClassPorfit v-model="deriveShow" :campusList="campusList"></daochuClassPorfit>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import daochuClassPorfit from "@/components/shujutongji/daochuClassPorfit";
import * as api from "@/api/api.js";

export default {
  name: "bankeshouyichaxun",
  components: {
    buttonsForm,
    daochuClassPorfit,
  },
  data() {
    return {
      menuID: "444",
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
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.params.campusID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "收益（元）",
          key: "priceSum",
          align: "center",
        },
        {
          title: "最后一次的上课日期",
          key: "endDate",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      params: {
        size: 10,
        current: 1,
        campusID: null,
        small: null,
        big: null,
      },
      campusList: [],
      deriveShow: false,
    };
  },
  methods: {
    getClassProfitList() {
      api.get("xwcloud-caiwu/shujutongji/other/getClassProfit",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          //   console.log(res);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getClassProfitList();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getClassProfitList();
    },
    clickShijian(onclicks) {
      //   console.log(onclicks);
      eval("this." + onclicks);
    },
    getCampusListData() {
      api.get("xwcloud-homeschool/homeschool/public/getCampusList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
          this.campusList.forEach((item) => {
            item.name = item.campusName;
          });
          //   console.log(this.campusList);
        }
      });
    },
    search(type = null) {
      this.params.current = 1;
      this.params.size = 10;
      if (type == 1) {
        this.params = {
          size: 10,
          current: 1,
          small: null,
          big: null,
        };
      }
      this.getClassProfitList();
    },
    derive() {
      //   console.log("derivederivederivederivederivederivederivederive");
      this.deriveShow = true;
    },
  },
  mounted() {
    this.getCampusListData();
    this.getClassProfitList();
  },
};
</script>

<style lang="" scoped></style>
