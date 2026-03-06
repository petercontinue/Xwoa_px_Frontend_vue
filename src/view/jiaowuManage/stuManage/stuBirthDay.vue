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
            >1、设置了学员生日以后，在生日的当天，系统会自动给学员/家长推送生日祝福的微信消息；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2、能收到微信消息的前提是学员/家长关注了贵校的微信公众号并且完成了微信绑定；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>
            生日祝福的文字内容可以
            <Button
              size="small"
              type="text"
              style="color: red"
              @click="tobirthMessage()"
              >点击这里</Button
            >去设置
          </span>
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
    <editstubirth
      v-model="editShow"
      :stuID="editstuID"
      v-on:handleSearch="getStuBirthListPage"
    ></editstubirth>
    <derivestubirth v-model="deriveShow"></derivestubirth>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import editstubirth from "@/components/jiaowuManage/stuManage/editstubirth";
import derivestubirth from "@/components/jiaowuManage/stuManage/derivestubirth";
import datesearchyearmonthForm from "@/components/common-buttons/datesearchyearmonthForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    editstubirth,
    derivestubirth,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "216",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      editShow: false,
      deriveShow: false,
      editstuID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuID: "",
        campusID: "",
        stuName: "",
        stuGradeID: "",
        month: -1,
      },
      month: [
        { id: 1, name: "一月" },
        { id: 2, name: "二月" },
        { id: 3, name: "三月" },
        { id: 4, name: "四月" },
        { id: 5, name: "五月" },
        { id: 6, name: "六月" },
        { id: 7, name: "七月" },
        { id: 8, name: "八月" },
        { id: 9, name: "九月" },
        { id: 10, name: "十月" },
        { id: 11, name: "十一月" },
        { id: 12, name: "十二月" },
      ],
      checkList: [],
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
                      console.log(value);
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
          title: "学号",
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
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
          title: "性别",
          key: "stuSex",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.stuSex == "" || params.row.stuSex == null) {
              state = "-";
            } else {
              state = params.row.stuSex;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "生日",
          key: "stubirth",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.stubirth != "无") {
              datehave = toolbox.dateFtt(params.row.stubirth, "yyyy-MM-dd");
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "生日",
                  data: this.month,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.month.forEach((element) => {
                        if (element.id == value) {
                          this.params.month = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.month = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      this.checkList = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked =
          !this.$refs.selection.data[index]._checked;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked =
          !this.$refs.selection.data[index]._checked;
        this.checkList = this.$refs.selection.data[index];
      }
    },

    getStuBirthListPage() {
      this.checkList = [];
      this.editstuID = "";
      api.get("xwcloud-stu/stu/stuManagement/getStuBirthPage",this.params)
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },

    /**获取年级 */
    getstugrade() {
      api.get("xwcloud-stu/stu/stuManagement/Getnianji",{})
      .then((res) => {
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
        this.Onderive();
      } else if (onclicks == "edit") {
        this.Onedit();
      }
    },

    Onderive() {
      this.deriveShow = true;
    },
    /**修改生日 */
    Onedit() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editstuID = this.checkList.stuID; //stuID 是剩余课时显示页面的ID标识
        this.editShow = true;
      }
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuID = "";
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.stuGradeID = "";
      this.params.month = -1;

      this.getStuBirthListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuBirthListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuBirthListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuBirthListPage();
    },
    tobirthMessage() {
      this.$Modal.info({
        content: "<p>确定跳转至学员生日自定义祝福语设置?</p>",
        onOk: () => {
          this.$router.push({
            path: "/weixinshezhi",
            query: {},
          });
        },
        onCancel: () => {},
      });
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getstugrade();
    this.getStuBirthListPage();
  },
};
</script>
