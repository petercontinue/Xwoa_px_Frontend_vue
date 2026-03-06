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
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import Stuyuekeshenhetongguo from "../../../components/jiaowuManage/stuyuekeshenhetongguo.vue";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
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
                      this.search();
                    } else {
                      this.params.campusID = "";
                      this.search();
                    }
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
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班主任",
          key: "banzhurenName",
          align: "center",
        },
        {
          title: "家长账号",
          key: "parentTel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "家长账号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.parentTel = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "教师教学水平满意度",
          key: "teachingLevelOfTeachers",
          align: "center",
          render: (h, params) => {
            if (params.row.teachingLevelOfTeachers == 1) {
              return h("div", [h("span", { style: { color: "red" } }, "很不满意")]);
            } else if (params.row.teachingLevelOfTeachers == 2) {
              return h("div", [h("span", { style: { color: "#ed4014" } }, "比较差")]);
            } else if (params.row.teachingLevelOfTeachers == 3) {
              return h("div", [h("span", { style: { color: "#ff9900" } }, "还可以")]);
            } else if (params.row.teachingLevelOfTeachers == 4) {
              return h("div", [h("span", { style: { color: "#2db7f5" } }, "满意")]);
            } else if (params.row.teachingLevelOfTeachers == 5) {
              return h("div", [h("span", { style: { color: "#19be6b" } }, "非常满意")]);
            }
          },
        },
        {
          title: "教师教学效果满意度",
          align: "center",
          key: "teachingEffectOfTeachers",
          render: (h, params) => {
            if (params.row.teachingEffectOfTeachers == 1) {
              return h("div", [h("span", { style: { color: "red" } }, "很不满意")]);
            } else if (params.row.teachingEffectOfTeachers == 2) {
              return h("div", [h("span", { style: { color: "#ed4014" } }, "比较差")]);
            } else if (params.row.teachingEffectOfTeachers == 3) {
              return h("div", [h("span", { style: { color: "#ff9900" } }, "还可以")]);
            } else if (params.row.teachingEffectOfTeachers == 4) {
              return h("div", [h("span", { style: { color: "#2db7f5" } }, "满意")]);
            } else if (params.row.teachingEffectOfTeachers == 5) {
              return h("div", [h("span", { style: { color: "#19be6b" } }, "非常满意")]);
            }
          },
        },
        {
          title: "教师服务态度满意度",
          key: "serviceAttitude",
          align: "center",
          render: (h, params) => {
            if (params.row.serviceAttitude == 1) {
              return h("div", [h("span", { style: { color: "red" } }, "很不满意")]);
            } else if (params.row.serviceAttitude == 2) {
              return h("div", [h("span", { style: { color: "#ed4014" } }, "比较差")]);
            } else if (params.row.serviceAttitude == 3) {
              return h("div", [h("span", { style: { color: "#ff9900" } }, "还可以")]);
            } else if (params.row.serviceAttitude == 4) {
              return h("div", [h("span", { style: { color: "#2db7f5" } }, "满意")]);
            } else if (params.row.serviceAttitude == 5) {
              return h("div", [h("span", { style: { color: "#19be6b" } }, "非常满意")]);
            }
          },
        },
        {
          title: "学校管理规范满意度",
          key: "schoolManagementNorms",
          align: "center",
          render: (h, params) => {
            if (params.row.schoolManagementNorms == 1) {
              return h("div", [h("span", { style: { color: "red" } }, "很不满意")]);
            } else if (params.row.schoolManagementNorms == 2) {
              return h("div", [h("span", { style: { color: "#ed4014" } }, "比较差")]);
            } else if (params.row.schoolManagementNorms == 3) {
              return h("div", [h("span", { style: { color: "#ff9900" } }, "还可以")]);
            } else if (params.row.schoolManagementNorms == 4) {
              return h("div", [h("span", { style: { color: "#2db7f5" } }, "满意")]);
            } else if (params.row.schoolManagementNorms == 5) {
              return h("div", [h("span", { style: { color: "#19be6b" } }, "非常满意")]);
            }
          },
        },
        {
          title: "学校硬件环境",
          key: "schoolFacilities",
          align: "center",
          render: (h, params) => {
            if (params.row.schoolFacilities == 1) {
              return h("div", [h("span", { style: { color: "red" } }, "很不满意")]);
            } else if (params.row.schoolFacilities == 2) {
              return h("div", [h("span", { style: { color: "#ed4014" } }, "比较差")]);
            } else if (params.row.schoolFacilities == 3) {
              return h("div", [h("span", { style: { color: "#ff9900" } }, "还可以")]);
            } else if (params.row.schoolFacilities == 4) {
              return h("div", [h("span", { style: { color: "#2db7f5" } }, "满意")]);
            } else if (params.row.schoolFacilities == 5) {
              return h("div", [h("span", { style: { color: "#19be6b" } }, "非常满意")]);
            }
          },
        },
        {
          title: "评价内容",
          key: "concent",
          align: "center",
        },
        {
          title: "评价时间",
          key: "pingjiaDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.pingjiaDate, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "评价时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startDateTime = value[0];
                    this.params.endDateTime = value[1];
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "276",
      total: 0,
      campusList: [],
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        stuName: "",
        parentTel: "",
        startDateTime: "",
        endDateTime: "",
      },
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    getManyiduListPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxmanyidutable/getManyiduPage", this.params)
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
      this.getManyiduListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getManyiduListPage();
    },
    del(ids) {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          api
            .del("xwcloud-homeschool/homeschool/pxmanyidutable/delManyidu", { IDs: ids })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除成功!");
                this.getManyiduListPage();
              } else {
                this.$Message.error("删除失败!");
              }
            });
        },
        onCancel: () => {},
      });
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
        case "del()":
          if (IDs == "") {
            this.$Message.error("请选择数据");
          } else {
            this.del(IDs);
          }
          break;
      }
    },
    search() {
      this.getManyiduListPage();
    },
    searchall() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.parentTel = "";
      this.params.startDateTime = "";
      this.params.endDateTime = "";
      this.getManyiduListPage();
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
  },
  mounted: function () {
    // 初始化页面
    this.getManyiduListPage();
    this.getAllCampusList();
  },
};
</script>
