<template>
  <Modal
    v-model="show"
    title="按时间段删除排课"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Form
      ref="addliushuiForm"
      :model="params"
      :rules="paramsRule"
      :label-width="130"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="开始日期" prop="startDate">
            <DatePicker
              type="date"
              placeholder="选择开始日期"
              v-model="params.startDate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="开始时间" prop="startTime">
            <TimePicker
              type="time"
              placeholder="选择开始时间"
              v-model="params.startTime"
              style="width: 100%"
              format="HH:mm"
            ></TimePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="结束日期" prop="endDate">
            <DatePicker
              type="date"
              placeholder="选择结束日期"
              v-model="params.endDate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="结束时间" prop="endTime">
            <TimePicker
              type="time"
              placeholder="选择结束时间"
              v-model="params.endTime"
              style="width: 100%"
              format="HH:mm"
            ></TimePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "searchteacher",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      },
      paramsRule: {
        // 验证输入
        startDate: [
          {
            required: true,
            message: "请选择开始日期",
            trigger: "blur",
            type: "date",
          },
        ],
        endDate: [
          {
            required: true,
            message: "请选择结束日期",
            trigger: "blur",
            type: "date",
          },
        ],
        startTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "blur",
            type: "time",
          },
        ],
        endTime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "blur",
            type: "time",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该时段的所有排课？</p>",
        onOk: () => {
          api
            .del("xwcloud-pkxk/paike/paikexiaoke/DeletDateTimePaike", {
              startDate: toolbox.dateFtt(this.params.startDate, "yyyy-MM-dd"),
              startTime: this.params.startTime,
              endDate: toolbox.dateFtt(this.params.endDate, "yyyy-MM-dd"),
              endTime: this.params.endTime,
            })
            .then((res) => {
              console.log(res);
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("排课删除成功");
                this.closeModal(false);
                this.$emit("handleSearch");
              } else {
                this.$Message.error("删除排课失败");
              }
            });
        },
        onCancel: () => {},
      });
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    getstuList() {
      console.log(888);
    },
    changePage(current) {
      this.current = current;
      this.getstuList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getstuList();
    },
    onSearch(search) {
      window.console.log(search);
    },
    searchTeacher() {
      this.$refs["addliushuiForm"].validate((valid) => {
        if (valid) {
          this.getstuList();
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
        }
      });
    },
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
        this.$refs["addliushuiForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus", {}).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.campusData = res.obj;
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
