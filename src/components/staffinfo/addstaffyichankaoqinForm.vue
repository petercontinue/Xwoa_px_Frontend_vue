<template>
  <Modal
    v-model="show"
    title="添加员工异常考勤"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="yichankqForm"
      :model="yichankqForm"
      :rules="yichankqFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="yichankqForm.campusID"
          placeholder="请选择校区"
          style="width: 100%"
          @on-change="searchstaffList"
          filterable
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="员工" prop="staffID">
        <Select
          v-model="yichankqForm.staffID"
          placeholder="请选择员工"
          style="width: 100%"
          filterable
        >
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="类别" prop="type">
        <Select
          v-model="yichankqForm.type"
          placeholder="请选择异常考勤类别"
          style="width: 100%"
        >
          <Option value="1" key="1">请假</Option>
          <Option value="2" key="2">迟到</Option>
          <Option value="3" key="3">早退</Option>
          <Option value="4" key="4">旷工</Option>
        </Select>
      </FormItem>
      <FormItem label="日期" prop="riqi">
        <DatePicker
          type="date"
          placeholder="请选择日期"
          v-model="yichankqForm.riqi"
          style="width: 100%"
          :editable="false"
        ></DatePicker>
      </FormItem>
      <FormItem label="考勤说明" prop="shuoming">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="yichankqForm.shuoming"
          placeholder="请输入考勤说明"
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
import toolbox from "@/libs/toolbox";
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
      yichankqForm: {
        campusID: "",
        staffID: "",
        type: "",
        riqi: "",
        shuoming: "",
      },
      yichankqFormRule: {
        campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
        staffID: [{ required: true, message: "请选择员工", trigger: "blur" }],
        type: [{ required: true, message: "请选择考勤类别", trigger: "blur" }],
        riqi: [
          {
            required: true,
            type: "date",
            message: "请选择考勤日期",
            trigger: "change",
          },
        ],
      },
      allstaffData: [],
      allcampusData: [],
    };
  },
  methods: {
    ok(closetype) {
      this.$refs["yichankqForm"].validate((valid) => {
        if (valid) {
          this.yichankqForm.riqi = toolbox.dateFtt(this.yichankqForm.riqi, "yyyy-MM-dd");
          console.log(this.yichankqForm);
          api.post("xwcloud-sys/sys/StaffManagement/Addyuanggongyichangkaoqin",{
            staffID: this.yichankqForm.staffID,
            type: this.yichankqForm.type,
            riqi: this.yichankqForm.riqi,
            shuoming: this.yichankqForm.shuoming,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              if (closetype == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
              this.$refs["yichankqForm"].resetFields();
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
              // 官方目前没有解决方案
              this.loading = false;
              setTimeout(() => {
                this.loading = true;
              }, 0);
            }
          });
        } else {
          console.log("22");
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
    searchstaffList(value) {
      console.log(value);
      api.get("xwcloud-sys/sys/StaffManagement/getstaffListByCampusID",{ campusID: value }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstaffData = res.obj;
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
        this.$refs["yichankqForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 535 }).then((res) => {
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
