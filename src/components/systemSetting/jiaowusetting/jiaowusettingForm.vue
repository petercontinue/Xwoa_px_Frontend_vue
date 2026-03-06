<template>
  <Modal
    v-model="show"
    :title="title"
    :loading="loading"
    :mask-closable="false"
    width="50"
  >
    <div v-if="title === '积分比例设置'">
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span
            >温馨提示：学员消课获得积分的比例，
            消耗一课时可以兑换的积分数,例:消耗1课时得1积分，则保存的值为1 。</span
          >
        </Col>
      </Alert>
    </div>

    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      v-if="jifenbilvShow"
      :label-width="100"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="获得积分" prop="jifenbilv">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.jifenbilv"
              placeholder="请输入积分比例"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm8"
      :model="shezhiForm8"
      :rules="shezhiFormRule8"
      v-if="xufeiShow"
      :label-width="100"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="变动类型" prop="keshitype">
            <Select v-model="shezhiForm8.keshitype">
              <Option v-for="item in keshichangetype" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="剩余课时" prop="remainkeshi">
            <Input
              type="number"
              v-model="shezhiForm8.remainkeshi"
              placeholder="请输入剩余课时"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="剩余天数" prop="remainday">
            <Input
              type="number"
              v-model="shezhiForm8.remainday"
              placeholder="请输入剩余天数"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm1"
      :model="shezhiForm1"
      :rules="shezhiForm1Rule"
      v-if="shuakaShow"
      :label-width="100"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="刷卡时间段" prop="shuakashijianduan">
            <Select
              v-model="shezhiForm1.shuakashijianduan"
              placeholder="请选择刷卡时间段"
              style="width: 100%"
            >
              <Option value="1">课前</Option>
              <Option value="2">课中</Option>
              <Option value="3">课后</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm2"
      :model="shezhiForm2"
      :rules="shezhiForm2Rule"
      v-if="xianzhidaysShow"
      :label-width="300"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="多少天以前的课耗不允许再录入" prop="xianzhidays">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm2.xianzhidays"
              placeholder="请输入天数"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm3"
      :model="shezhiForm3"
      :rules="shezhiForm3Rule"
      v-if="sktixingShow"
      :label-width="250"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="前一天推送上课提醒时间(时:分)" prop="sktixingTime">
            <TimePicker
              format="HH:mm"
              placeholder="请选择时间点"
              v-model="shezhiForm3.sktixingTime"
              style="width: 100%"
            ></TimePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm4"
      :model="shezhiForm4"
      :rules="shezhiForm4Rule"
      v-if="startendXiaokeShow"
      :label-width="300"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="是否只能在开始和结束日期之间消课" prop="startendXiaoke">
            <Select
              v-model="shezhiForm4.startendXiaoke"
              placeholder="请选择是否只能在开始和结束日期之间消课"
              style="width: 100%"
            >
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm5"
      :model="shezhiForm5"
      :rules="shezhiForm5Rule"
      v-if="keshiweifuShow"
      :label-width="250"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="学员课时是否可以扣减为负数" prop="keshiweifu">
            <Select
              v-model="shezhiForm5.keshiweifu"
              placeholder="请选择学员课时是否可以扣减为负数"
              style="width: 100%"
            >
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm6"
      :model="shezhiForm6"
      :rules="shezhiForm6Rule"
      v-if="pingjiatuisongShow"
      :label-width="250"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="学生课后评价消息推送员工(可多选)" prop="pingjiatuisong">
            <Select
              v-model="checktype"
              placeholder="学生课后评价消息推送员工(可多选)"
              style="width: 100%"
              multiple
              filterable
              @on-change="tuisongtype"
            >
              <Option value="-1">任课老师</Option>
              <Option value="-2">班主任</Option>
              <Option value="-3">指定推送人</Option>
            </Select>
          </FormItem>

          <FormItem v-if="tuiIstea" label="指定推送人">
            <Select
              v-model="checkstafflist"
              multiple
              filterable
              placeholder="请选择指定推送人"
              style="width: 100%"
              @on-change="checkstaff"
            >
              <Option v-for="item in allStaffList" :value="item.id" :key="item.id">{{
                item.staffName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm7"
      :model="shezhiForm7"
      :rules="shezhiForm7Rule"
      v-if="daoqiqinglinShow"
      :label-width="250"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="到期后的剩余课时是否自动清零" prop="daoqiqinglin">
            <Select
              v-model="shezhiForm7.daoqiqinglin"
              placeholder="到期后的剩余课时是否自动清零"
              style="width: 100%"
            >
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { update } from "countup";
import * as api from "@/api/api.js";

export default {
  name: "UpdateSysParamValue",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    shezhiID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        jifenbilv: "",
      },
      shezhiFormRule: {
        jifenbilv: [
          {
            required: true,
            message: "请输入积分比例",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm1: {
        shuakashijianduan: "",
      },
      shezhiForm1Rule: {
        shuakashijianduan: [
          {
            required: true,
            message: "请选择刷卡时间段",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm2: {
        xianzhidays: "",
      },
      shezhiForm2Rule: {
        xianzhidays: [
          {
            required: true,
            message: "请输入天数",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm3: {
        sktixingTime: "",
      },
      shezhiForm3Rule: {
        sktixingTime: [
          {
            required: true,
            message: "请选择时间点",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm4: {
        startendXiaoke: "",
      },
      shezhiForm4Rule: {
        startendXiaoke: [
          {
            required: true,
            message: "请选择是否只能在开始和结束日期之间消课",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm5: {
        keshiweifu: "",
      },
      shezhiForm5Rule: {
        keshiweifu: [
          {
            required: true,
            message: "请选择学员课时是否可以扣减为负数",
            trigger: "change",
            type: "string",
          },
        ],
      },

      checktype: [],
      allStaffList: [],
      checkstafflist: [],
      typelist: "",
      staffList: "",

      shezhiForm6: {
        pingjiatuisong: "",
      },
      shezhiForm6Rule: {
        pingjiatuisong: [
          {
            required: true,
            message: "学生课后评价消息推送员工(可多选)",
            trigger: "change",
          },
        ],
      },
      shezhiForm7: {
        daoqiqinglin: "",
      },
      shezhiForm7Rule: {
        daoqiqinglin: [
          {
            required: true,
            message: "到期后的剩余课时是否自动清零",
            trigger: "change",
            type: "string",
          },
        ],
      },
      title: "修改意向权限人",
      jifenbilvShow: false,
      shuakaShow: false,
      xianzhidaysShow: false,
      sktixingShow: false,
      startendXiaokeShow: false,
      keshiweifuShow: false,
      pingjiatuisongShow: false,
      daoqiqinglinShow: false,

      tuiIstea: false,

      xufeiShow: false,
      keshichangetype: [
        { id: "1", name: "总课时预警" },
        { id: "2", name: "单科课时预警" },
      ],
      shezhiForm8: {
        keshitype: "1", //课时预警方式 13
        remainkeshi: "", //11
        remainday: "", //12
      },
      shezhiFormRule8: {
        remainkeshi: [
          {
            required: true,
            message: "请输入剩余课时",
            trigger: "blur",
          },
        ],
        remainday: [
          {
            required: true,
            message: "请输入剩余天数",
            trigger: "blur",
          },
        ],
        keshitype: [{ required: true, message: "请选择课时预警类型", trigger: "change" }],
      },
    };
  },
  methods: {

    tuisongtype() {
      if (!this.tuiIstea) {
        this.checkstafflist = [];
      }

      this.tuiIstea = false;
      this.typelist = "";
      this.checktype.forEach((item) => {
        if (item == -3) {
          this.tuiIstea = true;
        } else {
          this.typelist += item + ",";
        }
      });
    },

    checkstaff() {
      this.staffList = "";
      if (this.tuiIstea) {
        this.checkstafflist.forEach((item) => {
          this.staffList += item + ",";
        });
      }
    },

    ok() {
      let name =
        this.shezhiID == "72"
          ? "shezhiForm"
          : this.shezhiID == "28"
          ? "shezhiForm1"
          : this.shezhiID == "41"
          ? "shezhiForm2"
          : this.shezhiID == "15"
          ? "shezhiForm3"
          : this.shezhiID == "61"
          ? "shezhiForm4"
          : this.shezhiID == "63"
          ? "shezhiForm5"
          : this.shezhiID == "62"
          ? "shezhiForm7"
          : this.shezhiID == "11"
          ? "shezhiForm8"
          : "shezhiForm6";

      console.log(name);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          if (this.shezhiID == "11") {
            let li = ["11", "12", "13"];
            li.forEach((item) => {
              let valueks =
                item == "11"
                  ? this.shezhiForm8.remainkeshi
                  : item == "12"
                  ? this.shezhiForm8.remainday
                  : this.shezhiForm8.keshitype;
              api
                .post("/xwcloud-sys/sys/SystemSetting/UpdateSysParamValue", {
                  id: item,
                  value: valueks,
                })
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    // 提交表单数据成功则关闭当前的modal框
                    this.closeModal(false);
                    // 同时调用父页面的刷新页面的方法
                    this.$emit("handleSearch");
                  } else {
                    this.$Message.error(res.msg);
                  }
                });
            });
          } else {
            let value =
              this.shezhiID == "72"
                ? this.shezhiForm.jifenbilv
                : this.shezhiID == "28"
                ? this.shezhiForm1.shuakashijianduan
                : this.shezhiID == "41"
                ? this.shezhiForm2.xianzhidays
                : this.shezhiID == "15"
                ? this.shezhiForm3.sktixingTime
                : this.shezhiID == "61"
                ? this.shezhiForm4.startendXiaoke
                : this.shezhiID == "63"
                ? this.shezhiForm5.keshiweifu
                : this.shezhiID == "62"
                ? this.shezhiForm7.daoqiqinglin
                : (this.shezhiForm6.pingjiatuisong = this.typelist + this.staffList);
            console.log(value);

            api.post("xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",{
              id: this.shezhiID,
              value: value,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        } else {
          this.$Message.error("请完成必填项！");
        }
      });
    },
    checkstaffTel() {},

    closeModal(val) {
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        api.get("xwcloud-sys/sys/StaffManagement/getPxstafftableAllList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allStaffList = res.obj;
          }
        });

        this.tuiIstea = false;
        this.checkstafflist = [];
        this.checktype = [];
        this.typelist = "";
        this.staffList = "";
        this.shezhiForm6.pingjiatuisong = "";
        console.log(this.shezhiID);

        if (this.shezhiID == "11") {
          let li = ["11", "12", "13"];
          li.forEach((item) => {
            api.get("/xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: item }).then((res) => {
              if (item == "11") {
                this.shezhiForm8.remainkeshi = res.obj.modifyValue;
              } else if (item == "12") {
                this.shezhiForm8.remainday = res.obj.modifyValue;
              } else if (item == "13") {
                this.shezhiForm8.keshitype = res.obj.modifyValue;
              }
            });
          });

          this.jifenbilvShow = false;
          this.shuakaShow = false;
          this.xianzhidaysShow = false;
          this.sktixingShow = false;
          this.startendXiaokeShow = false;
          this.keshiweifuShow = false;
          this.pingjiatuisongShow = false;
          this.daoqiqinglinShow = false;
          this.xufeiShow = true;
          this.title = "续费预警";
        } else {
          api.get("xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: this.shezhiID }).then((res) => {
            console.log(res);
            if (this.shezhiID == "72") {
              this.jifenbilvShow = true;
              this.shuakaShow = false;
              this.xianzhidaysShow = false;
              this.sktixingShow = false;
              this.startendXiaokeShow = false;
              this.keshiweifuShow = false;
              this.pingjiatuisongShow = false;
              this.daoqiqinglinShow = false;
              this.xufeiShow = false;
              this.title = "积分比例设置";
              if (res.obj != null) {
                this.shezhiForm.jifenbilv = res.obj.modifyValue;
              }
            } else if (this.shezhiID == "28") {
              this.jifenbilvShow = false;
              this.shuakaShow = true;
              this.xianzhidaysShow = false;
              this.sktixingShow = false;
              this.startendXiaokeShow = false;
              this.keshiweifuShow = false;
              this.pingjiatuisongShow = false;
              this.daoqiqinglinShow = false;
              this.xufeiShow = false;
              this.title = "刷卡时间段设置";
              if (res.obj != null) {
                this.shezhiForm1.shuakashijianduan = res.obj.modifyValue;
              }
            } else if (this.shezhiID == "41") {
              this.title = "修改课耗录入/消课限制（天）";
              this.jifenbilvShow = false;
              this.shuakaShow = false;
              this.xianzhidaysShow = true;
              this.sktixingShow = false;
              this.startendXiaokeShow = false;
              this.keshiweifuShow = false;
              this.pingjiatuisongShow = false;
              this.daoqiqinglinShow = false;
              this.xufeiShow = false;
              if (res.obj != null) {
                this.shezhiForm2.xianzhidays = res.obj.modifyValue;
              }
            } else if (this.shezhiID == "15") {
              this.title = "修改上课提醒推送时间";
              this.jifenbilvShow = false;
              this.shuakaShow = false;
              this.xianzhidaysShow = false;
              this.sktixingShow = true;
              this.startendXiaokeShow = false;
              this.keshiweifuShow = false;
              this.pingjiatuisongShow = false;
              this.daoqiqinglinShow = false;
              this.xufeiShow = false;
              if (res.obj != null) {
                this.shezhiForm3.sktixingTime = res.obj.modifyValue;
              }
            } else if (this.shezhiID == "61") {
              this.title = "修改是否只能在开始和结束日期之间消课";
              this.jifenbilvShow = false;
              this.shuakaShow = false;
              this.xianzhidaysShow = false;
              this.sktixingShow = false;
              this.startendXiaokeShow = true;
              this.keshiweifuShow = false;
              this.pingjiatuisongShow = false;
              this.daoqiqinglinShow = false;
              this.xufeiShow = false;
              if (res.obj != null) {
                this.shezhiForm4.startendXiaoke = res.obj.modifyValue;
              }
            } else if (this.shezhiID == "63") {
              this.title = "修改学员课时是否可以扣减为负数";
              this.jifenbilvShow = false;
              this.shuakaShow = false;
              this.xianzhidaysShow = false;
              this.sktixingShow = false;
              this.startendXiaokeShow = false;
              this.keshiweifuShow = true;
              this.pingjiatuisongShow = false;
              this.daoqiqinglinShow = false;
              this.xufeiShow = false;
              if (res.obj != null) {
                this.shezhiForm5.keshiweifu = res.obj.modifyValue;
              }
            } else if (this.shezhiID == "62") {
              this.title = "修改到期后的剩余课时是否自动清零";
              this.jifenbilvShow = false;
              this.shuakaShow = false;
              this.xianzhidaysShow = false;
              this.sktixingShow = false;
              this.startendXiaokeShow = false;
              this.keshiweifuShow = false;
              this.pingjiatuisongShow = false;
              this.daoqiqinglinShow = true;
              this.xufeiShow = false;
              if (res.obj != null) {
                this.shezhiForm7.daoqiqinglin = res.obj.modifyValue;
              }
            } else if (this.shezhiID == "14") {
              this.title = "学生课后评价消息推送员工";
              this.jifenbilvShow = false;
              this.shuakaShow = false;
              this.xianzhidaysShow = false;
              this.sktixingShow = false;
              this.startendXiaokeShow = false;
              this.keshiweifuShow = false;
              this.pingjiatuisongShow = true;
              this.daoqiqinglinShow = false;
              this.xufeiShow = false;
              if (res.obj != null) {
                this.shezhiForm6.pingjiatuisong = res.obj.modifyValue;
                let li = res.obj.modifyValue.split(",");
                li.forEach((item) => {
                  if (item == "-1" || item == "-2") {
                    this.checktype.push(item);
                  } else {
                    this.checkstafflist.push(item);
                  }
                });

                if (this.checkstafflist.length > 0) {
                  this.checktype.push("-3");
                  this.tuiIstea = true;
                }
              }
            }
          });
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
