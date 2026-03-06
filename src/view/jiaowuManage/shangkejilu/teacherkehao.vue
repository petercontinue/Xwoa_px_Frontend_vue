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
          ref="selection"
          @on-row-click="onClickRow"
          highlight-row
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

    <Teakehao-form v-model="deriveShow"></Teakehao-form>

    <Nokaoqingstu v-model="qukeShow" :tabID="tkID"></Nokaoqingstu>
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
import TeakehaoForm from "@/components/jiaowuManage/shangkejilu/TeakehaoForm";
import Nokaoqingstu from "@/components/jiaowuManage/shangkejilu/Nokaoqingstu";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    TeakehaoForm,
    Nokaoqingstu,
  },
  data() {
    return {
      qukeShow: false,
      tkID: "",
      data: [], // 接口数据接收
      total: 0,
      menuID: "252",
      deriveShow: false,
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      stubuxistyle: [], //补习方式
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        TeachName: "",
        stuGradeID: "",
        grade: "",
        kechengName: "",
        buxiStyleName: "",
        className: "",
        weekN: "",
        startDate: "",
        endDate: "",
      },
      checkList: [],
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
          title: "教师",
          key: "teachName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "教师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.TeachName = value;
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
          title: "年级",
          key: "grade",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年级",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.grade = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.grade == null || params.row.grade == "") {
              state = "-";
            } else {
              state = params.row.grade;
            }
            return h("div", [h("span", state)]);
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
                          this.params.buxiStyleName = element.id;
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
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "起始日期",
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
          title: "上课时间",
          key: "startLessonDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.startLessonDateTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.startLessonDateTime, "hh:mm:ss");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "下课时间",
          key: "endLessonDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.endLessonDateTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.endLessonDateTime, "hh:mm:ss");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "课时数",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "应上人数",
          key: "ysStuNum",
          align: "center",
        },
        {
          title: "实上人数",
          key: "ssStuNum",
          align: "center",
        },
        {
          title: "缺课学员",
          key: "shuoMing",
          align: "center",
          render: (h, params) => {
            if (params.row.ysStuNum == params.row.ssStuNum) {
              return h("div", [h("span", { style: { color: "green" } }, "全勤")]);
            } else {
              return h("a", [
                h(
                  "span",
                  {
                    style: { color: "blue" },
                    on: {
                      click: () => {
                        this.kaoqinstu(params);
                      },
                    },
                  },
                  "查看"
                ),
              ]);
            }
          },
        },
        {
          title: "说明",
          key: "shuoMing",
          align: "center",
          render: (h, params) => {
            if (params.row.shuoMing == null || params.row.shuoMing == "") {
              return h("div", "-");
            } else {
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
                        this.$Modal.info({
                          title: "说明详情",
                          content: "<p>" + params.row.shuoMing + "</p>",
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
            }
          },
        },
      ],
    };
  },

  methods: {
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

    /**
     * 获取页面数据
     */
    getTeakehaoListPage() {
      api.get("xwcloud-pkxk/kehao/ClassRecord/getTeakehaoPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
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
      } else if (onclicks == "del()") {
        this.Ondel();
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
      this.params.TeachName = "";
      this.params.stuGradeID = "";
      this.params.grade = "";
      this.params.kechengName = "";
      this.params.buxiStyleName = "";
      this.params.className = "";
      this.params.teacherNames = "";
      this.params.weekN = "";
      this.params.startDate = "";
      this.params.weekN = "";
      this.params.endDate = "";
      this.getTeakehaoListPage();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getTeakehaoListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getTeakehaoListPage();
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getTeakehaoListPage();
    },

    Ondel() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据！！！");
      } else {
        this.$Modal.confirm({
          content:
            "<p>删除教师课时时，会删除选中数据对应此次排课的全部课耗信息（包括此次排课的全部老师、学员的课耗信息），是否继续删除老师课耗?</p>",
          onOk: () => {
            api.del("xwcloud-pkxk/kehao/ClassRecord/delteakehao",{ id: this.checkList.id }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getTeakehaoListPage();
                //重置
                this.checkList = [];
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },

    /***按钮事件 */
    derive() {
      this.deriveShow = true;
    },
    kaoqinstu(kqs) {
      this.qukeShow = true;
      this.tkID = kqs.row.id;
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.getTeakehaoListPage();
    this.getAllCampusList();
    this.getstugrade();
    this.getstubuxistyle();
  },
};
</script>
