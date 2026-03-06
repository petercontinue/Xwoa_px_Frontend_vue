<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span
            >温馨提示：合同拍照或扫描成一张或多张图片，然后在【合同管理】里面上传；</span
          >
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getHetongInfoPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
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
    <derivexinqian-form
      v-model="showderive"
      v-on:handleSearch="getHetongInfoPages"
    ></derivexinqian-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import derivexinqianForm from "../../../components/zhaoshengbaoming/baomingjiaofei/derivexinqianForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    derivexinqianForm,
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
          width: 80,
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
          title: "学号",
          key: "zidingyiStuID",
          align: "center",
          render: (h, params) => {
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
              return h("div", [h("span", params.row.id)]);
            } else {
              return h("div", [h("span", params.row.zidingyiStuID)]);
            }
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
                    this.zidingyiStuID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "年级/年龄段",
          key: "stuGradeName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年级/年龄段",
                  data: this.stugradeData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.stuGradeID = value;
                      this.TableSearch();
                    } else {
                      this.stuGradeID = 0;
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
          key: "daijinquanMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.daijinquanMoney == null || params.row.daijinquanMoney == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.daijinquanMoney)]);
            }
          },
        },
        {
          title: "优惠金额",
          key: "youhuijine",
          align: "center",
          render: (h, params) => {
            if (params.row.youhuijine == null || params.row.youhuijine == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.youhuijine)]);
            }
          },
        },
        {
          title: "应收（元）",
          key: "hetongMoney",
          align: "center",
        },
        {
          title: "尾款（元）",
          key: "weikuan",
          align: "center",
        },
        {
          title: "课程学费",
          key: "kechengMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.kechengMoney == null || params.row.kechengMoney == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.kechengMoney)]);
            }
          },
        },
        {
          title: "杂费",
          key: "sumotherMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.sumotherMoney == null || params.row.sumotherMoney == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.sumotherMoney)]);
            }
          },
        },
        {
          title: "商品费用",
          key: "qiandansuppliesMoney",
          align: "center",
          render: (h, params) => {
            if (
              params.row.qiandansuppliesMoney == null ||
              params.row.qiandansuppliesMoney == ""
            ) {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.qiandansuppliesMoney)]);
            }
          },
        },
        {
          title: "费用说明",
          key: "beizhu",
          align: "center",
          render: (h, params) => {
            if (params.row.beizhu) {
              return h("div", params.row.beizhu);
            } else {
              return h("div", "-");
            }
          },
        },
        {
          title: "交费时间",
          key: "qiandandate",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "入职时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.Sqiandandate = value[0];
                    this.Eqiandandate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "经办人",
          key: "jinbanStaffName",
          align: "center",
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
                    this.jinbanStaffName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "业绩人",
          key: "yejistaffName",
          align: "center",
          render: (h, params) => {
            if (params.row.yejistaffName == null || params.row.yejistaffName == "") {
              return h("div", [h("span", "-")]);
            } else {
              return h("div", [h("span", params.row.yejistaffName)]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "业绩人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.yejistaffname = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
      ],
      menuID: "144",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      zidingyiStuID: "",
      stuName: "",
      stuGradeID: 0,
      Sqiandandate: "",
      Eqiandandate: "",
      jinbanStaffName: "",
      yejistaffname: "",
      showderive: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
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
    search() {
      this.size = 10;
      this.curren = 1;
      this.campusID = 0;
      this.zidingyiStuID = "";
      this.stuName = "";
      this.stuGradeID = 0;
      this.Sqiandandate = "";
      this.Eqiandandate = "";
      this.jinbanStaffName = "";
      this.yejistaffname = "";
      this.getHetongInfoPages();
    },
    getHetongInfoPages() {
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllQianDanInfoHetongPages", {
          size: this.size,
          current: this.current,
          campusID: this.campusID,
          zidingyiStuID: this.zidingyiStuID,
          stuName: this.stuName,
          stuGradeID: this.stuGradeID,
          jinbanStaffName: this.jinbanStaffName,
          Sqiandandate: this.Sqiandandate,
          Eqiandandate: this.Eqiandandate,
          yejistaffname: this.yejistaffname,
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
      this.getHetongInfoPages();
    },
    changePage(current) {
      this.current = current;
      this.getHetongInfoPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getHetongInfoPages();
    },
    onSearch(search) {
      window.console.log(search);
    },
    clickShijian(onclicks) {
      if (onclicks == "uphetong()") {
        this.editdataID = "";
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdataID = items.id;
          }
        });
        if (this.editdataID == "") {
          this.$Message.error("请先选择签单");
        } else {
          this.$router.push({
            path: "/hetongguanli",
            query: { qiandanID: this.editdataID },
          });
        }
      }
    },
  },

  mounted() {
    this.getHetongInfoPages();
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.stugradeData = res.obj;
      }
    });
  },
};
</script>
