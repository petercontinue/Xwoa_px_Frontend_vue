<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span
            >温馨提示：【课时转送】是指按课时计费或按课时包计费的课程之间的转送，【天转送】是指按起止日期计费的课程之间进行的天数转送；</span
          >
        </Col>
        <!-- <Col style="margin-top: 10px">
          <span>【课时转送】是指按课时计费或按课时包计费的课程之间的转送，【天转送】是指按起止日期计费的课程之间进行的天数转送；</span>
        </Col> -->
      </Alert>
    </div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="info" ghost @click="search(2)">今日转送</Button>
        <Button type="info" ghost @click="search(3)">本月转送</Button>
        <Button type="info" ghost @click="search(4)">本年转送</Button>
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
    <derivezhuansong v-model="zsDerShow"></derivezhuansong>
    <moneyZs v-model="addmZSShow" v-on:handleSearch="getTransferListPage"></moneyZs>
    <moneydayZs
      v-model="addmDayZSShow"
      v-on:handleSearch="getTransferListPage"
    ></moneydayZs>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import derivezhuansong from "@/components/jiaowuManage/stuKecheng/derivezhuansong";
import moneyZs from "@/components/jiaowuManage/stuKecheng/moneyZs";
import moneydayZs from "@/components/jiaowuManage/stuKecheng/moneydayZs";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    derivezhuansong,
    moneyZs,
    moneydayZs,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "222",
      allcampusData: [], //校区查询获取到的校区数据
      checkList: [],
      dolist: {
        ids: "",
      },
      zsDerShow: false,
      addmZSShow: false,
      addmDayZSShow: false,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        songstuID: "",
        songcampus: "",
        songstu: "",
        shoucampus: "",
        shoustuID: "",
        shoustu: "",
        zhuansongDate: "",
        jingbanren: "",
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
          title: "送出学员校区",
          key: "songcampus",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "送出学员校区",
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
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
          title: "转送人学号",
          key: "songstuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuIDa == null || params.row.zidingyiStuIDa == "") {
              state = params.row.songstuID;
            } else {
              state = params.row.zidingyiStuIDa;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "转送人学号",
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
          title: "转送人",
          key: "songstu",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "转送人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.songstu = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "转送课程",
          key: "songkc",
          align: "center",
        },
        {
          title: "送出",
          key: "songKeshiNum",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.songjifeiStyleID == 3) {
              state = "天";
            } else {
              state = "课时";
            }
            return h("div", [h("span", params.row.songKeshiNum + " " + state)]);
          },
        },
        {
          title: "送出前后剩余",
          key: "songallkeshi",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.songjifeiStyleID == 3) {
              state = "-";
            } else {
              state =
                params.row.allshengyukeshi +
                params.row.songKeshiNum +
                "-" +
                params.row.songKeshiNum +
                "=" +
                (params.row.allshengyukeshi +
                  params.row.songKeshiNum -
                  params.row.songKeshiNum);
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "收学员校区",
          key: "shoucampus",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "收学员校区",
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.shoucampus = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.shoucampus = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "接收人学号",
          key: "shoustuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuIDb == null || params.row.zidingyiStuIDb == "") {
              state = params.row.shoustuID;
            } else {
              state = params.row.zidingyiStuIDb;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "接收人学号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.shoustuID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "接收人",
          key: "shoustu",
          align: "center",
        },
        {
          title: "课程",
          key: "shoukc",
          align: "center",
        },
        {
          title: "收到",
          key: "shouKeshi",
          align: "center",

          render: (h, params) => {
            let state = "";
            if (params.row.songjifeiStyleID == 3) {
              state = "天";
            } else {
              state = "课时";
            }
            return h("div", [h("span", params.row.shouKeshi + " " + state)]);
          },
        },
        {
          title: "收到前后剩余",
          key: "stuName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.songjifeiStyleID == 3) {
              state = "-";
            } else {
              state =
                params.row.shouyukeshi +
                "+" +
                params.row.shouKeshi +
                "=" +
                (params.row.shouyukeshi + params.row.shouKeshi);
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "转送详情",
          key: "shuoMing",
          align: "center",
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
                        title: "转送详情:",
                        content: params.row.shuoMing,
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
          title: "转送时间",
          key: "zhuansongDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.zhuansongDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.zhuansongDate, "yyyy-MM-dd hh:mm");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "操作人",
          key: "jingbanren",
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

    getTransferListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/buxikecheng/getTransferPage",this.params).then((res) => {
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

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
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
      } else if (onclicks == "moneyZs()") {
        this.OnmoneyZs();
      } else if (onclicks == "moneydayZs()") {
        this.OnmoneydayZs();
      }
    },

    addlist() {
      this.checkList = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkList.push({
            id: items.id,
          });
        }
      });
      this.dolist.ids = JSON.stringify(this.checkList);
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
              api.del("xwcloud-stu/stu/buxikecheng/delTransfer",this.dolist).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getTransferListPage();
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

    OnmoneyZs() {
      this.addmZSShow = true;
    },
    OnmoneydayZs() {
      this.addmDayZSShow = true;
    },

    /**
     * 快捷查询
     */
    search(type) {
      this.params.size = 10;
      this.params.current = 1;
      this.params.songstuID = "";
      this.params.songcampus = "";
      this.params.songstu = "";
      this.params.shoucampus = "";
      this.params.shoustu = "";
      this.params.jingbanren = "";
      if (type == 1) {
        this.params.zhuansongDate = "";
      } else if (type == 2) {
        this.params.zhuansongDate = "today";
      } else if (type == 3) {
        this.params.zhuansongDate = "tomonth";
      } else if (type == 4) {
        this.params.zhuansongDate = "toyear";
      }
      this.getTransferListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getTransferListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getTransferListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getTransferListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getTransferListPage();
  },
};
</script>
