<template>
  <Modal
    v-model="isShow"
    title="邀约"
    :footer-hide="true"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Row>
      <Col span="24">
        <Form ref="yaoyue" :model="yaoyueFrom" :label-width="115">
          <Row>
            <Col span="23">
              <FormItem
                label="备注"
                prop="shuoMing"
                :rules="{
                  required: true,
                  message: '请选择邀约时间',
                  trigger: 'change',
                }"
              >
                <Input
                  v-model="yaoyueFrom.shuoMing"
                  type="textarea"
                  placeholder="请输入邀约备注"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="9">
              <FormItem
                label="邀约状态"
                prop="invitationZhuangtai"
                :rules="{
                  required: true,
                  message: '请选择邀约时间',
                  trigger: 'change',
                }"
              >
                <Select
                  clearable
                  filterable
                  v-model="yaoyueFrom.invitationZhuangtai"
                  placeholder="请选择邀约状态"
                  style="width: 100%"
                >
                  <Option value="1">已邀约</Option>
                  <Option value="2">已爽约</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="9">
              <FormItem
                label="邀约时间"
                prop="invitationTime"
                :rules="{
                  required: true,
                  message: '请选择邀约时间',
                  trigger: 'change',
                  type: 'date',
                }"
              >
                <DatePicker
                  type="datetime"
                  placeholder="请选择邀约时间"
                  style="width: 100%"
                  v-model="yaoyueFrom.invitationTime"
                ></DatePicker>
              </FormItem>
            </Col>

            <Col span="2" push="1">
              <Button type="primary" @click="submitFrom" :loading="loading">提交</Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Table :columns="yaoyueColumn" :data="yaoyueList">
          <template slot-scope="{ row, index }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="edit(row)"
              >编辑</Button
            >
            <Button type="error" size="small" @click="remove(row)">删除</Button>
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
import * as api from "@/api/api.js";

export default {
  name: "yaoyueModal",
  props: {
    value: { default: false, type: Boolean },
    stuID: { default: "", type: String },
  },
  data() {
    return {
      isShow: this.value,
      loading: false,
      total: 0,
      yaoyueColumn: [
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
          key: "shuoMing",
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 150,
        },
      ],
      yaoyueList: [],
      searchData: {
        size: 10,
        current: 1,
        stuID: null,
      },
      yaoyueFrom: {
        id: null,
        stuID: null,
        invitationTime: null,
        invitationZhuangtai: null,
        shuoMing: null,
      },
    };
  },
  computed: {},
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    getStuInvitationList() {
      api
        .get(
          "xwcloud-zsbm/yxstu/YixiangStu/getStuInvitationRecordsPages",
          this.searchData
        )
        .then((res) => {
          this.yaoyueList = res.obj.records;
          this.total = Number(res.obj.total);
        });
    },
    submitFrom() {
      this.$refs.yaoyue.validate((valid) => {
        if (valid) {
          this.loading = true;
          api
            .post(
              "xwcloud-zsbm/yxstu/YixiangStu/addOrUpdateYxStuInvitationInfo",
              this.yaoyueFrom
            )
            .then((res) => {
              if (res.success) {
                this.$Message.success(res.msg);
                this.yaoyueFrom.id = null;
                this.$refs.yaoyue.resetFields();
                setTimeout(() => {
                  this.$refs.yaoyue.resetFields();
                }, 20);
                this.getStuInvitationList();
                this.loading = false;
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
                this.loading = false;
              }
            });
        } else {
          this.$Message.error("请完善信息!");
        }
      });
    },
    edit(row) {
      this.yaoyueFrom.id = row.id;
      this.yaoyueFrom.invitationTime = row.invitationTime;
      this.yaoyueFrom.invitationZhuangtai = row.invitationZhuangtai;
      this.yaoyueFrom.shuoMing = row.shuoMing;
    },
    remove(row) {
      api
        .del("xwcloud-zsbm/yxstu/YixiangStu/deleteStuInvitation/" + row.id, {})
        .then((res) => {
          if (res.success) {
            this.$Message.success("操作成功");
            this.getStuInvitationList();
            this.$emit("handleSearch");
          } else {
            this.$Message.error("操作失败");
          }
        });
    },
    changePage(current) {
      this.searchData.current = current;
      this.getStuInvitationList();
    },
    changePageSize(pageSize) {
      this.searchData.size = pageSize;
      this.getStuInvitationList();
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs.yaoyue.resetFields();
        setTimeout(() => {
          this.$refs.yaoyue.resetFields();
        }, 10);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    stuID(val) {
      if (val) {
        this.yaoyueFrom.stuID = val;
        this.searchData.stuID = val;
        this.getStuInvitationList();
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
