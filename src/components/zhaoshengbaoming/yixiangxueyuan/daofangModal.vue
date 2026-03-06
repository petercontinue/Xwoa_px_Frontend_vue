<template>
  <Modal
    v-model="isShow"
    title="到访"
    :footer-hide="true"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Row>
      <Col span="24">
        <Form ref="daofang" :model="daofangFrom" :label-width="115">
          <Row>
            <Col span="23">
              <FormItem
                label="备注"
                prop="daofangtext"
                :rules="{
                  required: true,
                  message: '请输入邀约备注',
                  trigger: 'change',
                }"
              >
                <Input
                  v-model="daofangFrom.daofangtext"
                  type="textarea"
                  placeholder="请输入邀约备注"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="9">
              <FormItem
                label="到访时间"
                prop="daofangDatetime"
                :rules="{
                  required: true,
                  message: '请选择到访时间',
                  trigger: 'change',
                  type: 'date',
                }"
              >
                <DatePicker
                  type="datetime"
                  placeholder="请选择到访时间"
                  style="width: 100%"
                  v-model="daofangFrom.daofangDatetime"
                  :editable="false"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" push="1">
              <Button type="primary" @click="submitFrom" :loading="loading"
                >提交</Button
              >
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Table
          ref="daofangTable"
          :columns="daofangColumn"
          :data="daofangList"
          @on-selection-change="clickRow"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="edit(row, index)"
              >编辑</Button
            >
            <Button type="error" size="small" @click="remove(row)"
              >删除到访</Button
            >
          </template>
        </Table>
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
      </Col>
    </Row>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
import * as api from "@/api/api.js";

export default {
  name: "daofangModal",
  props: {
    value: { default: false, type: Boolean },
    stuID: { default: "", type: String },
  },
  data() {
    return {
      isShow: this.value,
      total: 0,
      loading: false,
      daofangColumn: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "姓名",
          align: "center",
          key: "stuName",
          // width: 120,
        },
        {
          title: "性别",
          align: "center",
          key: "stuSex",
          // width: 120,
        },
        {
          title: "年级",
          align: "center",
          key: "stuGradeName",
        },
        {
          title: "校区",
          align: "center",
          key: "campusName",
        },
        {
          title: "邀约时间",
          align: "center",
          key: "invitationTime",
        },
        {
          title: "邀约结果",
          align: "center",
          key: "invitationZhuangtai",
          render(h, { row }) {
            let returnStr = "";
            switch (row.invitationZhuangtai) {
              case "1":
                returnStr = "已邀约";
                break;
              case "2":
                returnStr = "爽约";
                break;
              case "3":
                returnStr = "已到访";
                break;
            }
            return h("div", returnStr);
          },
        },
        {
          title: "到访时间",
          align: "center",
          key: "daofangDatetime",
        },
        {
          title: "备注说明",
          align: "center",
          key: "daofangtext",
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 150,
        },
      ],
      daofangList: [],
      searchData: {
        size: 10,
        current: 1,
        stuID: null,
      },
      daofangFrom: {
        id: null,
        stuID: null,
        inviteID: null,
        daofangDatetime: null,
        daofangtext: null,
      },
      selection: [],
    };
  },
  computed: {},
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    getStuInvitationFaofangList() {
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getStuInvitationDaofangRecordsPages",this.searchData).then((res) => {
        this.daofangList = res.obj.records;
        this.total = Number(res.obj.total);
        this.$refs.daofangTable.selectAll(false);
      });
    },
    submitFrom() {
      this.$refs.daofang.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.selection.length <= 1) {
            if (this.selection.length == 1) {
              this.daofangFrom.inviteID = this.selection[0].invitationID;
            }
            api.post("xwcloud-zsbm/yxstu/YixiangStu/saveYxStuDaofangInfo",this.daofangFrom).then((res) => {
              if (res.success) {
                this.$Message.success(res.msg);
                this.daofangFrom.id = null;
                this.$refs.daofang.resetFields();
                setTimeout(() => {
                  this.$refs.daofang.resetFields();
                }, 20);
                this.getStuInvitationFaofangList();
                this.loading = false;
              } else {
                this.loading = false;
                this.$Message.error(res.msg);
              }
            });
          } else {
            this.$Message.warning("对已有邀约设置到访请选择一个否则不选");
          }
        } else {
          this.$Message.error("请完善信息!");
        }
      });
    },
    edit(row, index) {
      console.log(row);
      if (row.daofangtext == null && row.daofangDatetime == null) {
        this.$Message.error("没有到访信息，不能编辑！");
      } else {
        this.$refs.daofangTable.toggleSelect(index);
        this.daofangFrom.id = row.id;
        this.daofangFrom.inviteID = row.invitationID;
        this.daofangFrom.daofangDatetime = row.daofangDatetime;
        this.daofangFrom.daofangtext = row.daofangtext;
      }
    },
    remove(row) {
      if (row.daofangtext != null || row.daofangDatetime != null) {
        api.del("xwcloud-zsbm/yxstu/YixiangStu/deleteYxStuDaofang/"+row.id,{}).then((res) => {
          if (res.success) {
            this.$Message.success("操作成功");
            this.getStuInvitationFaofangList();
          } else {
            this.$Message.error("操作失败");
          }
        });
      } else {
        this.$Message.error("没有到访信息，无法删除");
      }
    },
    clickRow(selection) {
      this.selection = selection;
    },
    changePage(current) {
      this.searchData.current = current;
      this.getStuInvitationFaofangList();
    },
    changePageSize(pageSize) {
      this.searchData.size = pageSize;
      this.getStuInvitationFaofangList();
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs.daofang.resetFields();
        setTimeout(() => {
          this.$refs.daofang.resetFields();
        }, 10);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    stuID(val) {
      if (val) {
        this.daofangFrom.stuID = val;
        this.searchData.stuID = val;
        this.getStuInvitationFaofangList();
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>