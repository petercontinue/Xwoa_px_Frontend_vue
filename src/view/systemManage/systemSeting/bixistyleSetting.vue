<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1.【一对一】的培训方式是不允许修改和删除的，其他培训方式均可自定义；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2.培训方式下如果有培训课程，是不允许删除的；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>3.培训方式一般是指一对一、一对二、一对N、精品小班、大班……，也有的机构叫班型；</span>
        </Col>
      </Alert>
    </Row>
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
    <addbuxistyle-form
      v-model="addShow"
      v-on:handleSearch="getAllDataPages"
    ></addbuxistyle-form>
    <updatebuxistyle-form
      v-model="updateShow"
      v-on:handleSearch="getAllDataPages"
      :editdataID="editdataID"
      :buxiStyleName="buxiStyleNameA"
      :qiyeID="qiyeID"
    ></updatebuxistyle-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import addbuxistyleForm from "../../../components/systemSetting/addbuxistyleForm";
import updatebuxistyleForm from "../../../components/systemSetting/updatebuxistyleForm";
export default {
  components: {
    inputsearchForm,
    addbuxistyleForm,
    updatebuxistyleForm,
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
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
        },
        {
          title: "说明",
          key: "shuoming",
          align: "center",
          render: (h, params) => {
            let beizhu = "";
            if (params.row.buxiStyleName == "一对一") {
              beizhu = "【一对一】培训方式不允许修改和删除！";
            }
            return h("div", [h("span", beizhu)]);
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
      checkIDs: [],
      checkAll: false,

      qiyeID: "",
      buxiStyleNameA: "",
    };
  },
  methods: {
    ...mapActions(["getAllbuxistylePage", "deletebuxistyle"]),

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
      this.data.forEach((items) => {
        if (items._checked == true) {
          //this.editData = JSON.stringify(items);
          this.checkIDs.push({
            id: items.id,
            name: items.buxiStyleName,
            qiyeID: items.qiyeID
          });
        }
      });
      // this.delIDs = JSON.stringify(this.checkIDs);
    },

    getAllDataPages() {
      this.checkAll = false;
      let size = this.size;
      let current = this.current;
      let buxiStyleName = this.buxiStyleName;
      this.getAllbuxistylePage({
        size,
        current,
        buxiStyleName,
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

    add() {
      this.editdataID = "";
      this.addShow = true;
    },
    edit() {
      this.addIDslist();
      if (this.checkIDs.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkIDs.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.checkIDs.forEach((item, index) => {
          if (item.name == "一对一") {
            this.$Message.error("【一对一】的培训方式不允许修改！");
            return;
          }
        });

        this.editdataID = this.checkIDs[0].id;
        this.buxiStyleNameA = this.checkIDs[0].name;
        this.qiyeID = this.checkIDs[0].qiyeID;
        this.updateShow = true;
      }
      // this.data.forEach((items) => {
      //   if (items.checkBox) {
      //     this.editdataID = items.id;
      //     this.qiyeID = items.qiyeID;
      //     this.buxiStyleNameA = items.buxiStyleName;
      //   }
      // });
      // if (this.editdataID == "") {
      //   this.$Message.error("请选择要修改的数据");
      // } else {
      //   this.updateShow = true;
      // }
    },
    del() {
      this.addIDslist();
      let ids = "";
      let isDel1v1 = false;
      this.checkIDs.forEach((item, index) => {
        ids += item.id + ",";
        if (item.name == "一对一") {
          isDel1v1 = true;
        }
      });
      
      if (this.checkIDs.length < 1) {
        this.$Message.error("请选择要删除的数据");
        return;
      } 
      if(isDel1v1 == true){
        this.$Message.error("【一对一】的培训方式不允许删除！");
        return;
      }else {
        ids = ids.substring(0, ids.length - 1);
        console.log(ids);
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除补习方式信息？</p>",
          onOk: () => {
            this.deletebuxistyle({ ids: ids }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除补习方式成功");
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
