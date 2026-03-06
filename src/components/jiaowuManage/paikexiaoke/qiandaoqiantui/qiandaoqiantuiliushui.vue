<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
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
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
  },
  data() {
    //数据

    return {
      //查询
      headerSearchStuName: false, //学员姓名
      headerSearchtype: false, //签到类型  签到/签退
      headerSearchStyle: false, //签到方式  1刷卡 2微信 3人工

      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuName: "",
        type: -1,
        style: -1,
      },
      alltype: [
        { id: "1", name: "签到" },
        { id: "2", name: "签退" },
      ],
      allstyle: [
        { id: "1", name: "刷卡" },
        { id: "2", name: "微信" },
        { id: "3", name: "人工" },
      ],
      columns6: [
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
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
                  content: "学员姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "签到类型",
          key: "qiandao",
          align: "center",
          width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "签到类型",
                  data: this.alltype,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.alltype.forEach((element) => {
                        if (element.id == value) {
                          this.params.type = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.type = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "签到方式",
          key: "qianStyle",
          align: "center",
          width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "签到方式",
                  data: this.allstyle,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allstyle.forEach((element) => {
                        if (element.id == value) {
                          this.params.style = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.style = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课时间",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let state = "";
            let lsdate = "";
            if (
              params.row.haveClassDate == "" ||
              params.row.haveClassDate == null
            ) {
            } else {
              lsdate = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
            }
            state =
              lsdate +
              "  " +
              params.row.startLessonDateTime +
              "-" +
              params.row.endLessonDateTime;
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "推送状态",
          key: "tstype",
          align: "center",
          width: 100,
        },
        {
          title: "操作时间",
          key: "qianDatetime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.qianDatetime,
              "yyyy-MM-dd"
            );
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "操作人",
          key: "staffName",
          align: "center",
        },
      ],
    };
  },

  methods: {
    //页面加载
    getqiandaoliushuiListPage() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getqiandaoliushuiPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },
    // clickShijian(onclicks) {
    //   //按钮事件
    //   window.console.log(onclicks);
    //   if (onclicks == "derive()") {
    //     this.ok();
    //   } else {
    //     this.$Message.info("该页面不应该存在该功能");
    //   }
    // },
    search() {
      //全部
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuName = "";
      this.params.type = -1;
      this.params.style = -1;
      this.getqiandaoliushuiListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getqiandaoliushuiListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getqiandaoliushuiListPage();
    },
    TableSearch() {
      this.getqiandaoliushuiListPage();
    },
  },

  mounted: function () {
    // 初始化页面
    this.getqiandaoliushuiListPage();
  },
};
</script>
