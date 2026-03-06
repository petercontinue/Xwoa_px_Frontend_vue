<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>1 全部完成以下三个步骤才完成商品的添加；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 商品返佣比例不设置的话，就是使用通用的返佣比例；</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
      </Col>
      <!---->
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getPage"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          highlight-row
          @on-row-click="onClickRow"
          :columns="colData"
          :data="tableData"
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

    <buyTotuike
      v-model="editShow"
      :editID="editID"
      v-on:handleSearch="getPage"
    ></buyTotuike>
  </div>
</template>

<script>
import buyTotuike from "@/components/zhaoshengbaoming/wxmall/buyTotuike";
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
    buyTotuike,
  },
  data() {
    return {
      menuID: "128",
      checkAll: false,
      editShow: false,
      editID: "",
      colData: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.tableData.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
        },
        {
          title: "电话",
          key: "phoneNumber",
          align: "center",
          render(h, params) {
            if (params.row.phoneNumber) {
              return h("div", [h("span", params.row.phoneNumber)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "电话",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.userTel = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "微信昵称",
          key: "nickName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "微信昵称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.nickName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "微信头像",
          key: "headImage",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: "width: 60px;height: 60px;",
                },
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  attrs: {
                    src: params.row.headImage,
                    style: "width: 60px;height: 60px;border-radius: 2px;",
                  },
                  style: {},
                }),
              ]
            );
          },
        },
        {
          title: "地区",
          key: "diqu",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "地区",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.diqu = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程用户",
          key: "stuName",
          align: "center",
        },
        {
          title: "父级用户",
          key: "fidName",
          align: "center",
          render(h, params) {
            if (params.row.fidName) {
              return h("div", [h("span", params.row.fidName)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "上线用户",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.fidName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "祖级用户",
          key: "gfidName",
          align: "center",
        },
        {
          title: "是否是推客",
          key: "istuike",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.tuikeLevelID == 0) {
              state = "否";
            } else {
              state = "是";
            }
            return h("label", state);
          },
        },
        {
          title: "商城余额",
          key: "scRemainMoney",
          align: "center",
        },
        {
          title: "商城积分",
          key: "scJifen",
          align: "center",
        },
        {
          title: "已结佣金",
          key: "scYijieYongjin",
          align: "center",
        },
        {
          title: "账号状态",
          key: "isdongjie",
          align: "center",
          render: (h, params) => {
            if (params.row.isdongjie == 0) {
              return h("div", [h("span", { style: { color: "green" } }, "正常")]);
            } else if (params.row.isdongjie == 1) {
              return h("div", [h("span", { style: { color: "red" } }, "冻结")]);
            }
          },
        },
        {
          title: "加入时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "加入时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.Sdate = value[0];
                    this.searchObj.Edate = value[1];
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        userName: "",
        userTel: "",
        nickName: "",
        diqu: "",
        fidName: "",
        Sdate: "",
        Edate: "",
      },
      //0.非常满意 1.满意 2.一般 3.很糟糕
      pingjiatypaData: [
        { id: 0, name: "非常满意" },
        { id: 1, name: "满意" },
        { id: 2, name: "一般" },
        { id: 3, name: "很糟糕" },
      ],
      editData: "",
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getPage() {
      api.get("/xwcloud-wsc/wsc/wsc/getWscUserPage",this.searchObj).then((res) => {
        if ((res.code = "success")) {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
          this.tableData.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        } else {
          this.$Message.error("查询信息失败");
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
    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "addtuike") {
        this.Onaddtuike();
      } else if (onclicks == "dongjiewscUser") {
        this.OndongjiewscUser();
      } else if (onclicks == "jiedongwscUser") {
        this.OnjiedongwscUser();
      }
    },

    /**删除商城用户 */
    Ondel() {
      let i = 0;
      this.editData = "";
      this.tableData.forEach((item) => {
        if (item._checked) {
          this.editData += item.id + ",";
        }
      });

      if (i < 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        api.del("/xwcloud-wsc/wsc/wsc/delwscUser",{ ids: this.editData }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.getPage();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    /**添加推客 */
    Onaddtuike() {
      let i = 0;
      this.editID = "";
      let edata = "";
      this.tableData.forEach((item) => {
        if (item._checked) {
          this.editID = item.id;
          edata = item;
          i += 1;
        }
      });

      if (i == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (i > 1) {
        this.$Message.error("请选择一行");
      } else {
        console.log(edata);
        if (Number(edata.tuikeLevelID == 0)) {
          this.editShow = true;
        } else {
          this.$Message.error("已成为推客");
        }
      }
    },
    /**冻结 */
    OndongjiewscUser() {
      let i = 0;
      this.editData = "";
      this.tableData.forEach((item) => {
        if (item._checked) {
          this.editData += item.id + ",";
        }
      });

      if (i < 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        api.post("/xwcloud-wsc/wsc/wsc/dongjieOrNotwscUser",{ ids: this.editData, type: 1 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.getPage();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    /**解冻 */
    OnjiedongwscUser() {
      let i = 0;
      this.editData = "";
      this.tableData.forEach((item) => {
        if (item._checked) {
          this.editData += item.id + ",";
        }
      });

      if (i < 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        api.post("/xwcloud-wsc/wsc/wsc/dongjieOrNotwscUser",{ ids: this.editData, type: 2 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.getPage();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },

    search(type = null) {
      this.searchObj.current = 1;
      this.searchObj.size = 10;
      if (type == 1) {
        this.searchObj = {
          size: 10,
          current: 1,
          userName: "",
          userTel: "",
          nickName: "",
          diqu: "",
          fidName: "",
          Sdate: "",
          Edate: "",
        };
      }
      this.getPage();
    },
  },
  mounted() {
    this.getPage();
  },
};
</script>

<style lang="" scoped></style>
