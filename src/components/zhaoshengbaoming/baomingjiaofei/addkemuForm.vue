<template>
  <Modal
    v-model="show"
    title="添加科目信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="45"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="shezhiForm.campusID"
          placeholder="请选择校区"
          filterable
          style="width: 100%"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="科目名称" prop="subjectName" style="width: 100%">
        <Input
          type="text"
          :maxlength="50"
          v-model="shezhiForm.subjectName"
          placeholder="请输入科目名称"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" :loading="loading" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" :loading="loading2" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
import { mapActions } from "vuex";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: false,
      loading2: false,

      shezhiForm: {
        campusID: "",
        subjectName: "",
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
        subjectName: [
          {
            required: true,
            message: "请输入科目名称",
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
      this.loading = true;
      this.loading2 = true;
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddSubjectInfo",{
            subjectName: this.shezhiForm.subjectName,
            campusID: this.shezhiForm.campusID,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.loading = false;
              this.loading2 = false;
              if (closeFlag == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
              this.$refs["shezhiForm"].resetFields();
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
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
        api.get("xwcloud-sys/sys/SystemSetting/GetAllCampusInfoPages",{ menuID: 146 }).then((res) => {
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
