<template>
  <Modal v-model="show" title="修改一对一班级" :mask-closable="false" @on-cancel="closeModal(false)">
    <div style="margin-bottom: 30px">
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：一对一的班级名称必须包含 "一对一" 几个字</span>
        </Col>
      </Alert>
    </div>

    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="100">
      <Row>
        <Col span="16" offset="4">
          <FormItem label="班级名称:" prop="className">
            <Input v-model="logForm.className" placeholder="请输入班级名称..." />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveOneClass('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "edit1v1class",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    classID: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        id: "",
        className: "",
      },
      allcampusData: [], //校区查询获取到的校区数据
      logFormRule: {
        className: [
          { required: true, message: "请输入一对一班级名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /**保存 */
    saveOneClass(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          api.post("xwcloud-stu/stu/stuClass/UpdatestuClassbyOne",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.$refs[name].resetFields();
              this.closeModal(false);
            } else {
              this.$Message.error(res.msg);
              this.closeModal(false);
            }
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
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
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

        this.logForm.id = this.classID;
        api.get("xwcloud-stu/stu/stuClass/getupdateClass",{ id: this.classID }).then((res) => {
          this.data = res.obj;
          this.logForm.zidingyiClassID = this.data.zidingyiClassID;
          this.logForm.campusID = this.data.campusID;
          this.logForm.className = this.data.className;
          console.log(res);
        });

        this.getAllCampusList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
