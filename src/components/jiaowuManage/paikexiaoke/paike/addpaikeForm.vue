<template>
  <div>
    <Modal
      v-model="show"
      title="新增排课"
      :loading="loading"
      :mask-closable="false"
      :mask="true"
      :footer-hide="false"
      @on-cancel="closeModal(false)"
      width="70"
    >
      <Form
        ref="paikeForm"
        :model="paikeForm"
        :rules="paikeRule"
        :label-width="150"
        :label-colon="true"
      >
        <FormItem label="选择课程" prop="kechnegID">
          <Select
            v-model="paikeForm.kechnegID"
            placeholder="请选择课程"
            style="width: 75%"
            @on-change="changekecheng"
            filterable
          >
            <Option v-for="item in allkechengData" :value="item.id" :key="item.id">{{
              item.kechengName
            }}</Option>
          </Select>
        </FormItem>

        <FormItem label="课程内容" v-if="xianshikccontent">
          <Checkbox v-model="showcontent" @on-change="changeshowkccontent"
            >加载课程内容</Checkbox
          >
        </FormItem>
        <FormItem label="选择班级" prop="classID">
          <Select
            v-model="paikeForm.classID"
            placeholder="请选择班级"
            style="width: 75%"
            @on-change="selectClass"
            filterable
          >
            <Option v-for="item in classData" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>

        <FormItem v-if="addstuShow">
          <Row>
            <Col span="4" style="text-align: left; padding-left: 5px">
              <!-- <label style="color: #2d8cf0" @click="zengjianstu">【点击这里】</label>增减排课学员 -->
              <Button type="success" ghost @click="zengjianstu" style="width: 100%"
                >临时增减排课学员</Button
              >
            </Col>
            <Col span="18" style="padding-left: 5px">班级学员：{{ allstu }}</Col>
          </Row>
        </FormItem>

        <Row>
          <Col span="12">
            <FormItem label="任课教师(可多选)" prop="teacherIDs">
              <Select
                v-model="checkteadata"
                placeholder="请选择任课教师"
                multiple
                :filterable="true"
              >
                <Option v-for="item in teacherData" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px">
            <label style="color: #2d8cf0"
              >【<router-link to="/staffinfo">点击这里</router-link>】</label
            >设置任课老师
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="助教">
              <RadioGroup
                v-model="apzhujiao"
                @on-change="havezhujiao"
                style="width: 100%"
              >
                <Radio label="不安排助教"></Radio>
                <Radio label="安排助教"></Radio>
              </RadioGroup> </FormItem
          ></Col>

          <Col span="10" v-if="zhujiaoshow">
            <FormItem label="选择助教" prop="zhujiaoID">
              <Select v-model="paikeForm.zhujiaoID" placeholder="请选择助教">
                <Option
                  v-for="item in zhujiaoData"
                  :value="item.id"
                  :key="item.id"
                  :filterable="true"
                  >{{ item.name }}</Option
                >
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="教室" prop="classroomID">
              <Select v-model="paikeForm.classroomID" placeholder="请选择教室">
                <Option
                  v-for="item in classroomData"
                  :value="item.id"
                  :key="item.id"
                  :filterable="true"
                  >{{ item.classroomname }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px">
            <label style="color: #2d8cf0"
              >【<router-link to="/classroom">点击这里</router-link>】</label
            >设置教室
          </Col>
        </Row>

        <Row>
          <Col span="12">
            <FormItem label="是否可以请假">
              <RadioGroup v-model="paikeForm.isqingjia">
                <Radio label="1">可以按课程规定请假次数请假</Radio>
                <Radio label="2">不允许请假</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>

        <Row v-if="!showcontent">
          <Col span="24">
            <FormItem label="上课主题" prop="kechengContent">
              <Input
                v-model="paikeForm.kechengContent"
                type="textarea"
                placeholder="请输入上课主题、选填"
              />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="是否推送上课提醒">
              <RadioGroup v-model="paikeForm.istixing">
                <Radio label="1">推送</Radio>
                <Radio label="2">不推送</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" style="text-align: left; padding-left: 5px; padding-top: 8px">
            <label style="color: #2d8cf0"
              >【<router-link to="/jiaowushezhi">点击这里</router-link>】</label
            >设置推送时间
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="排课次数">
              <RadioGroup v-model="paikecishu" @on-change="changepkmsg">
                <Radio label="多次循环排课"></Radio>
                <Radio label="单次排课"></Radio>
              </RadioGroup> </FormItem
          ></Col>
        </Row>

        <div v-if="!showcontent">
          <Row>
            <Col span="6">
              <FormItem label="开始日期" prop="shangkeDate">
                <DatePicker
                  type="date"
                  placeholder="请选择开始日期"
                  v-model="paikeForm.shangkeDate"
                  style="width: 100%"
                  @on-change="changepaikeDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="上课时间" prop="shangkeTime">
                <TimePicker
                  format="HH:mm"
                  type="timerange"
                  placement="bottom-end"
                  placeholder="请选择上课时间"
                  style="width: 100%"
                  v-model="paikeForm.shangkeTime"
                ></TimePicker>
              </FormItem>
            </Col>
          </Row>
          <div v-if="pkmsgshow">
            <Row>
              <Col span="12">
                <FormItem label="结束方式" prop="jieshustyle">
                  <Select
                    v-model="paikeForm.jieshustyle"
                    placeholder="请选择结束方式"
                    style="width: 48%"
                    @on-change="changepaikeDate"
                  >
                    <Option :value="1" :key="1">按日期结束</Option>
                    <Option :value="2" :key="2">按课节总数</Option>
                  </Select>
                  <DatePicker
                    type="date"
                    placeholder="请选择日期"
                    v-model="paikeForm.jieshuDate"
                    style="width: 48%"
                    v-if="paikeForm.jieshustyle == '1'"
                    @on-change="changepaikeDate"
                  ></DatePicker>
                  <InputNumber
                    :max="10"
                    :min="1"
                    :step="1"
                    v-model="paikeForm.kechengjieshu"
                    style="width: 48%"
                    v-if="paikeForm.jieshustyle == '2'"
                    @on-change="changepaikeDate"
                  ></InputNumber>
                </FormItem>
              </Col>
              <Col span="12"></Col>
            </Row>
            <Row>
              <Col span="6">
                <FormItem label="排课方式" prop="paikefangshi">
                  <RadioGroup
                    v-model="paikeForm.paikefangshi"
                    @on-change="changepaikeDate"
                  >
                    <Radio label="1">重复排课</Radio>
                    <Radio label="2">自由排课</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem
                  label="上课日期"
                  prop="allShangkeDate"
                  v-if="paikeForm.paikefangshi == '2'"
                >
                  <DatePicker
                    type="date"
                    multiple
                    placeholder="请选择上课日期"
                    v-model="paikeForm.allShangkeDate"
                    @on-change="changepaikeDate"
                    @on-clear="clearDate"
                  ></DatePicker>
                </FormItem>
                <FormItem
                  label="重复方式"
                  prop="chongfufangshi"
                  v-if="paikeForm.paikefangshi == '1'"
                >
                  <RadioGroup
                    v-model="paikeForm.chongfufangshi"
                    @on-change="changepaikeDate"
                  >
                    <Radio label="1">多天连排</Radio>
                    <Radio label="3">每周重复排</Radio>
                    <Radio label="2">隔天重复排</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </div>
          <Row v-if="pkmsgshow">
            <Col span="24">
              所有上课日期：
              <span>
                <Tag
                  v-for="(item, i) in allpaikedate"
                  :key="item"
                  :name="item"
                  closable
                  @on-close="handleClose(i)"
                  >{{ item }}</Tag
                >
              </span>
            </Col>
          </Row>
        </div>

        <Table :columns="columns" :data="kechengcontentData" v-if="showcontent"> </Table>
      </Form>

      <div slot="footer">
        <Button type="primary" @click="savepaike(1)">保存并继续</Button>
        <Button type="primary" @click="savepaike(2)">保存并关闭</Button>
        <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
      </div>
    </Modal>
    <paikestu-form
      v-model="showStuInfo"
      :classID="paikeForm.classID"
      @increment="savestu"
    ></paikestu-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import paikestuForm from "../paike/paikestuForm";
import * as api from "@/api/api.js";
export default {
  components: {
    paikestuForm,
  },
  data() {
    return {
      show: this.value,
      loading: true,
      paikeForm: {
        kechnegID: "",
        classID: "",
        teacherIDs: "",
        classroomID: "",
        zhujiaoID: "",
        isqingjia: "1",
        istixing: "1",
        jieshustyle: 1,
        Date: "",
        kechengjieshu: 1,
        paikefangshi: "1",
        chongfufangshi: "1",
        shangkeDate: "",
        allShangkeDate: [],
        jieshuDate: "",
        newStuData: [],
        shangkeTime: "",
        kechengContent: "",
      },
      paikecontentData: [],
      columns: [
        {
          title: "课程内容",
          align: "center",
          key: "kechengContent",
          render: (h, params) => {
            return h("Input", {
              props: {
                type: "textarea",
                value: params.row.kechengContent,
                transfer: true,
                placeholder: "请输入上课内容",
                size: "small",
              },
              on: {
                "on-blur": (event) => {
                  this.kechengcontentData[params.index].kechengContent =
                    event.target.value;
                },
              },
            });
          },
        },
        {
          title: "上课日期",
          align: "center",
          key: "shangkeDate",
          render: (h, params) => {
            return h("DatePicker", {
              props: {
                transfer: true,
                clearable: false,
                placeholder: "请选择上课日期",
                value: params.shangkeDate,
                type: "date",
                format: "yyyy-MM-dd",
                size: "small",
              },
              on: {
                "on-change": (val) => {
                  this.kechengcontentData[params.index].shangkeDate = val;
                },
              },
            });
          },
        },
        {
          title: "上课时间",
          align: "center",
          key: "shangkeTime",
          render: (h, params) => {
            return h("TimePicker", {
              props: {
                confirm: true,
                transfer: true,
                clearable: false,
                placeholder: "请选择上课时间",
                value: params.shangkeTime,
                type: "timerange",
                size: "small",
              },
              on: {
                "on-change": (val) => {
                  this.kechengcontentData[params.index].shangkeTime = val;
                },
              },
            });
          },
        },
        {
          title: "操作",
          align: "center",
          key: "money",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.kechengcontentData.splice(params.index, 1);
                    },
                  },
                },
                "移除"
              ),
            ]);
          },
        },
      ],
      paikeRule: {
        // 验证输入
        kechnegID: [{ required: true, message: "请选择课程", trigger: "change" }],
        classID: [{ required: true, message: "请选择班级", trigger: "change" }],
        teacherIDs: [{ required: true, message: "请选择任课老师", trigger: "change" }],
        classroomID: [{ required: true, message: "请选择上课教室", trigger: "change" }],
        shangkeDate: [
          {
            required: true,
            type: "date",
            message: "请选择上课日期",
            trigger: "change",
          },
        ],
      },
      allkechengData: [],
      classData: [],
      teacherData: [],
      checkteadata: [],
      zhujiaoData: [],
      classroomData: [],
      allpaikedate: [],
      showStuInfo: false,
      pdrkeshiobj: {
        tabdata: "",
        newstu: "",
      },
      showcontent: false,
      xianshikccontent: false,
      kechengcontentData: [],
      addstuShow: false,
      allstu: "",
      apzhujiao: "不安排助教",
      zhujiaoshow: false,
      paikecishu: "多次循环排课",
      pkmsgshow: false,
    };
  },
  props: {
    value: { type: Boolean, default: false },
    paikeData: { type: String }, //要修改的排课信息
    savetype: { type: Number, default: 1 }, //保存类型：1：新增排课；2：重排所有排课；3：继续排课；4：修改排课
  },
  watch: {},
  created() {},
  methods: {
    handleClose(ind) {
      this.allpaikedate.splice(ind, 1);
    },
    changepkmsg() {
      if (this.paikecishu == "多次循环排课") {
        this.pkmsgshow = true;
        this.changepaikeDate();
      } else if (this.paikecishu == "单次排课") {
        this.pkmsgshow = false;
        this.allpaikedate = [];
      }
    },

    savepaike(type) {
      let paidate = [];
      if (this.allpaikedate.length == 0) {
        this.allpaikedate.push(this.paikeForm.shangkeDate);
      }
      if (this.showcontent) {
        for (var i = 0; i < this.kechengcontentData.length; i++) {
          paidate.push({
            index: i,
            kechengContent: this.kechengcontentData[i].kechengContent,
            haveClassDate: toolbox.dateFtt(
              this.kechengcontentData[i].shangkeDate,
              "yyyy-MM-dd"
            ),
            startTime: this.kechengcontentData[i].shangkeTime[0],
            endTime: this.kechengcontentData[i].shangkeTime[1],
          });
        }
      } else {
        for (var i = 0; i < this.allpaikedate.length; i++) {
          paidate.push({
            index: i,
            kechengContent: "",
            haveClassDate: toolbox.dateFtt(this.allpaikedate[i], "yyyy-MM-dd"),
            startTime: this.paikeForm.shangkeTime[0],
            endTime: this.paikeForm.shangkeTime[1],
          });
        }
      }
      let laoshiID = [];
      this.checkteadata.forEach((element) => {
        laoshiID.push({ teaID: element });
      });
      if (laoshiID.length != 0) {
        this.paikeForm.teacherIDs = JSON.stringify(laoshiID);
      }

      this.pdrkeshiobj.tabdata = JSON.stringify(paidate);
      this.pdrkeshiobj.newstu = JSON.stringify(this.paikeForm.newStuData);
      this.$refs["paikeForm"].validate((valid) => {
        if (valid) {
          api
            .post("xwcloud-pkxk/paike/paikexiaoke/pdrkeshi", this.pdrkeshiobj)
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                //保存新增排课
                if (this.savetype == 1 || this.savetype == 3) {
                  api
                    .post("xwcloud-pkxk/paike/paikexiaoke/SavePaike", {
                      tabdata: JSON.stringify(paidate),
                      newStuData: JSON.stringify(this.paikeForm.newStuData),
                      kcContentCount: this.paikeForm.kechengContent,
                      kecheng: this.paikeForm.kechnegID,
                      classNum: this.paikeForm.classID,
                      showjiaoshi: this.paikeForm.teacherIDs,
                      classRoomID: this.paikeForm.classroomID,
                      checkPKchongtu: "1",
                    })
                    .then((res) => {
                      if (res.code == "Y" && res.success == true) {
                        this.$Message.success(res.msg);
                        this.closeModal(false);
                        this.teacherData = [];
                        this.$emit("handleSearch");
                      } else {
                        this.$Message.error("添加排课信息保存失败！");
                      }
                    });
                } else if (this.savetype == 2) {
                  //保存重排所有的排课信息
                  api
                    .post("xwcloud-pkxk/paike/paikexiaoke/chongpaiAllPaike", {
                      tags: JSON.parse(this.paikeData).tags,
                      tabdata: JSON.stringify(paidate),
                      newStuData: JSON.stringify(this.paikeForm.newStuData),
                      kcContentCount: this.paikeForm.kechengContent,
                      kecheng: this.paikeForm.kechnegID,
                      classNum: this.paikeForm.classID,
                      showjiaoshi: this.paikeForm.teacherIDs,
                      classRoomID: this.paikeForm.classroomID,
                      checkPKchongtu: "1",
                    })
                    .then((res) => {
                      if (res.code == "Y" && res.success == true) {
                        this.$Message.success(res.msg);
                        this.closeModal(false);
                        this.$emit("handleSearch");
                      } else {
                        this.$Message.error("修改本批次排课信息成功");
                      }
                    });
                } else if (this.savetype == 4) {
                  //保存修改排课信息
                  api
                    .post("xwcloud-pkxk/paike/paikexiaoke/editSavePaike", {
                      paikeid: JSON.parse(this.paikeData).id,
                      editStuData: JSON.stringify(this.paikeForm.newStuData),
                      kecheng: this.paikeForm.kechnegID,
                      editclass: this.paikeForm.classID,
                      showjiaoshi: this.paikeForm.teacherIDs,
                      editclassRoomID: this.paikeForm.classroomID,
                      editenddate: toolbox.dateFtt(
                        this.paikeForm.shangkeDate,
                        "yyyy-MM-dd"
                      ),
                      editstarttime: this.paikeForm.shangkeTime[0],
                      editendtime: this.paikeForm.shangkeTime[1],
                      checkPKchongtuEdit: "1",
                    })
                    .then((res) => {
                      if (res.code == "Y" && res.success == true) {
                        this.$Message.success(res.msg);
                        this.closeModal(false);
                        this.$emit("handleSearch");
                      } else {
                        this.$Message.error("修改排课信息失败");
                      }
                    });
                }
              } else {
                this.$Message.error(res.msg);
              }
            });
        } else {
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    /**清除 */
    handleReset() {
      this.$refs["paikeForm"].resetFields();
      this.closeModal(false);
    },
    changekecheng() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/GetRenjiaoTeacher", {
          kechengID: this.paikeForm.kechnegID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.teacherData = res.obj;
          }
        });
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/GetKechengContent", {
          kechengID: this.paikeForm.kechnegID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            if (res.obj.length > 0) {
              this.xianshikccontent = true;
            } else {
              this.xianshikccontent = false;
            }
            this.kechengcontentData = res.obj;
          }
        });
    },
    //计算两个日期中间的所有日期，type：hour：间隔小时 day：天 week：周 month：月，jiange：间隔一天
    //start：开始日期  stop：结束日期
    getDuration(type, start, stop, days) {
      var $array = new Array();
      var current = new Date(start);
      stop = new Date(stop);
      while (current <= stop) {
        $array.push(toolbox.dateFtt(new Date(current), "yyyy-MM-dd"));
        if (type == "hour") {
          //小时
          current.setHours(current.getHours() + 1);
        } else if (type == "day") {
          //天
          current.setDate(current.getDate() + 1);
        } else if (type == "week") {
          //周
          current.setDate(current.getDate() + 7);
        } else if (type == "month") {
          //月
          current.setMonth(current.getMonth() + 1);
        } else {
          //默认天
          current.setDate(current.getDate() + 2);
        }
      }
      if (days == 0) {
        return $array;
      } else {
        return $array.slice(0, days);
      }
    },
    changepaikeDate() {
      this.allpaikedate = [];
      var date = new Date();
      console.log(toolbox.dateFtt(date.setMonth(date.getMonth() + 5), "yyyy-MM-dd"));
      if (this.paikeForm.jieshustyle == 2) {
        this.paikeForm.jieshuDate = toolbox.dateFtt(
          date.setMonth(date.getMonth() + 5),
          "yyyy-MM-dd"
        );
      }
      if (this.paikeForm.paikefangshi == 1) {
        //重复排课
        if (this.paikeForm.chongfufangshi == "1") {
          //每天重复
          this.allpaikedate = this.getDuration(
            "day",
            toolbox.dateFtt(this.paikeForm.shangkeDate, "yyyy-MM-dd"),
            toolbox.dateFtt(this.paikeForm.jieshuDate, "yyyy-MM-dd")
          );
        } else if (this.paikeForm.chongfufangshi == "2") {
          //隔天重复
          this.allpaikedate = this.getDuration(
            "jiange",
            toolbox.dateFtt(this.paikeForm.shangkeDate, "yyyy-MM-dd"),
            toolbox.dateFtt(this.paikeForm.jieshuDate, "yyyy-MM-dd")
          );
        } else {
          //隔周重复
          this.allpaikedate = this.getDuration(
            "week",
            toolbox.dateFtt(this.paikeForm.shangkeDate, "yyyy-MM-dd"),
            toolbox.dateFtt(this.paikeForm.jieshuDate, "yyyy-MM-dd")
          );
        }
        if (this.paikeForm.jieshustyle == 2) {
          this.allpaikedate = this.allpaikedate.slice(0, this.paikeForm.kechengjieshu);
        }
      } else {
        //自由排课
        this.paikeForm.allShangkeDate.forEach((element) => {
          this.allpaikedate.push(toolbox.dateFtt(element, "yyyy-MM-dd"));
        });
        if (this.paikeForm.jieshustyle == 2) {
          this.allpaikedate = this.allpaikedate.slice(0, this.paikeForm.kechengjieshu);
        }
      }
    },
    clearDate() {
      this.allpaikedate = [];
    },
    zengjianstu() {
      if (this.paikeForm.classID == "") {
        this.$Message.error("请先选择排课班级");
      } else {
        this.showStuInfo = true;
      }
    },
    savestu(data) {
      this.allstu = "";

      this.paikeForm.newStuData = JSON.parse(data);
      this.paikeForm.newStuData.forEach((item) => {
        this.allstu += item.stuName + ",";
      });
    },
    selectClass() {
      this.allstu = "";
      this.classData.forEach((item) => {
        if (this.paikeForm.classID == item.id) {
          if (item.is1v1Class == 0) {
            this.addstuShow = true;
          } else {
            this.addstuShow = false;
          }
        }
      });
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/GetClassStuList", {
          classID: this.paikeForm.classID,
          paikeid: 0,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.paikeForm.newStuData = res.obj;
            res.obj.forEach((item) => {
              this.allstu += item.stuName + ",";
            });
          }
        });
    },
    changeshowkccontent() {
      if (this.showcontent) {
        this.kechengcontentData = [];
        this.changekecheng();
      }
    },
    havezhujiao() {
      if (this.apzhujiao == "安排助教") {
        this.zhujiaoshow = true;
      } else if (this.apzhujiao == "不安排助教") {
        this.zhujiaoshow = false;
      }
    },
  },

  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表
      if (val) {
        this.$refs["paikeForm"].resetFields();
        this.teacherData = [];
        this.checkteadata = [];
        this.apzhujiao = "不安排助教";
        this.paikeForm.isqingjia = "1";
        this.paikeForm.istixing = "1";
        this.paikecishu = "多次循环排课";
        this.changepkmsg();
        api
          .get("xwcloud-pkxk/paike/paikexiaoke/GetAllkechengInfoByQuanxian", {})
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allkechengData = res.obj;
            }
          });
        api.get("xwcloud-pkxk/paike/paikexiaoke/NOpaikegetclass", {}).then((result) => {
          if (result.code == "Y" && result.success == true) {
            this.classData = result.obj;
          }
        });
        api.get("/xwcloud-caiwu/caiwu/pxtuifeitable/getallStaff", {}).then((result) => {
          if (result.code == "Y" && result.success == true) {
            this.zhujiaoData = result.obj;
          }
        });
        api.get("xwcloud-pkxk/paike/paikexiaoke/GetAllClassRoom", {}).then((result) => {
          if (result.code == "Y" && result.success == true) {
            this.classroomData = result.obj;
          }
        });

        if (this.savetype == 2 || this.savetype == 3 || this.savetype == 4) {
          var data = JSON.parse(this.paikeData);
          this.paikeForm.kechnegID = data.kechengID;
          this.paikeForm.classID = data.classID;
          this.paikeForm.teacherIDs = data.teacherIDs;

          this.paikeForm.classroomID = data.classRoomID + "";
          (this.paikeForm.shangkeDate = toolbox.dateFtt(
            data.haveClassDate,
            "yyyy-MM-dd"
          )),
            (this.paikeForm.shangkeTime = []);
          this.paikeForm.shangkeTime.push(data.startLessonDateTime);
          this.paikeForm.shangkeTime.push(data.endLessonDateTime);
          this.paikeForm.zhujiaoID = data.zhujiaoID;
          this.paikeForm.kechengContent = data.kechengContent;
          this.paikeForm.istixing = data.istuisongTixingMsg + "";

          api
            .get("xwcloud-pkxk/paike/paikexiaoke/GetRenjiaoTeacher", {
              kechengID: this.paikeForm.kechnegID,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.teacherData = res.obj;
                data.teacherIDs.split(",").forEach((element) => {
                  if (element != "") {
                    this.checkteadata.push(element + "");
                  }
                });
              }
            });
        } else {
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
