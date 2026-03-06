<template>
  <div>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addteachSubject">添加</Button>
        <Button type="success" size="large" @click="updateteachSubject"
          >修改</Button
        >
        <Button type="warning" size="large" @click="deleteTeachsubject"
          >删除</Button
        >
      </Col>
    </Row>
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
    <addshoufeistyle-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
    ></addshoufeistyle-form>
    <updateshoufeistyle-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :editData="editData"
    ></updateshoufeistyle-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addshoufeistyleForm from "../../../../components/systemSetting/caiwushezhi/addshoufeistyleForm";
import updateshoufeistyleForm from "../../../../components/systemSetting/caiwushezhi/updateshoufeistyleForm";
// import updatebuxistyleForm from "../../../components/systemSetting/updatebuxistyleForm"
export default {
  components: {
    addshoufeistyleForm,
    updateshoufeistyleForm,
    //   updatebuxistyleForm
  },
  data() {
    return {
      columns: [
        {
          // type: "selection",
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width:"100",
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
          title: "收费方式",
          key: "moneystyleName",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      addShow: false,
      updateShow: false,
      editData: "",
      editdataID:"",
    };
  },
  methods: {
    ...mapActions(["getAllPaymoneyStylePages", "deletePayMoneyStyle"]),
    getteachSubjectPages() {
      let size = this.size;
      let current = this.current;
      this.getAllPaymoneyStylePages({
        size,
        current,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total =Number(res.obj.total);
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
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editData = JSON.stringify(items);
        }
      });
      if (this.editData == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.updateShow = true;
      }
    },
    deleteTeachsubject() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.deletePayMoneyStyle({ Id: this.editdataID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success("删除收费方式成功");
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
