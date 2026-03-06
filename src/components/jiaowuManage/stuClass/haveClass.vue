<template>
  <Modal
    v-model="show"
    title="已插班级详情"
    @on-ok="ok"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <div>
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
    </div>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
export default {
  name: "haveClass",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxiID: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      haveShow: false,
      data: [], // 接口数据接收
      total: 0,
      params: {
        current:1,
        size: 10,
        buxiID: "", 
      },
      columns6: [
        {
          title: "学员",
          key: "stuName",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "已插班级",
          key: "className",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getClassToListStu();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getClassToListStu();
    },
  },
  watch: {
    value(val) {
      this.show = val;
      this.data = [];
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.buxiID=this.buxiID;
        api.get("xwcloud-stu/stu/stuClass/getHaveClass",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(res);
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
