<template>
  <Modal
    v-model="show"
    :title="title"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm4"
      :model="shezhiForm4"
      :rules="shezhiForm4Rule"
      :label-width="200"
      :label-colon="true"
    >
      <FormItem :label="title" prop="startendXiaoke">
        <Select v-model="shezhiForm4.startendXiaoke" style="width: 100%">
          <Option value="1">是</Option>
          <Option value="2">否</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { update } from "countup";
import * as api from "@/api/api.js";

export default {
  name: "UpdateSysParamValue",
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
      shezhiForm4: {
        startendXiaoke: "",
      },
      shezhiForm4Rule: {
        startendXiaoke: [
          {
            required: true,
            message: "请选择是否开启审批流程",
            trigger: "change",
            type: "string",
          },
        ],
      },
      title: "修改意向权限人",
    };
  },
  methods: {
    ok() {
      let value = this.shezhiForm4.startendXiaoke;
      console.log(value);
      api.post("xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",{
        id: this.shezhiID,
        value: value,
      }).then((res) => {
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
        console.log(this.shezhiID);
        if (this.shezhiID == "106") {
          this.title = "是否开启退费审批流程";
        } else if (this.shezhiID == "107") {
          this.title = "是否开启新签审批流程";
        } else if (this.shezhiID == "108") {
          this.title = "是否开启续费审批流程";
        }
        api.get("/xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: this.shezhiID }).then((res) => {
          if (res.obj != null) {
            this.shezhiForm4.startendXiaoke = res.obj.modifyValue;
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
