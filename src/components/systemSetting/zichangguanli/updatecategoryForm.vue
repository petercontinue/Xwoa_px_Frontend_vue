<template>
  <Modal
    v-model="show"
    title="修改固定资产类别"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="固定资产类别" prop="assetsName">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.assetsName"
          placeholder="请输入固定资产类别"
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
  name: "updategudingzichan",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        id: "",
        assetsName: "",
        qiyeID: "",
      },
      shezhiFormRule: {
        assetsName: [
          {
            required: true,
            message: "请输入资产类别名称",
            trigger: "change",
            type: "string",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      api.post("/xwcloud-sys/sys/pxassets/updateAssetStyle",{
        id: this.shezhiForm.id,
        assetsName: this.shezhiForm.assetsName,
        qiyeID: this.shezhiForm.qiyeID,
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
      setTimeout(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 1000);
    },
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
        this.shezhiForm = JSON.parse(this.editData);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>

