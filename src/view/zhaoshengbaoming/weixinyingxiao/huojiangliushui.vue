<template>
  <div style="margin-top: 10px">
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <Button type="success" style="margin-top: 30px" @click="jpfafang()">奖品发放</Button>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns5"
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
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      params: {
        current: 1,
        size: 10,
        huodongID: "",
        type: 0,
        userName: "",
        huodongName: "",
      },
      ids: "",
      columns5: [
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
          title: "活动名称",
          key: "choujiangHuodongName",
          align: "center",
        },
        {
          title: "抽奖人",
          key: "userName",
          align: "center",
        },
        {
          title: "类型",
          key: "jptype",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.jptype) {
              case 0:
                state = "无奖品";
                return h("div", [h("span", state)]);
              case 1:
                state = "是奖品";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "blue" },
                    },
                    state
                  ),
                ]);
              default:
                state = "-";
                break;
            }
          },
        },
        {
          title: "获奖名称",
          key: "jiangpingName",
          align: "center",
        },
        {
          title: "获奖等级",
          key: "jiangpingLevel",
          align: "center",
        },
        {
          title: "奖品发放状态",
          key: "jiangpingFafangState",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.jiangpingFafangState) {
              case 0:
                state = "未发放";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "red" },
                    },
                    state
                  ),
                ]);
              case 1:
                state = "已发放";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "green" },
                    },
                    state
                  ),
                ]);
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "备注",
          key: "shuoming",
          align: "center",
          render: (h, params) => {
            let val = "-";
            if (params.row.shuoming) {
              val = params.row.shuoming;
            }
            return h("div", [h("span", val)]);
          },
        },
        {
          title: "抽奖时间",
          key: "choujiangTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.choujiangTime, "yyyy-MM-dd hh:mm");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "操作人",
          key: "ffStaffName",
          align: "center",
          render: (h, params) => {
            let val = "-";
            if (params.row.jiangpingFFTime) {
              val = params.row.jiangpingFFTime;
            }
            return h("div", [h("span", val)]);
          },
        },
        {
          title: "操作时间",
          key: "jiangpingFFTime",
          align: "center",
          render: (h, params) => {
            let datehave = "-";
            if (params.row.jiangpingFFTime) {
              datehave = toolbox.dateFtt(params.row.jiangpingFFTime, "yyyy-MM-dd hh:mm");
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getWhdChoujiangRecord() {
      api
        .get("/xwcloud-wsc/wsc/whdChoujiang/getWhdChoujiangRecordPage", this.params)
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

    jpfafang() {
      this.ids = "";
      this.data.forEach((items) => {
        if (items._checked) {
          this.ids += items.id + ",";
        }
      });
      if (this.ids == "") {
        this.$Message.error("请选择数据");
      } else {
        this.$Modal.confirm({
          title: "备注（选）:",
          width: 50,
          render: (h) => {
            return h("Input", {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: "请输入说明",
                type: "textarea",
                rows: 2,
              },
              on: {
                input: (val) => {
                  this.value = val;
                },
              },
            });
          },
          onOk: () => {
            console.log(this.ids, this.value);
            api
              .post("/xwcloud-wsc/wsc/whdChoujiang/fafangjiangpin", {
                ids: this.ids,
                beizhu: this.value,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getWhdChoujiangRecord();
                  this.value = "";
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {},
        });
      }
    },

    /**
     * 快捷查询（全部）
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.huodongID = "";
      this.getWhdChoujiangRecord();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
    },

    /**
     * 表头查询
     */
    TableSearch() {},
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.params.huodongID = this.$route.query.ID; //获取上级页面传过来的ID
    console.log(this.params.huodongID);
    this.getWhdChoujiangRecord();
  },
};
</script>
