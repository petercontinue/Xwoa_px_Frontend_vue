<template>
  <Modal
    v-model="show"
    title="修改教师任教科目"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form
      ref="teachsubjectForm"
      :model="teachsubjectForm"
      :rules="teachsubjectFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="任教校区" prop="campusID">
        <Select
          v-model="teachsubjectForm.campusID"
          placeholder="请选择任教校区"
          style="width: 100%"
        >
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="任教科目" prop="teachSubjectID">
        <Select
          v-model="teachsubjectForm.teachSubjectID"
          placeholder="请选择任教科目"
          style="width: 100%"
        >
          <Option
            v-for="item in allsubjectData"
            :value="item.id"
            :key="item.id"
            >{{ item.subjectName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="说明" prop="shuoming">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="teachsubjectForm.shuoming"
          placeholder="请输入说明信息"
          style="width: 100%"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "updateteachsubject",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    tsbID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      teachsubjectForm: {
        staffName: "",
        campusID: "",
        teachSubjectID: "",
        shuoming: "",
      },
      teachsubjectFormRule: {
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            type: "string",
            max: 20,
            message: "请输入不超过20字的真实姓名",
            trigger: "blur",
          },
        ],
        shuoming: [
          { required: true, message: "请输入其他说明", trigger: "blur" },
        ],
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        teachSubjectID: [
          {
            required: true,
            message: "请选择教师任教科目",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allsubjectData: [],
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      api.post("xwcloud-sys/sys/StaffManagement/UpdateteachSubject",{
        id: this.tsbID,
        staffID: this.staffID,
        qiyeID: "1",
        shuoming: this.teachsubjectForm.shuoming,
        teachSubjectID: this.teachsubjectForm.teachSubjectID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    checkstaffTel() {},
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
        this.$refs["teachsubjectForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 531 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-sys/sys/StaffManagement/GetAllSubjectList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allsubjectData = res.obj;
          }
        });
        api.get("/xwcloud-sys/sys/StaffManagement/GetTeachingSubjectInfo",{ Id: this.tsbID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.teachsubjectForm = res.obj;
          } else {
            this.$Message.error(res.msg);
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

