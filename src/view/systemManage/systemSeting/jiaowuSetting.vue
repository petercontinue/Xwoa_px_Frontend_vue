<template>
  <div>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >积分比例设置：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('72')"
          >查看/设置</Button
        >学员消课获得积分的比例， 消耗一课时可以兑换的积分数
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >续费预警：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('11')"
          >查看/设置</Button
        >按课时计费的即按剩余课时数预警；按起止日期计费的即按剩余天数预警；预警的方式:消课的时候会给学员（家长）发送的消息中提醒续费
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >课耗录入/消课限制（天）</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('41')"
          >查看/设置</Button
        >是指多少天以前的课耗不能再录入了；这个功能是为了防止无意的错录或恶意错录；必须当天录入请设置1；
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >课前请假/撤消请假小时数限制：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="settingqjTimes"
          >查看/设置</Button
        >是指课前几小时内可以请假或可以撤消请假
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >课前约课/撤消约课小时数限制：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="settingykTimes"
          >查看/设置</Button
        >是指课前几小时内可以加入约课或撤消约课
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >前一天推送上课提醒时间：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('15')"
          >查看/设置</Button
        >是指排课以后，上课前一天自动微信提醒学员和老师，指的是前一天的几点钟进行消息推送（注意:只有完成了微信绑定的才能收到微信消息）
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >是否只能在开始和结束日期之间消课：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('61')"
          >查看/设置</Button
        >是指学员报名课程的时候设置了开始日期和结束日期，是不是只能在报名时设定的这个日期范围内消课，是不是过期了就不能再消课了
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >学员课时是否可以扣减为负数：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('63')"
          >查看/设置</Button
        >是指学员的剩余课时是否允许扣减为负数；也就是学员的课时上完了以后，是否还可以继续消课
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >到期后的剩余课时是否自动清零：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('62')"
          >查看/设置</Button
        >是指学员课程的结束日期到了以后，学员该课程的剩余课时是否要自动清零
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >（学员成绩）考试类别：</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotokaoshileibie()"
          >查看/设置</Button
        >例如：期中考试，期末考试，单元测试，市统测，省统测……
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >学生课后评价消息推送给谁:</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="showShezhi('14')"
          >查看/设置</Button
        >是指学生课后对老师的课堂评价信息推送给谁，是推送给老师本人？推送给班主任/学管师？还是推送给谁？可按岗位多选
      </Col>
    </Row>
    <Row style="margin: 15px">
      <Col span="6" style="text-align: right; padding-right: 5px"
        >设置点评项目:</Col
      >
      <Col span="18" style="text-align: left">
        <Button
          type="primary"
          icon="md-settings"
          size="small"
          @click="gotoTeaRate()"
          >查看/设置</Button
        >设置可以对哪些方面进行点评。这里设置以后，老师在编辑点评的时候，就可以对这些项目进行评分。
      </Col>
    </Row>

    <jiaowusetting-form
      v-model="showUpdate"
      :shezhiID="typeID"
    ></jiaowusetting-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import jiaowusettingForm from "../../../components/systemSetting/jiaowusetting/jiaowusettingForm";

export default {
  components: {
    jiaowusettingForm,
  },
  data() {
    return {
      showUpdate: false,
      typeID: "",
      ykTime: "",
      qjTime: "",
    };
  },
  methods: {
    ...mapActions(["getjigouqjandykTimes", "editTimexianzhi"]),

    showShezhi(type) {
      this.typeID = type;
      this.showUpdate = true;
    },
    gotokaoshileibie() {
      this.$router.push({
        path: "/kaoshileibie",
        query: {},
      });
    },

    gotoTeaRate() {
      this.$router.push({
        path: "/teaRate",
        query: {},
      });
    },
    //设置请假/撤消请假的小时数限制
    settingqjTimes() {
      this.$Modal.confirm({
        width: 35,
        closable: true,
        render: (h) => {
          let create = this.$createElement;
          let dom = create("Input", {
            ref: "tagInput",
            props: {
              value: this.qjTime,
              autofocus: true,
              placeholder: "请输入请假、撤销请假时间限制",
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
            h("Row", [
              h("Col", { props: { span: 20 } }, [
                h("p", "修改请假、撤销请假时间限制"),
              ]),
            ]),
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
                    span: 9,
                  },
                },
                [
                  h(
                    "p",
                    {
                      style: { margin: "10px", textAlign: "right" },
                    },
                    "课前请假/撤消请假限制小时数："
                  ),
                ]
              ),
              h(
                "Col",
                {
                  props: {
                    span: 8,
                  },
                },
                [dom]
              ),
            ]),
          ]);
        },
        onOk: () => {
          this.$refs["tagInput"].focus();
          console.log(this.value);
          this.qjTime = this.value;
          this.editTimexianzhi({
            type: Number(64),
            times: this.qjTime,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getqjykshijianxianzhi();
              this.value = "";
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {},
      });
    },
    //设置约课/撤消约课的小时数限制
    settingykTimes() {
      this.$Modal.confirm({
        width: 35,
        closable: true,
        render: (h) => {
          let create = this.$createElement;
          let dom = create("Input", {
            ref: "tagInput",
            props: {
              value: this.ykTime,
              autofocus: true,
              placeholder: "请输入撤销约课时间限制",
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
            //标题
            h("Row", [
              h("Col", { props: { span: 20 } }, [
                h("p", "修改撤销约课时间限制"),
              ]),
            ]),
            //分隔线
            [
              h("Divider", {
                style: { margin: "10px 0px 20px 0px" },
              }),
            ],
            //表单内容
            h("Row", [
              h(
                "Col",
                {
                  props: {
                    span: 10,
                  },
                },
                [
                  h(
                    "p",
                    {
                      style: { margin: "10px", textAlign: "right" },
                    },
                    "课前加入约课/撤消约课小时数限制："
                  ),
                ]
              ),
              h(
                "Col",
                {
                  props: {
                    span: 8,
                  },
                },
                [dom]
              ),
            ]),
          ]);
        },
        onOk: () => {
          this.$refs["tagInput"].focus();
          console.log(this.value);
          this.ykTime = this.value;
          this.editTimexianzhi({
            type: Number(65),
            times: this.ykTime,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getqjykshijianxianzhi();
              this.value = "";
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {},
      });
    },

    getqjykshijianxianzhi() {
      this.getjigouqjandykTimes({}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.ykTime = res.obj.ykValue;
          this.qjTime = res.obj.qjValue;
        }
      });
    },
  },
  mounted: function () {
    this.getqjykshijianxianzhi();
  },
};
</script>
