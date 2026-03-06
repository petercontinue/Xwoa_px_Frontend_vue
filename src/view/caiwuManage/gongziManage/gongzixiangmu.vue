<template>
  <div>
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
    <addgongzixiangmu-form
      v-model="showadd"
      @handleSearch="getGongzixiangmuListPage"
    ></addgongzixiangmu-form>
    <editgongzixiangmu
      v-model="showedit"
      :gongziID="selectID"
      @handleSearch="getGongzixiangmuListPage"
    ></editgongzixiangmu>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import AddgongzixiangmuForm from "../../../components/caiwuManage/addgongzixiangmuForm.vue";
import Editgongzixiangmu from "../../../components/caiwuManage/editgongzixiangmu.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    AddgongzixiangmuForm,
    Editgongzixiangmu,
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
          title: "项目名称",
          key: "salaryStyle",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "项目名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.salaryStyle = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "加项减项",
          key: "isJiaOrJianOrQiuhe",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "加项减项",
                  data: this.isJiaList,
                },
                on: {
                  "on-choosed": (value) => {
                    // 选择后获取到ID
                    if (value != "-1") {
                      this.params.isJia = value;
                      this.search();
                    } else {
                      this.params.isJia = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "操作人",
          key: "staffName",
          align: "center",
        },
        {
          title: "录入时间",
          key: "lurudate",
          align: "center",
          render: (h, params) => {
            return h("div", toolbox.dateFtt(params.row.lurudate, "yyyy-MM-dd hh:mm:ss"));
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "323",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        salaryStyle: "",
        isJia: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      isJiaList: [
        { id: "加项", name: "加项" },
        { id: "减项", name: "减项" },
      ],
      showadd: false,
      showedit: false,
      selectID: "",
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getGongzixiangmuListPage() {
      api
        .get(
          "xwcloud-caiwu/caiwu/pxgongzitable/gongzixiangmu/getGongzixiangmuPage",
          this.params
        )
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(this.data);

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
      this.getGongzixiangmuListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getGongzixiangmuListPage();
    },
    del(id) {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          api
            .del("xwcloud-caiwu/caiwu/pxgongzitable/gongzixiangmu/delGongzixiangmu", {
              IDs: id,
              qiyeID: this.$store.state.kehoupingjia.qiyeID,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除成功!");
                this.getGongzixiangmuListPage();
              } else {
                this.$Message.error("删除失败!");
              }
            });
        },
        onCancel: () => {},
      });
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
      window.console.log(onclicks);
      switch (onclicks) {
        case "addinfo":
          this.showadd = true;
          break;
        case "edit":
          this.Onedit();
          break;
        case "del()":
          if (IDs == "") {
            this.$Message.error("请选择数据");
          } else {
            this.del(IDs);
          }
          break;
      }
    },

    Onedit() {
      let edlist = [];
      this.data.forEach((items) => {
        if (items._checked) {
          edlist.push(items);
        }
      });
      if (edlist.length == 0) {
        this.$Message.error("请选择数据");
      } else if (edlist.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.selectID = edlist[0].id;
        this.showedit = true;
      }
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getGongzixiangmuListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getGongzixiangmuListPage();
  },
};
</script>
