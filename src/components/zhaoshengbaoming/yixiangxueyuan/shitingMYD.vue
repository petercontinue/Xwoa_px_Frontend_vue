<template>
  <Modal
    v-model="isShow"
    title="插班试听"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form ref="manyidu" :model="manyiduForm" :label-width="100" label-position="left">
      <Row :gutter="16">
        <Col span="24">
          <FormItem
            label="试听满意度"
            prop="shiTingManyiduID"
            :rules="{ required: true, message: '请选择试听满意度' }"
          >
            <Select
              placeholder="请选择试听满意度"
              clearable
              filterable
              v-model="manyiduForm.shiTingManyiduID"
            >
              <Option value="1">不明确</Option>
              <Option value="2">很不满意</Option>
              <Option value="3">不满意</Option>
              <Option value="4">基本满意</Option>
              <Option value="5">很满意</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col span="24">
          <FormItem
            label="满意度说明"
            prop="shiTingShuoming"
            :rules="{ required: true, message: '请输入满意度说明' }"
          >
            <Input
              v-model="manyiduForm.shiTingShuoming"
              placeholder="请输入满意度说明"
              type="textarea"
            ></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="manyiduSubmit">提交满意度</Button>
      <Button type="error" @click="closeFormManyidu">重置</Button>
    </div>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "shitingMYD",
  props: {
    value: { default: false, type: Boolean },
    mydid: { default: "", type: String },
  },
  data() {
    return {
      isShow: this.value,
      manyiduForm: {
        id: null,
        shiTingManyiduID: null,
        shiTingShuoming: null,
      },
    };
  },
  computed: {
    paikeListComputed() {
      return this.paikeList.map((val) => {
        let value =
          toolbox.dateFtt(val.haveClassDate, "yyyy-MM-dd") +
          " " +
          val.startLessonDateTime +
          ":" +
          val.endLessonDateTime +
          " " +
          val.teacherNames;
        return { id: val.id, value: value };
      });
    },
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    manyiduSubmit() {
      this.$refs.manyidu.validate((valid) => {
        if (valid) {
          this.manyiduLoading = true;
          api
            .post("xwcloud-zsbm/yxstu/YixiangStu/saveShitingManyidu", this.manyiduForm)
            .then((res) => {
              if (res.success) {
                this.$Message.success("操作成功");
                this.$emit("handleSearch");
                this.$refs.manyidu.resetFields();
                this.manyiduForm.id = null;
                this.closeModal();
              } else {
                this.$Message.error("操作失败");
              }
              this.manyiduLoading = false;
            });
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },
    closeFormManyidu() {
      this.manyiduForm = {
        id: null,
        shiTingManyiduID: null,
        shiTingShuoming: null,
      };
      this.$refs.shitingTable.selectAll(false);
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        console.log(this.mydid);
        this.manyiduForm.id = this.mydid;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
