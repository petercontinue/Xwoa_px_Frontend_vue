<template>
  <div>
    <div v-if="spShow == true">
      <Row>
        <Col span="12">
          <span>快捷查询：</span>
          <Button type="info" ghost @click="search()">全部</Button>
        </Col>
      </Row>

      <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection"
            @on-row-click="onClickRow"
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
          show-sizer
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Row>
    </div>
    <div v-if="spShow == false">
      该功能需要开启退费审批流程，如要使用该功能，请到机构设置-->财务设置-->退费审批开启使用！！！
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "565",
      checkList: [],
      spShow: false,
      addshow: false,
      derShow: false,
      params: {
        size: 10,
        current: 1,
      },
      bhvalue: {
        spID: "",
        spshuoming: "",
      },
      allcampusData: [],
      columns6: [
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
          title: "学号",
          align: "center",
          key: "stuID",
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
          title: "审批学员",
          align: "center",
          key: "stuName",
        },
        {
          title: "退费类型",
          align: "center",
          key: "type",
          render: (h, params) => {
            let state = "";
            switch (params.row.type) {
              case 1:
                state = "全科全退";
                break;
              case 2:
                state = "单科全退";
                break;
              case 3:
                state = "单科部分退费";
                break;
              case 4:
                state = "退杂费";
                break;
              case 5:
                state = "退教学用品的费用";
                break;
              case 6:
                state = "退充值余额";
                break;
              case 7:
                state = "全部退费";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "退费金额",
          align: "center",
          key: "sqtuiMoney",
        },
        {
          title: "支付方式",
          align: "center",
          key: "moneystyleName",
        },
        {
          title: "退费办理时间",
          align: "center",
          key: "tuifeibanlidate",
          render: (h, params) => {
            let datehave = null;
            if (params.row.tuifeibanlidate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(
                params.row.tuifeibanlidate,
                "yyyy-MM-dd hh:mm:ss"
              );
            }
            return h("div", [h("span", datehave)]);
          },
        },

        {
          title: "退费业绩人",
          align: "center",
          key: "yejistaff",
        },
        {
          title: "退费说明",
          align: "center",
          key: "tuifeishuoming",
          render: (h, params) => {
            if (params.row.tuifeishuoming != null) {
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
                          title: "退费说明:",
                          content: params.row.tuifeishuoming,
                          onOk: () => {},
                        });
                      },
                    },
                  },
                  "详情"
                ),
              ]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
        {
          title: "申请人",
          align: "center",
          key: "shenqinren",
        },
        {
          title: "审批状态",
          align: "center",
          key: "spfinish",
          render: (h, params) => {
            let state = "";
            switch (params.row.spfinish) {
              case 1:
                state = "待审批";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "blue" },
                    },
                    state
                  ),
                ]);
              case 2:
                state = "审批通过";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "green" },
                    },
                    state
                  ),
                ]);
              case 3:
                state = "审批不通过";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "red" },
                    },
                    state
                  ),
                ]);
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "审批人",
          align: "center",
          key: "shenpiren",
        },
        {
          title: "审批时间",
          align: "center",
          key: "chuliTime",
          render: (h, params) => {
            let datehave = null;
            if (params.row.chuliTime == null) {
              datehave = "";
            } else {
              datehave = toolbox.dateFtt(params.row.chuliTime, "yyyy-MM-dd hh:mm:ss");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "审批说明",
          align: "center",
          key: "spshuoming",
          render: (h, params) => {
            if (params.row.spshuoming != null) {
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
                          title: "审批结果说明:",
                          content: params.row.spshuoming,
                          onOk: () => {},
                        });
                      },
                    },
                  },
                  "详情"
                ),
              ]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
      ],
    };
  },
  methods: {
    getTuifeishenpi() {
      if (this.spShow == true) {
        api.get("/xwcloud-caiwu/caiwu/pxtuifeitable/getTuifeishenpiPage",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(this.data);
          }
        });
      }
    },

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

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.getTuifeishenpi();
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "shenpi()") {
        this.Onshenpi();
      } else if (onclicks == "shenpibohui()") {
        this.Onshenpibohui();
      }
    },

    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getTuifeishenpi();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getTuifeishenpi();
    },

    /**
     * 表头查询
     */
    TableSearch() {
      this.getTuifeishenpi();
    },
    /**通过审批 */
    Onshenpi() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要处理的数据!");
      } else {
        this.$Modal.confirm({
          title: "审批通过",
          width: 40,
          closable: true,
          render: (h) => {
            return h("Input", {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: "请输入审批说明",
                type: "textarea",
                rows: 4,
              },
              on: {
                input: (val) => {
                  this.value = val;
                },
              },
            });
          },
          onOk: () => {
            this.bhvalue.spID = this.checkList.id;
            this.bhvalue.spshuoming = this.value;
            api
              .post("/xwcloud-caiwu/caiwu/pxtuifeitable/tongguoShenpi", this.bhvalue)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getTuifeishenpi();
                  this.bhvalue.spshuoming = "";
                  this.value = "";
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {},
        });
      }
    },

    /**驳回审批 */
    Onshenpibohui() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要处理的数据!");
      } else {
        this.$Modal.confirm({
          title: "审批驳回",
          width: 40,
          closable: true,
          render: (h) => {
            return h("Input", {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: "请输入审批驳回说明",
                type: "textarea",
                rows: 4,
              },
              on: {
                input: (val) => {
                  this.value = val;
                },
              },
            });
          },
          onOk: () => {
            this.bhvalue.spID = this.checkList.id;
            this.bhvalue.spshuoming = this.value;
            api
              .post("/xwcloud-caiwu/caiwu/pxtuifeitable/shengpibohui", this.bhvalue)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getTuifeishenpi();
                  this.bhvalue.spshuoming = "";
                  this.value = "";
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {},
        });
      }
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    api.get("/xwcloud-caiwu/caiwu/pxtuifeitable/getshenpikaiguan", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        if (res.obj == "1") {
          this.spShow = true;
          this.getTuifeishenpi();
        }
      }
    });
  },
};
</script>
