<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchall()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          highlight-row
          @on-row-click="onClickRow"
          ref="selection"
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addlaoshikehoupingjia-form
      v-model="addShow"
      v-on:handleSearch="getFeedbackListPage"
    ></addlaoshikehoupingjia-form>
    <editlaoshikehoupingjia-form
      v-model="editShow"
      :pinjiaID="editpingjiaID"
      v-on:handleSearch="getFeedbackListPage"
    ></editlaoshikehoupingjia-form>
    <daochulaoshikehoupingjia-form
      v-model="daochuShow"
      :pingjiatype="type"
      fileName="教师反馈"
      v-on:handleSearch="getFeedbackListPage"
    ></daochulaoshikehoupingjia-form>
    <lookfeedImg v-model="ImgShow" :address="ImgAddr"></lookfeedImg>
    <addteaEvaluation
      v-model="pjShow"
      :editdata="editdata"
      v-on:handleSearch="getFeedbackListPage"
    ></addteaEvaluation>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import AddlaoshikehoupingjiaForm from "../../../components/jiaowuManage/addlaoshikehoupingjiaForm.vue";
import EditlaoshikehoupingjiaForm from "../../../components/jiaowuManage/editlaoshikehoupingjiaForm.vue";
import DaochulaoshikehoupingjiaForm from "../../../components/jiaowuManage/daochulaoshikehoupingjiaForm.vue";
import lookfeedImg from "@/components/jiaowuManage/lookfeedImg";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import addteaEvaluation from "@/components/jiaowuManage/addteaEvaluation";
import * as api from "@/api/api.js";

export default {
  mounted: function () {
    // 初始化页面
    this.getFeedbackListPage();
    this.getAllCampusList();
  },
  components: {
    buttonsForm,
    AddlaoshikehoupingjiaForm,
    EditlaoshikehoupingjiaForm,
    DaochulaoshikehoupingjiaForm,
    DaochulaoshikehoupingjiaForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    lookfeedImg,
    addteaEvaluation,
    // 按钮控件
  },
  data() {
    return {
      columns6: [
        // {
        //   title: " ",
        //   align: "center",
        //   key: "checkBox",
        //   width: 60,
        //   render: (h, params) => {
        //     return h("div", [
        //       h("Checkbox", {
        //         props: {
        //           value: params.row._checked,
        //         },
        //         on: {
        //           "on-change": (e) => {},
        //         },
        //       }),
        //     ]);
        //   },
        // },
        {
          title: "操作",
          key: "caozuo",
          align: "center",
          render: (h, params) => {
            if (params.row.note == null || params.row.note == "") {
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
                        this.editdata = JSON.stringify(params.row);
                        this.pjShow = true;
                      },
                    },
                  },
                  "编辑"
                ),
              ]);
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
                        this.editdata = JSON.stringify(params.row);
                        this.pjShow = true;
                      },
                    },
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.delpj(params.row.pjID);
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            }
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
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.campusID = value;
                      this.search();
                    } else {
                      this.campusID = "";
                      this.search();
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
                    this.stuId = value;
                    this.search();
                  },
                },
              }),
            ]);
          },

          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }

            return h("label", state);
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
                    this.search();
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
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "上课时间",

          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.haveClassDate == null) {
              datehave = "-";
            } else {
              let hd = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
              datehave =
                hd +
                " -" +
                params.row.startLessonDateTime.substring(0, 5) +
                "-" +
                params.row.endLessonDateTime.substring(0, 5);
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "评语",
          key: "note",
          align: "center",
          width: 80,
          render: (h, params) => {
            if (params.row.note == null || params.row.note == "") {
              return h("label", "暂未评价");
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
                        this.$Modal.success({
                          title: "教师评语:",
                          content: params.row.note,
                          width: 40,
                          onOk: () => {},
                        });
                      },
                    },
                  },
                  "详情"
                ),
              ]);
            }
          },
        },
        // {
        //   title: "图片",
        //   key: "pjmp3Url",
        //   align: "center",
        //   render: (h, params) => {
        //     if (params.row.pjmp3Url == null || params.row.pjmp3Url == "") {
        //       return h("div", [h("span", "暂无")]);
        //     } else {
        //       return h("div", [
        //         h(
        //           "Button",
        //           {
        //             props: {
        //               type: "primary",
        //               size: "small",
        //             },
        //             style: {
        //               marginRight: "5px",
        //             },
        //             on: {
        //               click: () => {
        //                 this.ImgAddr = params.row.pjmp3Url;
        //                 this.ImgShow = true;
        //               },
        //             },
        //           },
        //           "查看"
        //         ),
        //       ]);
        //     }
        //   },
        // },
        {
          title: "教师姓名",
          key: "teacherNames",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "教师姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.teacherName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "评价时间",
          key: "noteaddTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.noteaddTime == null || params.row.noteaddTime == "") {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.noteaddTime, "yyyy-MM-dd hh:mm");
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      editdata: "",
      pjShow: false,
      data: [], // 接口数据接收
      total: 0,
      size: 10,
      current: 1,
      menuID: "261",
      staffID: "11",
      // 控制弹窗
      addShow: false, // 添加数据控制
      editShow: false, // 编辑数据控制
      daochuShow: false, // 导出数据控制
      // 表头弹窗控制
      headerSearchCampusVisible: false, // 查询校区
      headerSearchStuIDVisible: false, // 查询学号
      headerSearchStuNameVisible: false, // 查询学生名称
      headerSearchStaffNameVisible: false, // 查询老师名称
      verticalSearch: "", // 校区选择存储
      // 搜索数据字段
      type: 1,
      campusID: "",
      stuId: "",
      stuName: "",
      teacherName: "",
      // 临时存储字段
      campusList: [],
      checkList: [],
      editpingjiaID: "",
      ImgShow: false,
      ImgAddr: "",
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
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

    getFeedbackListPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxevaluationtable/getFeedbackPage", {
          size: this.size,
          current: this.current,
          type: this.type,
          campusID: this.campusID,
          stuId: this.stuId,
          stuName: this.stuName,
          teacherName: this.teacherName,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(this.data);

            this.data.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "_checked", false);
            });
          }
        });
    },

    delpj(id) {
      api
        .del("xwcloud-homeschool/homeschool/pxevaluationtable/delFeedback", { ID: id })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            // 同时调用父页面的刷新页面的方法
            this.getFeedbackListPage();
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.current = current;
      this.getFeedbackListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.size = pageSize;
      this.getFeedbackListPage();
    },
    addLaoshikehoupingjia() {
      // 弹出添加对话框
      this.addShow = true;
    },
    //修改
    editLaoshikehoupingjia() {
      // 弹出添加对话框
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editpingjiaID = this.checkList.id;
        this.editShow = true;
      }
    },
    daochuLaoshikehoupingjia() {
      // 弹出添加对话框
      this.daochuShow = true;
    },
    clickShijian(onclicks) {
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "addinfo":
          // 添加老师反馈
          this.addLaoshikehoupingjia();
          break;
        case "derive()":
          // 导出
          this.daochuLaoshikehoupingjia();
          break;
        case "edit":
          // 修改
          this.editLaoshikehoupingjia();
          break;
        default:
          break;
      }
    },

    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
    },

    search() {
      this.getFeedbackListPage();
    },
    searchall() {
      this.size = 10;
      this.current = 1;
      this.type = 1;
      this.campusID = "";
      this.stuId = "";
      this.stuName = "";
      this.teacherName = "";
      this.getFeedbackListPage();
    },
  },
};
</script>
