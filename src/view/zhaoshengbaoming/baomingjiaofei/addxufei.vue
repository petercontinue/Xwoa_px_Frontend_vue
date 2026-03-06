<template>
  <div>
    <Steps :current="current" style="margin-top: 3%">
      <Step title="选择续费学生"></Step>
      <Step title=" 选择费项"></Step>
      <Step title=" 确认收费"></Step>
    </Steps>
    <Card style="margin-top: 2%" v-if="current == 0">
      <Form ref="addqiandanForm" :model="addqiandanForm" :rules="addqiandanFormRule">
        <Row>
          <Col span="16" offset="8">
            <Row>
              <FormItem label="学生姓名" prop="selectstuID">
                <Select
                  v-model="addqiandanForm.selectstuID"
                  placeholder="请选择学生"
                  style="width: 35%; float: left"
                  @on-change="SelectXufeiStu"
                  filterable
                >
                  <Option v-for="item in AllstuData" :value="item.id" :key="item.id">{{
                    item.stuName
                  }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="新签/续费">
                <RadioGroup v-model="MonType" @on-change="SelectYouhuizhengce">
                  <Radio label="续费"></Radio>
                  <Radio label="录成【新签】"></Radio>
                </RadioGroup>
              </FormItem>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card style="margin-top: 2%" v-if="current == 1">
      <Row>
        <Alert show-icon>
          <Icon type="ios-bulb-outline" slot="icon"></Icon>
          <Col>
            <span>重要提示：原课程续费直接点击选中原课程，然后点击【编辑课程】</span>
          </Col>
        </Alert>
      </Row>
      <Row>
        <Col span="24">
          <Button type="info" size="large" @click="addkeshikecheng"
            >添加【课时】计费课程</Button
          >
          <Button type="info" size="large" @click="addkeshibaokecheng"
            >添加【课时包】计费课程</Button
          >
          <Button type="info" size="large" @click="addqizhiriqikecheng"
            >添加【起止日期】计费课程</Button
          >
          <Button type="success" size="large" @click="editkechengInfo">编辑课程</Button>
          <Button type="warning" size="large" @click="deletekecheng">删除</Button>
        </Col>
      </Row>

      <Row style="margin-top: 20px">
        <Col span="24">
          <Col span="24">
            <Table
              border
              ref="selection"
              :columns="columns"
              highlight-row
              @on-row-click="onClickRow"
              :data="data"
            ></Table>
          </Col>
        </Col>
      </Row>

      <Row style="margin-top: 20px">
        <Col span="24">
          <Button type="info" size="large" @click="addzafei">添加杂费</Button>
          <Button type="warning" size="large" @click="deletezafei">删除杂费</Button>
        </Col>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selectionzf"
            highlight-row
            @on-row-click="onClickRowzf"
            :columns="columnszf"
            :data="datazf"
          ></Table>
        </Col>
      </Row>

      <Row style="margin-top: 20px">
        <Col span="24">
          <Button type="info" size="large" @click="addwuping">添加商品</Button>
          <Button type="warning" size="large" @click="deleteshangping">删除商品</Button>
        </Col>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selectionsp"
            highlight-row
            @on-row-click="onClickRowsp"
            :columns="columnssp"
            :data="datasp"
          ></Table>
        </Col>
      </Row>
    </Card>

    <Card style="margin-top: 2%" v-if="current == 2">
      <Form
        ref="querenForm"
        :model="querenForm"
        :rules="querenFormRule"
        :label-width="100"
        :label-colon="true"
      >
        <Row>
          <Col span="4" offset="4">
            <FormItem label="课程总金额" prop="amountKC">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountKC"
                placeholder="请输入课程总金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="杂费总金额" prop="amountOther">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountOther"
                placeholder="请输入杂费总金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="商品总金额" prop="amountWp">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountWp"
                placeholder="请输入商品总金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="4">
            <FormItem label="优惠政策" prop="youhuizhengce">
              <Select
                v-model="querenForm.youhuizhengce"
                placeholder="请选择优惠政策"
                style="width: 100%"
                @on-change="SelectYouhuizhengce"
              >
                <Option
                  v-for="item in allyouhuizhengce"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
            优惠政策<label style="color: #2d8cf0"
              >【<router-link to="/youhuizhengce">点击这里</router-link>】</label
            >自定义设置
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="4">
            <FormItem label="是否使用代金券" prop="userdaijinquan">
              <RadioGroup
                v-model="querenForm.userdaijinquan"
                @on-change="changeSelectDjq"
              >
                <Radio label="不使用代金券"></Radio>
                <Radio label="使用代金券"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem
              label="代金券金额"
              prop="daijinquan"
              v-if="querenForm.userdaijinquan == '使用代金券'"
            >
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.daijinquan"
                placeholder="请输入代金券金额"
                style="width: 100%; float: left"
                @on-change="changeDaijinquan"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" offset="4">
            <FormItem label="合同总金额" prop="amountMoney">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountMoney"
                placeholder="请输入合同总金额"
                style="width: 40%; float: left"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="4" offset="4">
            <FormItem label="是否定金报名" prop="dingjinbaoming">
              <RadioGroup
                v-model="querenForm.dingjinbaoming"
                @on-change="changedingjinzt"
              >
                <Radio label="否"></Radio>
                <Radio label="是"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>

          <Col span="4">
            <FormItem
              label="定金金额"
              prop="dingjin"
              v-if="querenForm.dingjinbaoming == '是'"
            >
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.dingjin"
                placeholder="请输入定金金额"
                style="width: 100%"
                @on-change="changeDingjinMoney"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="6" offset="4">
            <FormItem label="实收金额" prop="amountshishou">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountshishou"
                placeholder="请输入实收金额"
                style="width: 100%"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8" offset="4">
            <FormItem label="业绩人" prop="yejistaff">
              <Select
                v-model="addqiandanForm.yejistaff"
                placeholder="请选择业绩人"
                style="width: 100%"
                multiple
                @on-change="changeYejiren"
              >
                <Option v-for="item in allyejistaff" :value="item.id" :key="item.id">{{
                  item.staffName
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
            <label style="color: #2d8cf0">可多选</label>
          </Col>
        </Row>
        <Row>
          <Col span="6" offset="6">
            <List
              header="业绩人业绩金额"
              footer
              border
              style="width: 100%"
              v-if="yejirenMoney.length > 0"
            >
              <ListItem v-for="(item, index) in yejirenMoney" :key="index">
                {{ item.staffName }}：
                <InputNumber
                  placeholder="业绩金额"
                  :max="10000000"
                  :min="0.01"
                  :step="0.01"
                  @on-change="changeyejijine(item)"
                  v-model="item.yejiMoney"
                  style="width: 50%"
                ></InputNumber>
              </ListItem>
            </List>
          </Col>
        </Row>
        <Row style="margin-top: 15px">
          <Col span="8" offset="4">
            <FormItem label="付款方式">
              <RadioGroup v-model="payType" @on-change="changPaystyle">
                <Radio label="小程序付款"></Radio>
                <Radio label="充值余额付款"></Radio>
                <Radio label="其他付款方式"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="otherPayshow">
          <Col span="6" offset="6">
            <FormItem label="其他付款方式" prop="fufeistyles">
              <Select
                v-model="addqiandanForm.fufeistyles"
                placeholder="请选择付款方式"
                style="width: 100%"
                multiple
                @on-change="changefukuanstyle"
              >
                <Option v-for="item in fufeistyleData" :value="item.id" :key="item.id">{{
                  item.moneystyleName
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12" style="text-align: left; padding-left: 5px; padding-top: 8px">
            <label style="color: #2d8cf0">可多选</label>，付款方式类别<label
              style="color: #2d8cf0"
              >【点击这里】</label
            >自定义设置
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
        <Row>
          <Col span="6" offset="4">
            <FormItem label="签单日期" prop="qiandandate">
              <DatePicker
                type="date"
                placeholder="请选择签单日期"
                v-model="querenForm.qiandandate"
                format="yyyy-MM-dd"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12" offset="4">
            <FormItem label="费用说明" prop="beizhu">
              <Input
                type="textarea"
                v-model="querenForm.beizhu"
                placeholder="请输入费用说明,最多50字，选填"
                style="width: 100%"
                maxlength="50"
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Row style="text-align: center; margin-top: 2%" v-if="current == 0">
      <Button type="primary" @click="next">下一步</Button>
    </Row>
    <Row style="text-align: center; margin-top: 2%" v-if="current == 1">
      <Button type="primary" @click="back">上一步</Button>
      <Button type="primary" @click="next">下一步</Button>
    </Row>
    <Row style="text-align: center; margin-top: 2%" v-if="current == 2">
      <Button type="primary" @click="back">上一步</Button>
      <Button type="success" @click="saveqiandan(1)">保存并返回</Button>
      <Button type="success" @click="saveqiandan(2)">保存并继续</Button>
    </Row>
    <addkeshijifei-form
      v-model="showaddKeshikecheng"
      :campusID="addqiandanForm.campusID"
      :editData="editkecheng"
      @increment="savekeshikecheng"
    ></addkeshijifei-form>
    <addkeshibao-form
      v-model="showaddkeshibaokecheng"
      :campusID="addqiandanForm.campusID"
      :editData="editkecheng"
      @increment="savekeshikecheng"
    ></addkeshibao-form>
    <addqizhiriqikecheng-form
      v-model="showaddqizhikecheng"
      :campusID="addqiandanForm.campusID"
      :editData="editkecheng"
      @increment="savekeshikecheng"
    ></addqizhiriqikecheng-form>
    <addzafei-form
      v-model="showaddzafei"
      :campusID="addqiandanForm.campusID"
      @increment="savezafei"
      :zfData="zfData"
    ></addzafei-form>
    <addshangpin-form
      v-model="showaddwuping"
      :campusID="addqiandanForm.campusID"
      @increment="savewuping"
    ></addshangpin-form>
  </div>
</template>

<script>
import { mapMutations} from "vuex";
import addkeshijifeiForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addkeshijifeiForm";
import addkeshibaoForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addkeshibaoForm";
import addqizhiriqikechengForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addqizhiriqikechengForm";
import addzafeiForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addzafeiForm";
import addshangpinForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addshangpinForm";
import * as api from "@/api/api.js";

export default {
  components: {
    addkeshijifeiForm,
    addkeshibaoForm,
    addqizhiriqikechengForm,
    addzafeiForm,
    addshangpinForm,
  },
  data() {
    return {
      current: 0,
      addqiandanForm: {
        selectstuID: 0,
        xinqianorxufei: 0,
        campusID: "",
        stuGradeID: "",
        parentsTel: "",
        zidingyiStuNO: "",
        stuSex: "",
        buxiStateID: "",
        telFromID: "",
        zhuanIntroduce: "",
        stuBrithday: "",
        oldSchoolID: "",
        oldSchoolTeacherID: "",
      },
      querenForm: {
        amountKC: 0,
        amountOther: 0,
        amountWp: 0,
        youhuizhengce: 0,
        userdaijinquan: "不使用代金券",
        daijinquan: 0,
        amountMoney: 0,
        dingjinbaoming: "否",
        appPay: "否",
        dingjin: 0,
        amountshishou: 0,
        fufeistyles: [],
        yejistaff: [],
        qiandandate: new Date(),
        beizhu: "",
        youhuiMoney: 0,
      },
      zfData: "",
      addqiandanFormRule: {
        selectstuID: [
          {
            required: true,
            message: "请选择学生",
            trigger: "change",
            type: "string",
          },
        ],
        xinqianorxufei: [
          {
            required: true,
            message: "请选择新签/续费",
            trigger: "change",
            type: "string",
          },
        ],
      },
      querenFormRule: {
        amountKC: [
          {
            required: true,
            message: "请输入课程总金额",
            trigger: "change",
            type: "number",
          },
        ],
        amountshishou: [
          {
            required: true,
            message: "请输入实收金额",
            trigger: "change",
            type: "number",
          },
        ],
        amountMoney: [
          {
            required: true,
            message: "请输入合同总金额",
            trigger: "change",
            type: "number",
          },
        ],
        fufeistyles: [
          {
            required: true,
            message: "请选择付费方式",
            trigger: "blur",
            type: "array",
          },
        ],
        yejistaff: [
          {
            required: true,
            message: "请选择业绩人",
            trigger: "blur",
            type: "array",
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
      showmore: false,
      btntext: "显示更多",
      checkAll: false,
      columns: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.data.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "是否启用",
          key: "isShow",
          align: "center",
          render: (h, params) => {
            if (params.row.isShow) {
              return h("div", [h("span", "启用")]);
            } else {
              return h("div", [h("span", "不启用")]);
            }
          },
        },
        {
          title: "培训科目",
          key: "kmName",
          align: "center",
        },
        {
          title: "培训方式",
          key: "pxStyleName",
          align: "center",
        },
        {
          title: "培训课程",
          key: "kcName",
          align: "center",
        },
        {
          title: "班级",
          key: "bjName",
          align: "center",
        },
        {
          title: "计费方式",
          key: "jifeistyle",
          align: "center",
          render: (h, params) => {
            if (params.row.jifeistyle == 1) {
              return h("div", [h("span", "按课时计费")]);
            } else if (params.row.jifeistyle == 2) {
              return h("div", [h("span", "按课时包计费")]);
            } else {
              return h("div", [h("span", "按起止日期计费")]);
            }
          },
        },
        {
          title: "开始日期",
          key: "startDate",
          align: "center",
        },
        {
          title: "结束日期",
          key: "endDate",
          align: "center",
        },
        {
          title: "原单价",
          key: "YDJ",
          align: "center",
        },
        {
          title: "现单价",
          key: "DJ",
          align: "center",
        },
        {
          title: "购买课时",
          key: "KS",
          align: "center",
        },
        {
          title: "赠送课时",
          key: "ZKS",
          align: "center",
        },
        {
          title: "折扣",
          key: "ZK",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.ZK == 10) {
              state = "未打折";
            } else if (params.row.ZK < 1) {
              state = Number(params.row.ZK * 10).toFixed(2) + "折";
            } else {
              state = Number(params.row.ZK).toFixed(2) + "折";
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "课程总价",
          key: "ZJ",
          align: "center",
        },
      ],
      data: [],
      columnszf: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.data.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "费项名称",
          key: "zafeiName",
          align: "center",
        },
        {
          title: "费用金额",
          key: "zafeiZongjia",
          align: "center",
        },
      ],
      datazf: [],
      columnssp: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.data.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "商品名称",
          key: "wpName",
          align: "center",
        },
        {
          title: "商品单价",
          key: "wpChushouJia",
          align: "center",
        },
        {
          title: "购买数量",
          key: "wpShuliang",
          align: "center",
        },
        {
          title: "商品总价",
          key: "wpZongjia",
          align: "center",
        },
      ],
      datasp: [],
      showaddKeshikecheng: false,
      showaddkeshibaokecheng: false,
      showaddqizhikecheng: false,
      showaddzafei: false,
      showaddwuping: false,
      pinjunyeji: 0,
      pinjunpayMoney: 0,
      yejirenMoney: [],
      zhifustylemoney: [],

      AllstuData: [],
      editkecheng: "",
      MonType: "续费",
      otherPayshow: false,
      payType: "小程序付款",
    };
  },
  methods: {
    ...mapMutations(["setTagNavList", "closeTag"]),
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    onClickRowzf(row, index) {
      //改变为勾选样式
      this.$refs.selectionzf.data[index]._checked = !this.$refs.selectionzf.data[index]
        ._checked;
    },
    onClickRowsp(row, index) {
      //改变为勾选样式
      this.$refs.selectionsp.data[index]._checked = !this.$refs.selectionsp.data[index]
        ._checked;
    },
    changPaystyle() {
      this.zhifustylemoney = [];
      if (this.payType == "小程序付款") {
        this.querenForm.appPay = "是";
        //加载小程序的
        this.otherPayshow = false;
        this.zhifustylemoney.push({
          paymoneyStyleID: -1,
          zhifustyleName: "小程序支付",
          payMoney: this.querenForm.amountshishou,
        });
      } else if (this.payType == "充值余额付款") {
        this.querenForm.appPay = "否";
        this.otherPayshow = false;

        this.zhifustylemoney.push({
          paymoneyStyleID: -2,
          zhifustyleName: "充值余额支付",
          payMoney: this.querenForm.amountshishou,
        });
      } else if (this.payType == "其他付款方式") {
        this.querenForm.appPay = "否";
        this.otherPayshow = true;
      }
    },
    next() {
      if (this.current == 2) {
        this.current = 0;
      } else if (this.current == 0) {
        this.$refs["addqiandanForm"].validate((valid) => {
          if (valid) {
            this.current += 1;
          }
        });
      } else if (this.current == 1) {
        this.getyouhuizhengce();
        this.changPaystyle();
        this.current += 1;
      }
    },
    back() {
      this.current -= 1;
    },
    addkeshikecheng() {
      this.editkecheng = "";
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请先选择校区和年级");
      } else {
        this.showaddKeshikecheng = true;
      }
    },
    addkeshibaokecheng() {
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.showaddkeshibaokecheng = true;
      }
    },
    addqizhiriqikecheng() {
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.showaddqizhikecheng = true;
      }
    },
    addzafei() {
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.zfData = "";
        if (this.datazf.length != 0) {
          this.zfData = JSON.stringify(this.datazf);
        }
        this.showaddzafei = true;
      }
    },
    addwuping() {
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.showaddwuping = true;
      }
    },
    getyouhuizhengce() {
      console.log(this.addqiandanForm);
      this.allyouhuizhengce = [];
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllStuGradeYoouhuizhengce", {
          stuGradeID: this.addqiandanForm.stuGradeID,
          campusID: this.addqiandanForm.campusID,
          jine: this.querenForm.amountMoney,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allyouhuizhengce.push({
              campusID: "",
              endDatetime: "",
              id: "0",
              name: "不使用优惠政策",
              qiyeID: "",
              startDateTime: "",
              stuGradeIDs: "",
              useTimes: 0,
              xianzhijine: 0,
              youhui: 0,
            });
            res.obj.forEach((element) => {
              this.allyouhuizhengce.push(element);
            });
          }
        });
    },
    savekeshikecheng(addkecheng) {
      let datakeshi = JSON.parse(addkecheng);
      for (var i = 0; i < this.data.length; i++) {
        if (
          this.data[i].kcName == datakeshi.kcName &&
          this.data[i].kechengID == datakeshi.kechengID
        ) {
          this.data.splice(i, 1);
        }
      }
      this.data.push(datakeshi);
      this.data.forEach((items) => {
        //取消所有对象的勾选，_checked设置为false
        this.$set(items, "_checked", false);
      });
      this.jisuanMoney();
    },
    savezafei(zafeidata) {
      this.datazf.push(JSON.parse(zafeidata));

      this.datazf.forEach((items) => {
        //取消所有对象的勾选，_checked设置为false
        this.$set(items, "_checked", false);
      });
      this.jisuanMoney();
    },
    savewuping(wpdata) {
      this.datasp.push(JSON.parse(wpdata));
      this.datasp.forEach((items) => {
        //取消所有对象的勾选，_checked设置为false
        this.$set(items, "_checked", false);
      });
      this.jisuanMoney();
    },
    //计算金额
    jisuanMoney() {
      let allkechengMoney = 0;
      let zafeiMoney = 0;
      let spMoney = 0;
      this.data.forEach((element) => {
        allkechengMoney += Number(element.ZJ);
        this.querenForm.amountKC = allkechengMoney;
      });
      this.datazf.forEach((element) => {
        zafeiMoney += Number(element.zafeiZongjia);
      });
      this.datasp.forEach((element) => {
        spMoney += Number(element.wpZongjia);
        this.querenForm.amountWp = spMoney;
      });
      this.querenForm.amountOther = zafeiMoney;
      this.querenForm.amountMoney =
        this.querenForm.amountKC + this.querenForm.amountWp + this.querenForm.amountOther;
      this.querenForm.amountshishou = this.querenForm.amountMoney;
    },
    //选择使用优惠政策
    SelectYouhuizhengce() {
      if (this.MonType == "续费") {
        this.addqiandanForm.xinqianorxufei = 1;
      } else if (this.MonType == "录成【新签】") {
        this.addqiandanForm.xinqianorxufei = 2;
      }
      this.allyouhuizhengce.forEach((element) => {
        if (element.id == this.querenForm.youhuizhengce) {
          //打折优惠
          if (element.youhuiType == 1) {
            this.querenForm.amountshishou = Number(
              this.querenForm.amountMoney * element.youhui
            ).toFixed(2);
            this.querenForm.youhuiMoney =
              this.querenForm.amountMoney -
              Number(this.querenForm.amountMoney * element.youhui).toFixed(2);
          }
          //满减优惠
          else {
            this.querenForm.amountshishou = Number(
              (this.querenForm.amountMoney - element.youhui).toFixed(2)
            );
            this.querenForm.youhuiMoney = element.youhui;
          }
        }
      });
    },
    //删除课程信息
    deletekecheng() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i]._checked) {
              this.data.splice(i, 1);
              this.jisuanMoney();
            }
          }
        },
        onCancel: () => {},
      });
    },
    deletezafei() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          for (var i = 0; i < this.datazf.length; i++) {
            if (this.datazf[i]._checked) {
              this.datazf.splice(i, 1);
              this.jisuanMoney();
            }
          }
        },
        onCancel: () => {},
      });
    },
    deleteshangping() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          for (var i = 0; i < this.datasp.length; i++) {
            if (this.datasp[i]._checked) {
              this.datasp.splice(i, 1);
              this.jisuanMoney();
            }
          }
        },
        onCancel: () => {},
      });
    },
    saveqiandan(type) {
      let addkecheng = [];
      this.data.forEach((element) => {
        if (element.ZJ > 0) {
          addkecheng.push(element);
        }
      });
      api
        .post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddXufeiQiandan", {
          stuID: this.addqiandanForm.selectstuID,
          shishouTotalMoney: this.querenForm.amountshishou,
          isZhuanIntroduce: this.addqiandanForm.zhuanIntroduce,
          qiandandate: this.querenForm.qiandandate,
          beizhu: this.addqiandanForm.beizhu,
          telFromID: this.addqiandanForm.telFromID,
          bxKcData: JSON.stringify(addkecheng),
          wpData: JSON.stringify(this.datasp),
          zafeiData: JSON.stringify(this.datazf),
          daijinquan: this.querenForm.daijinquan,
          dingjin: this.querenForm.dingjin,
          isAppPay: this.querenForm.appPay,
          PayMoneyStyle: JSON.stringify(this.zhifustylemoney),
          moneyStyle: this.addqiandanForm.xinqianorxufei,
          qiandanstaffinfo: JSON.stringify(this.yejirenMoney),
          paytyles: JSON.stringify(this.zhifustylemoney),
          youhuizhengce: this.querenForm.youhuizhengce,
          AmountKC: this.querenForm.amountKC,
          AmountWp: this.querenForm.amountWp,
          AmountOther: this.querenForm.amountOther,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            if (type == 1) {
              //保存并返回
              this.$router.push({
                path: "/xufei",
                query: {},
              });
              this.guanbiyemian();
            } else {
              //保存并继续
              this.$router.go(0);
            }
            this.$Message.success(res.msg);
          } else {
            this.$Message.error(res.msg);
          }
        });
    },
    guanbiyemian() {
      let route = this.$store.state.app.tagNavList.filter(
        (item) => item.name === "添加续费"
      );
      let result = this.$store.state.app.tagNavList.filter(
        (item) => item.name != "添加续费"
      );
      this.handleCloseTag(result, undefined, route);
    },
    handleCloseTag(res, type, route) {
      console.log(route);
      this.closeTag(route);
      this.setTagNavList(res);
    },
    //改变代金券金额
    changeDaijinquan() {
      if (this.querenForm.dingjinbaoming == "是") {
        this.querenForm.amountshishou = this.querenForm.dingjin;
      } else {
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney -
            this.querenForm.daijinquan -
            this.querenForm.youhuiMoney
        );
      }
    },
    //改变代金券使用状态
    changeSelectDjq() {
      if (this.querenForm.userdaijinquan == "是") {
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney -
            this.querenForm.daijinquan -
            this.querenForm.youhuiMoney
        );
      } else {
        this.querenForm.daijinquan = 0;
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney - this.querenForm.youhuiMoney
        );
      }
      this.changPaystyle();
    },
    //修改定金支付金额
    changeDingjinMoney() {
      this.querenForm.amountshishou = this.querenForm.dingjin;
      this.changPaystyle();
    },
    //修改定金使用状态
    changedingjinzt() {
      if (this.querenForm.dingjinbaoming == "是") {
        this.querenForm.amountshishou = this.querenForm.dingjin;
      } else {
        this.querenForm.dingjin = 0;
        this.querenForm.amountshishou = Number(
          this.querenForm.amountMoney - this.querenForm.youhuiMoney
        );
      }
      this.changPaystyle();
    },
    //选择业绩人信息
    changeYejiren() {
      this.pinjunyeji = Number(
        this.querenForm.amountshishou / this.addqiandanForm.yejistaff.length
      );
      this.yejirenMoney = [];
      this.addqiandanForm.yejistaff.forEach((element) => {
        this.allyejistaff.forEach((element1) => {
          if (element == element1.id) {
            this.yejirenMoney.push({
              staffID: element1.id,
              staffName: element1.staffName,
              yejiMoney: this.pinjunyeji,
            });
          }
        });
      });
    },
    //选择支付方式
    changefukuanstyle() {
      this.pinjunpayMoney = Number(
        this.querenForm.amountshishou / this.addqiandanForm.fufeistyles.length
      );
      this.zhifustylemoney = [];
      this.addqiandanForm.fufeistyles.forEach((element) => {
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
    //修改业绩人的某个业绩金额
    changeyejijine(item) {
      this.pinjunyeji = Number(
        (this.querenForm.amountshishou - item.yejiMoney) /
          (this.addqiandanForm.yejistaff.length - 1)
      );
      this.yejirenMoney.forEach((element) => {
        if (element.staffName == item.staffName) {
        } else {
          element.yejiMoney = this.pinjunyeji;
        }
      });
    },
    //修改支付方式的支付金额
    changepaymoney(item) {
      this.pinjunpayMoney = Number(
        (this.querenForm.amountshishou - item.paymoney) /
          (this.addqiandanForm.fufeistyles.length - 1)
      );
      this.yejirenMoney.forEach((element) => {
        if (element.zhifustyleName == item.zhifustyleName) {
        } else {
          element.paymoney = this.pinjunpayMoney;
        }
      });
    },
    //选择续费学生
    SelectXufeiStu() {
      this.AllstuData.forEach((element) => {
        if (element.id == this.addqiandanForm.selectstuID) {
          this.addqiandanForm.campusID = element.campusID;
          this.addqiandanForm.stuGradeID = element.stuGradeID;
          api
            .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllStukechengInfoList", {
              stuID: this.addqiandanForm.selectstuID,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.data = res.obj;

                this.data.forEach((items) => {
                  //取消所有对象的勾选，_checked设置为false
                  this.$set(items, "_checked", false);
                });
              }
            });
        }
      });
    },
    //编辑课程
    editkechengInfo() {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i]._checked) {
          this.editkecheng = JSON.stringify(this.data[i]);
          if (this.data[i].jifeistyle == 1) {
            //按课时计费课程
            this.showaddKeshikecheng = true;
          } else if (this.data[i].jifeistyle == 2) {
            //按课时包计费课程
            this.showaddkeshibaokecheng = true;
          } else if (this.data[i].jifeistyle == 3) {
            //按起止日期计费课程
            this.showaddqizhikecheng = true;
          }
        }
      }
    },
  },
  mounted() {
    //查询续费可选择学生信息
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList", { menuID: 142 })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.AllstuData = res.obj;
        }
      });
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus", {}).then((res) => {
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
    api.get("/xwcloud-sys/sys/StaffManagement/GetAllPxPayMoneyStyleList", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.fufeistyleData = res.obj;
        }
      });
  },
};
</script>
