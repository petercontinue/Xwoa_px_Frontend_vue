<template>
  <div>
    <Row style="margin-top: 20px">
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
      <!---->
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getTeachingSuppliesInfoPages"
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
    <deriveteachingsupplies-form
      v-model="showderive"
      v-on:handleSearch="getTeachingSuppliesInfoPages"
      @increment="deriveExcel"
    >
    </deriveteachingsupplies-form>
    <ruku-form
      v-model="showruku"
      v-on:handleSearch="getTeachingSuppliesInfoPages"
      :editdata="editdata"
    ></ruku-form>
    <chuku-form
      v-model="chukushow"
      v-on:handleSearch="getTeachingSuppliesInfoPages"
      :editdata="editdata"
    ></chuku-form>
    <rukujilu-form
      v-model="showrkjl"
      v-on:handleSearch="getTeachingSuppliesInfoPages"
      :suppliesID="editdataID"
    ></rukujilu-form>
    <chukujilu-form
      v-model="showckjl"
      v-on:handleSearch="getTeachingSuppliesInfoPages"
      :suppliesID="editdataID"
    ></chukujilu-form>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import deriveteachingsuppliesForm from "../../../components/zhaoshengbaoming/baomingjiaofei/deriveteachingsuppliesForm.vue";
import rukuForm from "../../../components/zhaoshengbaoming/baomingjiaofei/rukuForm.vue";
import chukuForm from "../../../components/zhaoshengbaoming/baomingjiaofei/chukuForm.vue";
import rukujiluForm from "../../../components/zhaoshengbaoming/baomingjiaofei/rukujiluForm.vue";
import chukujiluForm from "../../../components/zhaoshengbaoming/baomingjiaofei/chukujiluForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    deriveteachingsuppliesForm,
    rukuForm,
    chukuForm,
    rukujiluForm,
    chukujiluForm,
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
                      this.campusID = value;
                      this.TableSearch();
                    } else {
                      this.campusID = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "商品名称",
          key: "name",
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
                    this.name = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "商品类别",
          key: "typeName",
          align: "center",
        },
        {
          title: "规格",
          key: "specs",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "规格",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.specs = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },

        {
          title: "商品条码",
          key: "changpinTiaoma",
          align: "center",
        },
        {
          title: "库存数量",
          key: "stockNum",
          align: "center",
        },
        {
          title: "数量单位",
          key: "stockUnit",
          align: "center",
        },
        {
          title: "进货单价",
          key: "buyPrice",
          align: "center",
        },
        {
          title: "市场指导价（指导销售价）",
          key: "salePrice",
          align: "center",
        },
        {
          title: "入库记录",
          key: "creatDatetime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.chakanrukujilu(params);
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
        {
          title: "出库记录",
          key: "creatDatetime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.chakanchukujilu(params);
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
        {
          title: "启用状态",
          key: "isQiYong",
          align: "center",
          render: (h, params) => {
            if (params.row.isQiYong) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  "启用"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  "不启用"
                ),
              ]);
            }
          },
        },
      ],
      menuID: "153",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      name: "",
      typeName: "",
      specs: "",
      changpinTiaoma: "",
      showderive: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
      showruku: false,
      chukushow: false,
      showrkjl: false,
      showckjl: false,
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

    getTeachingSuppliesInfoPages() {
      api.get("/xwcloud-zsbm/zsbm/JinXiaoCun/GetTeachingSuppliesPages",{
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        name: this.name,
        typeName: this.typeName,
        specs: this.specs,
        changpinTiaoma: this.changpinTiaoma,
      }).then((res) => {
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
      this.getTeachingSuppliesInfoPages();
    },
    changePage(current) {
      this.current = current;
      this.getTeachingSuppliesInfoPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getTeachingSuppliesInfoPages();
    },
    onSearch(search) {
      window.console.log(search);
    },
    clickShijian(onclicks) {
      if (onclicks == "derive()") {
        this.showderive = true;
      } else if (onclicks == "del()") {
        this.deleteshangpin();
      } else if (onclicks == "enter()") {
        this.editdata = "";
        this.showruku = true;
      } else if (onclicks == "out()") {
        this.shangpinchuku();
      } else if (onclicks == "allEnter()") {
        this.showrkjl = true;
      } else if (onclicks == "allOut()") {
        this.showckjl = true;
      } else if (onclicks == "fenleiEdit()") {
        this.$router.push({
          path: "/goodscategory",
          query: {},
        });
      } else if (onclicks == "edit") {
        this.editshangpin();
      } else if (onclicks == "wpqiyong()") {
        this.wpqiyongjinyong();
      }
    },
    editshangpin() {
      this.editdata = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdata = JSON.stringify(items);
        }
      });
      if (this.editdata == "") {
        this.$Message.error("请选择要编辑的数据");
      } else {
        this.showruku = true;
      }
    },
    deleteshangpin() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "确定删除",
          content: "<p>确认删除选中数据?</p>",
          onOk: () => {
            api.del("/xwcloud-zsbm/zsbm/JinXiaoCun/DeleteTeachingSupplies",{ Id: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getTeachingSuppliesInfoPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
    shangpinchuku() {
      this.editdata = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdata = JSON.stringify(items);
        }
      });
      if (this.editdata == "") {
        this.$Message.error("请选择要出库的商品");
      } else {
        this.chukushow = true;
      }
    },
    deriveExcel(data) {
      axios
        .request({
          method: "get",
          url: "/xwcloud-zsbm/zsbm/JinXiaoCun/exportteachingSupplies",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: data.campusID,
            type: data.type,
          },
          responseType: "blob",
        })
        .then((res) => {
          this.btnLoading = false;
          // 文件下载
          const blob = new Blob([res], {
            type: "application/vnd.ms-excel",
          });
          let link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute(
            "download",
            data.type == 3
              ? "教学物品信息导出.xls"
              : data.type == 1
              ? "导出商品出库信息.xls"
              : "导出商品入库信息.xls"
          );
          link.click();
          link = null;
          this.$Message.success("导出成功");
          this.showderive = false;
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    },
    chakanrukujilu(params) {
      this.editdataID = params.row.id;
      this.showrkjl = true;
    },
    chakanchukujilu(params) {
      this.editdataID = params.row.id;
      this.showckjl = true;
    },
    wpqiyongjinyong() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要操作的数据");
      } else {
        this.$Modal.confirm({
          title: "确定操作",
          content: "<p>确定将该物品启用/禁用?</p>",
          onOk: () => {
            api.get("/xwcloud-zsbm/zsbm/JinXiaoCun/UpdateWupingState",{ ID: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getTeachingSuppliesInfoPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
    searchAll() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.name = "";
      this.typeName = "";
      this.specs = "";
      this.changpinTiaoma = "";
      this.getTeachingSuppliesInfoPages();
    },
  },

  mounted() {
    this.getTeachingSuppliesInfoPages();
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allcampusData = res.obj;
      }
    });
    api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.stugradeData = res.obj;
      }
    });
  },
};
</script>