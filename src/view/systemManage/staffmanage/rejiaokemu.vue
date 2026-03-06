<template>
  <div>
    <Row style="margin-top: 20px">
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
    <teachsubject-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
      :staffID="staffID"
    ></teachsubject-form>
    <updateteachsubject-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :tsbID="tsbID"
    ></updateteachsubject-form>
  </div>
</template>
<script>
import teachsubjectForm from "../../../../src/components/staffinfo/addteachsubjectForm";
import updateteachsubjectForm from "../../../../src/components/staffinfo/updateteachsunjectForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import * as api from "@/api/api.js";
export default {
  components: {
    teachsubjectForm,
    updateteachsubjectForm,
    selectsearchForm,
  },
  data() {
    return {
      headerSearchCampusVisible: false,
      headerSearchSubjectVisible: false,
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
          title: "员工校区",
          key: "staffCampusName",
          align: "center",
        },
        {
          title: "员工姓名",
          key: "staffName",
          align: "center",
        },
        {
          title: "任教科目",
          key: "subjectName",
          align: "center",
          render: (h, params) => {
            if (params.row.subjectName) {
              return h("div", [h("span", params.row.subjectName)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "任教科目",
                  data: this.allSubjectData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allSubjectData.forEach((element) => {
                        if (element.id == value) {
                          this.subjectId = element.id;
                          this.getteachSubjectPages();
                        }
                      });
                    } else {
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "任教校区",
          key: "teachCampusName",
          align: "center",
             renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "任教校区",
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.teachCampusId = element.id;
                          this.getteachSubjectPages();
                        }
                      });
                    } else {
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "说明",
          key: "shuoming",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      staffID: "",
      subjectId: "",
      teachCampusId: "",
      addShow: false,
      updateShow: false,
      tsbID: "",
      allcampusData: [],
      allSubjectData: [],
    };
  },
  methods: {
    search() {
      this.size = 10;
      this.current = 1;
      this.subjectId = "";
      this.teachCampusId = "";
      this.getteachSubjectPages();
    },

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
      api
        .get("/xwcloud-sys/sys/StaffManagement/GetTeacheSubjectPages", {
          size: this.size,
          current: this.current,
          staffID: this.staffID,
          subjectId: this.subjectId,
          teachCampusId: this.teachCampusId,
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

    addteachSubject() {
      this.addShow = true;
    },
    updateteachSubject() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.tsbID = items.id;
        }
      });
      if (this.tsbID == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.updateShow = true;
      }
    },
    deleteTeachsubject() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.tsbID = items.id;
        }
      });
      if (this.tsbID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        api
          .del("/xwcloud-sys/sys/StaffManagement/DeleteTeachSubject", { Id: this.tsbID })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.getteachSubjectPages();
              this.$Message.success("删除教师任教科目信息成功");
            } else {
              this.$Message.error(res.msg);
            }
          });
      }
    },

    getAllSelectList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 531 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            // this.allcampusData = res.obj;
            res.obj.forEach(element=>{
              this.allcampusData.push({
                id:element.id,
                name:element.name
              })
            })
          }
        });
      api.get("/xwcloud-sys/sys/StaffManagement/GetAllSubjectList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          res.obj.forEach((element) => {
            this.allSubjectData.push({
              id: element.id,
              name: element.subjectName,
            });
          });
        }
      });
    },
  },

  mounted() {
    this.staffID = this.$route.query.id;
    console.log(this.staffID);
    this.getAllSelectList();
    this.getteachSubjectPages();
  },
};
</script>
