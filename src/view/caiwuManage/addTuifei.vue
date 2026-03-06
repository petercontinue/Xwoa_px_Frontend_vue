<template>
  <div style="margin-top: 10px">
    <Card style="width: 95; margin: 20px; minheight: 50vh">
      <p slot="title">添加退费</p>
      <div>
        <Form
          ref="addtuifeiForm"
          :model="addtuifeiForm"
          :rules="addtuifeiFormRule"
          :label-colon="true"
          :label-width="100"
        >
          <Row>
            <Col span="8" offset="4">
              <FormItem label="学员姓名" prop="stuID">
                <Select
                  v-model="addtuifeiForm.stuID"
                  placeholder="请选择学员"
                  @on-change="getstuMessage()"
                  filterable
                >
                  <Option v-for="item in allStu" :value="item.id" :key="item.id">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="付费方式" prop="payStyleID">
                <Select
                  v-model="addtuifeiForm.payStyleID"
                  placeholder="请选择支付方式"
                  filterable
                >
                  <Option v-for="item in allPaystyle" :value="item.id" :key="item.id">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="4">
              <FormItem label="业绩人" prop="yejirenID">
                <Select
                  v-model="addtuifeiForm.yejirenID"
                  placeholder="请选择业绩人"
                  filterable
                >
                  <Option v-for="item in allStaff" :value="item.id" :key="item.id">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="办理时间" prop="processingTime">
                <DatePicker
                  type="datetime"
                  ref="processingTime"
                  v-model="addtuifeiForm.processingTime"
                  clearable
                  :editable="false"
                  placeholder="选择办理时间"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8" offset="4">
              <FormItem label="选择签单" prop="payStyle">
                <Select
                  v-model="qdList"
                  multiple
                  placeholder="请选择签单"
                  @on-change="changekc()"
                  filterable
                >
                  <Option v-for="item in allQiandan" :value="item.id" :key="item.id">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <font style="color: red">不选择默认读取所有签单信息。</font>
            </Col>
          </Row>
          <Row>
            <Col span="15" offset="4">
              <FormItem label="退费说明" prop="shuoming">
                <Input
                  v-model="addtuifeiForm.shuoming"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4 }"
                  placeholder="请输入退费说明..."
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Row v-if="Showmessage == true">
          <Col span="18" offset="2">
            <List
              header="系统数据只供参考，具体退费金额以贵校的实际情况来决定。"
              border
              size="small"
            >
              <ListItem
                >课程-->课程缴纳费用：{{ kechengMoney }}元(点击查看)。课时消耗：{{
                  kehaoMoney
                }}元(点击查看)。接受他人赠送的课时费：{{
                  getsongMoney
                }}元。转送给他人的课时费：{{ zhuansongMoney }}元</ListItem
              >
              <ListItem
                >充值-->充值缴费：{{ rechargemoney }}(点击查看)。充值赠送：{{
                  rechargeSongMoney
                }}元。充值金额消耗：{{ moneyPay }}元(点击查看)。充值余额：{{
                  remainrechargeMoney
                }}元。</ListItem
              >
              <ListItem>商品-->实际缴费：{{ goodsMoney }}元(点击查看)。</ListItem>
              <ListItem>杂费-->实际缴费：{{ zaMoney }}元。</ListItem>
              <ListItem>使用代金券金额：{{ daijinquan }}元。</ListItem>
              <ListItem>优惠政策优惠金额：{{ youhuiMoney }}元。</ListItem>
              <ListItem>剩余金额合计：{{ rechargeMoney }}元。</ListItem>
            </List>
          </Col>
        </Row>

        <div slot="footer" style="text-align: center; margin-top: 10px">
          <span>
            <Button v-if="!kcShow" type="primary" @click="tuikecheng()"
              >操作课程退费</Button
            >
            <Button v-if="kcShow" type="warning" @click="tuikecheng()"
              >取消课程退费</Button
            >
          </span>
          <span>
            <Button v-if="!spShow" type="primary" @click="tuisupplise()"
              >操作商品退费</Button
            >
            <Button v-if="spShow" type="warning" @click="tuisupplise()"
              >取消商品退费</Button
            >
          </span>
          <span>
            <Button v-if="!zfShow" type="primary" @click="tuizafei()"
              >操作杂费退费</Button
            >
            <Button v-if="zfShow" type="warning" @click="tuizafei()">取消杂费退费</Button>
          </span>
          <span>
            <Button type="primary" @click="tuiyue('addtuifeiForm')"
              >操作充值余额退费</Button
            >
          </span>
          <Button type="success" @click="tuiallMoney('addtuifeiForm')"
            >操作全部退费</Button
          >
        </div>
      </div>
    </Card>
    <Card
      style="width: 95; margin: 20px; minheight: 50vh"
      v-if="kcShow == true || spShow == true || zfShow == true"
    >
      <div v-if="kcShow">
        <Row>
          <Col span="24">
            <Button type="primary" @click="tuicheckKc('addtuifeiForm')"
              >选择课程退费</Button
            >
            <Button type="primary" @click="tuiallKc('addtuifeiForm')"
              >全部课程退费</Button
            >
          </Col>
        </Row>
        <Row style="margin-top: 10px">
          <Col span="24">
            <Table
              border
              ref="selectionkc"
              highlight-row
              @on-row-click="onClickRowkc"
              :columns="columnskc"
              :data="datakc"
            ></Table>
          </Col>
        </Row>
      </div>

      <div v-if="spShow" style="margin-top: 20px">
        <Row>
          <Col span="24">
            <Button type="primary" @click="tuicheckSp('addtuifeiForm')"
              >选择商品退费</Button
            >
            <Button type="primary" @click="tuiallSp('addtuifeiForm')"
              >全部商品退费</Button
            >
          </Col>
        </Row>
        <Row style="margin-top: 10px">
          <Col span="24">
            <Table
              border
              ref="selectionsp"
              @on-row-click="onClickRowsp"
              :columns="columnssp"
              :data="datasp"
            ></Table>
          </Col>
        </Row>
      </div>

      <div v-if="zfShow" style="margin-top: 20px">
        <Row>
          <Col span="24">
            <Button type="primary" @click="tuicheckzf('addtuifeiForm')"
              >选择杂费退费</Button
            >
            <Button type="primary" @click="tuiallzf('addtuifeiForm')"
              >全部杂费退费</Button
            >
          </Col>
        </Row>
        <Row style="margin-top: 10px">
          <Col span="24">
            <Table
              border
              ref="selectionzf"
              @on-row-click="onClickRowzf"
              :columns="columnszf"
              :data="datazf"
            ></Table>
          </Col>
        </Row>
      </div>
    </Card>
  </div>
</template>
<style scoped></style>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
export default {
  components: {},
  data() {
    return {
      allStu: [],
      allPaystyle: [],
      allStaff: [],
      allQiandan: [],

      //选中的签单
      qdList: [],
      //逗号分割的签单ID
      qiandanIDs: "",
      //验证规则
      addtuifeiFormRule: {
        stuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        payStyleID: [{ required: true, message: "请选择支付方式", trigger: "change" }],
        yejirenID: [{ required: true, message: "请输入业绩人", trigger: "change" }],
        processingTime: [
          {
            required: true,
            type: "date",
            message: "请选择办理时间",
            trigger: "change",
          },
        ],
        shuoming: [{ required: true, message: "请输入退费说明", trigger: "blur" }],
      },
      Showmessage: false,
      kcShow: false,
      spShow: false,
      zfShow: false,
      checkAll: false,
      /**添加退费必选项 */
      addtuifeiForm: {
        stuID: "",
        payStyleID: "",
        yejirenID: "",
        processingTime: "",
        // qiandanID: "",
        shuoming: "",
      },

      tuiallmoney: "",

      //选择课程退费
      tuikc: {
        xadata: "",
        tuimessage: "",
        qiandanids: "",
      },
      tuiallkcmoney: "",

      //选择商品退费
      tuisp: {
        xadata: "",
        tuimessage: "",
        qiandanids: "",
      },
      tuiallspmoney: "", //商品全退金额

      //选择杂费退费
      tuizf: {
        xadata: "",
        tuimessage: "",
        qiandanids: "",
      },
      tuiallzfmoney: "", //杂费全退金额

      kechengMoney: "", //课程费用
      kehaoMoney: "", //课耗费用
      getsongMoney: "", //接收赠送费用
      zhuansongMoney: "", //转送出费用
      rechargemoney: "", //充值费用
      rechargeSongMoney: "", //充值赠送费用
      moneyPay: "", //充值消耗费用
      remainrechargeMoney: "", //充值剩余费用
      goodsMoney: "", //商品缴费
      zaMoney: "", //杂费缴费
      daijinquan: "", //代金券费用
      youhuiMoney: "", //优惠金额
      rechargeMoney: "", //剩余金额

      datakc: [],
      datasp: [],
      datazf: [],

      checkkc: [], //选中的课程
      checksp: [], //选中的商品
      checkzf: [], //选中的杂费

      columnskc: [
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
                    this.datakc.forEach((item) => {
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
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "是否定金课程",
          key: "isdingjing",
          align: "center",
          width: 130,
          render: (h, params) => {
            if (params.row.isdingjing == 3 || params.row.isdingjing == 4) {
              return h("label", "是");
            } else {
              return h("label", "不是");
            }
          },
        },
        {
          title: "实际交费",
          key: "shishouTotalMoney",
          align: "center",
          width: 100,
        },
        {
          title: "单价",
          key: "kechengprice",
          align: "center",
          width: 100,
        },
        {
          title: "剩余课时",
          key: "remainkeshi",
          align: "center",
          width: 100,
        },
        {
          title: "购买总价",
          key: "buyZonjia",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            state = Number(params.row.remainkeshi * params.row.kechengprice);
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "计费方式",
          key: "jifeiStyleID",
          align: "center",
          width: 160,
          render: (h, params) => {
            let state = "";
            switch (params.row.jifeiStyleID) {
              case 1:
                state = "按课时计费";
                break;
              case 2:
                state = "按课时包计费";
                break;
              case 3:
                state = "按起止日期计费";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "退费金额",
          key: "kechengName",
          align: "center",
          render: (h, params) => {
            return h("div", [
              "课时：",
              h("Input", {
                props: {
                  value: params.row._tuikeshi,
                  type: "number",
                },
                style: {
                  width: "150px",
                },
                on: {
                  input: (val) => {
                    if (val == "") {
                      this.$Message.error("请输入要退的课时数");
                    } else {
                      this.datakc[params.index]._tuikeshi = val;
                    }
                  },
                },
              }),
              "金额：",
              h("Input", {
                props: {
                  value: params.row._tuijine,
                  type: "number",
                },
                style: {
                  width: "150px",
                  marginLeft: "20px",
                },
                on: {
                  input: (val) => {
                    if (val == "") {
                      this.$Message.error("请输入要退费的金额");
                    } else {
                      this.datakc[params.index]._tuijine = val;
                    }
                  },
                },
              }),
            ]);
          },
        },
      ],
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
                    this.datasp.forEach((item) => {
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
          title: "物品名称",
          key: "Name",
          align: "center",
          width: 200,
        },
        {
          title: "购买数量",
          key: "BuySum",
          align: "center",
          width: 150,
        },
        {
          title: "购买单价",
          key: "BuyPrice",
          align: "center",
          width: 150,
        },
        {
          title: "总价",
          key: "SumMoney",
          align: "center",
          width: 150,
        },
        {
          title: "已退金额",
          key: "TuiMoney",
          align: "center",
          width: 150,
        },
        {
          title: "退费金额",
          key: "kechengName",
          align: "center",
          render: (h, params) => {
            return h("div", [
              "数量：",
              h("Input", {
                props: {
                  value: params.row._tuinum,
                  type: "number",
                },
                style: {
                  width: "150px",
                },
                on: {
                  input: (val) => {
                    if (val == "") {
                      this.$Message.error("请输入要退的数量");
                    } else {
                      this.datasp[params.index]._tuinum = val;
                    }
                  },
                },
              }),
              "金额：",
              h("Input", {
                props: {
                  value: params.row._tuijine,
                  type: "number",
                },
                style: {
                  width: "150px",
                  marginLeft: "20px",
                },
                on: {
                  input: (val) => {
                    if (val == "") {
                      this.$Message.error("请输入要退的金额");
                    } else {
                      this.datasp[params.index]._tuijine = val;
                    }
                  },
                },
              }),
            ]);
          },
        },
      ],
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
                    this.datazf.forEach((item) => {
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
          title: "物品名称",
          key: "otherMoneyName",
          align: "center",
          width: 200,
        },
        {
          title: "总费用",
          key: "onePrice",
          align: "center",
          width: 150,
        },
        {
          title: "已退金额",
          key: "tuiMoney",
          align: "center",
          width: 150,
        },
        {
          title: "退费金额",
          key: "kechengName",
          align: "center",
          render: (h, params) => {
            return h("div", [
              "金额：",
              h("Input", {
                props: {
                  value: params.row._tuijine,
                  type: "number",
                  autofocus: true,
                },
                style: {
                  width: "150px",
                  marginLeft: "20px",
                },
                on: {
                  input: (val) => {
                    this.datazf[params.index]._tuijine = val;
                    console.log(this.datakc);
                    console.log(val);
                  },
                },
              }),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    tuiyue(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Modal.confirm({
            width: 40,
            closable: true,
            render: (h) => {
              let create = this.$createElement;
              let dom = create("Input", {
                ref: "tagyueInput",
                props: {
                  value: this.remainrechargeMoney - this.rechargeSongMoney,
                  autofocus: true,
                  placeholder: "请输入金额",
                },
                on: {
                  input: (val) => {
                    this.value = val;
                  },
                  "on-focus": (event) => {
                    this.value = event.target.value;
                  },
                },
              });

              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "余额退费")])]),
                [
                  h("Divider", {
                    style: { margin: "10px 0px 20px 0px" },
                  }),
                ],

                h("Row", [
                  h(
                    "Col",
                    {
                      props: {
                        span: 4,
                      },
                    },
                    [
                      h(
                        "p",
                        {
                          style: { margin: "10px" },
                        },
                        "退费金额:"
                      ),
                    ]
                  ),
                  h(
                    "Col",
                    {
                      props: {
                        span: 20,
                      },
                    },
                    [dom]
                  ),
                ]),
              ]);
            },
            onOk: () => {
              this.$refs["tagyueInput"].focus();
              console.log(this.value);
              let yue = this.value;
              api
                .post("/xwcloud-caiwu/caiwu/pxtuifeitable/tuiyueBystu", {
                  stuID: this.addtuifeiForm.stuID,
                  payStyleID: this.addtuifeiForm.payStyleID,
                  yejirenID: this.addtuifeiForm.yejirenID,
                  processingTime: toolbox.dateFtt(
                    this.addtuifeiForm.processingTime,
                    "yyyy-MM-dd hh:mm"
                  ),
                  tuiyue: yue,
                  shuoming: this.addtuifeiForm.shuoming,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success({
                      top: 50,
                      duration: 5,
                      content: res.msg,
                    });
                    this.$refs[name].resetFields();
                    this.qdList = [];
                    this.getTuifei(this.qiandanIDs);
                    this.getkcList(this.qiandanIDs);
                  } else {
                    this.$Message.error("保存失败");
                  }
                });
            },
            onCancel: () => {},
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    onClickRowkc(row, index) {
      //改变为勾选样式
      this.$refs.selectionkc.data[index]._checked = !this.$refs.selectionkc.data[index]
        ._checked;
    },
    onClickRowsp(row, index) {
      //改变为勾选样式
      this.$refs.selectionsp.data[index]._checked = !this.$refs.selectionsp.data[index]
        ._checked;
    },
    onClickRowzf(row, index) {
      //改变为勾选样式
      this.$refs.selectionzf.data[index]._checked = !this.$refs.selectionzf.data[index]
        ._checked;
    },

    /**课程退费 */
    tuikecheng() {
      this.kcShow = !this.kcShow;
    },
    /**商品退费 */
    tuisupplise() {
      this.spShow = !this.spShow;
    },
    /**杂费退费 */
    tuizafei() {
      this.zfShow = !this.zfShow;
    },

    /**选择签单改变事件 */
    changekc() {
      this.qiandanIDs = "";
      if (this.qdList.length > 0) {
        this.qdList.forEach((item) => {
          this.qiandanIDs += item + ",";
        });
      } else if (this.qdList.length == 0) {
        this.qiandanIDs = "";
      }
      console.log(this.qiandanIDs);
      this.getTuifei(this.qiandanIDs);
      this.getkcList(this.qiandanIDs);
      this.getspList(this.qiandanIDs);
      this.getzfList(this.qiandanIDs);
    },

    /**获取学员补习课程 */
    getkcList(val) {
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/getKechengfeiDetail", {
          stuID: this.addtuifeiForm.stuID,
          qiandanIDs: val,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.datakc = res.obj;

            this.datakc.forEach((items) => {
              let tuiMoney = Number(items.remainkeshi * items.kechengprice);
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "_checked", false);
              this.$set(items, "_tuikeshi", items.remainkeshi);
              this.$set(items, "_tuijine", tuiMoney);
            });
          }
        });
    },
    /**获取学员商品*/
    getspList(val) {
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/getshanpingDetail", {
          stuID: this.addtuifeiForm.stuID,
          qiandanIDs: val,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.datasp = res.obj;
            this.datasp.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "_checked", false);
              this.$set(items, "_tuinum", items.BuySum);
              this.$set(items, "_tuijine", items.SumMoney);
            });
          }
        });
    },
    /**获取杂费信息 */
    getzfList(val) {
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/getZafeiDetail", {
          stuID: this.addtuifeiForm.stuID,
          qiandanIDs: val,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.datazf = res.obj;
            this.datazf.forEach((items) => {
              //取消所有对象的勾选，_checked设置为false
              this.$set(items, "_checked", false);
              this.$set(items, "_tuijine", items.onePrice);
            });
          }
        });
    },

    getTuifei(val) {
      /**获取退费信息 */
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/getTuifeiDetail", {
          stuID: this.addtuifeiForm.stuID,
          qiandanIDs: val,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res.obj);
            this.kechengMoney = res.obj.kecheng.jiaona;
            this.kehaoMoney = res.obj.kecheng.xiaohao;
            this.getsongMoney = res.obj.kecheng.jieshou;
            this.zhuansongMoney = res.obj.kecheng.zhuansong;
            this.rechargemoney = res.obj.chongzhi.jiaofei;
            this.rechargeSongMoney = res.obj.chongzhi.czZsong;
            this.moneyPay = res.obj.chongzhi.xiaohao;
            this.remainrechargeMoney = res.obj.chongzhi.yuFee;
            this.goodsMoney = res.obj.shangpin;
            this.zaMoney = res.obj.zafei;
            this.daijinquan = res.obj.daijinquan;
            this.youhuiMoney = res.obj.youhui;
            this.rechargeMoney = res.obj.heji;
          }
        });
    },

    /**获取学员费用信息 */
    getstuMessage() {
      this.Showmessage = true;
      this.allQiandan = [];
      this.changekc();
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/getStuqiandan", {
          stuID: this.addtuifeiForm.stuID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allQiandan = res.obj;
          }
        });
      this.getTuifei("");
    },

    /**获取全部学员 */
    getallstuList() {
      api
        .get("/xwcloud-caiwu/caiwu/pxtuifeitable/getallstu", { menuID: 564 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allStu = res.obj;
          }
        });
    },
    /**获取全部支付方式 */
    getallpaystyle() {
      api.get("/xwcloud-caiwu/caiwu/pxtuifeitable/getpaystyle", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allPaystyle = res.obj;
        }
      });
    },
    /**获取所有在职员工 */
    getallStaffList() {
      api.get("/xwcloud-caiwu/caiwu/pxtuifeitable/getallStaff", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStaff = res.obj;
        }
      });
    },

    /**退费按钮事件集 */
    /**选择课程退费 */
    tuicheckKc(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.checkkc = [];

          let nomoredingjin = false;

          this.datakc.forEach((items) => {
            if (items._checked == true) {
              console.log(items);

              if (
                (items.isdingjing == 3 || items.isdingjing == 4) &&
                items.shishouTotalMoney < items._tuijine
              ) {
                nomoredingjin = true;
              }
              this.checkkc.push({
                id: items.id,
                tuikeshi: items._tuikeshi,
                tuimoney: items._tuijine,
              });
            }
          });
          if (this.checkkc.length == 0) {
            this.$Message.error("请选择要退费的数据");
          } else {
            if (nomoredingjin) {
              this.$Message.error("定金报名的课程的【要退费金额】不可大于【实际金额】");
              return;
            } else {
              let list = [];
              this.addtuifeiForm.processingTime = toolbox.dateFtt(
                this.addtuifeiForm.processingTime,
                "yyyy-MM-dd hh:mm"
              );
              list.push(this.addtuifeiForm);

              this.tuikc.xadata = JSON.stringify(this.checkkc);
              this.tuikc.tuimessage = JSON.stringify(list);
              this.tuikc.qiandanids = this.qiandanIDs;
              api
                .post("/xwcloud-caiwu/caiwu/pxtuifeitable/Partxuefeioffbufen", this.tuikc)
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success({
                      top: 50,
                      duration: 5,
                      content: res.msg,
                    });
                    this.$refs[name].resetFields();
                    this.getTuifei(this.qiandanIDs);
                    this.getkcList(this.qiandanIDs);
                    this.qdList = [];
                  } else {
                    this.$Message.error("保存失败");
                  }
                });
            }
          }
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    /**全部课程退费 */
    tuiallKc(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Modal.confirm({
            title: "全部课程退费",
            width: 40,
            closable: true,
            render: (h) => {
              let create = this.$createElement;
              let dom = create("Input", {
                ref: "tagInputkc",
                props: {
                  value: this.kechengMoney,
                  autofocus: true,
                  placeholder: "请输入退费金额",
                  type: "number",
                },
                on: {
                  input: (val) => {
                    this.tuiallkcmoney = val;
                  },
                  "on-focus": (event) => {
                    this.tuiallkcmoney = event.target.value;
                  },
                },
              });
              return h("span", [
                h(
                  "p",
                  {
                    style: { color: "red" },
                  },
                  "将退费所有的课程，非全部课程退费，请到选择退费操作。"
                ),
                h("p", "剩余的所有课程学费总和为：" + this.kechengMoney),
                dom,
              ]);
            },
            onOk: () => {
              this.$refs["tagInputkc"].focus(); //设置焦点-触发聚焦事件获取默认值(不输入直接保存时)
              api
                .post("/xwcloud-caiwu/caiwu/pxtuifeitable/Allxuefeioff", {
                  stuID: this.addtuifeiForm.stuID,
                  payStyleID: this.addtuifeiForm.payStyleID,
                  yejirenID: this.addtuifeiForm.yejirenID,
                  processingTime: toolbox.dateFtt(
                    this.addtuifeiForm.processingTime,
                    "yyyy-MM-dd hh:mm"
                  ),
                  shuoming: this.addtuifeiForm.shuoming,
                  tuiallkcmoney: this.tuiallkcmoney,
                  qiandanIDs: this.qiandanIDs,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success({
                      top: 50,
                      duration: 5,
                      content: res.msg,
                    });
                    this.$refs[name].resetFields();
                    this.qdList = [];
                    this.getTuifei(this.qiandanIDs);
                    this.getkcList(this.qiandanIDs);
                  } else {
                    this.$Message.error("保存失败");
                  }
                });
            },
            onCancel: () => {},
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    /**
     * 选择商品退费
     */
    tuicheckSp(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.checksp = [];
          this.datasp.forEach((items) => {
            if (items._checked == true) {
              this.checksp.push({
                id: items.id,
                tuinum: items._tuinum,
                tuimoney: items._tuijine,
              });
            }
          });
          if (this.checksp.length == 0) {
            this.$Message.error("请选择要退费的数据");
          } else {
            let list = [];
            this.addtuifeiForm.processingTime = toolbox.dateFtt(
              this.addtuifeiForm.processingTime,
              "yyyy-MM-dd hh:mm"
            );
            list.push(this.addtuifeiForm);
            this.tuisp.xadata = JSON.stringify(this.checksp);
            this.tuisp.tuimessage = JSON.stringify(list);
            this.tuisp.qiandanids = this.qiandanIDs;
            api
              .post("/xwcloud-caiwu/caiwu/pxtuifeitable/PartWuPingTuiFei", this.tuisp)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success({
                    top: 50,
                    duration: 5,
                    content: res.msg,
                  });
                  this.$refs[name].resetFields();
                  this.getTuifei(this.qiandanIDs);
                  this.getspList(this.qiandanIDs);
                  this.qdList = [];
                } else {
                  this.$Message.error("保存失败");
                }
              });
          }
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    /**全部商品退费 */
    tuiallSp(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Modal.confirm({
            title: "全部教学用品退费",
            width: 40,
            closable: true,
            render: (h) => {
              let create = this.$createElement;
              let dom = create("Input", {
                ref: "tagInputsp",
                props: {
                  value: this.goodsMoney,
                  autofocus: true,
                  placeholder: "请输入退费金额",
                  type: "number",
                },
                on: {
                  input: (val) => {
                    this.tuiallspmoney = val;
                  },
                  "on-focus": (event) => {
                    this.tuiallspmoney = event.target.value;
                  },
                },
              });
              return h("span", [
                h(
                  "p",
                  {
                    style: { color: "red" },
                  },
                  "将退费所有的教学用品，非全部教学用品退费，请到选择退费操作。"
                ),
                h("p", "剩余的所有教学用品费用总和为：" + this.goodsMoney),
                dom,
              ]);
            },
            onOk: () => {
              this.$refs["tagInputsp"].focus(); //设置焦点-触发聚焦事件获取默认值(不输入直接保存时)
              console.log(this.tuiallspmoney);
              api
                .post("/xwcloud-caiwu/caiwu/pxtuifeitable/allPartWuPingTuiFei", {
                  stuID: this.addtuifeiForm.stuID,
                  payStyleID: this.addtuifeiForm.payStyleID,
                  yejirenID: this.addtuifeiForm.yejirenID,
                  processingTime: toolbox.dateFtt(
                    this.addtuifeiForm.processingTime,
                    "yyyy-MM-dd hh:mm"
                  ),
                  shuoming: this.addtuifeiForm.shuoming,
                  tuiallspmoney: this.tuiallspmoney,
                  qiandanIDs: this.qiandanIDs,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success({
                      top: 50,
                      duration: 5,
                      content: res.msg,
                    });
                    this.$refs[name].resetFields();
                    this.qdList = [];
                    this.getTuifei(this.qiandanIDs);
                    this.getspList(this.qiandanIDs);
                  } else {
                    this.$Message.error("保存失败");
                  }
                });
            },
            onCancel: () => {},
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    /**选择杂费退费 */
    tuicheckzf(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.checkzf = [];
          this.datazf.forEach((items) => {
            if (items._checked == true) {
              this.checkzf.push({
                id: items.id,
                tuimoney: items._tuijine,
              });
            }
          });
          if (this.checkzf.length == 0) {
            this.$Message.error("请选择要退费的数据");
          } else {
            let list = [];
            this.addtuifeiForm.processingTime = toolbox.dateFtt(
              this.addtuifeiForm.processingTime,
              "yyyy-MM-dd hh:mm"
            );
            list.push(this.addtuifeiForm);
            this.tuizf.xadata = JSON.stringify(this.checkzf);
            this.tuizf.tuimessage = JSON.stringify(list);
            this.tuizf.qiandanids = this.qiandanIDs;
            api
              .post("/xwcloud-caiwu/caiwu/pxtuifeitable/PartOtherTuiFei", this.tuizf)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success({
                    top: 50,
                    duration: 5,
                    content: res.msg,
                  });
                  this.$refs[name].resetFields();
                  this.qdList = [];
                  this.getTuifei(this.qiandanIDs);
                  this.getzfList(this.qiandanIDs);
                } else {
                  this.$Message.error("保存失败");
                }
              });
          }
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    /**全部杂费退费 */
    tuiallzf(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Modal.confirm({
            title: "全课学杂退费",
            width: 40,
            closable: true,
            render: (h) => {
              let create = this.$createElement;
              let dom = create("Input", {
                ref: "tagInput",
                props: {
                  value: this.zaMoney,
                  autofocus: true,
                  placeholder: "请输入退费金额",
                  type: "number",
                },
                on: {
                  input: (val) => {
                    this.tuiallzfmoney = val;
                  },
                  "on-focus": (event) => {
                    this.tuiallzfmoney = event.target.value;
                  },
                },
              });
              return h("span", [
                h(
                  "p",
                  {
                    style: { color: "red" },
                  },
                  "将退费所有的学杂费，非全部学杂费退费，请到选择退费操作。"
                ),
                h("p", "剩余的所有学杂费用总和为：" + this.zaMoney),
                dom,
              ]);
            },
            onOk: () => {
              this.$refs["tagInput"].focus(); //设置焦点-触发聚焦事件获取默认值(不输入直接保存时)
              console.log(this.tuiallzfmoney);
              api
                .post("/xwcloud-caiwu/caiwu/pxtuifeitable/allOtherTuiFei", {
                  stuID: this.addtuifeiForm.stuID,
                  payStyleID: this.addtuifeiForm.payStyleID,
                  yejirenID: this.addtuifeiForm.yejirenID,
                  processingTime: toolbox.dateFtt(
                    this.addtuifeiForm.processingTime,
                    "yyyy-MM-dd hh:mm"
                  ),
                  shuoming: this.addtuifeiForm.shuoming,
                  tuiallzfmoney: this.tuiallzfmoney,
                  qiandanIDs: this.qiandanIDs,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success({
                      top: 50,
                      duration: 5,
                      content: res.msg,
                    });
                    this.$refs[name].resetFields();
                    this.qdList = [];
                    this.getTuifei(this.qiandanIDs);
                    this.getzfList(this.qiandanIDs);
                  } else {
                    this.$Message.error("保存失败");
                  }
                });
            },
            onCancel: () => {},
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    /**全部退费 */
    tuiallMoney(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Modal.confirm({
            title: "全课退费",
            width: 40,
            closable: true,
            render: (h) => {
              let create = this.$createElement;
              let dom = create("Input", {
                ref: "tagallInput",
                props: {
                  value: this.rechargeMoney,
                  autofocus: true,
                  placeholder: "请输入退费金额",
                  type: "number",
                },
                on: {
                  input: (val) => {
                    this.tuiallmoney = val;
                  },
                  "on-focus": (event) => {
                    this.tuiallmoney = event.target.value;
                  },
                },
              });
              return h("span", [
                h(
                  "p",
                  {
                    style: { color: "red" },
                  },
                  "将退费所有的费用，非全部退费，请到对应模块操作。"
                ),
                h("p", "剩余的所有费用总和为：" + this.rechargeMoney),
                dom,
              ]);
            },
            onOk: () => {
              this.$refs["tagallInput"].focus(); //设置焦点-触发聚焦事件获取默认值(不输入直接保存时)
              console.log(this.tuiallmoney);
              api
                .post("/xwcloud-caiwu/caiwu/pxtuifeitable/Alloff", {
                  stuID: this.addtuifeiForm.stuID,
                  payStyleID: this.addtuifeiForm.payStyleID,
                  yejirenID: this.addtuifeiForm.yejirenID,
                  processingTime: toolbox.dateFtt(
                    this.addtuifeiForm.processingTime,
                    "yyyy-MM-dd hh:mm"
                  ),
                  shuoming: this.addtuifeiForm.shuoming,
                  tuiallmoney: this.tuiallmoney,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    his.$Message.success({
                      top: 50,
                      duration: 5,
                      content: res.msg,
                    });
                    this.$refs[name].resetFields();
                    this.qdList = [];
                    this.getTuifei(this.qiandanIDs);
                  } else {
                    this.$Message.error("保存失败");
                  }
                });
            },
            onCancel: () => {},
          });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.getallstuList();
    this.getallpaystyle();
    this.getallStaffList();
  },
};
</script>
