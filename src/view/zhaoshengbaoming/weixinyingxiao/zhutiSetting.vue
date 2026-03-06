<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>微信投票主题设置（可以添加多个微信投票主题，但只能有一个处于启用状态）</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <Button type="info" @click="addzhuti()">添加</Button>
        <Button type="success" @click="editzhuti()">修改</Button>
        <Button type="error" @click="delzhuti()">删除</Button>
        <Button type="primary" @click="zhutishow()">设置启用</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns" :data="data" @on-row-click="onClickRow"></Table>
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

    <addOreditzhuti v-model="isShow" :editdata="editdata" v-on:handleSearch="GetzhutiPage"></addOreditzhuti>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import addOreditzhuti from "@/components/zhaoshengbaoming/weixinyingxiao/addOreditzhuti";
import * as api from "@/api/api.js";

export default {
  components: {
    addOreditzhuti,
  },
  data() {
    return {
      columns: [
        {
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
          title: "启用状态",
          key: "isUser",
          align: "center",
          render: (h, params) => {
            if (params.row.isUser) {
              return h("div", [
                h(
                  "label",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  "使用中"
                ),
              ]);
            } else {
              return h("div", [
                h("label", { style: { color: "blue" } }, "未使用"),
              ]);
            }
          },
        },
        {
          title: "联系-机构名称",
          key: "schoolName",
          align: "center",
        },
        {
          title: "联系-校区地址",
          key: "campusAdress",
          align: "center",
        },
        {
          title: "联系-咨询热线",
          key: "lianxiTel",
          align: "center",
        },
        {
          title: "分享-标题",
          key: "activityName",
          align: "center",
        },
        {
          title: "分享-说明信息",
          key: "activityDiscription",
          align: "center",
        },
        {
          title: "分享-logo",
          key: "logo",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: "width: 40px;height: 40px;",
                },
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  attrs: {
                    src: params.row.logo,
                    style: "width: 40px;height: 40px;border-radius: 2px;",
                  },
                  style: {},
                }),
              ]
            );
          },
        },
      ],
      data: [],
      total: 0,
      params: {
        size: 10,
        current: 1,
      },
      checkList: [],
      isShow: false,
      editdata: "",
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.checkList = [];
      if (this.$refs.selection.data[index].checkBox == true) {
        this.$refs.selection.data[index].checkBox =
          !this.$refs.selection.data[index].checkBox;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "checkBox", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index].checkBox =
          !this.$refs.selection.data[index].checkBox;
        this.checkList = this.$refs.selection.data[index];
      }
    },
    GetzhutiPage() {
      api.get("/xwcloud-wsc/wsc/whdToupiao/getactivityPages",this.params).then((res) => {
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
      this.GetzhutiPage();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.GetzhutiPage();
    },

    addzhuti() {
      this.isShow = true;
    },
    editzhuti() {
      this.editdata = "";
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.editdata = JSON.stringify(this.checkList);
        this.isShow = true;
      }
    },
    delzhuti() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除该主题？</p>",
          onOk: () => {
            api.del("/xwcloud-wsc/wsc/whdToupiao/deleteZhuti",{ id: this.checkList.id }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除成功");
              } else {
                this.$Message.error(res.msg);
              }
              this.GetzhutiPage();
            });
          },
          onCancel: () => {},
        });
      }
    },
    zhutishow() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择数据");
      } else {
        this.$Modal.confirm({
          content: "<p>确定启用该主题？</p>",
          onOk: () => {
            api.post("/xwcloud-wsc/wsc/whdToupiao/zhanshiIsShow",{ id: this.checkList.id }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("启用成功");
              } else {
                this.$Message.error(res.msg);
              }
              this.GetzhutiPage();
            });
          },
          onCancel: () => {},
        });
      }
    },
  },
  mounted() {
    this.GetzhutiPage();
  },
};
</script>
