<template>
  <Modal
    v-model="show"
    title="删除所有排课"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="40"
  >
    <Form
      ref="addliushuiForm"
      :label-width="130"
      :label-colon="true"
    >
      <RadioGroup v-model="deltype" vertical>
        <Radio label="1">
          <Icon type="social-apple"></Icon>
          <span
            >删除同一批次无课耗排课（将删除与选中排课同一次循环排出来的排课）</span
          >
        </Radio>
        <Radio label="2">
          <Icon type="social-android"></Icon>
          <span>
            删除同一班级同一时间无课耗段排课（将删除与选中排课相同的班级，相同的时间段的所有排课）</span
          >
        </Radio>
        <Radio label="3">
          <Icon type="social-windows"></Icon>
          <span
            >删除同一班级无课耗排课（将删除与选中排课相同的班级的所有排课）</span
          >
        </Radio>
      </RadioGroup>
      <Row
        ><span style="color: red"
          >将删除没有课耗记录的排课，存在课耗记录的排课将保留！</span
        ></Row
      >
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
    paikeData: { type: String },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      deltype: "1",
    };
  },
  methods: {
    ok() {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除所有排课？</p>",
        onOk: () => {
          api.del("xwcloud-pkxk/paike/paikexiaoke/DelAllpaike",{
            oldkechengID:JSON.parse(this.paikeData).kechengID,
            oldclassID:JSON.parse(this.paikeData).classID,
            classRooID:JSON.parse(this.paikeData).classRoomID,
            oldteaID:JSON.parse(this.paikeData).teacherIDs,
            tstrDate:JSON.parse(this.paikeData).startLessonDateTime,
            tendDate:JSON.parse(this.paikeData).endLessonDateTime,
            deltype:this.deltype,
            tags:JSON.parse(this.paikeData).tags,
          }).then((result) => {
              console.log(result);
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
        console.log(JSON.parse(this.paikeData));
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
