<template>
  <Modal
    v-model="show"
    title="修改公告"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="weizuoyeFrom"
      :model="params"
      :rules="paramsRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="公告内容" prop="parameterContent">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="200"
          v-model="params.parameterContent"
          placeholder="请输入内容"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "editjiazhangweigonggaoForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    gonggaoID: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        id: "",
        parameterContent: ""
      },
      paramsRule: {
        // 验证输入
        parameterContent: [
          { required: true, message: "输入公告内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["weizuoyeFrom"].validate((valid) => {
        if (valid) {
          // 点击确定按钮时调用
          api.get("xwcloud-homeschool/homeschool/pxjiazhanggonggao/editPxjiazhanggonggao",this.params).then((res) => {
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
        } else {
          this.$Message.error("请检查数据是否填对!");
        }
      });
    },
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
        this.$refs["weizuoyeFrom"].resetFields();
        this.params.id = this.gonggaoID;
        api.get("xwcloud-homeschool/homeschool/pxjiazhanggonggao/getPxjiazhanggonggao",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.params.parameterContent = res.obj.parameterContent;
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
