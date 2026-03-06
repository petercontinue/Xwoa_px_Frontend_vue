<template>
  <Modal
    v-model="show"
    title="添加商品"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="200"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="商品" prop="id">
            <Select
              v-model="shezhiForm.id"
              placeholder="请选择商品"
              style="width: 100%"
              @on-change="changeWuping"
              filterable
            >
              <Option v-for="item in allwupinData" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="11" offset="1">
          <label style="color:#2d8cf0;">商品在【进销存-商品管理】自定义设置</label>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="官方指导价(单价：元)" prop="wpDanjia">
            <InputNumber
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.wpDanjia"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="实际出售成交价(单价：元)" prop="wpChushouJia">
            <InputNumber
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.wpChushouJia"
              style="width: 100%"
              @on-change="changesumMoney"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="商品数量" prop="wpShuliang">
            <InputNumber
              :max="makucun"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.wpShuliang"
              style="width: 100%"
              @on-change="changesumMoney"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="商品总价" prop="wpZongjia">
            <InputNumber
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.wpZongjia"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)">取消</Button>
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
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        id: "",
        wpName: "",
        wpDanjia: 0,
        wpChushouJia: 0,
        wpShuliang: 0,
        wpZongjia: 0,
      },
      shezhiFormRule: {
        id: [
          {
            required: true,
            message: "请选择物品",
            trigger: "change",
            type: "string",
          },
        ],
        wpDanjia: [
          {
            required: true,
            message: "请输入物品单价",
            trigger: "change",
            type: "number",
          },
        ],
        wpChushouJia: [
          {
            required: true,
            message: "请输入物品售价",
            trigger: "change",
            type: "number",
          },
        ],
        wpShuliang: [
          {
            required: true,
            message: "请输入物品数量",
            trigger: "change",
            type: "number",
          },
        ],
        wpZongjia: [
          {
            required: true,
            message: "请输入物品总价",
            trigger: "change",
            type: "number",
          },
        ],
      },
      allwupinData: [],
      makucun: 0,
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          var array = [];
          array = this.shezhiForm;
          this.$emit("increment", JSON.stringify(array));
          this.closeModal(false);
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
    changeyouhuiType() {
      if (this.shezhiForm.youhuiType == "1") {
        this.maxyouhui = 10;
      } else {
        this.maxyouhui = 100000;
      }
    },
    changeWuping() {
      this.allwupinData.forEach((element) => {
        if (this.shezhiForm.id == element.id) {
          console.log(element);
          this.shezhiForm.wpName = element.name;
          this.shezhiForm.wpDanjia = element.salePrice;
          this.makucun = element.stockNum;
          this.shezhiForm.wpChushouJia = element.salePrice;
          this.shezhiForm.wpShuliang = 1;
          this.shezhiForm.wpZongjia = element.salePrice;
        }
      });
    },
    changesumMoney() {
      console.log(this.shezhiForm);
      if (
        this.shezhiForm.wpShuliang != 0 &&
        this.shezhiForm.wpChushouJia != 0
      ) {
        this.shezhiForm.wpZongjia = Number(
          (this.shezhiForm.wpShuliang * this.shezhiForm.wpChushouJia).toFixed(2)
        );
      }
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
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllWupingList",{ campusID: this.campusID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allwupinData = res.obj;
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
