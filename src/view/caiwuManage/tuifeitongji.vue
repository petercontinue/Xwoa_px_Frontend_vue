<template>
  <div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Card style="margin-top: 20px">
      <Table border ref="selection" :columns="columns6" :data="data"></Table>
    </Card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import * as api from "@/api/api.js";

export default {
  name: "xinqianTable",
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
                  width: 100,
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = Number(element.id);
                          this.TableSearch();
                        }
                      });
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
          title: "年份",
          key: "tyear",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchyearForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.toyear = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let datehave = "";
            if (this.params.toyear == "") {
              datehave = toolbox.dateFtt(new Date(), "yyyy");
            } else {
              datehave = this.params.toyear;
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "1月",
          key: "Jan",
          align: "center",
        },
        {
          title: "2月",
          key: "Feb",
          align: "center",
        },
        {
          title: "3月",
          key: "Mar",
          align: "center",
        },
        {
          title: "4月",
          key: "Apr",
          align: "center",
        },
        {
          title: "5月",
          key: "May",
          align: "center",
        },
        {
          title: "6月",
          key: "Jun",
          align: "center",
        },
        {
          title: "7月",
          key: "Jul",
          align: "center",
        },
        {
          title: "8月",
          key: "Aug",
          align: "center",
        },
        {
          title: "9月",
          key: "Sep",
          align: "center",
        },
        {
          title: "10月",
          key: "Oct",
          align: "center",
        },
        {
          title: "11月",
          key: "Nov",
          align: "center",
        },
        {
          title: "12月",
          key: "Dece",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        toyear: "",
        campusID: "",
      },
      show: this.value, // 父页面传来的值
      allcampusData: [],
    };
  },
  methods: {
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 336 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    gettuifeihejiBymouth() {
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/gettuifeitongji", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj;
            console.log(this.data);
          }
        });
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.gettuifeihejiBymouth();
    },
    search() {
      this.params.campusID = "";
      this.params.toyear = "";
      this.gettuifeihejiBymouth();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getAllCampusList();
    this.gettuifeihejiBymouth();
  },
};
</script>
