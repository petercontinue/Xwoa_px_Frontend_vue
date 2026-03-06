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
    <derive-form v-model="showderive" @increment="deriveExcel"> </derive-form>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import deriveForm from "../../../components/zhaoshengbaoming/baomingjiaofei/deriveForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    deriveForm,
  },
  data() {
    return {
      columns: [
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
          title: "订单号",
          key: "orderNo",
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
                    this.OrderNo = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "商品ID",
          key: "suppliesID",
          align: "center",
        },
        {
          title: "商品名称",
          key: "suppliesName",
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
                    this.SuppliesName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },

        {
          title: "出售单价",
          key: "buyPrice",
          align: "center",
        },
        {
          title: "出售数量",
          key: "buySum",
          align: "center",
        },
        {
          title: "合计金额",
          key: "orderMoney",
          align: "center",
        },
        {
          title: "操作人",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "操作人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.staffName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "操作时间",
          key: "creatDatetime",
          align: "center",
        },
      ],
      menuID: "152",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      OrderNo: "",
      SuppliesName: "",
      staffName: "",
      showderive: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
    };
  },
  methods: {
    getteachSubjectPages() {
      api.get("/xwcloud-zsbm/zsbm/JinXiaoCun/getXiaoshouLiushuiPages",{
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        OrderNo: this.OrderNo,
        SuppliesName: this.SuppliesName,
        staffName: this.staffName,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
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
    onSearch(search) {
      window.console.log(search);
    },
    clickShijian(onclicks) {
      if (onclicks == "derive()") {
        this.showderive = true;
      }
    },
    deriveExcel(data) {
      axios
        .request({
          method: "get",
          url: "/xwcloud-zsbm/zsbm/JinXiaoCun/exportXiaoshouliushui",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: data.campusID,
            startDate: data.joinTime[0],
            endDate: data.joinTime[1],
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
          link.setAttribute("download", "物品销售流水.xls");
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
    searchAll() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.OrderNo = "";
      this.SuppliesName = "";
      this.staffName = "";
      this.getteachSubjectPages();
    },
  },

  mounted() {
    this.getteachSubjectPages();
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{menuID:152}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allcampusData = res.obj;
      }
    });
    //api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList",{}).then((res) => {
    //   if (res.code == "Y" && res.success == true) {
    //     this.stugradeData = res.obj;
    //   }
    // });
  },
};
</script>