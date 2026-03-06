<template>
  <Modal
    v-model="show"
    title="学员详情"
    @on-ok="ok"
    :mask-closable="true"
    width="70"
    @on-cancel="closeModal(false)"
    :styles="{ top: '20px' }"
  >
    <div class="demo-split" v-if="haveInfo">
      <Split v-model="split1" min="700px">
        <div slot="left" class="demo-split-pane no-padding">
          <Split v-model="split2" mode="vertical" min="500px">
            <div slot="top" class="demo-split-pane">
              <Row>
                <Col span="20" style="text-align: right">
                  <Content :style="{ background: '#fff' }">
                    <Row>
                      <Col span="2" class="lab-a">
                        <Radio v-model="single">学员基本信息</Radio>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>系统学号:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.id }}&nbsp;</label>
                      </Col>
                      <Col span="3" class="lab-a">
                        <label>自定义学号:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.zidingyiStuID }}&nbsp;</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>学员姓名:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.stuName }}&nbsp;</label>
                      </Col>
                      <Col span="3" class="lab-a">
                        <label>联系电话:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.parentTel }}&nbsp;</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>联系人关系:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ parent }}&nbsp;</label>
                      </Col>
                      <Col span="3" class="lab-a">
                        <label>学员电话:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.stuTel }}&nbsp;</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>学员校区:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.campusName }}&nbsp;</label>
                      </Col>
                      <Col span="3" class="lab-a">
                        <label>年级:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.stuGradeName }}&nbsp;</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>学员生日:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ birth }}&nbsp;</label>
                      </Col>
                      <Col span="3" class="lab-a">
                        <label>年龄:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.nianling }} 岁</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>性别:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.stuSex }}&nbsp;</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>原就读学校:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.oldSchoolName }}&nbsp;</label>
                      </Col>
                      <Col span="3" class="lab-a">
                        <label>合作老师:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.oldSchoolTeacherName }}&nbsp;</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>学员状态:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ buxistate }}&nbsp;</label>
                      </Col>
                      <Col span="3" class="lab-a">
                        <label>是否转介绍:</label>
                      </Col>
                      <Col span="8" class="lab-b">
                        <label>{{ data.zhuanjieshao }}&nbsp;</label>
                      </Col>
                    </Row>
                    <Row class="row">
                      <Col span="3" class="lab-a">
                        <label>备注:</label>
                      </Col>
                      <Col span="16" class="lab-b">
                        <Input
                          v-model="data.stuXuexi"
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 3 }"
                        />
                      </Col>
                    </Row>
                  </Content>
                </Col>
                <Col span="4" style="text-align: left">
                  <Avatar
                    class="ava"
                    v-model="data.stuPhoto"
                    src="https://i.loli.net/2017/08/21/599a521472424.jpg"
                  />
                </Col>
              </Row>
            </div>
            <div slot="bottom" class="demo-split-pane">
              <Collapse v-model="value1" simple>
                <Panel name="1">
                  学员高级资料
                  <div slot="content">
                    <Row class="row">
                      <Col span="2" class="lab-a">
                        <label>剩余学费:</label>
                      </Col>
                      <Col span="5" class="lab-b">
                        <label>￥&nbsp;{{ data.remainXuefei }}</label>
                      </Col>
                      <Col span="2" class="lab-a">
                        <label>充值剩余:</label>
                      </Col>
                      <Col span="5" class="lab-b">
                        <label>￥&nbsp;{{ data.remainChongzhi }}</label>
                      </Col>
                      <Col span="2" class="lab-a">
                        <label>积分数:</label>
                      </Col>
                      <Col span="5" class="lab-b">
                        <label>&nbsp;{{ data.jifenNum }} 积分</label>
                      </Col>
                    </Row>
                  </div>
                </Panel>

                <Panel name="2">
                  自定义字段
                  <div slot="content">
                    <Card class="allparam">
                      <span v-for="item in allstuParam" :value="item.id" :key="item.id">
                        <div class="stuparam">
                          <label v-if="item.isBiTian == false"
                            >{{ item.stuParamTypeName }}:</label
                          >
                          <label v-if="item.isBiTian == true">
                            <font style="color: red">*</font>
                            {{ item.stuParamTypeName }}:
                          </label>
                          <span v-if="item.widthType == 0 || item.widthType == null">
                            <Input v-model="item.pvalue" style="width: 200px" readonly />
                          </span>
                          <span v-if="item.widthType == 1">
                            <Input v-model="item.pvalue" style="width: 400px" readonly />
                          </span>
                          <span v-if="item.widthType == 2">
                            <Select v-model="item.pvalue" style="width: 200px" disabled>
                              <Option
                                v-for="item2 in selectValue[item.pid]"
                                :value="item2.id"
                                :key="item2.id"
                                >{{ item2.name }}</Option
                              >
                            </Select>
                          </span>
                        </div>
                      </span>
                    </Card>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </Split>
        </div>
        <div slot="right" class="demo-split-pane">
          <Row class="row">
            <Col span="6" offset="1" @click.native="toqiandanInfo">
              <Row>
                <Col span="24" class="lab-c">
                  <div>
                    <Icon
                      custom="iconfont icon-jiaofeiguanli"
                      size="40"
                      color="red"
                    ></Icon>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="lab-c">
                  <label>交费信息</label>
                </Col>
              </Row>
            </Col>
            <Col span="6" offset="2" @click.native="toskInfo">
              <Row>
                <Col span="24" class="lab-c">
                  <div>
                    <Icon custom="iconfont icon-icon" size="40" color="blue"></Icon>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="lab-c">上课详情</Col>
              </Row>
            </Col>
            <Col span="6" offset="2" @click.native="lookkebiao">
              <Row>
                <Col span="24" class="lab-c">
                  <div>
                    <Icon
                      custom="iconfont icon-kebiaoxinxi"
                      size="40"
                      color="green"
                    ></Icon>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="lab-c">课表</Col>
              </Row>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6" offset="1" @click.native="tokehao">
              <Row>
                <Col span="24" class="lab-c">
                  <div>
                    <Icon custom="iconfont icon-jilu4" size="40" color="skyblue"></Icon>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="lab-c">课耗详情</Col>
              </Row>
            </Col>
            <Col span="6" offset="2" @click.native="todaijinquan">
              <Row>
                <Col span="24" class="lab-c">
                  <div>
                    <Icon
                      custom="iconfont icon-daijinquan"
                      size="40"
                      color="brown"
                    ></Icon>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="lab-c">代金券</Col>
              </Row>
            </Col>
            <Col span="6" offset="2" @click.native="tojifen">
              <Row>
                <Col span="24" class="lab-c">
                  <div>
                    <Icon custom="iconfont icon-jifen" size="40" color="orange"></Icon>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="lab-c">积分详情</Col>
              </Row>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6" offset="1" @click.native="toqiandanmessage">
              <Row>
                <Col span="24" class="lab-c">
                  <div>
                    <Icon custom="iconfont icon-qiandanxuqiu" size="40"></Icon>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span="24" class="lab-c">签单信息</Col>
              </Row>
            </Col>
          </Row>
          <stuIntegerInfo
            v-model="IntegarInfoShow"
            :stuID="params.stuID"
          ></stuIntegerInfo>
          <studaijinquanInfo
            v-model="daijinquanInfoShow"
            :stuID="params.stuID"
          ></studaijinquanInfo>
          <stukehaoInfo v-model="kehaoInfoShow" :stuID="params.stuID"></stukehaoInfo>
          <stuSkInfo v-model="sKINfoShow" :stuID="params.stuID"></stuSkInfo>
          <stuqiandan v-model="qiandanInfoShow" :stuID="params.stuID"></stuqiandan>
          <stuInfokebiao v-model="kebiaoShow" :events="events"></stuInfokebiao>
        </div>
      </Split>
    </div>
  </Modal>
</template>
<style>
@import url("../../../assets/icon_custom/iconfont.css");
@import url("../../../assets/icon_qiandan/iconfont.css");

.demo-split {
  height: 80vh;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
.demo-split-pane.no-padding {
  height: 80vh;
  padding: 0;
}
.row {
  margin-top: 5px;
}
.lab-a {
  text-align: left;
  line-height: 32px;
  margin-left: 20px;
  /* font-family: 黑体;
  font-weight: bolder; */
}
.lab-b {
  text-align: left;
  line-height: 32px;
  font-family: 黑体;
  font-weight: bolder;
}
.lab-c {
  text-align: center;
  line-height: 32px;
  font-family: 黑体;
  font-weight: bolder;
}
.ava {
  margin-top: 30px;
  width: 120px;
  height: 120px;
}
.stuparam {
  margin: 5px 20px;
  line-height: 30px;
  float: left;
}
.allparam {
  width: 100%;
  height: 300px;
  max-height: 300px;
  text-align: left;
}
</style>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import stuIntegerInfo from "@/components/jiaowuManage/stuManage/stuIntegerInfo";
import studaijinquanInfo from "@/components/jiaowuManage/stuManage/studaijinquanInfo";
import stukehaoInfo from "@/components/jiaowuManage/stuManage/stukehaoInfo";
import stuSkInfo from "@/components/jiaowuManage/stuManage/stuSkInfo";
import stuqiandan from "@/components/jiaowuManage/stuManage/stuqiandan";
import stuInfokebiao from "@/components/jiaowuManage/stuManage/stuInfokebiao";

export default {
  name: "stuInfo",
  components: {
    stuIntegerInfo,
    studaijinquanInfo,
    stukehaoInfo,
    stuSkInfo,
    stuqiandan,
    stuInfokebiao,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
  },
  data() {
    return {
      events: [],
      nianyue: new Date(),
      kebiaoShow: false,
      value1: "1",
      split1: 0.7, //左右比例
      split2: 0.7, //上下比例
      single: true,
      show: this.value,
      loading: true,
      haveInfo: false,
      birth: "",
      buxistate: "",
      parent: "",
      data: [], // 接口数据接收
      data2: [],
      allstuParam: [],
      allstuValue: [],
      selectValue: [],
      va: "",
      vb: "",
      //----------------------------------------------
      IntegarInfoShow: false,
      daijinquanInfoShow: false,
      kehaoInfoShow: false,
      sKINfoShow: false,
      qiandanInfoShow: false,
      //----------------------------------------------
      parentTelRelationList: [
        { id: "1", name: "本人" },
        { id: "2", name: "爸爸" },
        { id: "3", name: "妈妈" },
        { id: "4", name: "爷爷" },
        { id: "5", name: "奶奶" },
        { id: "6", name: "外公" },
        { id: "7", name: "外婆" },
        { id: "8", name: "保姆" },
        { id: "9", name: "其他" },
      ],
      stuStyle: [
        { id: 1, name: "意向(试听)" },
        { id: 2, name: "在读" },
        { id: 3, name: "停课" },
        { id: 4, name: "结课" },
        { id: 5, name: "退费" },
        { id: 6, name: "休眠" },
      ],
      params: {
        current: 1,
        size: 10,
        stuID: "",
      },

      columns6: [
        {
          title: "科目",
          key: "subjectName",
          align: "center",
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "单价",
          key: "kechengPrice",
          align: "center",
          width: 250,
        },
        {
          title: "课时数",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "消耗学费",
          key: "payxuefei",
          align: "center",
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      "getkehaoInfoPage",
      "getstuInfoPage",
      "getstuInfoqiandan",
      "Getstuparamtype",
      "Getselectparamvalue",
      "getstukebiaoList",
    ]),

    getstuInfo() {
      this.getstuInfoPage(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj[0];
          if (res.obj[0].stubirth != null && res.obj[0].stubirth != "") {
            this.birth = toolbox.dateFtt(res.obj[0].stubirth, "yyyy-MM-dd");
          }
          this.stuStyle.forEach((item) => {
            if (Number(res.obj[0].buxiStateID == item.id)) {
              this.buxistate = item.name;
            }
          });

          this.parentTelRelationList.forEach((item) => {
            if (Number(res.obj[0].parentTelRelation == item.id)) {
              this.parent = item.name;
            }
          });
          console.log(res);
          this.haveInfo = true;
        }
      });
    },

    getstuInfoqiandanList() {
      this.getstuInfoqiandan({ stuID: this.params.stuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data2 = res.obj[0];
          console.log(res);
        }
      });
    },

    GetstuparamtypeList() {
      this.Getstuparamtype({ stuID: this.stuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstuParam = res.obj;
          let i = 0;

          this.allstuParam.forEach((itema) => {
            if (itema.widthType == 2) {
              this.Getselectparamvalue({
                stuParamTypeId: itema.id,
              }).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.selectValue.push(res.obj);
                  itema.pid = i;
                  i++;
                }
              });
            }
          });
        }
      });
    },

    ok() {
      this.$emit("input", val);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getstuInfo();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getstuInfo();
    },
    tojifen() {
      this.IntegarInfoShow = true;
    },
    todaijinquan() {
      this.daijinquanInfoShow = true;
    },
    tokehao() {
      this.kehaoInfoShow = true;
    },
    toskInfo() {
      this.sKINfoShow = true;
    },
    toqiandanInfo() {
      console.log("info:" + this.params.stuID);
      this.qiandanInfoShow = true;
    },

    lookkebiao() {
      this.kebiaoShow = true;
    },
    toqiandanmessage() {
      this.$Modal.success({
        closable: true,
        width: 50,
        render: (h) => {
          let style = {};
          style.style = {
            fontWeight: "bolder",
            lineHeight: "32px",
            fontFamily: "黑体",
          };
          return h("div", [
            h("Row", [h("Col", { props: { span: 20 } }, [h("p", "签单信息")])]),
            [
              h("Divider", {
                style: { margin: "10px 0px 20px 0px" },
              }),
            ],
            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
              h("Col", { props: { span: 2 } }, [h("label", style, "签单数:")]),
              h("Col", { props: { span: 5 } }, [
                h("label", style, "该学员共计" + this.data2.qiandanNum + "条签单"),
              ]),
              h("Col", { props: { span: 2, offset: 1 } }, [h("label", style, "录入人:")]),
              h("Col", { props: { span: 5 } }, [
                h("label", style, this.data.dengjiTeachers + "(指录入学员的人)"),
              ]),

              h("Col", { props: { span: 2, offset: 1 } }, [
                h("label", style, "录入时间:"),
              ]),
              h("Col", { props: { span: 5 } }, [h("label", style, this.data.dengjiTime)]),
            ]),

            h("Row", { style: { margin: "5px 0px 10px 0px" } }, [
              h("Col", { props: { span: 2 } }, [h("label", style, "业绩人:")]),
              h("Col", { props: { span: 5 } }, [h("label", style, this.data2.yejistaff)]),

              h("Col", { props: { span: 2, offset: 1 } }, [
                h("label", style, "支付方式:"),
              ]),
              h("Col", { props: { span: 5 } }, [h("label", style, this.data2.yejitype)]),
            ]),

            h("Row", { margin: "5px 0px 10px 0px" }, [
              h("Col", { props: { span: 2 } }, [h("label", style, "签单金额:")]),
              h("Col", { props: { span: 5 } }, [
                h("label", style, this.data2.allhtmoney),
              ]),
              h("Col", { props: { span: 2, offset: 1 } }, [
                h("label", style, "实收金额:"),
              ]),
              h("Col", { props: { span: 5 } }, [h("label", style, this.data2.allyeji)]),

              h("Col", { props: { span: 2, offset: 1 } }, [
                h("label", style, "优惠金额:"),
              ]),
              h("Col", { props: { span: 5 } }, [h("label", style, this.data2.allyouhui)]),
            ]),
          ]);
        },
      });
    },

    init() {
      this.events = [];
      this.getstukebiaoList({
        stuID: this.stuID,
        yearMouth: toolbox.dateFtt(this.nianyue, "yyyy-MM-dd"),
      })
        .then((result) => {
          if (result.code == "Y" && result.success == true) {
            result.obj.forEach((element) => {
              this.events.push({
                title:
                  element.subjectName +
                  "&" +
                  element.classRoomName +
                  "&" +
                  element.xkstuName,
                start:
                  toolbox.dateFtt(element.haveClassDate, "yyyy-MM-dd") +
                  "T" +
                  element.startLessonDateTime,
                end:
                  toolbox.dateFtt(element.haveClassDate, "yyyy-MM-dd") +
                  "T" +
                  element.endLessonDateTime,
                startLessonDateTime: element.startLessonDateTime,
                endLessonDateTime: element.endLessonDateTime,
                color: element.bgColor,
                id: element.id,
              });
            });
            // callback(events);
          }
        })
        .catch((err) => {
          console.log(err);
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
        this.params.stuID = this.stuID;

        this.GetstuparamtypeList();
        this.getstuInfo();
        this.getstuInfoqiandanList();
        this.init();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
<style>
/* //用什么插件必须引入相应的样式表，否则不能正常显示 */
@import "@fullcalendar/core/main.css";
@import "@fullcalendar/daygrid/main.css";
@import "@fullcalendar/timegrid/main.css";
</style>
