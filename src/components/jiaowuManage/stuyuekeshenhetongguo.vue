<template>
  <Modal
    v-model="show"
    title="约课审核"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="shenheFrom" :model="shenhe" :rules="shenheRule">
      <FormItem label="教室" prop="classroomID">
        <Select
          v-model="shenhe.classroomID"
          placeholder="请选择教室"
          style="width: 80%"
        >
          <Option
            v-for="item in classroomList"
            :value="item.id"
            :key="item.id"
            >{{ item.classRoomName }}</Option
          >
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>

import * as api from "@/api/api.js";

export default {
  name: "stuyuekeshenhetongguo",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    IDs: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      shenhe: {
        id: "",
        classroomID: "",
      },
      shenheRule: {
        // 验证输入
        classroomID: [
          { required: true, message: "请选择教室", trigger: "blur" },
        ],
      },
      classroomList: [], // 教室数据列表
    };
  },
  methods: {
    ok() {
      this.$refs["shenheFrom"].validate((valid) => {
        if (valid) {
          console.log(this.shenhe);
          // 点击确定按钮时调用
          api.post("xwcloud-homeschool/homeschool/pxyuekestufaqitable/examinationPassed",this.shenhe).then((res) => {
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
        this.$refs["shenheFrom"].resetFields();
        this.shenhe.id = this.IDs;
        // 获取教室列表
        api.get("xwcloud-homeschool/homeschool/public/getClassRoomList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取教室列表
            this.classroomList = res.obj;
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
