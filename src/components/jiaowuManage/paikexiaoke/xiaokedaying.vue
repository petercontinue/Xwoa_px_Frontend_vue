<template>
  <Modal
    v-model="show"
    title="消课打印"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    width="84"
    @on-cancel="closeModal(false)"
  >
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns" :data="data"></Table>
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
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "xiaokedaying",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      data: [], // 接口数据接收
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
      columns: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          width: 150,
        },
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          width: 80,
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 80,
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
          width: 100,
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "培训方式",
          key: "buxiStyleName",
          align: "center",
          width: 100,
        },
        {
          title: "教师",
          key: "staffName",
          align: "center",
          width: 100,
        },
        {
          title: "助教",
          key: "zhujiao",
          align: "center",
          width: 100,
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "上课",
          key: "startLessonDateTime",
          align: "center",
          width: 100,
        },
        {
          title: "下课",
          key: "endLessonDateTime",
          align: "center",
          width: 100,
        },
        {
          title: "消耗课时",
          key: "keshiNum",
          align: "center",
          width: 80,
        },
        {
          title: "剩余课时",
          key: "remainkeshi",
          align: "center",
          width: 80,
        },
        {
          title: "录入人",
          key: "adduser",
          align: "center",
          width: 80,
        },
        {
          title: "录入时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "打印",
          key: "adduser",
          align: "center",
          width: 80,
          render: (h, params) => {
            return h("a", [
              h(
                "span",
                {
                  style: { color: "blue" },
                  on: {
                    click: () => {
                      this.dayin(params);
                    },
                  },
                },
                "打印"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    getxiaokedayingListPage() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getxiaokedayingPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },

    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    dayin(value){
        console.log(value)
    },

    changePage(current) {
      this.params.current = current;
      this.getxiaokedayingListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getxiaokedayingListPage();
    },
    mounted: function () {
      this.getxiaokedayingListPage();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.getxiaokedayingListPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
