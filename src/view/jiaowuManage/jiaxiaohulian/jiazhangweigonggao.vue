<template>
  <div>
    <!-- <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1 这里添加的家长微公告，是显示；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 设置了下次回访时间的，系统会设置的回访日当天自动提醒老师；</span>
        </Col>
      </Alert>
    </Row> -->
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          highlight-row
          @on-row-click="onClickRow"
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
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addjiazhangweigonggao-form
      v-model="showaddjiazhanggonggao"
      @handleSearch="getPxjiazhanggonggaoListPage"
    ></addjiazhangweigonggao-form>
    <editjiazhangweigonggao-form
      v-model="showeditjiazhanggonggao"
      @handleSearch="getPxjiazhanggonggaoListPage"
      :gonggaoID="selectID"
    ></editjiazhangweigonggao-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import Stuyuekeshenhetongguo from "../../../components/jiaowuManage/stuyuekeshenhetongguo.vue";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import AddjiazhangweigonggaoForm from "../../../components/jiaowuManage/addjiazhangweigonggaoForm.vue";
import EditjiazhangweigonggaoForm from "../../../components/jiaowuManage/editjiazhangweigonggaoForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    AddjiazhangweigonggaoForm,
    EditjiazhangweigonggaoForm,
    // 按钮控件
  },
  data() {
    return {
      columns6: [
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
          title: "家长公告内容",
          key: "parameterContent",
          align: "center",
        },
        {
          title: "添加时间",
          key: "tianjiashijian",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.tianjiashijian,
              "yyyy-MM-dd hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "添加人",
          key: "addstaffName",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "279",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
      },
      selectID: "",
      showaddjiazhanggonggao: false,
      showeditjiazhanggonggao: false,
      checkAll: false,
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    getPxjiazhanggonggaoListPage() {
      api
        .get(
          "xwcloud-homeschool/homeschool/pxjiazhanggonggao/getPxjiazhanggonggaoPage",
          this.params
        )
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
      this.getPxjiazhanggonggaoListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getPxjiazhanggonggaoListPage();
    },
    del(ids) {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          api
            .del("xwcloud-homeschool/homeschool/pxjiazhanggonggao/delPxjiazhanggonggao", {
              IDs: ids,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除成功!");
                this.getPxjiazhanggonggaoListPage();
              } else {
                this.$Message.error("删除失败!");
              }
            });
        },
        onCancel: () => {},
      });
    },
    addinfo() {
      this.showaddjiazhanggonggao = true;
    },
    edit() {
      var eddate = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          eddate.push(items);
        }
      });

      if (eddate.length == 0) {
        this.$Message.error("请选择数据");
      } else if (eddate.length > 1) {
        this.$Message.error("只能选择1行");
      } else {
        this.selectID = eddate[0].id;
        this.showeditjiazhanggonggao = true;
      }
    },
    clickShijian(onclicks) {
      let IDs = "";
      this.data.forEach((items) => {
        if (items._checked) {
          IDs += items.id + ",";
        }
      });
      IDs = IDs.substring(0, IDs.length - 1);
      // 按钮事件
      switch (onclicks) {
        case "del()":
          if (IDs == "") {
            this.$Message.error("请选择数据");
          } else {
            this.del(IDs);
          }
          break;
        case "addinfo":
          this.addinfo();
          break;
        case "edit":
          this.edit();
          break;
      }
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getPxjiazhanggonggaoListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getPxjiazhanggonggaoListPage();
  },
};
</script>
