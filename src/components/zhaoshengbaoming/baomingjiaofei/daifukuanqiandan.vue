<template>
  <Modal
    v-model="show"
    title="待付款签单"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="80"
  >
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
    </Row>
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
    <div slot="footer">
      <Button type="primary" @click="ok()">关闭</Button>
    </div>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
export default {
  name: "daifukuanqiandan",
  components: {
    selectsearchForm,
    inputsearchForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    moneystyle:{
      type:Number,
      default:false,
    }
  },
  data() {
    return {
      show: this.value,
      loading: true,
      menuID: "141",
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
          title: "学号",
          key: "zidingyiStuID",
          align: "center",
          render: (h, params) => {
            if (
              params.row.zidingyiStuID == null ||
              params.row.zidingyiStuID == ""
            ) {
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
                    this.params.zidingyiStuID = value;
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
                    this.params.stuName = value;
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
          key: "HetongMoney",
          align: "center",
        },
        {
          title: "代金券",
          key: "daijinquanMoney",
          align: "center",
          render: (h, params) => {
            if (
              params.row.daijinquanMoney == null ||
              params.row.daijinquanMoney == ""
            ) {
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
          title: "实收金额（元）",
          key: "shishouTotalMoney",
          align: "center",
        },
        {
          title: "课程学费",
          key: "kechengmoney",
          align: "center",
          render: (h, params) => {
            if (
              params.row.kechengmoney == null ||
              params.row.kechengmoney == ""
            ) {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.kechengmoney)]);
            }
          },
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
          title: "录单时间",
          key: "qiandanDate",
          align: "center",
          render(h, params) {
            if (params.row.qiandanDate) {
              return h(
                "div",
                toolbox.dateFtt(params.row.qiandanDate, "yyyy-MM-dd hh:mm:ss")
              );
            } else {
              return h("div", "-");
            }
          },
        },
        {
          title:"签单类别",
          key:"moneyStyle",
          align:"center"
        },
        {
          title: "经办人",
          key: "staffName",
          align: "center",
        },
        {
          title: "业绩人",
          key: "yejistaffName",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      params: {
        size: 10,
        current: 1,
        campusID: 0,
        zidingyiStuID: "",
        stuName: "",
        moneystyle:this.moneystyle
      },
      allcampusData: [],
      stugradeData: [],
    };
  },
  methods: {
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      this.current = current;
      this.Getallchongzhixiangqing();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.Getallchongzhixiangqing();
    },
    onSearch(search) {
      window.console.log(search);
    },
    Getallchongzhixiangqing() {
      api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllDaizhifuqiandanPages",this.params).then((res) => {
        console.log(res);
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    TableSearch() {
      this.Getallchongzhixiangqing();
    },
    searchAll() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = 0;
      this.params.zidingyiStuID = "";
      this.params.stuName = "";
      this.TableSearch();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        console.log(this.moneystyle);
        this.Getallchongzhixiangqing();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-homeschool/homeschool/public/getStugradeList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.stugradeData = res.obj;
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
