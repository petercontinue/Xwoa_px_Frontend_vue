<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Button type="primary" @click="add()">添加</Button>
        <Button type="info" @click="edit()">修改</Button>
        <Button type="warning" @click="audit()">审批</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" @on-row-click="onClickRow" :columns="columns6" :data="data"></Table>
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
    <addkaojissq v-model="addEShow" :type="type" :msg="msg" v-on:handleSearch="getKJsqPagelistPage"></addkaojissq>
    <shenhekaojissq v-model="SHShow" :msg="msg" v-on:handleSearch="getKJsqPagelistPage"></shenhekaojissq>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import addkaojissq from "@/components/jiaowuManage/stuKecheng/addkaojissq";
import shenhekaojissq from "@/components/jiaowuManage/stuKecheng/shenhekaojissq";
import * as api from "@/api/api.js";

export default {
  components: { addkaojissq, shenhekaojissq },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      msg: "",
      type: "",
      addEShow: false,
      SHShow: false,
      stu: JSON,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuID: "",
      },
      checkList: [],
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
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
        },
        {
          title: "申请级别",
          key: "sqjibie",
          align: "center",
        },
        {
          title: "审批等级",
          key: "shjibie",
          align: "center",
        },
        {
          title: "添加人",
          key: "adduser",
          align: "center",
        },
        {
          title: "审核人",
          key: "shenheuser",
          align: "center",
        },
        {
          title: "添加时间",
          key: "addDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.addDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(
                params.row.addDate,
                "yyyy-MM-dd hh:mm"
              );
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "审核时间",
          key: "shenheDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.shenheDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(
                params.row.shenheDate,
                "yyyy-MM-dd hh:mm"
              );
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      this.checkList = [];
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
        this.checkList = this.$refs.selection.data[index];
      }
    },

    getKJsqPagelistPage() {
      this.checkList = [];
      api.get("xwcloud-stu/stu/buxikecheng/getKJsqPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },

    add() {
      this.type = "1";
      this.msg = this.$route.query.stu;
      this.addEShow = true;
    },
    edit() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择数据");
      } else {
        this.type = "2";
        this.msg = JSON.stringify(this.checkList);
        this.addEShow = true;
      }
    },
    audit() {
      if (this.checkList.length == 0) {
        this.$Message.error("请选择数据");
      } else {
        this.msg = JSON.stringify(this.checkList);
        this.SHShow = true;
      }
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.getKJsqPagelistPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getKJsqPagelistPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getKJsqPagelistPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.stu = JSON.parse(this.$route.query.stu);
    this.params.stuID = this.stu.stuID;
    this.getKJsqPagelistPage();
  },
};
</script>
