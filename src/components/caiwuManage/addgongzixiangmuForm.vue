<template>
  <Modal
    v-model="show"
    title="工资录入"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="params" :model="params" :rules="paramsRule" :label-width="120" :label-colon="true">
      <FormItem label="工资项目名称" prop="salaryStyle">
        <Tooltip content="工资项目名称，例如：基本工资、岗位工资、课时费、请假扣款、迟到扣款等" style="width: 100%" :max-width="200">
          <Input v-model="params.salaryStyle" placeholder="请输入项目名称" />
        </Tooltip>
      </FormItem>
      <FormItem label="加项/减项" prop="isJiaOrJianOrQiuhe">
        <Tooltip content="加项减项是指系统计算工资总和的时候，是加上该项工资还是减去该项工资" style="width: 100%" :max-width="200">
          <Select v-model="params.isJiaOrJianOrQiuhe" placeholder="请选择">
            <Option v-for="item in jiaxiangjianxiang" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </Tooltip>
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
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "addgongzixiangmuForm",
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
        salaryStyle: "",
        isJiaOrJianOrQiuhe: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        salaryStyle: [
          { required: true, message: "请输入工资项目名称", trigger: "blur" },
        ],
        isJiaOrJianOrQiuhe: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },
      jiaxiangjianxiang: ["加项", "减项"],
    };
  },
  methods: {
    handleSubmit(type) {
      this.$refs["params"].validate((valid) => {
        console.log(valid);
        if (valid) {
          api.post("xwcloud-caiwu/caiwu/pxgongzitable/gongzixiangmu/addGongzixiangmu",this.params).then((res) => {
            if (res.code == "Y" && res.success == true) {
              console.log(res);
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              if (type == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    handleReset() {
      this.$refs["params"].resetFields();
      this.closeModal(false);
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
        this.$refs["params"].resetFields();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
