<template>
  <div>
    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="4">
        <Button type="info" @click="daochu">导出</Button>
      </Col>
      <Col span="20"></Col>
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
    <daochukemutongji v-model="showdaochu" :daochutype="3"></daochukemutongji>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import daochukemutongji from "./daochukemutongji.vue";
import * as api from "@/api/api.js";

export default {
  components: { daochukemutongji },
  name: "kemuyufreeTable",
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
                      this.TableSearch();
                    } else {
                      this.params.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "科目",
          key: "subName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "科目",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.kemuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "按起止日期计费学费总额",
          key: "qzrq",
          align: "center",
        },
        {
          title: "不按起止日期计费学费总额",
          key: "noqzrq",
          align: "center",
        },
        {
          title: "学费余额总额",
          key: "zonge",
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
        kemuName: "",
      },
      show: this.value, // 父页面传来的值
      loading: true,
      campusList: [],
      showdaochu: false,
    };
  },
  methods: {
    getKemuyufeePageData() {
      api.get("xwcloud-caiwu/caiwu/tongji/kemushoufei/getKemuyufeePage",this.params).then((res) => {
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
      this.getKemuyufeePageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getKemuyufeePageData();
    },

    TableSearch() {
      this.getKemuyufeePageData();
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.params.campusID = "";
      this.params.kemuName = "";
      this.getKemuyufeePageData();
    },
    daochu() {
      this.showdaochu = true;
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
    this.params.moneyStyle = this.type;
    this.data = [];
    this.getKemuyufeePageData();
    this.getCampusListData();
  },
};
</script>
