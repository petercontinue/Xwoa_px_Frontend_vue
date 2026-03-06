<template>
  <Modal
    v-model="show"
    title="补交尾款"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Form
      ref="wkfrom"
      :model="wkfrom"
      :label-width="180"
      :label-colon="true"
      :rules="ruleValidate"
    >
      <Row>
        <Col span="12">
          <FormItem label="补交金额" prop="jine">
            <Input v-model="wkfrom.jine" type="number" @on-change="changemoney" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            label="补交时间"
            prop="bujiaodate"
            reles="{required: true, message: '请选择补交时间', trigger: 'change'}"
          >
            <DatePicker
              type="date"
              v-model="wkfrom.bujiaodate"
              format="yyyy-MM-dd"
              placeholder="请选择补交时间"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="20">
          <FormItem label="业绩人" prop="yejimessage">
            <Select
              v-model="checkyejiren"
              multiple
              placeholder="请选择业绩人"
              @on-change="checkstaff"
            >
              <Option v-for="item in allyejiren" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="16" offset="4">
          <Card style="margin-bottom: 20px">
            <FormItem v-for="(item, index) in yejijine" :key="index" :label="item.name">
              <Row>
                <Col span="12">
                  <Input type="text" v-model="item.yejimoney"></Input>
                </Col>
              </Row>
            </FormItem>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span="20">
          <FormItem label="付费方式" prop="paymoneystyle">
            <Select
              v-model="checkPay"
              multiple
              placeholder="请选择付费方式"
              @on-change="checkPayType"
            >
              <Option v-for="item in allPaystyle" :value="item.id" :key="item.id">{{
                item.moneystyleName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="16" offset="4">
          <Card>
            <FormItem v-for="(item, index) in Paymessage" :key="index" :label="item.name">
              <Row>
                <Col span="12">
                  <Input type="text" v-model="item.paymoney"></Input>
                </Col>
              </Row>
            </FormItem>
          </Card>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="handleSubmit()">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style scoped>
.ss {
  margin-bottom: 0px;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "bujiaoweikuan",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    wkData: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      index: 1,
      wkfrom: {
        qdid: "",
        jine: 0,
        bujiaodate: "",
        paymoneystyle: "", //支付方式
        yejimessage: "", //业绩信息
      },
      getdata: JSON,
      allyejiren: [],
      checkyejiren: [],
      yejijine: [],

      //---支付方式
      allPaystyle: [],
      checkPay: [],
      Paymessage: [],

      qdmessage: {},
      ruleValidate: {
        bujiaodate: [
          {
            required: true,
            type: "date",
            message: "请选择补交时间",
            trigger: "change",
          },
        ],
        yejimessage: [{ required: true, message: "请选择业绩人", trigger: "change" }],
        paymoneystyle: [{ required: true, message: "请选择付费方式", trigger: "change" }],
      },
    };
  },
  methods: {
    changemoney() {
      this.checkstaff();
      this.checkPayType();
    },

    checkstaff() {
      this.yejijine = [];
      this.checkyejiren.forEach((item) => {
        let money = this.wkfrom.jine / this.checkyejiren.length;
        this.allyejiren.forEach((itemall) => {
          if (item == itemall.id) {
            this.yejijine.push({
              yejiren: item,
              name: itemall.name,
              yejimoney: money,
            });
          }
        });
      });
      this.wkfrom.yejimessage = JSON.stringify(this.yejijine); //业绩信息
    },

    checkPayType() {
      this.Paymessage = [];
      let money = this.wkfrom.jine / this.checkPay.length;
      this.checkPay.forEach((item) => {
        this.allPaystyle.forEach((itemall) => {
          if (item == itemall.id) {
            this.Paymessage.push({
              paystyle: item,
              name: itemall.moneystyleName,
              paymoney: money,
            });
          }
        });
      });
      this.wkfrom.paymoneystyle = JSON.stringify(this.Paymessage); //支付信息
    },

    handleSubmit() {
      //-------付费方式金额总和验证
      let allpaymoney = 0;
      this.Paymessage.forEach((item) => {
        allpaymoney += Number(item.paymoney);
      });
      if (allpaymoney > this.wkfrom.jine) {
        console.log(allpaymoney);
        let money = this.wkfrom.jine / this.checkPay.length;
        this.Paymessage.forEach((item) => {
          item.paymoney = money;
        });
        this.$Message.error("付费金额设置错误！！！");
        return;
      }
      //-------业绩人金额总和验证
      let allyejimoney = 0;
      this.yejijine.forEach((item) => {
        allyejimoney += Number(item.yejimoney);
      });
      if (allyejimoney > this.wkfrom.jine) {
        console.log(allyejimoney);
        let money = this.wkfrom.jine / this.checkPay.length;
        this.yejijine.forEach((item) => {
          item.yejimoney = money;
        });
        this.$Message.error("业绩人金额设置错误！！！");
        return;
      }
      //更新为输入的值
      if (this.checkyejiren.length == 0) {
        this.wkfrom.yejimessage = "";
      } else {
        this.wkfrom.yejimessage = JSON.stringify(this.yejijine); //业绩信息
      }

      if (this.checkPay.length == 0) {
        this.wkfrom.paymoneystyle = "";
      } else {
        this.wkfrom.paymoneystyle = JSON.stringify(this.Paymessage); //支付信息
      }
      this.$refs["wkfrom"].validate((valid) => {
        if (valid) {
          this.wkfrom.bujiaodate = toolbox.dateFtt(
            this.wkfrom.bujiaodate,
            "yyyy-MM-dd hh:mm:ss"
          );
          api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/setweikuan",this.wkfrom).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.$refs["wkfrom"].resetFields();
              this.allyejiren = [];
              this.checkyejiren = [];
              this.yejijine = [];
              this.allPaystyle = [];
              this.checkPay = [];
              this.Paymessage = [];
              this.qdmessage = {};
              this.closeModal(false);
            } else {
              this.$Message.error(res.msg);
              this.closeModal(false);
            }
          });
        } else {
          this.$Message.error("请必填完成信息！！");
        }
      });
    },
    handleReset() {
      this.$refs["wkfrom"].resetFields();
      this.allyejiren = [];
      this.checkyejiren = [];
      this.yejijine = [];
      this.allPaystyle = [];
      this.checkPay = [];
      this.Paymessage = [];
      this.qdmessage = {};
      this.closeModal(false);
    },
    handleAdd() {
      this.index++;
      this.formDynamic.items.push({
        value: "",
        index: this.index,
        status: 1,
      });
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0;
    },

    getallyejistaff() {
      api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/getCampusTostaff",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allyejiren = res.obj;
        }
      });
    },

    getallPaystyle() {
      api.get("xwcloud-caiwu/caiwu/pxtuifeitable/getpaystyle",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allPaystyle = res.obj;
        }
      });
    },

    getqdMessage() {
      api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/getqiandanMessage",{ qdID: this.wkfrom.qdid }).then((res) => {
        console.log(res);
        if (res.code == "Y" && res.success == true) {
          this.qdmessage = res.obj;

          this.qdmessage.paystyle.forEach((item) => {
            this.checkPay.push(item.paymoneyStyleID);
          });

          this.qdmessage.yejiren.forEach((item) => {
            this.checkyejiren.push(item.staffID);
          });
        }
      });
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
      this.$refs["wkfrom"].resetFields();
      this.checkyejiren = [];
      this.checkPay = [];
      if (val) {
        this.getdata = JSON.parse(this.wkData);
        this.wkfrom.qdid = this.getdata.id;
        this.wkfrom.jine = this.getdata.weikuan;
        this.getallyejistaff();
        this.getallPaystyle();
        this.getqdMessage();
        console.log(this.getdata);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
