<template>
  <Modal
    v-model="show"
    title="工资项目录入"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form
      ref="editgongzixiangmuForm"
      :model="params"
      :rules="paramsRule"
      :label-width="120"
      :label-colon="true"
    >
      <FormItem label="工资项目名称" prop="salaryStyle">
        <Tooltip
          content="工资项目名称，例如：基本工资、岗位工资、课时费、请假扣款、迟到扣款等"
          style="width: 100%"
          :max-width="200"
        >
          <Input v-model="params.salaryStyle" placeholder="请输入项目名称" />
        </Tooltip>
      </FormItem>
      <FormItem label="加项/减项" prop="isJiaOrJianOrQiuhe">
        <Tooltip
          content="加项减项是指系统计算工资总和的时候，是加上该项工资还是减去该项工资"
          style="width: 100%"
          :max-width="200"
        >
          <Select v-model="params.isJiaOrJianOrQiuhe" placeholder="请选择">
            <Option
              v-for="item in jiaxiangjianxiang"
              :value="item"
              :key="item"
              >{{ item }}</Option
            >
          </Select>
        </Tooltip>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "editgongzixiangmuForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    gongziID: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        ID: "",
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
    ok() {
      api.post("xwcloud-caiwu/caiwu/pxgongzitable/gongzixiangmu/editGongzixiangmu",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res);
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
        this.$refs["editgongzixiangmuForm"].resetFields();
        this.params.ID = this.gongziID;
        api.get("xwcloud-caiwu/caiwu/pxgongzitable/gongzixiangmu/getGongzixiangmu",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.params = res.obj;
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
