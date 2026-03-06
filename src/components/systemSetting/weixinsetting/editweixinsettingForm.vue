<template>
  <Modal
    v-model="show"
    :title="title"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      v-if="zhufuyuShow"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="学员生日祝福语" prop="zhufuyu">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="shezhiForm.zhufuyu"
          placeholder="请输入学员生日祝福语"
          style="width: 100%"
        />
      </FormItem>
    </Form>

    <Form
      ref="shezhiForm1"
      :model="shezhiForm1"
      :rules="shezhiForm1Rule"
      v-if="tuisongygShow"
    >
      <FormItem label="营销活动新报名推送(可多选)" prop="tuisongyg">
        <Select
          v-model="CheckStaff"
          placeholder="营销活动新报名推送(可多选)"
          style="width: 100%"
          multiple
          filterable
          @on-change="getCheckStaff"
        >
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
    </Form>

    <Form ref="shezhiForm2" :model="shezhiForm2" :rules="shezhiForm2" v-if="TimeOutShow">
      <FormItem label="营销活动截止时间到期推送" prop="tuisongyg">
        <Select
          v-model="TimeOutCheckStaff"
          placeholder="营销活动截止时间到期推送"
          style="width: 100%"
          multiple
          filterable
          @on-change="getTimeOutCheckStaff"
        >
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
    </Form>

    <Form
      ref="shezhiForm6"
      :model="shezhiForm6"
      :rules="shezhiForm6Rule"
      v-if="pingjiatuisongShow"
    >
      <FormItem label="学员微信新动态推送(可多选)" prop="pingjiatuisong">
        <Select
          v-model="checktype"
          placeholder="学员微信新动态推送(可多选)"
          style="width: 60%; float: right"
          multiple
          filterable
          @on-change="tuisongtype"
        >
          <Option value="-1">任课老师</Option>
          <Option value="-2">班主任</Option>
          <Option value="-3">指定推送人</Option>
        </Select>
      </FormItem>

      <FormItem v-if="tuiIstea" label="指定推送人">
        <Select
          v-model="checkstafflist"
          multiple
          filterable
          placeholder="请选择指定推送人"
          style="width: 100%"
          @on-change="checkstaff"
        >
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { update } from "countup";
import * as api from "@/api/api.js";

export default {
  name: "UpdateSysParamValue",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    shezhiID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        zhufuyu: "",
      },
      shezhiFormRule: {
        zhufuyu: [
          {
            required: true,
            message: "请输入学员生日祝福语",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm1: {
        tuisongyg: "",
      },
      shezhiForm1Rule: {
        tuisongyg: [
          {
            required: true,
            message: "请选择推送员工",
            trigger: "change",
            type: "string",
          },
        ],
      },

      shezhiForm2: {
        tuisongyg: "",
      },
      shezhiForm2Rule: {
        tuisongyg: [
          {
            required: true,
            message: "请选择推送员工",
            trigger: "change",
            type: "string",
          },
        ],
      },

      TimeOutShow: false,
      TimeOutCheckStaff: [],

      title: "学员生日自定义祝福语",
      zhufuyuShow: false,
      tuisongygShow: false,
      allstaffData: [],
      CheckStaff: [],

      shezhiForm6: {
        pingjiatuisong: "",
      },
      shezhiForm6Rule: {
        pingjiatuisong: [
          {
            required: true,
            message: "学员微信新动态推送(可多选)",
            trigger: "change",
            type: "string",
          },
        ],
      },
      pingjiatuisongShow: false,
      checktype: [],
      allStaffList: [],
      checkstafflist: [],
      typelist: "",
      staffList: "",
    };
  },
  methods: {
    tuisongtype() {
      if (!this.tuiIstea) {
        this.checkstafflist = [];
      }

      this.tuiIstea = false;
      this.typelist = "";
      this.checktype.forEach((item) => {
        if (item == -3) {
          this.tuiIstea = true;
        } else {
          this.typelist += item + ",";
        }
      });
    },

    checkstaff() {
      this.staffList = "";
      if (this.tuiIstea) {
        this.checkstafflist.forEach((item) => {
          this.staffList += item + ",";
        });
      }
    },

    ok() {
      let value =
        this.shezhiID == "16"
          ? this.shezhiForm.zhufuyu
          : this.shezhiID == "17"
          ? this.shezhiForm1.tuisongyg
          : this.shezhiID == "111"
          ? this.shezhiForm2.tuisongyg
          : (this.shezhiForm6.pingjiatuisong = this.typelist + this.staffList);
      console.log(value);
      api.post("/xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",{
        id: this.shezhiID,
        value: value,
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
    getTimeOutCheckStaff() {
      this.shezhiForm2.tuisongyg = "";
      this.TimeOutCheckStaff.forEach((item) => {
        this.shezhiForm2.tuisongyg += item + ",";
      });

      console.log(this.shezhiForm2);
    },
    getCheckStaff() {
      this.shezhiForm1.tuisongyg = "";
      this.CheckStaff.forEach((item) => {
        this.shezhiForm1.tuisongyg += item + ",";
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
        this.tuiIstea = false;
        this.checkstafflist = [];
        this.checktype = [];
        this.CheckStaff = [];
        this.TimeOutCheckStaff = [];
        this.shezhiForm1.tuisongyg = "";
        this.shezhiForm2.tuisongyg = "";
        this.typelist = "";
        this.staffList = "";
        this.shezhiForm6.pingjiatuisong = "";
        api.get("/xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: this.shezhiID }).then((res) => {
          if (this.shezhiID == "16") {
            this.zhufuyuShow = true;
            this.tuisongygShow = false;
            this.TimeOutShow = false;
            this.title = "学员生日自定义祝福语";
            if (res.obj != null) {
              this.shezhiForm.jifenbilv = res.obj.modifyValue;
            }
          } else if (this.shezhiID == "17") {
            this.zhufuyuShow = false;
            this.tuisongygShow = true;
            this.TimeOutShow = false;
            this.pingjiatuisongShow = false;
            this.shezhiForm1.tuisongyg = res.obj.modifyValue;

            this.title = "营销活动新报名推送";
            api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.allstaffData = result.obj;
              }
            });

            let li = [];
            li = res.obj.modifyValue.split(",");
            li.forEach((item) => {
              this.CheckStaff.push(item);
            });
          } else if (this.shezhiID == "111") {
            this.TimeOutShow = true;
            this.zhufuyuShow = false;
            this.tuisongygShow = false;
            this.pingjiatuisongShow = false;
            this.shezhiForm2.tuisongyg = res.obj.modifyValue;

            this.title = "营销活动截止时间到期推送";
            api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.allstaffData = result.obj;
              }
            });

            let li = [];
            li = res.obj.modifyValue.split(",");
            li.forEach((item) => {
              this.TimeOutCheckStaff.push(item);
            });
          } else if (this.shezhiID == "112") {
            this.TimeOutShow = false;
            this.zhufuyuShow = false;
            this.tuisongygShow = false;
            this.pingjiatuisongShow = true;
            this.shezhiForm6.pingjiatuisong = res.obj.modifyValue;

            this.title = "学员微信新动态推送";
            api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.allstaffData = result.obj;
              }
            });

            let li = res.obj.modifyValue.split(",");
            li.forEach((item) => {
              if (item == "-1" || item == "-2") {
                this.checktype.push(item);
              } else {
                this.checkstafflist.push(item);
              }
            });

            if (this.checkstafflist.length > 0) {
              this.checktype.push("-3");
              this.tuiIstea = true;
            }
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
