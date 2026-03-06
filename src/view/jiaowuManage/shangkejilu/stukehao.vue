<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1、删除学员上课记录的同时，系统会把当时消课扣减了学员的课时还回去；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2、删除学员上课记录的同时，（如果是班课）老师的上课记录中的实上人数会减1人，（如果是一对一）老师的上课时记录会同步删除；</span
          >
        </Col>
      </Alert>
    </div>
    <Row style="margin-top: 30px">
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
    <stukehao-form v-model="deriveShow"></stukehao-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import stukehaoForm from "@/components/jiaowuManage/shangkejilu/stukehaoForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    stukehaoForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "251",
      deriveShow: false,
      checkAll: false,
      //考勤类型
      kaoqStyle: [
        { id: "1", name: "正常" },
        { id: "2", name: "请假" },
        { id: "3", name: "旷课" },
        { id: "4", name: "迟到" },
        { id: "5", name: "早退" },
        { id: "6", name: "补课" },
      ],
      //周
      weekList: [
        { id: "1", name: "周一" },
        { id: "2", name: "周二" },
        { id: "3", name: "周三" },
        { id: "4", name: "周四" },
        { id: "5", name: "周五" },
        { id: "6", name: "周六" },
        { id: "7", name: "周末" },
      ],
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      stubuxistyle: [], //补习方式
      delList: {
        ids: "",
      }, //删除的学员课耗IDs
      cklist: [],
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuID: "",
        stuName: "",
        stuGradeID: "",
        className: "",
        kechengName: "",
        banzhuren: "",
        buxiStyleID: "",
        teacherNames: "",
        weekN: "",
        startDate: "",
        endDate: "",
        campusID: "",
        adduser: "",
        stukaoqing: -1,
      },

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
          title: "学号",
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
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
        {
          title: "班级",
          key: "className",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班级",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.className = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程名称",
          key: "kechengName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.kechengName = value;
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
            if (params.row.banzhuren == null) {
              state = "-";
            } else {
              state = params.row.banzhuren;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "培训方式",
                  data: this.stubuxistyle,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.stubuxistyle.forEach((element) => {
                        if (element.id == value) {
                          this.params.buxiStyleID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.buxiStyleID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课教师",
          key: "teacherNames",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上课教师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.teacherNames = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "助教",
          key: "zhujiao",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zhujiao == null || params.row.zhujiao == "") {
              state = "-";
            } else {
              state = params.row.zhujiao;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.haveClassDate,
              "yyyy-MM-dd"
            );
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上课日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startDate = value[0];
                    this.params.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "周几",
          key: "weekN",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "周几",
                  data: this.weekList,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.weekList.forEach((element) => {
                        if (element.id == value) {
                          this.params.weekN = element.name;
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
          title: "上下课时间",
          key: "startLessonDateTime",
          align: "center",
          render: (h, params) => {
            let st = params.row.startLessonDateTime.substring(0, 5);
            let et = params.row.endLessonDateTime.substring(0, 5);
            return h("div", [h("span", st + "-" + et)]);
          },
        },
        {
          title: "排课时长",
          key: "classTimeStyleName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.classTimeStyleName == "-1") {
              state = "1次";
            } else if (params.row.classTimeStyleName == "-2") {
              state = "1天";
            } else {
              state = params.row.classTimeStyleName + "分钟";
            }
            return h("label", state);
          },
        },
        {
          title: "课时",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "课单价",
          key: "kechengPrice",
          align: "center",
        },
        {
          title: "考勤状态",
          key: "stukaoqing",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.stukaoqing) {
              case "1":
                state = "正常";
                break;
              case "2":
                state = "请假";
                break;
              case "3":
                state = "旷课";
                break;
              case "4":
                state = "迟到";
                break;
              case "5":
                state = "早退";
                break;
              case "6":
                state = "补课";
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
                  content: "考勤状态",
                  data: this.kaoqStyle,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.kaoqStyle.forEach((element) => {
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
          title: "添加人",
          key: "adduser",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "添加人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.adduser = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "共享消课",
          key: "shuoMing",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.sharexiaoke == "1") {
              state = "是";
            } else {
              state = "否";
            }
            return h("label", state);
          },
        },
        {
          title: "说明",
          key: "shuoMing",
          align: "center",
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
                      let sm = "";
                      if (params.row.sharexiaoke == "1") {
                        sm =
                          "使用共享消课，共享了" +
                          params.row.sharexiaokeshuoming +
                          "课程,来共享消课。消课说明：" +
                          params.row.shuoMing;
                      } else {
                        sm = params.row.shuoMing;
                      }
                      this.$Modal.info({
                        title: "说明详情",
                        content: "<p>" + sm + "</p>",
                        closable: true,
                        onOk: () => {},
                        onCancel: () => {},
                      });
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked =
        !this.$refs.selection.data[index]._checked;
    },

    getStukehaoListPage() {
      this.checkAll = false;
      api.get("xwcloud-pkxk/kehao/ClassRecord/getStukehaoPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          //   console.log(res);
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
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },

    /**
     *获取补习方式
     */
    getstubuxistyle() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getstubuxiList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stubuxistyle = res.obj;
          console.log(this.stubuxistyle);
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
          console.log(this.stugrade);
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
      } else if (onclicks == "del()") {
        this.delkehao();
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
      this.params.stuID = "";
      this.params.stuName = "";
      this.params.stuGradeID = "";
      this.params.className = "";
      this.params.kechengName = "";
      this.params.banzhuren = "";
      this.params.buxiStyleID = "";
      this.params.teacherNames = "";
      this.params.weekN = "";
      this.params.startDate = "";
      this.params.endDate = "";
      this.params.campusID = "";
      this.params.adduser = "";
      this.params.stukaoqing = -1;
      this.getStukehaoListPage();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getStukehaoListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getStukehaoListPage();
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStukehaoListPage();
    },

    /***按钮事件 */
    derive() {
      this.deriveShow = true;
    },

    // onClickRow(row, index) {
    //   //改变为勾选样式
    //   this.data[index]._checked = !this.data[index]._checked;
    // },

    /**
     * 删除
     */
    delkehao() {
      console.log(this.data);
      var delids="";
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.cklist.push({ id: items.id });
          delids+=items.id+",";
        }
      });
      setTimeout(() => {
        if (delids == "") {
          this.$Message.error("请选择要删除的数据");
        } else {
          console.log(this.delList);
          this.$Modal.confirm({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            onOk: () => {
              api.del("xwcloud-pkxk/kehao/ClassRecord/delStukehao",{ids:delids}).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStukehaoListPage();
                }
              });
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.getStukehaoListPage();
    this.getAllCampusList();
    this.getstugrade();
    this.getstubuxistyle();
  },
};
</script>
