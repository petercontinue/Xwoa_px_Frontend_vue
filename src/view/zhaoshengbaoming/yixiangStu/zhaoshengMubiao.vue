<template>
  <div>
    <Alert show-icon>
      <Icon type="ios-bulb-outline" slot="icon"></Icon
      >温馨提示：本功能的使用方法和作用：先公司确定校区总的业绩目标和招生人数目标；然后校区再去把目标分解分配到招生顾问个人；
    </Alert>

    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
      </Col>
      <!---->
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getZhaoshengMubiao"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns"
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
    <addOrEditZsMubiaoModal
      v-model="modalShow"
      :campusList="campusList"
      :title="title"
      @refresh="getZhaoshengMubiao"
      :modalData="modalData"
    ></addOrEditZsMubiaoModal>
    <fenpeiMubiaoModal
      v-model="modalShow_fenpei"
      :staffList="staffList"
      :rowData="modalShow_rowData"
      @refresh="getZhaoshengMubiao"
    ></fenpeiMubiaoModal>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import datesearchyearmonthForm from "@/components/common-buttons/datesearchyearmonthForm";
import addOrEditZsMubiaoModal from "@/components/zhaoshengbaoming/yixiangxueyuan/addOrEditZsMubiaoModal";
import fenpeiMubiaoModal from "@/components/zhaoshengbaoming/yixiangxueyuan/fenpeiMubiaoModal";
import * as api from "@/api/api.js";
export default {
  name: "zhaoshengMubiao",
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    datesearchyearmonthForm,
    addOrEditZsMubiaoModal,
    fenpeiMubiaoModal,
  },
  data() {
    return {
      menuID: "134",
      columns: [
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
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                props: {
                  content: "校区",
                  data: this.campusList,
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
          title: "年月",
          key: "yearMonth",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchyearmonthForm, {
                props: {
                  content: "年月",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.yearMonth = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "月业绩目标",
          key: "monthMoney",
          align: "center",
          //   width: 100,
        },
        {
          title: "月人数目标",
          key: "monthSum",
          align: "center",
          //   width: 100,
        },
        {
          title: "校区团队业绩分配",
          key: "yuangong",
          align: "center",
          //   width: 100,
          render: (h, { row }) => {
            let isfenpei = "未分配：";
            let isfenpeiClick = "现在去分配";
            let isgreen = true;
            if (row.yuangong == row.monthMoney) {
              isfenpei = "已分配：";
              isfenpeiClick = "查看明细";
              isgreen = false;
            }
            return h("div", [
              isfenpei,
              h(
                "span",
                {
                  on: {
                    click: () => {
                      this.fenpeiMubiao(row);
                    },
                  },
                  style: {
                    color: isgreen ? "green" : "blue",
                    cursor: "pointer",
                  },
                },
                [isfenpeiClick]
              ),
            ]);
          },
        },
        {
          title: "分配日期",
          key: "addtime",
          align: "center",
          //   width: 100,
        },
      ],
      data: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        campusID: null,
        yearMonth: null,
      },
      selection: [],
      stuGradeList: [],
      campusList: [],
      staffPostList: [],
      staffList: [],
      modalShow: false,
      title: "",
      modalData: null,

      modalShow_fenpei: false,
      modalShow_rowData: {},

      checkStuID: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    clickShijian(onclicks) {
      // console.log(onclicks);
      let evalStr = "this." + onclicks;
      if (onclicks.indexOf("addinfo") > -1 || onclicks.indexOf("edit") > -1) {
        evalStr += "()";
      }
      eval(evalStr);
    },
    changePage(current) {
      this.searchObj.current = current;
      this.getZhaoshengMubiao();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.getZhaoshengMubiao();
    },
    selectTableChange(selection) {
      this.selection = selection;
    },
    search(val = null) {
      this.searchObj.size = 10;
      this.searchObj.current = 1;
      this.searchObj.type = val;
      if (val == "1") {
        this.searchObj = {
          size: 10,
          current: 1,
          campusID: null,
          yearMonth: null,
        };
      }
      this.getZhaoshengMubiao();
    },
    getZhaoshengMubiao() {
      api
        .get("/xwcloud-zsbm/yxstu/YixiangStu/getcampusMubiaoPages", this.searchObj)
        .then((res) => {
          if (res.code == "success") {
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
     * 获取校区
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
    },
    addinfo() {
      this.modalShow = true;
      this.title = "添加";
    },
    edit() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 1) {
        this.modalShow = true;
        this.title = "修改";
        this.modalData = null;
        this.$nextTick(() => {
          this.modalData = this.checkStuID[0];
        });
        // console.log(this.modalData);
      } else {
        this.$Message.error("请选择一行");
      }
    },
    del() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID == 0) {
        this.$Message.error("请至少选择一行");
        return;
      }
      this.$Modal.confirm({
        title: "您正在进行删除操作",
        content: "<p>确定要删除吗</p>",
        loading: true,
        onOk: () => {
          let ids = this.checkStuID.map((val) => val.id).join(",");
          // console.log(ids);
          // return;
          api
            .del("/xwcloud-zsbm/yxstu/YixiangStu/deleteCampusZhaoshengmubiao/" + ids)
            .then((res) => {
              if (res.success) {
                this.getZhaoshengMubiao();
                this.$Message.success(res.msg);
              } else {
                this.$Message.error(res.msg);
              }
            });
          this.$Modal.remove();
        },
        onCancel: () => {},
      });
    },
    fenpeiMubiao(row) {
      // console.log(row);
      this.modalShow_fenpei = true;
      this.modalShow_rowData = {};
      this.$nextTick(() => {
        this.modalShow_rowData = row;
      });
    },
    /**
     * 获取员工
     */
    getAllStaffList() {
      api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // console.log(res);
          this.staffList = res.obj;
        }
      });
    },
  },
  mounted() {
    this.getZhaoshengMubiao();
    this.getAllCampusList();
    this.getAllStaffList();
  },
};
</script>

<style scoped></style>
