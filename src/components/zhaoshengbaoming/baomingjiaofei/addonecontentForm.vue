<template>
  <Modal
    v-model="show"
    title="添加一次课程内容"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="第几次课" prop="contentPaixu">
        <Input
          type="number"
          :maxlength="50"
          v-model="shezhiForm.contentPaixu"
          placeholder="请输入第几次课"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="课程内容" prop="kechengContent">
        <Input
          type="textarea"
          :maxlength="500"
          v-model="shezhiForm.kechengContent"
          placeholder="请输入课程内容"
          style="width: 100%"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    kechengID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        contentPaixu: 0,
        kechengContent: "",
      },
      shezhiFormRule: {
        contentPaixu: [
          {
            required: true,
            message: "请输入课程次数",
            trigger: "change",
            type: "string",
          },
        ],
        kechengContent: [
          {
            required: true,
            message: "请输入课程内容",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
      allcishu: [],
      allkcContent: [],
    };
  },
  methods: {
    ok() {
      api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/addyiciKechengContent",{
        kechengID: this.kechengID,
        contentPaixu: this.shezhiForm.contentPaixu,
        kechengContent: this.shezhiForm.kechengContent,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
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
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shezhiForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
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
