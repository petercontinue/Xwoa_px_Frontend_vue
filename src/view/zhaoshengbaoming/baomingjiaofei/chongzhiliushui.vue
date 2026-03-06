<template>
  <div>
    <div style="margin-top: 20px">
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：使用打印功能时，请先选中要打印的数据行，在开始打印。</span>
        </Col>
      </Alert>
    </div>

    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          :columns="columns"
          :data="data"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button
              size="small"
              style="margin-right: 5px"
              type="warning"
              v-print="printObj"
              >打印</Button
            >
          </template>
        </Table>
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

    <div id="loading" v-show="printLoading">
      <div id="printMe" style="background: red">
        <div style="text-align: left">
          <h1>充值流水小票</h1>
          <Row>
            <Col span="12">校区</Col>
            <Col span="12">{{ checkList.campusName }}</Col>
          </Row>
          <Row>
            <Col span="12">学号</Col>
            <Col span="12" v-if="checkList.zidingyiStuID">{{
              checkList.zidingyiStuID
            }}</Col>
            <Col span="12" v-if="!checkList.zidingyiStuID">{{ checkList.id }}</Col>
          </Row>
          <Row>
            <Col span="12">姓名</Col>
            <Col span="12">{{ checkList.stuName }}</Col>
          </Row>
          <Row>
            <Col span="12">年级</Col>
            <Col span="12">{{ checkList.stuGradeName }}</Col>
          </Row>
          <Row>
            <Col span="12">充值金额</Col>
            <Col span="12">{{ checkList.shijiChongzhiMoney }}</Col>
          </Row>
          <Row>
            <Col span="12">赠送金额</Col>
            <Col span="12">{{ checkList.songMoney }}</Col>
          </Row>
          <Row>
            <Col span="12">实得金额</Col>
            <Col span="12">{{ checkList.shideTotalMoney }}</Col>
          </Row>
          <Row>
            <Col span="12">经办人</Col>
            <Col span="12">{{ checkList.staffName }}</Col>
          </Row>
          <Row>
            <Col span="12">支付方式</Col>
            <Col span="12">{{ checkList.paymoneystyle }}</Col>
          </Row>
          <Row>
            <Col span="12">时间</Col>
            <Col span="12">{{ checkList.addTime }}</Col>
          </Row>
        </div>
      </div>
    </div>

    <derivexinqian-form v-model="showderive" v-on:handleSearch="getteachSubjectPages">
    </derivexinqian-form>
  </div>
</template>
<script>
import derivexinqianForm from "../../../components/zhaoshengbaoming/baomingjiaofei/derivexinqianForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    derivexinqianForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      columns: [
        // {
        //   // type: "selection",
        //   title: "选择操作",
        //   align: "center",
        //   key: "checkBox",
        //   width: 80,
        //   render: (h, params) => {
        //     return h("div", [
        //       h("Checkbox", {
        //         props: {
        //           value: params.row.checkBox,
        //         },
        //         on: {
        //           "on-change": (e) => {
        //             this.data.forEach((items) => {
        //               //先取消所有对象的勾选，checkBox设置为false
        //               this.$set(items, "checkBox", false);
        //             });
        //             this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
        //           },
        //         },
        //       }),
        //     ]);
        //   },
        // },
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
          title: "充值金额",
          key: "shijiChongzhiMoney",
          align: "center",
        },
        {
          title: "赠送金额",
          key: "songMoney",
          align: "center",
        },
        {
          title: "实得总金额",
          key: "shideTotalMoney",
          align: "center",
        },
        {
          title: "经办人",
          key: "staffName",
          align: "center",
        },
        {
          title: "经办时间",
          key: "addTime",
          align: "center",
        },
        {
          title: "支付方式",
          key: "paymoneystyle",
          align: "center",
        },
        {
          // title: "操作",
          // key: "dayinxiaopiao",
          // align: "center",
          // render: (h, params) => {
          //   return h("div", [
          //     h(
          //       "span",
          //       {
          //         style: {
          //           color: "green",
          //         },
          //         on: {
          //           click: () => {
          //             this.xiaopiaodayin(params, 1);
          //           },
          //         },
          //       },
          //       "打印小票"
          //     ),
          //   ]);
          // },

          title: "打印",
          slot: "action",
          width: 80,
          align: "center",
        },
      ],
      printLoading: false,
      printObj: {
        id: "printMe",
        popTitle: "打印",
      },
      checkList: [],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      zidingyiStuID: "",
      stuName: "",
      stuGradeID: 0,
      showderive: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
    };
  },
  methods: {
    search() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.stuName = "";
      this.stuGradeID = 0;
      this.getteachSubjectPages();
    },

    getteachSubjectPages() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetChongzhiLiushuiPages",{
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        stuName: this.stuName,
        stugradeID: this.stuGradeID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //先取消所有对象的勾选，checkBox设置为false
            this.$set(items, "_checked", false);
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
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.checkList = this.$refs.selection.data[index];
      }
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
    xiaopiaodayin() {},
  },

  mounted() {
    this.getteachSubjectPages();
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 143 }).then((res) => {
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
