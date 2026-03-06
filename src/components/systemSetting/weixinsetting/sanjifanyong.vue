<template>
  <Modal
    v-model="show"
    title="默认三级返佣比率设置"
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
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="父级返佣比例(%)" prop="fidFanyongBili">
        <InputNumber
          style="width: 100%"
          :max="100"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.fidFanyongBili"
          placeholder="请输入父级返佣比例"
        ></InputNumber>
      </FormItem>
      <FormItem label="祖级返佣比例(%)" prop="gfidFanyongBili">
        <InputNumber
          style="width: 100%"
          :max="100"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.gfidFanyongBili"
          placeholder="请输入祖级返佣比例"
        ></InputNumber>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { update } from "countup";
import * as api from "@/api/api.js";

export default {
  name: "setsanjifanyong",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    shezhiID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        fidFanyongBili: 0,
        gfidFanyongBili: 0,
      },
      shezhiFormRule: {
        fidFanyongBili: [
          {
            required: true,
            message: "请输入父级返佣比率",
            trigger: "change",
            type: "Number",
          },
        ],
        gfidFanyongBili: [
          {
            required: true,
            message: "请输入祖级返佣比率",
            trigger: "change",
            type: "Number",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      let shezhivalue = "";
      shezhivalue =
        this.shezhiForm.gfidFanyongBili + "_" + this.shezhiForm.fidFanyongBili;
      api.post("/xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",{
        id: this.shezhiID,
        value: shezhivalue,
      }).then((res) => {
        console.log(res);
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
        console.log(this.shezhiID);
        api.get("/xwcloud-sys/sys/SystemSetting/GetSanjiFanyongInfo",{ paramsID: this.shezhiID }).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            if (res.obj.modifyValue) {
                this.shezhiForm.fidFanyongBili =
                res.obj.modifyValue.split("_")[1];
              this.shezhiForm.gfidFanyongBili =
                res.obj.modifyValue.split("_")[0];
            } else {
              console.log(res.obj.defaultValue);
              this.shezhiForm.fidFanyongBili =
                res.obj.defaultValue.split("_")[1];
              this.shezhiForm.gfidFanyongBili =
                res.obj.defaultValue.split("_")[0];
            }
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
