<template>
  <Modal
    v-model="show"
    title="修改最低收费标准"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="培训方式" prop="buxiStyleId">
        <Select
          v-model="shezhiForm.buxiStyleId"
          placeholder="请选择培训方式"
          style="width: 100%"
          filterable
        >
          <Option v-for="item in allbuxistyle" :value="item.id" :key="item.id">{{
            item.buxiStyleName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="学生年级(年龄段)" prop="stuGradeId">
        <Select
          v-model="shezhiForm.stuGradeId"
          placeholder="请选择学生年级(年龄段)"
          style="width: 100%"
          filterable
        >
          <Option v-for="item in allstugrade" :value="item.id" :key="item.id">{{
            item.stugradename
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="最低标准(元/课时)" prop="minimumCharge">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.minimumCharge"
          placeholder="请输入最低标准(元/课时)"
          style="width: 100%"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "updateshoufeibzForm",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        addStaffID: "",
        addTime: "",
        buxiStyleId: "",
        id: "",
        minimumCharge: "",
        qiyeID: "",
        stuGradeId: "",
      },
      shezhiFormRule: {
        buxiStyleId: [
          {
            required: true,
            message: "请选择培训方式",
            trigger: "change",
            type: "string",
          },
        ],
        stuGradeId: [
          {
            required: true,
            message: "请选择学生年级（年龄段）",
            trigger: "change",
            type: "string",
          },
        ],
        minimumCharge: [
          {
            required: true,
            message: "请输入最低收费",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allbuxistyle: [],
      allstugrade: [],
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          console.log(this.buxistyleForm),
          api.post("xwcloud-sys/sys/SystemSetting/updateShoufeibiaozhun",{
              id: this.shezhiForm.id,
              buxiStyleId: this.shezhiForm.buxiStyleId,
              stuGradeId: this.shezhiForm.stuGradeId,
              MinimumCharge: this.shezhiForm.minimumCharge,
              addTime: this.shezhiForm.addTime,
              addStaffID: this.shezhiForm.addStaffID,
              qiyeID: this.shezhiForm.qiyeID,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
                this.loading = false;
                setTimeout(() => {
                  this.loading = true;
                }, 0);
              }
            });
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
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
        this.$refs["shezhiForm"].resetFields();
        api.get("xwcloud-stu/stu/buxikecheng/getAllbuxiStyleList",{}).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.allbuxistyle = res.obj;
            api.get("xwcloud-sys/sys/SystemSetting/GetAllStuGradeList",{}).then((res) => {
              console.log(res);
              if (res.code == "Y" && res.success == true) {
                this.allstugrade = res.obj;
                api.get("/xwcloud-sys/sys/SystemSetting/GetShouFeibiaozhunByID",{ Id: this.editID }).then((res) => {
                  console.log(res);
                  if (res.code == "Y" && res.success == true) {
                    this.shezhiForm = res.obj;
                    this.shezhiForm.buxiStyleId = res.obj.buxiStyleId + "";
                    this.shezhiForm.stuGradeId = res.obj.stuGradeId + "";
                  }
                });
              }
            });
          }
        });

        console.log(this.editID);
        // this.shezhiForm = JSON.parse(this.editData);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
