<template>
  <div>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addteachSubject">添加</Button>
        <Button type="success" size="large" @click="updateteachSubject">修改</Button>
        <Button type="warning" size="large" @click="deleteTeachsubject">删除</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          highlight-row
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
    <addzstujing-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
    ></addzstujing-form>
    <updatezstujing-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :editData="editData"
    ></updatezstujing-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addzstujingForm from "../../../../components/systemSetting/stusetting/addzstujingForm";
import updatezstujingForm from "../../../../components/systemSetting/stusetting/updatezstujingForm";
export default {
  components: {
    addzstujingForm,
    updatezstujingForm,
  },
  data() {
    return {
      columns: [
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
          title: "学员招生途径",
          key: "telFromName",
          align: "center",
        },
        {
          title: "备注",
          key: "beizhu",
          align: "center",
          render: (h, params) => {
            if (params.row.beizhu) {
              return h("div", [h("span", params.row.beizhu)]);
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
      buxiStyleName: "",
      addShow: false,
      updateShow: false,
      editdataID: "",
      editData: "",
      qiyeID: "",
      buxiStyleNameA: "",
      checkList: [],
    };
  },
  methods: {
    ...mapActions(["GetPagesyxtelfromPages", "Deleteyxtelfrom"]),

    onClickRow(row, index) {
      this.checkList = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.checkList = this.$refs.selection.data[index];
      }
    },

    getteachSubjectPages() {
      let size = this.size;
      let current = this.current;
      this.GetPagesyxtelfromPages({
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
      this.getteachSubjectPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getteachSubjectPages();
    },
    onSearch(search) {
      window.console.log(search);
    },
    addteachSubject() {
      this.addShow = true;
    },
    updateteachSubject() {
      this.editData = "";

      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editData = JSON.stringify(this.checkList);
        this.updateShow = true;
      }
    },
    deleteTeachsubject() {
      this.editdataID = "";
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除来源途径？</p>",
          onOk: () => {
            this.editdataID = this.checkList.id;
            this.Deleteyxtelfrom({ Id: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除来源途径成功");
                this.getteachSubjectPages();
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
    this.getteachSubjectPages();
  },
};
</script>
