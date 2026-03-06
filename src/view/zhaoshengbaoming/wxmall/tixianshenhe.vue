<template>
  <div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="primary" ghost @click="search(2)">待审批</Button>
        <Button type="success" ghost @click="search(4)">审批通过</Button>
        <Button type="error" ghost @click="search(3)">审批驳回</Button>
      </Col>
    </Row>

    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="success" size="large" @click="passShenpi(1)">审批通过</Button>
        <Button type="warning" size="large" @click="passShenpi(2)">审批驳回</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          highlight-row
          :columns="colData"
          :data="data"
        ></Table>
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
          title: " ",
          align: "center",
          key: "checkBox",
          width: 60,
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {
                  "on-change": (e) => {},
                },
              }),
            ]);
          },
        },
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
                  content: "微信昵称",
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
          title: "联系电话",
          key: "phone",
          align: "center",
        },
        {
          title: "银行卡号",
          key: "bankCard",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "银行卡号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.bankcardID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "开户行",
          key: "bankName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "开户行",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.kaihuhang = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "申请提现金额",
          key: "tixianMoney",
          align: "center",
        },
        {
          title: "申请时间",
          key: "shengqingTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.shengqingTime) {
              state = toolbox.dateFtt(params.row.shengqingTime, "yyyy-MM-dd hh:mm:ss");
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
                  content: "审批时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.sqstartTime = value[0];
                    this.searchObj.sqendTime = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "提现说明",
          key: "tixianShuoming",
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
                        content: "<p>" + params.row.tixianShuoming + "</p>",
                        closable: true,
                        onOk: () => {},
                        onCancel: () => {},
                      });
                    },
                  },
                },
                "提现详情"
              ),
            ]);
          },
        },
        {
          title: "审批状态",
          key: "tixianShengpiState",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.tixianShengpiState == 1) {
              state = "待审批";
            } else if (params.row.tixianShengpiState == 2) {
              state = "审批驳回";
            } else if (params.row.tixianShengpiState == 3) {
              state = "审批通过";
            } else {
              state = "-";
            }
            return h("label", state);
          },
        },
        {
          title: "审批说明",
          key: "shengpiShuoming",
          align: "center",
          render: (h, params) => {
            if (params.row.shengpiShuoming) {
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
                          content: "<p>" + params.row.shengpiShuoming + "</p>",
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
            } else {
              return h("label", "-");
            }
          },
        },
        {
          title: "审批人",
          key: "staffName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.staffName) {
              state = params.row.staffName;
            } else {
              state = "-";
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "审批人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.shenpiren = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "审批时间",
          key: "tixianShengpiTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.tixianShengpiTime) {
              state = toolbox.dateFtt(
                params.row.tixianShengpiTime,
                "yyyy-MM-dd hh:mm:ss"
              );
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
                  content: "审批时间",
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
      ],
      data: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        shenghestate: -1,
        nickName: "",
        userName: "",
        bankcardID: "",
        kaihuhang: "",
        shenpiren: "",
        startTime: "",
        endTime: "",
        sqstartTime: "",
        sqendTime: "",
      },

      Doshenpi: {
        id: "",
        type: 0,
        shengpishuoming: "",
      },
      checkList: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      this.checkList = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.checkList = this.$refs.selection.data[index];
      }
    },

    TableSearch() {
      this.getPage();
    },

    search(type) {
      if (type == 1) {
        this.searchObj.nickName = "";
        this.searchObj.userName = "";
        this.searchObj.bankcardID = "";
        this.searchObj.kaihuhang = "";
        this.searchObj.shenpiren = "";
        this.searchObj.startTime = "";
        this.searchObj.endTime = "";
        this.searchObj.shenghestate = -1;
      } else {
        this.searchObj.shenghestate = Number(type) - 1;
      }
      this.searchObj.size = 10;
      this.searchObj.curren = 1;
      this.getPage();
    },
    passShenpi(type) {
      console.log(type);
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要审批的数据");
      } else {
        this.$Modal.confirm({
          width: 35,
          closable: true,
          render: (h) => {
            return h("div", [
              h("Row", [h("Col", { props: { span: 20 } }, [h("p", "审批")])]),
              [
                h("Divider", {
                  style: { margin: "10px 0px 20px 0px" },
                }),
              ],
              h("Row", [
                h(
                  "Col",
                  {
                    props: {
                      span: 4,
                    },
                  },
                  [
                    h(
                      "p",
                      {
                        style: { margin: "10px" },
                      },
                      "审批说明："
                    ),
                  ]
                ),
                h(
                  "Col",
                  {
                    props: {
                      span: 20,
                    },
                  },
                  [
                    h("Input", {
                      props: {
                        value: "",
                        autofocus: true,
                        placeholder: "请填写审批说明",
                        type: "textarea",
                        rows: 3,
                      },
                      on: {
                        input: (val) => {
                          this.value = val;
                        },
                      },
                    }),
                  ]
                ),
              ]),
            ]);
          },
          onOk: () => {
            this.Doshenpi.id = this.checkList.id;
            this.Doshenpi.type = Number(type);
            this.Doshenpi.shengpishuoming = this.value;
            if (
              type == 2 &&
              (this.Doshenpi.shengpishuoming == "" ||
                this.Doshenpi.shengpishuoming == null)
            ) {
              this.$Message.error("请输入审批说明");
            } else {
              api.post("/xwcloud-wsc/wsc/wsc/PassOrNoshenhetixian",this.Doshenpi).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getPage();
                } else {
                  this.$Message.error(res.msg);
                }
              });
            }
          },
          onCancel: () => {},
        });
      }
    },

    getPage() {
      api.get("/xwcloud-wsc/wsc/wsc/gettixianshenhePage",this.searchObj).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);

          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },

    changePage(current) {
      this.data.current = current;
      this.getPage();
    },

    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.data.size = pageSize;
      this.getPage();
    },
  },
  mounted() {
    this.getPage();
  },
};
</script>
