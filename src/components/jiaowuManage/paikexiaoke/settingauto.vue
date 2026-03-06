<template>
  <Modal
    v-model="show"
    title="设置自动消课"
    :loading="loading"
    :mask-closable="true"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="ruleValidate"
      label-position="right"
      :label-width="120"
      :label-colon="true"
    >
      <FormItem label="班级" prop="classID">
        <Select v-model="logForm.classID" placeholder="请选择班级">
          <Option v-for="item in allclass" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>

      <FormItem label="上课教师">
        <Select v-model="logForm.teachID" placeholder="请选择老师">
          <Option v-for="item in allteacher" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="计入教师课时">
        <Input v-model="logForm.teachKeshi" placeholder="请输入教师课时，不输入表示为0" />
      </FormItem>
      <FormItem label="是否立即启用" prop="zdyesorno">
        <Select v-model="logForm.zdyesorno" placeholder="请选择类型">
          <Option v-for="item in typeList" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="saveauto('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "settingauto",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ID: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      logForm: {
        teachID: "",
        classID: "",
        buxiID: "",
        teachKeshi: 0,
        zdyesorno: "",
      },
      ruleValidate: {
        zdyesorno: [{ required: true, message: "请选择类型", trigger: "change" }],
        classID: [{ required: true, message: "请选择班级", trigger: "change" }],
      },
      allteacher: [],
      allclass: [],
      typeList: [
        { id: "1", name: "启用" },
        { id: "2", name: "关闭" },
      ],
      stuList: [],
    };
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    //保存设置
    saveauto(name) {
      console.log(this.logForm);
      this.$refs[name].validate((valid) => {
        // console.log(valid);
        if (valid) {
          api
            .post("xwcloud-pkxk/paike/paikexiaoke/savezdxk", this.logForm)
            .then((res) => {
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
      if (val) {
        this.logForm.buxiID = this.ID;
        console.log(this.ID);
        api.get("xwcloud-pkxk/paike/paikexiaoke/getallqxclass", {}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allclass = res.obj;
          }
        });
        api.get("xwcloud-pkxk/paike/paikexiaoke/getstaffByCam", {}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allteacher = res.obj;
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
