<template>
  <Modal
    v-model="show"
    title="日志管理"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="日志内容：" prop="logContent">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="logForm.logContent"
          placeholder="请输入日志内容"
        />
      </FormItem>
      <FormItem label="日志图片：">
        <uploadimg-form @increment="changeImgs"></uploadimg-form>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import uploadimgForm from "../../components/common-buttons/uploadimgForm";
import * as api from "@/api/api.js";

export default {
  components: {
    uploadimgForm,
  },
  name: "addlog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      logForm: {
        logContent: "",
      },
      logFormRule: {
        logContent: [
          { required: true, message: "请输入日志内容", trigger: "blur" },
        ],
      },
      staffpostDate: [],
      allcampusData: [],
      imgurl: "",
    };
  },
  methods: {
    ok(closetype) {
      api.post("/xwcloud-sys/sys/StaffManagement/AddWorkdayRecord",{
        staffID: "",
        LogDate: "",
        LogContent: this.logForm.logContent,
        ImgsUrl: this.imgurl,
        qiyeID: "",
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          if (closetype == 2) {
            // 提交表单数据成功则关闭当前的modal框
            this.closeModal(false);
          }
          this.$refs["logForm"].resetFields();
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
    },
    changeImgs(data) {
      console.log(JSON.parse(data)[0].url);
      this.imgurl = JSON.parse(data)[0].url;
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
