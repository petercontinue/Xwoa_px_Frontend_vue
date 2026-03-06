<template>
  <div>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getshitingkePages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          highlight-row
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
    <addshitingke-form
      v-model="showAddshiting"
      :type="type"
      :editData="editdata"
    ></addshitingke-form>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import addshitingkeForm from "../../../components/zhaoshengbaoming/shitingke/addshitingkeForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    addshitingkeForm,
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
          title: "试听课标题",
          key: "huodongTitle",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "试听课标题",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.title = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            return h("div", toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd"));
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上课日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.Sshangkedate = value[0];
                    this.Eshangkedate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课时间",
          key: "shangke=time",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.startLessonDateTime + "-" + params.row.endLessonDateTime
              ),
            ]);
          },
        },
        {
          title: "上课教师",
          key: "teacherNames",
          align: "center",
        },

        {
          title: "上课教室",
          key: "classRoomName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上课教室",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.classroomname = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.kechengName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "试听价格",
          key: "shitingprice",
          align: "center",
        },
        {
          title: "报名人数",
          key: "xkNum",
          align: "center",
        },
        {
          title: "浏览次数",
          key: "liulangtime",
          align: "center",
        },

        {
          title: "分享次数",
          key: "fenxiangtime",
          align: "center",
        },
        {
          title: "咨询电话",
          key: "zixunphone",
          align: "center",
        },
      ],
      menuID: "161",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      title: "",
      classroomname: "",
      kechengName: "",
      Sshangkedate: "",
      Eshangkedate: "",
      showAddshiting: false,
      editdata: "",
      deleteID: "",
      checkList: [],
      type: 0,
    };
  },
  methods: {
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

    getshitingkePages() {
      api
        .get("/xwcloud-pkxk/paike/paikexiaoke/GetAllshitingkePages", {
          size: this.size,
          current: this.current,
          title: this.title,
          classroomname: this.classroomname,
          kechengName: this.kechengName,
          Sshangkedate: this.Sshangkedate,
          Eshangkedate: this.Eshangkedate,
        })
        .then((res) => {
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
    TableSearch() {
      this.getshitingkePages();
    },
    changePage(current) {
      this.current = current;
      this.getshitingkePages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getshitingkePages();
    },

    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "addinfo") {
        this.type = 1;
        this.showAddshiting = true;
      } else if (onclicks == "edit") {
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要编辑的数据");
        } else {
          this.type = 2;
          this.editdata = JSON.stringify(this.checkList);
          this.showAddshiting = true;
        }
      } else if (onclicks == "del()") {
        if (this.checkList.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.deleteID = this.checkList.id;
          this.$Modal.confirm({
            title: "删除试听课程信息",
            content: "<p>确定要删除该试听课程信息吗</p>",
            loading: true,
            onOk: () => {
              api
                .del("/xwcloud-pkxk/paike/paikexiaoke/deletShitingke", {
                  id: this.deleteID,
                })
                .then((res) => {
                  if (res.success) {
                    this.$Message.success(res.msg);
                    this.getshitingkePages();
                  } else {
                    this.$Message.error(res.msg);
                  }
                  this.$Modal.remove();
                });
            },
            onCancel: () => {},
          });
        }
      } else if (onclicks == "lookbmstu()") {
        this.Onlookbmstu();
      }
    },

    Onlookbmstu() {
      this.$Modal.confirm({
        width: 30,
        closable: true,
        render: (h) => {
          return h("div", [
            h("Row", [h("Col", { props: { span: 20 } }, [h("p", "查看报名学员")])]),
            [
              h("Divider", {
                style: { margin: "10px 0px 20px 0px" },
              }),
            ],
            h("Row", [
              h(
                "Col",
                {
                  props: {
                    span: 24,
                  },
                },
                [
                  h(
                    "p",
                    {
                      style: { margin: "10px" },
                    },
                    this.checkList.xkstuName
                  ),
                ]
              ),
            ]),
          ]);
        },
        onOk: () => {},
        onCancel: () => {},
      });
    },
  },

  mounted() {
    this.getshitingkePages();
  },
};
</script>
