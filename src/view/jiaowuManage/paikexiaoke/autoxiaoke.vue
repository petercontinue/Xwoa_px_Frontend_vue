<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1、这里的自动消课仅仅是针对按起止日期计费的课程；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2、只有在本页面设置了自动消课，系统才会对该学员的该课程进行自动消课（自动产生消课记录），否则要人工消课才会产生消课记录；</span
          >
        </Col>
      </Alert>
    </div>

    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="info" ghost @click="search(2)">已设置</Button>
        <Button type="success" ghost @click="search(3)">未设置</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
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

    <deriveautoxiake-form v-model="deriveShow"></deriveautoxiake-form>
    <settingauto
      v-model="settingShow"
      v-on:handleSearch="getAutoListPage"
      :ID="bxID"
    ></settingauto>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import deriveautoxiakeForm from "../../../components/jiaowuManage/paikexiaoke/deriveautoxiakeForm";
import settingauto from "@/components/jiaowuManage/paikexiaoke/settingauto";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    deriveautoxiakeForm,
    settingauto,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "247",
      deriveShow: false,
      settingShow: false,
      allcampusData: [], //校区查询获取到的校区数据
      checkList: [],
      bxID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        renkeTea: "",
        banzhuren: "",
        stuName: "",
        state: -1, //1：关闭  2：开启 -1:全部
      },

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
          title: "学号",
          key: "stuNo",
          align: "center",
          width: 100,
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
          title: "学员姓名",
          key: "stuName",
          align: "center",
          width: 100,
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
          width: 100,
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
              state = "未分配";
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
          width: 100,
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
          render: (h, params) => {
            let state = "";
            if (params.row.className == null) {
              state = "-";
            } else {
              state = params.row.className;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "任课老师",
          key: "teaNames",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "任课老师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.renkeTea = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.teaNames == null) {
              state = "-";
            } else {
              state = params.row.teaNames;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "消课计入老师课时数",
          key: "keshiNum",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            if (params.row.keshiNum == null) {
              state = "-";
            } else {
              state = params.row.keshiNum;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "课程开始日期",
          key: "startDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.startDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "课程介绍日期",
          key: "endDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.endDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "自动消课设置状态（已设置/未设置）",
          key: "state",
          align: "center",
          // render: (h, params) => {
          //   let state = "";
          //   switch (params.row.state) {
          //     case "1":
          //       state = "未启用 启用";
          //       break;
          //     case "2":
          //       state = "启用中 关闭";
          //       break;
          //     default:
          //       state = "未设置";
          //       break;
          //   }
          //   return h("div", [h("span", state)]);
          // },
          render: (h, params) => {
            if (params.row.state == 1) {
              return h("a", [
                h(
                  "span",
                  {
                    style: { color: "blue" },
                    on: {
                      click: () => {
                        this.editst(params.row.autoID, params.row.state);
                      },
                    },
                  },
                  "（未启用）点击启用" //未启用
                ),
              ]);
            } else if (params.row.state == 2) {
              return h("a", [
                h(
                  "span",
                  {
                    style: { color: "green" },
                    on: {
                      click: () => {
                        this.editst(params.row.autoID, params.row.state);
                      },
                    },
                  },
                  "（启用中）点击关闭" //启用中
                ),
              ]);
            } else {
              return h("div", [h("span", "未设置")]);
            }
          },
        },
      ],
    };
  },

  methods: {
    ...mapActions(["getAutoPage", "getallcampusList", "saveeditAutoxiaoke"]),

    getAutoListPage() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getAutoPage", this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
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

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 247 })
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
        this.derive();
      } else if (onclicks == "setAutoXiaoke()") {
        this.setAutoXiaoke();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },

    /**
     * 快捷查询
     */
    search(type) {
      window.console.log(type);

      this.params.size = 10;
      this.params.current = 1;
      this.type = type;
      if (type == 1) {
        //全部
        this.params.campusID = "";
        this.params.renkeTea = "";
        this.params.banzhuren = "";
        this.params.stuName = "";
        this.params.state = -1;
      }
      if (type == 2) {
        //已设置
        this.params.state = 2;
      }
      if (type == 3) {
        //未设置
        this.params.state = 0;
      }

      this.getAutoListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getAutoListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getAutoListPage();
    },

    /**
     * 导出
     */
    derive() {
      this.deriveShow = true;
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getAutoListPage();
    },

    /**设置自动消课 */
    setAutoXiaoke() {
      if (this.checkList == null) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.bxID = this.checkList.id;
        this.settingShow = true;
      }
    },
    /**修改启用状态 */
    editst(ID, type) {
      api
        .post("xwcloud-pkxk/paike/paikexiaoke/editAutoxiaoke", { autoID: ID, type: type })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.getAutoListPage();
          }
        });
    },
  },

  mounted: function () {
    // 初始化页面
    this.getAutoListPage();
    this.getAllCampusList();
  },
};
</script>
