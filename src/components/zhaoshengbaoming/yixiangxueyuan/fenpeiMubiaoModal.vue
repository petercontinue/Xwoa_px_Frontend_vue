<template>
  <Modal
    v-model="isShow"
    title="目标分配"
    :footer-hide="true"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Row>
      <Col span="4">
        <Divider>校区</Divider>
        <div style="text-align: center">{{ rowData.campusName }}</div>
        <Divider>年月</Divider>
        <div style="text-align: center">{{ rowData.yearMonth }}</div>
        <Divider>其他信息</Divider>
        <div>总目标：{{ rowData.monthMoney }}</div>
        <div>已分配：{{ yifenpei }}</div>
        <div>未分配：{{ rowData.monthMoney - yifenpei }}</div>
      </Col>
      <Col span="20">
        <Form ref="modalForm" :model="formData" :label-width="100">
          <Row :gutter="16">
            <Col span="8">
              <FormItem
                label="员工"
                prop="staffID"
                :rules="{
                  required: true,
                  message: '选择员工',
                }"
              >
                <Select
                  clearable
                  filterable
                  v-model="formData.staffID"
                  placeholder="选择员工"
                >
                  <Option
                    v-for="staff in staffByCampusIDList"
                    :key="staff.id"
                    :value="staff.id"
                    >{{ staff.staffName }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="月业绩目标"
                prop="monthMoney"
                :rules="{
                  required: true,
                  message: '请填写月业绩目标',
                  type: 'number',
                }"
              >
                <Input-number
                  v-model="formData.monthMoney"
                  :min="0.01"
                  :step="1"
                  placeholder="请填写月业绩目标"
                  style="width: 100%"
                ></Input-number>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem
                label="月人数目标"
                prop="monthSum"
                :rules="{
                  required: true,
                  message: '请填写月人数目标',
                  type: 'number',
                }"
              >
                <Input-number
                  v-model="formData.monthSum"
                  :min="0"
                  :step="1"
                  :precision="0"
                  placeholder="请填写月人数目标"
                  style="width: 100%"
                ></Input-number>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="16" style="margin-bottom: 30px">
            <Col span="3" push="1">
              <Button
                type="primary"
                @click="submitForm"
                :loading="loading"
                style="width: 100%"
                >提交</Button
              >
            </Col>
            <Col span="3" push="1">
              <Button type="error" @click="closeFormData" style="width: 100%"
                >重置</Button
              >
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span="23" push="1">
            <Table :columns="Column" :data="tableData">
              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="edit(row)"
                  >编辑</Button
                >
                <Button type="error" size="small" @click="remove(row)"
                  >删除</Button
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
      </Col>
    </Row>
  </Modal>
</template>

<script>
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import * as api from "@/api/api.js";

export default {
  name: "fenpeiMubiaoModal",
  props: {
    value: { default: false, type: Boolean },
    staffList: { default: [], type: Array },
    rowData: { default: {}, type: Object },
  },
  components: {
    inputsearchForm,
  },
  data() {
    return {
      isShow: this.value,
      loading: false,
      total: 0,
      Column: [
        {
          title: "员工",
          align: "center",
          key: "staffName",
          // width: 120,
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  content: "员工",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.searchObj.staffName = value;
                    this.getStaffMubiaoList();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "月业绩目标",
          align: "center",
          key: "monthMoney",
          // width: 120,
        },
        {
          title: "月目标人数",
          align: "center",
          key: "monthSum",
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 150,
        },
      ],
      tableData: [],
      searchData: {
        size: 10,
        current: 1,
        campusID: null,
        yearMonth: null,
        staffName: null,
      },
      formData: {
        id: null,
        campusID: null,
        yearMonth: null,
        staffID: null,
        monthMoney: null,
        monthSum: null,
      },
    };
  },
  computed: {
    yifenpei() {
      let yfpMoney = 0;
      if (this.tableData) {
        this.tableData.forEach((element) => {
          yfpMoney += Number(element.monthMoney);
        });
      }
      return yfpMoney;
    },
    staffByCampusIDList() {
      return this.staffList.filter((val) => {
        return val.campusID == this.rowData.campusID ? true : false;
      });
    },
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    edit(row) {
      // console.log("edit", row);
      this.formData = {
        id: row.id,
        campusID: this.rowData.campusID,
        yearMonth: row.yearMonth,
        staffID: row.staffID,
        monthMoney: row.monthMoney,
        monthSum: row.monthSum,
      };
    },
    remove(row) {
      // console.log("remove", row);
      this.$Modal.confirm({
        title: "您正在进行删除操作",
        content: "<p>确定要删除吗</p>",
        loading: true,
        onOk: () => {
          api.del("xwcloud-zsbm/yxstu/YixiangStu/deleteStaffMubiao/"+row.id,{}).then((res) => {
            if (res.success) {
              this.$Message.success("操作成功");
              this.$emit("refresh");
              this.getStaffMubiaoList();
            } else {
              this.$Message.error("操作失败");
            }
            this.$Modal.remove();
          });
        },
        onCancel: () => {},
      });
    },
    getStaffMubiaoList() {
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getStaffMubiaoPages",this.searchData).then((res) => {
        // console.log(res);
        if (res.code == "success") {
          this.tableData = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    submitForm() {
      // return;
      this.$refs.modalForm.validate((valid) => {
        if (valid) {
          console.log(this.formData);
          // return;
          this.loading = true;
          api.post("xwcloud-zsbm/yxstu/YixiangStu/addOrEditStaffMubiao",this.formData).then((res) => {
            // console.log(res);
            if (res.success) {
              this.$Message.success(res.msg);
              this.formData.id = null;
              this.$refs.modalForm.resetFields();
              setTimeout(() => {
                this.$refs.modalForm.resetFields();
              }, 20);
              this.$emit("refresh");
              this.getStaffMubiaoList();
              this.loading = false;
            } else {
              this.loading = false;
              if (res.code == "isct") {
                this.$Modal.error({
                  title: "提示",
                  content: res.msg,
                });
              } else {
                this.$Message.error(res.msg);
              }
            }
          });
        } else {
          this.$Message.error("请完善信息!");
        }
      });
    },
    changePage(current) {
      this.searchData.current = current;
      this.getStaffMubiaoList();
    },
    changePageSize(pageSize) {
      this.searchData.size = pageSize;
      this.getStaffMubiaoList();
    },
    closeFormData() {
      this.formData.id = null;
      this.formData.staffID = null;
      this.formData.monthMoney = null;
      this.formData.monthSum = null;
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs.modalForm.resetFields();
        setTimeout(() => {
          this.$refs.modalForm.resetFields();
        }, 10);
        this.formData.id = null;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    rowData(val) {
      if (val) {
        this.formData.campusID = val.campusID;
        this.formData.yearMonth = val.yearMonth;
        this.searchData.campusID = val.campusID;
        this.searchData.yearMonth = val.yearMonth;
        this.getStaffMubiaoList(this.searchData);
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>