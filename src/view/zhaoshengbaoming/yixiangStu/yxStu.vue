<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span
            >1
            家长扫描小程序上的推广码以后打开页面填写的意向信息会保存到意向学员这里来；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2
            微信营销活动下方的咨询留言填写的意向信息都会保存到意向学员这里来；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>
            3
            意向学员可以自定义多少天没跟进的话，会自动成为公海学员（即成为未分配状态）；此外，来源途径、意向程度，
            <router-link to="/stushezhi">都点击这里</router-link>去设置
          </span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">今日登记</Button>
        <Button type="warning" ghost @click="search(3)">本月登记</Button>
        <Button type="error" ghost @click="search(4)">今日跟进</Button>
        <!-- <Button type="error" ghost @click="search(5)">今日未跟进</Button> -->
        <Button type="error" ghost @click="search(6)">本月跟进</Button>
        <Button type="error" ghost @click="search(7)">未跟进</Button>
        <Button type="error" ghost @click="search(8)">未分配</Button>
      </Col>
    </Row>
    <!-- <Alert show-icon style="margin-top: 30px">
      <Icon type="ios-bulb-outline" slot="icon"></Icon
      >温馨提示：意向学员自定义天数没跟进的话，会自动成为公排学员（即成为未分配状态）；
      <router-link to="/stushezhi">点击这里</router-link>去设置自定义天数
    </Alert>-->
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="GetYixiangStuByPage"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns6"
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
    <!-- 添加和修改意向学表单 -->
    <add-or-edit-yx-from
      v-model="modalShow"
      :title="modalTitle"
      :yxData="yxData"
      :stuGradeList="stuGradeList"
      :telFromList="telFromList"
      :telLevelList="telLevelList"
      :campusList="allcampusData"
      :diyParamList="diyParamList"
      :dropDownOptionList="dropDownOptionList"
      :subjectList="subjectList"
      :staffList="staffList"
      @refreshPage="refreshPage"
    ></add-or-edit-yx-from>

    <yxstuInfo
      v-model="yxInfoShow"
      :title="yxTitle"
      :yxData="yxInfoData"
      :stuGradeList="stuGradeList"
      :telFromList="telFromList"
      :telLevelList="telLevelList"
      :campusList="allcampusData"
      :diyParamList="diyParamList"
      :dropDownOptionList="dropDownOptionList"
      :subjectList="subjectList"
      :staffList="staffList"
      @refreshPage="refreshPage"
    ></yxstuInfo>

    <genjin-modal
      v-model="modalShow_genjin"
      :stuID="stuID_genjing"
      :yxData="yxData"
      :telLevelList="telLevelList"
      :nextGenjingRequired="nextGenjingRequired"
      v-on:handleSearch="GetYixiangStuByPage"
    ></genjin-modal>

    <yaoyue-modal
      v-model="modalShow_yaoyue"
      :stuID="stuID_yaoyue"
      v-on:handleSearch="GetYixiangStuByPage"
    ></yaoyue-modal>

    <daofang-modal
      v-model="modalShow_daofang"
      :stuID="stuID_daofang"
    ></daofang-modal>

    <fenpei-modal
      v-model="modalShow_fenpei"
      :staffList="staffList"
      :stuIDs="stuIDs_fenpei"
      @refreshPage="refreshPage"
    ></fenpei-modal>

    <shiting-modal
      v-model="modalShow_shiting"
      :stuID="stuID_shiting"
      :campusID="campusID_shiting"
      :payMoneyStyleList="payMoneyStyleList"
    ></shiting-modal>
    <importsyxstu-files v-model="modalShow_daoruyxstu"></importsyxstu-files>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import AddOrEditYxFrom from "../../../components/zhaoshengbaoming/yixiangxueyuan/addOrEditYxFrom";
import GenjinModal from "../../../components/zhaoshengbaoming/yixiangxueyuan/genjinModal";
import YaoyueModal from "../../../components/zhaoshengbaoming/yixiangxueyuan/yaoyueModal";
import DaofangModal from "../../../components/zhaoshengbaoming/yixiangxueyuan/daofangModal";
import fenpeiModal from "../../../components/zhaoshengbaoming/yixiangxueyuan/fenpeiModal";
import shitingModal from "../../../components/zhaoshengbaoming/yixiangxueyuan/shitingModal";
import importsyxstuFiles from "../../../components/zhaoshengbaoming/yixiangxueyuan/importsyxstuFiles.vue";
import yxstuInfo from "@/components/zhaoshengbaoming/yixiangxueyuan/yxstuInfo";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    AddOrEditYxFrom,
    GenjinModal,
    YaoyueModal,
    DaofangModal,
    fenpeiModal,
    shitingModal,
    importsyxstuFiles,
    yxstuInfo,
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
          title: "详情",
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
                      this.yxstuInfo(params.row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 100,
          render: (h, params) => {
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
                  content: "姓名",
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
          title: "联系电话",
          key: "parentTel",
          align: "center",
          width: 125,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "联系电话",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.parentTel = value;
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
          width: 100,
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
          title: "校区",
          key: "campusName",
          align: "center",
          width: 120,
          render(h, params) {
            if (params.row.campusName) {
              return h("div", params.row.campusName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "校区",
                  data: this.allcampusData,
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
          title: "来源途径",
          key: "telFromName",
          align: "center",
          width: 100,
          render(h, params) {
            if (params.row.telFromName) {
              return h("div", params.row.telFromName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "来源途径",
                  data: this.telFromList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.telFromID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "意向科目",
          key: "yixiangkecheng",
          align: "center",
          width: 120,
          render(h, params) {
            if (params.row.yixiangkecheng) {
              return h("div", params.row.yixiangkecheng);
            } else {
              return h("div", "-");
            }
          },
        },
        {
          title: "意向程度",
          key: "telLevelName",
          align: "center",
          width: 100,
          render(h, params) {
            if (params.row.telLevelName) {
              return h("div", params.row.telLevelName);
            } else {
              return h("div", "-");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "意向程度",
                  data: this.telLevelList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.yxLeveID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "跟进",
          key: "genjinSum",
          align: "center",
          width: 70,
        },
        {
          title: "下次跟进时间",
          key: "nextGenjinTime",
          align: "center",
          width: 150,
          render(h, params) {
            if (params.row.nextGenjinTime) {
              return h(
                "div",
                toolbox.dateFtt(params.row.nextGenjinTime, "yyyy-MM-dd")
              );
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
                    this.searchObj.genjinDate = value ? value.join("_") : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "邀约",
          key: "yaoyueSum",
          align: "center",
          width: 70,
        },
        {
          title: "到访",
          key: "daofangSum",
          align: "center",
          width: 90,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "到访",
                  data: [
                    { id: 1, name: "已到访" },
                    { id: 2, name: "未到访" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.daofang = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "试听",
          key: "shitingSum",
          align: "center",
          width: 90,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "试听",
                  data: [
                    { id: 1, name: "有试听" },
                    { id: 2, name: "无试听" },
                  ],
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.shiting = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "负责人",
          key: "fuzeStaffName",
          align: "center",
          width: 120,
          render(h, params) {
            if (params.row.fuzeStaffName) {
              return h("div", params.row.fuzeStaffName);
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
                    this.searchObj.fuzeStaffName = value;
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
          width: 120,
          render(h, params) {
            if (params.row.dengjiTime) {
              return h(
                "div",
                toolbox.dateFtt(params.row.dengjiTime, "yyyy-MM-dd hh:mm:ss")
              );
            } else {
              return h("div", "-");
            }
          },
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
          title: "登记人",
          key: "dengjiStaffName",
          align: "center",
          width: 120,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "登记人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.dengjiStaffName = value ? value : null;
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
      yxInfoData: {},
      yxTitle: "",
      yxInfoShow: false,
      searchObj: {
        size: 10,
        current: 1,
        stuName: null,
        parentTel: null,
        stuGradeID: null,
        campusID: null,
        telFromID: null,
        yxLeveID: null,
        dengjiStaffName: null,
        shichangStaffName: null,
        genjinDate: null,
        daofang: null,
        shiting: null,
        fuzeStaffName: null,
        dengjiTime: null,
        type: null,
      },
      yxData: {},
      stuGradeList: [],
      telFromList: [],
      telLevelList: [],
      diyParamList: [],
      allcampusData: [],
      dropDownOptionList: [],
      subjectList: [],
      staffList: [],
      selection: [],
      payMoneyStyleList: [],

      modalShow_genjin: false,
      stuID_genjing: "",
      nextGenjingRequired: false,

      modalShow_yaoyue: false,
      stuID_yaoyue: "",

      modalShow_daofang: false,
      stuID_daofang: "",

      modalShow_fenpei: false,
      stuIDs_fenpei: [],

      modalShow_shiting: false,
      stuID_shiting: "",
      campusID_shiting: "",

      modalTitle: "",
      modalShow: false,
      menuID: "131",

      modalShow_daoruyxstu: false,
      checkStuID: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked =
        !this.$refs.selection.data[index]._checked;
    },
    GetYixiangStuByPage() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/GetYixiangStuByPages",this.searchObj).then((res) => {
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
      this.searchObj.current = current;
      this.GetYixiangStuByPage();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.GetYixiangStuByPage();
    },
    selectTableChange(selection) {
      console.log(selection);
      this.selection = selection;
    },
    clickShijian(onclicks) {
      // console.log(onclicks);
      let evalStr = "this." + onclicks;
      if (onclicks.indexOf("addinfo") > -1 || onclicks.indexOf("edit") > -1) {
        evalStr += "()";
      }
      eval(evalStr);
    },
    search(val = null) {
      this.searchObj.size = 10;
      this.searchObj.current = 1;
      this.searchObj.type = val;
      if (val == "1") {
        this.searchObj = {
          size: 10,
          current: 1,
          stuName: null,
          parentTel: null,
          stuGradeID: null,
          campusID: null,
          telFromID: null,
          yxLeveID: null,
          dengjiStaffName: null,
          shichangStaffName: null,
          genjinDate: null,
          daofang: null,
          shiting: null,
          fuzeStaffName: null,
          dengjiTime: null,
          type: null,
        };
      }
      this.GetYixiangStuByPage();
    },
    /**
     * 获取校区
     */
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    /**
     * 自定义字段
     */
    getDiyParamList() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllZidingyiParams",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.diyParamList = res.obj;
          // console.log(res.obj);
        }
      });
    },
    /**
     * 获取学员年级
     */
    getstugrade() {
      // getstugradeList
      aapi.get("xwcloud-homeschool/homeschool/public/getStugradeList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res.obj);

          res.obj.forEach((item) => {
            this.stuGradeList.push({ id: item.id, name: item.stugradename });
          });
          console.log("11");
          console.log(this.stuGradeList);
        }
      });
    },
    /**
     * 获取来源途径
     */
    getSearchTelFrom() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getYxSearchtelFrom",{}).then((res) => {
        if (res.code == "success") {
          this.telFromList = res.obj;
        }
      });
    },
    /**
     * 获取意向等级
     */
    getSearchTelLevel() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getYxSearchTelLevel",{}).then((res) => {
        if (res.code == "success") {
          this.telLevelList = res.obj;
        }
      });
    },
    /**
     * 获取自定义下拉值
     */
    getDropdownOption() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getYxDropdownOption",{}).then((res) => {
        if (res.code == "success") {
          // console.log(res.obj);
          this.dropDownOptionList = res.obj;
        }
      });
    },
    /**
     * 获取科目
     */
    getSubject() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllSubjectListBycampusID",{
        campusID: null,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.subjectList = res.obj;
        }
      });
    },
    /**
     * 获取员工
     */
    getAllStaffList() {
      api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.staffList = res.obj;
        }
      });
    },
    /**
     * 添加意向
     */
    addinfo() {
      this.modalTitle = "添加意向学员";
      this.modalShow = true;
    },
    /**
     * 修改意向
     */
    edit() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      console.log(this.checkStuID);
      if (this.checkStuID.length == 1) {
        this.yxData = {};
        setTimeout(() => {
          this.yxData = this.checkStuID[0];
        }, 10);
        this.modalTitle = "修改意向学员";
        this.modalShow = true;
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    yxstuInfo(value) {
      this.yxInfoData = value;
      console.log(this.yxInfoData);
      this.yxTitle = "意向学员详情";
      this.yxInfoShow = true;
    },

    /**
     * 刷新
     */
    refreshPage(msg) {
      // console.log(msg);
      if ((msg = "refresh")) {
        this.GetYixiangStuByPage();
      }
    },
    /**
     * 删除意向
     */
    del() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length < 1) {
        this.$Message.warning("请至少选择一行");
        return;
      }
      this.$Modal.confirm({
        title: "您正在进行删除操作",
        content:
          "<p>删除意向学员，会一并把学员的跟进、试听等数据一并删除,确定要删除吗</p>",
        loading: true,
        onOk: () => {
          let ids = "";
          this.checkStuID.forEach((item, index) => {
            ids += item.id + ",";
          });
          ids = ids.substring(0, ids.length - 1);
          // console.log(ids);
          api.del("/xwcloud-zsbm/yxstu/YixiangStu/deleteYixiangStu/"+ids,{}).then((res) => {
            if (res.success) {
              this.$Message.success(res.msg);
              this.GetYixiangStuByPage();
            } else {
              this.$Message.error(res.msg);
            }
            this.$Modal.remove();
            // console.log(res);
          });
        },
        onCancel: () => {},
      });
    },
    /**
     * 导出
     */
    derive() {
      // console.log("导出");
      toolbox.exportExcel(
        "/xwcloud-zsbm/yxstu/YixiangStu/exportYxStu",
        {},
        "意向学员导出",
        this,
        false
      );
    },
    /**
     * 导入
     */
    theimport() {
      console.log("导入");
      this.modalShow_daoruyxstu = true;
    },
    /**
     * 跟进
     */
    genjin() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 1) {
        this.yxData = {};
        setTimeout(() => {
          this.yxData = this.checkStuID[0];
        }, 10);
        this.modalShow_genjin = true;
        this.stuID_genjing = this.checkStuID[0].id;
        // console.log(this.selection[0]);
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    /**
     * 邀约
     */
    yaoyue() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 1) {
        this.modalShow_yaoyue = true;
        this.stuID_yaoyue = this.checkStuID[0].id;
        // console.log(this.selection[0]);
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    /**
     * 到访
     */
    daofang() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 1) {
        this.modalShow_daofang = true;
        this.stuID_daofang = null;
        this.$nextTick(() => {
          this.stuID_daofang = this.checkStuID[0].id;
        });
        // console.log(this.selection[0]);
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    /**
     * 分配
     */
    fenpei() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length > 0) {
        this.modalShow_fenpei = true;
        let ids = this.checkStuID.map((val) => {
          return val.id;
        });
        // console.log(ids)
        this.stuIDs_fenpei = null;
        this.$nextTick(() => {
          this.stuIDs_fenpei = ids;
        });
        // console.log(this.selection[0]);
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    /**
     * 未分配
     */
    setNoFenpei() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length > 0) {
        this.$Modal.confirm({
          title: "警告",
          content: "<p>确定设置为未分配吗？</p>",
          loading: true,
          onOk: () => {
            let ids = this.checkStuID.map((val) => {
              return val.id;
            });
            api.post("/xwcloud-zsbm/yxstu/YixiangStu/setYxStuWeifenpei",ids).then((res) => {
              if (res.success) {
                this.GetYixiangStuByPage();
                this.$Message.success(res.msg);
                this.$Modal.remove();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    /**
     * 获取下次跟进是否必填
     */
    getNextGenjingReq() {
      api.get("/xwcloud-zsbm/yxstu/YixiangStu/getNextGenjingRequired",{}).then((res) => {
        // console.log("res", res);
        this.nextGenjingRequired = res.obj;
      });
    },
    /**
     * 报名
     */
    baoming() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 1) {
        console.log(this.checkStuID[0]);
        this.$router.push({
          path: "/addxinqian",
          query: {
            yxstuID: this.checkStuID[0].id,
          },
        });
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    /**
     * 充值
     */
    chongzhi() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 1) {
        this.$router.push({
          path: "/addnewchongzhi",
          query: {
            yxstuID: this.checkStuID[0].id,
          },
        });
      } else {
        this.$Message.error("请选择一行进行操作");
      }
      console.log("充值");
    },
    /**
     * 试听
     */
    shiting() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 1) {
        this.modalShow_shiting = true;
        this.stuID_shiting = null;
        this.campusID_shiting = null;
        this.$nextTick(() => {
          this.stuID_shiting = this.checkStuID[0].id;
          this.campusID_shiting = this.checkStuID[0].campusID;
        });
        // console.log(this.selection[0]);
      } else {
        this.$Message.error("请选择一行操作");
      }
    },
    /**
     * 获取支付方式
     */
    getPayMoneyStyleList() {
      api.get("/xwcloud-sys/sys/StaffManagement/GetAllPxPayMoneyStyleList",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // console.log(res.obj)
          this.payMoneyStyleList = res.obj;
        }
      });
    },
    hi_rate() {
      // this.getHi_rate().then((res) => {
      //   if (res.code == "success") {
      //     this.$Modal.confirm({
      //       title: "意向学员转化率",
      //       content:
      //         "<p>历史意向学员人数：" +
      //         res.obj.countStu +
      //         "</p>" +
      //         "<p>报名人数：" +
      //         res.obj.countQiandan +
      //         "</p>" +
      //         "<p>转化率：<span style='color:red'>" +
      //         res.obj.rate +
      //         "%</span></p>",
      //       loading: true,
      //       onOk: () => {
      //         this.$Modal.remove();
      //       },
      //       onCancel: () => {},
      //     });
      //   }
      // });
    },
  },
  mounted: function () {
    this.GetYixiangStuByPage();
    this.getAllCampusList();
    this.getstugrade();
    this.getSearchTelFrom();
    this.getSearchTelLevel();
    this.getDiyParamList();
    this.getDropdownOption();
    this.getSubject();
    this.getAllStaffList();
    this.getNextGenjingReq();
    this.getPayMoneyStyleList();
  },
};
</script>
