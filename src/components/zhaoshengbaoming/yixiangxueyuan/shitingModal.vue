<template>
  <Modal
    v-model="isShow"
    title="试听"
    :footer-hide="true"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Row style="margin-top: 10px">
      <Col span="24">
        <Button type="info" @click="chaban()">插班试听</Button>
        <Button type="success" @click="shiting1v1()">一对一试听</Button>
        <Button type="warning" @click="shitingMYD()">试听满意度</Button>
        <Button type="primary" @click="editshiting()">修改</Button>
        <Button type="error" @click="delshiting()">删除</Button>
      </Col>
    </Row>

    <Table
      ref="shitingTable"
      :columns="tableColumn"
      :data="tableList"
      @on-row-click="onClickRow"
      highlight-row
    ></Table>
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

    <addchaban
      v-model="cbshow"
      :editcbdata="editcbdata"
      :campusID="campusID"
      :payMoneyStyleList="payMoneyStyleList"
      :stuID="stuID"
      v-on:handleSearch="getShitingList"
    ></addchaban>
    <OneByOnechaban
      v-model="OTOcbshow"
      :editOTOcbdata="editOTOcbdata"
      :campusID="campusID"
      :payMoneyStyleList="payMoneyStyleList"
      :stuID="stuID"
      v-on:handleSearch="getShitingList"
    ></OneByOnechaban>
    <shitingMYD
      v-model="mydshow"
      :mydid="mydid"
      v-on:handleSearch="getShitingList"
    ></shitingMYD>
  </Modal>
</template>

<script>
import toolbox from "@/libs/toolbox";
import addchaban from "@/components/zhaoshengbaoming/yixiangxueyuan/addchaban";
import OneByOnechaban from "@/components/zhaoshengbaoming/yixiangxueyuan/OneByOnechaban";
import shitingMYD from "@/components/zhaoshengbaoming/yixiangxueyuan/shitingMYD";
import * as api from "@/api/api.js";

export default {
  name: "shitingModal",
  props: {
    value: { default: false, type: Boolean },
    stuID: { default: "", type: String },
    campusID: { default: "", type: String },
    payMoneyStyleList: { default: [], type: Array },
  },
  components: {
    addchaban,
    OneByOnechaban,
    shitingMYD,
  },
  data() {
    return {
      isShow: this.value,
      total: 0,
      tableColumn: [
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
          title: "姓名",
          align: "center",
          key: "stuName",
        },
        {
          title: "试听方式",
          align: "center",
          key: "chabanOr1v1",
          render: (h, params) => {
            let state = "";
            switch (params.row.chabanOr1v1) {
              case 1:
                state = "插班试听";
                break;
              case 2:
                state = "一对一试听";
                break;

              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "试听日期",
          align: "center",
          key: "haveClassDate",
        },
        {
          title: "上下课时间",
          align: "center",
          key: "haveLessTime",
        },
        {
          title: "试听老师",
          align: "center",
          key: "stTeachers",
        },
        {
          title: "试听满意度",
          align: "center",
          key: "shiTingManyiduID",
          render(h, { row }) {
            let returnStr = "";
            switch (row.shiTingManyiduID) {
              case "1":
                returnStr = "不明确";
                break;
              case "2":
                returnStr = "很不满意";
                break;
              case "3":
                returnStr = "不满意";
                break;
              case "4":
                returnStr = "基本满意";
                break;
              case "5":
                returnStr = "很满意";
                break;
            }
            return h("div", returnStr);
          },
        },
        {
          title: "满意度说明",
          align: "center",
          key: "shiTingShuoming",
        },
      ],
      tableList: [],
      searchData: {
        size: 10,
        current: 1,
        stuID: null,
      },

      cbshow: false,
      OTOcbshow: false,
      mydshow: false,
      editcbdata: "",
      editOTOcbdata: "",
      mydid: "",

      chabanForm: {
        id: null,
        stuID: null,
        classID: null,
        paikeID: null,
        isKechengStuNum: true,
        shitingPrice: null,
        payMoneyStyle: null,
      },
      oneToOneForm: {
        id: null,
        stuID: null,
        kechengID: null,
        staffID: null,
        classRoomID: null,
        haveClassDate: null,
        haveClassTime: null,
        ctjcSwitch: true,
        isKechengStuNum: true,
        shitingPrice: null,
        payMoneyStyle: null,
      },
      manyiduForm: {
        id: null,
        shiTingManyiduID: null,
        shiTingShuoming: null,
      },
      paikeList: [],
      classList: [],
      kechengList: [],
      staffList: [{ id: "", staffName: "请先选择课程", disable: true }],
      classRoomList: [],
      chabanLoading: false,
      oneToOneLoading: false,
      collapseValue: "",
      selection: [],
      manyiduLoading: false,
    };
  },
  computed: {
    paikeListComputed() {
      return this.paikeList.map((val) => {
        let value =
          val.haveClassDate +
          " " +
          val.startLessonDateTime +
          ":" +
          val.endLessonDateTime +
          " " +
          val.teacherNames;
        return { id: val.id, value: value };
      });
    },
  },
  methods: {

    onClickRow(row, index) {
      this.selection = [];
      if (this.$refs.shitingTable.data[index]._checked == true) {
        this.$refs.shitingTable.data[index]._checked =
          !this.$refs.shitingTable.data[index]._checked;
      } else {
        this.tableList.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.shitingTable.data[index]._checked =
          !this.$refs.shitingTable.data[index]._checked;
        this.selection = this.$refs.shitingTable.data[index];
      }
    },

    changePage(current) {
      this.searchData.current = current;
      this.getShitingList();
    },
    changePageSize(pageSize) {
      this.searchData.size = pageSize;
      this.getShitingList();
    },
    getShitingList() {
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getYxStuShitingRecords",this.searchData).then((res) => {
        this.tableList = res.obj.records;
        this.total = Number(res.obj.total);

        this.tableList.forEach((items) => {
          //取消所有对象的勾选，_checked设置为false
          this.$set(items, "_checked", false);
        });
      });
    },

    chaban() {
      this.editcbdata = "";
      this.editOTOcbdata = "";
      this.cbshow = true;
    },
    shiting1v1() {
      this.editcbdata = "";
      this.editOTOcbdata = "";
      this.OTOcbshow = true;
    },
    shitingMYD() {
      this.mydid = "";
      if (this.selection.length == 0) {
        this.$Message.error("请选择一行");
        return;
      } else {
        this.mydid = this.selection.id;
        this.mydshow = true;
      }
    },
    editshiting() {
      this.editcbdata = "";
      this.editOTOcbdata = "";
      if (this.selection.length == 0) {
        this.$Message.error("请选择一行");
        return;
      } else {
        if (this.selection.chabanOr1v1 == 1) {
          //插班试听
          this.cbshow = true;
          this.editcbdata = JSON.stringify(this.selection);
        } else {
          //一对一试听
          this.OTOcbshow = true;
          this.editOTOcbdata = JSON.stringify(this.selection);
        }
      }
    },
    delshiting() {
      if (this.selection.length == 0) {
        this.$Message.error("请选择一行");
        return;
      } else {
        let rid = this.selection.id;
        api.del("xwcloud-zsbm/yxstu/YixiangStu/deleteShitingRecords",{ stID: rid }).then((res) => {
          if (res.success) {
            this.$Message.success("操作成功");
            this.getShitingList();
          } else {
            this.$Message.error("操作失败");
          }
        });
      }
    },
    closeModal(val) {
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.manyiduForm.id = null;
        this.chabanForm.id = null;
        this.oneToOneForm.id = null;
        // 收起collapse
        this.collapseValue = "";
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    stuID(val) {
      if (val) {
        this.searchData.stuID = val;
        this.chabanForm.stuID = val;
        this.oneToOneForm.stuID = val;
        this.getShitingList();
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>
