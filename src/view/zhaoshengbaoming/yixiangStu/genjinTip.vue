<template>
  <div>
    <Alert show-icon style="margin-top: 0px">
      <Icon type="ios-bulb-outline" slot="icon"></Icon
      >温馨提示：设置了下次跟进时间之后，系统会在需要跟进的当天，会有微信消息自动提醒你去做跟进；
    </Alert>

    <Row style="margin-top: 20px">
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">今日提醒</Button>
        <Button type="warning" ghost @click="search(3)">明日提醒</Button>
        <Button type="error" ghost @click="search(4)">本周提醒</Button>
        <Button type="error" ghost @click="search(5)">本月提醒</Button>
      </Col>
      <!---->
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getGenjinTip"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="data"
          @on-row-click="onClickRow"
          @on-selection-change="selectTableChange"
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
  </div>
</template>

<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  name: "genjinTip",
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      menuID: "132",
      columns: [
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
          title: "学员ID",
          key: "id",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "学员ID",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.id = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学员姓名",
          key: "stuName",
          align: "center",
          //   width: 100,
          render(h, params) {
            if (params.row.stuName) {
              return h("div", params.row.stuName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "学员姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.stuName = value;
                    this.search();
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
          //   width: 100,
          render(h, params) {
            if (params.row.stuGradeName) {
              return h("div", params.row.stuGradeName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "年级",
                  data: this.stuGradeList,
                },
                on: {
                  "on-choosed": (value) => {
                    // console.log(value);
                    this.searchObj.stuGradeID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "登记时间",
          key: "dengjiTime",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "登记时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.dengjiTime = value ? value.join("_") : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "历史跟进",
          key: "genjinCount",
          align: "center",
          //   width: 100,
        },
        {
          title: "下次跟进时间",
          key: "nextGenjinTime",
          align: "center",
          //   width: 100,
          render(h, params) {
            if (params.row.nextGenjinTime) {
              return h("div", params.row.nextGenjinTime);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  content: "下次跟进时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.nextGenjinTime = value ? value.join("_") : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "负责人",
          key: "staffName",
          align: "center",
          //   width: 100,
          render(h, params) {
            if (params.row.staffName) {
              return h("div", params.row.staffName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "负责人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.staffName = value;
                    this.search();
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
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.campusID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "岗位",
          key: "staffpostName",
          align: "center",
          //   width: 100,
          render(h, params) {
            if (params.row.staffpostName) {
              return h("div", params.row.staffpostName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "岗位",
                  data: this.staffPostList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.staffpostID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        id: null,
        stuName: null,
        stuGradeID: null,
        dengjiTime: null,
        nextGenjinTime: null,
        staffName: null,
        campusID: null,
        staffpostID: null,
        staffPostList: null,
        type: null,
      },
      selection: [],
      stuGradeList: [],
      campusList: [],
      staffPostList: [],

      checkStuID: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    clickShijian(onclicks) {
      // console.log(onclicks);
      let evalStr = "this." + onclicks;
      // if (onclicks.indexOf("addinfo") > -1 || onclicks.indexOf("edit") > -1) {
      //   evalStr += "()";
      // }
      eval(evalStr);
    },
    changePage(current) {
      this.searchObj.current = current;
      this.getGenjinTip();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.getGenjinTip();
    },
    selectTableChange(selection) {
      this.selection = selection;
    },
    search(val = null) {
      this.searchObj.size = 10;
      this.searchObj.current = 1;
      this.searchObj.type = val;
      if (val == "1") {
        this.searchObj = {
          size: 10,
          current: 1,
          id: null,
          stuName: null,
          stuGradeID: null,
          dengjiTime: null,
          nextGenjinTime: null,
          staffName: null,
          campusID: null,
          staffpostID: null,
          staffPostList: null,
          type: null,
        };
      }
      this.getGenjinTip();
    },
    getGenjinTip() {
      api
        .get("/xwcloud-zsbm/yxstu/YixiangStu/getYixiangStuGenjinTixing", this.searchObj)
        .then((res) => {
          if (res.code == "success") {
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
     * 获取校区
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
    },
    /**
     * 获取学员年级
     */
    getstugrade() {
      api.get("xwcloud-homeschool/homeschool/public/getStugradeList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stuGradeList = res.obj;
        }
      });
    },
    /**
     * 获取岗位
     */
    getStaffPostList() {
      api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffPostList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.staffPostList = res.obj;
        }
      });
    },
    del() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length > 0) {
        this.$Modal.confirm({
          title: "您正在进行删除操作",
          content: "<p>确定要删除吗</p>",
          loading: true,
          onOk: () => {
            let ids = this.checkStuID
              .map((val) => {
                return val.id;
              })
              .join(",");
            api.del("/xwcloud-zsbm/yxstu/YixiangStu/deleteGenjinTixing/" + ids, {}).then(
              (res) => {
                if (res.success) {
                  this.getGenjinTip();
                  this.$Message.success(res.msg);
                } else {
                  this.$Message.error(res.msg);
                }
                this.$Modal.remove();
              },
              (err) => {
                console.log(err);
                this.$Message.error("出错了，请刷新重试");
                this.$Modal.remove();
              }
            );
          },
          onCancel: () => {},
        });
      } else {
        this.$Message.error("请至少勾选一行");
      }
    },
  },
  mounted() {
    this.getGenjinTip();
    this.getAllCampusList();
    this.getstugrade();
    this.getStaffPostList();
  },
};
</script>
<style scoped></style>
