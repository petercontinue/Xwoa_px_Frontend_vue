<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          highlight-row
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addcaiwuliushui
      v-model="showadd"
      @handleSearch="getLiushuiPageData"
      :editData="editData"
    ></addcaiwuliushui>
    <editcaiwuliushui
      v-model="showedit"
      :liushuiID="selectobj"
      @handleSearch="getLiushuiPageData"
    ></editcaiwuliushui>
    <ritongji-form v-model="showritongji"></ritongji-form>
    <rishouruduizhang v-model="showrishouru"></rishouruduizhang>
    <liushuixiangxi v-model="showxiangxi" :liushuiID="selectobj"></liushuixiangxi>
    <daochucaiwuliushui v-model="showdaochu"></daochucaiwuliushui>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import Addcaiwuliushui from "../../components/caiwuManage/addcaiwuliushui.vue";
import Editcaiwuliushui from "../../components/caiwuManage/editcaiwuliushui.vue";
import RitongjiForm from "../../components/caiwuManage/ritongjiForm.vue";
import Rishouruduizhang from "../../components/caiwuManage/rishouruduizhang.vue";
import Liushuixiangxi from "../../components/caiwuManage/liushuixiangxi.vue";
import Daochucaiwuliushui from "../../components/caiwuManage/daochucaiwuliushui.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Addcaiwuliushui,
    Editcaiwuliushui,
    RitongjiForm,
    Rishouruduizhang,
    Liushuixiangxi,
    Daochucaiwuliushui,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      columns6: [
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
                    this.data.forEach((item) => {
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
          title: "操作",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.clickxiangxi(params.row);
                  },
                },
              },
              "查看详细"
            );
          },
        },
        {
          title: "流水号",
          key: "id",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "流水号",
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
          render: (h, params) => {
            if (params.row.payMoneyStyle == "-1") {
              return h("div", [h("span", "小程序支付")]);
            } else if (params.row.payMoneyStyle == "-2") {
              return h("div", [h("span", "充值余额支付")]);
            } else {
              return h("div", [h("span", params.row.moneystyleName)]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "支付方式",
                  data: this.allpayMoneydata,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value) {
                      this.params.paystyleID = value;
                      this.TableSearch();
                    } else {
                      this.params.paystyleID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "借方(收入)",
          key: "shouruMoney",
          align: "center",
          width: 120,
        },
        {
          title: "贷方(支出)",
          key: "zhichuMoney",
          align: "center",
          width: 120,
        },
        {
          title: "摘要",
          key: "liushuiZaiyao",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "摘要",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.liushuizhaiyao = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "收入支出分类",
          key: "shouzhiStyle",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "收入支出分类",
                  data: this.shouzhiList,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.shouzhiList.forEach((element) => {
                        if (element.id == value) {
                          this.params.shouzhiStyleID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.shouzhiStyleID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "经办人",
          key: "jinbanrenName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.jinbanrenName == null || params.row.jinbanrenName == "") {
              state = "-";
            } else {
              state = params.row.jinbanrenName;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "经办人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.jinbanrenName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "流水时间",
          key: "liushuiDateTimef",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "流水时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startLiushuiDate = value[0];
                    this.params.endLiushuiDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "录入时间",
          key: "luruTimef",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "341",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        liushuiID: "",
        campusID: "",
        paystyleID: "",
        shouzhiStyleID: "",
        jinbanrenName: "",
        startLiushuiDate: "",
        endLiushuiDate: "",
        liushuizhaiyao: "",
      },
      showadd: false,
      showedit: false,
      showdel: false,
      showdaochu: false,
      showritongji: false,
      showrishouru: false,
      showxiangxi: false,
      selectobj: "",
      allcampusData: [],
      shouzhiList: [],
      editData: "",
      allpayMoneydata: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getLiushuiPageData() {
      api.get("xwcloud-caiwu/caiwu/liushui/getLiushuiPage", this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);

          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
          //console.log(this.data);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getLiushuiPageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getLiushuiPageData();
    },
    clickxiangxi(row) {
      this.selectobj = row.id;
      this.showxiangxi = true;
    },
    edit() {
      let checkList = [];
      this.data.forEach((item) => {
        if (item._checked) {
          checkList.push(item);
        }
      });
      if (checkList.length == 0) {
        this.$Message.error("请选择数据");
        return;
      } else if (checkList.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.showadd = true;
        this.selectobj = checkList[0].id;
        this.editData = JSON.stringify(checkList[0]);
      }
    },
    del(id) {
      if (id == "") {
        this.$Message.error("请选择数据");
        return;
      }
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          api.del("xwcloud-caiwu/caiwu/liushui/delLiushui", { IDs: id }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("删除成功!");
              this.getLiushuiPageData();
            } else {
              this.$Message.error("删除失败!");
            }
          });
        },
        onCancel: () => {},
      });
    },
    daochu() {
      this.showdaochu = true;
    },
    ritongji() {
      this.showritongji = true;
    },
    rishouruduizhang() {
      this.showrishouru = true;
    },
    clickShijian(onclicks) {
      console.log(onclicks);
      let IDs = "";
      this.data.forEach((items) => {
        if (items._checked) {
          IDs += items.id + ",";
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);
      switch (onclicks) {
        case "addinfo":
          this.showadd = true;
          break;
        case "edit":
          this.edit();
          break;
        case "del()":
          this.del(IDs);
          break;
        case "derive()":
          this.daochu();
          break;
        case "daytongji()":
          this.ritongji();
          break;
        case "rishouruduizhang()":
          this.rishouruduizhang();
          break;
      }
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.params.liushuiID = "";
      this.params.campusID = "";
      this.params.paystyleID = "";
      this.params.shouzhiStyleID = "";
      this.params.jinbanrenName = "";
      this.params.startLiushuiDate = "";
      this.params.endLiushuiDate = "";
      this.params.liushuizhaiyao = "";
      this.getLiushuiPageData();
    },

    TableSearch() {
      this.getLiushuiPageData();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getLiushuiPageData();
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    api.get("xwcloud-caiwu/caiwu/liushui/getpayMoneyList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allpayMoneydata.push({ id: "-1", name: "小程序支付" });
        this.allpayMoneydata.push({ id: "-2", name: "余额支付" });
        res.obj.forEach((item) => {
          this.allpayMoneydata.push({ id: item.id, name: item.moneystyleName });
        });
      }
    });

    // 收支类型
    api.get("xwcloud-caiwu/caiwu/liushui/Getshouzhistyle", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.shouzhiList = res.obj;
      } else {
        this.$Message.error(res.msg);
      }
    });
  },
};
</script>
