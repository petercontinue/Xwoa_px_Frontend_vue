<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1.操作课程【不启用】，课程会自动退班，退出排课；课程重新【启用】要重新去插班；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>2.购买的课时和赠送课时是不允许操作课程合并的；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>3.只有剩余课时为零，而且没有课耗记录的课程，才能操作【删除】；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >4.学员如果【没有额外交费】，只是利用原来交的费用去【上新的课程】，可以先在本页面【添加】课程，然后将现有课程的课时【转送】一部分课时过去；这种情况不应该去操作续费！</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >5.课程【合并、改价、换课、延期】操作以后，都会在课程变动流水里产生一条记录；</span
          >
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
        <Button type="info" ghost @click="searchremainkeshi()">按剩余课时查询</Button>
      </Col>
    </Row>
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          highlight-row
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
    <kxqInfo v-model="kxqInfoShow" :buxiID="kxqbuiID"></kxqInfo>
    <derivestubuxikecheng v-model="stubxKCShow"></derivestubuxikecheng>
    <kechengyangqi
      v-model="kcqyShow"
      :buxiID="kcyqbuxiID"
      :endTime="endTime"
      v-on:handleSearch="getbuxiCourseListPage"
    ></kechengyangqi>
    <editkcprice
      v-model="editpriceShow"
      :buxi="editpbx"
      v-on:handleSearch="getbuxiCourseListPage"
    ></editkcprice>
    <addKcKS v-model="addKcKSShow" v-on:handleSearch="getbuxiCourseListPage"></addKcKS>
    <addKcKSB v-model="addKcKSBShow" v-on:handleSearch="getbuxiCourseListPage"></addKcKSB>
    <MergeCourse
      v-model="MergeShow"
      :buxi="oldhbbuxi"
      v-on:handleSearch="getbuxiCourseListPage"
    ></MergeCourse>
    <Changekecheng
      v-model="hkShow"
      :chan="hkInfo"
      v-on:handleSearch="getbuxiCourseListPage"
    ></Changekecheng>
    <kxqSetting
      v-model="kxqsettingShow"
      :buxiID="kxqbuxiID"
      :stuID="oldstuID"
      v-on:handleSearch="getbuxiCourseListPage"
    ></kxqSetting>

    <sharekeshi
      v-model="shareShow"
      :sharedata="sharedata"
      :isshare="isshare"
      v-on:handleSearch="getbuxiCourseListPage"
    ></sharekeshi>
    <shareInfo v-model="shareInfoShow" :buxiIDs="buxiIDs"></shareInfo>

    <searchremainkeshi
      v-model="remainkeshiShow"
      @increment="getkeshisearch"
    ></searchremainkeshi>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import kxqInfo from "@/components/jiaowuManage/stuKecheng/kxqInfo";
import derivestubuxikecheng from "@/components/jiaowuManage/stuKecheng/derivestubuxikecheng";
import kechengyangqi from "@/components/jiaowuManage/stuKecheng/kechengyangqi";
import editkcprice from "@/components/jiaowuManage/stuKecheng/editkcprice";
import addKcKS from "@/components/jiaowuManage/stuKecheng/addKcKS";
import addKcKSB from "@/components/jiaowuManage/stuKecheng/addKcKSB";
import MergeCourse from "@/components/jiaowuManage/stuKecheng/MergeCourse";
import Changekecheng from "@/components/jiaowuManage/stuKecheng/Changekecheng";
import kxqSetting from "@/components/jiaowuManage/stuKecheng/kxqSetting";
import sharekeshi from "@/components/jiaowuManage/stuKecheng/sharekeshi";
import shareInfo from "@/components/jiaowuManage/stuKecheng/shareInfo";
import searchremainkeshi from "@/components/jiaowuManage/stuKecheng/searchremainkeshi";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    kxqInfo,
    derivestubuxikecheng,
    kechengyangqi,
    editkcprice,
    addKcKS,
    addKcKSB,
    MergeCourse,
    Changekecheng,
    kxqSetting,
    sharekeshi,
    shareInfo,
    searchremainkeshi,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "221",
      allcampusData: [], //校区查询获取到的校区数据
      endTime: 0,
      //删除补习课程
      delbuxikc: {
        buxiids: "",
      },
      ids: [],
      allStustate: [
        { id: 2, name: "在读" },
        { id: 3, name: "停课" },
        { id: 6, name: "休眠" },
      ],
      alljifeiStyle: [
        { id: "1", name: "按课时计费" },
        { id: "2", name: "按课时包计费" },
        { id: "3", name: "按起止日期计费" },
      ],
      isShow: [
        { id: 0, name: "未启用" },
        { id: 1, name: "已启用" },
      ],
      //跨校区详情
      kxqInfoShow: false,
      kxqbuiID: "",
      //导出学员补习课程
      stubxKCShow: false,
      //课程启用/不启用
      showbxID: "",
      show: -1,
      //课程延期
      kcqyShow: false,
      kcyqbuxiID: "",
      //改单价
      editpriceShow: false,
      editpbx: "",
      //添加课时计费课程
      addKcKSShow: false,
      //添加课时包计费课程
      addKcKSBShow: false,
      //课程合并
      oldbuxiID: "", //检测
      MergeShow: false,
      oldhbbuxi: "",
      oldremainks: "",
      oldjfStyle: "",
      //换课
      hkShow: false,
      hkInfo: "",
      //跨校区设置
      kxqsettingShow: false,
      kxqbuxiID: "",
      oldstuID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        isShow: -1,
        campusID: "",
        stuID: "",
        stuName: "",
        subjectID: "",
        stuStatus: "",
        buxiStatus: "",
        buxiCourse: "",
        buxistyleid: "",
        buxijifeiStyle: "",
        startDateTime: "",
        startEndTime: "",
        endstartTime: "",
        endTime: "",
        ksType: "",
        maxkeshi: "",
        minkeshi: "",
        keshi: "",
      },
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
          width: 200,
          resizable: true,
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
          width: 90,
          resizable: true,
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
          title: "联系电话",
          key: "parentTel",
          align: "center",
        },
        {
          title: "学员状态",
          key: "buxiStateID",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.buxiStateID) {
              case "1":
                state = "意向-试听";
                break;
              case "2":
                state = "在读";
                break;
              case "3":
                state = "停课";
                break;
              case "4":
                state = "结课";
                break;
              case "5":
                state = "退费";
                break;
              case "6":
                state = "休眠";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学员状态",
                  data: this.allStustate,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allStustate.forEach((element) => {
                        if (element.id == value) {
                          this.params.stuStatus = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.stuStatus = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "培训科目",
          key: "bxsubject",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "培训科目",
                  data: this.allpxsubject,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allpxsubject.forEach((element) => {
                        if (element.id == value) {
                          this.params.subjectID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.subjectID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "培训方式",
          key: "buxiStatus",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "培训方式",
                  data: this.allbuxistyle,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allbuxistyle.forEach((element) => {
                        if (element.id == value) {
                          this.params.buxistyleid = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.buxistyleid = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "培训课程",
          key: "buxiCourse",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "培训课程",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.buxiCourse = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },

          render: (h, params) => {
            let state = "";
            if (params.row.type == 2) {
              state = "(赠送)  ";
            }
            return h("div", [h("span", state + params.row.buxiCourse)]);
          },
        },
        {
          title: "课程时长",
          key: "courseTime",
          align: "center",
          render: (h, params) => {
            if (params.row.courseTime == "-1") {
              return h("div", [h("span", "一次")]);
            } else if (params.row.courseTime == "-2") {
              return h("div", [h("span", "一天")]);
            } else {
              return h("div", [h("span", params.row.courseTime + "分钟")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程时长",
                  data: this.allclassTime,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allclassTime.forEach((element) => {
                        if (element.id == value) {
                          this.params.classTimeID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.classTimeID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "计费方式",
          key: "buxiPayStyle",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.buxiPayStyle) {
              case 1:
                state = "按课时计费";
                break;
              case 2:
                state = "按课时包计费";
                break;
              case 3:
                state = "按起止日期计费";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "计费方式",
                  data: this.alljifeiStyle,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.alljifeiStyle.forEach((element) => {
                        if (element.id == value) {
                          this.params.buxijifeiStyle = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.buxijifeiStyle = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "开始日期",
          key: "startTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.startTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.startTime, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "开始日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startDateTime = value[0];
                    this.params.startEndTime = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "结束日期",
          key: "endTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.endTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.endTime, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "结束日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.endstartTime = value[0];
                    this.params.endTime = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "原单价",
          key: "oldCoursePrice",
          align: "center",
        },
        {
          title: "现单价",
          key: "coursePrice",
          align: "center",
        },
        {
          title: "剩余课时",
          key: "remainkeshi",
          align: "center",
        },
        {
          title: "启用状态",
          key: "isShow",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "启用状态",
                  data: this.isShow,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.isShow.forEach((element) => {
                        if (element.id == value) {
                          this.params.isShow = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.isShow = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            switch (params.row.isShow) {
              case 1:
                state = "已启用";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "green" },
                    },
                    state
                  ),
                ]);
                break;
              case 0:
                state = "未启用";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "red" },
                    },
                    state
                  ),
                ]);
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "共享课时",
          key: "crossCampus",
          align: "center",
          width: 100,
          render: (h, params) => {
            if (params.row.shareBuxiID == "0") {
              return h("label", "未共享");
            } else {
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
                        // this.kxqSetting(params);
                        this.buxiIDs = params.row.shareBuxiID;
                        this.shareInfoShow = true;
                      },
                    },
                  },
                  "共享详情"
                ),
              ]);
            }
          },
        },
        {
          title: "跨校区上课设置",
          key: "crossCampus",
          align: "center",
          render: (h, params) => {
            if (params.row.crossCampus <= 0) {
              return h("div", [h("span", "-")]);
            } else {
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
                        this.kxqSetting(params);
                      },
                    },
                  },
                  "详情"
                ),
              ]);
            }
          },
        },
      ],
      allpxsubject: [],
      allbuxistyle: [],
      allclassTime: [],
      sharedata: "",
      isshare: "",
      shareShow: false,
      shareInfoShow: false,
      buxiIDs: "",
      remainkeshiShow: false,
    };
  },

  methods: {
    searchremainkeshi() {
      this.remainkeshiShow = true;
    },
    getkeshisearch(vdata) {
      let getdata = JSON.parse(vdata);
      this.params.ksType = getdata.type;
      this.params.maxkeshi = getdata.maxkeshi;
      this.params.minkeshi = getdata.minkeshi;
      this.params.keshi = getdata.keshi;
      this.getbuxiCourseListPage();
    },

    onClickRow(row, index) {
      this.checkList = [];
      this.ids = [];
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

    getbuxiCourseListPage() {
      api
        .get("xwcloud-stu/stu/buxikecheng/getbuxiCoursePage", this.params)
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

    getallList() {
      api.get("xwcloud-stu/stu/buxikecheng/getAllpxsubjectList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allpxsubject = res.obj;
        }
      });
      api.get("xwcloud-stu/stu/buxikecheng/getAllbuxiStyleList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allbuxistyle = res.obj;
        }
      });
      api.get("xwcloud-stu/stu/buxikecheng/getAllClassTimeList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allclassTime = res.obj;
        }
      });
    },

    /**检测课程合并 */
    getHebingTokecheng() {
      api
        .get("xwcloud-stu/stu/buxikecheng/getHebingTokechengCount", {
          oldbuxiID: this.oldbuxiID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.MergeShow = true;
          } else {
            this.$Message.error(res.msg);
          }
        });
    },

    //---------------------------------------------按钮事件 开始----------------------------------------

    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.Onderive();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "kechengIsShow()") {
        this.OnkechengIsShow();
      } else if (onclicks == "delkc()") {
        this.Ondelkc();
      } else if (onclicks == "addKcKS()") {
        this.OnaddKcKS();
      } else if (onclicks == "addKcKSB()") {
        this.OnaddKcKSB();
      } else if (onclicks == "modifyPrice()") {
        this.OnmodifyPrice();
      } else if (onclicks == "kcdelay()") {
        this.Onkcdelay();
      } else if (onclicks == "kxqset()") {
        this.Onkxqset();
      } else if (onclicks == "changeKecheng()") {
        this.OnchangeKecheng();
      } else if (onclicks == "keshishare()") {
        this.Onkeshishare();
      }
    },

    /**共享课时 */
    Onkeshishare() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要设置共享的课程");
      } else {
        if (this.checkList.buxiPayStyle == 3) {
          this.$Message.error("按起止日期计费的课程不可设置共享课时");
        } else {
          this.sharedata = JSON.stringify(this.checkList);
          this.isshare = this.checkList.shareBuxiID;
          this.shareShow = true;
        }
      }
    },

    /**导出学员课程 */
    Onderive() {
      this.stubxKCShow = true;
    },
    /**删除学员课程 */
    Ondel() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "删除数据",
          content: "<p>确定要删除数据吗?</p>",
          onOk: () => {
            console.log(this.checkList);
            this.ids.push({ id: this.checkList.id }); //单选
            console.log(this.ids);
            this.delbuxikc.buxiids = JSON.stringify(this.ids);
            api.del("xwcloud-stu/stu/buxikecheng/delbuxi", this.delbuxikc).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getbuxiCourseListPage();
                //重置
                this.checkList = [];
                this.ids = [];
                this.delbuxikc.buxiids = "";
              } else {
                this.ids = [];
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
    /**
     * 课程启用/不启用
     */
    OnkechengIsShow() {
      if (this.checkList.isShow == 1) {
        //单选
        this.show = 0;
      } else {
        this.show = 1;
      }
      this.showbxID = this.checkList.id;
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.$Modal.confirm({
          closable: true,
          width: 20,
          render: (h) => {
            return h("div", [
              h("Row", [h("Col", { props: { span: 20 } }, [h("p", "课程启用/不启用")])]),
              [
                h("Divider", {
                  style: { margin: "10px 0px 20px 0px" },
                }),
              ],
              h("Row", [
                h("Col", { props: { span: 16, offset: 4 } }, [
                  h(
                    "p",
                    "课程不启用会自动退出现有排课和班级（一对一只是退出排课），确定要操作吗?"
                  ),
                ]),
              ]),
            ]);
          },
          onOk: () => {
            api
              .post("xwcloud-stu/stu/buxikecheng/updateIsshow", {
                buxiID: this.showbxID,
                show: this.show,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getbuxiCourseListPage();
                } else {
                  this.$Message.error(res.msg);
                }
                this.checkList = [];
                this.show = -1;
                this.showbxID = "";
              });
          },
          onCancel: () => {},
        });
      }
    },
    /**课程合并 */
    Ondelkc() {
      this.oldremainks = this.checkList.remainkeshi;
      this.oldjfStyle = this.checkList.buxiPayStyle;
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要合并的数据");
      } else if (this.oldremainks <= 0 || this.oldjfStyle == 3) {
        this.$Message.error("剩余课时为零或按起止日期计费的课程不允许操作合并");
      } else {
        this.oldbuxiID = this.checkList.id;
        this.oldhbbuxi = JSON.stringify(this.checkList);
        this.getHebingTokecheng();
      }
    },
    /**课时计费课程 */
    OnaddKcKS() {
      this.addKcKSShow = true;
    },
    /**添加课时包计费课程 */
    OnaddKcKSB() {
      this.addKcKSBShow = true;
    },
    /**改单价 */
    OnmodifyPrice() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editpbx = JSON.stringify(this.checkList);
        this.editpriceShow = true;
      }
    },
    /**课程延期 */
    Onkcdelay() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        console.log(this.checkList);

        this.endTime = this.checkList.endTime;
        this.kcyqbuxiID = this.checkList.id;
        this.kcqyShow = true;
      }
    },
    /**换课 */
    OnchangeKecheng() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要操作换课的课程");
      } else {
        console.log(this.checkList);
        if (this.checkList.remainkeshi <= 0) {
          this.$Message.error("该课程没有剩余课时，不能操作换课");
        } else {
          this.hkInfo = JSON.stringify(this.checkList);
          this.hkShow = true;
        }
      }
    },
    /**跨校区设置 */
    Onkxqset() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要跨校区的数据");
      } else {
        this.kxqbuxiID = this.checkList.id;
        this.oldstuID = this.checkList.stuID;
        this.kxqsettingShow = true;
      }
    },
    //---------------------------------------------按钮事件 结束----------------------------------------

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuID = "";
      this.params.stuName = "";
      this.params.subjectID = "";
      this.params.stuStatus = "";
      this.params.buxiStatus = "";
      this.params.buxiCourse = "";
      this.params.buxijifeiStyle = "";
      this.params.startDateTime = "";
      this.params.startEndTime = "";
      this.params.endstartTime = "";
      this.params.endTime = "";
      this.params.isShow = -1;
      this.params.buxistyleid = "";
      this.params.classTimeID = "";
      this.getbuxiCourseListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getbuxiCourseListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getbuxiCourseListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getbuxiCourseListPage();
    },
    kxqSetting(value) {
      this.kxqbuiID = value.row.id;
      this.kxqInfoShow = true;
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getallList();
    this.getAllCampusList();
    this.getbuxiCourseListPage();
  },
};
</script>
