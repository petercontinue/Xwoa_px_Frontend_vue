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
          highlight-row
          @on-row-click="onClickRow"
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
    <addshoufeibiaochun-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
    ></addshoufeibiaochun-form>
    <updateshoufeibz-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :editID="editdataID"
    ></updateshoufeibz-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addshoufeibiaochunForm from "../../../../components/systemSetting/caiwushezhi/addshoufeibiaochunForm";
import updateshoufeibzForm from "../../../../components/systemSetting/caiwushezhi/updateshoufeibzForm";
// import updatebuxistyleForm from "../../../components/systemSetting/updatebuxistyleForm"
export default {
  components: {
    addshoufeibiaochunForm,
    updateshoufeibzForm,
    //   updatebuxistyleForm
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
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
        },
        {
          title: "学生年级（年龄段）",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "最低课时费(单位：元/课时)",
          key: "minimumCharge",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      addShow: false,
      updateShow: false,
      editdataID: "",
      buxiStyleName: "",
      stuGradeName: "",
      checkList: [],
    };
  },
  methods: {
    ...mapActions(["GetAllShoufeibiaozhunPages", "deleteShoufeibiaozhun"]),

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
      this.GetAllShoufeibiaozhunPages({
        buxiStyleName: this.buxiStyleName,
        stuGradeName: this.stuGradeName,
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
      this.editdataID = "";

      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editdataID = this.checkList.id;
        this.updateShow = true;
      }
    },
    deleteTeachsubject() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.editdataID = this.checkList.id;
        this.deleteShoufeibiaozhun({ Id: this.editdataID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success("删除最低收费标准成功");
            this.getteachSubjectPages();
          } else {
            this.$Message.error(res.msg);
          }
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
