<template>
  <Modal
    v-model="show"
    title="编辑流水"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
    <Form
      ref="editliushuiForm"
      :model="params"
      :rules="paramsRule"
      :label-width="120"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select
          v-model="params.campusID"
          placeholder="请选择"
        >
          <Option v-for="item in campusList" :value="item.id" :key="item.id">{{
            item.campusName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="收入支出" prop="shouzhitype">
        <Select v-model="shouzhitype" placeholder="请选择">
          <Option
            v-for="item in shouzhiTypeList"
            :value="item.id"
            :key="item.id"
            >{{ item.text }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="收入支出类型" prop="shouzhiStyleID">
        <Select
          v-model="params.shouzhiStyleID"
          placeholder="请选择"
        >
          <Option v-for="item in shouzhiList" :value="item.id" :key="item.id">{{
            item.shouzhiStyle
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="付款方式" prop="payMoneyStyle">
        <Select
          v-model="params.payMoneyStyle"
          placeholder="请选择"
        >
          <Option
            v-for="item in payMoneyStyleList"
            :value="item.id"
            :key="item.id"
            >{{ item.moneystyleName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="收入金额" v-show="isshouru">
        <Input
          v-model="params.shouruMoney"
          placeholder="请输入金额"
          type="number"
        />
      </FormItem>
      <FormItem label="支出金额" v-show="iszhichu">
        <Input
          v-model="params.zhichuMoney"
          placeholder="请输入金额"
          type="number"
        />
      </FormItem>
      <FormItem label="流水时间" prop="liushuiDateTime">
        <DatePicker
          type="datetime"
          ref="liushuitime"
          :value="params.liushuiDateTime"
          @on-change="TimeChange()"
          clearable
          :editable="false"
          placeholder="选择流水时间"
          style="width:100%;"
        >
        </DatePicker>
      </FormItem>
      <FormItem label="经办人" prop="jinbanRen">
        <Select
          v-model="params.jinbanRen"
          placeholder="请选择"
        >
          <Option v-for="item in jinbanRen" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="摘要" prop="liushuiZaiyao">
        <Input
          v-model="params.liushuiZaiyao"
          placeholder="请输入内容"
          type="textarea"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "editliushuiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    liushuiID: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        id: "",
        campusID: "",
        shouzhiStyleID: "",
        payMoneyStyle: "",
        liushuiDateTime: "",
        jinbanRen: "",
        shouruMoney: 0,
        zhichuMoney: 0,
        liushuiZaiyao: "",
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
        shouzhiStyleID: [
          { required: true, message: "请选择收支类型", trigger: "blur" },
        ],
        payMoneyStyle: [
          { required: true, message: "请选择支付类型", trigger: "blur" },
        ],
        liushuiDateTime: [{}],
        jinbanRen: [
          { required: true, message: "请选择经办人", trigger: "blur" },
        ],
        liushuiZaiyao: [
          { required: true, message: "请输入摘要", trigger: "blur" },
        ],
        shouzhitype: [
          { required: true, message: "请选择收入支出", trigger: "blur" },
        ],
      },
      campusList: [],
      shouzhiList: [],
      payMoneyStyleList: [],
      jinbanRen: [],

      shouzhiTypeList: [
        { id: "1", text: "收入" },
        { id: "2", text: "支出" },
      ],
      shouzhitype: "",
      isshouru: false,
      iszhichu: false,
    };
  },
  methods: {
    ok() {
      this.params.liushuiDateTime = this.$refs.liushuitime.visualValue;
      api.post("xwcloud-caiwu/caiwu/liushui/editLiushui",this.params).then((res) => {
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
    TimeChange() {
      this.$refs["liushuitime"].onSelectionModeChange("time");
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
    shouzhitype(val) {
      if (val != this.params.isshouOrzhichu) {
        this.params.shouruMoney = 0;
        this.params.zhichuMoney = 0;
      }
      switch (val) {
        case "1":
          this.iszhichu = false;
          this.isshouru = true;
          break;
        case "2":
          this.isshouru = false;
          this.iszhichu = true;
          break;
      }
      // 收支类型
      api.get("xwcloud-caiwu/caiwu/liushui/getShouzhiStyleList",{
        shouzhistyle: val,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.shouzhiList = res.obj;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["editliushuiForm"].resetFields();
        this.params.id = this.liushuiID;
        // 校区
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
          } else {
            this.$Message.error(res.msg);
          }
        });
        // 经办人
        api.get("xwcloud-homeschool/homeschool/public/getStaffList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.jinbanRen = res.obj;
          } else {
            this.$Message.error(res.msg);
          }
        });

        // 支付类型
        api.get("xwcloud-caiwu/caiwu/liushui/getPaymoneystyleList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.payMoneyStyleList = res.obj;
          } else {
            this.$Message.error(res.msg);
          }
        });
        api.get("xwcloud-caiwu/caiwu/liushui/getLiushui",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.params = res.obj;
            this.params.liushuiDateTime = res.obj.liushuiDateTimef;
            this.shouzhitype = res.obj.isshouOrzhichu;
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
