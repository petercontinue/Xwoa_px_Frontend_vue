<template>
  <Modal
    v-model="show"
    title="老学员充值"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="学生姓名" prop="selectstuID">
            <Select
              v-model="shezhiForm.selectstuID"
              placeholder="请选择学生"
              style="width: 100%"
              filterable
            >
              <Option
                v-for="item in AllstuData"
                :value="item.id"
                :key="item.id"
                >{{ item.stuName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="办理时间" prop="addDateTime">
            <DatePicker
              type="date"
              placeholder="请选择办理时间"
              v-model="shezhiForm.addDateTime"
              style="width: 100%"
              @on-change="changeDate"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="充值金额" prop="zongmoney">
            <InputNumber
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.zongmoney"
              placeholder="请输入充值金额"
              style="width: 100%"
              @on-change="changechongzhijine"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="赠送金额" prop="huodongmoney">
            <InputNumber
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.huodongmoney"
              placeholder="请输入充值赠送金额"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="实得总金额" prop="totalMoney">
            <InputNumber
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.totalMoney"
              placeholder="请输入实得总金额"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
        <!-- <Col span="12">
          <FormItem label="付款方式" prop="payMoneyStyleId">
            <Select
              v-model="shezhiForm.payMoneyStyleId"
              placeholder="请选择付款方式"
              style="width: 100%"
              filterable
            >
              <Option
                v-for="item in fufeistyleData"
                :value="item.id"
                :key="item.id"
                >{{ item.moneystyleName }}</Option
              >
            </Select>
          </FormItem>
        </Col> -->
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="付款方式">
            <RadioGroup v-model="payType" @on-change="changPaystyle">
              <Radio label="小程序付款"></Radio>
              <Radio label="其他付款方式"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12" v-if="payType == '其他付款方式'">
          <FormItem label="付款方式" prop="payMoneyStyleId">
            <Select
              v-model="shezhiForm.payMoneyStyleId"
              placeholder="请选择付款方式"
              multiple
              @on-change="changefukuanstyle"
            >
              <Option
                v-for="item in fufeistyleData"
                :value="item.id"
                :key="item.id"
                >{{ item.moneystyleName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <List
            header="支付方式支付金额"
            footer
            border
            style="width: 100%"
            v-if="zhifustylemoney.length > 0"
          >
            <ListItem v-for="(item, index) in zhifustylemoney" :key="index">
              {{ item.zhifustyleName }}：
              <InputNumber
                placeholder="支付方式支付金额"
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="item.payMoney"
                style="width: 50%"
                @on-change="changepaymoney(item)"
              ></InputNumber>
            </ListItem>
          </List>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="业绩人" prop="yeJiRenId">
            <Select
              v-model="shezhiForm.yeJiRenId"
              placeholder="请选择业绩人"
              style="width: 100%"
              filterable
            >
              <Option
                v-for="item in allyejistaff"
                :value="item.id"
                :key="item.id"
                >{{ item.staffName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12"></Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续充值</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
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
        selectstuID: "",
        zongmoney: 0,
        huodongmoney: 0,
        addDateTime: "",
        totalMoney: 0,
        payMoneyStyleId: "",
        yeJiRenId: "",
      },
      shezhiFormRule: {
        selectstuID: [
          {
            required: true,
            message: "请选择学员",
            trigger: "change",
            type: "string",
          },
        ],
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
        addDateTime: [
          {
            required: true,
            message: "请选择办理时间",
            trigger: "change",
            type: "date",
          },
        ],
        totalMoney: [
          {
            required: true,
            message: "请输入实得总金额",
            trigger: "change",
            type: "number",
          },
        ],
        payMoneyStyleId: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change",
            type: "array",
          },
        ],
        yeJiRenId: [
          {
            required: true,
            message: "请选择业绩人",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allyejistaff: [],
      fufeistyleData: [],
      AllstuData: [],
      allczhuodong: [],
      payType: "小程序付款",
      zhifustylemoney: [],
    };
  },
  methods: {
    ok(closeFlag) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          console.log(this.zhifustylemoney);
          let zhifustyle = "";
          this.shezhiForm.payMoneyStyleId.forEach((element) => {
            zhifustyle += element + ",";
          });
          var reg = /,$/gi;
          api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddOldStuChongzhi",{
            oldStuId: this.shezhiForm.selectstuID,
            yeJiRenId: this.shezhiForm.yeJiRenId,
            chongzhiMoney: this.shezhiForm.zongmoney,
            zengsongMoney: this.shezhiForm.huodongmoney,
            totalMoney: this.shezhiForm.totalMoney,
            payMoneyStyleId: zhifustyle.replace(reg, ""),
            addDateTime: this.shezhiForm.addDateTime,
            paystylemoney: JSON.stringify(this.zhifustylemoney),
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              if (closeFlag == 2) {
                this.closeModal();
              }
              this.$refs["shezhiForm"].resetFields();
              this.$Message.success(res.msg);
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
    closeModal(val) {
      this.$emit("input", val);
    },
    changeDate() {
      api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/Getkeyongchongzhihuodong",{
        operateTime: toolbox.dateFtt(this.shezhiForm.addDateTime, "yyyy-MM-dd"),
      }).then((res) => {
        console.log(res);
        if (res.code == "Y" && res.success == true) {
          this.allczhuodong = res.obj;
        }
      });
    },
    jisuanhd(sjmoney) {
      var mlist = new Array();
      var money = 0;
      //找出满足的所有金额
      this.allczhuodong.forEach((element) => {
        if (sjmoney >= element.zongmoney) {
          mlist.push(element.zongmoney);
        }
      });
      if (mlist.length > 0) {
        console.log(mlist);
        //取满足的最大金额活动
        var max = Math.max.apply(null, mlist);
        this.allczhuodong.forEach((element) => {
          if (max == element.zongmoney) {
            money = element.huodongmoney;
          }
        });
      }
      return money;
    },
    changechongzhijine() {
      this.shezhiForm.huodongmoney = this.jisuanhd(this.shezhiForm.zongmoney);
      this.shezhiForm.totalMoney =
        this.shezhiForm.zongmoney + this.shezhiForm.huodongmoney;
    },
    changPaystyle() {
      this.zhifustylemoney = [];
      if (this.payType == "小程序付款") {
        this.shezhiForm.payMoneyStyleId = "-1";
        this.zhifustylemoney.push({
          paymoneyStyleID: -1,
          zhifustyleName: "小程序支付",
          payMoney: shezhiForm.zongmoney,
        });
      } else if (this.payType == "其他付款方式") {
      }
    },
    //选择支付方式
    changefukuanstyle() {
      this.pinjunpayMoney = Number(
        this.shezhiForm.zongmoney / this.shezhiForm.payMoneyStyleId.length
      );
      console.log(this.shezhiForm.zongmoney);
      console.log(this.shezhiForm.payMoneyStyleId.length);
      this.zhifustylemoney = [];
      this.shezhiForm.payMoneyStyleId.forEach((element) => {
        this.fufeistyleData.forEach((element1) => {
          if (element == element1.id) {
            this.zhifustylemoney.push({
              paymoneyStyleID: element1.id,
              zhifustyleName: element1.moneystyleName,
              payMoney: this.pinjunpayMoney,
            });
          }
        });
      });
      console.log(this.zhifustylemoney);
    },
    //修改支付方式的支付金额
    changepaymoney(item) {
      this.pinjunpayMoney = Number(
        (this.shezhiForm.zongmoney - item.payMoney) /
          (this.shezhiForm.payMoneyStyleId.length - 1)
      );
      this.zhifustylemoney.forEach((element) => {
        if (element.zhifustyleName == item.zhifustyleName) {
        } else {
          element.payMoney = this.pinjunpayMoney;
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
        this.$refs["shezhiForm"].resetFields();
        api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allyejistaff = res.obj;
          }
        });

        api.get("xwcloud-sys/sys/StaffManagement/GetAllPxPayMoneyStyleList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.fufeistyleData = res.obj;
          }
        });
        //查询老生充值可选择学生信息
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList",{ menuID: 143 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.AllstuData = res.obj;
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
