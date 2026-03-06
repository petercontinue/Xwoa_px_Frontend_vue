<template>
  <Modal
    v-model="show"
    title="微信群发"
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
      <FormItem label="员工姓名" prop="staffNames">
        <Select
          v-model="checkstaff"
          placeholder="请选择员工姓名（可多选）"
          multiple
          style="width: 100%"
          filterable
          @on-change="getstaffIDs"
        >
          <Option v-for="item in allstaffInfoData" :value="item.id" :key="item.id">{{
            item.staffName
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
      <FormItem label="推送内容" prop="logContent" style="width: 100%">
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
import * as api from "@/api/api.js";

export default {
  components: {
    uploadimgForm,
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
        staffNames: "",
        tuisongtype: "",
      },
      wxqfFormRule: {
        logContent: [{ required: true, message: "请输入推送内容", trigger: "blur" }],
        staffNames: [
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
      allstaffInfoData: [],
      imgurl: "",

      checkstaff: [],
    };
  },
  methods: {
    getstaffIDs() {
      this.wxqfForm.staffNames = "";
      this.checkstaff.forEach((item) => {
        this.wxqfForm.staffNames += item + ",";
      });
    },

    ok(closetype) {
      console.log(this.wxqfForm);
      api.post("xwcloud-sys/sys/StaffManagement/wxqunfa",{
        teaIDs: this.wxqfForm.staffNames,
        tsType: Number(this.wxqfForm.tuisongtype),
        note: this.wxqfForm.logContent,
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
        this.checkstaff = [];
        this.$refs["wxqfForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/getPxstafftableAllList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstaffInfoData = res.obj;
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
