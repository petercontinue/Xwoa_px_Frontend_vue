<template>
  <Tabs value="teacher">
    <TabPane label="教师学员流失率" name="teacher">
      <Row>
        <Col span="18">
          <div style="float: left">
            <span>快捷查询：</span>
            <Button type="info" ghost @click="search_teacher(0)">全部</Button>
            <Button type="success" ghost @click="search_teacher(1)">本月</Button>
            <Button type="warning" ghost @click="search_teacher(2)">下月</Button>
            <Divider type="vertical" />
            <span>按起止日期查询</span>
            <Date-picker
              v-model="datesoe_teacher"
              type="daterange"
              placeholder="选择日期"
              style="width: 200px"
              @on-change="search_teacher(3)"
            ></Date-picker>
            <Divider type="vertical" />
          </div>
          <Alert style="float: left" show-icon>
            <Icon type="ios-bulb-outline" slot="icon"></Icon>
            流失率：消课总人数减去上课老师30天内消课人数除以消课总人数</Alert
          >
        </Col>
        <!---->
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection_teacher"
            :columns="columns_teacher"
            :data="data_teacher"
          ></Table>
        </Col>
      </Row>
      <Row style="margin-top: 15px">
        <Page
          :total="total_teacher"
          show-elevator
          show-total
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage_teacher"
          @on-page-size-change="changePageSize_teacher"
        />
      </Row>
    </TabPane>
    <TabPane label="班主任学员流失率" name="banzhuren">
      <Row>
        <Col span="18">
          <div style="float: left">
            <span>快捷查询：</span>
            <Button type="info" ghost @click="search_banzhuren(0)">全部</Button>
            <Button type="success" ghost @click="search_banzhuren(1)">本月</Button>
            <Button type="warning" ghost @click="search_banzhuren(2)">下月</Button>
            <Divider type="vertical" />
            <span>按起止日期查询</span>
            <Date-picker
              v-model="datesoe_banzhuren"
              type="daterange"
              placeholder="选择日期"
              style="width: 200px"
              @on-change="search_banzhuren(3)"
            ></Date-picker>
            <Divider type="vertical" />
          </div>
          <Alert style="float: left" show-icon>
            <Icon type="ios-bulb-outline" slot="icon"></Icon>
            流失率：消课总人数减去上课老师30天内消课人数除以消课总人数</Alert
          >
        </Col>
        <!---->
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection_banzhuren"
            :columns="columns_banzhuren"
            :data="data_banzhuren"
          ></Table>
        </Col>
      </Row>
      <Row style="margin-top: 15px">
        <Page
          :total="total_banzhuren"
          show-elevator
          show-total
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage_banzhuren"
          @on-page-size-change="changePageSize_banzhuren"
        />
      </Row>
    </TabPane>
    <TabPane label="校区学员流失率" name="campus">
      <Row>
        <Col span="18">
          <div style="float: left">
            <span>快捷查询：</span>
            <Button type="info" ghost @click="search_campus(0)">全部</Button>
            <Button type="success" ghost @click="search_campus(1)">本月</Button>
            <Button type="warning" ghost @click="search_campus(2)">下月</Button>
            <Divider type="vertical" />
            <span>按起止日期查询</span>
            <Date-picker
              v-model="datesoe_campus"
              type="daterange"
              placeholder="选择日期"
              style="width: 200px"
              @on-change="search_campus(3)"
            ></Date-picker>
            <Divider type="vertical" />
          </div>
          <Alert style="float: left" show-icon>
            <Icon type="ios-bulb-outline" slot="icon"></Icon>
            流失率：消课总人数减去校区30天内消课人数除以消课总人数</Alert
          >
        </Col>
        <!---->
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection_campus"
            :columns="columns_campus"
            :data="data_campus"
          ></Table>
        </Col>
      </Row>
      <Row style="margin-top: 15px">
        <Page
          :total="total_campus"
          show-elevator
          show-total
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage_campus"
          @on-page-size-change="changePageSize_campus"
        />
      </Row>
    </TabPane>
  </Tabs>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import * as api from "@/api/api.js";
export default {
  name: "xueyuanliushilv",
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
  },
  data() {
    return {
      menuID: "415",
      campusList: [],
      //#region 教师学员流失率
      datesoe_teacher: null,
      columns_teacher: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj_teacher.campusID = value != "-1" ? value : null;
                    this.search_teacher();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "教师",
          key: "staffName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "教师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj_teacher.staffName = value;
                    this.search_teacher();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "在上人数",
          key: "zaistunum",
          align: "center",
          //   width: 100,
          render: (h, params) => {
            if (params.row.zaistunum == null) {
              return h("div", 0);
            } else {
              return h("div", params.row.zaistunum);
            }
          },
        },
        {
          title: "总人数",
          key: "allstunum",
          align: "center",
          render: (h, params) => {
            if (params.row.allstunum == null) {
              return h("div", 0);
            } else {
              return h("div", params.row.allstunum);
            }
          },
          //   width: 100,
        },
        {
          title: "流失率",
          //   key: "yixiangText",
          align: "center",
          //   width: 100,
          render: (h, { row }) => {
            if (row.allstunum > 0) {
              let liunum = row.allstunum - (row.zaistunum == null ? 0 : row.zaistunum);
              return h("div", this.Percentage(liunum, row.allstunum));
            } else {
              return h("div", "-");
            }
          },
        },
      ],
      data_teacher: [],
      total_teacher: 0,
      searchObj_teacher: {
        size: 10,
        current: 1,
        campusID: null,
        staffName: null,
        datesoe: null,
        type: 0,
      },
      //#endregion
      //#region 班主任学员流失率
      datesoe_banzhuren: null,
      columns_banzhuren: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj_banzhuren.campusID = value != "-1" ? value : null;
                    this.search_banzhuren();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班主任",
          key: "staffName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "班主任",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj_banzhuren.staffName = value;
                    this.search_banzhuren();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "在上人数",
          key: "zaistunum",
          align: "center",
          //   width: 100,
          render: (h, parmas) => {
            if (parmas.row.zaistunum == null) {
              return h("div", 0);
            } else {
              return h("div", parmas.row.zaistunum);
            }
          },
        },
        {
          title: "总人数",
          key: "allstunum",
          align: "center",
          render: (h, params) => {
            if (params.row.allstunum == null) {
              return h("div", 0);
            } else {
              return h("div", params.row.allstunum);
            }
          },
        },
        {
          title: "流失率",
          //   key: "yixiangText",
          align: "center",
          //   width: 100,
          render: (h, { row }) => {
            if (row.allstunum > 0) {
              //   console.log(row);
              let liunum = row.allstunum - row.zaistunum;

              return h("div", this.Percentage(liunum, row.allstunum));
            } else {
              return h("div", "-");
            }
          },
        },
      ],
      data_banzhuren: [],
      total_banzhuren: 0,
      searchObj_banzhuren: {
        size: 10,
        current: 1,
        campusID: null,
        staffName: null,
        datesoe: null,
        type: null,
      },
      //#endregion
      //#region 校区学员流失率
      datesoe_campus: null,
      columns_campus: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj_campus.campusID = value != "-1" ? value : null;
                    this.search_campus();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "在上人数",
          key: "zaistunum",
          align: "center",
          render: (h, params) => {
            if (params.row.zaistunum == null) {
              return h("div", 0);
            } else {
              return h("div", params.row.zaistunum);
            }
          },
          //   width: 100,
        },
        {
          title: "总人数",
          key: "allstunum",
          align: "center",
          render: (h, params) => {
            if (params.row.allstunum == null) {
              return h("div", 0);
            } else {
              return h("div", params.row.allstunum);
            }
          },
          //   width: 100,
        },
        {
          title: "流失率",
          //   key: "yixiangText",
          align: "center",
          //   width: 100,
          render: (h, { row }) => {
            if (row.allstunum > 0) {
              //   console.log(row);
              let liunum = row.allstunum - row.zaistunum;

              return h("div", this.Percentage(liunum, row.allstunum));
            } else {
              return h("div", "-");
            }
          },
        },
      ],
      data_campus: [],
      total_campus: 0,
      searchObj_campus: {
        size: 10,
        current: 1,
        campusID: null,
        staffName: null,
        datesoe: null,
        type: 0,
      },
      //#endregion
    };
  },
  methods: {
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 415 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
    },
    //计算两数的百分比，保留两位小数位；
    Percentage(num, total) {
      return Math.round((num / total) * 10000) / 100.0 + "%"; // 小数点后两位百分比
    },
    //#region 教师学员流失率
    changePage_teacher(current) {
      this.searchObj_teacher.current = current;
      this.getteaStuLiushi();
    },
    changePageSize_teacher(pageSize) {
      // 改变每页记录的条数
      this.searchObj_teacher.size = pageSize;
      this.getteaStuLiushi();
    },
    search_teacher(type = null) {
      this.searchObj_teacher.size = 10;
      this.searchObj_teacher.current = 1;
      this.searchObj_teacher.type = type;
      if (type == 0) {
        this.searchObj_teacher = {
          size: 10,
          current: 1,
          campusID: null,
          staffName: null,
          datesoe: null,
          type: null,
        };
        this.datesoe_teacher = null;
      } else if (type == 3) {
        if (this.datesoe_teacher) {
          this.searchObj_teacher.datesoe =
            toolbox.dateFtt(this.datesoe_teacher[0], "yyyy-MM-dd") +
            "_" +
            toolbox.dateFtt(this.datesoe_teacher[1], "yyyy-MM-dd");
        }
      }
      this.getteaStuLiushi();
    },
    getteaStuLiushi() {
      api
        .get(
          "xwcloud-caiwu/shujutongji/liushilvStu/getTeaStuLiushiPage",
          this.searchObj_teacher
        )
        .then((res) => {
          if (res.code == "success") {
            this.total_teacher = Number(res.obj.total);
            this.data_teacher = res.obj.records;
          }
        });
    },
    //#endregion
    //#region 班主任学员流失率
    changePage_banzhuren(current) {
      this.searchObj_banzhuren.current = current;
      this.getBanzhurenStuLiushi();
    },
    changePageSize_banzhuren(pageSize) {
      // 改变每页记录的条数
      this.searchObj_banzhuren.size = pageSize;
      this.getBanzhurenStuLiushi();
    },
    search_banzhuren(type = null) {
      this.searchObj_banzhuren.size = 10;
      this.searchObj_banzhuren.current = 1;
      this.searchObj_banzhuren.type = type;
      if (type == 0) {
        this.searchObj_banzhuren = {
          size: 10,
          current: 1,
          campusID: null,
          staffName: null,
          datesoe: null,
          type: null,
        };
        this.datesoe_banzhuren = null;
      } else if (type == 3) {
        if (this.datesoe_banzhuren) {
          this.searchObj_banzhuren.datesoe =
            toolbox.dateFtt(this.datesoe_banzhuren[0], "yyyy-MM-dd") +
            "_" +
            toolbox.dateFtt(this.datesoe_banzhuren[1], "yyyy-MM-dd");
        }
      }
      this.getBanzhurenStuLiushi();
    },
    getBanzhurenStuLiushi() {
      api
        .get(
          "xwcloud-caiwu/shujutongji/liushilvStu/getBanzhurenStuLiushiPage",
          this.searchObj_banzhuren
        )
        .then((res) => {
          if (res.code == "success") {
            this.total_banzhuren = Number(res.obj.total);
            this.data_banzhuren = res.obj.records;
          }
        });
    },
    //#endregion
    //#region 校区学员流失率
    changePage_campus(current) {
      this.searchObj_campus.current = current;
      this.getCampusStuLiushi();
    },
    changePageSize_campus(pageSize) {
      // 改变每页记录的条数
      this.searchObj_campus.size = pageSize;
      this.getCampusStuLiushi();
    },
    search_campus(type) {
      this.searchObj_campus.size = 10;
      this.searchObj_campus.current = 1;
      this.searchObj_campus.type = type;
      if (type == 0) {
        this.searchObj_campus = {
          size: 10,
          current: 1,
          campusID: null,
          staffName: null,
          datesoe: null,
          type: 0,
        };
        this.datesoe_campus = null;
      } else if (type == 3) {
        if (this.datesoe_campus) {
          this.searchObj_campus.datesoe =
            toolbox.dateFtt(this.datesoe_campus[0], "yyyy-MM-dd") +
            "_" +
            toolbox.dateFtt(this.datesoe_campus[1], "yyyy-MM-dd");
        }
      }
      this.getCampusStuLiushi();
    },
    getCampusStuLiushi() {
      api
        .get(
          "xwcloud-caiwu/shujutongji/liushilvStu/getCampusStuLiushiPage",
          this.searchObj_campus
        )
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.total_campus = Number(res.obj.total);
            this.data_campus = res.obj.records;
            console.log("ssss2");
            console.log(this.data_campus);
          }
        });
    },
    //#endregion
  },
  mounted() {
    this.getAllCampusList();
    this.getteaStuLiushi();
    this.getBanzhurenStuLiushi();
    this.getCampusStuLiushi();
  },
};
</script>

<style lang="" scoped></style>
