<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <daochu-weiqingjia-form
      v-model="daochuShow"
      fileName="微请假"
    ></daochu-weiqingjia-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import daochuWeiqingjiaForm from "@/components/jiaowuManage/daochuWeiqingjiaForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    daochuWeiqingjiaForm,
    // 按钮控件
  },
  data() {
    return {
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
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.campusID = value;
                      this.TableSearch();
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
          title: "学生姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学生姓名",
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
          title: "课程名称",
          key: "kechengName",
          align: "center",
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "班主任",
          key: "staffName",
          align: "center",
        },
        {
          title: "教师",
          align: "center",
          key: "teacherNames",
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
                    this.params.teacherNames = value;
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
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "上课时间",
          align: "center",
          render: (h, params) => {
            if (
              params.row.startLessonDateTime != null &&
              params.row.endLessonDateTime != null
            ) {
              let st = toolbox.dateFtt(params.row.startLessonDateTime, "hh:mm");
              let et = toolbox.dateFtt(params.row.endLessonDateTime, "hh:mm");
              return h("div", {
                domProps: {
                  innerHTML: "<span>" + st + "~" + et + "</span>",
                },
              });
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
        {
          title: "请假备注",
          key: "beizhu",
          align: "center",
        },
        {
          title: "请假审核状态",
          key: "shenheState",
          align: "center",
          render: (h, params) => {
            switch (params.row.shenheState) {
              case 0:
                return h("div", [h("span", "未审核")]);
              case 1:
                return h("div", [h("span", "已审核通过")]);
              case 2:
                return h("div", [h("span", "已审核未通过")]);
              default:
                return h("div", [h("span", "未审核")]);
            }
          },
        },
        {
          title: "请假审核时间",
          key: "shenheDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.shenheDateTime == "" || params.row.shenheDateTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.shenheDateTime, "yyyy-MM-dd");
            }

            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "272",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        stuName: "",
        teacherName: "",
        startDate: "",
        endDate: "",
      },
      daochuShow: false,
      campusList: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getQingjiaListPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxqingjiatable/getQingjiaPage", this.params)
        .then((res) => {
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
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getQingjiaListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getQingjiaListPage();
    },
    daochu() {
      // 弹出添加对话框
      this.daochuShow = true;
    },
    audit(title, content, status) {
      // 审核通过
      let qingjiaIDs = "";
      console.log(this.data);
      this.data.forEach((items) => {
        if (items._checked == true) {
          qingjiaIDs += items.id + ",";
        }
      });
      qingjiaIDs = qingjiaIDs.substring(0, qingjiaIDs.length - 1);
      if (qingjiaIDs == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.$Modal.confirm({
          title: title,
          content: "<p>" + content + "</p>",
          onOk: () => {
            api
              .post("xwcloud-homeschool/homeschool/pxqingjiatable/changeReviewStatus", {
                Ids: qingjiaIDs,
                status: status,
                shenheNopassReason: "",
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("成功!");
                  this.getQingjiaListPage();
                } else {
                  this.$Message.error("失败!");
                }
              });
          },
          onCancel: () => {},
        });
      }
    },
    del() {
      let qingjiaIDs = "";
      this.data.forEach((items) => {
        if (items._checked) {
          qingjiaIDs += items.id + ",";
        }
      });
      qingjiaIDs = qingjiaIDs.substring(0, qingjiaIDs.length - 1);
      if (this.qingjiaIDs == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "删除数据",
          content: "<p>确定要删除数据吗?</p>",
          onOk: () => {
            api
              .del("xwcloud-homeschool/homeschool/pxqingjiatable/delQingjia", {
                Ids: qingjiaIDs,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("删除成功!");
                  this.getQingjiaListPage();
                } else {
                  this.$Message.error("删除失败!");
                }
              });
          },
          onCancel: () => {},
        });
      }
    },
    clickShijian(onclicks) {
      // 按钮事件
      window.console.log(onclicks);

      switch (onclicks) {
        case "del()":
          // 删除
          this.del();
          break;
        case "Yaudit()": // 审核通过
          this.audit("审核通过", "确定通过审核吗?", 1);
          break;
        case "Naudit()": // 审核不通过
          this.audit("审核不通过", "确定不通过审核吗?", 2);
          break;
        case "derive()":
          // 导出
          this.daochu();
          break;
        default:
          break;
      }
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.teacherName = "";
      this.params.startDate = "";
      this.params.endDate = "";
      this.getQingjiaListPage();
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getQingjiaListPage();
    },
    getCampusListData() {
      api.get("xwcloud-homeschool/homeschool/public/getCampusList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // 获取班级列表
          this.campusList = res.obj;
          this.campusList.forEach((item) => {
            item.name = item.campusName;
          });
        }
      });
    },
  },
  mounted: function () {
    // 初始化页面
    this.getQingjiaListPage();
    this.getCampusListData();
  },
};
</script>
