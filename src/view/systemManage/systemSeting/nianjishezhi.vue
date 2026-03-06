<template>
  <div>
    <div>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1.文化课培训更多的是设置年级，比如
            一年级，二年级，初一，初二……，艺术类或成人类培训更多是设置年龄段，根据自己的实际需要进行设置；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>2.当该年级有学员的情况下，该年级数据不允许删除；</span>
        </Col>
      </Alert>
    </div>

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
    <addnianji-form
      v-model="addShow"
      v-on:handleSearch="getAllDataPages"
    ></addnianji-form>
    <updatenianji-form
      v-model="updateShow"
      v-on:handleSearch="getAllDataPages"
      :editdataID="editdataID"
      :stugrade="stugrade"
    ></updatenianji-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import addnianjiForm from "../../../components/systemSetting/addnianjiForm";
import updatenianjiForm from "../../../components/systemSetting/updatenianjiForm";
export default {
  components: {
    inputsearchForm,
    addnianjiForm,
    updatenianjiForm,
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
          title: "年级/年龄段",
          key: "stugradename",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      stuGradeName: "",
      addShow: false,
      updateShow: false,
      editdataID: "",
      checkIDs: [],
      checkAll: false,
      stugrade: "",
    };
  },
  methods: {
    ...mapActions(["getStuGradePage", "deleteStuGrage"]),

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
          });
        }
      });
      // this.delIDs = JSON.stringify(this.checkIDs);
    },

    getAllDataPages() {
      this.checkAll = false;
      let size = this.size;
      let current = this.current;
      let stuGradeName = this.stuGradeName;
      this.getStuGradePage({
        size,
        current,
        stuGradeName,
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
            name: items.stugradename,
          });
        }
      });
      if (this.checkIDs.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkIDs.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.editdataID = this.checkIDs[0].id;
        this.stugrade = this.checkIDs[0].name;
        console.log(this.checkIDs[0]);
        this.updateShow = true;
      }
    },
    del() {
      this.addIDslist();
      if (this.checkIDs.length < 1) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除年级/年龄段信息？</p>",
          onOk: () => {
            let ids = "";
            this.checkIDs.forEach((item, index) => {
              ids += item.id + ",";
            });
            ids = ids.substring(0, ids.length - 1);
            console.log(ids);
            this.deleteStuGrage({ ids: ids }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除年级信息成功");
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
