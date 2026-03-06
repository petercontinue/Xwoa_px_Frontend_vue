<template>
  <Modal
    v-model="show"
    title="流水详细"
    footer-hide
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    :width="50"
  >
    <Form
      ref="editliushuiForm"
      :model="data"
      :rules="paramsRule"
      :label-width="120"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="流水号" prop="campusID">
            <Input v-model="data.id" placeholder="请输入金额" readonly /> </FormItem
        ></Col>
        <Col span="12">
          <FormItem label="流水时间" prop="campusID">
            <Input
              v-model="data.liushuiDateTimef"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Input
              v-model="data.campusName"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
        <Col span="12">
          <FormItem label="付款方式" prop="campusID">
            <Input
              v-model="data.moneystyleName"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="收支分类" prop="campusID">
            <Input
              v-model="data.shouzhiStyle"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
        <Col span="12">
          <FormItem label="经办人" prop="campusID">
            <Input
              v-model="data.staffName"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="借方(收入)" prop="campusID">
            <Input
              v-model="data.shouruMoney"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
        <Col span="12">
          <FormItem label="贷方(支出)" prop="campusID">
            <Input
              v-model="data.zhichuMoney"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="摘要" prop="campusID">
            <Input
              v-model="data.liushuiZaiyao"
              placeholder="请输入金额"
              type="textarea"
              readonly
            /> </FormItem
        ></Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="录入时间" prop="campusID">
            <Input
              v-model="data.luruTimef"
              placeholder="请输入金额"
              readonly
            /> </FormItem
        ></Col>
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
  name: "editliushuiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    liushuiID: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        id: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {},
      data: {},
    };
  },
  methods: {
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
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
        this.params.id = this.liushuiID;
        api.get("xwcloud-caiwu/caiwu/liushui/getLiushui",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj;
            console.log(this.data);
          } else {
            this.$Message.error(res.msg);
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
