<template>
  <Modal
    v-model="show"
    title="添加员工信息"
    :loading="loading"
    :mask-closable="false"
    width="50"
  >
    <Row>
      <Alert show-icon style="margin: 0px 0px 10px 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：选择岗位之前，需要先选择校区。</span>
        </Col>
      </Alert>
    </Row>

    <Form
      ref="userForm"
      :model="userForm"
      :rules="userFormRule"
      :label-width="140"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="手机号码" prop="staffTel">
            <Input
              type="tel"
              :maxlength="11"
              v-model="userForm.staffTel"
              placeholder="请输入手机号码"
            />
          </FormItem>
        </Col>
        <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
          手机号码即是登录系统的账号，默认密码123456
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="真实姓名" prop="staffName">
            <Input
              type="text"
              :maxlength="50"
              v-model="userForm.staffName"
              placeholder="请输入真实姓名"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="性别" prop="staffSex">
            <Select v-model="userForm.staffSex" placeholder="请选择员工性别">
              <Option value="1">男</Option>
              <Option value="2">女</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="账号级别">
            <RadioGroup v-model="userForm.role">
              <Radio label="0">普通账号</Radio>
              <Radio label="1">管理员</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select
              v-model="userForm.campusID"
              placeholder="请选择校区"
              @on-change="getstaffpost"
            >
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="岗位" prop="staffPostID">
            <Select v-model="userForm.staffPostID" placeholder="请选择岗位">
              <Option v-for="item in staffpostDate" :value="item.id" :key="item.id">{{
                item.staffpostName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="入职时间" prop="joinTime">
            <DatePicker
              type="date"
              v-model="userForm.joinTime"
              placeholder="请输入入职时间"
              format="yyyy-MM-dd"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row v-if="userForm.showInApp == '1'">
        <Col span="21">
          <FormItem label="教师简介">
            <Input
              type="textarea"
              :rows="4"
              :maxlength="100"
              v-model="userForm.jiaoxueJingyan"
              placeholder="请输入教师简介,选填"
            />
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="21">
          <FormItem label="其他说明">
            <Input
              type="textarea"
              :rows="4"
              :maxlength="100"
              v-model="userForm.shuoMing"
              placeholder="请输入其他说明,选填"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="是否显示到小程序">
            <RadioGroup v-model="userForm.showInApp">
              <Radio label="1">是</Radio>
              <Radio label="2">否</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "addStaff",
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
      userForm: {
        role: "0",
        staffTel: "",
        staffName: "",
        staffPostID: "",
        campusID: "",
        headImg: "",
        shuoMing: "",
        pca: [],
        joinTime: "",
        staffSex: "",
        jiaoxueJingyan: "",
        showInApp: "2",
      },
      userFormRule: {
        staffTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            type: "string",
            max: 11,
            message: "请输入不超过11位的联系电话",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },

          // {
          //   validator: this.checkstaffTel({
          //     response: "exist",
          //   }),
          //   trigger: "blur",
          // },
        ],
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          {
            type: "string",
            max: 20,
            message: "请输入不超过20字的真实姓名",
            trigger: "blur",
          },
        ],
        shuoMing: [{ required: true, message: "请输入其他说明", trigger: "blur" }],
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        staffPostID: [
          {
            required: true,
            message: "请选择用户岗位",
            trigger: "change",
            type: "string",
          },
        ],
        joinTime: [
          {
            required: true,
            message: "请选择入职时间",
            trigger: "blur",
            type: "date",
          },
        ],
        staffSex: [
          {
            required: true,
            message: "请选择员工性别",
            trigger: "change",
            type: "string",
          },
        ],
      },
      staffpostDate: [],
      allcampusData: [],
    };
  },
  methods: {
    ok(closetype) {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          api.post("xwcloud-sys/sys/StaffManagement/addPxstafftable",{
            role: this.userForm.role,
            staffName: this.userForm.staffName,
            staffTel: this.userForm.staffTel,
            password: "123456",
            staffSex: this.userForm.staffSex == "1" ? "男" : "女",
            campusID: this.userForm.campusID,
            staffPostID: this.userForm.staffPostID,
            joinTime: this.userForm.joinTime,
            shuoMing: this.userForm.shuoMing,
            jiaoxueJingyan: this.userForm.jiaoxueJingyan,
            showInApp: this.userForm.showInApp == "1" ? true : false,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              if (closetype == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
              this.$refs["userForm"].resetFields();
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
        }
      });
    },
    checkstaffTel() {},

    getstaffpost() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllStaffPostListByCampusID",{ campusID: this.userForm.campusID }).then(
        (res) => {
          if (res.code == "Y" && res.success == true) {
            this.staffpostDate = res.obj;
          }
        }
      );
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
        this.$refs["userForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 531 }).then((res) => {
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
