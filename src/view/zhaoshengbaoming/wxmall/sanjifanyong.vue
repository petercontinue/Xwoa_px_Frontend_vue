<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span
            >1 通用返佣比例是指商品不设置特有返佣比例的时候，就使用通用返佣比例；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>2 佣金大于1元才允许提现；每天最多提现一次；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>3 提现金额大于100元时必须人工审核才允许提现；</span>
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
          @on-row-click="onClickRow"
          highlight-row
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

    <edittuikelv
      v-model="editShow"
      :editID="editID"
      v-on:handleSearch="getPage"
    ></edittuikelv>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import edittuikelv from "@/components/zhaoshengbaoming/wxmall/edittuikelv";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    edittuikelv,
  },
  data() {
    return {
      menuID: "129",
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
          title: "商城昵称",
          key: "nickName",
          align: "center",
        },
        // {
        //   title: "姓名",
        //   key: "money",
        //   align: "center",
        // },
        {
          title: "电话",
          key: "phoneNumber",
          align: "center",
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
        },

        {
          title: "推客级别",
          key: "tuikeLevelName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.buyTime) {
              state = params.row.tuikeLevelName;
            } else {
              state = "非推客";
            }
            return h("label", state);
          },
        },
        {
          title: "拥金剩余",
          key: "scRemainyongjin",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.buyTime) {
              state = params.row.scRemainyongjin;
            } else {
              state = "非推客";
            }
            return h("label", state);
          },
        },
        {
          title: "未结拥金",
          key: "scWeijieYongjin",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.buyTime) {
              state = params.row.scWeijieYongjin;
            } else {
              state = "非推客";
            }
            return h("label", state);
          },
        },
        {
          title: "已结佣金",
          key: "scYijieYongjin",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.buyTime) {
              state = params.row.scYijieYongjin;
            } else {
              state = "非推客";
            }
            return h("label", state);
          },
        },
        {
          title: "提现银行账户",
          key: "bankCard",
          align: "center",
        },
        {
          title: "是会员",
          key: "ishuiyuan",
          align: "center",
          width: 80,
          render: (h, params) => {
            let state = "";
            if (params.row.buyTime) {
              state = "是";
            } else {
              state = "不是";
            }
            return h("label", state);
          },
        },
        {
          title: "是员工",
          key: "issatff",
          align: "center",
          width: 80,
          render: (h, params) => {
            let state = "";
            if (params.row.staffID) {
              state = "是";
            } else {
              state = "不是";
            }
            return h("label", state);
          },
        },
        {
          title: "添加时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss")),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        orderNumber: "",
      },
      editShow: false,
      checkList: [],
      editID: "",
    };
  },
  methods: {
    getPage() {
      api.get("/xwcloud-wsc/wsc/wsc/GetFangyongJiluPages",this.searchObj).then((res) => {
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
    onClickRow(row, index) {
      this.checkList = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
      } else {
        this.$refs.selection.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.checkList = this.$refs.selection.data[index];
      }
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
      if (onclicks == "settingbilv()") {
        // this.$router.push({
        //   path: "/bilvshezhi",
        // });
        this.$router.push({
          path: "/tuikefangyonglevel",
          query: {},
        });
      } else if (onclicks == "tixianshenghe") {
        this.Ontixianshenghe();
      } else if (onclicks == "tixianliushui") {
        this.Ontixianliushui();
      } else if (onclicks == "buytuike()") {
        this.$router.push({
          path: "/buytuikeinfo",
        });
      } else if (onclicks == "seeMyteam") {
        this.$router.push({
          path: "/lookTeam",
        });
      } else if (onclicks == "fangyongRank") {
        this.$router.push({
          path: "/fanyongrank",
        });
      } else if (onclicks == "edittklv") {
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要修改的数据");
        } else {
          if (this.checkList.buyTime) {
            console.log(this.checkList);
            this.editID = this.checkList.id;
            this.editShow = true;
          } else {
            this.$Message.error("只允许对推客用户进行操作。");
          }
        }
      }
    },
    Ontixianshenghe() {
      this.$router.push({
        path: "/tixianshenhe",
      });
    },
    Ontixianliushui() {},

    search(type = null) {
      this.searchObj.current = 1;
      this.searchObj.size = 10;
      if (type == 1) {
        this.searchObj = {
          size: 10,
          current: 1,
          orderNumber: "",
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
