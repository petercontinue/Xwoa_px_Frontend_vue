<template>
  <Modal
    v-model="show"
    title="添加课程时长"
    :loading="loading"
    :mask-closable="false"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <Row>
        <Alert show-icon style="margin-top: 30px">
          <Icon type="ios-bulb-outline" slot="icon"></Icon>
          <Col>
            <span style="color: blue"
              >温馨提示：课程时长是指课程的一个课时有多少分钟；如果是按次计费的课程则是1次；如果是按起止日期计费的课程则是1天；</span
            >
          </Col>
          <Col style="margin-top: 5px">
            <p>举例说明:</p>
          </Col>
          <Col style="margin-top: 5px">
            <p>一次课的上下课时间是8:00-12:00</p></Col
          >
          <Col style="margin-top: 5px">
            <p>如果本次课是算1个课时，那么课程时长是120分钟；</p></Col
          >
          <Col style="margin-top: 5px"
            ><p>如果本次课是算2个课时，那么课程时长是60分钟；</p></Col
          >
          <Col style="margin-top: 5px"
            ><p>如果本次课是算3个课时，那么课程时长就是40分钟</p></Col
          >
        </Alert>
      </Row>

      <FormItem label="课程时长(分钟)" prop="kechengshichang" style="margin-top: 8px">
        <InputNumber
          :max="1000"
          :min="1"
          :step="5"
          v-model="shezhiForm.kechengshichang"
          placeholder="请输入课程时长"
          style="width: 100%"
        ></InputNumber>
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
import * as api from "@/api/api.js";

export default {
  name: "addkechengshichang",
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
      shezhiForm: {
        kechengshichang: 0,
      },
      shezhiFormRule: {
        kechengshichang: [
          {
            required: true,
            message: "请输入课程时长",
            trigger: "change",
            type: "integer",
          },
        ],
      },
    };
  },
  methods: {
    ok(closeFlag) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api.post("/xwcloud-sys/sys/SystemSetting/addclasstimestyle",{
            ClassTimeStyleName: this.shezhiForm.kechengshichang,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              if(closeFlag ==2){
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
              
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
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
