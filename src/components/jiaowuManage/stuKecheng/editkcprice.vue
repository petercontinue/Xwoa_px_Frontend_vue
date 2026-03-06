<template>
  <Modal
    v-model="show"
    title="修改学员"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <Row class="row">
      <Col span="2" class="col">
        <label>培训科目：</label>
      </Col>
      <Col span="9">
        <Input v-model="subject" readonly />
      </Col>
      <Col span="2" offset="1" class="col">
        <label>培训方式:</label>
      </Col>
      <Col span="9">
        <Input v-model="buxiStatus" readonly />
      </Col>
    </Row>
    <Row class="row">
      <Col span="2" class="col">
        <label>培训课程：</label>
      </Col>
      <Col span="9">
        <Input v-model="kecheng" readonly />
      </Col>
      <Col span="2" offset="1" class="col">
        <label>原单价:</label>
      </Col>
      <Col span="9">
        <Input v-model="oldprice" readonly />
      </Col>
    </Row>
    <Row class="row">
      <Col span="2" class="col">
        <label>课时：</label>
      </Col>
      <Col span="9">
        <Input v-model="keshi" readonly />
      </Col>
      <Col span="2" offset="1" class="col">
        <label>现单价:</label>
      </Col>
      <Col span="9">
        <Input v-model="newprice" readonly />
      </Col>
    </Row>
    <Row class="row">
      <Col span="2" class="col">
        <label>温馨提示：</label>
      </Col>
      <Col span="20" class="col">
        <label>
          <font style="color: blue">单价修改时，系统会根据课程总的剩余费用来根据新老单价进行折算课时</font>
        </label>
      </Col>
    </Row>
    <Row class="row">
      <Col span="10" class="col">
        <Form ref="params" :model="params" :rules="logFormRule" :label-width="100">
          <FormItem label="新单价:" prop="newprice">
            <Input v-model="params.newprice" type="number" @on-blur="calculatekeshi" />
          </FormItem>
        </Form>
      </Col>
      <Col span="2" offset="1" class="col">
        <label>折算课时:</label>
      </Col>
      <Col span="9">
        <Input v-model="params.newkeshi" disabled />
      </Col>
    </Row>
    <div slot="footer">
      <Button type="primary" @click="editSave('params')">保存</Button>
      <Button @click="handleReset('params')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.col {
  text-align: right;
  line-height: 32px;
  font-family: 黑体;
  font-weight: bolder;
}
.row {
  margin-top: 15px;
}
</style>
<script>
import * as api from "@/api/api.js";

export default {
  name: "editStu",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxi: { type: String },
  },
  data() {
    return {
      show: this.value,
      params: {
        bxkeID: "",
        newprice: "",
        newkeshi: 0,
      },
      logFormRule: {
        newprice: [
          { required: true, message: "请输入新的课程单价", trigger: "blur" },
        ],
      },
      getData: JSON,
      subject: "",
      buxiStatus: "",
      kecheng: "",
      oldprice: 0,
      keshi: 0,
      newprice: 0,
    };
  },
  methods: {
    /**保存 */
    editSave(name) {
      console.log(this.edit);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          api.post("xwcloud-stu/stu/buxikecheng/editkcPrice",this.params).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.$refs[name].resetFields();
              this.closeModal(false);
            } else {
              this.$Message.error("保存失败");
              this.closeModal(false);
            }
          });
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

    calculatekeshi() {
      if (this.params.newprice == this.newprice) {
        this.$Message.error("请输入与当前单价不同的课单价");
      } else {
        this.params.newkeshi =
          (this.newprice * this.keshi) / this.params.newprice;
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      this.$refs["params"].resetFields();
      if (val) {
        this.getData = JSON.parse(this.buxi);
        console.log(this.getData);
        this.params.bxkeID = this.getData.id;
        this.subject = this.getData.bxsubject;
        this.buxiStatus = this.getData.buxiStatus;
        this.kecheng = this.getData.buxiCourse;
        this.oldprice = this.getData.oldCoursePrice;
        this.keshi = this.getData.remainkeshi;
        this.newprice = this.getData.coursePrice;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
