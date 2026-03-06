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
            >1.课程时长是指一个课时多少分钟；这个数据非常重要，它直接关系到课程在消课的时候系统要扣减学员多少课时；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2.课程时长和消课课时的关系，举例：课程时长60分钟，如果排课30分钟，那么消课时扣减0.5个课时；如果排课60分钟，那么消课时扣减1个课时；如果排课90分钟，那么消课时扣减1.5个课时；依此类推；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >3.课程时长1次是指上一次课，不管排课的开始时间和结束时间，都是扣1个课时（课次）；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>4.课程时长1天是专门针对按起止日期计费课程的，1次课系统里计为1天；</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="add()">添加</Button>
        <Button type="success" size="large" @click="edit()">修改</Button>
        <Button type="warning" size="large" @click="del()">删除</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          highlight-row
          ref="selection"
          @on-row-click="onClickRow"
          :columns="columns"
          :data="data"
        ></Table>
      </Col>
    </Row>
    <Row style="margin-top: 15px">
      <Page
        :total="total"
        show-elevator
        show-sizer
        show-total
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addkechengshichang-form
      v-model="addShow"
      v-on:handleSearch="getAllDataPages"
    ></addkechengshichang-form>
    <updateshichang-form
      v-model="updateShow"
      v-on:handleSearch="getAllDataPages"
      :editdataID="editdataID"
      :kechengshichang="kechengshichang"
    ></updateshichang-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import addkechengshichangForm from "../../../components/systemSetting/addkechengshichangForm";
import updateshichangForm from "../../../components/systemSetting/updateshichangForm";
export default {
  components: {
    inputsearchForm,
    addkechengshichangForm,
    updateshichangForm,
  },
  data() {
    return {
      columns: [
        {
          //全选
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
          title: "课程时长（分钟/课时）",
          key: "classtimestylename",
          align: "center",
          render: (h, params) => {
            if (params.row.classtimestylename == "-1") {
              return h("div", [h("span", "1次")]);
            } else if (params.row.classtimestylename == "-2") {
              return h("div", [h("span", "1天")]);
            } else {
              return h("div", [h("span", params.row.classtimestylename + "分钟/课时")]);
            }
          },
        },
        {
          title: "说明",
          key: "shuoming",
          align: "center",
          render: (h, params) => {
            if (params.row.classtimestylename == "-1") {
              return h("div", [h("span", "课次课程专用，不允许修改和删除")]);
            } else if (params.row.classtimestylename == "-2") {
              return h("div", [h("span", "按起止日期课程专用，不允许修改和删除")]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      addShow: false,
      updateShow: false,
      editdataID: "",
      checkIDs: [],
      checkAll: false,
      kechengshichang: "",
    };
  },
  methods: {
    ...mapActions(["getALlclasstimestyle", "deleteClasstimeStyle"]),

    //鼠标单击一行选中
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    /**选中的学员添加进列表，方便进行处理 */
    addIDslist() {
      this.checkIDs = [];
      //this.delIDs="";
      // console.log("=====2:");
      // console.log(this.data);
      this.data.forEach((items) => {
        if (items._checked == true) {
          //this.editData = JSON.stringify(items);
          this.checkIDs.push({
            id: items.id,
            name: items.classTimeStyleName,
          });
        }
      });
      // this.delIDs = JSON.stringify(this.checkIDs);
    },

    getAllDataPages() {
      this.checkAll = false;
      let size = this.size;
      let current = this.current;
      this.getALlclasstimestyle({
        size,
        current,
      }).then((res) => {
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
      this.getAllDataPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getAllDataPages();
    },
    onSearch(search) {
      window.console.log(search);
    },
    add() {
      this.editdataID = "";
      this.addShow = true;
    },
    edit() {
      this.checkIDs = [];

      this.data.forEach((items) => {
        if (items._checked == true) {
          //this.editData = JSON.stringify(items);
          this.checkIDs.push({
            id: items.id,
            name: items.classtimestylename,
          });
        }
      });
      console.log(this.checkIDs);
      if (this.checkIDs.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkIDs.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        if (this.checkIDs[0].name == "-1" || this.checkIDs[0].name == "-2") {
          this.$Message.error("【1次和1天】这两种课程时长不允许修改！");
          return;
        } else {
          this.editdataID = this.checkIDs[0].id;
          this.kechengshichang = this.checkIDs[0].name;
          this.updateShow = true;
        }
      }
    },
    del() {
      this.addIDslist();
      let ids = "";
      let isDel1v1 = false;
      this.checkIDs.forEach((item, index) => {
        ids += item.id + ",";
        if (item.name == "-1" || item.name == "-2") {
          isDel1v1 = true;
        }
      });

      if (this.checkIDs.length < 1) {
        this.$Message.error("请选择要删除的数据");
        return;
      }
      if (isDel1v1 == true) {
        this.$Message.error("【1次和1天】这两种课程时长不允许删除！");
        return;
      } else {
        ids = ids.substring(0, ids.length - 1);
        console.log(ids);
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除课程时长信息？</p>",
          onOk: () => {
            this.deleteClasstimeStyle({ ids: ids }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getAllDataPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getAllDataPages();
  },
};
</script>
