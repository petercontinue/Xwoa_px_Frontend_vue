<template>
  <div>
    <Card style="margin-top: 2%">
      <Form
        ref="addqiandanForm"
        :model="addqiandanForm"
        :rules="addqiandanFormRule"
        :label-width="120"
        :label-colon="true"
      >
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="学生姓名" prop="stuName">
              <Input
                type="text"
                v-model="addqiandanForm.stuName"
                placeholder="请输入学生姓名"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="选择校区" prop="campusID">
              <Select v-model="addqiandanForm.campusID" placeholder="请选择校区">
                <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="年级/年龄段" prop="stuGradeID">
              <Select v-model="addqiandanForm.stuGradeID" placeholder="请选择年级/年龄段">
                <Option v-for="item in allcampusGrades" :value="item.id" :key="item.id">{{
                  item.stugradename
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="学员状态" prop="buxiStateID">
              <Select v-model="addqiandanForm.buxiStateID" placeholder="请选择学员状态">
                <Option value="2">在读</Option>
                <Option value="3">停课</Option>
                <Option value="4">结课</Option>
                <Option value="5">退费</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="联系电话" prop="parentsTel">
              <Input
                type="text"
                v-model="addqiandanForm.parentsTel"
                placeholder="请输入联系电话"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="办理时间" prop="addDateTime">
              <DatePicker
                type="date"
                placeholder="请选择办理时间"
                v-model="addqiandanForm.addDateTime"
                @on-change="changeDate"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="充值金额" prop="chongzhiMoney">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="addqiandanForm.chongzhiMoney"
                placeholder="请输入充值金额"
                @on-change="changechongzhijine"
                style="width: 100%"
              ></InputNumber> </FormItem
          ></Col>
          <Col span="8">
            <FormItem label="赠送金额" prop="zengsongMoney">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="addqiandanForm.zengsongMoney"
                placeholder="请输入赠送金额"
                readonly
                style="width: 100%"
              ></InputNumber> </FormItem
          ></Col>
        </Row>
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="实得总金额" prop="totalMoney">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="addqiandanForm.totalMoney"
                placeholder="请输入实得总金额"
                readonly
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="原就读学校" prop="oldSchoolID">
              <Input
                type="text"
                v-model="addqiandanForm.oldSchoolID"
                placeholder="请输入原就读学校"
              />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="原校联系老师" prop="oldSchoolTeacherID">
              <Input
                type="text"
                v-model="addqiandanForm.oldSchoolTeacherID"
                placeholder="请输入原校联系老师"
              />
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="学员生日" prop="stuBirthday">
              <DatePicker
                type="date"
                placeholder="请选择学员生日"
                v-model="addqiandanForm.stuBirthday"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="身份证号" prop="stuIdentityNumber">
              <Input
                type="text"
                v-model="addqiandanForm.stuIdentityNumber"
                placeholder="请输入身份证号"
              />
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="业绩人" prop="yeJiRenId">
              <Select v-model="addqiandanForm.yeJiRenId" placeholder="请选择业绩人">
                <Option v-for="item in allyejistaff" :value="item.id" :key="item.id">{{
                  item.staffName
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <!-- <Col span="8">
            <FormItem label="付款方式" prop="payMoneyStyleId">
              <Select
                v-model="addqiandanForm.payMoneyStyleId"
                placeholder="请选择付款方式"
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
        <Row style="margin-left: 20%">
          <Col span="8">
            <FormItem label="付款方式">
              <RadioGroup v-model="payType" @on-change="changPaystyle">
                <Radio label="小程序付款"></Radio>
                <Radio label="其他付款方式"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="payType == '其他付款方式'">
            <FormItem label="付款方式" prop="payMoneyStyleId">
              <Select
                v-model="addqiandanForm.payMoneyStyleId"
                placeholder="请选择付款方式"
                multiple
                @on-change="changefukuanstyle"
              >
                <Option v-for="item in fufeistyleData" :value="item.id" :key="item.id">{{
                  item.moneystyleName
                }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin: 10px">
          <Col span="6" offset="6">
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
        <Row style="margin-left: 20%; margin-right: 20%">
          <Alert show-icon style="margin-top: 30px">
            <Icon type="ios-bulb-outline" slot="icon"></Icon>
            <Col>
              <span>温馨提示-充值的钱可以在以下几个地方使用：</span>
            </Col>
            <Col style="margin-top: 10px">
              <span
                >1
                利用充值的钱报课程。在【报名交费-新签报名/续费】报课程，支付方式必须选择<span
                  style="color: red"
                  >【 充值余额】</span
                >；</span
              >
            </Col>
            <Col style="margin-top: 10px">
              <span
                >2 可以在进销存消费购买商品。操作方法：刷学员卡，支付方式务必选择<span
                  style="color: red"
                  >【账户余额】</span
                >；</span
              >
            </Col>
            <Col style="margin-top: 10px">
              <span
                >3
                可以在【教务管理-排课消课-余额消课】直接消课。该方法仅适用于充值以后，不报名课程，上相关课程的时候用学员卡刷卡来扣除费用。</span
              >
            </Col>
            <Col style="margin-top: 10px">
              <span
                >4
                可以在微商城进行消费购买。操作方法：教务管理-家校互联-学员微信账号，在该页面有一个【转金额】的功能，可以把充值的钱转到商城账户里去购买使用；</span
              >
            </Col>
            <Col style="margin-top: 10px">
              <span style="color: red"
                >5
                特别提醒：微信营销里的微信充值的优惠政策与本页面的优惠政策是数据相通的，优惠政策是一致的。</span
              >
            </Col>
          </Alert>
        </Row>
        <Row style="text-align: center; margin-top: 2%">
          <Button type="success" @click="savenewstuchongzhi">保存信息</Button>
        </Row>
      </Form>
    </Card>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  data() {
    return {
      current: 0,
      addqiandanForm: {
        stuName: "",
        campusID: "",
        stuGradeID: "",
        buxiStateID: 0,
        parentsTel: "",
        addDateTime: "",
        chongzhiMoney: 0,
        zengsongMoney: 0,
        totalMoney: 0,
        oldSchoolID: "",
        oldSchoolTeacherID: "",
        stuBirthday: "",
        stuIdentityNumber: "",
        payMoneyStyleId: [],
        yeJiRenId: "",
      },
      addqiandanFormRule: {
        stuName: [
          {
            required: true,
            message: "请输入学生姓名",
            trigger: "change",
            type: "string",
          },
        ],
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        stuGradeID: [
          {
            required: true,
            message: "请选择年龄/年龄段",
            trigger: "change",
            type: "string",
          },
        ],
        buxiStateID: [
          {
            required: true,
            message: "请选择学生状态",
            trigger: "change",
            type: "string",
          },
        ],
        parentsTel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "change",
            type: "string",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "change",
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
        chongzhiMoney: [
          {
            required: true,
            message: "请输入充值金额",
            trigger: "change",
            type: "number",
          },
        ],
        zengsongMoney: [
          {
            required: true,
            message: "请输入赠送金额",
            trigger: "change",
            type: "number",
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
            message: "请选择业绩人信息",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
      allcampusGrades: [],
      alltelfromData: [],
      zindingyi: [],
      allyouhuizhengce: [],
      allyejistaff: [],
      fufeistyleData: [],
      allczhuodong: [],
      payType: "小程序付款",
      zhifustylemoney: [],
    };
  },
  methods: {
    changeDate() {
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/Getkeyongchongzhihuodong", {
          operateTime: toolbox.dateFtt(this.addqiandanForm.addDateTime, "yyyy-MM-dd"),
        })
        .then((res) => {
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
      this.addqiandanForm.zengsongMoney = this.jisuanhd(
        this.addqiandanForm.chongzhiMoney
      );
      this.addqiandanForm.totalMoney =
        this.addqiandanForm.chongzhiMoney + this.addqiandanForm.zengsongMoney;
    },
    savenewstuchongzhi() {
      console.log(this.zhifustylemoney);
      let zhifustyle = "";
      if (this.addqiandanForm.payMoneyStyleId == "-1") {
        zhifustyle = "-1";
      } else {
        this.addqiandanForm.payMoneyStyleId.forEach((element) => {
          zhifustyle += element + ",";
        });
      }
      var reg = /,$/gi;
      api
        .post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddNewStuChongzhi", {
          campusID: this.addqiandanForm.campusID,
          stuState: this.addqiandanForm.buxiStateID,
          stuGradeId: this.addqiandanForm.stuGradeID,
          stuTel: this.addqiandanForm.parentsTel,
          stuName: this.addqiandanForm.stuName,
          payMoneyStyleId: zhifustyle.replace(reg, ""),
          yeJiRenId: this.addqiandanForm.yeJiRenId,
          chongzhiMoney: this.addqiandanForm.chongzhiMoney,
          zengsongMoney: this.addqiandanForm.zengsongMoney,
          totalMoney: this.addqiandanForm.totalMoney,
          addDateTime: toolbox.dateFtt(this.addqiandanForm.addDateTime, "yyyy-MM-dd"),
          stuBirthday:
            this.addqiandanForm.stuBirthday == ""
              ? ""
              : toolbox.dateFtt(this.addqiandanForm.stuBirthday, "yyyy-MM-dd"),
          stuIdentityNumber: this.addqiandanForm.stuIdentityNumber,
          oldSchoolID: this.addqiandanForm.oldSchoolID,
          oldSchoolTeacherID: this.addqiandanForm.oldSchoolTeacherID,
          paystylemoney: JSON.stringify(this.zhifustylemoney),
          yxid: 0,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.$router.go(0);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    changPaystyle() {
      this.zhifustylemoney = [];
      if (this.payType == "小程序付款") {
        this.addqiandanForm.payMoneyStyleId = "-1";
        this.zhifustylemoney.push({
          paymoneyStyleID: -1,
          zhifustyleName: "小程序支付",
          payMoney: this.addqiandanForm.chongzhiMoney,
        });
      } else if (this.payType == "其他付款方式") {
      }
    },
    //选择支付方式
    changefukuanstyle() {
      this.pinjunpayMoney = Number(
        this.addqiandanForm.chongzhiMoney / this.addqiandanForm.payMoneyStyleId.length
      );
      this.zhifustylemoney = [];
      this.addqiandanForm.payMoneyStyleId.forEach((element) => {
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
    },
    //修改支付方式的支付金额
    changepaymoney(item) {
      this.pinjunpayMoney = Number(
        (this.addqiandanForm.chongzhiMoney - item.payMoney) /
          (this.addqiandanForm.payMoneyStyleId.length - 1)
      );
      this.zhifustylemoney.forEach((element) => {
        if (element.zhifustyleName == item.zhifustyleName) {
        } else {
          element.payMoney = this.pinjunpayMoney;
        }
      });
    },
  },
  mounted() {
    if (this.$route.query.yxstuID != 0) {
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetYxStuInfo", {
          yxstuID: this.$route.query.yxstuID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res.obj);
            this.addqiandanForm.stuName = res.obj.stuName;
            this.addqiandanForm.campusID = res.obj.campusID;
            this.addqiandanForm.stuGradeID = res.obj.stuGradeID;
            this.addqiandanForm.buxiStateID = 2 + "";
            this.addqiandanForm.parentsTel = res.obj.parentTel;
            this.addqiandanForm.addDateTime = toolbox.dateFtt(new Date(), "yyyy-MM-dd");
            this.changeDate();
          }
        });
    }
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 143 })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    api
      .get("/xwcloud-sys/sys/SystemSetting/GetAllStuGradeList", {
        campusID: this.addqiandanForm.campusID,
      })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusGrades = res.obj;
        }
      });
    api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllTelFromList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.alltelfromData = res.obj;
      }
    });
    api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllZidingyiParams", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.zindingyi = res.obj;
      }
    });
    api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allyejistaff = res.obj;
      }
    });
    api
      .get("/xwcloud-sys/sys/StaffManagement/GetAllPxPayMoneyStyleList", {})
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.fufeistyleData = res.obj;
        }
      });
  },
};
</script>
