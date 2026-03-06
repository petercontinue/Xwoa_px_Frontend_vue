<template>
  <div>
    <div style="margin-top: 0px">
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1、注意刷卡时间段的设置不同，刷卡的有效时间段是不一样的；以排课8:00-10:00为例，【课前】刷卡有效时间段为7:30-8:30；【课中】刷卡有效时间段为8:00-10:00；【课后】刷卡有效时间段为10:00-10:30；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>2、刷卡前务必排课，不排课是没法刷卡消课的;</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>3、特别提醒：刷卡时，系统光标放在【学员卡-卡号】的文本框内；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            <Button size="small" type="text" style="color: red" @click="toshakaTime()"
              >点击这里</Button
            >设置刷卡时间段
          </span>
        </Col>
      </Alert>
    </div>

    <div style="text-align: center; margin: 20px auto">
      <label>
        学员卡-卡号
        <font color="red">*</font> :
      </label>
      <Input
        v-model="shuakastuCard"
        placeholder="刷卡时确保光标在本框内"
        style="width: 300px"
        @on-change="saveshuakaxk"
      />
    </div>

    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
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

    <deriveshaukaxiaoke-form v-model="deriveShow"></deriveshaukaxiaoke-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import deriveshaukaxiaokeForm from "@/components/jiaowuManage/paikexiaoke/deriveshaukaxiaokeForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    deriveshaukaxiaokeForm,
  },
  data() {
    return {
      shuakastuCard: "",
      data: [], // 接口数据接收
      total: 0,
      menuID: "244",
      deriveShow: false,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        cardNumber: "",
        campusID: "",
        stuName: "",
        className: "",
        teacherNames: "",
        buxiStyleID: "",
      },
      columns6: [
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
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
          title: "卡号",
          key: "cardNumber",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.cardNumber == null) {
              state = "-";
            } else {
              state = params.row.cardNumber;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "卡号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.cardNumber = value;
                    this.TableSearch();
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
          title: "教师",
          key: "teacherNames",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.teacherNames == null) {
              state = "-";
            } else {
              state = params.row.teacherNames;
            }
            return h("div", [h("span", state)]);
          },
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
          title: "课时",
          key: "keshi",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.keshi == null) {
              state = "-";
            } else {
              state = params.row.keshi;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "签到类型",
          key: "qiandaoOrqiantui",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.qiandaoOrqiantui) {
              case "1":
                state = "签到";
                break;
              case "2":
                state = "签退";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.buxiStyleName == null) {
              state = "-";
            } else {
              state = params.row.buxiStyleName;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "班主任",
          key: "banzhuren",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.banzhuren == null) {
              state = "-";
            } else {
              state = params.row.banzhuren;
            }
            return h("div", [h("span", state)]);
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
        },
        {
          title: "上课时间",
          key: "startLessonDateTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (
              params.row.startLessonDateTime == null ||
              params.row.startLessonDateTime == null
            ) {
              state = "-";
            } else {
              state = params.row.startLessonDateTime + "-" + params.row.endLessonDateTime;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "刷卡时间",
          key: "qianDatetime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.qianDatetime,
              "yyyy-MM-dd - hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "详情",
          key: "",
          align: "center",
        },
      ],
    };
  },

  methods: {
    getshuakaxiaokeListPage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getshuakaxiaokePage", this.params)
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
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 244 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.derive();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.cardNumber = "";
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.className = "";
      this.params.teacherNames = "";
      this.params.buxiStyleID = "";
      this.getshuakaxiaokeListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getshuakaxiaokeListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getshuakaxiaokeListPage();
    },
    derive() {
      this.deriveShow = true;
    },
    saveshuakaxk() {
      if (this.shuakastuCard == "") {
        this.$Message.console.error("请输入学生卡号或请刷卡");
      } else {
        api
          .post("xwcloud-pkxk/paike/paikexiaoke/saveShaka", {
            cardNumber: this.shuakastuCard,
          })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getshuakaxiaokeListPage();
              this.shuakastuCard = "";
            } else {
              this.$Message.error("操作失败");
            }
          });
      }
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getshuakaxiaokeListPage();
    },
    toshakaTime() {
      this.$Modal.info({
        content: "<p>确定跳转设置刷卡时间段?</p>",
        onOk: () => {
          this.$router.push({
            path: "/jiaowushezhi",
            query: {},
          });
        },
        onCancel: () => {},
      });
    },
  },

  mounted: function () {
    // 初始化页面
    this.getshuakaxiaokeListPage();
    this.getAllCampusList();
  },
};
</script>
