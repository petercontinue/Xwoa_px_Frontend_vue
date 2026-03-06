<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1 可以在快捷查询那里按班级筛选学员进行回访；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 设置了下次回访时间的，系统会设置的回访日当天自动提醒老师；</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(0)">全部</Button>
        <Button type="success" ghost @click="search(1)">有回访的</Button>
        <Button type="error" ghost @click="search(2)">无回访的</Button>
        <Select v-model="params.classID" style="width: 200px" @on-change="search(3)">
          <Option v-for="item in classList" :value="item.id" :key="item.id">{{
            item.className
          }}</Option>
        </Select>
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
    <daochulaoxueyuanhuifang-form v-model="daochuFromShow"></daochulaoxueyuanhuifang-form>
    <managereturn-form v-model="returnFromShow" :stuID="selectID"></managereturn-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import DaochulaoxueyuanhuifangForm from "../../../components/jiaowuManage/daochulaoxueyuanhuifangForm.vue";
import ManagereturnForm from "../../../components/jiaowuManage/managereturnForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    DaochulaoxueyuanhuifangForm,
    ManagereturnForm,
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
                    this.params.stuID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
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
          title: "电话",
          key: "parentTel",
          align: "center",
        },
        {
          title: "性别",
          key: "stuSex",
          align: "center",
          render: (h, params) => {
            if (params.row.stuSex == null) {
              return h("div", [h("span", "-")]);
            } else {
              return h("div", [h("span", params.row.stuSex)]);
            }
          },
        },
        {
          title: "班主任",
          align: "center",
          key: "banzhurenName",
          render: (h, params) => {
            if (params.row.banzhurenName == null) {
              return h("div", [h("span", "-")]);
            } else {
              return h("div", [h("span", params.row.banzhurenName)]);
            }
          },
        },
        {
          title: "回访详情",
          key: "totalDetails",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  color: "blue",
                },
                on: {
                  click: ($event) => {
                    this.guanlihuifang(params.row.id);
                  },
                },
              },
              params.row.totalDetails + "次"
            );
          },
        },
        {
          title: "最后一次回访时间",
          key: "lastHuifangTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.lastHuifangTime == "" || params.row.lastHuifangTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.lastHuifangTime, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "下次回访时间",
          key: "nextHuifangTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.nextHuifangTime == "" || params.row.nextHuifangTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.nextHuifangTime, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "268",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        classID: "",
        stuID: "",
        stuName: "",
        isHaveAReturnVisit: null,
      },
      daochuFromShow: false,
      returnFromShow: false,

      selectID: "",
      classList: [],
      campusList: [],
      checkList: [],
    };
  },
  methods: {
    ...mapActions(["getallcampusList", "getClassList", "getStuPage"]),
    getStuPageData() {
      api
        .get("xwcloud-homeschool/homeschool/oldstupxhuifang/getStuPage", this.params)
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
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getLaoxueyuanPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getLaoxueyuanPage();
    },
    daochu() {
      this.daochuFromShow = true;
    },
    guanlihuifang() {
      this.selectID = this.checkList.stuID;
      this.returnFromShow = true;
    },
    clickShijian(onclicks) {
      // let IDs = "";
      // this.data.forEach((items) => {
      //   if (items._checked) {
      //     IDs += items.id + ",";
      //   }
      // });
      // IDs = IDs.substring(0, IDs.length - 1);
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "guanlihuifang()": // 管理回访
          // if (IDs == "") {
          //   this.$Message.error("请选择一条数据!");
          //   return;
          // }
          this.guanlihuifang();
          break;
        case "derive()": // 导出
          this.daochu();
          break;
      }
    },
    TableSearch() {
      this.getStuPageData();
    },
    search(val) {
      this.params.current = 1;
      this.params.size = 10;
      this.params.campusID = "";
      this.params.stuID = "";
      this.params.stuName = "";
      switch (val) {
        case 0:
          this.params.isHaveAReturnVisit = null;
          this.params.classID = "";
          this.getStuPageData();
          break;
        case 1:
          this.params.isHaveAReturnVisit = true;
          this.getStuPageData();
          break;
        case 2:
          this.params.isHaveAReturnVisit = false;
          this.getStuPageData();
          break;
        case 3:
          this.getStuPageData();
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
    getClassListData() {
      api.get("xwcloud-homeschool/homeschool/public/getClassList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // 获取班级列表
          this.classList = res.obj;
          this.classList.forEach((item) => {
            item.name = item.className;
          });
        }
      });
    },
  },

  mounted: function () {
    // 初始化页面
    this.getStuPageData();
    this.getAllCampusList();
    this.getClassListData();
  },
};
</script>
