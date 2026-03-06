<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(0)">全部</Button>
        <Button type="success" ghost @click="search(1)">未约满正常可约</Button>
        <Button type="error" ghost @click="search(2)">约满了</Button>
        <Button type="warning" ghost @click="search(3)">过期的约课</Button>
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
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addjiaoshiyueke-form
      v-model="addFromShow"
      v-on:handleSearch="getFabuYuekePageData"
      :editData="editData"
    ></addjiaoshiyueke-form>
    <daochujiaoshiyueke-form
      v-model="deriveShow"
      @increment="deriveExcel"
    ></daochujiaoshiyueke-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import AddjiaoshiyuekeForm from "../../../components/jiaowuManage/addjiaoshiyuekeForm.vue";
import daochujiaoshiyuekeForm from "../../../components/jiaowuManage/daochujiaoshiyuekeForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    AddjiaoshiyuekeForm,
    daochujiaoshiyuekeForm,
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
                    this.params.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "教师",
          key: "teacherNames",
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
                    this.params.stuName = value;
                    this.TableSearch();
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
                    this.params.teacherName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "最少人数",
          key: "minSuccessYuekeStuNum",
          align: "center",
        },
        {
          title: "最多人数",
          align: "center",
          key: "maxStuNum",
        },
        {
          title: "当前人数",
          key: "current",
          align: "center",
        },
        {
          title: "约课状态",
          key: "yuekeState",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.yuekeState) {
              case 1:
                state = "未约满正常可约";
                break;
              case 2:
                state = "约满了";
                break;
              case 3:
                state = "过期了";
                break;
              default:
                state = "未知";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "上课日期",
          key: "haveLessonDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveLessonDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "上课时间",
          key: "startLessonTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.startLessonTime, "hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "下课时间",
          key: "endLessonTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.endLessonTime, "hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "课时",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
        },
        {
          title: "发起时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "269",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        kechengName: "",
        teacherName: "",
        className: "",
        yuekeState: "",
      },
      addFromShow: false,
      editFromShow: false,
      daochuFromShow: false,
      campusList: [],
      editData: "",
      deriveShow: false,
    };
  },
  methods: {
    ...mapActions(["getallcampusList", "getFabuYuekePage", "delFabuYueke"]),
    getFabuYuekePageData() {
      api
        .get(
          "xwcloud-homeschool/homeschool/pxyueketeacherfabu/getFabuYuekePage",
          this.params
        )
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

    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getFabuYuekePageData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getFabuYuekePageData();
    },
    addinfo() {
      this.editData = "";
      this.addFromShow = true;
    },
    edit() {
      let etData = [];
      this.data.forEach((items) => {
        if (items._checked) {
          etData.push(items);
        }
      });
      if (etData.length == 0) {
        this.$Message.error("请选择数据!");
      } else if (etData.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.editData = JSON.stringify(etData[0]);
        this.addFromShow = true;
      }
    },
    del(ids) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该约课信息？</p>",
        onOk: () => {
          let IDs = "";
          this.data.forEach((items) => {
            if (items._checked) {
              IDs += items.id + ",";
            }
          });
          if (IDs == "") {
            this.$Message.error("请选择要删除的数据");
          } else {
            api
              .del("xwcloud-homeschool/homeschool/pxyueketeacherfabu/delFabuYueke", {
                ids: IDs,
              })
              //this.delFabuYueke({ ids: IDs })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("数据删除成功");
                  this.getFabuYuekePageData();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          }
        },
      });
    },
    daochu() {
      this.deriveShow = true;
    },
    deriveExcel(data) {
      console.log(data);
      toolbox.exportExcel(
        "/xwcloud-homeschool/homeschool/pxyueketeacherfabu/exportFabuYuekeList",
        {
          campusID: data.campusID,
          startDate:
            data.joinTime[0] == "" ? "" : toolbox.dateFtt(data.joinTime[0], "yyyy-MM-dd"),
          endDate:
            data.joinTime[1] == "" ? "" : toolbox.dateFtt(data.joinTime[1], "yyyy-MM-dd"),
        },
        "教师发布约课信息",
        this,
        false
      );
    },
    clickShijian(onclicks) {
      let IDs = "";
      this.data.forEach((items) => {
        if (items._checked) {
          IDs += items.id + ",";
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "addinfo":
          this.addinfo();
          break;
        case "edit":
          this.edit();
          break;
        case "del()":
          this.del(IDs);
          break;
        case "derive()":
          this.daochu();
          break;
      }
    },
    search(val) {
      this.params.current = 1;
      this.params.size = 10;
      this.params.campusID = "";
      this.params.kechengName = "";
      this.params.teacherName = "";
      this.params.className = "";
      this.params.yuekeState = val;
      this.getFabuYuekePageData();
    },
    TableSearch() {
      this.getFabuYuekePageData();
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
    closeModal(val) {
      this.$emit("input", val);
    },
  },
  mounted: function () {
    // 初始化页面
    this.getFabuYuekePageData();
    this.getAllCampusList();
  },
};
</script>
