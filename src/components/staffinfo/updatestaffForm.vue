<template>
  <Modal
    v-model="show"
    title="修改员工信息"
    :loading="loading"
    :mask-closable="false"
    width="50"
  >
    <Form
      ref="userForm"
      :model="userForm"
      :rules="userFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="手机号码" prop="staffTel">
        <Input
          type="text"
          :maxlength="50"
          v-model="userForm.staffTel"
          placeholder="请输入手机号码"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="真实姓名" prop="staffName">
        <Input
          type="text"
          :maxlength="50"
          v-model="userForm.staffName"
          placeholder="请输入真实姓名"
          style="width: 100%"
        />
      </FormItem>

      <FormItem label="性别" prop="staffSex">
        <Select v-model="userForm.staffSex" placeholder="请选择员工性别">
          <Option value="男">男</Option>
          <Option value="女">女</Option>
        </Select>
      </FormItem>
      <FormItem label="账号级别">
        <RadioGroup v-model="userForm.role">
          <Radio label="0">普通账号</Radio>
          <Radio label="1">管理员</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="校区" prop="campusID">
        <Select
          v-model="userForm.campusID"
          placeholder="请选择校区"
          style="width: 100%"
          @on-change="getstaffpost"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="岗位" prop="staffPostID">
        <Select
          v-model="userForm.staffPostID"
          placeholder="请选择岗位"
          style="width: 100%"
        >
          <Option v-for="item in staffpostDate" :value="item.id" :key="item.id">{{
            item.staffpostName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="入职时间" prop="joinTime">
        <DatePicker
          type="date"
          v-model="userForm.joinTime"
          placeholder="请输入入职时间"
          format="yyyy-MM-dd"
          style="width: 100%"
          :editable="false"
        ></DatePicker>
      </FormItem>
      <FormItem label="教师简介" v-if="userForm.showInApp == '1'">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="userForm.jiaoxueJingyan"
          placeholder="请输入教师简介"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="其他说明">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="userForm.shuoMing"
          placeholder="请输入其他说明"
          style="width: 100%"
        />
      </FormItem>

      <FormItem label="是否显示到小程序">
        <RadioGroup v-model="userForm.showInApp">
          <Radio label="1">是</Radio>
          <Radio label="2">否</Radio>
        </RadioGroup>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok">保存</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "updateOrg",
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
      userForm: {
        id: "",
        role: "",
        showInApp: "",
        staffID: "",
        staffTel: "",
        staffName: "",
        staffPostID: "",
        campusID: "",
        headImg: "",
        shuoMing: "",
        joinTime: "",
        orgIds: [],
        roles: [],
        headImg: "",
        pca: [],
        jiaoxueJingyan: "",
        staffSex: "",
      },
      userFormRule: {
        staffTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            type: "string",
            max: 11,
            message: "请输入不超过11位的联系电话",
            trigger: "blur",
          },
        ],
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            type: "string",
            max: 20,
            message: "请输入不超过20字的真实姓名",
            trigger: "blur",
          },
        ],
        shuoMing: [{ required: true, message: "请输入其他说明", trigger: "blur" }],
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        staffPostID: [
          {
            required: true,
            message: "请选择用户岗位",
            trigger: "change",
            type: "string",
          },
        ],
        joinTime: [
          { required: true, type: "date", message: "请选择入职时间", trigger: "blur" },
        ],
      },
      staffpostDate: [],
      allcampusData: [],
      oldrole: "",
    };
  },
  methods: {
    getstaffpost() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllStaffPostListByCampusID",{ campusID: this.userForm.campusID }).then(
        (res) => {
          if (res.code == "Y" && res.success == true) {
            this.staffpostDate = res.obj;
          }
        }
      );
    },

    ok() {
      console.log(this.userForm);
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-sys/sys/StaffManagement/editPxstafftable",{
            id: this.userForm.id,
            role: this.userForm.role,
            showInApp: this.userForm.showInApp,
            staffName: this.userForm.staffName,
            staffTel: this.userForm.staffTel,
            staffSex: this.userForm.staffSex,
            campusID: this.userForm.campusID,
            staffPostID: this.userForm.staffPostID,
            joinTime: this.userForm.joinTime,
            shuoMing: this.userForm.shuoMing,
            jiaoxueJingyan: this.userForm.jiaoxueJingyan,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.success(res.msg);
            }
          });
        } else {
          this.$Message.error("表单验证不通过");
        }
        setTimeout(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 1000);
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
        this.$refs["userForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 531 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-sys/sys/StaffManagement/getPxstafftable",{ pxtafftableId: this.staffID }).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.userForm = res.obj;
            this.userForm.joinTime = toolbox.dateFtt(res.obj.joinTime, "yyyy-MM-dd");
            this.userForm.role = res.obj.role + "";
            this.oldrole = res.obj.role + "";
            if (res.obj.showInApp == true) {
              this.userForm.showInApp = "1";
            } else {
              this.userForm.showInApp = "2";
            }
            console.log(res.obj);

            this.getstaffpost();
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
