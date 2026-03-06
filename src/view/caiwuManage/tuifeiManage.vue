<template>
  <div>
    <div style="margin-top: 20px">
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px; color: red">
          <span>使用打印功能时，请先选中要打印的数据行，在开始打印。</span>
        </Col>
      </Alert>
    </div>

    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <!-- <Button type="warning" v-print="printObj">打印</Button> -->
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
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button
              size="small"
              style="margin-right: 5px"
              type="warning"
              v-print="printObj"
              >打印</Button
            >
          </template>
        </Table>
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
    <derivetuifei v-model="derShow"></derivetuifei>

    <div id="loading" v-show="printLoading">
      <div id="printMe" style="background: red">
        <div style="text-align: left">
          <h1>退费小票</h1>
        </div>
        <Row>
          <Col span="12">退费流水ID</Col>
          <Col span="12">{{ checkList.liushuiID }}</Col>
        </Row>
        <Row>
          <Col span="12">校区</Col>
          <Col span="12">{{ checkList.campusName }}</Col>
        </Row>
        <Row>
          <Col span="12">学号</Col>
          <Col span="12" v-if="checkList.zidingyiStuID">{{
            checkList.zidingyiStuID
          }}</Col>
          <Col span="12" v-if="!checkList.zidingyiStuID">{{ checkList.stuID }}</Col>
        </Row>
        <Row>
          <Col span="12">学员姓名</Col>
          <Col span="12">{{ checkList.stuName }}</Col>
        </Row>
        <Row>
          <Col span="12">支付方式</Col>
          <Col span="12">{{ checkList.moneystyleName }}</Col>
        </Row>
        <Row>
          <Col span="12">退费金额</Col>
          <Col span="12">{{ checkList.zhichuMoney }}</Col>
        </Row>
        <Row>
          <Col span="12">经办人</Col>
          <Col span="12">{{ checkList.jinbanren }}</Col>
        </Row>
        <Row>
          <Col span="12">退费时间</Col>
          <Col span="12">{{ checkList.liushuiDateTime }}</Col>
        </Row>
        <Row>
          <Col span="12">手写签字</Col>
          <Col span="12"></Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import derivetuifei from "@/components/caiwuManage/tuifeiManage/derivetuifei";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    derivetuifei,
  },
  data() {
    return {
      printLoading: false,
      printObj: {
        id: "printMe",
        popTitle: "打印",
      },

      data: [], // 接口数据接收
      total: 0,
      menuID: "564",
      checkList: [],
      addshow: false,
      derShow: false,
      printShow: false,
      params: {
        size: 10,
        current: 1,
        liushuiID: "",
        stuName: "",
        stuID: "",
        campusID: "",
      },
      printdata: "",
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
          title: "退费流水ID",
          key: "liushuiID",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "退费流水ID",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.liushuiID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "退费时间",
          key: "liushuiDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.liushuiDateTime != "无") {
              datehave = toolbox.dateFtt(params.row.liushuiDateTime, "yyyy-MM-dd hh:mm");
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "学号",
          key: "stuID",
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
                    this.params.stuID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学员姓名",
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
          title: "班主任",
          key: "banzhuren",
          align: "center",
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
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = element.id;
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
          title: "支付方式",
          key: "moneystyleName",
          align: "center",
        },
        {
          title: "退费金额",
          key: "zhichuMoney",
          align: "center",
        },
        {
          title: "经办人",
          key: "jinbanren",
          align: "center",
        },
        {
          title: "打印",
          slot: "action",
          width: 80,
          align: "center",
        },
        // {
        //   title: "打印",
        //   key: "endDate",
        //   align: "center",
        //   width: 80,
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small",
        //             // vprint: "printObj",
        //           },
        //           style: {
        //             marginRight: "5px",
        //           },
        //           on: {
        //             click: () => {
        //               this.checkList = params.row;
        //             },
        //           },
        //         },
        //         "打印"
        //       ),
        //     ]);
        //   },
        // },
      ],
    };
  },
  methods: {
    ...mapActions([
      "getSysparamTFSpkaiguan",
    ]),

    getTuifei() {
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/getTuifeiPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(this.data);
          }
        });
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
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },
    getTFSpkaiguan() {
      this.getSysparamTFSpkaiguan().then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res);
          if (res.obj == "是") {
            this.columns6.push({
              title: "审批状态",
              key: "Sp",
              align: "center",
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
            });
          }
        }
      });
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.liushuiID = "";
      this.params.stuName = "";
      this.params.stuID = "";
      this.params.campusID = "";
      this.getTuifei();
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.Onderive();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "addinfo") {
        this.Onaddinfo();
      }
    },
    /**添加 */
    Onaddinfo() {
      this.$router.push({
        path: "/addTuifei",
        query: {},
      });
    },
    /**删除 */
    Ondel() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择数据");
      } else if (this.checkList.length > 1) {
        this.$Message.error("请选择1行数据数据");
      } else {
        this.$Modal.confirm({
          title: "删除退费",
          width: 40,
          closable: true,
          content: "是否要删除所选退费记录！",
          onOk: () => {
            console.log(this.checkList);
            api
              .post("/xwcloud-caiwu/caiwu/pxtuifeitable/deletetuifei", {
                liushuiID: this.checkList.liushuiID,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getTuifei();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {},
        });
      }
    },
    /**导出 */
    Onderive() {
      this.derShow = true;
    },

    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getTuifei();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getTuifei();
    },

    /**
     * 表头查询
     */
    TableSearch() {
      this.getTuifei();
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getTuifei();
    // this.sys
  },
};
</script>
