<template>
  <div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

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
    <addshouzhistyle-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
    ></addshouzhistyle-form>
    <updateshouzhistyle-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :editID="editdataID"
    ></updateshouzhistyle-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import addshouzhistyleForm from "../../../../components/systemSetting/caiwushezhi/addshouzhistyleForm";
import updateshouzhistyleForm from "../../../../components/systemSetting/caiwushezhi/updateshouzhistyleForm";
// import updatebuxistyleForm from "../../../components/systemSetting/updatebuxistyleForm"
export default {
  components: {
    addshouzhistyleForm,
    updateshouzhistyleForm,
    inputsearchForm,
    selectsearchForm,
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
          title: "财务流水项目名称",
          key: "shouzhiStyle",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "财务流水项目名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.leibie = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "类型",
          key: "isshouOrzhichu",
          align: "center",
          render: (h, params) => {
            if (params.row.isshouOrzhichu == "1") {
              return h("div", [h("span", "收入")]);
            } else {
              return h("div", [h("span", "支出")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "类型",
                  width: 100,
                  data: this.alltype,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value) {
                      console.log(value);
                      this.alltype.forEach((element) => {
                        if (element.id == value) {
                          this.type = Number(element.id);
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.type = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "备注",
          key: "beizhu",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      addShow: false,
      type: -1,
      leibie: "",
      updateShow: false,
      editdataID: "",
      checkList: [],
      alltype: [
        { id: 1, name: "收入" },
        { id: 2, name: "支出" },
        { id: 3, name: "课程到期自动清零的课耗收入" },
      ],
    };
  },
  methods: {
    ...mapActions(["getAllShouzhistylePages", "deleteShouzhistyle"]),

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
      let type = this.type;
      let leibie = this.leibie;
      this.getAllShouzhistylePages({
        size,
        current,
        type,
        leibie,
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

    search() {
      this.size = 10;
      this.current = 1;
      this.type = -1;
      this.leibie = "";
      this.getteachSubjectPages();
    },

    TableSearch() {
      this.getteachSubjectPages();
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
      if (this.checkList.length == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        if (this.checkList.beizhu == "不允许修改和删除") {
          this.$Message.error("不允许修改和删除的类别！");
        } else {
          this.editdataID = this.checkList.id;
          this.deleteShouzhistyle({ Id: this.editdataID }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("删除收支方式成功");
              this.getteachSubjectPages();
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      }
    },
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getteachSubjectPages();
  },
};
</script>
