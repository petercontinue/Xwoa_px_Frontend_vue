<template>
  <Modal
    v-model="show"
    title="归还图书"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="bookFrom"
      :model="params"
      :rules="paramsRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区">
        <Select
          disabled
          v-model="params.campusID"
          placeholder="请选择校区"
        >
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.campusName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="名称" prop="booksName">
        <Input v-model="params.booksName" placeholder="请输入名称" disabled />
      </FormItem>
      <FormItem label="归还数量" prop="guihuanNum">
        <Input v-model="params.guihuanNum" placeholder="请输入总数量" />
      </FormItem>
      <FormItem label="归还时间">
        <DatePicker
          type="date"
          placeholder="请选择日期"
          v-model="params.guihuansj"
          @on-change="setguihuansj"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
      <FormItem label="经办人">
        <Select
          v-model="params.jingbanrenID"
          placeholder="请选择经办人"
          style="width: 80%"
        >
          <Option
            v-for="item in allStaffData"
            :value="item.id"
            :key="item.id"
            >{{ item.staffName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="说明">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="params.shuoming"
          placeholder="请输入内容"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "huanshuForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    jieshuid: {},
    bookID: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        campusID: "",
        booksName: "",
        jieshuID: this.jieshuid,
        guihuanNum: "",
        shuoming: "",
        guihuansj: "",
        jingbanrenID: "",
      },
      paramsRule: {
        // 验证输入
        //campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
      },
      allcampusData: [], // 班级数据列表
      allStaffData: [],
    };
  },
  methods: {
    ok() {
      api.post("xwcloud-homeschool/homeschool/pxbooks/returnBook",this.params).then((res) => {
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
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    setguihuansj(val) {
      this.params.guihuansj = toolbox.dateFtt(val, "yyyy-MM-dd");
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
        this.$refs["bookFrom"].resetFields();
        this.params.jieshuID = this.jieshuid;
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-homeschool/homeschool/public/getStaffList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allStaffData = res.obj;
          }
        });
        api.get("xwcloud-homeschool/homeschool/pxbooks/getPxbook",{
          id: this.bookID
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res);
            this.params.campusID = res.obj.campusID;
            this.params.booksName = res.obj.booksName;
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
