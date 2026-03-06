<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 30px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1、先【科目设置】，然后再【添加】课程；科目和课程的关系：一个科目包含多个课程；例如：语文（科目）包括语文一对一（课程）、语文小班（课程）等；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>
            2、【管理课程内容】该功能只有某些培训行业门类才用得着，课程内容是固定的才需要设置；
          </span>
        </Col>

        <Col style="margin-top: 10px">
          <span>
            3、修改科目设置
            <Button size="small" type="text" style="color: red" @click="tokmsetting()"
              >点击这里</Button
            >去设置
          </span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            科目，培训方式，计费方式，课程时长
            是在【机构管理-系统设置-机构设置】自定义设置的。
            <Button size="small" type="text" style="color: red" @click="tokmsetting()"
              >点击这里</Button
            >去设置
          </span>
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getallkechengPage"
      @increment="clickShijian"
    ></buttons-form>
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
    <addkecheng-form
      v-model="addShow"
      v-on:handleSearch="getallkechengPage"
      :editData="editData"
    ></addkecheng-form>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import addkechengForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addkechengForm";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    addkechengForm,
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
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
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.campusName = value;
                      this.TableSearch();
                    } else {
                      this.campusName = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "科目",
                  data: this.allkemuData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.subjectID = value;
                      this.TableSearch();
                    } else {
                      this.subjectID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程名称",
          key: "kechengName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.kechengName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程内容",
          key: "kechengcontent",
          align: "center",
          render: (h, params) => {
            if (params.row.kechengcontent != 0) {
              return h("div", [
                h(
                  "span",
                  {
                    style: { color: "blue" },
                    on: {
                      click: () => {
                        this.kechnegcontentxiangqing(params);
                      },
                    },
                  },
                  params.row.kechengcontent + "_详情"
                ),
              ]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
        {
          title: "课程启用状态",
          key: "isShow",
          align: "center",
          render: (h, params) => {
            if (params.row.isShow == "0") {
              return h("div", [h("span", { style: { color: "red" } }, "未启用")]);
            } else if (params.row.isShow == "1") {
              return h("div", [h("span", { style: { color: "green" } }, "启用")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程启用状态",
                  data: this.kechengzhuantai,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.isShow = value;
                      this.TableSearch();
                    } else {
                      this.isShow = -1;
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
          key: "jifeiStyleID",
          align: "center",
          render: (h, params) => {
            if (params.row.jifeiStyleID == 1) {
              return h("div", [h("span", "按课时计费")]);
            } else if (params.row.jifeiStyleID == 2) {
              return h("div", [h("span", "按课时包计费")]);
            } else if (params.row.jifeiStyleID == 3) {
              return h("div", [h("span", "按起止日期计费")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "计费方式",
                  data: this.jifeistyleData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.jifeiStyleID = value;
                      this.TableSearch();
                    } else {
                      this.jifeiStyleID = "";
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
          key: "buxiStyleName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "培训方式",
                  data: this.buxistyleData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.buxiStyleName = value;
                      this.TableSearch();
                    } else {
                      this.buxiStyleName = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程时长/课时",
          key: "classTimeStyleName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程时长/课时",
                  data: this.kechengshichangData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.classTimeStyleName = value;
                      this.TableSearch();
                    } else {
                      this.classTimeStyleName = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课时",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "课程单价（元/课时）",
          key: "kechengprice",
          align: "center",
        },
        {
          title: "课程总价（元）",
          key: "buyZonjia",
          align: "center",
        },
        {
          title: "请假是否扣课时",
          key: "iskoukeshi",
          align: "center",
          render: (h, params) => {
            if (params.row.iskoukeshi == true) {
              return h("div", [h("span", "扣课时")]);
            } else {
              return h("div", [h("span", "不扣课时")]);
            }
          },
        },
        {
          title: "请假次数（次）",
          key: "qingjiaTimes",
          align: "center",
        },
      ],
      checkAll: false,
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusName: "",
      subjectID: 0,
      kechengName: "",
      jifeiStyleID: 0,
      buxiStyleName: "",
      classTimeStyleName: "",
      isShow: -1,
      addShow: false,
      updateShow: false,
      menuID: "146",
      staffID: "11",
      type: 1,
      allcampusData: [],
      allkemuData: [],
      kechengzhuantai: [
        { id: "1", name: "启用" },
        { id: "2", name: "不启用" },
      ],
      jifeistyleData: [
        { id: "1", name: "按课时计费" },
        { id: "2", name: "按课时包计费" },
        { id: "3", name: "按起止日期计费" },
      ],
      buxistyleData: [],
      kechengshichangData: [],
      editdataID: "",
      editData: "",
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    tokmsetting() {
      this.$Modal.confirm({
        closable: true,
        content: "<p>确定跳转至科目设置?</p>",
        onOk: () => {
          this.$router.push({
            path: "/kemushezhi",
            query: {},
          });
        },
        onCancel: () => {},
      });
    },

    search() {
      this.size = 10;
      this.current = 1;
      this.campusName = "";
      this.subjectID = 0;
      this.kechengName = "";
      this.jifeiStyleID = 0;
      this.buxiStyleName = "";
      this.classTimeStyleName = "";
      this.isShow = -1;
      this.getallkechengPage();
    },
    getallkechengPage() {
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllKechengPages", {
          size: this.size,
          current: this.current,
          isShow: this.isShow,
          campusName: this.campusName,
          subjectID: this.subjectID,
          kechengName: this.kechengName,
          jifeiStyleID: this.jifeiStyleID,
          buxiStyleName: this.buxiStyleName,
          classTimeStyleName: this.classTimeStyleName,
        })
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
    changePage(current) {
      this.current = current;
      this.getallkechengPage();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getallkechengPage();
    },
    addKechengInfo() {
      this.editData = "";
      this.addShow = true;
    },
    updateKechengInfo() {
      this.editDat = "";
      let i = 0;
      this.data.forEach((items) => {
        if (items._checked) {
          i += 1;
          this.editData = JSON.stringify(items);
        }
      });
      if (i == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (i > 1) {
        this.$Message.error("只能选择1行！");
      } else {
        this.addShow = true;
      }
    },
    //按钮事件
    clickShijian(onclicks) {
      //console.log(onclicks);
      if (onclicks == "addinfo") {
        this.addKechengInfo();
      } else if (onclicks == "edit") {
        this.updateKechengInfo();
      } else if (onclicks == "del()") {
        this.editdataID = "";
        this.data.forEach((items) => {
          if (items._checked) {
            this.editdataID += items.id + ",";
          }
        });

        if (this.editdataID == "") {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.editdataID = this.editdataID.substring(0, this.editdataID.length - 1); //去掉最后面的逗号
          this.$Modal.confirm({
            title: "提示",
            content: "<p>确定删除该数据？</p>",
            onOk: () => {
              api
                .del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteKechengInfo", {
                  ids: this.editdataID,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getallkechengPage();
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            },
            onCancel: () => {},
          });
        }
      } else if (onclicks == "kemuManage()") {
        this.$router.push({
          path: "/kemushezhi",
          query: {},
        });
      } else if (onclicks == "derive()") {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定导出课程数据？</p>",
          onOk: () => {
            axios
              .request({
                method: "get",
                url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/exportKechengInfo",
                headers: {
                  Authorization: "Bearer " + getToken(),
                },
                responseType: "blob",
              })
              .then((res) => {
                this.btnLoading = false;
                // 文件下载
                const blob = new Blob([res], {
                  type: "application/vnd.ms-excel",
                });
                let link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.setAttribute("download", "课程信息导出.xls");
                link.click();
                link = null;
                this.$Message.success("导出成功");
              })
              .catch((err) => {
                this.btnLoading = false;
                this.$Message.error("下载失败");
              });
          },
          onCancel: () => {},
        });
      } else if (onclicks == "kechengContent()") {
        this.editdataID = "";
        this.data.forEach((items) => {
          if (items._checked) {
            this.editdataID = items.id + "";
          }
        });
        if (this.editdataID == "") {
          this.$Message.error("请选择课程");
        } else {
          this.$router.push({
            path: "/kechengcontent",
            query: {
              id: this.editdataID,
            },
          });
        }
      } else if (onclicks == "kechengIsShow()") {
        this.updatekcShow(1);
      } else if (onclicks == "kechengIsNoShow()") {
        this.updatekcShow(0);
      }
    },

    updatekcShow(type) {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items._checked) {
          this.editdataID += items.id + ",";
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要编辑的课程");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "确定修改该课程状态？",
          onOk: () => {
            api
              .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateKechengState", {
                Id: this.editdataID,
                state: type,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getallkechengPage();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {},
        });
      }
    },

    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
      api.get("/xwcloud-sys/sys/StaffManagement/GetAllSubjectList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allkemuData = res.obj;
        }
      });
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllBuxistyleList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.buxistyleData = res.obj;
        }
      });
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllClassTimeStyleList", {})
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.kechengshichangData = res.obj;
          }
        });
    },
    TableSearch() {
      this.getallkechengPage();
    },
    kechnegcontentxiangqing(params) {
      this.$router.push({
        path: "/kechengcontent",
        query: {
          id: params.row.id,
        },
      });
    },
  },
  mounted: function () {
    this.getallkechengPage();
    this.getAllCampusList();
  },
};
</script>
