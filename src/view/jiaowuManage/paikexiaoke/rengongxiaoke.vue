<template>
  <div class="top-Ms">
    <Alert show-icon style="margin-top: 0px">
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
      <Col>
        <span>温馨提示：</span>
      </Col>
      <Col style="margin-top: 10px">
        <span
          >1、排过课的课程会显示在下面的表格中，在【操作】这一栏进行学员课时的消课；</span
        >
      </Col>
      <Col style="margin-top: 10px">
        <span>2、默认显示当天的排课，可以表头【上课日期】选择要查看的排课</span>
      </Col>
    </Alert>

    <Row show-icon style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">未完成考勤</Button>
        <Button type="info" ghost @click="search(3)">已完成考勤</Button>
      </Col>
    </Row>
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <!-- 不排课消课开始 -->
    <div v-if="showNopaike === true" style="margin: 30px 10px">
      <Card style="width: 100%">
        <p slot="title">不排课消课打考勤</p>
        <Row class="divShow">
          <Col span="1">
            <label>课程：</label>
          </Col>
          <Col span="4">
            <Select
              v-model="nopaikeData.kechengID"
              placeholder="请选择课程"
              @on-change="getclassTiem"
            >
              <Option v-for="item in allkechengData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </Col>

          <Col span="1" style="text-align: center">
            <label>班级：</label>
          </Col>
          <Col span="4">
            <Select v-model="nopaikeData.classidStr" placeholder="请选择班级">
              <Option v-for="item in allclass" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </Col>

          <Col span="1" style="text-align: center">
            <label>教师：</label>
          </Col>
          <Col span="4">
            <Select v-model="nopaikeData.shangketeacher" placeholder="请选择教师">
              <Option v-for="item in allstaff" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </Col>

          <Col span="1" style="text-align: center">
            <label>助教：</label>
          </Col>
          <Col span="4">
            <Select v-model="nopaikeData.zhujiaoteacher" placeholder="请选择助教">
              <Option v-for="item in allstaff" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="2">
            <label>上课日期：</label>
          </Col>
          <Col span="4">
            <DatePicker
              type="date"
              v-model="nopaikeData.shangkedate"
              format="yyyy-MM-dd"
              placeholder="请选择上课日期"
              style="width: 200px"
              @on-change="cfday"
            ></DatePicker>
          </Col>

          <Col span="2">
            <label>开始时间：</label>
          </Col>
          <Col span="4">
            <TimePicker
              v-model="nopaikeData.startLessonDateTime"
              format="HH:mm"
              placeholder="请选择开始时间"
              style="width: 168px"
            ></TimePicker>
          </Col>

          <Col span="2">
            <label>结束时间：</label>
          </Col>
          <Col span="4">
            <TimePicker
              v-model="nopaikeData.endLessonDateTime"
              format="HH:mm"
              placeholder="请选择结束时间"
              style="width: 168px"
            ></TimePicker>
          </Col>
        </Row>
        <Row class="divShow">
          <Col>
            <label>批量消课 重复 :</label>
            <InputNumber :min="0" v-model="cfnum" @on-change="cfday"></InputNumber>
            <RadioGroup v-model="cftype" @on-change="dayType">
              <Radio label="1">周</Radio>
              <Radio label="2">天</Radio>
            </RadioGroup>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="2" style="text-align: left">
            <label>消课日期:</label>
          </Col>
          <Col>
            <label>{{ allriqiData }}</label>
          </Col>
        </Row>
        <Row class="divShow">
          <COl span="2" style="text-align: right">*</COl>
          <Col>
            <Checkbox v-model="single"
              >是否检测该消课(当前选择的课程、班级、上课日期、上课时间)是否已有排课记录</Checkbox
            >
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="1">
            <label>说明：</label>
          </Col>
          <Col span="12">
            <Input
              v-model="nopaikeData.shuoming"
              type="textarea"
              :rows="3"
              placeholder="Enter something..."
            />
          </Col>
          <Col span="3" style="text-align: right">
            <Button type="primary" icon="ios-list-box" @click="getstuMd"
              >添加学员考勤</Button
            >
          </Col>
        </Row>
      </Card>
    </div>
    <!-- 不排课消课结束 -->

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

    <deriverengongxiaoke-form v-model="deriveShow"></deriverengongxiaoke-form>
    <Nopaikestu
      v-model="stuShow"
      :pkdata="allData"
      v-on:handleSearch="getxkdy"
    ></Nopaikestu>
    <xiaokedaying v-model="xkdyShow"></xiaokedaying>
    <paikexiaokestu
      v-model="pkxkShow"
      :pkdata="pkxkDataStr"
      v-on:handleSearch="getpxxkdy"
    ></paikexiaokestu>
    <classkaoqing v-model="lookkaoqingShow" :kqdata="kqdateStr"></classkaoqing>
  </div>
</template>
<style>
.divShow {
  margin: 20px;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import { getTimeDifference } from "@/libs/tools";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import deriverengongxiaokeForm from "../../../components/jiaowuManage/paikexiaoke/deriverengongxiaokeForm";
import Nopaikestu from "@/components/jiaowuManage/paikexiaoke/Nopaikestu";
import xiaokedaying from "@/components/jiaowuManage/paikexiaoke/xiaokedaying";
import paikexiaokestu from "@/components/jiaowuManage/paikexiaoke/paikexiaokestu";
import classkaoqing from "@/components/jiaowuManage/paikexiaoke/classkaoqing";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    deriverengongxiaokeForm,
    Nopaikestu,
    xiaokedaying,
    paikexiaokestu,
    classkaoqing,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "243",
      deriveShow: false,
      showNopaike: false,
      single: true,
      stuShow: false,
      pkxkShow: false,
      xkdyShow: false,
      lookkaoqingShow: false,
      xksetting: "", //是否设置消课后显示打印
      pkcheck: "",
      cfnum: 0,
      cftype: "1",
      xiaokeTime: "",

      checkList: {
        teacher: "",
        haveclassDate: "",
        startLessonDateTime: "",
        endLessonDateTime: "",
        classID: "",
      },
      allData: "", //传给对话框去不排课消课的全部数据
      pkxkDataStr: "", //传给排课消课弹出数据
      pkxkData: {
        // pkID: "",
        // classTime: -1,
        timeSum: 0,
        tiankc: "",
      },
      kqdateStr: "",
      allcampusData: [], //校区查询获取到的校区数据
      allkechengData: [], //课程  //*
      allclass: [], //班级  //*
      allstaff: [], //老师  //*
      nopaikeData: {
        //*
        classidStr: "",
        shangkedate: "",
        shangketeacher: "",
        startLessonDateTime: "",
        endLessonDateTime: "",
        zhujiaoteacher: "",
        kechengID: "",
        classTimeNum: "", //课程时长
        shuoming: "",
        allriqi: "",
      },
      allriqiData: [], //批量日期  //*
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        teacherNames: "",
        startDate: "",
        endDate: "",
        className: "",
        kaoqing: -1,
      },
      columns6: [
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
          title: "教师",
          key: "teacherNames",
          align: "center",
          width: 120,
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
          title: "星期",
          key: "weekN",
          align: "center",
          width: 80,
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
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
        },
        {
          title: "上课时间",
          key: "startLessonDateTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            state =
              params.row.startLessonDateTime.substring(0, 5) +
              "-" +
              params.row.endLessonDateTime.substring(0, 5);
            return h("div", [h("span", state)]);
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
                    this.params.className = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "教室",
          key: "classRoomName",
          align: "center",
        },
        {
          title: "应上",
          key: "yshangcount",
          align: "center",
          width: 80,
        },
        {
          title: "已考勤人数",
          key: "havekaoqingStuNum",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.lookstukaoqing(params);
                    },
                  },
                },
                params.row.havekaoqingStuNum + "-查看名单"
              ),
            ]);
          },
        },
        {
          title: "考勤状态",
          key: "dakaoqin",
          align: "center",
          render: (h, params) => {
            if (params.row.dakaoqin == "未完成考勤") {
              return h("div", [
                h(
                  "span",
                  {
                    style: { color: "red" },
                  },
                  params.row.dakaoqin
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: { color: "green" },
                  },
                  params.row.dakaoqin
                ),
              ]);
            }
          },
        },
        {
          title: "选择操作",
          align: "center",
          key: "checkBox",

          render: (h, params) => {
            if (params.row.dakaoqin == "未完成考勤") {
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
                        this.paikexiaoke(params);
                      },
                    },
                  },
                  "点击-消课"
                ),
              ]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
      ],
    };
  },

  methods: {
    getrengongxiaokeListPage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getrengongxiaokePage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(this.data);
          }
        });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 243 })
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
      } else if ((onclicks = "keshiadd()")) {
        //this.keshiadd();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },

    /**
     * 快捷查询
     */
    search(type) {
      window.console.log(type);
      this.type = type;
      this.params.size = 10;
      this.params.current = 1;
      if (type == 1) {
        this.params.campusID = "";
        this.params.teacherNames = "";
        this.params.startDate = "";
        this.params.endDate = "";
        this.params.className = "";
        this.params.kaoqing = -1;
      }
      if (type == 2) {
        this.params.kaoqing = 0;
      }
      if (type == 3) {
        this.params.kaoqing = 1;
      }
      this.getrengongxiaokeListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getrengongxiaokeListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getYuekeLgetrengongxiaokeListPageistPage();
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
      this.getrengongxiaokeListPage();
    },

    //---------------------------------------------------------------

    /**
     * 根据校区获取课程
     */
    getallkechengByCampusIdList() {
      //*
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getallkechengByCampusId", {})
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allkechengData = res.obj;
          }
        });
    },

    /**
     * 获取班级数据
     */
    getNOpaikegetclassList() {
      //*
      api.get("xwcloud-pkxk/paike/paikexiaoke/NOpaikegetclass", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allclass = res.obj;
        }
      });
    },

    /**
     * 获取全部在职员工
     */
    getallstaffList() {
      //*
      api.get("xwcloud-pkxk/paike/paikexiaoke/getallstaff", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstaff = res.obj;
        }
      });
    },

    /**消课打印设置 */
    getxiaokedayingsyssetting() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getxiaokedaying", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.xksetting = res.obj;
        }
      });
    },

    /**检测排课冲突 */
    checkIsHavePaike() {
      //*
      this.checkList.haveclassDate = this.nopaikeData.allriqi;
      console.log(this.checkList);
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/IsHavePaike", this.checkList)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.pkcheck = res.msg;
            this.nopaikeData.shangkedate = toolbox.dateFtt(
              this.nopaikeData.shangkedate,
              "yyyy-MM-dd"
            );
            //this.nopaikeData.allriqi = JSON.stringify(this.allriqiData);
            console.log(this.nopaikeData.allriqi);
            if (this.pkcheck == "没有冲突") {
              this.stuShow = true;
              this.allData = JSON.stringify(this.nopaikeData);
            } else {
              this.$Modal.info({
                title: "排课检测",
                content: "<p>" + this.pkcheck + "</p>",
                closable: true,
                onOk: () => {},
                onCancel: () => {},
              });
            }
          }
        });
    },

    /**课程时长 */
    getclassTimeList() {
      //*
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getclassTime", {
          kechengID: this.nopaikeData.kechengID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.nopaikeData.classTimeNum = res.obj;
          }
        });
    },

    /**
     * 不排课消课
     */
    keshiadd() {
      this.allriqiData = [];

      this.showNopaike = !this.showNopaike;
      if (this.showNopaike) {
        this.getallkechengByCampusIdList();
        this.getNOpaikegetclassList();
        this.getallstaffList();
      }
    },

    /**循环添加消课日期 */
    cfday() {
      if (this.nopaikeData.shangkedate == "") {
        this.$Message.info("请选择上课日期");
      } else {
        this.allriqiData = [];
        this.nopaikeData.allriqi = "";
        let date = new Date(this.nopaikeData.shangkedate);
        let tsdate = date;

        this.allriqiData.push(toolbox.dateFtt(date, "yyyy-MM-dd"));
        this.nopaikeData.allriqi = toolbox.dateFtt(date, "yyyy-MM-dd") + ",";
        if (this.cfnum > 1) {
          if (this.cftype == "1") {
            //循环周
            for (var i = 0; i < this.cfnum - 1; i++) {
              let datehave = toolbox.dateFtt(
                date.setDate(date.getDate() - 7),
                "yyyy-MM-dd"
              );
              // tsdate = datehave;
              this.allriqiData.push(datehave);
              this.nopaikeData.allriqi += datehave + ",";
            }
          } else if (this.cftype == "2") {
            //循环天
            for (var i = 0; i < this.cfnum - 1; i++) {
              let datehave = toolbox.dateFtt(
                date.setDate(date.getDate() - 1),
                "yyyy-MM-dd"
              );
              // tsdate = datehave;
              this.allriqiData.push(datehave);
              this.nopaikeData.allriqi += datehave + ",";
            }
          }
        }
      }
    },

    dayType() {
      this.cfday();
    },

    /**
     * 弹出不排课消课学员信息
     */
    getstuMd() {
      //*
      // this.stuShow = true;
      // this.allData = JSON.stringify(this.nopaikeData);
      if (this.nopaikeData.kechengID == "") {
        this.$Message.info("请选择消课课程");
      } else if (this.nopaikeData.classidStr == "") {
        this.$Message.info("请选择消课班级");
      } else if (this.nopaikeData.shangketeacher == "") {
        this.$Message.info("请选择消课老师");
      } else if (this.nopaikeData.shangkedate == "") {
        this.$Message.info("请选择上课日期");
      } else if (this.nopaikeData.startLessonDateTime == "") {
        this.$Message.info("请选择消课开始时间");
      } else if (this.nopaikeData.endLessonDateTime == "") {
        this.$Message.info("请选择消课结束时间");
      } else {
        this.checkList.teacher = this.nopaikeData.shangketeacher;
        this.checkList.haveclassDate = this.nopaikeData.shangkedate;
        this.checkList.startLessonDateTime = this.nopaikeData.startLessonDateTime;
        this.checkList.endLessonDateTime = this.nopaikeData.endLessonDateTime;
        this.checkList.classID = Number(this.nopaikeData.classidStr);

        this.checkIsHavePaike(); //去检测排课
      }
    },

    /**查看学员考勤 */
    lookstukaoqing(value) {
      this.kqdateStr = JSON.stringify(value.row);
      this.lookkaoqingShow = true;
    },

    /**获取课程时长 */
    getclassTiem() {
      //*
      this.getclassTimeList();
    },

    /***获取打印设置 */
    getxkdy() {
      if (this.xksetting == "是") {
        this.xkdyShow = true;
      }
    },

    getpxxkdy() {
      this.getrengongxiaokeListPage();
    },

    /**点击按排课消课 */
    paikexiaoke(value) {
      // this.pkxkData.pkID = value.row.id;
      // this.pkxkData.classTime = value.row.classTimeStyleName;
      let datehave = toolbox.dateFtt(value.row.haveClassDate, "yyyy-MM-dd");
      this.times = getTimeDifference(
        datehave + " " + value.row.startLessonDateTime,
        datehave + " " + value.row.endLessonDateTime
      );
      console.log(this.times);
      if (this.times == "开始时间不允许大于结束时间") {
        this.$Message.error("开始时间不允许大于结束时间");
      } else {
        if (this.times.min) {
          this.pkxkData.timeSum = Number(this.times.min);
        }
      }
      console.log(value);
      this.pkxkData.tiankc = JSON.stringify(value.row);
      this.pkxkDataStr = JSON.stringify(this.pkxkData);
      this.pkxkShow = true;
    },
  },

  mounted: function () {
    // 初始化页面
    this.getrengongxiaokeListPage();
    this.getAllCampusList();
    this.getxiaokedayingsyssetting();
  },
};
</script>
