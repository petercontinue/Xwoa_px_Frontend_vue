<template>
  <Modal
    v-model="show"
    title="积分录入/修改"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="40"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="ruleValidate"
      label-position="right"
      :label-width="120"
      :label-colon="true"
    >
      <Row>
        <Col span="10" v-if="typeAorE === '1'">
          <FormItem label="学员" prop="stuID">
            <Select v-model="logForm.stuID" placeholder="请选择学员">
              <Option v-for="item in allStu" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="10" v-if="typeAorE === '2'">
          <FormItem>
            <Select v-model="logForm.stuID" disabled placeholder="请选择学员">
              <Option v-for="item in allStu" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="变动类型">
            <RadioGroup v-model="logForm.type">
              <Radio label="1">增加积分</Radio>
              <Radio label="2">扣减积分</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="10">
          <FormItem label="积分数" prop="integral">
            <Input v-model="logForm.integral" type="number" placeholder="请输入积分数" />
            <!-- <InputNumber :max="1000000" v-model="logForm.integral"></InputNumber> -->
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="20">
          <FormItem label="说明(50字)" prop="remark">
            <Input
              v-model="logForm.remark"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 3 }"
              placeholder="请输入说明，最多50字"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" v-if="typeAorE == 1" @click="handleSubmit('logForm', 1)"
        >保存并继续添加</Button
      >
      <Button type="primary" @click="handleSubmit('logForm', 2)">保存并关闭</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.divShow {
  /* text-align: center; */
  margin: 10px;
}
</style>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
export default {
  name: "addstuIntegar",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    typeAorE: { type: String },
    jfID: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      tuisong: false,
      logForm: {
        stuID: "",
        remark: "",
        type: "1",
        integral: 0,
        Notice: 0,
        jfID: "",
      },
      ruleValidate: {
        integral: [
          {
            required: true,
            // type: "number",
            message: "请输入要增加或扣减的积分数",
            trigger: "change",
          },
        ],
        stuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        remark: [{ required: true, message: "请输入说明", trigger: "blur" }],
      },

      alltype: [
        { id: -1, name: "" },
        { id: 1, name: "是" },
        { id: 2, name: "否" },
      ],
      allStu: [],
    };
  },
  methods: {
    ...mapActions(["getallstu", "addJiFen", "editJiFen", "getJiFenByID"]),
    closeModal(val) {
      this.$emit("input", val);
    },

    getallstuList() {
      this.getallstu({ menuID: 214 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStu = res.obj;
          console.log(res);
        }
      });
    },

    handleSubmit(name, type) {
      console.log(this.logForm);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          // this.$Message.success("Success!");
          this.logForm.type = Number(this.logForm.type);
          if (this.tuisong == true) {
            this.logForm.Notice = 1;
          } else {
            this.logForm.Notice = 2;
          }
          if (Number(this.typeAorE == 1)) {
            this.addJiFen(this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.$emit("handleSearch");

                this.$refs[name].resetFields();
                if (type == 2) {
                  this.closeModal(false);
                } else {
                  this.logForm.type = "1";
                }
              } else {
                this.$Message.error("保存失败");
                this.closeModal(false);
              }
            });
          } else if (Number(this.typeAorE) == 2) {
            this.editJiFen({
              jfID: this.logForm.jfID,
              type: Number(this.logForm.type),
              integral: Number(this.logForm.integral),
              remark: this.logForm.remark,
              Notice: Number(this.logForm.Notice),
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.$refs[name].resetFields();
                this.$emit("handleSearch");
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
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      this.$refs["logForm"].resetFields();
      if (val) {
        if (Number(this.typeAorE) == 1) {
          this.getallstuList();
        } else {
          this.logForm.jfID = this.jfID;
          this.logForm.type = "1";
          this.getJiFenByID({ jfID: this.jfID }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              console.log(res);
              this.logForm.stuID = res.obj.stuID;
              this.logForm.remark = res.obj.remark;
              this.logForm.type = res.obj.type;
              this.logForm.integral = res.obj.integral; //变动积分数
            }
          });
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
