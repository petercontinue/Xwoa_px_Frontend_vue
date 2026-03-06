<template>
  <Modal
    v-model="show"
    title="添加任教科目"
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
          filterable
          @on-change="getkemu"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="任教科目" prop="teachSubjectID">
        <Select
          v-model="teachsubjectForm.teachSubjectID"
          placeholder="请选择任教科目"
          filterable
          multiple
        >
          <Option v-for="item in allsubjectData" :value="item.id" :key="item.id">{{
            item.subjectName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="说明" prop="shuoming">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="teachsubjectForm.shuoming"
          placeholder="请输入说明信息"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "addTeachsubject",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    staffID: {
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
            type: "array",
          },
        ],
      },
      allsubjectData: [],
      allcampusData: [],
    };
  },
  methods: {
    getkemu() {
      this.allsubjectData = [];
      console.log(this.teachsubjectForm.campusID);
      api.get("xwcloud-sys/sys/StaffManagement/GetAllSubjecbycampusIDtList",{ campusID: this.teachsubjectForm.campusID }).then(
        (res) => {
          if (res.code == "Y" && res.success == true) {
            this.allsubjectData = res.obj;
            console.log(res);
          }
        }
      );
    },

    ok(closetype) {
      let subjectIDs = "";
      this.teachsubjectForm.teachSubjectID.forEach((element) => {
        subjectIDs += element + ",";
      });
      // var reg = /,$/gi;
      api.post("xwcloud-sys/sys/StaffManagement/saveteachSubject",{
        staffID: this.staffID,
        shuoming: this.teachsubjectForm.shuoming,
        teachSubjectID: subjectIDs,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          if (closetype == 2) {
            // 提交表单数据成功则关闭当前的modal框
            this.closeModal(false);
          }
          this.$refs["teachsubjectForm"].resetFields();
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
        console.log(this.staffID);
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 531 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
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
