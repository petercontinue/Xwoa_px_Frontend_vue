<template>
  <Modal
    v-model="show"
    title="工资项目分配"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form ref="params" :model="params" :rules="paramsRule" :label-width="120" :label-colon="true">
      <FormItem label="校区" prop="campusID">
        <Select disabled v-model="params.campusID" placeholder="请选择校区">
          <Option v-for="item in campusList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="岗位" prop="postID">
        <Select disabled v-model="params.postID" placeholder="请选择岗位">
          <Option
            v-for="item in staffpostList"
            :value="item.id"
            :key="item.id"
          >{{ item.staffpostName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="项目名称" prop="xiangmuIDs">
        <Select multiple v-model="xiangmuIDList" placeholder="请选择项目名称">
          <Option
            v-for="item in gongzixiangmuList"
            :value="item.id"
            :key="item.id"
          >{{ item.salaryStyle }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit()">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "editgongzifenpeiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    postID: {},
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        ID: "",
        campusID: "",
        postID: "",
        xiangmuIDs: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        campusID: [
          { required: true, message: "请输入工资项目名称", trigger: "blur" },
        ],
        postID: [{ required: true, message: "请选择岗位", trigger: "blur" }],
        xiangmuIDs: [
          { required: true, message: "请选择项目名称", trigger: "blur" },
        ],
      },
      staffpostList: [],
      campusList: [],
      gongzixiangmuList: [],
      xiangmuIDList: [],
    };
  },
  methods: {
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 324 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
        }
      });
    },
    handleReset() {
      this.$refs["params"].resetFields();
      this.closeModal(false);
    },
    handleSubmit() {
      for (let index = 0; index < this.xiangmuIDList.length; index++) {
        this.params.xiangmuIDs += this.xiangmuIDList[index] + ",";
      }
      this.params.xiangmuIDs = this.params.xiangmuIDs.substring(
        0,
        this.params.xiangmuIDs.length - 1
      );
      api.post("xwcloud-caiwu/caiwu/pxgongzitable/gongzifenpei/editGongzifenpei",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res);
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
          this.$refs["params"].resetFields();
        } else {
          this.$Message.error(res.msg);
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
        this.$refs["params"].resetFields();
        this.getAllCampusList();
        this.params.postID = this.postID;
        // 岗位
        api.get("xwcloud-homeschool/homeschool/public/getPublicStaffPostList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.staffpostList = res.obj;
          } else {
            this.$Message.error(res.msg);
          }
        });

        // 工资项目
        api.get("xwcloud-caiwu/caiwu/pxgongzitable/gongzifenpei/getGongzixiangmuList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.gongzixiangmuList = res.obj;
            console.log(this.gongzixiangmuList);
          } else {
            this.$Message.error(res.msg);
          }
        });
        setTimeout(() => {
          this.params.postID = JSON.parse(this.editData).postID;
          this.params.campusID = JSON.parse(this.editData).campusID;
          this.params.xiangmuIDs = JSON.parse(this.editData).sStyleID;
          this.xiangmuIDList = JSON.parse(this.editData).sStyleID.split(",");
          let kmlist = [];
          for (var i = 0; i < this.xiangmuIDList.length; i++) {
            kmlist.push({ i: this.xiangmuIDList[i] });
          }
        }, 200);

        // this.getGongzifenpei(this.params).then((res) => {
        //   if (res.code == "Y" && res.success == true) {
        //     this.params.postID = res.obj.postID;
        //     this.params.campusID = res.obj.campusID;
        //     this.xiangmuIDList = res.obj.sStyleID.split(",");
        //   } else {
        //     this.$Message.error(res.msg);
        //   }
        // });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
