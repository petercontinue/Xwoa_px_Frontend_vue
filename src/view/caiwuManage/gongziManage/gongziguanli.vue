<template>
  <div>
    <div style="margin-top: 20px">
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >下载导入模板，组织好工资数据，导入，然后领导审批，审批通过以后，大家就可以看自己的工资数据了；</span
          >
        </Col>
      </Alert>
    </div>

    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchall()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addgongzi-form
      v-model="showaddgongzi"
      @handleSearch="getGongziListPage"
    ></addgongzi-form>
    <editgongzi-form
      v-model="showeditgongzi"
      @handleSearch="getGongziListPage"
      :gongziID="selectID"
    ></editgongzi-form>
    <get-gongzixiangxi-form
      v-model="showxiangxi"
      @handleSearch="getGongziListPage"
      :gongziID="selectID"
    ></get-gongzixiangxi-form>
    <importgongzi
      v-model="importShow"
      v-on:handleSearch="getGongziListPage"
    ></importgongzi>
    <exportgongzi v-model="exportShow"></exportgongzi>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import AddgongziForm from "../../../components/caiwuManage/addgongziForm.vue";
import EditgongziForm from "../../../components/caiwuManage/editgongziForm.vue";
import GetGongzixiangxiForm from "../../../components/caiwuManage/getGongzixiangxiForm.vue";
import importgongzi from "@/components/caiwuManage/importgongzi";
import exportgongzi from "@/components/caiwuManage/exportgongzi";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    AddgongziForm,
    EditgongziForm,
    GetGongzixiangxiForm,
    importgongzi,
    exportgongzi,
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
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.campusID = value;
                      this.TableSearch();
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
          title: "岗位",
          key: "postName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "岗位",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.staffPost = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "员工",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "员工",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.staffName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "工资总额",
          key: "salaryMoney",
          align: "center",
        },
        {
          title: "开始日期",
          key: "salaryDate",
          align: "center",
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
                    this.params.startDate = value[0];
                    this.params.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", toolbox.dateFtt(params.row.salaryDate, "yyyy-MM-dd"));
          },
        },
        {
          title: "结束日期",
          key: "salaryEndDate",
          align: "center",
          render: (h, params) => {
            if (params.row.salaryEndDate == null || params.row.salaryEndDate == "") {
              return "div", "-";
            } else {
              return h("div", toolbox.dateFtt(params.row.salaryEndDate, "yyyy-MM-dd"));
            }
          },
        },
        {
          title: "详情",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small",
                },
                style: {
                  marginRight: "5px",
                },
                on: {
                  click: () => {
                    this.clickShuju(params.row.id);
                  },
                },
              },
              "详细"
            );
          },
        },
        {
          title: "录入人",
          key: "lururenName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "录入人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.lururen = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "录入时间",
          key: "lurudatetime",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "录入时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startluruDate = value[0];
                    this.params.endluruDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h(
              "div",
              toolbox.dateFtt(params.row.lurudatetime, "yyyy-MM-dd hh:mm:ss")
            );
          },
        },
        {
          title: "审核状态",
          key: "shenheState",
          align: "center",
          render: (h, params) => {
            switch (params.row.shenheState) {
              case 0:
                return h("span", "未审核");
              case 1:
                return h("span", "已审核通过");
              case 2:
                return h("span", "已审核未通过");
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "审核状态",
                  data: this.statusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.status = value;
                      this.TableSearch();
                    } else {
                      this.params.status = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "审核人",
          key: "shengherenName",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "321",
      total: 0,
      importShow: false,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        staffPost: "",
        staffName: "",
        startDate: "",
        endDate: "",
        lururen: "",
        startluruDate: "",
        endluruDate: "",
        status: "",
      },
      selectID: "",
      showaddgongzi: false,
      showeditjiazhanggonggao: false,
      showeditgongzi: false,
      showxiangxi: false,
      showshenhe: false,
      campusList: [],
      statusList: [
        { id: 0, name: "未审核" },
        { id: 1, name: "已审核通过" },
        { id: 2, name: "已审核未通过" },
      ],
      exportShow: false,
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getGongziListPage() {
      console.log(this.params);
      api
        .get("xwcloud-caiwu/caiwu/pxgongzitable/gongzitiao/getGongziPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res);
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
      // 翻页
      this.params.current = current;
      this.getGongziListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getGongziListPage();
    },
    addinfo() {
      this.showaddgongzi = true;
    },
    edit() {
      let edlist = [];
      console.log(this.data);
      this.data.forEach((items) => {
        if (items._checked == true) {
          edlist.push(items);
        }
      });
      if (edlist.length == 0) {
        this.$Message.error("请选择数据!");
      } else if (edlist.length > 1) {
        this.$Message.error("只能选择一行!");
      } else {
        this.selectID = edlist[0].id;
        this.showeditgongzi = true;
      }
    },
    clickShuju(gongziID) {
      this.selectID = gongziID;
      this.showxiangxi = true;
    },
    getCampusListData() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
    },

    del(ids) {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          api
            .del("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/delGongzi", {
              salaryIDs: ids,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除成功!");
                this.getGongziListPage();
              } else {
                this.$Message.error("删除失败!");
              }
            });
        },
        onCancel: () => {},
      });
    },
    Yaudit() {
      api
        .post("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/changeVerify", {
          salaryID: this.selectID,
          shenheState: 1,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success("成功!");
            this.getGongziListPage();
            this.showshenhe = false;
          } else {
            this.$Message.error("失败!");
          }
        });
    },
    Naudit() {
      api
        .post("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/changeVerify", {
          salaryID: this.selectID,
          shenheState: 2,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success("成功!");
            this.getGongziListPage();
            this.showshenhe = false;
          } else {
            this.$Message.error("失败!");
          }
        });
    },
    clickShijian(onclicks) {
      let shenheData = [];
      let IDs = "";
      this.data.forEach((items) => {
        if (items._checked) {
          IDs += items.id + ",";
          shenheData = items;
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "del()":
          if (IDs == "") {
            this.$Message.error("请选择数据");
          } else {
            this.del(IDs);
          }
          break;
        case "addinfo":
          this.addinfo();
          break;
        case "edit":
          this.edit();
          break;
        case "theimport()":
          this.Ontheimport();
          break;
        case "derive()":
          this.exportShow = true;
          break;
        case "audit()":
          this.selectID = IDs;
          if (shenheData.shenheState) {
            this.$Message.error("该信息已审核，请勿重复操作！");
          } else {
            if (IDs == "") {
              this.$Message.error("请选择数据");
            } else {
              this.$Modal.confirm({
                title: "工资审核",
                content: "<p>是否通过该员工该月份的工资信息？</p>",
                okText: "通过",
                cancelText: "不通过",
                onOk: () => {
                  this.Yaudit();
                },
                onCancel: () => {
                  this.Naudit();
                },
              });
              //this.showshenhe = true;
            }
          }
          break;
      }
    },

    Ontheimport() {
      console.log("sss");
      this.importShow = true;
    },
    searchall() {
      this.params.current = 1;
      this.params.size = 10;
      this.params.campusID = "";
      this.params.staffPost = "";
      this.params.staffName = "";
      this.params.startDate = "";
      this.params.endDate = "";
      this.params.lururen = "";
      this.params.startluruDate = "";
      this.params.endluruDate = "";
      this.params.status = "";
      this.getGongziListPage();
    },
    TableSearch() {
      this.getGongziListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getGongziListPage();
    this.getCampusListData();
  },
};
</script>
