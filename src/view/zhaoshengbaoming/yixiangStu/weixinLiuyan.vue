<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
      </Col>
      <!---->
    </Row>
    <Alert show-icon style="margin-top: 30px">
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
      温馨提示：是指在微信学员端的登录页的“我要留言”提交的信息，会显示在这里；
    </Alert>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getweixinLiuyan"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="data"
          @on-selection-change="selectTableChange"
        ></Table>
      </Col>
    </Row>
    <Row style="margin-top: 15px">
      <Page
        :total="total"
        show-sizer
        show-elevator
        show-total
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
  </div>
</template>

<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  name: "weixinLiuyan",
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      menuID: "133",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "姓名",
          key: "userName",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.userName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "电话",
          key: "tel",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "电话",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.tel = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "校区",
          key: "campusNames",
          align: "center",
          //   width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  content: "校区",
                  data: this.campusList,
                },
                on: {
                  "on-choosed": (value) => {
                    this.searchObj.campusID = value != "-1" ? value : null;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "意向",
          key: "yixiangText",
          align: "center",
          //   width: 100,
        },
        {
          title: "留言时间",
          key: "addDate",
          align: "center",
          //   width: 100,
        },
      ],
      data: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        userName: null,
        tel: null,
        campusID: null,
      },
      selection: [],
      stuGradeList: [],
      campusList: [],
      staffPostList: [],
    };
  },
  methods: {
    clickShijian(onclicks) {
      // console.log(onclicks);
      let evalStr = "this." + onclicks;
      // if (onclicks.indexOf("addinfo") > -1 || onclicks.indexOf("edit") > -1) {
      //   evalStr += "()";
      // }
      eval(evalStr);
    },
    changePage(current) {
      this.searchObj.current = current;
      this.getweixinLiuyan();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchObj.size = pageSize;
      this.getweixinLiuyan();
    },
    selectTableChange(selection) {
      // console.log(selection)
      this.selection = selection;
    },
    search(val = null) {
      this.searchObj.size = 10;
      this.searchObj.current = 1;
      this.searchObj.type = val;
      if (val == "1") {
        this.searchObj = {
          size: 10,
          current: 1,
          userName: null,
          tel: null,
          campusID: null,
        };
      }
      this.getweixinLiuyan();
    },
    getweixinLiuyan() {
      api
        .get("/xwcloud-zsbm/yxstu/YixiangStu/getAllLiuyanPages", this.searchObj)
        .then((res) => {
          if (res.code == "success") {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            this.$refs.selection.selectAll(false);
          }
        });
    },
    /**
     * 获取校区
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          }
        });
    },
    del() {
      if (this.selection.length > 0) {
        this.$Modal.confirm({
          title: "您正在进行删除操作",
          content: "<p>确定要删除吗</p>",
          loading: true,
          onOk: () => {
            let ids = this.selection
              .map((val) => {
                return val.id;
              })
              .join(",");
            // console.log(ids)
            api.del("/xwcloud-zsbm/yxstu/YixiangStu/deleteLiuyanList/" + ids, {}).then(
              (res) => {
                if (res.success) {
                  this.getweixinLiuyan();
                  this.$Message.success(res.msg);
                } else {
                  this.$Message.error(res.msg);
                }
                this.$Modal.remove();
              },
              (err) => {
                console.log(err);
                this.$Message.error("出错了，请刷新重试");
                this.$Modal.remove();
              }
            );
          },
          onCancel: () => {},
        });
      } else {
        this.$Message.error("请至少勾选一行");
      }
    },
  },
  mounted() {
    this.getweixinLiuyan();
    this.getAllCampusList();
  },
};
</script>

<style scoped></style>
