<template>
  <Modal
    v-model="show"
    title="修改校区名称"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="30"
  >
    <Form
      ref="thisForm"
      :model="thisForm"
      :rules="thisFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区名称" prop="campusName">
        <input
          type="text"
          placeholder="请输入校区名称"
          v-model="thisForm.campusName"
          style="width: 100%"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "updatebuxistyle",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    campusIDprops: {
      type: String,
    },
    campusNameprops: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      thisForm: {
        campusName: "",
        id: "",
        qiyeID: "",
      },
      thisFormRule: {
        campusName: [
          { required: true, message: "请输入校区名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ok() {
      this.$refs["thisForm"].validate((valid) => {
        if (valid) {
          console.log(this.thisForm),
          api.get("/xwcloud-sys/sys/SystemSetting/updateCampusNameByCampusID",{
              campusID: this.thisForm.id,
              campusName: this.thisForm.campusName,
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
        // console.log("===1 :"+this.campusIDprops);
        // console.log("===2 :"+this.campusNameprops);
        this.$refs["thisForm"].resetFields();
        this.thisForm.id = this.campusIDprops;
        this.thisForm.campusName = this.campusNameprops;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>

