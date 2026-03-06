<template>
  <Modal
    v-model="show"
    title="修改员工生日"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="staffbirthForm"
      :model="staffbirthForm"
      :rules="staffbirthFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="员工生日" prop="staffbirth">
        <DatePicker
          type="date"
          placeholder="请选择员工生日"
          v-model="staffbirthForm.staffbirth"
          style="width: 100%"
          :editable="false"
        ></DatePicker>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "UpdateStaffBirth",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdataID: {
      type: String,
    },
    staffbirth: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      staffbirthForm: {
        staffbirth: "",
        id: "",
      },
      staffbirthFormRule: {
        // staffbirth: [
        //   { required: true, message: "请选择员工生日", trigger: "blur" },
        // ],
      },
    };
  },
  methods: {
    ok() {
      console.log(this.staffbirthForm),
      api.post("xwcloud-sys/sys/StaffManagement/UpdateStaffBirth",{
          id: this.staffbirthForm.id,
          staffbirth: this.staffbirthForm.staffbirth,
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
      setTimeout(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 1000);
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
        this.$refs["staffbirthForm"].resetFields();
        console.log(this.editdataID);
        console.log(this.staffbirth);
        this.staffbirthForm.id = this.editdataID;
        this.staffbirthForm.staffbirth = this.staffbirth;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>

