<template>
  <Modal
    v-model="show"
    title="发证书"
    @on-ok="ok"
    :mask-closable="false"
    width="55"
    @on-cancel="closeModal(false)"
  >
    <Card>
      <img :src="imgaddress" style="width: 100%; height: 100%" />
    </Card>
  </Modal>
</template>
<style>
.divShow {
  margin-top: 10px;
}
</style>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "addstuzhengshu",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    address: { type: String },
  },
  data() {
    return {
      show: this.value,
      imgaddress: "",
    };
  },
  methods: {
    ...mapActions([]),

    ok() {},
    closeModal(val) {
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        this.imgaddress = this.address;
        console.log(this.address);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
