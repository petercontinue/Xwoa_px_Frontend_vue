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
        <Col span="5" offset="6" style="text-align: right; line-height: 30px">
          <label>选择学生-查询学员班级：</label>
        </Col>
        <Col span="7">
          <Select v-model="params.stuID" filterable placeholder="选择学生" @on-change="changestu">
            <Option v-for="item in allStu" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </Col>
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
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "LookClassBystu",
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
        stuID: 0,
      },
      allStu: [],
      columns6: [
        {
          title: "班级编号",
          key: "classID",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiClassID == null) {
              state = params.row.classID;
            } else {
              state = params.row.zidingyiClassID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "班级名称",
          key: "className",
          align: "center",
        },
        {
          title: "课程类别",
          key: "kechengName",
          align: "center",
        },
        {
          title: "是否显示",
          key: "isShow",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.isShow) {
              case "1":
                state = "启用";
                break;
              case "0":
                state = "未启用";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
      ],
    };
  },
  methods: {
    getClassToListStu() {
      api.get("xwcloud-stu/stu/stuClass/getClassToStu",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.haveShow = true;
        }
      });
    },

    changestu() {
      this.getClassToListStu();
    },

    getallstuList() {
      api.get("xwcloud-caiwu/caiwu/pxtuifeitable/getallstu",{ menuID: 231 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStu = res.obj;
          console.log(res);
        }
      });
    },
    ok() {
      // this.closeModal(false);
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
      this.params.stuID = 0;
      this.haveShow = false;
      this.data = [];
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.getallstuList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
