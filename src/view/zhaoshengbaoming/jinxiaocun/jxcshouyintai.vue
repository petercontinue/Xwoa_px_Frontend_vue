<template>
  <div>
    <Row>
      <Col span="12">
        <Card>
          <Form
            ref="goodsInfoForm"
            :model="goodsInfoForm"
            :rules="goodsInfoFormRule"
            :label-width="100"
            :label-colon="true"
          >
            <Row>
              <FormItem label="商品条码" prop="chanpintiaoma">
                <Input
                  type="text"
                  v-model="goodsInfoForm.chanpintiaoma"
                  placeholder="商品条码（扫描或输入之后回车）"
                />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="商品名称" prop="id">
                <Select
                  v-model="goodsInfoForm.id"
                  placeholder="请选择商品"
                  style="width: 100%"
                  @on-change="SelectGoods"
                >
                  <Option v-for="item in allgoodsData" :value="item.id" :key="item.id">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="商品单价" prop="salePrice">
                <InputNumber
                  :max="10000000"
                  :min="0.01"
                  :step="0.01"
                  v-model="goodsInfoForm.salePrice"
                  placeholder="请输入商品单价"
                  style="width: 100%"
                ></InputNumber>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="商品数量" prop="buySum">
                <InputNumber
                  :max="10000000"
                  :min="0.01"
                  :step="0.01"
                  v-model="goodsInfoForm.buySum"
                  placeholder="请输入商品数量"
                  style="width: 100%"
                ></InputNumber>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="商品小计" prop="hejijine">
                <InputNumber
                  :max="10000000"
                  :min="0.01"
                  :step="0.01"
                  v-model="goodsInfoForm.hejijine"
                  placeholder="请输入商品小计"
                  style="width: 100%"
                  readonly
                ></InputNumber>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="下单学生" prop="stukahao">
                <Select
                  v-model="goodsInfoForm.stukahao"
                  placeholder="请选择下单学生"
                  style="width: 100%"
                  :filterable="true"
                >
                  <Option v-for="item in AllstuData" :value="item.id" :key="item.id">{{
                    item.stuName
                  }}</Option>
                </Select>
              </FormItem>
            </Row>
            <Row style="text-align: center">
              <Button type="info" @click="querenAdd">确定</Button>
            </Row>
          </Form>
        </Card>
      </Col>
      <Col span="12">
        <Card>
          <Table
            border
            ref="selection"
            :columns="columns"
            :data="dataselectsp"
          ></Table> </Card
      ></Col>
    </Row>
    <br />
    <Row v-if="showjiesuan">
      <Col span="24">
        <Card>
          <Form
            ref="querenForm"
            :model="querenForm"
            :rules="querenFormRule"
            :label-width="100"
            :label-colon="true"
          >
            <Row>
              <Col span="6">
                <FormItem label="总计金额" prop="zongjiMoney">
                  <InputNumber
                    :max="10000000"
                    :min="0.01"
                    :step="0.01"
                    v-model="querenForm.zongjiMoney"
                    placeholder="请输入总计金额"
                    style="width: 100%"
                  ></InputNumber>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="优惠金额" prop="youhuiMoney">
                  <InputNumber
                    :max="10000000"
                    :min="0.01"
                    :step="0.01"
                    v-model="querenForm.youhuiMoney"
                    placeholder="请输入优惠金额"
                    style="width: 100%"
                    @on-change="changeYouhuijine"
                  ></InputNumber>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="应付金额" prop="yingfuMoney">
                  <InputNumber
                    :max="10000000"
                    :min="0.01"
                    :step="0.01"
                    v-model="querenForm.yingfuMoney"
                    placeholder="请输入应付金额"
                    style="width: 100%"
                  ></InputNumber>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="实际支付" prop="shijiMoney">
                  <InputNumber
                    :max="10000000"
                    :min="0.01"
                    :step="0.01"
                    v-model="querenForm.shijiMoney"
                    placeholder="请输入实际支付"
                    style="width: 100%"
                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>

            <Row style="margin-top: 15px">
              <Col span="8">
                <FormItem label="付款方式">
                  <RadioGroup v-model="payType" @on-change="changPaystyle">
                    <Radio label="小程序付款" v-if="showpaystyle"></Radio>
                    <Radio label="充值余额付款" v-if="showpaystyle"></Radio>
                    <Radio label="其他付款方式"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="8" v-if="payType == '其他付款方式'">
                <FormItem label="其他付款方式" prop="fufeistyles">
                  <Select
                    v-model="querenForm.fufeistyles"
                    placeholder="请选择付款方式"
                    style="width: 100%"
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
              <Col
                v-if="payType == '其他付款方式'"
                span="8"
                style="text-align: left; padding-left: 5px; padding-top: 8px"
              >
                <label style="color: #2d8cf0">可多选</label>，付款方式类别<label
                  style="color: #2d8cf0"
                  >【点击这里】</label
                >自定义设置
              </Col>
            </Row>
            <Row style="margin: 10px">
              <Col span="12">
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
              <Col span="12">
                <Button type="primary" ghost @click="quedingzhifu">确定支付</Button>
              </Col>
            </Row>
          </Form>
        </Card></Col
      >
    </Row>
    <br />
    <Row>
      <Col span="24">
        <Card>
          <Table
            border
            ref="selection"
            :columns="columnschengjiap"
            :data="datachengjiao"
          ></Table>
          <Row style="margin-top: 15px">
            <Page
              :total="total"
              show-elevator
              show-total
              prev-text="上一页"
              next-text="下一页"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            />
          </Row> </Card
      ></Col>
    </Row>
  </div>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  data() {
    return {
      goodsInfoForm: {
        id: "",
        chanpintiaoma: "",
        goodsName: "",
        salePrice: 0,
        buySum: 0,
        hejijine: 0,
        stukahao: "",
      },
      goodsInfoFormRule: {
        chanpintiaoma: [
          {
            required: true,
            message: "请输入产品条码",
            trigger: "change",
            type: "string",
          },
        ],
        id: [
          {
            required: true,
            message: "请选择商品",
            trigger: "change",
            type: "string",
          },
        ],
        salePrice: [
          {
            required: true,
            message: "请输入售价",
            trigger: "change",
            type: "number",
          },
        ],
        buySum: [
          {
            required: true,
            message: "请输入购买数量",
            trigger: "change",
            type: "number",
          },
        ],
        hejijine: [
          {
            required: true,
            message: "请输入合计金额",
            trigger: "change",
            type: "number",
          },
        ],
      },
      dataselectsp: [],
      querenForm: {
        zongjiMoney: 0,
        youhuiMoney: 0,
        yingfuMoney: 0,
        shijiMoney: 0,
        fufeistyle: "",
      },
      querenFormRule: {
        zongjiMoney: [
          {
            required: true,
            message: "请输入总计金额",
            trigger: "change",
            type: "number",
          },
        ],
        youhuiMoney: [
          {
            required: true,
            message: "请输入优惠金额",
            trigger: "change",
            type: "number",
          },
        ],
        yingfuMoney: [
          {
            required: true,
            message: "请输入应付金额",
            trigger: "change",
            type: "number",
          },
        ],
        shijiMoney: [
          {
            required: true,
            message: "请输入实际支付金额",
            trigger: "change",
            type: "number",
          },
        ],
        fufeistyle: [
          {
            required: true,
            message: "请选择付费方式",
            trigger: "change",
            type: "string",
          },
        ],
      },
      columns: [
        {
          title: "商品ID",
          key: "id",
          align: "center",
        },
        {
          title: "商品名称",
          key: "goodsName",
          align: "center",
        },
        {
          title: "数量",
          key: "buySum",
          align: "center",
        },
        {
          title: "条码",
          key: "chanpintiaoma",
          align: "center",
        },
        {
          title: "单价",
          key: "salePrice",
          align: "center",
        },
        {
          title: "小项合计",
          key: "hejijine",
          align: "center",
        },
        {
          title: "操作",
          key: "caozuo",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color: "blue",
                  },
                  on: {
                    click: () => {
                      this.updateaddgoods(params);
                    },
                  },
                },
                "修改    "
              ),
              h(
                "span",
                {
                  style: {
                    color: "red",
                  },
                  on: {
                    click: () => {
                      this.deleteaddgoods(params);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      fufeistyleData: [],
      datachengjiao: [],
      total: 0,
      size: 10,
      current: 1,
      columnschengjiap: [
        {
          title: "商品ID",
          key: "suppliesID",
          align: "center",
        },
        {
          title: "商品名称",
          key: "suppliesName",
          align: "center",
        },
        {
          title: "数量",
          key: "buySum",
          align: "center",
        },
        {
          title: "单价",
          key: "buyPrice",
          align: "center",
        },
        {
          title: "小项合计",
          key: "orderMoney",
          align: "center",
        },
        {
          title: "操作人",
          key: "staffName",
          align: "center",
        },
        {
          title: "时间",
          key: "creatDatetime",
          align: "center",
        },
      ],
      allgoodsData: [],
      AllstuData: [],
      payType: "小程序付款",
      zhifustylemoney: [],
      showjiesuan: false,
      showpaystyle: false,
    };
  },
  methods: {
    SelectGoods() {
      this.allgoodsData.forEach((element) => {
        if (element.id == this.goodsInfoForm.id) {
          this.goodsInfoForm.goodsName = element.name;
          this.goodsInfoForm.salePrice = element.salePrice;
          this.goodsInfoForm.buySum = 1;
          this.goodsInfoForm.hejijine = element.salePrice;
          this.goodsInfoForm.chanpintiaoma = element.changpinTiaoma;
        }
      });
    },
    querenAdd() {
      this.$refs["goodsInfoForm"].validate((valid) => {
        if (valid) {
          console.log(this.goodsInfoForm);
          if (this.goodsInfoForm.stukahao != "") {
            this.showpaystyle = true;
            this.changPaystyle();
          } else {
          }
          this.showjiesuan = true;
          if (this.dataselectsp.length == 0) {
            this.dataselectsp.push(JSON.parse(JSON.stringify(this.goodsInfoForm)));
          } else {
            let ishave = false;
            this.dataselectsp.forEach((item) => {
              if (item.id == this.goodsInfoForm.id) {
                item.buySum += this.goodsInfoForm.buySum;
                item.hejijine += this.goodsInfoForm.buySum * this.goodsInfoForm.salePrice;
                ishave = true;
              }
            });
            if (ishave == false) {
              this.dataselectsp.push(JSON.parse(JSON.stringify(this.goodsInfoForm)));
            }
          }
          this.jisuanshoufeijine();
        } else {
          this.$Message.error("请将必填字段填写完整!");
        }
      });
    },
    updateaddgoods(params) {
      this.goodsInfoForm = params.row;
      this.jisuanshoufeijine();
    },
    deleteaddgoods(params) {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          for (var i = 0; i < this.dataselectsp.length; i++) {
            if (this.dataselectsp[i].id == params.row.id) {
              this.dataselectsp.splice(i, 1);
              this.jisuanshoufeijine();
            }
          }
        },
      });
    },
    jisuanshoufeijine() {
      this.querenForm.zongjiMoney = 0;
      this.querenForm.yingfuMoney = 0;
      this.querenForm.shijiMoney = 0;
      this.dataselectsp.forEach((item) => {
        this.querenForm.zongjiMoney += Number(item.buySum * item.salePrice);
        this.querenForm.yingfuMoney += Number(item.buySum * item.salePrice);
        this.querenForm.shijiMoney += Number(item.buySum * item.salePrice);
      });
    },
    changeYouhuijine() {
      this.querenForm.yingfuMoney = Number(
        this.querenForm.zongjiMoney - this.querenForm.youhuiMoney
      );
      this.querenForm.shijiMoney = Number(
        this.querenForm.zongjiMoney - this.querenForm.youhuiMoney
      );
    },
    quedingzhifu() {
      this.$refs["querenForm"].validate((valid) => {
        if (valid) {
          this.$Modal.confirm({
            title: "提交支付",
            content: "<p>确定提交支付?</p>",
            onOk: () => {
              let zhifustyle = "";
              if (this.querenForm.fufeistyles == "-1") {
                zhifustyle = "-1";
              } else if (this.querenForm.fufeistyles == "-2") {
                zhifustyle = "-2";
              } else {
                this.querenForm.fufeistyles.forEach((element) => {
                  zhifustyle += element + ",";
                });
              }
              var reg = /,$/gi;
              api
                .post("/xwcloud-zsbm/zsbm/JinXiaoCun/SaveSaleWupingInfo", {
                  amountmoney: this.querenForm.zongjiMoney,
                  youhuijine: this.querenForm.youhuiMoney,
                  shijiamount: this.querenForm.shijiMoney,
                  paystyle: zhifustyle.replace(reg, ""),
                  stuID: this.goodsInfoForm.stukahao,
                  wpData: JSON.stringify(this.dataselectsp),
                  zhifustylemoney: JSON.stringify(this.zhifustylemoney),
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success("商品收银成功");
                    this.$refs["querenForm"].resetFields();
                    this.$refs["goodsInfoForm"].resetFields();
                    this.SelectGoods = [];
                    this.loadtodayliushui();
                  }
                });
            },
          });
        } else {
          this.$Message.error("请将必填字段填写完整!");
        }
      });
    },
    loadtodayliushui() {
      api
        .get("/xwcloud-zsbm/zsbm/JinXiaoCun/GetTodayXiaoshouliushui", {
          size: this.size,
          current: this.current,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.datachengjiao = res.obj.records;
            this.total = Number(res.obj.total);
          }
        });
    },
    changePage(current) {
      this.current = current;
      this.getZhaoshengMubiao();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getZhaoshengMubiao();
    },
    changPaystyle() {
      this.zhifustylemoney = [];
      if (this.payType == "小程序付款") {
        //加载小程序的
        this.zhifustylemoney.push({
          paymoneyStyleID: -1,
          zhifustyleName: "小程序支付",
          payMoney: this.querenForm.shijiMoney,
        });
        this.querenForm.fufeistyles = "-1";
      } else if (this.payType == "充值余额付款") {
        this.zhifustylemoney.push({
          paymoneyStyleID: -2,
          zhifustyleName: "充值余额支付",
          payMoney: this.querenForm.shijiMoney,
        });
        this.querenForm.fufeistyles = "-2";
      } else if (this.payType == "其他付款方式") {
      }
    },
    //选择支付方式
    changefukuanstyle() {
      this.pinjunpayMoney = Number(
        this.querenForm.shijiMoney / this.querenForm.fufeistyles.length
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
    //修改支付方式的支付金额
    changepaymoney(item) {
      this.pinjunpayMoney = Number(
        (this.querenForm.shijiMoney - item.payMoney) /
          (this.querenForm.fufeistyles.length - 1)
      );
      console.log(this.pinjunpayMoney);
      this.zhifustylemoney.forEach((element) => {
        if (element.zhifustyleName == item.zhifustyleName) {
        } else {
          element.payMoney = this.pinjunpayMoney;
        }
      });
    },
  },
  mounted() {
    this.loadtodayliushui();
    api
      .get("/xwcloud-sys/sys/StaffManagement/GetAllPxPayMoneyStyleList", {})
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.fufeistyleData = res.obj;
        }
      });
    api
      .get("/xwcloud-zsbm/zsbm/JinXiaoCun/GetTeachingSuppliesByTiaoma", { tiaoma: null })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allgoodsData = res.obj;
        }
      });
    api
      .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList", { menuID: 151 })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.AllstuData = res.obj;
        }
      });
  },
};
</script>
