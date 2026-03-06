<template>
  <Modal
    v-model="show"
    title="跨校区上课设置"
    @on-ok="ok"
    :mask-closable="false"
    width="40"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem>
        <Row class="divShow">
          <Col span="6" offset="2">
            <font style="color: red">要跨到哪个校区(可多选)*</font>:
          </Col>
          <Col span="13">
            <Select v-model="campusList" multiple>
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{item.name }}</Option>
            </Select>
          </Col>
        </Row>
      </FormItem>
    </Form>
  </Modal>
</template>
<style>
.divShow {
  margin-top: 10px;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "kxqSetting",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxiID: { type: String },
    stuID: { type: String },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {},
      logForm: {
        buxiID: "",
        campusStrs: "",
      },
      campusList: [],
      madecamlist: [],
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      if (this.campusList.length == 0) {
        this.$Message.error("请选择要跨的校区");
      } else {
        this.campusList.forEach((item) => {
          this.madecamlist.push({ id: item });
        });
        setTimeout(() => {
          this.logForm.campusStrs = JSON.stringify(this.madecamlist);
          api.post("xwcloud-stu/stu/buxikecheng/kxqbuxikcsave",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.getData = null;
              this.campusList = [];
              this.allcampusData = [];
              this.logForm = this.$options.data().logForm;
            } else {
              this.$Message.error(res.msg);
            }
          });
        }, 100);
      }
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    getAllCampusList() {
      api.get("xwcloud-stu/stu/buxikecheng/getStuKxqCanCampus",{ stuID: this.stuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        this.logForm.buxiID = this.buxiID;
        this.getAllCampusList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
