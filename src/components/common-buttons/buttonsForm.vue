<template>
  <Row style="margin-top: 20px">
    <Col span="24">
      <span
        v-for="(n, index) in allbtnData"
        :key="index"
        style="margin: 0px 3px 0 3px"
      >
        <Button
          size="large"
          :type="n.btnClass"
          @click="clickShijian(n.onclicks)"
          >{{ n.buttonName }}</Button>
      </span>
      <!-- <Button size="large" v-for="(n,index) in allbtnData" :key="index">{{n.buttonName}}</Button>
      <Button type="success" size="large">Success</Button>
      <Button type="warning" size="large">Warning</Button>
      <Button type="error" size="large">Error</Button> -->
    </Col>
  </Row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "buttonsForm",
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      menuID: this.value,
      staffID: "11",
      allbtnData: [],
    };
  },
  methods: {
    ...mapActions(["GetallPowerMenuButtons"]),
    clickShijian(functionname) {
      this.$emit("increment",functionname);
    },
  },
  mounted: function () {
    this.GetallPowerMenuButtons({
      menuID: this.menuID,
    }).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allbtnData = res.obj;
      }
    });
  },
};
</script>
