<template>
  <Modal
    v-model="show"
    title="添加相册"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Form
      ref="photoFrom"
      :model="photo"
      :rules="photoRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="相册类型" prop="type">
        <Select v-model="photo.type" placeholder="请选类型">
          <Option v-for="item in typeData" :value="item.id" :key="item.id">{{
            item.text
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="学员姓名" prop="stuID" v-if="photo.type==1">
        <Select v-model="photo.stuID" placeholder="请选学员姓名">
          <Option v-for="item in allstuData" :value="item.id" :key="item.id">{{
            item.stuName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="班级名称" prop="typeparmID" v-if="photo.type==3">
        <Select v-model="photo.typeparmID" placeholder="请选班级名称">
          <Option
            v-for="item in allclassData"
            :value="item.id"
            :key="item.id"
            >{{ item.className }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="校区名称" prop="typeparmID" v-if="photo.type==2">
        <Select v-model="photo.typeparmID" placeholder="请选校区名称">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.campusName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="标题" prop="title">
        <Input v-model="photo.title" placeholder="请输入标题" />
      </FormItem>
      <FormItem label="描述" prop="miaoshu">
        <Input
          v-model="photo.miaoshu"
          type="textarea"
          :rows="4"
          placeholder=""
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "addphoto",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      photo: {
        stuID: "",
        title: "",
        miaoshu: "",
        typeparmID: "",
        type: "",
      },
      photoRule: {
        // 验证输入
        stuID: [{ required: true, message: "请选择学员", trigger: "blur" }],
        type: [{ required: true, message: "请选择相册类型", trigger: "blur" }],
        typeparmID: [
          { required: true, message: "请进行选择", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入相册标题", trigger: "blur" }],
        miaoshu: [{ required: true, message: "请输入描述", trigger: "blur" }],
      },
      allclassData: [], // 班级数据列表
      allcampusData: [], // 校区数据列表
      allstuData: [], // 学生数据列表
      typeData: [
        { id: 1, text: "学员相册" },
        { id: 2, text: "校区相册" },
        { id: 3, text: "班级相册" },
      ],
      showStu: true,
    };
  },
  methods: {
    ok() {
      console.log(this.photo);
      if (this.editData == "") {
        api.post("xwcloud-homeschool/homeschool/pxxiangcetable/addXiangce",this.photo).then((res) => {
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
      } else {
        this.photo.addTime=toolbox.dateFtt(this.photo.addTime, "yyyy-MM-dd hh:mm:ss");
        api.post("xwcloud-homeschool/homeschool/pxxiangcetable/editXiangce",this.photo)
          .then((result) => {
            if (result.code == "Y" && result.success == true) {
              this.$Message.success(result.msg);
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.success(result.msg);
            }
          })
          .catch((err) => {});
      }
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
        this.$refs["photoFrom"].resetFields();
        if (this.editData != "") {
          var data = JSON.parse(this.editData);
          this.photo = data;
        }
        // 获取班级列表
        api.get("xwcloud-homeschool/homeschool/public/getClassList",{
          qiyeID: this.$store.state.kehoupingjia.qiyeID,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取班级列表
            this.allclassData = res.obj;
          }
        });
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",{
          qiyeID: this.$store.state.kehoupingjia.qiyeID,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取班级列表
            this.allcampusData = res.obj;
          }
        });
        // 获取学生列表
        api.get("xwcloud-homeschool/homeschool/public/getPublicStuList",{
          qiyeID: this.$store.state.kehoupingjia.qiyeID,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            // 获取班级列表
            this.allstuData = res.obj;
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
