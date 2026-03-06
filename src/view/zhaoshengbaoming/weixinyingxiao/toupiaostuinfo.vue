<template>
  <div>
    <Row>
      <Col span="24">
        <Button type="success" size="large" @click="AddcansaiStuInfo">添加学员</Button>
        <Button type="warning" size="large" @click="updateCansaistu">修改学员</Button>
        <Button type="error" size="large" @click="deletecansaiStu">删除学员</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border @on-search="onSearch" ref="selection" :columns="columns" :data="data"></Table>
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
    <addcansaistu-form
      v-model="showAddstu"
      :editData="editData"
      v-on:handleSearch="getteachSubjectPages"
    ></addcansaistu-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import addcansaistuForm from "../../../components/zhaoshengbaoming/weixinyingxiao/addcansaistuForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    addcansaistuForm,
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
          title: "学员图片",
          key: "logo",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: "width: 40px;height: 40px;",
                },
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  attrs: {
                    src: params.row.logo,
                    style: "width: 40px;height: 40px;border-radius: 2px;",
                  },
                  style: {},
                }),
              ]
            );
          },
        },
        {
          title: "学员姓名",
          key: "stuname",
          align: "center",
        },
        {
          title: "学员编号",
          key: "bianhao",
          align: "center",
        },
        {
          title: "初始票数",
          key: "piaoshu",
          align: "center",
        },
        {
          title: "学员简介",
          key: "introduction",
          align: "center",
        },
      ],
      menuID: "113",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      huodongName: "",
      toupiaoStyle: 0,
      isUp: 0,
      staffName: "",
      showAddstu: false,
      editdataID: "",
      editData: "",
    };
  },
  methods: {
    getteachSubjectPages() {
      api.get("/xwcloud-wsc/wsc/whdToupiao/getWhdToupiaoCansaiStuPage",{
        size: this.size,
        current: this.current,
        huodongID: this.$route.query.huodongID,
        type: 0,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
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
    onSearch(search) {},
    clickShijian(onclicks) {},
    AddcansaiStuInfo() {
      this.editData = "";
      this.showAddstu = true;
    },
    updateCansaistu() {
      this.editData = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editData = JSON.stringify(items);
        }
      });
      if (this.editData == "") {
        this.$Message.error("请选择要编辑的数据");
      } else {
        this.showAddstu = true;
      }
    },
    deletecansaiStu() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID += items.id + ",";
        }
      });
      this.editdataID = this.editdataID.substring(
        0,
        this.editdataID.length - 1
      );
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除该参赛学员信息？</p>",
          onOk: () => {
            let ids = this.editdataID;
            console.log(ids);
            api.del("/xwcloud-wsc/wsc/whdToupiao/deleteWhdToupiaoCansaiStuByIDs/"+ids,{}).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.$Message.success("删除信息成功");
              } else {
                this.$Message.error(result.msg);
              }
              this.getteachSubjectPages();
            });
          },
          onCancel: () => {},
        });
      }
    },
  },

  mounted() {
    console.log(this.$route.query.huodongID);
    this.getteachSubjectPages();
  },
};
</script>