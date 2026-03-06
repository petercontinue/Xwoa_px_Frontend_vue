<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>1 添加商品前请先设置商品分类；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 添加商品后，要操作“上架”，商品才会显示在微信商城上；</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getTableData"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
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
    <updatebilv-form
      v-model="showupdatebilv"
      :editData="editData"
      v-on:handleSearch="getTableData"
    ></updatebilv-form>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import updatebilvForm from "@/components/zhaoshengbaoming/wxmall/updatebilvForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    updatebilvForm,
  },
  data() {
    return {
      menuID: "121",
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
          title: "商品名称",
          key: "goodsName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "商品名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.goodsName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "商品类别",
          key: "goodsType",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "商品类别",
                  data: this.allgoodType,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allgoodType.forEach((element) => {
                        if (element.id == value) {
                          this.searchObj.goodsTypeID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.searchObj.goodsTypeID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "商品类型",
          key: "style",
          align: "center",
          render: (h, params) => {
            if (params.row.style == 1) {
              return h("div", [h("span", "课程商品")]);
            } else if (params.row.style == 2) {
              return h("div", [h("span", "实物商品")]);
            } else if (params.row.style == 3) {
              return h("div", [h("span", "其他虚拟商品")]);
            }
          },
        },
        {
          title: "一口价(元)",
          key: "basicPrice",
          align: "center",
        },
        {
          title: "积分兑换价",
          key: "jifenPriceShuxing",
          align: "center",
          render: (h, params) => {
            if (params.row.jifenPriceShuxing) {
              return h("div", [h("span", params.row.jifenPriceShuxing)]);
            } else {
              return h("div", [h("span", params.row.jifenPrice)]);
            }
          },
        },
        {
          title: "商品活动",
          key: "huodongName",
          align: "center",
        },
        {
          title: "主图",
          key: "img1",
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
                    src: params.row.img1,
                    style: "width: 60px;height: 60px;border-radius: 2px;",
                  },
                  style: {},
                }),
              ]
            );
          },
        },
        {
          title: "商品排序",
          key: "paixu",
          align: "center",
        },
        {
          title: "购物车数量",
          key: "gwcshuliang",
          align: "center",
        },
        {
          title: "评价",
          key: "bili",
          align: "center",
        },
        {
          title: "上架状态",
          key: "shangjiaState",
          align: "center",
          render: (h, params) => {
            if (params.row.shangjiaState == 1) {
              return h("div", [h("span", { style: { color: "green" } }, "已上架")]);
            } else {
              return h("div", [h("span", { style: { color: "red" } }, "未上架")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上架状态",
                  data: this.upType,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.upType.forEach((element) => {
                        if (element.id == value) {
                          this.searchObj.shangjiaState = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.searchObj.shangjiaState = "";
                      this.TableSearch();
                    }
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
        goodsName: "",
        goodsTypeID: -1,
        shangjiaState: -1,
      },
      showupdatebilv: false,
      editData: "",
      editgoodsID: "",
      checkList: [],
      upType: [
        { id: 0, name: "未上架" },
        { id: 1, name: "已上架" },
      ],
      allgoodType: [],
    };
  },
  methods: {
    getAllgoodTypeList() {
      api.get("/xwcloud-wsc/wsc/wmallcontroller/getAllgoodType", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          res.obj.forEach((items) => {
            this.allgoodType.push({ id: items.id, name: items.goodstype });
          });
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

    search() {
      this.searchObj.current = 1;
      this.searchObj.size = 10;
      this.searchObj.goodsName = "";
      this.searchObj.goodsTypeID = -1;
      this.searchObj.shangjiaState = -1;
      this.getTableData();
    },

    getTableData() {
      api.get("/xwcloud-wsc/wsc/wsc/getWscGoodsPage", this.searchObj).then((res) => {
        console.log(res);
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
    TableSearch() {
      this.getTableData();
    },
    changePage(current) {
      this.tableData.current = current;
      this.getTableData();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.tableData.size = pageSize;
      this.getTableData();
    },
    updatebilv() {
      this.editData = "";

      if (this.checkList.length == 0) {
        this.$Message.error("请选择要编辑的数据");
      } else {
        this.editData = JSON.stringify(this.checkList);
        this.showupdatebilv = true;
      }
    },

    clickShijian(onclicks) {
      if (onclicks == "addinfo") {
        this.$router.push({
          path: "/addnewgoods",
          query: { goodsID: 0 },
        });
      } else if (onclicks == "edit") {
        this.editgoodsID = "";
        this.tableData.forEach((items) => {
          if (items._checked) {
            this.editgoodsID = items.id;
          }
        });
        if (this.editgoodsID == "") {
          this.$Message.error("请选择要操作的数据");
        } else {
          this.$router.push({
            path: "/addnewgoods",
            query: { goodsID: this.editgoodsID },
          });
        }
      } else if (onclicks == "del()") {
        this.deleteWscGoods();
      } else if (onclicks == "fenleiEdit()") {
        this.$router.push({
          path: "/goodCategory",
        });
      } else if (onclicks == "shangjia()") {
        this.editgoodsID = "";
        this.tableData.forEach((items) => {
          if (items._checked) {
            this.editgoodsID = items.id;
          }
        });
        if (this.editgoodsID == "") {
          this.$Message.error("请选择要操作的数据");
        } else {
          this.$Modal.confirm({
            title: "提示信息",
            content: "<p>确定将该商品上架?</p>",
            onOk: () => {
              api
                .get("/xwcloud-wsc/wsc/wsc/UpdateWscGoodsStateByID", {
                  goodsID: this.editgoodsID,
                  shangjiaState: 1,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success("商品上架成功");
                    this.getTableData();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            },
          });
        }
      } else if (onclicks == "xiajia()") {
        this.editgoodsID = "";
        this.tableData.forEach((items) => {
          if (items._checked) {
            this.editgoodsID = items.id;
          }
        });
        if (this.editgoodsID == "") {
          this.$Message.error("请选择要操作的数据");
        } else {
          this.$Modal.confirm({
            title: "提示信息",
            content: "<p>确定将该商品下架?</p>",
            onOk: () => {
              api
                .get("/xwcloud-wsc/wsc/wsc/UpdateWscGoodsStateByID", {
                  goodsID: this.editgoodsID,
                  shangjiaState: 0,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success("商品下架成功");
                    this.getTableData();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            },
          });
        }
      }
    },
    deleteWscGoods() {
      this.editgoodsID = "";
      this.tableData.forEach((items) => {
        if (items._checked) {
          this.editgoodsID = items.id;
        }
      });
      if (this.editgoodsID == "") {
        this.$Message.error("请选择需要删除的商品");
      } else {
        this.$Modal.confirm({
          title: "提示信息",
          content: "<p>确定删除该商品信息?</p>",
          onOk: () => {
            api
              .del("/xwcloud-wsc/wsc/wsc/deleteWscGoodsByIDs", {
                id: this.editgoodsID,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("删除商品信息成功");
                  this.getTableData();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {
            this.$Message.info("取消删除操作");
          },
        });
      }
    },
  },
  mounted() {
    this.getTableData();
    this.getAllgoodTypeList();
  },
};
</script>

<style lang="" scoped></style>
