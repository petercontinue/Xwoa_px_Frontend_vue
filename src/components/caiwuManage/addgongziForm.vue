<template>
  <Modal
    v-model="show"
    title="工资录入"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    :width="50"
  >
    <Form
      ref="addgongziForm"
      :model="params"
      :rules="paramsRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="教师" prop="staffID">
        <Select
          v-model="params.staffID"
          placeholder="请选择教师"
          style="width: 68%"
        >
          <Option
            v-for="item in allstaffData"
            :value="item.id"
            :key="item.id"
            >{{ item.staffName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="月份" prop="month">
        <DatePicker
          type="month"
          placeholder="请选择月份"
          v-model="params.month"
          @on-change="changeDate"
          style="width: 68%"
        ></DatePicker>
      </FormItem>
      <Table :columns="columns" :data="gongziproList">
        <template slot-scope="{ row }" slot="money">
          <FormItem label="">
            <Input
              v-model="params.gongzipro[row.id]"
              placeholder="请输入金额"
              style="width: 80%"
              @on-change="moneychange($event, row)"
            />
          </FormItem>
        </template>
      </Table>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "addgongziForm",
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
      columns: [
        {
          title: "编号",
          key: "id",
        },
        {
          title: "工资项目",
          key: "salaryStyle",
        },
        {
          title: "金额",
          slot: "money",
        },
      ],
      params: {
        staffID: "",
        month: "",
        gongzipro: {},
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        staffID: [{ required: true, message: "请选择教师", trigger: "blur" }],
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
      },
      gongziproList: [],
      allstaffData: [],
    };
  },
  methods: {
    getGongziListPro() {
      this.params.gongzipro = {};
      api.get("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/getGongziPro",{
        staffID: this.params.staffID,
        qiyeID: this.params.qiyeID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.gongziproList = res.obj;
          this.params.gongzipro = {};
          for (let index = 0; index < this.gongziproList.length; index++) {
            let pro = this.gongziproList[index];
            let keyid = pro.id;
            this.params.gongzipro[keyid] = 0;
          }
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    changeDate(val) {
      this.params.month = toolbox.dateFtt(val, "yyyy-MM");
    },
    moneychange(e, row) {
      let keyid = row.id;
      this.params.gongzipro[keyid] = e.target.value;
      console.log(this.params.gongzipro);
    },
    ok() {
      api.post("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/addGongzi",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res);
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
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    "params.staffID"(val) {
      this.getGongziListPro();
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["addgongziForm"].resetFields();
        // 获取教师
        api.get("xwcloud-homeschool/homeschool/public/getStaffList",{
          qiyeID: this.params.qiyeID,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstaffData = res.obj;
          } else {
            this.$Message.error(res.msg);
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
