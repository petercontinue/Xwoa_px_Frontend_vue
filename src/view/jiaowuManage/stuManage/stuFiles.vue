<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >【停课】或【休眠】一对一课程会删除现有排课，停课或休眠班课会自动退班；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>【复课】一对一需要重新排课，复课班课需要重新插班；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>【复课】结课或已退费学员可以操作复课恢复为在读状态；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span style="color: red"
            >【结课】只有学员所有的课都不上了才操作结课，只是某一门或某几门课不上了不要操作结课！</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span style="color: red"
            >【删除】删除学员会把该学员包括报名、消课等所有信息全部删除！该操作不可逆，务必谨慎操作！</span
          >
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
        <Button type="info" ghost @click="ClassLookStu()">按班级查询学员</Button>
      </Col>
    </Row>
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <!-- <Table
          border
          ref="selection"
          :columns="columns6"
          :data="data"
          @on-selection-change="onSelect"
        ></Table>-->

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
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <stuIntegerInfo v-model="IntegarInfoShow" :stuID="IntegerstuID"></stuIntegerInfo>
    <studaijinquanInfo
      v-model="daijinquanInfoShow"
      :stuID="daijinquanstuID"
    ></studaijinquanInfo>
    <stukehaoInfo v-model="kehaoInfoShow" :stuID="kehaostuID"></stukehaoInfo>
    <stuSkInfo v-model="sKINfoShow" :stuID="skstuID"></stuSkInfo>
    <stuInfo v-model="stuInfoShow" :stuID="stuInfoID"></stuInfo>
    <editStu
      v-model="editStuShow"
      :stuID="editstuID"
      v-on:handleSearch="getStuFilesListPage"
    ></editStu>
    <classLookStu v-model="lookstuShow"></classLookStu>
    <importstuFiles
      v-model="importShow"
      v-on:handleSearch="getStuFilesListPage"
    ></importstuFiles>
    <stuzcq
      v-model="zxqShow"
      :stuID="zxqstuID"
      v-on:handleSearch="getStuFilesListPage"
    ></stuzcq>
    <derivestuFiles v-model="DeriveShow"></derivestuFiles>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import stuIntegerInfo from "@/components/jiaowuManage/stuManage/stuIntegerInfo";
import studaijinquanInfo from "@/components/jiaowuManage/stuManage/studaijinquanInfo";
import stukehaoInfo from "@/components/jiaowuManage/stuManage/stukehaoInfo";
import stuSkInfo from "@/components/jiaowuManage/stuManage/stuSkInfo";
import stuInfo from "@/components/jiaowuManage/stuManage/stuInfo";
import editStu from "@/components/jiaowuManage/stuManage/editStu";
import stuzcq from "@/components/jiaowuManage/stuManage/stuzcq";
import classLookStu from "@/components/jiaowuManage/stuManage/classLookStu";
import derivestuFiles from "@/components/jiaowuManage/stuManage/derivestuFiles";
import importstuFiles from "@/components/jiaowuManage/stuManage/importstuFiles";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    stuIntegerInfo,
    studaijinquanInfo,
    stukehaoInfo,
    stuSkInfo,
    stuInfo,
    editStu,
    stuzcq,
    classLookStu,
    derivestuFiles,
    importstuFiles,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "211",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      //学员状态
      stuStyle: [
        // { id: 1, name: "意向(试听)" },
        { id: 2, name: "在读" },
        { id: 3, name: "停课" },
        { id: 4, name: "结课" },
        { id: 5, name: "退费" },
        { id: 6, name: "休眠" },
      ],
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: -1,
        stuName: "",
        stuID: -1,
        parentTel: "",
        banzhuren: "",
        stuGradeID: -1,
        buxiStateID: -1,
      },
      //---------------按钮----------------
      // 按钮弹出
      editStuShow: false,
      editstuID: "",
      checkStuID: [],
      deleteID:"",
      stuIDList: {
        ids: "",
        massage: "",
      },
      zxqShow: false,
      zxqstuID: "",
      //--------------------------------弹出
      stuInfoShow: false,
      qiandanInfoShow: false,
      sKINfoShow: false,
      kebiaoInfoShow: false,
      kehaoInfoShow: false,
      daijinquanInfoShow: false,
      IntegarInfoShow: false,
      lookstuShow: false,
      DeriveShow: false,
      importShow: false,
      IntegerstuID: "",
      daijinquanstuID: "",
      kehaostuID: "",
      skstuID: "",
      stuInfoID: "",
      checkAll: false,
      //---------------表格-----------------
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
          title: "学员详情",
          key: "stuNo",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.stuInfo(params);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
        {
          title: "学员状态",
          key: "buxiStateID",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.buxiStateID) {
              case "1":
                state = "意向(试听)";
                break;
              case "2":
                state = "在读";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "green" },
                    },
                    state
                  ),
                ]);
              case "3":
                state = "停课";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "blue" },
                    },
                    state
                  ),
                ]);
              case "4":
                state = "结课";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "tomato" },
                    },
                    state
                  ),
                ]);
              case "5":
                state = "退费";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "red" },
                    },
                    state
                  ),
                ]);
              case "6":
                state = "休眠";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "blue" },
                    },
                    state
                  ),
                ]);
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
                      this.params.campusID = -1;
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
                    this.params.stuID = value;
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
          title: "家长电话",
          key: "parentTel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "家长电话",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.parentTel = value;
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
          render: (h, params) => {
            let state = "";
            if (params.row.banzhuren == "" || params.row.banzhuren == null) {
              state = "-";
            } else {
              state = params.row.banzhuren;
            }
            return h("div", [h("span", state)]);
          },
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
                      this.stugrade.forEach((element) => {
                        if (element.id == value) {
                          this.params.stuGradeID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.stuGradeID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },

        // {
        //   title: "交费",
        //   key: "stuNo",
        //   align: "center",
        //   width: 80,
        //   render: (h, params) => {
        //     return h("a", [
        //       h(
        //         "span",
        //         {
        //           style: { color: "blue" },
        //           on: {
        //             click: () => {
        //               this.qiandanInfo(params);
        //             },
        //           },
        //         },
        //         "详情(" + params.row.qdSum + ")"
        //       ),
        //     ]);
        //   },
        // },
        // {
        //   title: "上课",
        //   key: "study",
        //   align: "center",
        //   width: 80,
        //   render: (h, params) => {
        //     return h("a", [
        //       h(
        //         "span",
        //         {
        //           style: { color: "blue" },
        //           on: {
        //             click: () => {
        //               this.sKINfo(params);
        //             },
        //           },
        //         },
        //         "详情(" + params.row.shangkeCount + ")"
        //       ),
        //     ]);
        //   },
        // },
        // {
        //   title: "课表",
        //   key: "kebiao",
        //   align: "center",
        //   width: 80,
        //   render: (h, params) => {
        //     return h("a", [
        //       h(
        //         "span",
        //         {
        //           style: { color: "blue" },
        //           on: {
        //             click: () => {
        //               this.kebiaoInfo(params);
        //             },
        //           },
        //         },
        //         "详情"
        //       ),
        //     ]);
        //   },
        // },
        // {
        //   title: "课耗",
        //   key: "kehao",
        //   align: "center",
        //   width: 80,
        //   render: (h, params) => {
        //     return h("a", [
        //       h(
        //         "span",
        //         {
        //           style: { color: "blue" },
        //           on: {
        //             click: () => {
        //               this.kehaoInfo(params);
        //             },
        //           },
        //         },
        //         "详情(" + params.row.kehaoSum + ")"
        //       ),
        //     ]);
        //   },
        // },
        // {
        //   title: "正常考勤率",
        //   key: "zc",
        //   align: "center",

        //   render: (h, params) => {
        //     let state = null;
        //     if (params.row.zongKaoQing == 0) {
        //       state = "无";
        //     } else {
        //       state = params.row.zhangChangkaoqin / params.row.zongKaoQing;
        //     }
        //     return h("div", [h("span", state)]);
        //   },
        // },
        // {
        //   title: "旷课率",
        //   key: "kK",
        //   align: "center",
        //   render: (h, params) => {
        //     let state = null;
        //     if (params.row.zongKaoQing == 0) {
        //       state = "无";
        //     } else {
        //       state = params.row.kuangke / params.row.zongKaoQing;
        //     }
        //     return h("div", [h("span", state)]);
        //   },
        // },
        // {
        //   title: "代金券",
        //   key: "daijinquan",
        //   align: "center",
        //   width: 120,
        //   render: (h, params) => {
        //     return h("a", [
        //       h(
        //         "span",
        //         {
        //           style: { color: "blue" },
        //           on: {
        //             click: () => {
        //               this.daijinquanInfo(params);
        //             },
        //           },
        //         },
        //         "详情(" + params.row.daijingquan + ")"
        //       ),
        //     ]);
        //   },
        // },
        // {
        //   title: "积分",
        //   key: "jifen",
        //   align: "center",
        //   width: 120,
        //   render: (h, params) => {
        //     return h("a", [
        //       h(
        //         "span",
        //         {
        //           style: { color: "blue" },
        //           on: {
        //             click: () => {
        //               this.IntegarInfo(params);
        //             },
        //           },
        //         },
        //         "详情(" + params.row.jifenNum + ")"
        //       ),
        //     ]);
        //   },
        // },
        // {
        //   title: "回访",
        //   key: "huifangCount",
        //   align: "center",
        //   width: 80,
        // },
        // {
        //   title: "家长满意度",
        //   key: "manyiduCount",
        //   align: "center",
        // },
        // {
        //   title: "家长反馈",
        //   key: "fankui",
        //   align: "center",
        // },
      ],
    };
  },

  methods: {
    /**选中---暂时未使用- 选中行选中有问题 */
    // onSelect(selection, index) {
    //   console.log("ss");
    //   //console.log(this.$refs.selection.data)
    //   this.selecteds = selection;
    //   console.log(this.selecteds);
    // },

    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getStuFilesListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/stuManagement/getStuFilesPage", this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api.get('xwcloud-sys/sys/StaffManagement/GetAllcampus',{ menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    /**
     * 获取学员年级
     */
    getstugrade() {
      api.get("xwcloud-stu/stu/stuManagement/Getnianji",{})
      .then((res) => {
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
      if (onclicks == "edit") {
        this.edit();
      } else if (onclicks == "del()") {
        this.del();
      } else if (onclicks == "derive()") {
        this.derive();
      } else if (onclicks == "alltheimport()") {
        this.alltheimport();
      } else if (onclicks == "PauseStudy()") {
        this.OnPauseStudy();
      } else if (onclicks == "longPauseStudy()") {
        this.OnlongPauseStudy();
      } else if (onclicks == "huifuStudy()") {
        this.OnhuifuStudy();
      } else if (onclicks == "jieke()") {
        this.Onjieke();
      } else if (onclicks == "changeCampus()") {
        this.OnchangeCampus();
      }
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = -1;
      this.params.stuName = "";
      this.params.stuID = -1;
      this.params.parentTel = "";
      this.params.banzhuren = "";
      this.params.stuGradeID = -1;
      this.params.buxiStateID = -1;
      this.getStuFilesListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuFilesListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuFilesListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuFilesListPage();
    },

    //-------------------------按钮事件-------------------------------
    edit() {
      this.addstulist();
      if (this.checkStuID.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkStuID.length > 1) {
        this.$Message.error("请选择一行");
      } else {
        console.log(this.checkStuID);
        this.editstuID = this.checkStuID[0].id;
        this.editStuShow = true;
      }
    },

    /**选中的学员添加进列表，方便进行处理 */
    addstulist() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push({
            id: items.stuID,
          });
          this.deleteID+=items.stuID+",";
        }
      });
      this.stuIDList.ids = JSON.stringify(this.checkStuID);
    },

    /**删除学员 */
    del() {
      this.addstulist();
      setTimeout(() => {
        //确保执行过addstulist
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.$Modal.confirm({
            closable: true,
            width: 20,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "删除学员")])]),
                [
                  h("Divider", {
                    style: { margin: "10px 0px 20px 0px" },
                  }),
                ],
                h("Row", [
                  h("Col", { props: { span: 16, offset: 4 } }, [
                    h(
                      "p",
                      "删除学员档案意味着把该学员在系统里的所有数据全部删除，确定要删除吗?"
                    ),
                  ]),
                ]),
              ]);
            },
            onOk: () => {
              console.log(this.stuIDList);
              api.del("xwcloud-stu/stu/stuManagement/delStu?ids="+this.deleteID,{})
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuFilesListPage();
                } else {
                  this.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
    /**导出 */
    derive() {
      this.DeriveShow = true;
    },
    /**导入 */
    alltheimport() {
      this.importShow = true;
    },
    /**停课 */
    OnPauseStudy() {
      this.addstulist();
      setTimeout(() => {
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要停课的学员");
        } else {
          this.$Modal.confirm({
            width: 35,
            closable: true,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "停课")])]),
                [
                  h("Divider", {
                    style: { margin: "10px 0px 20px 0px" },
                  }),
                ],
                h("Row", [
                  h(
                    "Col",
                    {
                      props: {
                        span: 4,
                      },
                    },
                    [
                      h(
                        "p",
                        {
                          style: { margin: "10px" },
                        },
                        "停课说明："
                      ),
                    ]
                  ),
                  h(
                    "Col",
                    {
                      props: {
                        span: 20,
                      },
                    },
                    [
                      h("Input", {
                        props: {
                          value: "",
                          autofocus: true,
                          placeholder: "请填写停课说明",
                          type: "textarea",
                          rows: 3,
                        },
                        on: {
                          input: (val) => {
                            this.value = val;
                          },
                        },
                      }),
                    ]
                  ),
                ]),
              ]);
            },
            onOk: () => {
              this.stuIDList.massage = this.value;
              if (this.stuIDList.massage == "" || this.stuIDList.massage == null) {
                this.$Message.error("请输入停课说明");
              } else {
                api.post("xwcloud-stu/stu/stuManagement/PauseStudy",this.stuIDList)
                // this.PauseStudy(this.stuIDList)
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getStuFilesListPage();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
              }
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
    OnlongPauseStudy() {
      this.addstulist();
      setTimeout(() => {
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要休眠的学员");
        } else {
          this.$Modal.confirm({
            width: 35,
            closable: true,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "休眠")])]),
                [
                  h("Divider", {
                    style: { margin: "10px 0px 20px 0px" },
                  }),
                ],
                h("Row", [
                  h(
                    "Col",
                    {
                      props: {
                        span: 4,
                      },
                    },
                    [
                      h(
                        "p",
                        {
                          style: { margin: "10px" },
                        },
                        "休眠说明："
                      ),
                    ]
                  ),
                  h(
                    "Col",
                    {
                      props: {
                        span: 20,
                      },
                    },
                    [
                      h("Input", {
                        props: {
                          value: "",
                          autofocus: true,
                          placeholder: "请输入休眠说明",
                          type: "textarea",
                          rows: 3,
                        },
                        on: {
                          input: (val) => {
                            this.value = val;
                          },
                        },
                      }),
                    ]
                  ),
                ]),
              ]);
            },
            onOk: () => {
              this.stuIDList.massage = this.value;
              if (this.stuIDList.massage == "" || this.stuIDList.massage == null) {
                this.$Message.error("请输入休眠说明");
              } else {
                api.post("xwcloud-stu/stu/stuManagement/longPauseStudy",this.stuIDList)
                //this.longPauseStudy(this.stuIDList)
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getStuFilesListPage();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
              }
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
    OnhuifuStudy() {
      this.addstulist();
      setTimeout(() => {
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要复课的学员");
        } else {
          this.$Modal.confirm({
            width: 35,
            closable: true,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "复课")])]),
                [
                  h("Divider", {
                    style: { margin: "10px 0px 20px 0px" },
                  }),
                ],
                h("Row", [
                  h(
                    "Col",
                    {
                      props: {
                        span: 4,
                      },
                    },
                    [
                      h(
                        "p",
                        {
                          style: { margin: "10px" },
                        },
                        "复课说明："
                      ),
                    ]
                  ),
                  h(
                    "Col",
                    {
                      props: {
                        span: 20,
                      },
                    },
                    [
                      h("Input", {
                        props: {
                          value: "",
                          autofocus: true,
                          placeholder: "请输入复课说明",
                          type: "textarea",
                          rows: 3,
                        },
                        on: {
                          input: (val) => {
                            this.value = val;
                          },
                        },
                      }),
                    ]
                  ),
                ]),
              ]);
            },
            onOk: () => {
              this.stuIDList.massage = this.value;
              api.post("xwcloud-stu/stu/stuManagement/huifuStudy",this.stuIDList)
              //this.huifuStudy(this.stuIDList)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuFilesListPage();
                  this.value = "";
                } else {
                  this.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
    Onjieke() {
      this.addstulist();
      setTimeout(() => {
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要结课的学员");
        } else {
          this.$Modal.confirm({
            width: 35,
            closable: true,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "结课")])]),
                [
                  h("Divider", {
                    style: { margin: "10px 0px 20px 0px" },
                  }),
                ],
                h("Row", [
                  h(
                    "Col",
                    {
                      props: {
                        span: 4,
                      },
                    },
                    [
                      h(
                        "p",
                        {
                          style: { margin: "10px" },
                        },
                        "结课说明："
                      ),
                    ]
                  ),
                  h(
                    "Col",
                    {
                      props: {
                        span: 20,
                      },
                    },
                    [
                      h("Input", {
                        props: {
                          value: this.value,
                          autofocus: true,
                          placeholder: "请输入结课说明",
                          type: "textarea",
                          rows: 3,
                        },
                        on: {
                          input: (val) => {
                            this.value = val;
                          },
                        },
                      }),
                    ]
                  ),
                ]),
              ]);
            },
            onOk: () => {
              this.stuIDList.massage = this.value;
              if (this.stuIDList.massage == "" || this.stuIDList.massage == null) {
                this.$Message.error("请输入结课说明");
              } else {
                api.post("xwcloud-stu/stu/stuManagement/stuJieke",this.stuIDList)
                //this.stuJieke(this.stuIDList)
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getStuFilesListPage();
                    this.value = "";
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
              }
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },

    OnchangeCampus() {
      if (this.allcampusData.length <= 1) {
        this.$Message.error("单校区系统不支持转校区");
      } else {
        this.addstulist();
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要修改的数据");
        } else if (this.checkStuID.length > 1) {
          this.$Message.error("请选择要一行");
        } else {
          console.log(this.checkStuID);
          this.zxqstuID = this.checkStuID[0].id;
          this.zxqShow = true;
        }
      }
    },

    //-------------------------表格点击弹出----------------------------
    /**学员详情 */
    stuInfo(value) {
      this.stuInfoID = value.row.stuID;
      this.stuInfoShow = true;
    },
    /**交费详情 */
    qiandanInfo(value) {
      this.qiandanInfoShow = true;
      this.$router.push({
        path: "/stuQiandanInfo",
        query: { stuID: value.row.stuID },
      });
    },
    /**上课详情 */
    sKINfo(value) {
      this.skstuID = value.row.stuID;
      this.sKINfoShow = true;
    },
    /**课表详情 */
    kebiaoInfo(value) {
      this.kebiaoInfoShow = true;
    },
    /**课耗详情 */
    kehaoInfo(value) {
      this.kehaostuID = value.row.stuID;
      this.kehaoInfoShow = true;
    },
    /**代金券详情 */
    daijinquanInfo(value) {
      this.daijinquanstuID = value.row.stuID;
      this.daijinquanInfoShow = true;
    },
    /**积分详情 */
    IntegarInfo(value) {
      this.IntegerstuID = value.row.stuID;
      this.IntegarInfoShow = true;
    },
    ClassLookStu() {
      this.lookstuShow = true;
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getstugrade();
    this.getStuFilesListPage();
  },
};
</script>
