<template>
  <div style="margin-top: 10px">
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" @click="editJP()">修改</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns5" :data="data" @on-row-click="onClickRow"></Table>
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
      },
      checkhd: [],
      editData: "",
      edidshow: false,
      columns5: [
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
          title: "图片",
          key: "jiangpingimg",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("img", {
                style: {
                  width: "50px",
                },
                attrs: {
                  src: params.row.jiangpingimg,
                },
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
          title: "奖品等级",
          key: "jiangpinglevel",
          align: "center",
        },
        {
          title: "类别",
          key: "type",
          align: "center",
          render: (h, params) => {
            if (params.row.type == 0) {
              return h("div", [h("span", "无奖品")]);
            } else if (params.row.type == 1) {
              return h("div", [
                h(
                  "span",
                  {
                    style: { color: "blue" },
                  },
                  "有奖品"
                ),
              ]);
            }
          },
        },
        {
          title: "活动奖品",
          key: "jiangpingname",
          align: "center",
        },
        {
          title: "数量",
          key: "jiangpingtotalnum",
          align: "center",
        },
        {
          title: "中奖率",
          key: "zhongjianggailv",
          align: "center",
        },
      ],
    };
  },
  methods: {
    getWhdChoujiangJiangpin() {
      console.log(this.params);
      api.get("/xwcloud-wsc/wsc/whdChoujiang/getWhdChoujiangJiangpinPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
          console.log(this.data);
        }
      });
    },

    onClickRow(row, index) {
      this.checkhd = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[
          index
        ]._checked;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[
          index
        ]._checked;
        this.checkhd = this.$refs.selection.data[index];
      }
    },

    editJP() {
      this.editData = JSON.stringify(this.checkhd);
      this.edidshow = true;
    },

    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getWhdChoujiangJiangpin();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getWhdChoujiangJiangpin();
    },

    /**
     * 表头查询
     */
    TableSearch() {
      this.getWhdChoujiangJiangpin();
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.params.huodongID = this.$route.query.ID; //获取上级页面传过来的ID
    console.log(this.params.huodongID);
    this.getWhdChoujiangJiangpin();
  },
};
</script>
