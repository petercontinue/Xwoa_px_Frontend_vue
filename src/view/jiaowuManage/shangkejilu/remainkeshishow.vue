<template>
  <div>
    <Row>
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
          stripe
          ref="selection"
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
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>

    <remainkeshi-form v-model="deriveShow"></remainkeshi-form>

    <editkeshiandmon v-model="editShow" :eddata="toData"></editkeshiandmon>
  </div>
</template>
<script>
/**
 * 引入
 */
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import remainkeshiForm from "@/components/jiaowuManage/shangkejilu/remainkeshiForm";
import editkeshiandmon from "@/components/jiaowuManage/shangkejilu/editkeshiandmon";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    remainkeshiForm,
    editkeshiandmon,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "253",
      deriveShow: false,
      editShow: false,
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      //学员状态
      stuStyle: [
        { id: "1", name: "意向" },
        { id: "2", name: "在读" },
        { id: "3", name: "停课" },
        { id: "4", name: "结课" },
        { id: "5", name: "退费" },
        { id: "6", name: "休眠" },
      ],
      toData: "", //要修改的学员的信息
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stugrageID: "",
        stuID: "",
        stuName: "",
        banzhuren: "",
        buxiStateID: "",
      },
      /**
       * table绑定数据
       */
      columns6: [
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
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = element.id;
                          this.TableSearch();
                        }
                      });
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
          title: "年级",
          key: "stuGradeName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年级",
                  data: this.stugrade,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.stugrade.forEach((element) => {
                        if (element.id == value) {
                          this.params.stugrageID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.stugrageID = "";
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
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "学员姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学员姓名",
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
          title: "班主任",
          key: "banzhuren",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班主任",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.banzhuren = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.banzhuren == null || params.row.banzhuren == "") {
              state = "-";
            } else {
              state = params.row.banzhuren;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "学员状态",
          key: "buxiStateID",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.buxiStateID) {
              case 1:
                state = "意向";
                break;
              case 2:
                state = "在读";
                break;
              case 3:
                state = "停课";
                break;
              case 4:
                state = "结课";
                break;
              case 5:
                state = "退费";
                break;
              case 6:
                state = "休眠";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学员状态",
                  data: this.stuStyle,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.stuStyle.forEach((element) => {
                        if (element.id == value) {
                          this.params.buxiStateID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.buxiStateID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "剩余学费",
          key: "remainXuefei",
          align: "center",

          // render: (h, params) => {
          //   return h("div", [
          //     h(
          //       "Button",
          //       {
          //         props: {
          //           type: "info",
          //           size: "small",
          //         },
          //         style: {
          //           marginRight: "5px",
          //         },
          //         on: {
          //           click: () => {
          //             this.gotoxuefeiPage(params.row.stuID, params.row.stuName);
          //           },
          //         },
          //       },
          //       params.row.remainXuefei + "-(详情)"
          //     ),
          //   ]);
          // },
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.gotoxuefeiPage(params.row.stuID, params.row.stuName);
                    },
                  },
                },
                params.row.remainXuefei + "-(详情)"
              ),
            ]);
          },
        },
        {
          title: "剩余尾款",
          key: "weikuan",
          align: "center",
        },
        {
          title: "说明",
          key: "shuoming",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "red",
                  },
                },
                params.row.shuoming
              ),
            ]);
          },
        },
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      this.data.forEach((items) => {
        //先取消所有对象的勾选，checkBox设置为false
        this.$set(items, "_checked", false);
      });
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = true;
      this.toData = JSON.stringify(this.$refs.selection.data[index]);
    },

    /**
     * 获取页面数据
     */
    remainkeshishowListPage() {
      api.get("xwcloud-pkxk/kehao/ClassRecord/remainkeshishowPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    /**
     * 获取学员年级
     */
    getstugrade() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stugrade = res.obj;
        }
      });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.derive();
      } else if (onclicks == "remainks()") {
        this.gotoremainks();
      } else if (onclicks == "remianDay()") {
        this.gotoremainday();
      } else if (onclicks == "editMoyAndKs()") {
        this.editksAndmon();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stugrageID = "";
      this.params.stuID = "";
      this.params.stuName = "";
      this.params.banzhuren = "";
      this.params.buxiStateID = "";
      this.remainkeshishowListPage();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.remainkeshishowListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.remainkeshishowListPage();
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.remainkeshishowListPage();
    },

    /***按钮事件 */
    derive() {
      this.deriveShow = true;
    },
    gotoremainks() {
      this.$router.push({
        path: "/remainkeshi",
        query: {},
      });
    },

    gotoremainday() {
      this.$router.push({
        path: "/remainday",
        query: {},
      });
    },

    gotoxuefeiPage(stuID, stuName) {
      this.$router.push({
        path: "/xuefeixiangqiang",
        query: { ID: stuID, stuName: stuName },
      });
    },

    editksAndmon() {
      // this.data.forEach((items) => {
      //   if (items._checked) {
      //     this.toData = JSON.stringify(this.items);
      //   }
      // });
      if (this.toData == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editShow = true;
      }
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.remainkeshishowListPage();
    this.getAllCampusList();
    this.getstugrade();
  },
};
</script>
