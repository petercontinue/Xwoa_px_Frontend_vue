<template>
  <div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="colData" :data="tableData"></Table>
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
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      colData: [
        {
          title: "id",
          key: "id",
          align: "center",
        },
        {
          title: "微信昵称",
          key: "nickName",
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
                    this.searchObj.nickName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "姓名",
          key: "realName",
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
                    this.searchObj.userName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "手机",
          key: "phone",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "手机",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.phoneNumber = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "原级别",
          key: "oldtuikelvName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.oldtuikelvName) {
              state = params.row.oldtuikelvName;
            } else {
              state = "-";
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "原级别",
                  width: 100,
                  data: this.tkData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.tkData.forEach((element) => {
                        if (element.id == value) {
                          this.searchObj.oldtkLv = Number(element.id);
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.searchObj.oldtkLv = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "购买级别",
          key: "tuikelvName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "购买级别",
                  width: 100,
                  data: this.tkData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.tkData.forEach((element) => {
                        if (element.id == value) {
                          this.searchObj.nowtkLv = Number(element.id);
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.searchObj.nowtkLv = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "购买时间",
          key: "buyTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.buyTime) {
              state = toolbox.dateFtt(params.row.buyTime, "yyyy-MM-dd hh:mm:ss");
            } else {
              state = "-";
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "开始日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.starttime = value[0];
                    this.searchObj.endtime = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "说明",
          key: "shuoming",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.$Modal.info({
                        title: "说明详情",
                        content: "<p>" + params.row.shuoming + "</p>",
                        closable: true,
                        onOk: () => {},
                        onCancel: () => {},
                      });
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      tkData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        nickName: "",
        userName: "",
        phoneNumber: "",
        oldtkLv: "",
        nowtkLv: "",
        starttime: "",
        endtime: "",
      },
      editData: "",
    };
  },
  methods: {
    TableSearch() {
      this.getPage();
    },
    search() {
      this.searchObj.size = 10;
      this.searchObj.curren = 1;
      this.searchObj.nickName = "";
      this.searchObj.userName = "";
      this.searchObj.phoneNumber = "";
      this.searchObj.oldtkLv = "";
      this.searchObj.nowtkLv = "";
      this.searchObj.starttime = "";
      this.searchObj.endtime = "";
      this.getPage();
    },

    getPage() {
      api.get("/xwcloud-wsc/wsc/wsc/GetbuytuikeinfoPages",this.searchObj).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },

    changePage(current) {
      this.tableData.current = current;
      this.getPage();
    },

    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.tableData.size = pageSize;
      this.getPage();
    },
  },
  mounted() {
    this.getPage();
    api.get("/xwcloud-wsc/wsc/wsc/getalltuikelv",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.tkData = res.obj;
      }
    });
  },
};
</script>

<style lang="" scoped></style>
