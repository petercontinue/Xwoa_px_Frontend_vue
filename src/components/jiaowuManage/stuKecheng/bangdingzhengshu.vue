<template>
  <Modal
    v-model="show"
    title="证书绑定课程"
    @on-ok="ok"
    :mask-closable="false"
    width="60"
    @on-cancel="closeModal(false)"
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
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "bangdingzhengshu",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    zsid: { type: String },
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
        zsid: "",
      },
      columns6: [
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "操作",
          key: "caozuo",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "primary",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.delkctoZS(params);
                    },
                  },
                },
                "解绑"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    getlookBD() {
      api.get("xwcloud-stu/stu/buxikecheng/lookBD",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },
    ok() {
      this.$emit("handleSearch");
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getlookBD();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getlookBD();
    },
    delkctoZS(value) {
      let kcid = value.row.id;
      api.del("xwcloud-stu/stu/buxikecheng/delBD",{ kcID: kcid }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          this.getlookBD();
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.zsid = this.zsid;

        this.getlookBD();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
