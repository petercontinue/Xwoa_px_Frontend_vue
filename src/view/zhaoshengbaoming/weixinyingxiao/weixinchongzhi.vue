<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>1 本页面的充值优惠政策和报名交费那里的充值优惠政策是同步的；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 在微商城的充值那里完成充值以后，会在本页面显示充值和相关信息。</span>
        </Col>
      </Alert>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getteachSubjectPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns"
          :data="data"
          @on-row-click="onClickRow"
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
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
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
      columns: [
        {
          // type: "selection",
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width: 100,
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
          title: "订单号",
          key: "orderNumber",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "订单号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.orderNo = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "微信昵称",
          key: "userName",
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
                    this.userName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "充值金额",
          key: "payMoney",
          align: "center",
        },
        {
          title: "赠送金额",
          key: "giveMoney",
          align: "center",
        },
        {
          title: "获得总金额",
          key: "totalMoney",
          align: "center",
        },
        {
          title: "充值时间",
          key: "addDate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.addDate, "yyyy-MM-dd hh:mm:ss")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "充值时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.startDate = value[0];
                    this.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "留言备注",
          key: "beizhu",
          align: "center",
        },
      ],
      menuID: "112",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      userName: "",
      orderNo: "",
      startDate: "",
      endDate: "",
      editdata: "",
      shuoming: "",
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.data.forEach((items) => {
        //取消所有对象的勾选，checkBox设置为false
        this.$set(items, "checkBox", false);
      });
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
    },
    getteachSubjectPages() {
      api
        .get("/xwcloud-wsc/wsc/whdChongzhi/GetWechatChongzhiPages", {
          size: this.size,
          current: this.current,
          userName: this.userName,
          orderNo: this.orderNo,
          startDate: this.startDate,
          endDate: this.endDate,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            this.data.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "checkBox", false);
            });
          }
        });
    },
    TableSearch() {
      this.getteachSubjectPages();
    },
    changePage(current) {
      this.current = current;
      this.getteachSubjectPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getteachSubjectPages();
    },
    onSearch(search) {},
    clickShijian(onclicks) {
      if (onclicks == "wechatczyhzc()") {
        this.$router.push({
          path: "/chongzhiyhzc",
          query: {},
        });
      } else if (onclicks == "cztui()") {
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdata = items;
          }
        });
        if (this.editdata == "") {
          this.$Message.error("请选择要退款的充值信息");
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>确定同意退款？</p>",
            onOk: () => {
              api
                .post("/xwcloud-wsc/wsc/wsc/agreeTuikuan", {
                  id: this.editdata.id,
                  orderNumber: this.editdata.orderNumber,
                  shuoming: this.shuoming,
                })
                .then((response) => {
                  if (response.code == "Y" && response.success == true) {
                    this.$Message.success(response.msg);
                  } else {
                    this.$Message.error(response.msg);
                  }
                });
            },
          });
        }
      }
    },
  },

  mounted() {
    this.getteachSubjectPages();
  },
};
</script>
