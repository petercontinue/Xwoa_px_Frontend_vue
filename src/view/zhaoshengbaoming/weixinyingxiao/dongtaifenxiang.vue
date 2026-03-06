<template>
  <div>
    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getdongtaiInfoPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
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
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <dongtaidianzandetail
      v-model="showdianzan"
      :dongtaiID="dataID"
    ></dongtaidianzandetail>
    <dongtaipinglundetail
      v-model="showpinglun"
      :dongtaiID="dataID"
    ></dongtaipinglundetail>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import dongtaidianzandetail from "@/components/zhaoshengbaoming/weixinyingxiao/dongtaidianzandetail";
import dongtaipinglundetail from "@/components/zhaoshengbaoming/weixinyingxiao/dongtaipinglundetail";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    dongtaidianzandetail,
    dongtaipinglundetail,
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
          title: "动态标题",
          key: "dongtaiTitle",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "动态标题",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchparams.dongtaiTitle = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "发布用户",
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
                    this.searchparams.nickName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "打赏数",
          key: "payMoney",
          align: "center",
        },
        {
          title: "点赞数",
          key: "dianzanCount",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.showdianzan = true;
                    this.dataID = params.row.id;
                  },
                },
              },
              params.row.dianzanCount + "_点击查看详情"
            );
          },
        },
        {
          title: "评论数",
          key: "pinglunCount",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.showpinglun = true;
                    this.dataID = params.row.id;
                  },
                },
              },
              params.row.pinglunCount + "_点击查看详情"
            );
          },
        },
        {
          title: "阅读次数",
          key: "yueduTimes",
          align: "center",
        },
        {
          title: "发布时间",
          key: "Addtime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.Addtime, "yyyy-MM-dd hh:mm:ss")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "发布时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.startDate = value[0];
                    this.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
      ],
      menuID: "119",
      data: [],
      total: 0,
      shuoming: "",
      searchparams: {
        size: 10,
        current: 1,
        dongtaiTitle: "",
        nickName: "",
        startDate: "",
        endDate: "",
      },
      showdianzan: false,
      showpinglun: false,
      dataID: "",
      editdata: "",
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
    getdongtaiInfoPages() {
      api
        .get(
          "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllWscUserDongtaiPages",
          this.searchparams
        )
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
    TableSearch() {
      this.getdongtaiInfoPages();
    },
    changePage(current) {
      this.searchparams.current = current;
      this.getdongtaiInfoPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.searchparams.size = pageSize;
      this.getdongtaiInfoPages();
    },
    onSearch(search) {},
    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "del()") {
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdata = items;
          }
        });
        console.log(this.editdata);
        if (this.editdata == "") {
          this.$Message.error("请选择要删除的动态数据");
        } else {
          this.$Modal.confirm({
            title: "提示",
            content: "<p>确定删除该动态信息?</p>",
            onOk: () => {
              api
                .del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteDongtaiInfo", {
                  dongtaiID: this.editdata.id,
                })
                .then((response) => {
                  if (response.code == "Y" && response.success == true) {
                    this.getdongtaiInfoPages();
                    this.$Message.success(response.msg);
                  } else {
                    this.$Message.error(response.msg);
                  }
                });
            },
          });
        }
      }
    },
    searchAll() {
      this.searchparams.size = 10;
      this.searchparams.current = 1;
      this.searchparams.dongtaiTitle = "";
      this.searchparams.nickName = "";
      this.searchparams.startDate = "";
      this.searchparams.endDate = "";
      this.getdongtaiInfoPages();
    },
  },

  mounted() {
    this.getdongtaiInfoPages();
  },
};
</script>
