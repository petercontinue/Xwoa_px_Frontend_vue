<template>
  <div>
    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getqiandanshenpiPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns"
          @on-row-click="onClickRow"
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
      menuID: "150",
      columns: [
        {
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
          title: "学生姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学生姓名",
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
                      this.params.campusID = value;
                      this.TableSearch();
                    } else {
                      this.params.campusID = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "总金额",
          key: "hetongMoney",
          align: "center",
        },
        {
          title: "代金券",
          key: "daijinquanmoney",
          align: "center",
        },
        {
          title: "优惠金额",
          key: "youhuijine",
          align: "center",
        },
        {
          title: "应收（元）",
          key: "hetongMoney",
          align: "center",
        },
        {
          title:"实收（元）",
          key:"shishouTotalMoney",
          align:"center"
        },
        {
          title: "尾款（元）",
          key: "weikuan",
          align: "center",
          render: (h, params) => {
            if (params.row.dingjing == 0) {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [
                h(
                  "span",
                  params.row.hetongMoney - params.row.shishouTotalMoney
                ),
              ]);
            }
          },
        },
        {
          title: "课程学费",
          key: "kechengmoney",
          align: "center",
        },
        {
          title: "杂费",
          key: "zafeimoney",
          align: "center",
        },
        {
          title: "商品费用",
          key: "wupinmoney",
          align: "center",
        },
        {
          title: "费用说明",
          key: "beizhu",
          align: "center",
          render: (h, params) => {
            if (params.row.beizhu == "" || params.row.beizhu == null) {
              return h("div", [h("span", "-")]);
            } else {
              return h("div", [h("span", params.row.beizhu)]);
            }
          },
        },
        {
          title: "交费时间",
          key: "qiandandate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.qiandandate, "yyyy-MM-dd")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "交费时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.Sqiandandate = value[0];
                    this.params.Eqiandandate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "经办人",
          key: "jinbanren",
          align: "center",
        },
        {
          title: "业绩人",
          key: "yejistaffName",
          align: "center",
        },
        {
          title: "支付方式",
          key: "paystyle",
          align: "center",
        },
        {
          title: "审批状态",
          key: "shenpiState",
          align: "center",
          render: (h, params) => {
            if (params.row.shenpiState == 0) {
              return h("div", [h("span", "未审批")]);
            } else if (params.row.shenpiState == 1) {
              return h("div", [h("span",  { style: { color: "red" } },"审批不通过")]);
            } else if (params.row.shenpiState == 2) {
              return h("div", [h("span", { style: { color: "green" } }, "审批通过")]);
            }
          },
        },
        {
          title: "审批人",
          key: "shenpistaffname",
          align: "center",
          render: (h, params) => {
            if (
              params.row.shenpistaffname == null ||
              params.row.shenpistaffname == ""
            ) {
              return h("div", [h("span", "-")]);
            } else {
              return h("div", [h("span", params.row.shenpistaffname)]);
            }
          },
        },
      ],
      data: [],
      total: 0,
      params: {
        size: 10,
        current: 1,
        stuName: "",
        campusID: 0,
        Sqiandandate: "",
        Eqiandandate: "",
      },
      buxiStyleName: "",
      editdataID: "",
      editData: [],
      qiyeID: "",
      buxiStyleNameA: "",
      allcampusData: [],
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
      this.$refs.selection.data[index].checkBox =
        !this.$refs.selection.data[index].checkBox;
    },
    getqiandanshenpiPages() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllQiandanshenpiInfoPages",this.params).then((res) => {
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
    changePage(current) {
      this.params.current = current;
      this.getqiandanshenpiPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.params.size = pageSize;
      this.getqiandanshenpiPages();
    },
    onSearch(search) {
      window.console.log(search);
    },
    deleteqianjdanshenpi() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
          this.editData = items;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        if (this.editData.shenpiState != 0) {
          this.$Message.error("已经审批的数据不允许删除！");
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>确定删除该签单审批?</p>",
            onOk: () => {
              api.del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteQiandanshengPiInfo",{ id: this.editdataID }).then(
                (result) => {
                  if (result.code == "Y" && result.success == true) {
                    this.$Message.success("信息删除成功");
                    this.getqiandanshenpiPages();
                  } else {
                    this.$Message.error("信息删除失败");
                  }
                }
              );
            },
          });
        }
      }
    },
    //签单审批  通过
    shenpiPass() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
          this.editData = items;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要操作的数据");
      } else {
        if (this.editData.shenpiState != 0) {
          this.$Message.error("该签单已经审批过了，不能重复操作");
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>确定通过该签单?</p>",
            onOk: () => {
              api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/PassQiandanShenpi",{ shenpiID: this.editdataID }).then(
                (result) => {
                  if (result.code == "Y" && result.success == true) {
                    this.$Message.success("审批操作成功");
                    this.getqiandanshenpiPages();
                  } else {
                    this.$Message.error("签单审批失败！");
                  }
                }
              );
            },
          });
        }
      }
    },
    shenpibohui() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
          this.editData = items;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要操作的数据");
      } else {
        if (this.editData.shenpiState != 0) {
          this.$Message.error("该签单已经审批过了，不能重复操作");
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>确定驳回该签单申请审批?</p>",
            onOk: () => {
              api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/qiandanshenpibohui",{
                shenpiID: this.editdataID,
                shenpiReson: "",
              }).then((result) => {
                if (result.code == "Y" && result.success == true) {
                  this.$Message.success("操作成功");
                  this.getqiandanshenpiPages();
                } else {
                  this.$Message.error("签单审批失败！");
                }
              });
            },
          });
        }
      }
    },
    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "shenpi()") {
        this.shenpiPass();
      } else if (onclicks == "shenpibohui()") {
        this.shenpibohui();
      } else if (onclicks == "del()") {
        this.deleteqianjdanshenpi();
      }
    },
    TableSearch() {
      this.getqiandanshenpiPages();
    },
    searchAll() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuName = "";
      this.params.campusID = 0;
      this.params.Sqiandandate = "";
      this.params.Eqiandandate = "";
      this.getqiandanshenpiPages();
    },
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getqiandanshenpiPages();
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allcampusData = res.obj;
      }
    });
  },
};
</script>
