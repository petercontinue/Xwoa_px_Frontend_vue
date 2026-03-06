<template>
  <Modal
    v-model="show"
    title="微作业"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="weizuoyeFrom"
      :model="weizuoye"
      :rules="weizuoyeRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="班级" prop="classID">
        <Select v-model="weizuoye.classID" placeholder="请选择班级">
          <Option v-for="item in allclassData" :value="item.id" :key="item.id">{{ item.className }}</Option>
        </Select>
      </FormItem>
      <FormItem label="截止日期" prop="endDate">
        <DatePicker
          type="date"
          placeholder="请选择截止日期"
          v-model="weizuoye.endDate"
          style="width:100%;"
        ></DatePicker>
      </FormItem>
      <FormItem label="作业要求" prop="neirong">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="weizuoye.neirong"
          placeholder="请输入评价"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit(1)">保存并继续添加</Button>
      <Button type="primary" @click="handleSubmit(2)">保存并关闭</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "addweizuoye",
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
      weizuoye: {
        neirong: "",
        classID: "",
        endDate: "",
        zuoyeImg: "",
        zuoyeMp3: "",
        zuoyeVideo: "",
        otherFile: "",
      },
      weizuoyeRule: {
        // 验证输入
        classID: [{ required: true, message: "请选择班级", trigger: "blur" }],
        endDate: [
          {
            required: true,
            type: "date",
            message: "请选择截止时间",
            trigger: "change",
          },
        ],
        neirong: [
          { required: true, message: "请输入作业要求", trigger: "blur" },
        ],
      },
      allclassData: [], // 班级数据列表
    };
  },
  methods: {
    handleSubmit(type) {
      this.$refs["weizuoyeFrom"].validate((valid) => {
        if (valid) {
          // 点击确定按钮时调用
          api.post("xwcloud-homeschool/homeschool/pxzuoyetable/addZuoye",this.weizuoye).then((res) => {
            if (res.code == "Y" && res.success == true) {
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
          this.$Message.error("请检查数据是否填对!");
        }
      });
    },
    handleReset() {
      this.$refs["weizuoyeFrom"].resetFields();
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
        this.$refs["weizuoyeFrom"].resetFields();
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getClassList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取班级列表
            this.allclassData = res.obj;
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
