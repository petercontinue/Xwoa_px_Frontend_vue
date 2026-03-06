<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>1 优惠券分为通用优惠券和指定商品类别优惠券；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 可以设置新人优惠券；也可以指定送某个商城用户一定面额的优惠券；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>3 优惠券每次每人只限使用一张；</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
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
          :columns="columns"
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
    <addcoupons
      v-model="show"
      :type="type"
      :editData="editData"
      v-on:handleSearch="GetCoupons"
    ></addcoupons>
    <userCoupons v-model="usershow" :type="couponstype"></userCoupons>
    <offerCoupons v-model="offershow" :type="couponstype"></offerCoupons>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import addcoupons from "@/components/zhaoshengbaoming/weixinyingxiao/addcoupons";
import offerCoupons from "@/components/zhaoshengbaoming/weixinyingxiao/offerCoupons";
import userCoupons from "@/components/zhaoshengbaoming/weixinyingxiao/userCoupons";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    addcoupons,
    offerCoupons,
    userCoupons,
    datesearchForm,
  },
  data() {
    return {
      menuID: "118",
      data: [],
      total: 0,
      params: {
        size: 10,
        current: 1,
        couponsName: "",
        giveType: -1,
        goodstypeID: 0,
        startDate: "",
        endDate: "",
      },
      columns: [
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
          title: "优惠券名称",
          key: "couponsName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "优惠券名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.couponsName = value;
                    this.GetCoupons();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "优惠券金额",
          key: "Money",
          align: "center",
        },
        {
          title: "使用条件",
          key: "manMoney",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.manMoney == null || params.row.manMoney == 0) {
              state = "无限制";
            } else {
              state = "满" + params.row.manMoney + "减" + params.row.Money;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "限制商品类别",
          key: "goodsType",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "限制商品类别",
                  data: this.allgoodType,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allgoodType.forEach((element) => {
                        if (element.id == value) {
                          this.params.goodstypeID = element.id;
                          this.GetCoupons();
                        }
                      });
                    } else {
                      this.params.goodstypeID = 0;
                      this.GetCoupons();
                    }
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.goodsType == null) {
              state = "无限制";
            } else {
              state = params.row.goodsType;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "有效期",
          key: "stratDate",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.stratDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.stratDate, "yyyy-MM-dd");
            }
            let datehaveend = "";
            if (params.row.endDate == null) {
              datehaveend = "-";
            } else {
              datehaveend = toolbox.dateFtt(params.row.endDate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave + "至" + datehaveend)]);
          },
        },
        {
          title: "优惠券赠送类别",
          key: "giveType",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "优惠券赠送类别",
                  data: this.zengsongleibie,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.zengsongleibie.forEach((element) => {
                        if (element.id == value) {
                          this.params.giveType = element.id;
                          this.GetCoupons();
                        }
                      });
                    } else {
                      this.params.giveType = "";
                      this.GetCoupons();
                    }
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            switch (params.row.giveType) {
              case 0:
                state = "指定赠送优惠券";
                break;
              case 1:
                state = "新人优惠券";
                break;
              case 2:
                state = "满减优惠券";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "赠送时间",
          key: "addDate",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "赠送时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startDate = value[0];
                    this.params.endDate = value[1];
                    this.GetCoupons();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let datehave = "";
            if (params.row.addDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.addDate, "yyyy-MM-dd hh:mm:ss");
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      checkOne: [],
      show: false,
      type: "",
      editData: "",
      couponstype: 0, //1:优惠券使用记录 2：优惠券发放记录 3：小程序获取用户优惠券
      usershow: false, //优惠券使用记录
      offershow: false, //优惠券发放记录
      allgoodType: [],
      zengsongleibie: [
        { id: 0, name: "指定赠送优惠券" },
        { id: 1, name: "新人优惠券" },
        { id: 2, name: "满减优惠券" },
      ],
    };
  },
  methods: {
    onClickRow(row, index) {
      this.checkOne = [];
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
        this.checkOne = this.$refs.selection.data[index];
      }
    },

    GetCoupons() {
      this.params.giveType = Number(this.params.giveType);
      console.log(this.params);
      api
        .get("/xwcloud-wsc/wsc/wmallcontroller/GetCouponsPages", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(res);

            this.data.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "_checked", false);
            });
          }
        });
    },

    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "addinfo") {
        this.Onaddinfo();
      } else if (onclicks == "edit") {
        this.Onedit();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "yhquserjilu()") {
        this.Onyhquserjilu();
      } else if (onclicks == "yhqfafang()") {
        this.Onyhqfafang();
      }
    },

    Onaddinfo() {
      this.type = "1";
      this.show = true;
    },
    Onedit() {
      this.type = "2";
      this.editData = JSON.stringify(this.checkOne);
      this.show = true;
    },
    Ondel() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          api
            .del("/xwcloud-wsc/wsc/wmallcontroller/delCouponsByID", {
              id: this.checkOne.id,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.checkOne = [];
                this.GetCoupons();
              } else {
                this.$Message.error(res.msg);
              }
            });
        },
        onCancel: () => {
          this.ids = [];
        },
      });
    },
    Onyhquserjilu() {
      this.couponstype = 1;
      this.usershow = true;
    },
    Onyhqfafang() {
      this.couponstype = 2;
      this.offershow = true;
    },

    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.couponsName = "";
      this.params.giveType = -1;
      this.params.goodstypeID = 0;
      this.params.startDate = "";
      this.params.endDate = "";
      this.GetCoupons();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.GetCoupons();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.GetCoupons();
    },
    getAllgoodTypeList() {
      api.get("/xwcloud-wsc/wsc/wmallcontroller/getAllgoodType", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          res.obj.forEach((items) => {
            this.allgoodType.push({ id: items.id, name: items.goodstype });
          });
        }
      });
    },
  },
  mounted: function () {
    this.GetCoupons();
    this.getAllgoodTypeList();
  },
};
</script>
