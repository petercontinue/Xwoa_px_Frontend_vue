<template>
  <Modal
    v-model="isShow"
    :title="title"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="40"
  >
    <Form ref="zsmubaio" :model="formData" :label-width="100">
      <Row :gutter="16">
        <Col span="12">
          <FormItem
            label="校区"
            prop="campusID"
            :rules="{
              required: true,
              message: '请选择校区',
            }"
          >
            <Select
              clearable
              filterable
              v-model="formData.campusID"
              placeholder="请选择校区"
            >
              <Option v-for="item in campusList" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            label="年月"
            prop="yearMonth"
            :rules="{
              required: true,
              message: '请选择年月',
              type: 'date',
            }"
          >
            <Date-picker
              v-model="formData.yearMonth"
              type="month"
              placeholder="选择年月"
              style="width: 100%"
              :editable="false"
            ></Date-picker>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="12">
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
              :min="0"
              :step="0.01"
              placeholder="请填写月业绩目标"
              style="width: 100%"
            ></Input-number>
          </FormItem>
        </Col>
        <Col span="12">
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
    </Form>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
import * as api from "@/api/api.js";
export default {
  name: "addOrEditZsMubiaoModal",
  props: {
    value: { default: false, type: Boolean },
    title: { default: "", type: String },
    campusList: { default: [], type: Array },
    modalData: { default: null, type: Object },
  },
  data() {
    return {
      isShow: this.value,
      loading: true,
      formData: {
        id: null,
        campusID: null,
        yearMonth: null,
        monthMoney: null,
        monthSum: null,
      },
    };
  },
  computed: {},
  methods: {
    closeModal(val) {
      this.formData.id = null;
      this.$emit("input", val);
    },
    ok() {
      this.$refs.zsmubaio.validate((valid) => {
        // console.log(valid)
        if (valid) {
          // console.log("提交", this.formData);
          let tempDate = new Date(this.formData.yearMonth);
          this.formData.yearMonth =
            tempDate.getFullYear() +
            "-" +
            (tempDate.getMonth() + 1 < 10
              ? "0" + (tempDate.getMonth() + 1)
              : tempDate.getMonth() + 1);
          api
            .post("xwcloud-zsbm/yxstu/YixiangStu/saveCampusMubiao", this.formData)
            .then((res) => {
              if (res.success) {
                this.$Message.success(res.msg);
                this.closeModal(false);
                this.$emit("refresh");
              } else {
                this.$Message.error(res.msg);
                this.formData.yearMonth = tempDate;
                this.loading = false;
                this.$nextTick(() => {
                  this.loading = true;
                });
              }
            });
        } else {
          this.$Message.error("请完善信息");
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }
      });
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val && this.title == "添加") {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs.zsmubaio.resetFields();
        setTimeout(() => {
          this.$refs.zsmubaio.resetFields();
        }, 10);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    modalData(val) {
      if (val) {
        this.formData = {
          id: val.id,
          campusID: val.campusID,
          yearMonth: val.yearMonth,
          monthMoney: Number(val.monthMoney),
          monthSum: Number(val.monthSum),
        };
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
