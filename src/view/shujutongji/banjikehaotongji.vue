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
    <banjikehaotongjixiangxi
      v-model="showxiangxi"
      :xiangxiObj="selectobj"
    ></banjikehaotongjixiangxi>
    <daochubanji v-model="showdaochu"></daochubanji>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import Banjikehaotongjixiangxi from "../../components/shujutongji/banjikehaotongjixiangxi.vue";
import Daochubanji from "../../components/shujutongji/daochubanji.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Banjikehaotongjixiangxi,
    Daochubanji,
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
          title: "班级名称",
          key: "className",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班级名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.banjiName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "收费",
          key: "zongjia",
          align: "center",
          render: (h, params) => {
            if (params.row.zongjia) {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickShuju(params.row);
                    },
                  },
                },
                params.row.zongjia
              );
            } else {
              return h("div", 0);
            }
          },
        },
        {
          title: "剩余学费",
          key: "remainXuefei",
          align: "center",
          render: (h, params) => {
            if (params.row.remainXuefei) {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickShuju(params.row);
                    },
                  },
                },
                params.row.remainXuefei
              );
            } else {
              return h("div", 0);
            }
          },
        },
        {
          title: "剩余课时",
          key: "remainkeshi",
          align: "center",
          render: (h, params) => {
            if (params.row.remainXuefei) {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickShuju(params.row);
                    },
                  },
                },
                params.row.remainkeshi
              );
            } else {
              return h("div", 0);
            }
          },
        },
        {
          title: "课耗收入统计",
          key: "totalkehao",
          align: "center",
          render: (h, params) => {
            if (params.row.totalkehao) {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickShuju(params.row);
                    },
                  },
                },
                params.row.totalkehao
              );
            } else {
              return h("div", 0);
            }
          },
        },
        {
          title: "课时统计",
          key: "keshi",
          align: "center",
          render: (h, params) => {
            if (params.row.keshi) {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.clickShuju(params.row);
                    },
                  },
                },
                params.row.keshi
              );
            } else {
              return h("div", 0);
            }
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "422",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        banjiName: "",
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      campusList: [],
      showxiangxi: false,
      selectobj: "",
      showdaochu: false,
    };
  },
  methods: {
    getKehaoPageData() {
      api
        .get("xwcloud-caiwu/caiwu/tongji/banjishoufei/getBanjitongjiPage", this.params)
        .then((res) => {
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
      this.getKehaoPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getKehaoPageData();
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
      api.get("xwcloud-homeschool/homeschool/public/getCampusList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // 获取班级列表
          this.campusList = res.obj;
          this.campusList.forEach((item) => {
            item.name = item.campusName;
          });
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
          campusID: "",
          banjiName: "",
        };
      }
      this.getKehaoPageData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getKehaoPageData();
    this.getCampusListData();
  },
};
</script>
