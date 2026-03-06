<template>
  <Modal
    v-model="show"
    title="上课学员"
    :loading="loading"
    :mask-closable="false"
    width="60"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <label>
        <font style="color: red"
          >*注：***添加的学员*** 仅加入本次不排课消课进行消课，并不将学生加入到班级</font
        >
      </label>

      <Row style="margin-top: 20px">
        <Col span="2" style="text-align: right">
          <label>学员：</label>
        </Col>
        <Col span="6">
          <FormItem>
            <Select v-model="stuID" placeholder="请选择学员" @on-change="getbuxi">
              <Option v-for="item in allstu" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="2" style="text-align: right">
          <label>课程：</label>
        </Col>
        <Col span="6">
          <FormItem>
            <Select v-model="buxiID" placeholder="请选择课程">
              <Option v-for="item in allstukecheng" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="2" style="margin-left: 50px" v-if="addshow">
          <Button type="primary" @click="addstu">将学员添加到消课</Button>
        </Col>
      </Row>

      <FormItem>
        计入教师课时：
        <InputNumber :min="0" v-model="logForm.teacherkeshiNum"></InputNumber>
      </FormItem>

      <FormItem>
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll"
          >全选</Checkbox
        >
        查找学员：
        <Input v-model="searchStu" style="width: 200px" />
        <font style="color: red; margin-left: 20px">搜索不会改变任何学生的选中状态</font>

        <span v-if="classType != 1">
          <Button type="primary" @click="Isadd" size="small" v-if="!addshow"
            >临时增加学员消课</Button
          >
          <Button type="warning" @click="Isadd" size="small" v-if="addshow">确定</Button>
        </span>
      </FormItem>

      <FormItem v-if="havestu">
        <Row v-for="(item, i) in Nopaikestu" :key="item.id">
          <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange(i)">
            <Col span="2">
              <Checkbox :label="item.stuID">{{ item.stuName }}</Checkbox>
            </Col>
            <Col span="2">
              <label v-if="item.kaoqingStyle != null">
                <font style="color: red">(已考勤)</font>
              </label>
            </Col>
            <Col span="7">
              <RadioGroup v-model="item.kaoqing">
                <Radio label="1">正常</Radio>
                <Radio label="2">请假</Radio>
                <Radio label="3">旷课</Radio>
                <Radio label="4">迟到</Radio>
                <Radio label="5">补课</Radio>
              </RadioGroup>
            </Col>

            <Col span="3">
              <label>扣课时：</label>
              <InputNumber :min="0" v-model="item.keshi"></InputNumber>
            </Col>
            <Col span="3">
              <font style="color: blue; margin-left: 20px"
                >剩余课时：{{ item.remainkeshi }}</font
              >
            </Col>
            <Col span="3" v-if="item.yujing != null">
              <label style="margin-left: 10px">
                <font style="color: red">{{ item.yujing }}</font>
              </label>
            </Col>
          </CheckboxGroup>
        </Row>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import { getTimeDifference } from "@/libs/tools";
import * as api from "@/api/api.js";

export default {
  name: "nopaikestu",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    pkdata: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      havestu: false, //是否加载到学员
      getdata: JSON,
      logFormRule: {},
      allstu: [], //添加学员时获取到的所有学员
      allstukecheng: [], //根据学员获取补习课程
      Nopaikestu: [], //不排课消课的所有学员

      stuID: "", //添加自由学员时获取参数
      buxiID: "",
      stuSum: 0,
      addshow: false,
      //全选
      indeterminate: false,
      checkAll: false,
      checkAllGroup: [],
      ALLGroup: [], //全选时的学员

      stuMessage: [], //学员信息
      searchStu: "", //搜索学员

      teaList: [],
      allDate: [],
      //计算课时（时间差）
      times: {},
      timeSum: 0,

      //保存参数
      logForm: {
        classidStr: "",
        shangkedate: "",
        newstu: "",
        shangketeacher: "",
        startTime: "",
        endTime: "",
        zhujiaoteacher: "",
        kechengID: "",
        teacherkeshiNum: -1,
        shuoming: "",
        allriqi: "",
      },

      //判断参数
      dingjin: {
        tiankc: "",
        newstu: "", //排课消课的
        type: 2, //不排课消课的是2 ，排课消课的是1
        classidStr: "",
        npnewstu: "",
      },

      classType: 0,
    };
  },
  methods: {

    ok() {
      this.stuMessage = [];
      this.Nopaikestu.forEach((item) => {
        if (item._check) {
          this.stuMessage.push(item);
        }
      });
      let havekaoqing = false;
      this.stuMessage.forEach((items) => {
        if (items.kaoqingStyle != null) {
          havekaoqing = true;
        }
      });
      if (havekaoqing == true) {
        this.$Message.error("已考勤的学员不可再次考勤，请取消选中的已考勤学员。");
      } else {
        this.logForm.newstu = JSON.stringify(this.stuMessage);
        this.logForm.shangketeacher = JSON.stringify(this.teaList);
        this.dingjin.npnewstu = this.logForm.newstu;
        this.dingjin.classidStr = this.logForm.classidStr;
        console.log(this.logForm);
        api.post("xwcloud-pkxk/paike/paikexiaoke/pdstudingjin",this.dingjin).then((res) => {
          if (res.code == "N" && res.success == true) {
            this.$Message.error(res.msg);
          } else {
            api.post("xwcloud-pkxk/paike/paikexiaoke/savestukehao",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                // this.$Message.success(res.msg);
                // // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.closeModal(false);

                this.$Modal.info({
                  title: "考勤结果",
                  content: "<p>" + res.msg + "</p>",
                  closable: true,
                  onOk: () => {},
                  onCancel: () => {},
                });
              } else {
                this.$Message.error("保存失败");
              }
            });
          }
        });
      }
    },

    closeModal(val) {
      this.$emit("input", val);
    },

    /**
     * 获取当前校区学员
     */
    GetcampusStuNameList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/GetcampusStuName","").then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstu = res.obj;
        }
      });
    },

    /**
     * 按照学员获取补习课程
     */
    getxkStuList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getxkStu",{ stuID: this.stuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstukecheng = res.obj;
        }
      });
    },

    /**开始添加学员 */
    getzyStuList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getzyStu",{ stuID: this.stuID, buxiID: this.buxiID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          let haveIn = false;
          this.indeterminate = false;
          this.checkAll = false;
          this.stuMessage = [];
          this.Nopaikestu.forEach((item) => {
            if (res.obj[0].id == item.stuID) {
              haveIn = true;
              this.$Message.error("该学员已经在本次消课内，请勿重复添加！！！");
              return;
            }
          });

          if (res.obj[0].kaoqingStyle != null) {
            this.indeterminate = true;
          }

          if (!haveIn) {
            this.stuSum += 1;
            this.Nopaikestu.push({
              stuName: res.obj[0].stuName,
              _check: false,
              stuID: res.obj[0].id,
              kaoqing: "1",
              keshi: this.timeSum / Number(res.obj[0].classTimeStyleName), //学员应该扣的课时
              kaoqingStyle: res.obj[0].kaoqingStyle,
              remainkeshi: res.obj[0].remainkeshi,
              yujing: res.obj[0].yujing,
              classTimeStyleName: res.obj[0].classTimeStyleName,
              buxiID: this.buxiID,
            });
            this.handleCheckAll();
            this.havestu = true;
          }
        }
      });
    },

    /**获取不排课消课的学员 */
    savestukehaoList() {
      api.post("xwcloud-pkxk/paike/paikexiaoke/tiansavestukehao",{
        haveclassDate: this.logForm.shangkedate,
        startLessonDateTime: this.logForm.startTime,
        endLessonDateTime: this.logForm.endTime,
        classID: this.logForm.classidStr,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // this.Nopaikestu = res.obj;
          this.stuSum = res.obj.length;
          this.indeterminate = false;
          this.stuMessage = [];
          res.obj.forEach((item) => {
            if (item.kaoqingStyle != null) {
              this.indeterminate = true;
            }

            this.Nopaikestu.push({
              stuName: item.stuName,
              _check: false,
              stuID: item.id,
              kaoqing: "1",
              keshi: this.timeSum / Number(item.classTimeStyleName), //学员应该扣的课时
              kaoqingStyle: item.kaoqingStyle,
              remainkeshi: item.remainkeshi,
              yujing: item.yujing,
              classTimeStyleName: item.classTimeStyleName,
              buxiID: "0",
            });
          });
          this.handleCheckAll();
          this.havestu = true;
        }
      });
    },

    /**全选学员 */
    handleCheckAll() {
      this.checkAllGroup = [];
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.Nopaikestu.forEach((item) => {
          item._check = true;
          this.checkAllGroup.push(item.stuID);
        });
      } else {
        this.checkAllGroup = [];
      }
    },

    /**学员选择状态change */
    checkAllGroupChange(data) {
      this.Nopaikestu[data]._check = !this.Nopaikestu[data]._check;
      if (data.length === this.stuSum) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },

    /**
     * 添加学员
     */
    addstu() {
      this.getzyStuList();
    },
    Isadd() {
      this.addshow = !this.addshow;
    },

    /**
     * on change
     */
    getbuxi() {
      this.buxiID = ""; ///选中学员改变时 清空课程
      this.getxkStuList();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs["logForm"].resetFields();
        this.allstu = [];
        this.allstukecheng = [];
        this.searchStu = "";
        this.Nopaikestu = [];
        this.stuMessage = [];
        this.stuID = "";
        this.buxiID = "";
        this.stuSum = 0;
        this.checkAll = false; //全部选中
        this.indeterminate = false;

        //加载数据
        this.getdata = JSON.parse(this.pkdata);

        console.log(this.getdata);
        this.classType = this.getdata.classType;
        this.logForm.classidStr = this.getdata.classidStr;
        this.logForm.shangkedate = this.getdata.shangkedate;
        this.teaList.push({ teaID: this.getdata.shangketeacher });
        this.logForm.startTime = this.getdata.startLessonDateTime;
        this.logForm.endTime = this.getdata.endLessonDateTime;
        this.logForm.zhujiaoteacher = this.getdata.zhujiaoteacher;
        this.logForm.kechengID = this.getdata.kechengID;
        this.logForm.shuoming = this.getdata.shuoming;
        this.logForm.allriqi = this.getdata.allriqi;

        this.allDate = this.getdata.allriqi;

        //计算时间差
        this.times = getTimeDifference(
          this.getdata.shangkedate + " " + this.getdata.startLessonDateTime,
          this.getdata.shangkedate + " " + this.getdata.endLessonDateTime
        );

        if (this.times == "开始时间不允许大于结束时间") {
          this.$Message.error("开始时间不允许大于结束时间");
        } else {
          if (this.times.min) {
            //分
            this.timeSum = Number(this.times.min);

            this.logForm.teacherkeshiNum =
              this.timeSum / Number(this.getdata.classTimeNum); //计入教师的课时  上课时间段（差值）/课程时长
          }
        }

        this.GetcampusStuNameList();
        this.savestukehaoList(); //获取学员
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
