<template>
  <Modal
    v-model="show"
    title="添加公告"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
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
    <div slot="footer">
      <Button type="primary" @click="handleSubmit(1)">保存并继续添加</Button>
      <Button type="primary" @click="handleSubmit(2)">保存并关闭</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "addjiazhangweigonggaoForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        parameterContent: "",
      },
      paramsRule: {
        // 验证输入
        parameterContent: [
          { required: true, message: "输入公告内容", trigger: "blur" },
        ],
      },
      allclassData: [], // 班级数据列表
    };
  },
  methods: {
    handleReset() {
      this.$refs["weizuoyeFrom"].resetFields();
      this.closeModal(false);
    },
    handleSubmit(type) {
      this.$refs["weizuoyeFrom"].validate((valid) => {
        if (valid) {
          // 点击确定按钮时调用
          api.post("xwcloud-homeschool/homeschool/pxjiazhanggonggao/addPxjiazhanggonggao",this.params).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.$refs["weizuoyeFrom"].resetFields();
              if (type == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
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
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
