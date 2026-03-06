<template>
  <div>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addteachSubject">批量添加</Button>
        <Button type="info" size="large" @click="addonekechengcontent">添加一次</Button>
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
        show-total
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <pladdkechengcontent-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
      :kechengID="kechengID"
    ></pladdkechengcontent-form>
    <addonecontent-form
      v-model="addoneShow"
      v-on:handleSearch="getteachSubjectPages"
      :kechengID="kechengID"
    >
    </addonecontent-form>
    <updatekccontent-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :editdata="editdata"
    ></updatekccontent-form>
  </div>
</template>
<script>
import pladdkechengcontentForm from "../../../components/zhaoshengbaoming/baomingjiaofei/pladdkechengcontentForm";
import addonecontentForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addonecontentForm";
import updatekccontentForm from "../../../components/zhaoshengbaoming/baomingjiaofei/updatekccontentForm";
import * as api from "@/api/api.js";

export default {
  components: {
    pladdkechengcontentForm,
    addonecontentForm,
    updatekccontentForm,
  },
  data() {
    return {
      columns: [
        {
          // type: "selection",
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
          title: "培训课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "计费方式",
          key: "jifeiStyleID",
          align: "center",
          render: (h, params) => {
            if (params.row.jifeiStyleID == 1) {
              return h("div", [h("span", "按课时计费")]);
            } else if (params.row.jifeiStyleID == 2) {
              return h("label", "按课时包计费");
            } else if (params.row.jifeiStyleID == 3) {
              return h("label", "按起止日期计费");
            } else {
              return h("div", [h("span", "冻结")]);
            }
          },
        },
        {
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
        },
        {
          title: "课程时长",
          key: "classTimeStyleName",
          align: "center",
          render: (h, params) => {
            if (params.row.classTimeStyleName == "-1") {
              return h("div", [h("span", "一次")]);
            } else if (params.row.classTimeStyleName == "-2") {
              return h("div", [h("span", "一天")]);
            } else {
              return h("div", [h("span", params.row.classTimeStyleName + "分钟")]);
            }
          },
        },
        {
          title: "课程内容排序",
          key: "contentPaixu",
          align: "center",
        },
        {
          title: "课程内容",
          key: "kechengContent",
          align: "center",
          width: 400,
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      addShow: false,
      addoneShow: false,
      updateShow: false,
      editdataID: "",
      editdata: "",
      kechengID: "",
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.data.forEach((items) => {
        //取消所有对象的勾选，checkBox设置为false
        this.$set(items, "checkBox", false);
      });
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
    },
    getteachSubjectPages() {
      let size = this.size;
      let current = this.current;
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllKechengContent", {
          size,
          current,
          kechengID: this.kechengID,
        })
        .then((res) => {
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
    addonekechengcontent() {
      this.addoneShow = true;
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
            api
              .del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteKechengContent", {
                Id: this.editdataID,
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
    this.kechengID = this.$route.query.id;
    this.getteachSubjectPages();
  },
};
</script>
