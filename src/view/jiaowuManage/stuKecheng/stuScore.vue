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
    <derivestuScore v-model="ScoreShow"></derivestuScore>
    <addStuScore v-model="addShow" v-on:handleSearch="getScoreListPage"></addStuScore>
    <editStuScore
      v-model="editShow"
      :data="editallme"
      v-on:handleSearch="getScoreListPage"
      v-on:handleSearch2="resData"
    ></editStuScore>
    <importstuScore
      v-model="importShow"
      v-on:handleSearch="getScoreListPage"
    ></importstuScore>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import derivestuScore from "@/components/jiaowuManage/stuKecheng/derivestuScore";
import addStuScore from "@/components/jiaowuManage/stuKecheng/addStuScore";
import editStuScore from "@/components/jiaowuManage/stuKecheng/editStuScore";
import importstuScore from "@/components/jiaowuManage/stuKecheng/importstuScore";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    derivestuScore,
    addStuScore,
    editStuScore,
    importstuScore,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "225",
      allcampusData: [], //校区查询获取到的校区数据
      alltype: [
        { id: "0", name: "培训机构成绩" },
        { id: "1", name: "在校成绩" },
      ],
      ids: [],
      delscore: {
        ids: "",
      },
      checkList: [],
      editallme: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        scoreType: -1,
        stuName: "",
        campusID: "",
      },
      ScoreShow: false,
      addShow: false,
      editShow: false,
      importShow: false,
      checkAll: false,
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
          title: "操作",
          key: "xq",
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
                      console.log(params.row);
                      //this.stuInfo(params);//打开成绩详情

                      this.$Modal.success({
                        closable: true,
                        width: 40,
                        render: (h) => {
                          let style = {};
                          style.style = {
                            fontWeight: "bolder",
                            lineHeight: "32px",
                            fontFamily: "黑体",
                          };
                          return h("div", [
                            h("Row", [
                              h("Col", { props: { span: 20 } }, [h("p", "成绩信息")]),
                            ]),
                            [
                              h("Divider", {
                                style: { margin: "10px 0px 20px 0px" },
                              }),
                            ],
                            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
                              h("Col", { props: { span: 2, offset: 1 } }, [
                                h("label", style, "学员:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.stuName),
                              ]),

                              h("Col", { props: { span: 2, offset: 2 } }, [
                                h("label", style, "年级:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.stuGradeName),
                              ]),
                            ]),

                            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
                              h("Col", { props: { span: 2, offset: 1 } }, [
                                h("label", style, "校区:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.campusName),
                              ]),

                              h("Col", { props: { span: 2, offset: 2 } }, [
                                h("label", style, "成绩:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.score),
                              ]),
                            ]),

                            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
                              h("Col", { props: { span: 2, offset: 1 } }, [
                                h("label", style, "科目:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.subjectName),
                              ]),

                              h("Col", { props: { span: 2, offset: 2 } }, [
                                h("label", style, "课程:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.kechengName),
                              ]),
                            ]),
                            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
                              h("Col", { props: { span: 2, offset: 1 } }, [
                                h("label", style, "总分排名:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.zongfenpaiming),
                              ]),

                              h("Col", { props: { span: 2, offset: 2 } }, [
                                h("label", style, "单科排名:"),
                              ]),
                              h("Col", { props: { span: 6 } }, [
                                h("label", style, params.row.dankepaiming),
                              ]),
                            ]),

                            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
                              h("Col", { props: { span: 2, offset: 1 } }, [
                                h("label", style, "测试内容:"),
                              ]),
                              h("Col", { props: { span: 20 } }, [
                                h("label", style, params.row.testTitle),
                              ]),
                            ]),

                            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
                              h("Col", { props: { span: 2, offset: 1 } }, [
                                h("label", style, "备注:"),
                              ]),
                              h("Col", { props: { span: 20 } }, [
                                h("label", style, params.row.beiZhu),
                              ]),
                            ]),
                          ]);
                        },
                      });
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
        {
          title: "校区",
          key: "campusName",
          align: "center",
          width: 200,
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
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 90,
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
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
        },
        {
          title: "测试内容",
          key: "testTitle",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            if (params.row.testTitle == "" || params.row.testTitle == null) {
              state = "-";
            } else {
              if (params.row.testTitle.length > 20) {
                state = params.row.testTitle.substring(0, 20) + "...";
              } else {
                state = params.row.testTitle;
              }
            }
            return h("div", [h("span", state)]);

            // return h("div", [
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "info",
            //         size: "small",
            //       },
            //       style: {
            //         marginRight: "5px",
            //       },
            //       on: {
            //         click: () => {
            //           this.$Modal.info({
            //             title: "测试内容:",
            //             content: params.row.testTitle,
            //             onOk: () => {},
            //           });
            //         },
            //       },
            //     },
            //     "详情"
            //   ),
            // ]);
          },
        },
        {
          title: "分数",
          key: "score",
          align: "center",
        },
        {
          title: "单科排名",
          key: "dankepaiming",
          align: "center",
        },
        {
          title: "总分排名",
          key: "zongfenpaiming",
          align: "center",
        },
        {
          title: "考试类别",
          key: "testType",
          align: "center",
        },
        {
          title: "成绩类型",
          key: "scoreType",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.scoreType) {
              case "0":
                state = "培训机构成绩";
                break;
              case "1":
                state = "在校成绩";
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
                  content: "成绩类型",
                  data: this.alltype,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.alltype.forEach((element) => {
                        if (element.id == value) {
                          this.params.scoreType = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.scoreType = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "考试日期",
          key: "scoreDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.scoreDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.scoreDate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "录入日期",
          key: "addDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.addDateTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.addDateTime, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "录入人",
          key: "staffName",
          align: "center",
        },
        {
          title: "备注",
          key: "beiZhu",
          align: "center",
          width: 100,
          render: (h, params) => {
            // return h("div", [
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "info",
            //         size: "small",
            //       },
            //       style: {
            //         marginRight: "5px",
            //       },
            //       on: {
            //         click: () => {
            //           this.$Modal.info({
            //             title: "备注:",
            //             content: params.row.beiZhu,
            //             onOk: () => {},
            //           });
            //         },
            //       },
            //     },
            //     "详情"
            //   ),
            // ]);
            let state = "";
            if (params.row.beiZhu == "" || params.row.beiZhu == null) {
              state = "-";
            } else {
              if (params.row.beiZhu.length > 10) {
                state = params.row.beiZhu.substring(0, 10) + "...";
              } else {
                state = params.row.beiZhu;
              }
            }
            return h("div", [h("span", state)]);
          },
        },
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getScoreListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/buxikecheng/getScorePage",this.params).then((res) => {
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
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.Onderive();
      } else if (onclicks == "addinfo") {
        this.Onaddinfo();
      } else if (onclicks == "edit") {
        this.Onedit();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "theimport()") {
        this.Ontheimport();
      }
    },
    /**导出 */
    Onderive() {
      this.ScoreShow = true;
    },
    /**添加 */
    Onaddinfo() {
      this.addShow = true;
    },

    /**修改 */
    Onedit() {
      this.checkList = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.editallme = JSON.stringify(items);
          this.checkList.push(items.id);
        }
      });
      if (this.editallme == "") {
        this.$Message.error("请选择要修改的数据！");
      } else {
        if (this.checkList.length > 1) {
          this.$Message.error("请选择一行");
        } else {
          this.editShow = true;
        }
      }
    },
    /**修改退出时去掉push到checkList的数据 */
    resData() {
      this.checkList = [];
      this.editallme = "";
    },
    /**批量删除 */
    Ondel() {
      this.data.forEach((items) => {
        if (items._checked) {
          this.ids.push({ id: items.id });
        }
      });
      setTimeout(() => {
        if (this.ids.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.$Modal.confirm({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            onOk: () => {
              this.delscore.ids = JSON.stringify(this.ids);
              api.del("xwcloud-stu/stu/buxikecheng/delScore",this.delscore).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getScoreListPage();
                  this.ids = [];
                } else {
                  this.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {
              this.ids = [];
            },
          });
        }
      }, 200);
    },
    Ontheimport() {
      this.importShow = true;
    },
    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.scoreType = -1;
      this.getScoreListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getScoreListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getScoreListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getScoreListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getScoreListPage();
  },
};
</script>
