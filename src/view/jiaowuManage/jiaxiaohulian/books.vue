<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchall()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          highlight-row
          :columns="columns6"
          :data="data"
        ></Table>
      </Col>
    </Row>
    <Row style="margin-top: 15px">
      <Page
        :total="total"
        show-elevator
        show-total
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-page-size-change="changePageSize"
        @on-change="changePage"
      />
    </Row>
    <editbooks
      v-model="showEditbooks"
      @handleSearch="getPxbooksListPage"
      :IDs="selectID"
    ></editbooks>
    <rukubooksjilu v-model="showRukebooks"></rukubooksjilu>
    <chukujilu v-model="showChukubooks"></chukujilu>
    <ruku-form
      v-model="showruku"
      :bookID="selectID"
      @handleSearch="getPxbooksListPage"
    ></ruku-form>
    <chuku-form
      v-model="showchuku"
      :bookID="selectID"
      @handleSearch="getPxbooksListPage"
    ></chuku-form>
    <daochubook-form v-model="showdaochu"></daochubook-form>
    <jieshu-form
      v-model="showjieshu"
      :bookID="selectID"
      @handleSearch="getPxbooksListPage"
    ></jieshu-form>
    <importbooks-form
      v-model="showimport"
      @handleSearch="getPxbooksListPage"
    ></importbooks-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import Editbooks from "../../../components/jiaowuManage/editbooks.vue";
import Rukubooksjilu from "../../../components/jiaowuManage/rukubooksjilu.vue";
import Chukujilu from "../../../components/jiaowuManage/chukujilu.vue";
import RukuForm from "../../../components/jiaowuManage/rukuForm.vue";
import ChukuForm from "../../../components/jiaowuManage/chukuForm.vue";
import DaochubookForm from "../../../components/jiaowuManage/daochubookForm.vue";
import JieshuForm from "../../../components/jiaowuManage/jieshuForm.vue";
import importbooksForm from "../../../components/jiaowuManage/importbooksForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Editbooks,
    Rukubooksjilu,
    Chukujilu,
    RukuForm,
    ChukuForm,
    DaochubookForm,
    JieshuForm,
    importbooksForm,
  },
  data() {
    return {
      columns6: [
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
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.campusID = value;
                      this.search();
                    } else {
                      this.params.campusID = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "名称",
          key: "booksName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.bookName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "总数量",
          key: "allnum",
          align: "center",
        },
        {
          title: "已借出本数",
          key: "className",
          align: "center",
          render: (h, params) => {
            return h("div", [h("span", params.row.allnum - params.row.cunnum)]);
          },
        },
        {
          title: "可借本数",
          key: "cunnum",
          align: "center",
        },
        {
          title: "作者",
          align: "center",
          key: "author",
        },
        {
          title: "出版社",
          key: "press",
          align: "center",
        },
        {
          title: "出版日期",
          key: "chubanDate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.chubanDate, "yyyy-MM-dd")),
            ]);
          },
        },
        {
          title: "版次",
          key: "banci",
          align: "center",
        },
        {
          title: "ISBN",
          key: "isbn",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "ISBN",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.ISBN = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "是否带答案册",
          key: "iSdaance",
          align: "center",
          render: (h, params) => {
            return h("div", [h("span", params.row.iSdaance == true ? "是" : "否")]);
          },
        },
        {
          title: "是否带光盘",
          key: "iSdisc",
          align: "center",
          render: (h, params) => {
            return h("div", [h("span", params.row.iSdisc == true ? "是" : "否")]);
          },
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.clickJieshu(params.row.id);
                    },
                  },
                },
                "借书"
              ),
            ]);
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "278",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        bookName: "",
        campusID: "",
        ISBN: "",
      },
      selectID: "",
      showEditbooks: false,
      showRukebooks: false,
      showChukubooks: false,
      showruku: false,
      showchuku: false,
      showdaochu: false,
      showjieshu: false,
      campusList: [],
      showimport: false,
    };
  },
  methods: {
    onClickRow(row, index) {
      this.checkList = [];
      this.ids = [];
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

    getPxbooksListPage() {
      api.get("xwcloud-homeschool/homeschool/pxbooks/getPxbooksPage",this.params)
      //this.getPxbooksPage(this.params)
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
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getPxbooksListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getPxbooksListPage();
    },
    clickShijian(onclicks) {
      let IDs = "";
      var i = 0;
      this.data.forEach((items) => {
        if (items._checked) {
          IDs += items.id + ",";
          i += 1;
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);

      switch (onclicks) {
        case "edit":
          // 编辑
          if (IDs == "") {
            this.$Message.error("请选择数据");
            return;
          } else {
            this.selectID = IDs;
            this.showEditbooks = true;
          }
          break;
        case "del()":
          if (IDs == "") {
            this.$Message.error("请选择数据");
            return;
          }

          this.$Modal.confirm({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            onOk: () => {
              api.del("xwcloud-homeschool/homeschool/pxbooks/delBook",{IDs:IDs})
              // this.delBook({
              //   IDs: IDs,
              // })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("删除成功!");
                  this.getPxbooksListPage();
                } else {
                  this.$Message.error("删除失败!");
                }
              });
            },
            onCancel: () => {},
          });
          break;
        case "derive()":
          this.showdaochu = true;
          break;
        case "theimport()":
          // 导入
          this.showimport = true;
          break;
        case "enter()":
          this.selectID = IDs;
          this.showruku = true;

          break;
        case "out()":
          if (IDs == "") {
            this.$Message.error("请选择数据");
            return;
          }
          this.selectID = IDs;
          this.showchuku = true;
          break;
        case "allEnter()":
          // 入库记录
          this.showRukebooks = true;
          break;
        case "allOut()":
          // 出库记录
          this.showChukubooks = true;
          break;
        case "jiejilu()":
          // 借书记录
          this.$router.push({
            path: "/jieshujilu",
            query: {},
          });
          break;
      }
    },
    clickJieshu(val) {
      this.selectID = val;
      this.showjieshu = true;
    },
    search() {
      this.getPxbooksListPage();
    },
    searchall() {
      this.params.size = "";
      this.params.current = "";
      this.params.bookName = "";
      this.params.campusID = "";
      this.params.ISBN = "";
      this.getPxbooksListPage();
    },
    getAllCampusList() {
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
      // this.getallcampusList({ menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
        }
      });
    },
  },
  mounted: function () {
    // 初始化页面
    this.getPxbooksListPage();
    this.getAllCampusList();
  },
};
</script>
