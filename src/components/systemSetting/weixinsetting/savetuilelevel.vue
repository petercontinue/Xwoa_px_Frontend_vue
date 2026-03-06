<template>
  <Modal v-model="show" :title="title" :mask-closable="false" width="50">
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span
            >温馨提示：返佣比例设置为百分比，例 父级返佣比（成员成为推客）填 10，这该项为
            10% ，最大值为100%</span
          >
        </Col>
      </Alert>
    </Row>

    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="推客等级" prop="tuikeLevelName">
            <Input v-model="shezhiForm.tuikeLevelName" placeholder="请输入推客等级" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="条件金额" prop="tiaojianMoney">
            <InputNumber
              :max="10000000"
              :min="0"
              v-model="shezhiForm.tiaojianMoney"
              placeholder="请输入条件金额"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="父级返佣比（团队成员购买）" prop="fjFanyongbi1">
            <InputNumber
              :max="100"
              :min="0"
              :step="1"
              v-model="shezhiForm.fjFanyongbi1"
              placeholder="请输入购买返佣比"
              style="width: 90%"
            ></InputNumber>
            %
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="父级返佣比（成员成为推客）" prop="fjFanyongbi2">
            <InputNumber
              :max="100"
              :min="0"
              :step="1"
              v-model="shezhiForm.fjFanyongbi2"
              placeholder="请输入团员升级返佣比"
              style="width: 90%"
            ></InputNumber>
            %
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="祖级返佣比（团队成员购买）" prop="zjFanyongbi1">
            <InputNumber
              :max="100"
              :min="0"
              :step="1"
              v-model="shezhiForm.zjFanyongbi1"
              placeholder="请输入购买返佣比"
              style="width: 90%"
            ></InputNumber>
            %
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="祖级返佣比（成员成为推客）" prop="zjFanyongbi2">
            <InputNumber
              :max="100"
              :min="0"
              :step="1"
              v-model="shezhiForm.zjFanyongbi2"
              placeholder="请输入团员升级返佣比"
              style="width: 90%"
            ></InputNumber>
            %
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="说明">
            <Input
              type="textarea"
              :rows="4"
              :maxlength="100"
              v-model="shezhiForm.shuoming"
              placeholder="请输入说明"
              style="width: 100%"
            /> </FormItem
        ></Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "savetuilelevel",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: Number,
    },
    editID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      title: "",
      shezhiForm: {
        id: "",
        tuikeLevelName: "",
        tiaojianMoney: 0,
        fjFanyongbi1: 0,
        fjFanyongbi2: 0,
        zjFanyongbi1: 0,
        zjFanyongbi2: 0,
        shuoming: "",
      },
      shezhiFormRule: {
        tuikeLevelName: [
          {
            required: true,
            message: "请输入推客等级",
            trigger: "blur",
            type: "string",
          },
        ],
        tiaojianMoney: [
          {
            required: true,
            message: "请输入条件金额",
            trigger: "blur",
            type: "number",
          },
        ],
        fjFanyongbi1: [
          {
            required: true,
            message: "请输入购买返佣比",
            trigger: "blur",
            type: "number",
          },
        ],
        fjFanyongbi2: [
          {
            required: true,
            message: "请输入(父级)团员升级返佣比",
            trigger: "blur",
            type: "number",
          },
        ],
        zjFanyongbi1: [
          {
            required: true,
            message: "请输入购买返佣比",
            trigger: "blur",
            type: "number",
          },
        ],
        zjFanyongbi2: [
          {
            required: true,
            message: "请输入(祖级)团员升级返佣比",
            trigger: "blur",
            type: "number",
          },
        ],
      },
    };
  },
  methods: {
    ok(type) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          console.log(this.shezhiForm);
          api.post("/xwcloud-sys/sys/SystemSetting/savetklevel",this.shezhiForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);

              if (this.type == 1) {
                if (type == 1) {
                  this.$refs["shezhiForm"].resetFields();
                } else {
                  this.closeModal(false);
                }
                this.$emit("handleSearch");
              } else if (this.type == 2) {
                this.$refs["shezhiForm"].resetFields();
                this.$emit("handleSearch");
                this.closeModal(false);
              }
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完成必填项");
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
      this.$refs["shezhiForm"].resetFields();
      if (val) {
        if (this.type == 1) {
          this.title = "添加推客等级";
        } else {
          this.title = "修改推客等级";
          api.get("/xwcloud-sys/sys/SystemSetting/geteditlevelbyID",{ id: this.editID }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.shezhiForm = res.obj;
            }
          });
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
