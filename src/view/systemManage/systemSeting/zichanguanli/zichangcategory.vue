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
    <addcategory-form
      v-model="addShow"
      v-on:handleSearch="getzichangcategoryPages"
    ></addcategory-form>
    <updatecategory-form
      v-model="updateShow"
      v-on:handleSearch="getzichangcategoryPages"
      :editData="editData"
    ></updatecategory-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addcategoryForm from "../../../../components/systemSetting/zichangguanli/addcategoryForm";
import updatecategoryForm from "../../../../components/systemSetting/zichangguanli/updatecategoryForm";
export default {
  components: {
    addcategoryForm,
    updatecategoryForm,
  },
  data() {
    return {
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
          title: "分类名称",
          key: "assetsName",
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
      editData: "",
    };
  },
  methods: {
    ...mapActions(["getAllAssetStyle", "deleteAssetStyle"]),
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.data.forEach((items) => {
        //取消所有对象的勾选，checkBox设置为false
        this.$set(items, "checkBox", false);
      });
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[
        index
      ].checkBox;
    },

    getzichangcategoryPages() {
      this.getAllAssetStyle({
        size: this.size,
        current: this.current,
      }).then((res) => {
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
      this.getzichangcategoryPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getzichangcategoryPages();
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
          this.editdataID = items.id + "";
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除该数据？</p>",
          onOk: () => {
            this.deleteAssetStyle({ Id: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getzichangcategoryPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getzichangcategoryPages();
  },
};
</script>
