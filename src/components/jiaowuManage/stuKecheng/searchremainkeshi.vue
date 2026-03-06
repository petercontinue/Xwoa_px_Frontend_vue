<template>
  <Modal
    v-model="show"
    title="按剩余课时查询"
    @on-ok="ok"
    :mask-closable="false"
    width="40"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" label-position="right" :label-width="140">
      <Row>
        <Col span="12">
          <FormItem label="剩余课时">
            <RadioGroup v-model="logForm.type">
              <Radio label="1">大于</Radio>
              <Radio label="2">小于</Radio>
            </RadioGroup>
          </FormItem></Col
        >
        <Col span="12">
          <FormItem>
            <Input
              v-model="logForm.keshi"
              type="number"
              placeholder="请输入课时数"
              @on-change="changekeshibtw"
            /> </FormItem
        ></Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="剩余课时(从小到大)">
            <Input
              v-model="logForm.maxkeshi"
              type="number"
              placeholder="请输入课时数"
              @on-change="changekeshitype"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="至">
            <Input
              v-model="logForm.minkeshi"
              type="number"
              placeholder="请输入课时数"
              @on-change="changekeshitype"
            /> </FormItem
        ></Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok()">查询</Button>
      <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  name: "searchremainkeshi",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        maxkeshi: "",
        minkeshi: "",
        keshi: "",
        type: "1",
      },
    };
  },
  methods: {
    ok() {
      this.$emit("increment", JSON.stringify(this.logForm));
      this.handleReset();
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changekeshibtw() {
      this.logForm.maxkeshi = "";
      this.logForm.minkeshi = "";
    },
    changekeshitype() {
      this.logForm.keshi = "";
      if (Number(this.logForm.maxkeshi) < Number(this.logForm.minkeshi)) {
        this.logForm.maxkeshi = "";
        this.logForm.minkeshi = "";
        this.$Message.error("请按小到大的课时数输入！！！");
      }
    },

    handleReset() {
      this.logForm.maxkeshi = "";
      this.logForm.minkeshi = "";
      this.logForm.keshi = "";
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.$refs["logForm"].resetFields();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
