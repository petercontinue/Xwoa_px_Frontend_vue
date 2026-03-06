<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(2)">今天</Button>
        <Button type="warning" ghost @click="search(3)">本周内</Button>
        <Button type="error" ghost @click="search(4)">本月</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getgongsimessagePages"
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
          @on-row-click="onClickRow"
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
    <addgongsmsg-form
      v-model="addShow"
      :editData="editData"
      v-on:handleSearch="getgongsimessagePages"
    ></addgongsmsg-form>
    <derivegongsimsg-form v-model="deriveShow"> </derivegongsimsg-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import addgongsmsgForm from "../../../components/staffinfo/addgongsmsgForm";

import derivegongsimsgForm from "../../../components/staffinfo/derivegongsimsgForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    addgongsmsgForm,

    derivegongsimsgForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      headerSearchCampusVisible: false,
      headerSearchStaffVisible: false,
      headerStaffNameVisible: false,
      headerSearchtuitypeVisible: false,
      columns: [
        {
          title: "选择操作",
          align: "center",
          key: "checkBox",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.data.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "消息标题",
          key: "gonggaoTitel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "消息标题",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.gonggaoTitel = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "消息内容",
          key: "gonggaoContent",
          align: "center",
        },
        {
          title: "发送人",
          key: "staffName",
          align: "center",
        },
        {
          title: "消息时间",
          key: "gonggaoDate",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "周起始日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.SgonggaoDate = value[0];
                    this.EgonggaoDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      gonggaoTitel: "",
      SgonggaoDate: "",
      EgonggaoDate: "",
      menuID: "538",
      staffID: "11",
      allcampusData: [],
      alltuisongtype: [],
      addShow: false,
      deriveShow: false,
      checklist: [],
      editData: "",
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.checklist = [];
      this.data.forEach((items) => {
        //取消所有对象的勾选，checkBox设置为false
        this.$set(items, "checkBox", false);
      });
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
      this.checklist = this.$refs.selection.data[index];
    },
    getgongsimessagePages() {
      api
        .get("/xwcloud-sys/sys/StaffManagement/GetGongsigonggaoPages", {
          size: this.size,
          current: this.current,
          gonggaoTitel: this.gonggaoTitel,
          SgonggaoDate: this.SgonggaoDate,
          EgonggaoDate: this.EgonggaoDate,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            this.data.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "checkBox", false);
            });
          }
        });
    },
    changePage(current) {
      this.current = current;
      this.getgongsimessagePages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getgongsimessagePages();
    },
    addgongsiMsg() {
      this.editData = "";
      this.addShow = true;
    },
    updategongsiMsg() {
      this.editData = "";
      if (this.checklist.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editData = JSON.stringify(this.checklist);
        console.log(this.editData);
        this.addShow = true;
      }
    },
    derivedailkywork() {
      this.deriveShow = true;
    },
    onSearch(search) {
      window.console.log(search);
    },
    deleteMsg() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        api
          .del("/xwcloud-sys/sys/StaffManagement/DeleteGongsiGonggao", {
            Id: this.editdataID,
          })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getgongsimessagePages();
            }
          });
      }
    },
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "addinfo") {
        this.addgongsiMsg();
      } else if (onclicks == "edit") {
        this.updategongsiMsg();
      } else if (onclicks == "del()") {
        this.deleteMsg();
      } else if (onclicks == "derive()") {
        this.derivedailkywork();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    search(type) {
      this.type = type;
      if (type == 1) {
        this.gonggaoTitel = "";
        this.SgonggaoDate = "";
        this.EgonggaoDate = "";
        this.size = 10;
        this.current = 1;
        this.getgongsimessagePages();
      }
    },
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
      api.get("/xwcloud-sys/sys/StaffManagement/GetTuisongTyleList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.alltuisongtype = res.obj;
        }
      });
    },
    TableSearch() {
      this.getgongsimessagePages();
    },
  },
  mounted: function () {
    this.getgongsimessagePages();
    this.getAllCampusList();
  },
};
</script>
