<template>
  <Modal
    v-model="show"
    title="老师课后反馈"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Form
      ref="laoshipingjiaFrom"
      :model="laoshipingjia"
      :rules="laoshipingjiaRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="laoshipingjia.campusID"
          placeholder="请选择校区"
          @on-change="getClassListData"
        >
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.campusName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="班级" prop="classID">
        <Select
          v-model="laoshipingjia.classID"
          placeholder="请选择班级"
          @on-change="getPeriodListData"
        >
          <Option v-for="item in allclassData" :value="item.id" :key="item.id">{{
            item.className
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="上课时间段" prop="sksj">
        <Select
          v-model="laoshipingjia.sksj"
          placeholder="请选择上课时间段"
          @on-change="getStuAndStaffListData"
        >
          <Option v-for="item in allperiodData" :value="item.Period" :key="item.Period">{{
            item.Period
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="要点评的学员" prop="stuID">
        <Select v-model="laoshipingjia.stuID" placeholder="请选择学员">
          <Option v-for="item in allstuData" :value="item.id" :key="item.id">{{
            item.stuName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="老师" prop="teacherID">
        <Select v-model="laoshipingjia.teacherID" placeholder="请选择老师">
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="反馈内容" prop="note">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="laoshipingjia.note"
          placeholder="请输入评价"
        />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit('laoshipingjiaFrom', 1)"
        >保存并继续添加</Button
      >
      <Button type="primary" @click="handleSubmit('laoshipingjiaFrom', 2)"
        >保存并关闭</Button
      >
      <Button @click="handleReset('laoshipingjiaFrom')" style="margin-left: 8px"
        >取消</Button
      >
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "addLaoshikehoupingjia",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      laoshipingjia: {
        campusID: "", // 校区ID
        classID: "", // 班级ID
        sksj: "", // 上课时间段
        type: 1, // 评价类型
        stuID: "", // 学生ID
        teacherID: "", // 老师ID
        qiyeID: "", // 企业ID
        images: "",
        pjmp3Url: "",
        pjvideoUrl: "",
        note: "",
      },
      laoshipingjiaRule: {
        // 验证输入
        campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
        classID: [{ required: true, message: "请选择班级", trigger: "blur" }],
        stuID: [{ required: true, message: "请选择学员", trigger: "blur" }],
        teacherID: [{ required: true, message: "请选择老师", trigger: "blur" }],
        sksj: [{ required: true, message: "请选择时间段", trigger: "blur" }],
        note: [{ required: true, message: "请输入评价", trigger: "blur" }],
      },
      allcampusData: [], // 校区列表数据
      allclassData: [], // 班级数据列表
      allstuData: [], // 学生数据列表
      allperiodData: [], // 时间段列表
      allstaffData: [],
    };
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
    },
    handleSubmit(name, type) {
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          // 点击确定按钮时调用
          api
            .post("xwcloud-homeschool/homeschool/pxevaluationtable/addFeedback", {
              campusID: this.laoshipingjia.campusID,
              classID: this.laoshipingjia.classID,
              sksj: this.laoshipingjia.sksj,
              type: this.laoshipingjia.type,
              stuID: this.laoshipingjia.stuID,
              teacherID: this.laoshipingjia.teacherID,
              images: this.laoshipingjia.images,
              pjmp3Url: this.laoshipingjia.pjmp3Url,
              pjvideoUrl: this.laoshipingjia.pjvideoUrl,
              note: this.laoshipingjia.note,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.$refs[name].resetFields();
                if (type == 2) {
                  this.closeModal(false);
                }
              } else {
                this.$Message.error(res.msg);
              }
            });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    getClassListData(value) {
      api
        .get("xwcloud-homeschool/homeschool/public/getClassList", {
          campusID: value,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取班级列表
            this.allclassData = res.obj;
          }
        });
    },
    getPeriodListData(value) {
      // 获取时间段
      api
        .get("xwcloud-homeschool/homeschool/pxevaluationtable/getPeriodList", {
          campusID: this.laoshipingjia.campusID,
          classID: value,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取列表
            this.allperiodData = res.obj;
          }
        });
    },
    getStuAndStaffListData(value) {
      // 获取学生和老师的数据
      // 获取学生
      api
        .get("xwcloud-homeschool/homeschool/pxevaluationtable/getStuList", {
          classID: this.laoshipingjia.classID,
          campusID: this.laoshipingjia.campusID,
          shangkesjd: value,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取学生列表
            this.allstuData = res.obj;
          }
        });
      // 获取老师
      api
        .get("xwcloud-homeschool/homeschool/public/getStaffList", {
          classID: this.laoshipingjia.classID,
          campusID: this.laoshipingjia.campusID,
          shangkesjd: value,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取老师列表
            this.allstaffData = res.obj;
          }
        });
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["laoshipingjiaFrom"].resetFields();
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList", {}).then((res) => {
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
