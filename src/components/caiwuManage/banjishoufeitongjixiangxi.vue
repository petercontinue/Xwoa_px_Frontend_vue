<template>
  <div>
    <Modal
      v-model="show"
      title="详细"
      @on-ok="ok"
      :loading="loading"
      :mask-closable="false"
      @on-cancel="closeModal(false)"
      :width="50"
    >
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection"
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
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Row>
    </Modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import * as api from "@/api/api.js";


export default {
  name: "banjishoufeitongjixiangxi",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    xiangxiobj: {},
  },
  data() {
    return {
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "交费",
          key: "zongjia",
          align: "center",
        },
        {
          title: "消耗课时",
          key: "xiaohaokeshi",
          align: "center",
        },
        {
          title: "剩余学费",
          key: "remainXuefei",
          align: "center",
        },
        {
          title: "剩余课时",
          key: "remainkeshi",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        classID: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      show: this.value, // 父页面传来的值
      loading: true,
    };
  },
  methods: {
    getShoufeiDetailData() {
      api.get("xwcloud-caiwu/caiwu/tongji/banjishoufei/getShoufeiDetail",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getShoufeiDetailData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getShoufeiDetailData();
    },
    clickyeji(row) {
      this.selectID = row.id;
      this.showshourumingxi = true;
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
    this.getShoufeiDetailData();
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
        this.params.classID=this.xiangxiobj.classID;
        this.params.campusID = this.xiangxiobj.campusID;
        this.getShoufeiDetailData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
