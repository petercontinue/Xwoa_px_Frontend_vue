<template>
  <Modal
    v-model="show"
    title="岗位微信群发"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="wxqfForm"
      :model="wxqfForm"
      :rules="wxqfFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="岗位（可多选）" prop="staffpostIDs">
        <Select
          v-model="checkstaffpost"
          placeholder="请选择推送岗位"
          multiple
          style="width: 100%"
          @on-change="getstaffpost"
        >
          <Option v-for="item in allstaffpostData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="推送类型" prop="tuisongtype">
        <Select
          v-model="wxqfForm.tuisongtype"
          placeholder="请选择推送类型"
          style="width: 100%"
        >
          <Option v-for="item in alltuisongtype" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="推送内容" prop="logContent">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="wxqfForm.logContent"
          placeholder="请输入推送内容"
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
import uploadimgForm from "../../components/common-buttons/uploadimgForm";
import TreeSelect from "../../components/tree-select/tree-select";
import * as api from "@/api/api.js";

export default {
  components: {
    uploadimgForm,
    TreeSelect,
  },
  name: "addlog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      wxqfForm: {
        logContent: "",
        staffpostIDs: "",
        tuisongtype: "",
      },
      wxqfFormRule: {
        logContent: [{ required: true, message: "请输入推送内容", trigger: "blur" }],
        staffpostIDs: [
          {
            required: true,
            message: "请选择用户岗位",
            trigger: "change",
          },
        ],
        tuisongtype: [
          {
            required: true,
            message: "请选择推送类别",
            trigger: "change",
          },
        ],
      },
      alltuisongtype: [],
      allstaffpostData: [],
      imgurl: "",
      checkstaffpost: [],
    };
  },
  methods: {

    getstaffpost() {
      this.wxqfForm.staffpostIDs = "";
      this.checkstaffpost.forEach((item) => {
        this.wxqfForm.staffpostIDs += item + ",";
      });
    },

    ok(closetype) {
      api.post("xwcloud-sys/sys/StaffManagement/campusOrstaffpostqunfa",{
        IDs: this.wxqfForm.staffpostIDs,
        tsType: Number(this.wxqfForm.tuisongtype),
        note: this.wxqfForm.logContent,
        type: 2,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          if (closetype == 2) {
            // 提交表单数据成功则关闭当前的modal框
            this.closeModal(false);
          }
          this.$refs["wxqfForm"].resetFields();
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
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
        this.$refs["wxqfForm"].resetFields();
        api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffPostList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstaffpostData = res.obj;
          }
        });
        api.get("xwcloud-sys/sys/StaffManagement/GetTuisongTyleList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.alltuisongtype = res.obj;
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
