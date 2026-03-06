<template>
  <Modal v-model="show" title="新建/修改班级" :mask-closable="false" @on-cancel="closeModal(false)" width=40>
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="180">
      <Row>
        <Col span="16" >
          <FormItem label="校区:" prop="campusID">
            <Select v-model="logForm.campusID" placeholder="请选择校区">
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="16">
          <FormItem label="班级自定义编号:">
            <Input v-model="logForm.zidingyiClassID" placeholder="请输入班级自定义编号..." />
          </FormItem>
        </Col>
        <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px;color: #2d8cf0;">
          选填
        </Col>
      </Row>
      <Row>
        <Col span="16">
          <FormItem label="班级名称:" prop="className">
            <Input v-model="logForm.className" placeholder="请输入班级名称..." />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="16">
          <FormItem label="班级最大人数:">
            <Input v-model="logForm.maxStuNum" type="number" placeholder="请输入班级最大人数" />
          </FormItem>
        </Col>
        <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px;color: #2d8cf0;">
          不填表示不限制
        </Col>
      </Row>

      <!--  -->
    </Form>
    <div slot="footer">
      <Button type="primary" v-if="type==1" @click="saveClass('logForm',1)">保存并继续添加</Button>
      <Button type="primary" @click="saveClass('logForm',2)">保存并关闭</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "addOreditclass",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    classID: { type: String },
    type: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        id: "",
        campusID: "",
        zidingyiClassID: "",
        className: "",
        maxStuNum: ""
      },
      allcampusData: [], //校区查询获取到的校区数据
      logFormRule: {
        campusID: [
          { required: true, message: "请选择校区", trigger: "change" },
        ],
        className: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {

    /**保存 */
    saveClass(name, type) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.type == 1) {
            api.post("xwcloud-stu/stu/stuClass/addClass",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                if (type == 2) {
                  this.closeModal(false);
                }
              } else {
                this.$Message.error(res.msg);
                //this.closeModal(false);
              }
            });
          } else if (this.type == 2) {
            api.get("xwcloud-stu/stu/stuClass/getupdateClass",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.closeModal(false);
              } else {
                this.$Message.error(res.msg);
                //this.closeModal(false);
              }
            });
          }
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
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 231 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
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
        this.$refs["logForm"].resetFields();
        if (this.type == 2) {
          this.logForm.id = this.classID;
          api.get("xwcloud-stu/stu/stuClass/getupdateClass",{ id: this.classID }).then((res) => {
            this.data = res.obj;
            this.logForm.zidingyiClassID = this.data.zidingyiClassID;
            this.logForm.campusID = this.data.campusID;
            this.logForm.className = this.data.className;
            console.log(res);
          });
        }
        this.getAllCampusList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
