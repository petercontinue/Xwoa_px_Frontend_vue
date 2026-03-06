<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >作业截止时间到了，学生还没交作业的，系统会自动发消息提醒学员，同时也会自动提醒老师哪些学员还未交作业；</span
          >
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
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
        @on-page-size-change="changePageSize"
        @on-change="changePage"
      />
    </Row>
    <addweizuoye-form
      v-model="addShow"
      v-on:handleSearch="getZuoyeListPage"
    ></addweizuoye-form>
    <editweizuoye-form
      v-model="editShow"
      :id="selectID"
      v-on:handleSearch="getZuoyeListPage"
    ></editweizuoye-form>
    <getweizuoye-detailed
      v-model="zuoyedetaileShow"
      :zuoyeid="zuoyeID"
    ></getweizuoye-detailed>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import AddweizuoyeForm from "../../../components/jiaowuManage/addweizuoyeForm.vue";
import EditweizuoyeForm from "../../../components/jiaowuManage/editweizuoyeForm.vue";
import GetweizuoyeDetailed from "../../../components/jiaowuManage/getweizuoyeDetailed.vue";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    AddweizuoyeForm,
    EditweizuoyeForm,
    GetweizuoyeDetailed,
    // 按钮控件
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
          title: "作业要求",
          key: "neirong",
          align: "center",
        },
        {
          title: "附件",
          key: "otherFile",
          align: "center",
        },
        {
          title: "老师",
          key: "teacherName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "老师",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.teacherName = value;
                    this.search();
                  },
                },
              }),
            ]);
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
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "作业上交详情",
          key: "submitDetails",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  color: "blue",
                },
                on: {
                  click: ($event) => {
                    this.zuoyeID = params.row.id;
                    this.zuoyedetaile();
                  },
                },
              },
              params.row.submitDetails
            );
          },
        },
        {
          title: "截止时间",
          align: "center",
          key: "endDate",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.endDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "添加时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "273",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        className: "",
        teacherName: "",
      },
      selectID: "",
      zuoyeID: "",
      daochuShow: false,
      addShow: false,
      editShow: false,
      zuoyedetaileShow: false,
    };
  },
  methods: {
    getZuoyeListPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxzuoyetable/getZuoyePage", this.params)
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

    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getZuoyeListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getZuoyeListPage();
    },
    addweizuoye() {
      this.addShow = true;
    },
    editweizuoye() {
      var chechdate = [];
      this.data.forEach((items) => {
        if (items._checked) {
          chechdate.push({ items });
        }
      });

      if (chechdate.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (chechdate.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        console.log(chechdate);
        this.selectID = chechdate[0].items.id;
        this.editShow = true;
        return;
      }
    },
    zuoyedetaile() {
      this.zuoyedetaileShow = true;
    },
    daochu() {
      // 弹出添加对话框
      toolbox.exportExcel(
        "/xwcloud-homeschool/homeschool/pxzuoyetable/exportZuoye",
        {},
        "微作业",
        this,
        false
      );
    },
    del() {
      let weizuoyeIDs = "";
      this.data.forEach((items) => {
        if (items._checked) {
          weizuoyeIDs += items.id + ",";
        }
      });
      weizuoyeIDs = weizuoyeIDs.substring(0, weizuoyeIDs.length - 1);
      if (weizuoyeIDs == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "删除数据",
          content: "<p>确定要删除数据吗?</p>",
          onOk: () => {
            api
              .del("xwcloud-homeschool/homeschool/pxzuoyetable/delZuoye", {
                Ids: weizuoyeIDs,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("删除成功!");
                  this.getZuoyeListPage();
                } else {
                  this.$Message.error("删除失败!");
                }
              });
          },
          onCancel: () => {},
        });
      }
    },
    clickShijian(onclicks) {
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "addinfo":
          this.addweizuoye();
          break;
        case "del()":
          this.del();
          break;
        case "edit":
          this.editweizuoye();
          break;
        case "derive()":
          this.daochu();
          break;
      }
    },
    search() {
      this.getZuoyeListPage();
    },

    searchall() {
      this.params.size = 10;
      this.params.curren = 1;
      this.params.className = "";
      this.params.teacherName = "";
      this.getZuoyeListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getZuoyeListPage();
  },
};
</script>
