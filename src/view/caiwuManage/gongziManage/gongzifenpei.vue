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
    <editgongzifenpei-form
      v-model="showedit"
      :postID="selectID"
      :editData="editData"
      @handleSearch="getGongzifenpeiListPage"
    ></editgongzifenpei-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";

import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import EditgongzifenpeiForm from "../../../components/caiwuManage/editgongzifenpeiForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    EditgongzifenpeiForm,
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
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "岗位",
          key: "staffpostName",
          align: "center",
        },
        {
          title: "工资项目",
          key: "salaryStyle",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "324",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        salaryStyle: "",
        isJia: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      showedit: false,
      selectID: "",
      editData: "",
      checkList: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      this.checkList = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.checkList = this.$refs.selection.data[index];
      }
    },

    getGongzifenpeiListPage() {
      api
        .get(
          "xwcloud-caiwu/caiwu/pxgongzitable/gongzifenpei/getGongzifenpeiPage",
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
      this.getGongzifenpeiListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getGongzifenpeiListPage();
    },
    clickShijian(onclicks) {
      // 按钮事件
      window.console.log(onclicks);
      switch (onclicks) {
        case "edit":
          this.selectID = this.checkList.id;
          this.editData = JSON.stringify(this.checkList);
          this.showedit = true;
          break;
      }
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getGongzifenpeiListPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getGongzifenpeiListPage();
  },
};
</script>
