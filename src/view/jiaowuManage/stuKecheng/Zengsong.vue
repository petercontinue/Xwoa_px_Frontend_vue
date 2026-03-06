<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span
            >温馨提示：【新签报名或续费】的时候可以赠送课时；也可以在本页面来给某个学员赠送课时；</span
          >
        </Col>
        <!-- <Col style="margin-top: 10px">
          <span>学员报名【新签或续费】的时候可以赠送课时；也可以在本页面来给某个学员赠送课时；</span>
        </Col> -->
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
    <derivezengsong v-model="zsDerShow"></derivezengsong>
    <moneyzengsong
      v-model="addzSShow"
      v-on:handleSearch="getZengSongListPage"
    ></moneyzengsong>
    <moneyzengsongday
      v-model="addDayZSShow"
      v-on:handleSearch="getZengSongListPage"
    ></moneyzengsongday>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import derivezengsong from "@/components/jiaowuManage/stuKecheng/derivezengsong";
import moneyzengsong from "@/components/jiaowuManage/stuKecheng/moneyzengsong";
import moneyzengsongday from "@/components/jiaowuManage/stuKecheng/moneyzengsongday";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    derivezengsong,
    moneyzengsong,
    moneyzengsongday,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "223",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [],
      checkList: [],
      delids: "",
      dolist: {
        ids: "",
      },
      zsDerShow: false,
      addzSShow: false,
      addDayZSShow: false,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuID: "",
        stuName: "",
        campusID: "",
        stuGradeID: "",
      },
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
          title: "赠送课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "课时数/天数",
          key: "keshiShu",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.jifeiStyle == 3) {
              state = "天";
            } else {
              state = "课时";
            }
            return h("div", [h("span", params.row.keshiShu + " " + state)]);
          },
        },
        {
          title: "赠送方式",
          key: "type",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.jifeiStyle == 3) {
              state = "天";
            } else {
              state = "课时";
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "赠送原因",
          key: "songYangyin",
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
                      this.$Modal.info({
                        title: "赠送原因:",
                        content: params.row.songYangyin,
                        onOk: () => {},
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
          title: "赠送时间",
          key: "addDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.addDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.addDate, "yyyy-MM-dd hh:mm");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "经办人",
          key: "staffName",
          align: "center",
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

    getZengSongListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/buxikecheng/getZengSongPage", this.params).then((res) => {
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
     * 获取年级
     */
    getstugrade() {
      api.get("xwcloud-stu/stu/stuManagement/Getnianji", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stugrade = res.obj;
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
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "add()") {
        this.Onadd();
      } else if (onclicks == "addDay()") {
        this.OnaddDay();
      }
    },
    Onderive() {
      this.zsDerShow = true;
    },
    Ondel() {
      this.addlist();
      setTimeout(() => {
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.$Modal.confirm({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            onOk: () => {
              api
                .del("xwcloud-stu/stu/buxikecheng/delZsKeshi", { ids: this.delids })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getZengSongListPage();
                    this.ids = [];
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            },
            onCancel: () => {
              this.checkList = [];
            },
          });
        }
      }, 200);
    },

    Onadd() {
      this.addzSShow = true;
    },
    OnaddDay() {
      this.addDayZSShow = true;
    },

    addlist() {
      this.delids = "";
      this.checkList = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkList.push({
            id: items.id,
          });
          this.delids += items.id + ",";
        }
      });
      this.dolist.ids = JSON.stringify(this.checkList);
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuID = "";
      this.params.stuName = "";
      this.params.campusID = "";
      this.params.stuGradeID = "";

      this.getZengSongListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getZengSongListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getZengSongListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getZengSongListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getstugrade();
    this.getZengSongListPage();
  },
};
</script>
