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
    <goodscategory-form
      v-model="addShow"
      :editdata="editdata"
      v-on:handleSearch="getteachSubjectPages"
    ></goodscategory-form>
  </div>
</template>
<script>
import goodscategoryForm from "@/components/zhaoshengbaoming/wxmall/goodscategoryForm.vue";
import * as api from "@/api/api.js";
export default {
  components: {
    goodscategoryForm,
  },
  data() {
    return {
      columns: [
        {
          // type: "selection",
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width: 100,
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
          title: "ID",
          key: "id",
          align: "center",
        },
        {
          title: "商品分类名称",
          key: "goodstype",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      addShow: false,
      editdataID: "",
      editdata: "",
    };
  },
  methods: {
    getteachSubjectPages() {
      api
        .get("/xwcloud-wsc/wsc/wsc/getWscGoodsTypePage", {
          size: this.size,
          current: this.current,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
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
      this.editdata = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdata = JSON.stringify(items);
        }
      });
      if (this.editdata == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.addShow = true;
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
            api
              .del("/xwcloud-wsc/wsc/wsc/deleteWscGoodsTypeByIDs", {
                id: this.editdataID,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getteachSubjectPages();
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
    this.getteachSubjectPages();
  },
};
</script>
