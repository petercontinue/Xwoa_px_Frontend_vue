<template>
  <Modal
    v-model="show"
    title="查看课程"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    width="50%"
    footer-hide
    @on-cancel="closeModal(false)"
  >
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
      </Col>
    </Row>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "chakankecheng",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    StuID: {},
  },
  data() {
    return {
      columns6: [
        {
          title: "学号",
          key: "zidingyiStuID",
          align: "center",
        },
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
          title: "课程是否启用",
          key: "isShow",
          align: "center",
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "班主任",
          key: "banzhurenName",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    getStuKechengListData() {
      api.get("xwcloud-homeschool/homeschool/oldstupxhuifang/getStuKechengList",{
        stuID: this.StuID
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
        }
      });
    },
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
  },
  mounted: function () {
    // 初始化页面
    this.getStuKechengListData();
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        // 获取校区列表
        this.getStuKechengListData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
