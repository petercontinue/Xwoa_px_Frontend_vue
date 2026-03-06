<template>
  <div>
    <Row>
      <Col span="18">
        <div style="float: left">
          <span>快捷查询：</span>
          <Button type="info" ghost @click="searchAll()">全部</Button>
          <Divider type="vertical" />
          <span>按起止日期查询</span>
          <Date-picker
            v-model="datesoe"
            type="daterange"
            placeholder="选择日期"
            style="width: 200px"
            @on-change="search(1)"
          ></Date-picker>
          <Divider type="vertical" />
        </div>
        <Alert style="float: left" show-icon>
          <Icon type="ios-bulb-outline" slot="icon"></Icon>
          续费率：上过学生数里面续费的次数除以上过的学生数</Alert
        >
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
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
  },
  data() {
    return {
      columns6: [
        // {
        //   title: "选择操作",
        //   align: "center",
        //   key: "checkBox",
        //   width: "100",
        //   render: (h, params) => {
        //     return h("div", [
        //       h("Checkbox", {
        //         props: {
        //           value: params.row.checkBox,
        //         },
        //         on: {
        //           "on-change": (e) => {
        //             this.data.forEach((items) => {
        //               //先取消所有对象的勾选，checkBox设置为false
        //               this.$set(items, "checkBox", false);
        //             });
        //             this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
        //           },
        //         },
        //       }),
        //     ]);
        //   },
        // },
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
          title: "科目",
          key: "subjectName",
          align: "center",

          render: (h, params) => {
            if (!params.row.subjectName) {
              return h("label", "-");
            } else {
              return h("label", params.row.subjectName);
            }
          },
        },
        {
          title: "人数",
          key: "stunum",
          align: "center",
        },
        {
          title: "续费率",
          key: "xfnum",
          align: "center",
          render: (h, params) => {
            if (params.row.xfnum == undefined) {
              return h("div", 0);
            } else {
              let xfl = Number(params.row.xfnum) / Number(params.row.stunum);
              return h("div", xfl);
            }
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "416",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        datesoe: null,
        campusID: 0,
        staffName: "",
        type: null,
      },
      campusList: [],
      datesoe: null,
    };
  },
  methods: {
    getRenewPageData() {
      api.get("xwcloud-caiwu/shujutongji/xvfei/getRenewPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          console.log(this.data);
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getRenewPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getRenewPageData();
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
    clickShijian() {},
    searchAll() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.datesoe = null;
      this.params.campusID = 0;
      this.params.staffName = "";
      this.params.type = 0;
      this.getRenewPageData();
    },
    search(type = 0) {
      this.params.type = type;
      if (type == 0) {
        this.params.datesoe = null;
        this.params.type = 0;
      } else if (type == 1) {
        if (this.datesoe) {
          this.params.datesoe =
            toolbox.dateFtt(this.datesoe[0], "yyyy-MM-dd") +
            "_" +
            toolbox.dateFtt(this.datesoe[1], "yyyy-MM-dd");
        }
      }
      console.log(this.params);
      this.getRenewPageData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getRenewPageData();
    this.getCampusListData();
  },
};
</script>
