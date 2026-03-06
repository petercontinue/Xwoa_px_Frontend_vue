<template>
  <Modal
    v-model="show"
    title="签退学员"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
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
    <qiantuistuInfo v-model="qstuInfoShow" :stuID="stuID"></qiantuistuInfo>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import qiantuistuInfo from "@/components/jiaowuManage/paikexiaoke/qiantuistuInfo";
import * as api from "@/api/api.js";

export default {
  name: "qiantuistu",
  components: {
    qiantuistuInfo,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    classID: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      data: [], // 接口数据接收
      qstuInfoShow: false,
      stuID: "",
      total: 0,
      params: {
        current: 1,
        size: 10,
        classID: "",
      },
      columns6: [
        {
          title: "学号",
          key: "stuNo",
          align: "center",
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
        },
        {
          title: "签退次数",
          key: "nums",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.qiantuiNum(params);
                    },
                  },
                },
                params.row.nums + "次-详情"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    getziyouqiantuistuNumListPage() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getziyouqiantuistuNumPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(this.data);
        }
      });
    },

    ok() {
      this.closeModal(false);
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getziyouqiantuistuNumListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getziyouqiantuistuNumListPage();
    },
    qiantuiNum(value) {
      this.stuID = value.row.stuID;
      this.qstuInfoShow = true;
      this.closeModal(false);
    },
    /**
     * 初始化页面
     */
    mounted: function () {
      this.getziyouqiantuistuNumListPage();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        console.log(this.classID);
        this.params.classID = this.classID;
        this.getziyouqiantuistuNumListPage();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
