<template>
  <Modal
    v-model="show"
    title="自定义下拉框下拉选项"
    @on-ok="ok"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addxiala">添加</Button>
        <Button type="success" size="large" @click="editxiala">修改</Button>
        <Button type="warning" size="large" @click="deletexuanxian">删除</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          highlight-row
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
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <editxiala-form
      v-model="showeditxiala"
      :paramsID="paramsID"
      :editData="editData"
      v-on:handleSearch="getstumingdanList"
    ></editxiala-form>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import editxialaForm from "@/components/systemSetting/stusetting/editxialaForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    editxialaForm,
  },
  name: "classStuMD",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    xialaID: { type: String },
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
        stuParamTypeId: "",
      },
      checkList: [],
      columns6: [
        {
          title: " ",
          align: "center",
          key: "checkBox",
          width: 60,
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {
                  "on-change": (e) => {},
                },
              }),
            ]);
          },
        },
        {
          title: "下拉选项",
          key: "dropDownOptions",
          align: "center",
        },
      ],
      showeditxiala: false,
      paramsID: "",
      editdataID: "",
      editData: "",
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

    getstumingdanList() {
      api.get("/xwcloud-sys/sys/SystemSetting/GetOptionsById",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);

          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },
    ok() {
      this.$emit("input", val);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getstumingdanList();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getstumingdanList();
    },
    addxiala() {
      this.editData = "";
      this.showeditxiala = true;
    },
    editxiala() {
      this.editData = "";

      if (this.checkList.length == 0) {
        this.$Message.error("请选择要编辑的数据");
      } else {
        this.editData = JSON.stringify(this.checkList);
        this.showeditxiala = true;
      }
    },
    deletexuanxian() {
      this.editdataID = "";
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除该选项？</p>",
          onOk: () => {
            this.editdataID = this.checkList.id;
            api.del("/xwcloud-sys/sys/SystemSetting/DeleteOptions",{ optionID: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("数据删除成功");
                this.getstumingdanList();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.params.stuParamTypeId = this.xialaID;
        this.paramsID = this.xialaID;
        this.getstumingdanList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
