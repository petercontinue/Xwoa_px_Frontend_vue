<template>
  <Modal v-model="show" title="修改年级名称" :mask-closable="false" width="50">
    <Form
      ref="stugradeForm"
      :model="stugradeForm"
      :rules="stugradeFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="年级/年龄段" prop="stugrade">
        <input
          type="text"
          placeholder="请输入年级/年龄段"
          v-model="stugradeForm.stugrade"
          style="width: 100%"
        />
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok">保存</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "updateStugradeInfo",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdataID: {
      type: String,
    },
    stugrade: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      stugradeForm: {
        stugrade: "",
        id: "",
      },
      stugradeFormRule: {
        stugrade: [{ required: true, message: "请输入年级/年龄段", trigger: "blur" }],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["stugradeForm"].validate((valid) => {
        if (valid) {
          console.log(this.stugradeForm),
          api.post("/xwcloud-sys/sys/SystemSetting/updateStugrade",{
              id: this.stugradeForm.id,
              stuGradeName: this.stugradeForm.stugrade,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
                // 官方目前没有解决方案
                this.loading = false;
                setTimeout(() => {
                  this.loading = true;
                }, 0);
              }
            });
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
        this.$refs["stugradeForm"].resetFields();
        console.log(this.editdataID);
        console.log(this.stugrade);
        this.stugradeForm.id = this.editdataID;
        this.stugradeForm.stugrade = this.stugrade;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
