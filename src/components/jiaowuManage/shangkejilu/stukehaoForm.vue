<template>
  <Modal
    v-model="show"
    title="导出学员上课记录"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem label="类型" prop="type">
        <Select v-model="logForm.type" placeholder="请选择类型">
          <Option v-for="item in typeList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>

      <FormItem label="校区" prop="campusID" v-if="logForm.type ==='1'">
        <Select v-model="logForm.campusID" filterable placeholder="请选择校区">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem
        label="学员"
        prop="stuID"
        filterable
        v-if="logForm.type === '2' || logForm.type === '3' "
      >
        <Select v-model="logForm.stuID" placeholder="请选择类型">
          <Option v-for="item in stuList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>

      <FormItem label="年月" prop="joinTime" v-if="logForm.type != '3' ">
        <DatePicker type="month" v-model="logForm.joinTime" placeholder="选择年月" style="width: 100%"></DatePicker>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="save('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "derivestukehao",
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
      logForm: {
        campusID: "",
        joinTime: "",
        stuID: "",
        type: "",
      },
      logFormRule: {
        type: [
          { required: true, message: "请选择导出类型", trigger: "change" },
        ],
        campusID: [
          { required: true, message: "请选择校区", trigger: "change" },
        ],
        stuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        joinTime: [
          {
            required: true,
            type: "date",
            message: "请选择导出年月",
            trigger: "change",
          },
        ],
      },
      allcampusData: [],
      typeList: [
        { id: "1", name: "按校区和月份导出" },
        { id: "2", name: "按学员和月份导出" },
        { id: "3", name: "导出学员全部课时记录" },
      ],
      stuList: [],
    };
  },
  methods: {
    save(name) {
      this.$refs[name].validate((valid) => {
        console.log(this.logForm);
        if (valid) {
          if (this.logForm.joinTime != "") {
            this.logForm.joinTime = toolbox.dateFtt(
              this.logForm.joinTime,
              "yyyy-MM"
            );
          }
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-pkxk/kehao/ClassRecord/ExportStukehao",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: this.logForm,
              responseType: "blob",
            })
            .then((res) => {
              this.btnLoading = false;
              // 文件下载
              const blob = new Blob([res], {
                type: "application/vnd.ms-excel",
              });
              let link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.setAttribute("download", "学员上课记录导出.xls");
              link.click();
              link = null;
              this.$Message.success("导出成功");
              this.closeModal(false);
            })
            .catch((err) => {
              this.btnLoading = false;
              this.$Message.error("下载失败");
            });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    /**清除 */
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
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
        this.$refs["logForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 251 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-pkxk/kehao/ClassRecord/getStuList",{ menuID: 251 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.stuList = res.obj;
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
