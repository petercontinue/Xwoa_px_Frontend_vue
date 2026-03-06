<template>
  <Modal
    v-model="show"
    title="修改课程时长"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form
      ref="buxistyleForm"
      :model="buxistyleForm"
      :rules="buxistyleFormRule"
      :label-width="100"
      :label-colon="true"
    >
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1.课程时长单位是分钟，下面输入框中输入数值即可；</span>
        </Col>
        
      </Alert>
    </Row>
      <FormItem label="课程时长"  prop="classTimeStyleName">
        <Input
          type="text"
          number
          v-model="buxistyleForm.classTimeStyleName"
          placeholder="请输入课程时长"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import * as api from "@/api/api.js";
export default {
  name: "updatebuxistyle",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdataID: {
      type: String,
    },
    kechengshichang: {
      type: String,
    },

  },
  data() {
    const validateClasstimeStyle = (rule, value, callback) => {
      // console.log("value:");
      // console.log(value);
      // console.log("typeof value:");
      // console.log(typeof(value));
      if (!value) {
        return callback(new Error("课程时长不能为空"));
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value <= 0 || value >= 1000) {
            callback(new Error("必须是0~1000之间的数字"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      show: this.value,
      loading: true,
      buxistyleForm: {
        classTimeStyleName: "",
        id: "",
      },
      buxistyleFormRule: {
        classTimeStyleName: [
          {
            validator: validateClasstimeStyle,   //自定义校验方法
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["updateClasstimestyle"]),
    ok() {
      this.$refs["buxistyleForm"].validate((valid) => {
        if (valid) {
          // console.log(this.buxistyleForm);
          this.updateClasstimestyle({
            id: this.buxistyleForm.id,
            classTimeStyleName: this.buxistyleForm.classTimeStyleName,
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
        this.$refs["buxistyleForm"].resetFields();
        this.buxistyleForm.id = this.editdataID;
        this.buxistyleForm.classTimeStyleName = Number(this.kechengshichang);
        
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
