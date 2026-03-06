<template>
  <Modal
    v-model="isShow"
    title="明细"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    :width="50"
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
import * as api from "@/api/api.js";

export default {
  name: "subjectDetail",
  props: {
    value: { default: false, type: Boolean },
    campusID: { default: null, type: String },
    subjectID: { default: null, type: String },
  },
  data() {
    return {
      isShow: this.value,
      columns6: [
        {
          title: "姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "报名金额",
          key: "zongjia",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: this.campusID,
        subjectID: this.subjectID,
      },
    };
  },
  computed: {},
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    getSubjectBmByCampusAndSubjectList() {
      api.get("xwcloud-caiwu/shujutongji/other/getSubjectBmByCampusAndSubject",this.params).then((res) => {
        if (res.code == "success") {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          // console.log(this.data);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getSubjectBmByCampusAndSubjectList();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getSubjectBmByCampusAndSubjectList();
    },
    search() {
      this.params.current = 1;
      this.params.size = 10;
      this.getSubjectBmByCampusAndSubjectList();
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        // this.$refs.yxForm.resetFields();
        // setTimeout(() => {
        //   this.$refs.yxForm.resetFields();
        // }, 10);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    campusID(val) {
      this.params.campusID = val;
      if (this.params.campusID && this.params.subjectID) {
        this.getSubjectBmByCampusAndSubjectList();
      }
    },
    subjectID(val) {
      this.params.subjectID = val;
      if (this.params.campusID && this.params.subjectID) {
        this.getSubjectBmByCampusAndSubjectList();
      }
    },
    mounted() {},
  },
};
</script>

<style>
</style>