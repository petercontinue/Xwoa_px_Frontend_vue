<template>
  <div>
    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="GetAllLogsPagesList"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns"
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
    <deriverizhi-form v-model="DaochuShow"></deriverizhi-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import buttonsForm from "../../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../../components/common-buttons/datesearchForm";
import deriverizhiForm from "../../../../components/systemSetting/xitongrizhi/deriverizhiForm";
export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    deriverizhiForm,
  },
  data() {
    return {
      columns: [
        {
          title: "操作时间",
          key: "addTime",
          align: "center",
          width: 200,
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "操作时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.SDate = value[0];
                    this.Edate = value[1];
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
          width: 200,
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
                      this.campusID = value;
                      this.TableSearch();
                    } else {
                      this.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "操作人",
          key: "staffName",
          align: "center",
          width: 200,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "操作人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.staffID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "操作类型",
          key: "logType",
          align: "center",
          width: 200,
          render: (h, params) => {
            if (params.row.logType == 1) {
              return h("div", [h("span", "员工日志")]);
            } else if (params.row.logType == 2) {
              return h("div", [h("span", "学员日志")]);
            } else if (params.row.logType == 3) {
              return h("div", [h("span", "系统自动产生的日志")]);
            }
          },
        },
        {
          title: "操作日志详情",
          key: "systemContent",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      menuID: "561",
      campusID: "",
      staffID: "",
      logType: 0,
      SDate: "",
      Edate: "",
      allcampusData: [],
      DaochuShow: false,
    };
  },
  methods: {
    ...mapActions(["GetAllLogsPages", "getallcampusList"]),
    search() {
      this.size = 10;
      this.current = 1;
      this.campusID = "";
      this.staffID = "";
      this.logType = 0;
      this.SDate = "";
      this.Edate = "";
      this.GetAllLogsPagesList();
    },

    GetAllLogsPagesList() {
      this.GetAllLogsPages({
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        staffID: this.staffID,
        logType: this.logType,
        SDate: this.SDate,
        Edate: this.Edate,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.current = current;
      this.GetAllLogsPagesList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.GetAllLogsPagesList();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    TableSearch() {
      this.GetAllLogsPagesList();
    },
    clickShijian(onclicks) {
      if (onclicks == "derive()") {
        this.DaochuShow = true;
      }
    },
    onSearch(search) {
      window.console.log(search);
    },
    getAllCampusList() {
      this.getallcampusList({ menuID: "561" }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
  },
  mounted: function () {
    this.GetAllLogsPagesList();
    this.getAllCampusList();
  },
};
</script>
