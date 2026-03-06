<template>
  <Modal
    v-model="show"
    :title= thisTitle
    :loading="loading"
    :mask-closable="false"
    width="30"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select v-model="shezhiForm.campusID" placeholder="请选择校区">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="岗位名称" prop="staffpostName">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.staffpostName"
          placeholder="请输入岗位名称"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)" v-if="editData == ''">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button> 
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
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
      thisTitle: '',
      show: this.value,
      loading: true,
      shezhiForm: {
        id: 0,
        campusID: "",
        staffpostName: "",
      },
      shezhiFormRule: {
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        staffpostName: [
          {
            required: true,
            message: "请输入岗位名称",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
    };
  },
  methods: {
    ok(closeFlag) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          if (this.shezhiForm.id == 0) {
            api.post("/xwcloud-sys/sys/SystemSetting/addStaffpost",{
              staffpostName: this.shezhiForm.staffpostName,
              campusID: this.shezhiForm.campusID,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                if(closeFlag == 2){
                  // 提交表单数据成功则关闭当前的modal框
                  this.closeModal(false);
                }
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
            aapi.post("/xwcloud-sys/sys/SystemSetting/updatestaffpost",{
              id: this.shezhiForm.id,
              staffpostName: this.shezhiForm.staffpostName,
              campusID: this.shezhiForm.campusID,
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
          }
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
        this.$refs["shezhiForm"].resetFields();
        if (this.editData != "") {
          // console.log("here========1 ");
          // console.log(this.editData);
          this.thisTitle ="修改岗位";
          let data = JSON.parse(this.editData);
          this.shezhiForm.id = data.id;
          this.shezhiForm.campusID = data.campusID;
          this.shezhiForm.staffpostName = data.staffpostName;
        } else {
          // console.log("here========2 ");
          this.thisTitle ="添加岗位";
          this.shezhiForm.id = 0;
        }
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 521 }).then((res) => {
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
