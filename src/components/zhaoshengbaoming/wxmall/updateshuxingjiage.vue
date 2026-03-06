<template>
  <Modal
    v-model="show"
    title="商品规格属性价格"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="规格组合" prop="shuxing">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.shuxing"
          placeholder="请输入规格组合"
          disabled
        />
      </FormItem>
      <FormItem label="原价" prop="originalprice">
        <InputNumber
          :max="100000"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.originalprice"
          placeholder="请输入原价"
          style="width: 100%"
        ></InputNumber>
      </FormItem>

      <FormItem label="现价" prop="price">
        <InputNumber
          :max="100000"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.price"
          placeholder="请输入现价"
          style="width: 100%"
        ></InputNumber>
      </FormItem>

      <FormItem label="积分兑换价" prop="jifenprice">
        <InputNumber
          :max="100000"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.jifenprice"
          placeholder="请输入积分兑换价"
          style="width: 100%"
        ></InputNumber>
      </FormItem>

      <FormItem label="限时抢购价" prop="onlytimebuyprice">
        <InputNumber
          :max="100000"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.onlytimebuyprice"
          placeholder="请输入限时抢购价"
          style="width: 100%"
        ></InputNumber>
      </FormItem>

      <FormItem label="砍价成功价格" prop="kanjiasuccessprice">
        <InputNumber
          :max="100000"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.kanjiasuccessprice"
          placeholder="请输入砍价成功价格"
          style="width: 100%"
        ></InputNumber>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "addWscGoodsGuige",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        shuxing: "",
        originalprice: 0,
        price: 0,
        jifenprice: 0,
        onlytimebuyprice: 0,
        kanjiasuccessprice: 0,
        goodsid: 0,
      },
      shezhiFormRule: {
        shuxing: [
          {
            required: true,
            message: "请输入规格名称",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
    };
  },
  methods: {
    ...mapActions(["addWscGoodsGuige", "addWscGoodsAttrPriceList"]),
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          console.log(this.shezhiForm);
          this.addWscGoodsAttrPriceList(this.shezhiForm)
            .then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.$Message.success("保存商品属性规格成功");
                this.closeModal(false);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              }
            })
            .catch((err) => {
              this.$Message.error(result.msg);
              this.loading = false;
              setTimeout(() => {
                this.loading = true;
              }, 0);
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
        this.shezhiForm = JSON.parse(this.editData);
        console.log(JSON.parse(this.editData));
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
