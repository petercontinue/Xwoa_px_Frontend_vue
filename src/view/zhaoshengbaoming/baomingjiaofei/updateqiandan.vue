<template>
  <div>
    <Steps :current="current" style="margin-top: 3%">
      <Step title="填写学员基本信息"></Step>
      <Step title=" 选择费项"></Step>
      <Step title=" 确认收费"></Step>
    </Steps>
    <Card style="margin-top: 2%" v-if="current == 0">
      <Form ref="addqiandanForm" :model="addqiandanForm" :rules="addqiandanFormRule">
        <Row>
          <Col span="8" style="text-align: center">
            <div class="demo-avatar">
              <Avatar icon="ios-person" size="100" style="margin: 50px" />
            </div>
          </Col>
          <Col span="16" style="text-align: center">
            <Row>
              <FormItem label="学生姓名" prop="stuName">
                <Input
                  type="text"
                  v-model="addqiandanForm.stuName"
                  placeholder="请输入学生姓名"
                  style="width: 35%; float: left"
                />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="联系电话" prop="parentsTel">
                <Input
                  type="text"
                  v-model="addqiandanForm.parentsTel"
                  placeholder="请输入联系电话"
                  style="width: 35%; float: left"
                />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="选择校区" prop="campusID">
                <Select
                  v-model="addqiandanForm.campusID"
                  placeholder="请选择校区"
                  style="width: 35%; float: left"
                >
                  <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem></Row
            >
            <Row>
              <FormItem label="选择年级" prop="stuGradeID">
                <Select
                  v-model="addqiandanForm.stuGradeID"
                  placeholder="请选择年级"
                  style="width: 35%; float: left"
                >
                  <Option
                    v-for="item in allcampusGrades"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.stugradename }}</Option
                  >
                </Select>
              </FormItem></Row
            >
          </Col>
        </Row>
        <Row style="text-align: center; margin-bottom: 1%">
          <Button type="success" @click="showmoreclick">{{ btntext }}</Button>
        </Row>
        <div v-if="showmore">
          <Row>
            <Col span="8">
              <FormItem label="自定义学号" prop="zidingyiStuNO">
                <Input
                  type="text"
                  v-model="addqiandanForm.zidingyiStuNO"
                  placeholder="请输入自定义学号"
                  style="width: 70%; float: left"
                /> </FormItem
            ></Col>
            <Col span="8">
              <FormItem label="学员性别" prop="stuSex">
                <Select
                  v-model="addqiandanForm.stuSex"
                  placeholder="请选择学员性别"
                  style="width: 70%; float: left"
                >
                  <Option value="1">男</Option>
                  <Option value="2">女</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学员状态" prop="buxiStateID">
                <Select
                  v-model="addqiandanForm.buxiStateID"
                  placeholder="请选择学员状态"
                  style="width: 70%; float: left"
                >
                  <Option value="1">在读</Option>
                  <Option value="2">停课</Option>
                  <Option value="2">结课</Option>
                  <Option value="2">退费</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="招生途径" prop="telFromID">
                <Select
                  v-model="addqiandanForm.telFromID"
                  placeholder="请选择招生途径"
                  style="width: 70%; float: left"
                >
                  <Option
                    v-for="item in alltelfromData"
                    :value="item.id"
                    :key="item.id"
                    >{{ item.telfromname }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学员生日" prop="stuBrithday">
                <DatePicker
                  type="date"
                  placeholder="请选择学员生日"
                  v-model="addqiandanForm.stuBrithday"
                  style="width: 70%; float: left"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="转介绍" prop="zhuanIntroduce">
                <Select
                  v-model="addqiandanForm.zhuanIntroduce"
                  placeholder="请选择转介绍"
                  style="width: 70%; float: left"
                >
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="原就读学校" prop="oldSchoolID">
                <Input
                  type="text"
                  v-model="addqiandanForm.oldSchoolID"
                  placeholder="请输入原就读学校"
                  style="width: 70%; float: left"
                /> </FormItem
            ></Col>
            <Col span="8">
              <FormItem label="合作老师" prop="oldSchoolTeacherID">
                <Input
                  type="text"
                  v-model="addqiandanForm.oldSchoolTeacherID"
                  placeholder="请输入合作老师"
                  style="width: 70%; float: left"
                /> </FormItem
            ></Col>
          </Row>
          <div v-for="item in zindingyi">
            <Row v-if="item.widthtype == 0">
              <FormItem :label="item.stuparamtypename" prop="zidingyiStuNO">
                <Input
                  type="text"
                  :v-model="item.savevalue"
                  placeholder="请输入"
                  style="width: 70%; float: left"
                />
              </FormItem>
            </Row>
            <Row v-if="item.widthtype == 1">
              <FormItem :label="item.stuparamtypename" prop="zidingyiStuNO">
                <Input
                  type="textarea"
                  :v-model="item.savevalue"
                  placeholder="请输入"
                  style="width: 70%; float: left"
                />
              </FormItem>
            </Row>
          </div>
        </div>
      </Form>
    </Card>

    <Card style="margin-top: 2%" v-if="current == 1">
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
          <Table border ref="selection" :columns="columns" :data="data"></Table>
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
          <Table border ref="selection" :columns="columnszf" :data="datazf"></Table>
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
          <Table border ref="selection" :columns="columnssp" :data="datasp"></Table>
        </Col>
      </Row>
    </Card>

    <Card style="margin-top: 2%" v-if="current == 2">
      <Form ref="querenForm" :model="querenForm" :rules="querenFormRule">
        <Row>
          <Col span="12">
            <FormItem label="课程总金额" prop="amountKC">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountKC"
                placeholder="请输入课程总金额"
                style="width: 40%; float: left"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="杂费总金额" prop="amountOther">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountOther"
                placeholder="请输入杂费总金额"
                style="width: 40%; float: left"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="商品总金额" prop="amountWp">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountWp"
                placeholder="请输入商品总金额"
                style="width: 40%; float: left"
                readonly
              ></InputNumber> </FormItem
          ></Col>
          <Col span="12">
            <FormItem label="优惠政策" prop="youhuizhengce">
              <Select
                v-model="querenForm.youhuizhengce"
                placeholder="请选择优惠政策"
                style="width: 35%; float: left"
                @on-change="SelectYouhuizhengce"
              >
                <Option
                  v-for="item in allyouhuizhengce"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem></Col
          >
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="使用代金券" prop="userdaijinquan">
              <RadioGroup
                v-model="querenForm.userdaijinquan"
                @on-change="changeSelectDjq"
              >
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem
              label="代金券金额"
              prop="daijinquan"
              v-if="querenForm.userdaijinquan == '是'"
            >
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.daijinquan"
                placeholder="请输入代金券金额"
                style="width: 40%; float: left"
                @on-change="changeDaijinquan"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="合同金额" prop="amountMoney">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountMoney"
                placeholder="请输入合同金额"
                style="width: 40%; float: left"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="定金报名" prop="dingjinbaoming">
              <RadioGroup
                v-model="querenForm.dingjinbaoming"
                @on-change="changedingjinzt"
              >
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
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
                style="width: 40%; float: left"
                @on-change="changeDingjinMoney"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="12">
            <FormItem label="实收金额" prop="amountshishou">
              <InputNumber
                :max="10000000"
                :min="0.01"
                :step="0.01"
                v-model="querenForm.amountshishou"
                placeholder="请输入实收金额"
                style="width: 40%; float: left"
                readonly
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="业绩人" prop="yejistaff">
            <Select
              v-model="querenForm.yejistaff"
              placeholder="请选择业绩人"
              style="width: 35%; float: left"
              multiple
              :filterable="true"
              @on-change="changeYejiren"
            >
              <Option v-for="item in allyejistaff" :value="item.id" :key="item.id">{{
                item.staffName
              }}</Option>
            </Select>
          </FormItem>
          <List
            header="业绩人业绩金额"
            footer=""
            border
            style="width: 50%; float: left"
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
        </Row>
        <Row>
          <FormItem label="付款方式" prop="fufeistyles">
            <Select
              v-model="querenForm.fufeistyles"
              placeholder="请选择付款方式"
              style="width: 35%; float: left"
              multiple
              @on-change="changefukuanstyle"
            >
              <Option v-for="item in fufeistyleData" :value="item.id" :key="item.id">{{
                item.moneystyleName
              }}</Option>
            </Select>
          </FormItem>
          <List
            header="支付方式支付金额"
            footer=""
            border
            style="width: 50%; float: left"
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
        </Row>
        <FormItem label="交费日期" prop="qiandandate">
          <DatePicker
            type="date"
            placeholder="请选择交费日期"
            v-model="querenForm.qiandandate"
            format="yyyy-MM-dd"
            style="width: 35%; float: left"
          ></DatePicker>
        </FormItem>
        <FormItem label="费用说明(最多50字，选填)：" prop="beizhu">
          <Input
            type="textarea"
            v-model="querenForm.beizhu"
            placeholder="请输入费用说明"
            style="width: 35%; float: left"
            maxlength="50"
          />
        </FormItem>
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
      <Button type="success" @click="saveqiandan">保存信息</Button>
    </Row>
    <addkeshijifei-form
      v-model="showaddKeshikecheng"
      :campusID="addqiandanForm.campusID"
      @increment="savekeshikecheng"
      :editData="editkecheng"
    >
    </addkeshijifei-form>
    <addkeshibao-form
      v-model="showaddkeshibaokecheng"
      :campusID="addqiandanForm.campusID"
      @increment="savekeshikecheng"
      :editData="editkecheng"
    ></addkeshibao-form>
    <addqizhiriqikecheng-form
      v-model="showaddqizhikecheng"
      :campusID="addqiandanForm.campusID"
      @increment="savekeshikecheng"
      :editData="editkecheng"
    ></addqizhiriqikecheng-form>
    <addzafei-form
      v-model="showaddzafei"
      :campusID="addqiandanForm.campusID"
      @increment="savezafei"
    ></addzafei-form>
    <addshangpin-form
      v-model="showaddwuping"
      :campusID="addqiandanForm.campusID"
      @increment="savewuping"
    ></addshangpin-form>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
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
        stuName: "",
        parentsTel: "",
        campusID: "",
        stuGradeID: "",
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
        userdaijinquan: "否",
        daijinquan: 0,
        amountMoney: 0,
        dingjinbaoming: "否",
        dingjin: 0,
        amountshishou: 0,
        fufeistyles: [],
        yejistaff: [],
        qiandandate: "",
        beizhu: "",
        youhuiMoney: 0,
        RemovedKCstr: "",
        removeWPstr: "",
        removeZFstr: "",
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
        parentsTel: [
          {
            required: true,
            message: "请输入联系电话",
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
            message: "请选择年级",
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
      columns: [
        {
          title: "选择操作",
          align: "center",
          key: "checkBox",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.data.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
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
            console.log(params.row.ZK);
            if (params.row.ZK == 1) {
              state = "未打折";
            } else {
              state = Number(params.row.ZK * 10).toFixed(2) + "折";
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
          title: "选择操作",
          align: "center",
          key: "checkBox",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.datazf.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.datazf[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
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
          title: "选择操作",
          align: "center",
          key: "checkBox",
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.datasp.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.datasp[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
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
      editkecheng: "",
    };
  },
  methods: {
    next() {
      if (this.current == 2) {
        this.current = 0;
      } else {
        if (this.current == 1) {
          this.getyouhuizhengce();
          this.changeYejiren();
          this.changefukuanstyle();
        }
        this.current += 1;
      }
    },
    back() {
      this.current -= 1;
    },
    showmoreclick() {
      if (this.showmore == false) {
        this.showmore = true;
        this.btntext = "收起";
      } else {
        this.showmore = false;
        this.btntext = "显示更多";
      }
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
      this.editkecheng = "";
      if (this.addqiandanForm.campusID == "" || this.addqiandanForm.stuGradeID == "") {
        this.$Message.error("请选择校区和年级");
      } else {
        this.showaddkeshibaokecheng = true;
      }
    },
    addqizhiriqikecheng() {
      this.editkecheng = "";
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
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllStuGradeYoouhuizhengce", {
          stuGradeID: this.addqiandanForm.stuGradeID,
          jine: this.querenForm.amountMoney,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allyouhuizhengce = res.obj;
          }
        });
    },
    savekeshikecheng(addkecheng) {
      this.data.push(JSON.parse(addkecheng));
      this.jisuanMoney();
    },
    savezafei(zafeidata) {
      this.datazf.push(JSON.parse(zafeidata));
      this.jisuanMoney();
    },
    savewuping(wpdata) {
      this.datasp.push(JSON.parse(wpdata));
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
    deletekecheng() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].checkBox) {
              if (this.data[i].qdsID) {
                this.querenForm.RemovedKCstr += this.data[i].qdsID + ",";
              }
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
            if (this.datazf[i].checkBox) {
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
            if (this.datasp[i].checkBox) {
              this.datasp.splice(i, 1);
              this.jisuanMoney();
            }
          }
        },
        onCancel: () => {},
      });
    },
    saveqiandan() {
      console.log(this.querenForm);
      api
        .post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateStuQianDan", {
          qiandanid: this.$route.query.qiandanID,
          buxikechengMoney: this.querenForm.amountKC,
          beizhu: this.querenForm.beizhu,
          bxKcData: JSON.stringify(this.data),
          stuName: this.addqiandanForm.stuName,
          stuSex: this.addqiandanForm.stuSex,
          campusID: this.addqiandanForm.campusID,
          stuGradeID: this.addqiandanForm.stuGradeID,
          buxiStateID: this.addqiandanForm.buxiStateID,
          parentsTel: this.addqiandanForm.parentsTel,
          qiandanstaffinfo: JSON.stringify(this.yejirenMoney),
          paymoneystyle: JSON.stringify(this.zhifustylemoney),
          isZhuanIntroduce: this.addqiandanForm.zhuanIntroduce,
          qiandandate: toolbox.dateFtt(this.querenForm.qiandandate, "yyyy-MM-dd"),
          telFromID: this.addqiandanForm.telFromID,
          oldSname: this.addqiandanForm.oldSchoolID,
          oldTname: this.addqiandanForm.oldSchoolTeacherID,
          shuxingValue: "",
          numberID: "",
          stuBrithday: this.addqiandanForm.stuBrithday,
          dingjin: this.querenForm.dingjin,
          daijinquan: this.querenForm.daijinquan,
          removedKCstr: this.querenForm.RemovedKCstr,
          wpData: JSON.stringify(this.datasp),
          zidingyiStuNO: this.addqiandanForm.zidingyiStuNO,
          wpPrice: this.querenForm.amountWp,
          zfData: JSON.stringify(this.datazf),
          zfAmount: this.querenForm.amountOther,
          selectYouhui: this.querenForm.youhuizhengce,
          removeWPstr: this.querenForm.removeWPstr,
          removeZFstr: this.querenForm.removeZFstr,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.$router.go(0);
          }
        });
    },
    //改变代金券金额
    changeDaijinquan() {
      this.querenForm.amountshishou = Number(
        this.querenForm.amountMoney -
          this.querenForm.daijinquan -
          this.querenForm.youhuiMoney
      );
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
    },
    //修改定金支付金额
    changeDingjinMoney() {
      this.querenForm.amountshishou = this.querenForm.dingjin;
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
    },
    //选择业绩人信息
    changeYejiren() {
      this.pinjunyeji = Number(
        this.querenForm.amountshishou / this.querenForm.yejistaff.length
      );
      this.yejirenMoney = [];
      this.querenForm.yejistaff.forEach((element) => {
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
        this.querenForm.amountshishou / this.querenForm.fufeistyles.length
      );
      this.zhifustylemoney = [];
      this.querenForm.fufeistyles.forEach((element) => {
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
          (this.querenForm.yejistaff.length - 1)
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
          (this.querenForm.fufeistyles.length - 1)
      );
      this.yejirenMoney.forEach((element) => {
        if (element.zhifustyleName == item.zhifustyleName) {
        } else {
          element.paymoney = this.pinjunpayMoney;
        }
      });
    },
    //编辑课程
    editkechengInfo() {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i].checkBox) {
          console.log(this.data[i]);
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
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 141 })
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
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanInfo", {
        qiandanID: this.$route.query.qiandanID,
      })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.addqiandanForm.stuName = res.obj[0].stuName;
          this.addqiandanForm.parentsTel = res.obj[0].parentsTel;
          this.addqiandanForm.campusID = res.obj[0].campusID;
          this.addqiandanForm.stuGradeID = res.obj[0].stuGradeID;
          this.addqiandanForm.zidingyiStuNO = res.obj[0].zidingyiStuNo;
          this.addqiandanForm.stuSex = res.obj[0].stuSex == "男" ? "1" : "2";
          this.addqiandanForm.buxiStateID = res.obj[0].buxiStateID + "";
          this.addqiandanForm.telFromID = res.obj[0].telFromID;
          this.addqiandanForm.zhuanIntroduce = res.obj[0].isZhuanIntroduce;
          this.addqiandanForm.stuBrithday = res.obj[0].stuBrithday;
          this.addqiandanForm.oldSchoolID = res.obj[0].oldSchoolID;
          this.addqiandanForm.oldSchoolTeacherID = res.obj[0].oldSchoolTeacherID;
          this.querenForm.amountKC = res.obj[0].kechengMoney;
          this.querenForm.amountOther = Number(res.obj[0].zafeiMoney);
          this.querenForm.amountWp =
            res.obj[0].wupingMoney > 0 ? res.obj[0].wupingMoney : 0;
          this.querenForm.youhuizhengce = res.obj[0].youhuiID;
          this.querenForm.userdaijinquan = res.obj[0].daijinquanMoney > 0 ? "是" : "否";
          this.querenForm.daijinquan =
            res.obj[0].daijinquanMoney > 0 ? res.obj[0].daijinquanMoney : 0;
          this.querenForm.amountMoney = res.obj[0].hetongMoney;
          this.querenForm.dingjinbaoming =
            res.obj[0].hetongMoney != res.obj[0].shishouTotalMoney ? "是" : "否";
          this.querenForm.dingjin = Number(
            res.obj[0].hetongMoney - res.obj[0].shishouTotalMoney
          );
          this.querenForm.amountshishou = res.obj[0].shishouTotalMoney;
          this.querenForm.qiandandate = res.obj[0].qiandandate;
          this.querenForm.beizhu = res.obj[0].beizhu;
          this.querenForm.youhuiMoney = res.obj[0].youhuijine;
        }
      });
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanStaffInfo", {
        qiandanID: this.$route.query.qiandanID,
      })
      .then((res) => {
        this.yejirenMoney = [];
        if (res.success == true && res.code == "Y") {
          this.yejirenMoney = res.obj;
          res.obj.forEach((element) => {
            this.querenForm.yejistaff.push(element.staffID);
          });
        }
      });
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanPayMoneyList", {
        qiandanID: this.$route.query.qiandanID,
      })
      .then((res) => {
        this.zhifustylemoney = [];
        if (res.code == "Y" && res.success == true) {
          this.zhifustylemoney = res.obj;
          res.obj.forEach((element) => {
            this.querenForm.fufeistyles.push(element.paymoneyStyleID);
          });
        }
      });
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanBuyKechengList", {
        qiandanID: this.$route.query.qiandanID,
      })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
        }
      });
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetqiandanSuppliesList", {
        qiandanID: this.$route.query.qiandanID,
      })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.datasp = res.obj;
        }
      });
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanOtherMoneyListbyqiandan", {
        qiandanID: this.$route.query.qiandanID,
      })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.datazf = res.obj;
        }
      });
  },
};
</script>
