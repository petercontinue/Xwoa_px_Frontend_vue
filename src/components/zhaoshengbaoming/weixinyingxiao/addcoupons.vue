<template>
  <Modal
    v-model="show"
    title="优惠券信息"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="logForm"
      :model="logForm"
      :rules="ruleValidate"
      label-position="right"
      :label-width="120"
      :label-colon="true"
    >
      <Row class="divShow">
        <Col span="12">
          <FormItem label="优惠券名称" prop="couponsName">
            <Input v-model="logForm.couponsName" type="text" placeholder="请输入优惠券名称" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="优惠券金额" prop="Money">
            <Input v-model="logForm.Money" type="number" placeholder="请输入优惠券金额" />
          </FormItem>
        </Col>
      </Row>
      <Row class="divShow">
        <Col span="12">
          <FormItem label="金额条件">
            <Input v-model="logForm.manMoney" type="number" placeholder="金额无条件，请填写0或不填" />
          </FormItem>
        </Col>
        <Col span="11" offset="1">
          <label style="color:blue">是指订单达到多少金额的时候可以使用本优惠券，金额无条件，请填写0或不填；</label>
        </Col>
      </Row>

      <Row class="divShow">
        <Col span="12">
          <FormItem label="指定商品">
            <Select v-model="logForm.GoodTypeID" placeholder="请选择商品">
              <Option v-for="item in allspType" :value="item.id" :key="item.id">{{item.goodstype}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="11" offset="1">
          <label style="color:blue">是指哪个商品可以使用本优惠券；不选择即不限制买哪个商品；</label>
        </Col>
      </Row>

      <Row class="divShow">
        <Col span="12">
          <FormItem label="赠送类别" prop="giveType">
            <Select v-model="logForm.giveType" placeholder="请选择赠送类别">
              <Option v-for="item in allzsType" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="活动开始日期" prop="stratDate">
            <DatePicker
              type="datetime"
              placement="bottom-end"
              placeholder="选择活动开始日期"
              style="width: 100%"
              format="yyyy-MM-dd HH:mm"
              v-model="logForm.stratDate"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="活动结束日期" prop="endDate">
            <DatePicker
              type="datetime"
              placement="bottom-end"
              placeholder="选择活动结束日期"
              format="yyyy-MM-dd HH:mm"
              style="width: 100%"
              v-model="logForm.endDate"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" v-if="type==1" @click="handleSubmit(1)">保存并继续添加</Button>
      <Button type="primary" @click="handleSubmit(2)">保存并关闭</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.divShow {
  /* text-align: center; */
  margin: 10px;
}
</style>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import toolbox from "@/libs/toolbox";
export default {
  name: "addcoupons",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: { type: String },
    editData: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        id: "",
        couponsName: "",
        Money: 0,
        manMoney: "",
        GoodTypeID: "",
        giveType: "",
        stratDate: "",
        endDate: "",
      },
      allzsType: [
        { id: 0, name: "手动赠送" },
        { id: 1, name: "新用户赠送" },
        { id: 2, name: "商品金额达到赠送" },
      ],
      allspType: [],
      ruleValidate: {
        couponsName: [
          {
            required: true,
            message: "请输入优惠券名称",
            trigger: "blur",
          },
        ],
        Money: [
          {
            required: true,
            message: "请输入优惠券金额",
            trigger: "blur",
          },
        ],
        giveType: [
          {
            required: true,
            type: "number",
            message: "请选择赠送类别",
            trigger: "change",
          },
        ],
        stratDate: [
          {
            required: true,
            type: "date",
            message: "请选择开始时间",
            trigger: "change",
          },
        ],
        endDate: [
          {
            required: true,
            type: "date",
            message: "请选择开始时间",
            trigger: "change",
          },
        ],
      },
      getdata: JSON,
    };
  },
  methods: {
    ...mapActions(["getGoodsTyleList", "AddOreditCoupons"]),

    closeModal(val) {
      this.$emit("input", val);
    },

    handleSubmit(type) {
      this.$refs["logForm"].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.AddOreditCoupons(this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.$emit("handleSearch");
              this.$refs["logForm"].resetFields();
              if (type == 2) {
                this.closeModal(false);
              }
            } else {
              this.$Message.error("保存失败");
              this.closeModal(false);
            }
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    handleReset() {
      this.$refs["logForm"].resetFields();
      this.closeModal(false);
    },

    getGoodsTyle() {
      this.getGoodsTyleList().then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allspType = res.obj;
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
      this.$refs["logForm"].resetFields();
      this.logForm.GoodTypeID = "";
      if (val) {
        this.getGoodsTyle();
        if (Number(this.type) == 2) {
          this.getdata = JSON.parse(this.editData);
          this.logForm.id = this.getdata.id;
          this.logForm.couponsName = this.getdata.couponsName;
          this.logForm.Money = this.getdata.Money;
          this.logForm.manMoney = this.getdata.manMoney;
          if (this.getdata.GoodTypeID != null) {
            this.logForm.GoodTypeID = this.getdata.GoodTypeID;
          }
          this.logForm.giveType = this.getdata.giveType;

          this.logForm.stratDate = toolbox.dateFtt(
            this.getdata.stratDate,
            "yyyy-MM-dd hh:mm"
          );
          this.logForm.endDate = toolbox.dateFtt(
            this.getdata.endDate,
            "yyyy-MM-dd hh:mm"
          );
        } else {
          this.logForm.id = "";
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
