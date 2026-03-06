<template>
  <Modal
    v-model="show"
    title="签到学员"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem label="签到/签退是否扣课时">
        <Select v-model="logForm.iskoukeshi" placeholder="请选择类型">
          <Option v-for="item in alltype" :value="item.id" :key="item.id">
            {{
            item.name
            }}
          </Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "pxQdQt",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    datast: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      logForm: {
        stuID: "",
        paikeID: "",
        type: -1,
        iskoukeshi: -1,
      },
      logFormRule: {},
      alltype: [
        { id: 1, name: "是" },
        { id: 2, name: "否" },
      ],
      getdata: JSON,
    };
  },
  methods: {
    ok() {
      if (this.logForm.iskoukeshi == -1) {
        this.$Message.info("请选择是否扣课时");
      } else {
        api.post("xwcloud-pkxk/paike/paikexiaoke/rgqiandaoqiantui",this.logForm).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.$emit("handleSearch");
            this.closeModal(false);
          } else {
            this.$Message.error("保存失败");
            this.closeModal(false);
          }
        });
      }
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
      this.$refs["logForm"].resetFields();
      this.logForm.iskoukeshi = -1;
      if (val) {
        this.getdata = JSON.parse(this.datast);
        this.logForm.stuID = this.getdata.stuID;
        this.logForm.paikeID = this.getdata.paikeID;
        this.logForm.type = this.getdata.type;
        console.log(this.getdata);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
