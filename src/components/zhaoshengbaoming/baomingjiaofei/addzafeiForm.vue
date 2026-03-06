<template>
  <Modal v-model="show" title="添加杂费" :mask-closable="false" width="50">
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="费用名称" prop="ZafeiID">
            <Select
              v-model="shezhiForm.ZafeiID"
              placeholder="请选择费用名称"
              style="width: 100%"
              @on-change="changeZafei"
              filterable
            >
              <Option v-for="item in allzafeiData" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="10" offset="1" style="text-align: left;padding-left:5px;padding-top:8px;">
          <label style="color:#2d8cf0;">费用名称在【系统设置-财务设置 杂费自定义设置】</label>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="费用金额" prop="zafeiZongjia">
            <InputNumber
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.zafeiZongjia"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="handleSubmit()">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    campusID: {
      type: String,
    },
    zfData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        ZafeiID: "",
        zafeiName: "",
        zafeiZongjia: 0,
      },
      shezhiFormRule: {
        ZafeiID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        zafeiZongjia: [
          {
            required: true,
            message: "请输入限制金额",
            trigger: "change",
            type: "number",
          },
        ],
      },
      allzafeiData: [],
      nowzf: [],
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["shezhiForm"].validate((valid) => {
        let havezf = false;
        if (valid) {
          this.nowzf.forEach((item) => {
            if (this.shezhiForm.ZafeiID == item.ZafeiID) {
              havezf = true;
              this.$Message.error("费项为：" + item.zafeiName + "已存在！");
            }
          });

          console.log(havezf);
          if (havezf == false) {
            var array = [];
            array = this.shezhiForm;
            this.$emit("increment", JSON.stringify(array));
            this.$refs["shezhiForm"].resetFields();
            this.closeModal(false);
          }
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

    handleReset() {
      this.shezhiForm.ZafeiID = "";
      this.$refs["shezhiForm"].resetFields();
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changeyouhuiType() {
      if (this.shezhiForm.youhuiType == "1") {
        this.maxyouhui = 10;
      } else {
        this.maxyouhui = 100000;
      }
    },
    changeZafei() {
      this.allzafeiData.forEach((element) => {
        if (element.id == this.shezhiForm.ZafeiID) {
          this.shezhiForm.zafeiName = element.name;
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.shezhiForm.ZafeiID = "";
        this.$refs["shezhiForm"].resetFields();
        if (this.zfData != "") {
          this.nowzf = JSON.parse(this.zfData);
        }
        console.log(this.nowzf);
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanOtherMoneyList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allzafeiData = res.obj;
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
