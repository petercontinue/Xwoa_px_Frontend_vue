<template>
  <div>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="add()">添加</Button>
        <Button type="success" size="large" @click="edit()">修改</Button>
        <Button type="warning" size="large" @click="del()">删除</Button>
        <Button type="info" size="large" @click="setIsShow(1)">设置启用</Button>
        <Button type="info" size="large" @click="setIsShow(2)">设置不启用</Button>
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

    <savetuilelevel
      v-model="addshow"
      :type="type"
      :editID="editID"
      v-on:handleSearch="gettuikelvPage"
    ></savetuilelevel>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import savetuilelevel from "@/components/systemSetting/weixinsetting/savetuilelevel";
export default {
  components: {
    savetuilelevel,
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
          key: "id",
          title: "id",
          align: "center",
        },
        {
          title: "推客等级",
          key: "tuikeLevelName",
          align: "center",
        },
        {
          key: "fjFanyongbi1",
          title: "父级返佣比例(购买)%",
          align: "center",
        },
        {
          key: "zjFanyongbi1",
          title: "祖级返佣比例(购买)%",
          align: "center",
        },
        {
          key: "fjFanyongbi2",
          title: "父级返佣比例(升级推客)%",
          align: "center",
        },
        {
          key: "zjFanyongbi2",
          title: "祖级返佣比例(升级推客)%",
          align: "center",
        },
        {
          key: "isShow",
          title: "启用状态",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.isShow) {
              case 1:
                state = "启用";
                return h("div", [
                  h(
                    "span",
                    {
                      style: {
                        color: "blue",
                      },
                    },
                    state
                  ),
                ]);
              case 2:
                state = "不启用";
                return h(
                  "div",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  [h("span", state)]
                );
              default:
                state = "-";
                return h("div", [h("span", state)]);
            }
          },
        },
      ],
      data: [],
      total: 0,
      params: {
        size: 10,
        current: 1,
      },
      addshow: false,
      type: 0,
      editID: "",
    };
  },
  methods: {
    ...mapActions(["gettuikelevelPage", "settklevel", "deltklevel"]),

    //鼠标单击一行选中
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    setIsShow(type) {
      this.editID = "";
      this.data.forEach((item) => {
        if (item._checked) {
          this.editID = item.id + ",";
        }
      });

      this.settklevel({ ids: this.editID, isshow: type }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.shezhiForm = res.obj;
          this.gettuikelvPage();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    add() {
      this.type = 1;
      this.editID = "";
      this.addshow = true;
    },
    edit() {
      let i = 0;
      this.editID = "";
      this.data.forEach((item) => {
        if (item._checked) {
          i += 1;
          this.editID = item.id;
        }
      });

      if (i < 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (i > 1) {
        this.$Message.error("请选择一行进行修改");
      } else {
        this.type = 2;
        this.addshow = true;
      }
    },

    del() {
      this.editID = "";
      this.data.forEach((item) => {
        if (item._checked) {
          this.editID = item.id + ",";
        }
      });

      this.deltklevel({ ids: this.editID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // this.shezhiForm = res.obj;
          this.gettuikelvPage();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },

    changePage(current) {
      this.current = current;
      this.gettuikelvPage();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.gettuikelvPage();
    },

    gettuikelvPage() {
      this.gettuikelevelPage(this.params).then((result) => {
        if (result.code == "Y" && result.success == true) {
          this.data = result.obj.records;
          console.log(this.data);
          this.total = Number(result.obj.total);

          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },
  },

  mounted() {
    this.gettuikelvPage();
  },
};
</script>
