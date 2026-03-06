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
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
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
    <daochuKemuShoufei
      v-model="deriveShow"
      :campusList="campusList"
      :subjectList="subjectList"
    ></daochuKemuShoufei>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import daochuKemuShoufei from "@/components/shujutongji/daochuKemuShoufei";
import * as api from "@/api/api.js";

export default {
  name: "subjectShouFeitongji",
  components: {
    daochuKemuShoufei,
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
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    this.params.campusID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "科目",
                  data: this.subjectList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    this.params.subjectID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "一对一收费金额",
          key: "money1v1",
          align: "center",
        },
        {
          title: "非一对一收费金额",
          key: "moneyNvN",
          align: "center",
        },
        {
          title: "收费总额",
          key: "moneyCount",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        subjectID: "",
        datesoe: null,
      },
      campusList: [],
      subjectList: [],
      datesoe: null,
      deriveShow: false,
    };
  },
  methods: {
    getKemuShoufeiTongjiList() {
      api.get("xwcloud-caiwu/shujutongji/other/getKemuShoufeiTongji",this.params).then((res) => {
        if (res.code == "success") {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          // console.log(this.data);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getKemuShoufeiTongjiList();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getKemuShoufeiTongjiList();
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
          subjectID: "",
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
      this.getKemuShoufeiTongjiList();
    },
    getCampusListData() {
      api.get("xwcloud-homeschool/homeschool/public/getCampusList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // 获取班级列表
          this.campusList = res.obj;
          this.campusList.forEach((item) => {
            item.name = item.campusName;
          });
        }
      });
    },
    getSubjectList() {
      api.get("xwcloud-caiwu/shujutongji/other/getSubject",{}).then((res) => {
        if (res.code == "success") {
          // console.log(res)
          this.subjectList = res.obj;
        }
      });
    },
    exportT() {
      this.deriveShow = true;
    },
  },
  mounted: function () {
    this.getKemuShoufeiTongjiList();
    this.getCampusListData();
    this.getSubjectList();
  },
};
</script>
