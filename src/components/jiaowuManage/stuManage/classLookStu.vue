<template>
  <Modal
    v-model="show"
    title="班级详情"
    @on-ok="ok"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <div>
      <Row>
        <Col span="4" offset="7" style="text-align: right; line-height: 30px">
          <label>先选择班级：</label>
        </Col>
        <Col span="6">
          <Select
            v-model="params.classID"
            placeholder="请选择班级"
            @on-change="changeclassID"
          >
            <Option v-for="item in allclass" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select></Col
        >
      </Row>
    </div>
    <div v-if="haveShow">
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
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
export default {
  name: "classLookStu",
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
      haveShow: false,
      data: [], // 接口数据接收
      total: 0,
      params: {
        current: 1,
        size: 10,
        classID: 0,
      },
      allclass: [],
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
          title: "电话",
          key: "parentTel",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getAllClass", "AsClassTOStuPage"]),

    AsClassTOStuListPage() {
      this.AsClassTOStuPage(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.haveShow = true;
        }
      });
    },
    changeclassID() {
      this.AsClassTOStuListPage();
    },
    getAllClassList() {
      this.getAllClass({}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allclass = res.obj;
        }
      });
    },
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.AsClassTOStuListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.AsClassTOStuListPage();
    },
  },
  watch: {
    value(val) {
      this.show = val;
      this.params.classID = 0;
      this.haveShow = false;
      this.data = [];
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.getAllClassList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
