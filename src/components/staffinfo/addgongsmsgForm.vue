<template>
  <Modal v-model="show" :title="title" :mask-closable="false" width="50">
    <Form
      ref="wxqfForm"
      :model="wxqfForm"
      :rules="wxqfFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="发送对象" prop="fasongduixiang">
        <Select
          v-model="wxqfForm.fasongduixiang"
          placeholder="请选择发送对象"
          style="width: 100%"
        >
          <Option :value="1" :key="1">群发到校区</Option>
          <Option :value="2" :key="2">群发到岗位</Option>
          <Option :value="3" :key="3">群发给员工</Option>
        </Select>
      </FormItem>
      <FormItem
        label="校区（可多选）"
        prop="campusIDs"
        v-if="wxqfForm.fasongduixiang == 1"
      >
        <Select
          v-model="checkcampus"
          placeholder="请选择校区"
          multiple
          style="width: 100%"
          @on-change="checkallCampus"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="校区" prop="campusID" v-if="wxqfForm.fasongduixiang == 2">
        <Select
          v-model="wxqfForm.campusID"
          placeholder="请选择校区"
          style="width: 100%"
          @on-change="selectCampus"
          filterable
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="岗位" prop="staffPostID" v-if="wxqfForm.fasongduixiang == 2">
        <Select
          v-model="wxqfForm.staffPostID"
          placeholder="请选择岗位"
          style="width: 100%"
          filterable
        >
          <Option v-for="item in staffpostData" :value="item.id" :key="item.id">{{
            item.staffpostName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem
        label="员工（可多选）"
        prop="staffIDs"
        v-if="wxqfForm.fasongduixiang == 3"
      >
        <Select
          v-model="wxqfForm.staffIDs"
          placeholder="请选择员工"
          multiple
          style="width: 100%"
          filterable
        >
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="消息标题" prop="gonggaoTitel" style="width: 100%">
        <Input
          type="textarea"
          :rows="2"
          :maxlength="50"
          v-model="wxqfForm.gonggaoTitel"
          placeholder="请输入消息标题"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="消息內容" prop="gonggaoText" style="width: 100%">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="1000"
          v-model="wxqfForm.gonggaoText"
          placeholder="请输入消息內容"
          style="width: 100%"
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
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      title: "",
      wxqfForm: {
        id: "",
        gonggaoText: "",
        gonggaoTitel: "",
        campusIDs: "",
        staffIDs: [],
        staffPostID: [],
        fasongduixiang: 0,
      },
      wxqfFormRule: {
        fasongduixiang: [
          {
            required: true,
            message: "请选择发送对象",
            trigger: "blur",
            type: "int",
          },
        ],
        gonggaoText: [
          {
            required: true,
            message: "请输入推送内容",
            trigger: "blur",
            type: "string",
          },
        ],
        campusIDs: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "array",
          },
        ],
        staffPostID: [
          {
            required: true,
            message: "请选择岗位",
            trigger: "change",
          },
        ],
        staffIDs: [
          {
            required: true,
            message: "请选择员工",
            trigger: "change",
            type: "array",
          },
        ],
        campusIDs: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
          },
        ],
      },
      alltuisongtype: [],
      allcampusData: [],
      staffpostData: [],
      allstaffData: [],
      imgurl: "",
      checkcampus: [],
    };
  },
  methods: {

    checkallCampus() {
      this.wxqfForm.campusIDs = "";
      this.checkcampus.forEach((item) => {
        this.wxqfForm.campusIDs += item.id + ",";
      });
    },

    ok(closetype) {
      api.post("xwcloud-sys/sys/StaffManagement/savefasonggsXiaoxi",{
        Id: 0,
        gonggaoTitel: this.wxqfForm.gonggaoTitel,
        gonggaoText: this.wxqfForm.gonggaoText,
        sendType: this.wxqfForm.sendType,
        sendCampusId: this.wxqfForm.sendCampusId,
        campusID: this.wxqfForm.campusID,
        sendStaffPostCampusId: this.wxqfForm.sendStaffPostCampusId,
        sendStaffId: this.wxqfForm.sendStaffId,
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
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
    },
    selectCampus(value) {
      api.get("xwcloud-sys/sys/StaffManagement/GetStaffPostByCampusID",{ CampusID: value }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.staffpostData = res.obj;
        }
      });
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

        if (this.editData == "") {
          this.title = "发送公司消息";
          api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: "538" }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allcampusData = res.obj;
            }
          });
          api.get("xwcloud-sys/sys/StaffManagement/getPxstafftableAllList",{}).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allstaffData = res.obj;
            }
          });
        } else {
          this.title = "修改公司消息";
          let getdata = JSON.parse(this.editData);

          console.log(getdata);

          this.wxqfForm.id = getdata.id;
          this.wxqfForm.gonggaoText = getdata.gonggaoContent;
          this.wxqfForm.gonggaoTitel = getdata.gonggaoTitel;
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
