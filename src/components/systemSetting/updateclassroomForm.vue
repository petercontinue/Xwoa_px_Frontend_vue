<template>
  <Modal
    v-model="show"
    title="修改教室"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="40"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="shezhiForm.campusID"
          placeholder="请选择校区"
          style="width: 100%"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="教室名称" prop="classroomname">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.classroomname"
          placeholder="请输入教室名称"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="是否检测冲突" prop="ischongtu">
        <Select
          v-model="shezhiForm.ischongtu"
          placeholder="请选择是否检测冲突"
          style="width: 100%"
        >
          <Option value="1">是</Option>
          <Option value="0">否</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import * as api from "@/api/api.js";

export default {
  name: "updateStugradeInfo",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        id: 0,
        classroomname: "",
        campusID: "",
        ischongtu: "",
        // recordInStaffID: "",
        // recordInTime: "",
        // qiyeID: "",
      },
      shezhiFormRule: {
        classroomname: [
          {
            required: true,
            message: "请输入教室名称",
            trigger: "change",
            type: "string",
          },
        ],
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        ischongtu: [
          {
            required: true,
            message: "请选择是否检测冲突",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api.post("/xwcloud-sys/sys/SystemSetting/editClassRoom",{
            id: this.shezhiForm.id,
            classRoomName: this.shezhiForm.classroomname,
            campusID: this.shezhiForm.campusID,
            ischongtu: this.shezhiForm.ischongtu,
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
        let data = JSON.parse(this.editData);
        this.shezhiForm.id = data.id;
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 521 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("/xwcloud-sys/sys/SystemSetting/GetclassroomInfo",{ Id: this.shezhiForm.id }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res.obj);
            this.shezhiForm = res.obj;
            if (res.obj.ischongtu) {
              this.shezhiForm.ischongtu = "1";
            } else {
              this.shezhiForm.ischongtu = "0";
            }
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
