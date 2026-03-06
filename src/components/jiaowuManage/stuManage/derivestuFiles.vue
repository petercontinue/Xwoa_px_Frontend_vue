<template>
  <Modal
    v-model="show"
    title="学员档案导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="45"
    ok-text="导出"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <Row>
        <Col span="24" style="text-align: center; margin: 10px">
          <Font style="color: blue">若不选择，则全部导出</Font>
        </Col>
      </Row>
      <Row>
        <Col span="3" offset="1" class="col-all">校区：</Col>
        <Col span="8">
          <FormItem prop="campusID">
            <Select v-model="logForm.campusID" placeholder="请选择校区">
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="3" class="col-all">年级：</Col>
        <Col span="8">
          <FormItem prop="stugradeID">
            <Select v-model="logForm.stugradeID" placeholder="请选择年级">
              <Option v-for="item in allGrade" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="3" offset="1" class="col-all">班级：</Col>
        <Col span="8">
          <FormItem prop="campusID">
            <Select v-model="logForm.classID" placeholder="请选择班级">
              <Option v-for="item in allClass" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="3" offset="1" class="col-all">开始日期：</Col>
        <Col span="8">
          <FormItem prop="joinTime">
            <DatePicker
              type="date"
              v-model="logForm.starDate"
              placeholder="选择开始日期"
              style="width: 100%"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="3" class="col-all">结束日期：</Col>
        <Col span="8">
          <FormItem prop="joinTime">
            <DatePicker
              type="date"
              v-model="logForm.endDate"
              placeholder="选择结束日期"
              style="width: 100%"
              format="yyyy-MM-dd"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<style>
.reight-col {
  margin-left: 10px;
}
.col-all {
  text-align: center;
  line-height: 30px;
}
</style>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
export default {
  name: "derivestuFiles",
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
        stugradeID: "",
        classID: "",
        starDate: "",
        endDate: "",
      },
      logFormRule: {},
      allcampusData: [],
      allGrade: [],
      allClass: [],
    };
  },
  methods: {
    ...mapActions(["getallcampusList", "Getnianji", "getAllClass"]),
    ok() {
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-stu/stu/stuManagement/exportAllStuFiles",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: this.logForm.campusID,
            stugradeID: this.logForm.stugradeID,
            classID: this.logForm.classID,
            starDate: this.logForm.starDate,
            endDate: this.logForm.endDate,
          },
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
          link.setAttribute("download", "学员档案.xls");
          link.click();
          link = null;
          this.$Message.success("导出成功");
          this.closeModal(false);
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
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
      this.$refs["logForm"].resetFields();
      if (val) {
        this.getallcampusList({ menuID: 211 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        this.Getnianji({}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allGrade = res.obj;
          }
        });
        this.getAllClass({}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allClass = res.obj;
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
