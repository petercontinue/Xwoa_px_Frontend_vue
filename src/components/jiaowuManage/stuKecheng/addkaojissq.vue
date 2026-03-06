<template>
  <Modal
    v-model="show"
    title="添加/修改考级申请"
    @on-ok="ok"
    :mask-closable="false"
    width="60"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <Row class="divShow">
        <Col span="6" offset="1">
          <FormItem label="学员:">
            <Input v-model="stuName" disabled />
          </FormItem>
        </Col>
        <Col span="6" offset="1">
          <FormItem label="科目:">
            <Input v-model="kemuName" disabled />
          </FormItem>
        </Col>
        <Col span="6" offset="1">
          <FormItem label="申请等级:" prop="sqjibie">
            <Input v-model="logForm.sqjibie" />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveKaojiSq('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
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
  name: "addkaojissq",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: { type: String },
    msg: { type: String },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {
        sqjibie: [
          { required: true, message: "请输入申请级别", trigger: "blur" },
        ],
      },
      getData: JSON,
      typesT: "",
      logForm: {
        sqID: "",
        stuID: "",
        kemuid: "",
        sqjibie: "",
      },
      kemuName: "",
      stuName: "",
    };
  },
  methods: {
    ok() {},

    /**保存 */
    saveKaojiSq(name) {
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          if (this.type == 1) {
            api.post("xwcloud-stu/stu/buxikecheng/addKaoJiSq",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.$refs[name].resetFields();
                this.kemuName = "";
                this.stuName = "";
                this.closeModal(false);
              } else {
                this.$Message.error("保存失败");
                this.closeModal(false);
              }
            });
          } else {
            api.post("xwcloud-stu/stu/buxikecheng/updateKaoJiSq",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.$refs[name].resetFields();
                this.kemuName = "";
                this.stuName = "";
                this.closeModal(false);
              } else {
                this.$Message.error("保存失败");
                this.closeModal(false);
              }
            });
          }
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    /**清除 */
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
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
      if (val) {
        this.$refs["logForm"].resetFields();
        this.getData = JSON.parse(this.msg);
        console.log(this.getData);
        this.typesT = this.type;
        this.stuName = this.getData.stuName;
        this.kemuName = this.getData.subjectName;
        if (this.type == "1") {
          this.logForm.stuID = this.getData.stuID;
          this.logForm.kemuid = this.getData.subjectID;
        } else {
          this.logForm.sqID = this.getData.id;
          this.logForm.sqjibie = this.getData.sqjibie;
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
