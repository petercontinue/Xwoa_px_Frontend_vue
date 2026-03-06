<template>
  <Modal
    v-model="show"
    title="修改员工联系电话"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="stafftelForm"
      :model="stafftelForm"
      :rules="stafftelFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="手机号码" prop="stafftel">
        <Input
          type="tel"
          :rows="4"
          :maxlength="100"
          v-model="stafftelForm.stafftel"
          placeholder="请输入手机号码"
          style="width: 100%"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "updatestafftel",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdataID: {
      type: String,
    },
    stafftel: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      stafftelForm: {
        stafftel: "",
        id: "",
      },
      stafftelFormRule: {
        stafftel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["stafftelForm"].validate((valid) => {
        if (valid) {
          api.get("xwcloud-sys/sys/StaffManagement/UpdateStaffTel",{
            staffTel: this.stafftelForm.stafftel,
            id: this.stafftelForm.id,
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
        this.$refs["stafftelForm"].resetFields();
        this.stafftelForm.id = this.editdataID;
        this.stafftelForm.stafftel = this.stafftel;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>

