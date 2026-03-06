<template>
  <Modal
    v-model="show"
    title="修改学费、课时"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    width="60"
    @on-cancel="closeModal(false)"
  >
    <div style="margin: 30px 0px">
      <label>
        <font color="red">注意：此功能可能导致数据问题，请谨慎使用或联系客服！</font>
      </label>
      <br />
    </div>

    <Row>
      <Col span="24">
        <label>校区：{{ sscampusName }},</label> &nbsp;&nbsp;&nbsp;&nbsp;
        <label>学号：{{ ssstuID }},</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <label>学员：{{ ssstuName }},</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <label>剩余学费：{{ ssremainXuefei }}</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <Checkbox v-model="single">是否修改学费</Checkbox>
      </Col>
    </Row>

    <Row v-if="single" style="margin-top: 10px">
      <Col span="24">
        <Input v-model="newMoney" placeholder="请输入学费" style="width: 150px; margin: 5px" />
        <Button @click="editXF" type="success">保存学费</Button>
      </Col>
    </Row>

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
  name: "editkeshiandmon",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    eddata: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      data: [], // 接口数据接收
      single: false,
      getData: JSON,
      //双向数据
      sscampusName: "",
      ssstuID: "",
      ssstuName: "",
      ssremainXuefei: 0,

      //修改剩余课时
      buxiID: "",
      ksnum: 0,
      //修改剩余学费
      newMoney: "",

      total: 0,
      params: {
        current: 1,
        size: 10,
        stuID: "",
      },
      columns6: [
        {
          title: "科目",
          key: "subjectName",
          align: "center",
          width: 150,
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "原单价",
          key: "oldPrice",
          align: "center",
          width: 100,
        },
        {
          title: "现单价",
          key: "kechengprice",
          align: "center",
          width: 100,
        },
        {
          title: "剩余课时",
          key: "remainkeshi",
          align: "center",
          width: 100,
        },
        {
          title: "修改的值",
          key: "kaoqingStyle",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h("Input", {
                props: {
                  value: params.row.remainkeshi,
                  type: "number",
                },
                on: {
                  input: (val) => {
                    if (val == "") {
                      this.$Message.error("请输入修改后的剩余课时数");
                    } else {
                      this.ksnum = val;
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "操作",
          key: "kaoqingStyle",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.clicksave(params.row.id);
                    },
                  },
                },
                "保存"
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

    UpdatekeshiAndXFList() {
      api.get("xwcloud-pkxk/kehao/ClassRecord/UpdatekeshiAndXFPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
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
      this.UpdatekeshiAndXFList();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.UpdatekeshiAndXFList();
    },
    /**修改保存剩余课时 */
    clicksave(index) {
      if (this.ksnum == "") {
        this.$Message.error("请输入修改后的剩余课时数");
      } else {
        api.post("xwcloud-pkxk/kehao/ClassRecord/updateRemainKs",{ buxiID: index, newKS: this.ksnum }).then(
          (res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("修改成功");
              this.UpdatekeshiAndXFList();
              this.ksnum = "";
            } else {
              this.$Message.error(res.msg);
            }
          }
        );
      }
    },
    /**修改剩余学费 */
    editXF() {
      if (this.newMoney == "") {
        this.$Message.error("请输入修改后的剩余学费");
      } else {
        api.post("xwcloud-pkxk/kehao/ClassRecord/updateRemainXF",{ stuID: this.ssstuID, newXF: this.newMoney }).then(
          (res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("修改成功");
              this.UpdatekeshiAndXFList();
              this.newMoney = "";
            } else {
              this.$Message.error(res.msg);
            }
          }
        );
      }
    },

    /**
     * 初始化页面
     */
    mounted: function () {
      this.UpdatekeshiAndXFList();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      this.ssstuID = "";
      this.sscampusName = "";
      this.ssstuName = "";
      this.ssremainXuefei = "";

      if (val) {
        this.getData = JSON.parse(this.eddata);
        console.log(this.getData);

        this.params.stuID = this.getData.stuID;
        this.ssstuID = this.getData.stuID;
        this.sscampusName = this.getData.campusName;
        this.ssstuName = this.getData.stuName;
        this.ssremainXuefei = this.getData.remainXuefei;

        this.UpdatekeshiAndXFList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
