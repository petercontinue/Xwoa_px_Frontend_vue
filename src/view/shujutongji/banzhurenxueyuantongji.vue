<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
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
    <banzhurenxueyuanxiangxi
      v-model="showxiangxi"
      :xiangxiObj="selectobj"
    ></banzhurenxueyuanxiangxi>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import Banzhurenxueyuanxiangxi from "../../components/shujutongji/banzhurenxueyuanxiangxi.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Banzhurenxueyuanxiangxi,
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
                  content: "教师姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.teacherName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学生人数",
          key: "stuNum",
          align: "center",
        },
        {
          title: "详情",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.clickxiangxi(params.row);
                  },
                },
              },
              "详细"
            );
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "433",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: 0,
        teacherName: "",
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      campusList: [],
      selectobj: "",
      showxiangxi: false,
    };
  },
  methods: {
    getBanzhurenStuData() {
      api
        .get("xwcloud-caiwu/shujutongji/renshu/getBanzhurenStu", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            // console.log(this.data);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getBanzhurenStuData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getBanzhurenStuData();
    },
    getCampusListData() {
      api
        .get("xwcloud-homeschool/homeschool/public/getCampusList", {
          // qiyeID: this.$store.state.kehoupingjia.qiyeID,
        })
        .then((res) => {
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
    clickxiangxi(row) {
      // console.log(row);
      this.selectobj = row;
      this.showxiangxi = true;
    },
    search(type = null) {
      this.params.current = 1;
      this.params.size = 10;
      if (type == 1) {
        this.params = {
          size: 10,
          current: 1,
          campusID: 0,
          teacherName: "",
        };
      }
      this.getBanzhurenStuData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getBanzhurenStuData();
    this.getCampusListData();
  },
};
</script>
