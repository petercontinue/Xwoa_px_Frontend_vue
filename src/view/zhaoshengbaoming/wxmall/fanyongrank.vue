<template>
  <div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="colData" :data="tableData"></Table>
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
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      colData: [
        {
          title: "id",
          key: "id",
          align: "center",
        },
        {
          title: "微信昵称",
          key: "nickName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "微信昵称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.userName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "推客姓名",
          key: "realName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "推客姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.userName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "累计返佣金额",
          key: "scYijieYongjin",
          align: "center",
        },
        {
          title: "返佣排名",
          key: "rank",
          align: "center",
        },
        {
          title: "团队人数",
          key: "teamnum",
          align: "center",
        },
        {
          title: "加入时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.addTime) {
              state = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss");
            } else {
              state = "-";
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "开始日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.starttime = value[0];
                    this.searchObj.endtime = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
      ],
      tableData: [],
      total: 0,
      searchObj: {
        size: 10,
        current: 1,
        nickName: "",
        userName: "",
        starttime: "",
        endtime: "",
      },
      editData: "",
    };
  },
  methods: {
    TableSearch() {
      this.getPage();
    },
    search() {
      this.searchObj.size = 10;
      this.searchObj.curren = 1;
      this.searchObj.nickName = "";
      this.searchObj.userName = "";
      this.searchObj.starttime = "";
      this.searchObj.endtime = "";
      this.getPage();
    },

    getPage() {
      api.get("/xwcloud-wsc/wsc/wsc/getfanyongpaiming",this.searchObj).then((res) => {
        if ((res.code = "success")) {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },

    changePage(current) {
      this.tableData.current = current;
      this.getPage();
    },

    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.tableData.size = pageSize;
      this.getPage();
    },
  },
  mounted() {
    this.getPage();
  },
};
</script>

<style lang="" scoped></style>
