<template>
  <Modal
    v-model="show"
    title="商品规格信息"
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
      <FormItem label="规格名称" prop="guigetypename">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.guigetypename"
          placeholder="请输入规格名称"
        />
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
    goodsID: {
      type: String,
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
        guigetypename: "",
        goodsid: this.goodsID,
      },
      shezhiFormRule: {
        guigetypename: [
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
    ...mapActions(["addWscGoodsGuige", "getallcampusList"]),
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          if (this.shezhiForm.goodsid == 0) {
            this.$Message.error("请先保存商品信息");
          } else {
            this.addWscGoodsGuige(this.shezhiForm).then((res) => {
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
        this.getallcampusList({}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
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
