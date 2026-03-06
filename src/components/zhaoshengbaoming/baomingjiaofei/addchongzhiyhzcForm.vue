<template>
  <Modal
    v-model="show"
    title="添加充值优惠政策"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="55"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="充值金额" prop="zongmoney">
        <InputNumber
          :max="10000000"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.zongmoney"
          placeholder="请输入充值限制金额"
          style="width: 100%"
        ></InputNumber>
      </FormItem>
      <FormItem label="赠送金额" prop="huodongmoney">
        <InputNumber
          :max="10000000"
          :min="0.01"
          :step="0.01"
          v-model="shezhiForm.huodongmoney"
          placeholder="请输入充值赠送金额"
          style="width: 100%"
        ></InputNumber>
      </FormItem>
      <FormItem label="开始时间" prop="sdate">
        <DatePicker
          type="date"
          placeholder="请选择开始时间"
          v-model="shezhiForm.sdate"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
      <FormItem label="结束时间" prop="edate">
        <DatePicker
          type="date"
          placeholder="请选择结束时间"
          v-model="shezhiForm.edate"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        id: 0,
        zongmoney: 0,
        huodongmoney: 0,
        sdate: "",
        edate: "",
      },
      shezhiFormRule: {
        zongmoney: [
          {
            required: true,
            message: "请输入充值总金额",
            trigger: "change",
            type: "number",
          },
        ],
        huodongmoney: [
          {
            required: true,
            message: "请输入充值活动金额",
            trigger: "change",
            type: "number",
          },
        ],
        sdate: [
          {
            required: true,
            message: "请选择活动开始时间",
            trigger: "change",
            type: "date",
          },
        ],
        edate: [
          {
            required: true,
            message: "请选择活动结束时间",
            trigger: "change",
            type: "date",
          },
        ],
      },
      allcampusData: [],
    };
  },
  methods: {
    ok(closetype) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          if (this.shezhiForm.id == 0) {
            //新增充值优惠政策保存事件
            api
              .post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddChongzhiyouhuizhengce", {
                zongmoney: this.shezhiForm.zongmoney,
                huodongmoney: this.shezhiForm.huodongmoney,
                sdate: toolbox.dateFtt(this.shezhiForm.sdate, "yyyy-MM-dd"),
                edate: toolbox.dateFtt(this.shezhiForm.edate, "yyyy-MM-dd"),
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  if (closetype == 2) {
                    // 提交表单数据成功则关闭当前的modal框
                    this.closeModal(false);
                  }
                  this.$refs["shezhiForm"].resetFields();
                  // 同时调用父页面的刷新页面的方法
                  this.$emit("handleSearch");
                } else {
                  this.$Message.error(res.msg);
                }
              });
          } else {
            //修改优惠政策保存事件
            api
              .post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateChongzhiyouhuizhengce", {
                id: this.shezhiForm.id,
                zongmoney: this.shezhiForm.zongmoney,
                huodongmoney: this.shezhiForm.huodongmoney,
                sdate: toolbox.dateFtt(this.shezhiForm.sdate, "yyyy-MM-dd"),
                edate: toolbox.dateFtt(this.shezhiForm.edate, "yyyy-MM-dd"),
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.closeModal(false);
                  this.$emit("handleSearch");
                } else {
                  this.$$Message.error(res.msg);
                }
              });
          }
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
        this.$refs["shezhiForm"].resetFields();
        if (this.editData != "") {
          let data = JSON.parse(this.editData);
          this.shezhiForm.id = data.id;
          this.shezhiForm.zongmoney = data.zongmoney;
          this.shezhiForm.huodongmoney = data.huodongmoney;
          this.shezhiForm.sdate = toolbox.dateFtt(data.sdate, "yyyy-MM-dd");
          this.shezhiForm.edate = toolbox.dateFtt(data.edate, "yyyy-MM-dd");
        } else {
          this.shezhiForm.id = 0;
          this.shezhiForm.zongmoney = 0;
          this.shezhiForm.huodongmoney = 0;
          this.shezhiForm.sdate = "";
          this.shezhiForm.edate = "";
        }
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus", {}).then((res) => {
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
