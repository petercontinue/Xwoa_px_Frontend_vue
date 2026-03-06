<template>
  <Modal
    v-model="show"
    title="添加流水"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    :width="50"
  >
    <Form
      ref="params"
      :model="params"
      :rules="paramsRule"
      :label-width="120"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select v-model="params.campusID" placeholder="请选择">
              <Option v-for="item in campusList" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="收入支出" prop="shouzhitype">
            <Select
              v-model="params.shouzhitype"
              placeholder="请选择"
              @on-change="changeshouzhistyle"
            >
              <Option v-for="item in shouzhiTypeList" :value="item.id" :key="item.id">{{
                item.text
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="收入支出类型" prop="shouzhiStyleID">
            <Select v-model="params.shouzhiStyleID" placeholder="请选择">
              <Option v-for="item in shouzhiList" :value="item.id" :key="item.id">{{
                item.shouzhiStyle
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px">
          <label style="color: #2d8cf0"
            >【<router-link to="/liushuileibie">设置收入支出类型</router-link>】</label
          >
        </Col>
      </Row>
      <Row>
        <Col span="12" v-if="isshouru">
          <FormItem label="收入金额" prop="shouruMoney">
            <Input v-model="params.shouruMoney" type="number" placeholder="请输入金额" />
          </FormItem>
        </Col>
        <Col span="12" v-if="iszhichu">
          <FormItem label="支出金额" prop="zhichuMoney">
            <Input v-model="params.zhichuMoney" type="number" placeholder="请输入金额" />
          </FormItem>
        </Col>
        <Col span="10" v-if="isshouru">
          <FormItem label="选择学员" prop="stuID">
            <Select
              v-model="params.stuID"
              :filterable="true"
              placeholder="请选择收入学生"
            >
              <Option v-for="item in AllstuData" :value="item.id" :key="item.id">{{
                item.stuName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <!-- <Col span="2" style="text-align: left; padding-left: 5px; padding-top: 8px">
          <label style="color: #2d8cf0">选填</label>
        </Col> -->
      </Row>
      <Row>
        <Col span="12" v-show="isshouru">
          <FormItem label="付款方式">
            <RadioGroup v-model="payType" @on-change="changPaystyle">
              <Radio label="小程序付款"></Radio>
              <Radio label="充值余额付款"></Radio>
              <Radio label="其他付款方式"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12" v-show="showpaystyle">
          <FormItem label="付款方式" prop="payMoneyStyle">
            <Select v-model="params.payMoneyStyle" placeholder="请选择">
              <Option v-for="item in payMoneyStyleList" :value="item.id" :key="item.id">{{
                item.moneystyleName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="流水时间" prop="liushuiDateTime">
            <DatePicker
              type="datetime"
              ref="liushuitime"
              v-model="params.liushuiDateTime"
              @on-change="TimeChange()"
              clearable
              :editable="false"
              placeholder="选择流水时间"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="经办人" prop="jinbanRen">
            <Select v-model="params.jinbanRen" placeholder="请选择">
              <Option v-for="item in jinbanRen" :value="item.id" :key="item.id">{{
                item.staffName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="摘要" prop="liushuiZaiyao">
        <Input v-model="params.liushuiZaiyao" placeholder="请输入内容" type="textarea" />
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="handleSubmit(1)">保存并继续添加</Button>
      <Button type="primary" @click="handleSubmit(2)">保存并关闭</Button>
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
  name: "addliushuiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    editData: {
      type: String,
      default: "",
    },
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
        shouruMoney: "",
        zhichuMoney: "",
        liushuiZaiyao: "",
        stuID: "",
        shouzhitype: 0,
      },
      paramsRule: {
        // 验证输入
        campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
        shouzhiStyleID: [{ required: true, message: "请选择收支类型", trigger: "blur" }],
        // payMoneyStyle: [
        //   { required: true, message: "请选择支付类型", trigger: "blur" },
        // ],
        liushuiDateTime: [
          {
            required: true,
            type: "string",
            message: "请选择流水时间",
            trigger: "change",
          },
        ],
        jinbanRen: [{ required: true, message: "请选择经办人", trigger: "blur" }],
        liushuiZaiyao: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        shouzhitype: [
          {
            required: true,
            message: "请选择收入支出",
            trigger: "blur",
            type: "number",
          },
        ],
        shouruMoney: [
          {
            required: true,
            // type: "number",
            message: "请输入收入金额",
            trigger: "change",
          },
        ],
        zhichuMoney: [
          {
            required: true,
            // type: "number",
            message: "请输入支出金额",
            trigger: "change",
          },
        ],
      },
      campusList: [],
      shouzhiList: [],
      payMoneyStyleList: [],
      jinbanRen: [],

      shouzhiTypeList: [
        { id: 1, text: "收入" },
        { id: 2, text: "支出" },
      ],

      isshouru: false,
      iszhichu: false,
      AllstuData: [],
      payType: "",
      showpaystyle: false,
    };
  },
  methods: {
    handleSubmit(type) {
      this.$refs["params"].validate((valid) => {
        if (valid) {
          if (this.isshouru) {
            if (this.payType == "小程序付款") {
              this.params.payMoneyStyle = "-1";
            } else if (this.payType == "充值余额付款") {
              this.params.payMoneyStyle = "-2";
            }
          }
          // this.params.liushuiDateTime = this.$refs.liushuitime.visualValue;
          if (this.editData != "") {
            api.post("xwcloud-caiwu/caiwu/liushui/editLiushui",this.params).then((res) => {
              if (res.code == "Y" && res.success == true) {
                console.log(res);
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                if (type == 2) {
                  this.closeModal(false);
                }
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
              }
            });
          } else {
            api.post("xwcloud-caiwu/caiwu/liushui/addLiushui",this.params).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框

                if (type == 2) {
                  this.closeModal(false);
                }
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    handleReset() {
      this.$refs["params"].resetFields();
      this.closeModal(false);
    },
    TimeChange() {
      this.$refs["liushuitime"].onSelectionModeChange("time");
      this.params.liushuiDateTime = toolbox.dateFtt(
        this.params.liushuiDateTime,
        "yyyy-MM-dd hh:mm:ss"
      );
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    changPaystyle() {
      console.log(this.payType);
      if (this.payType == "其他付款方式") {
        this.showpaystyle = true;
      } else {
        this.showpaystyle = false;
      }
    },
    changeshouzhistyle() {
      if (this.params.shouzhitype == 1) {
        this.isshouru = true;
        this.iszhichu = false;
        if (this.payType != "其他付款方式") {
          this.showpaystyle = false;
        }
      } else if (this.params.shouzhitype == 2) {
        this.isshouru = false;
        this.iszhichu = true;
        this.showpaystyle = true;
      }
      // 收支类型
      api.get("xwcloud-caiwu/caiwu/liushui/getShouzhiStyleList",{
        shouzhistyle: this.params.shouzhitype,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.shouzhiList = res.obj;
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    shouzhitype(val) {
      console.log(val);
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["params"].resetFields();
        // 校区
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: "341" }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.campusList = res.obj;
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

        //查询学生信息
        api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList",{ menuID: 142 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.AllstuData = res.obj;
          }
        });
        if (this.editData != "") {
          console.log(JSON.parse(this.editData));
          var data = JSON.parse(this.editData);
          this.params.id = data.id;
          this.params.campusID = data.campusID;
          this.params.shouzhiStyleID = data.shouzhiStyleID;
          this.params.payMoneyStyle = data.payMoneyStyle;
          this.params.liushuiDateTime = data.liushuiDateTimef;
          this.params.jinbanRen = data.jinbanRen;
          this.params.shouruMoney = data.shouruMoney + "";
          this.params.zhichuMoney = data.zhichuMoney + "";
          this.params.liushuiZaiyao = data.liushuiZaiyao;
          this.params.stuID = data.stuID;
          this.params.shouzhitype = data.shouruMoney > 0 ? 1 : 2;
          this.payType =
            data.shouzhiStyleID == "-1"
              ? "小程序付款"
              : data.shouzhiStyleID == "-2"
              ? "充值余额付款"
              : "其他付款方式";
          this.changeshouzhistyle();
          this.changPaystyle();
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
