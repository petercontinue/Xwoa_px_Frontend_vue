<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="info" ghost @click="search(2)">停课1-2个月</Button>
        <Button type="info" ghost @click="search(3)">停课3-5个月</Button>
        <Button type="info" ghost @click="search(4)">停课6个月以上</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
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
    <daochuchangqitingkexueyuan
      v-model="showdaochu"
    ></daochuchangqitingkexueyuan>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import Daochuchangqitingkexueyuan from "../../components/shujutongji/daochuchangqitingkexueyuan.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Daochuchangqitingkexueyuan,
  },
  data() {
    return {
      pieData: [],
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
                      this.params.campusID = 0;
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学号",
          key: "zidingyiStuID",
          align: "center",
          render:(h,param)=> {
            if(param.row.zidingyiStuID){
              return h("div", params.row.zidingyiStuID); 
            }else{
              return h("div",param.row.id)
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.xuehao = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
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
                    this.params.stuName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年级",
                  data: this.stugrade,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.stugrade.forEach((element) => {
                        if (element.id == value) {
                          this.params.gradeID = element.id;
                          this.search();
                        }
                      });
                    } else {
                      this.params.gradeID = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "最后一次上课时间",
          key: "maxhave",
          align: "center",
          render: (h, params) => {
            if (params.row.maxhave != null && params.row.maxhave != "") {
              return h(
                "div",
                toolbox.dateFtt(params.row.maxhave, "yyyy-MM-dd hh:mm:ss")
              );
            } else {
              return h("div", "-");
            }
          },
        },
        {
          title: "停课天数",
          key: "tingke",
          align: "center",
          render: (h, params) => {
            if (params.row.tingke) {
              return h("div", params.row.tingke);
            } else {
              return h("div", "-");
            }
          },
        },
        {
          title: "班主任姓名",
          key: "staffName",
          align: "center",
          render: (h, params) => {
            if (params.row.staffName) {
              return h("div", params.row.staffName);
            } else {
              return h("div", "-");
            }
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "442",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: 0,
        xuehao: "",
        stuName: "",
        gradeID: "",
        tingkeType: null,
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      showdaochu: false,
      stugrade:[],
    };
  },
  methods: {
    getTingkeStuData() {
      api.get("xwcloud-caiwu/shujutongji/other/getTingkeStu",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          // console.log(res);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getTingkeStuData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getTingkeStuData();
    },
    search(type = null) {
      this.params.size = 10;
      this.params.current = 1;
      this.params.tingkeType = type;
      if (type == 1) {
        this.params = {
          size: 10,
          current: 1,
          campusID:0,
          xuehao: "",
          stuName: "",
          gradeID: "",
          tingkeType: null,
        };
      }
      this.getTingkeStuData();
    },
    clickShijian(val) {
      if (val == "derive()") {
        this.showdaochu = true;
      }
    },
  },
  mounted: function () {
    // 初始化页面
    this.getTingkeStuData();
    api.get("xwcloud-homeschool/homeschool/public/getCampusList",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.campusList = res.obj;
        this.campusList.forEach((item) => {
          item.name = item.campusName;
        });
      } else {
        this.$Message.error(res.msg);
      }
    });
    api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.stugrade = res.obj;
      }
    });
  },
};
</script>

<style>
</style>