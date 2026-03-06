<template>
  <div>
    <Row style="margin-top: 10px">
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
    <addkemu-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
    ></addkemu-form>
    <updatekemu-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :editdata="editdata"
    ></updatekemu-form>
  </div>
</template>
<script>
import addkemuForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addkemuForm";
import updatekemuForm from "../../../components/zhaoshengbaoming/baomingjiaofei/updatekemuForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    addkemuForm,
    updatekemuForm,
    selectsearchForm,
    inputsearchForm,
  },
  data() {
    return {
      columns: [
        {
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
          title: "校区",
          key: "campusName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "校区",
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.campusID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "科目",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.kemu = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: "",
      kemu: "",
      addShow: false,
      updateShow: false,
      editdataID: "",
      editdata: "",
      checkAll: false,
      allcampusData: [],
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: "146" }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    TableSearch() {
      this.getteachSubjectPages();
    },
    search() {
      this.size = 10;
      this.current = 1;
      this.kemu = "";
      this.campusID = "";
      this.getteachSubjectPages();
    },
    getteachSubjectPages() {
      let size = this.size;
      let current = this.current;
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllSubjectPages",{
        size,
        current,
        campusID: this.campusID,
        kemu: this.kemu,
        menuID: 146,
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
    addteachSubject() {
      this.addShow = true;
    },
    updateteachSubject() {
      this.editdata = "";
      let i = 0;
      this.data.forEach((items) => {
        if (items._checked) {
          this.editdata = JSON.stringify(items);
          i += 1;
        }
      });
      if (i == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (i > 1) {
        this.$Message.error("只能选择一行！！！");
      } else {
        this.updateShow = true;
      }
    },
    deleteTeachsubject() {
      this.editdataID = "";
      console.log(this.data);
      this.data.forEach((items) => {
        if (items._checked) {
          this.editdataID += items.id + ",";
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除该数据？</p>",
          onOk: () => {
            console.log(this.editdataID);
            api.del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteSubjectbyId",{ Id: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.size = 10;
                this.current = 1;
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
    // this.staffID = this.$route.query.id;
    this.getteachSubjectPages();
    this.getAllCampusList();
  },
};
</script>
