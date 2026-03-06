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
    <addkaoshileibie-form
      v-model="addShow"
      :editdata="editdata"
      v-on:handleSearch="getteachSubjectPages"
    ></addkaoshileibie-form>
    <!--   <updatebuxistyle-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :editdataID="editdataID"
      :buxiStyleName="buxiStyleNameA"
      :qiyeID="qiyeID"
    ></updatebuxistyle-form> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addkaoshileibieForm from "../../../../components/systemSetting/jiaowusetting/addkaoshileibieForm";
// import addbuxistyleForm from "../../../components/systemSetting/addbuxistyleForm"
// import updatebuxistyleForm from "../../../components/systemSetting/updatebuxistyleForm"
export default {
  components: {
    addkaoshileibieForm,
    //   addbuxistyleForm,
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
          title: "考试类别",
          key: "testType",
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
      checkList: [],
      editdata: "",
    };
  },
  methods: {
    ...mapActions(["getKaoshiLeibie", "DeleteKaoshileibie"]),

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
      this.getKaoshiLeibie({
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
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editdata = JSON.stringify(this.checkList);
        this.addShow = true;
      }
    },
    deleteTeachsubject() {
      console.log(this.checkList);
      this.editdataID = "";
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.editdataID = this.checkList.id;
        this.DeleteKaoshileibie({ Id: this.editdataID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success("删除考试类别成功");
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
