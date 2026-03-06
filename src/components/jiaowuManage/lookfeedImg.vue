<template>
  <Modal
    v-model="show"
    title="评价图片"
    @on-ok="ok"
    :mask-closable="false"
    width="55"
    @on-cancel="closeModal(false)"
  >
    <Card>
      <span style="margin:20px;width:160px" v-for="(item,i) in imgaddress" :key="i">
        <img :src="item" class="iimg" />
      </span>
    </Card>
  </Modal>
</template>
<style>
.iimg {
  border: 2px solid rgb(8, 8, 8);
  border-radius: 5px;
  width: 200px;
  height: 200px;
}
</style>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "lookfeedImg",
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
      imgaddress: [],
    };
  },
  methods: {
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
        this.imgaddress = this.address.split(",");
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
