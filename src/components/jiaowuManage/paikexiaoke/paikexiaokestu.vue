<template>
  <Modal
    v-model="show"
    title="上课学员"
    :loading="loading"
    :mask-closable="false"
    width="60"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule">
      <FormItem>
        计入教师课时：
        <InputNumber :min="0" v-model="logForm.teacherKeshiNum"></InputNumber>
        <Checkbox :value="checkzj" on-change="getallstaffList">助教</Checkbox>
        <Col span="1" style="text-align: center">
          <label>助教：</label>
        </Col>
        <Col span="4" v-if="checkzj">
          <Select v-model="logForm.zhujiao" placeholder="请选择助教">
            <Option v-for="item in allstaff" :value="item.id" :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </Col>
      </FormItem>

      <FormItem>
        <div
          style="
            border-bottom: 1px solid #e9e9e9;
            padding-bottom: 6px;
            margin-bottom: 6px;
          "
        >
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
            >全选</Checkbox
          >
        </div>
        查找学员：
        <Input v-model="stuName" style="width: 200px" @on-change="inputsearch" />
        <font style="color: red; margin-left: 20px">搜索不会改变任何学生的选中状态</font>
      </FormItem>

      <FormItem v-if="havestu">
        <Row v-for="(item, index) in paikestu" :key="item.stuID">
          <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange(index)">
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
              <label>课时：</label>
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
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
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
  name: "paikexiaokestu",
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
      havestu: false, //是否有学员
      checkAll: false, //全部选中
      classType: 0,
      addshow: true,
      checkzj: false,
      getdata: JSON,
      kechengtime: "", //课程时长
      paikestu: [], //排课学员
      stuMessage: [], //学员信息
      stuSum: 0, //排课学员数
      //全选
      indeterminate: false,
      checkAllGroup: [],
      logFormRule: {}, //规则
      allstaff: [], //全部教师
      //上级页面传送接数据
      pkID: "",
      stuName: "",
      tiankc: [],
      timeSum: 0,

      //保存参数
      logForm: {
        tiankc: "",
        teacherKeshiNum: -1,
        studatamesaage: "",
        zhujiao: "",
      },

      //判断参数
      dingjin: {
        tiankc: "",
        newstu: "",
        type: 1, //不排课消课的是2 ，排课消课的是1
        classidStr: "", //不排课消课的
        npnewstu: "", //不排课消课的
      },
      buxiID: "",
      allstukecheng: [],
      allstu: [],
      stuID: "",
    };
  },
  methods: {
    GetcampusStuNameList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/GetcampusStuName","").then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstu = res.obj;
        }
      });
    },


    /**
     * 获取排课学员
     */
    getpaikexiaoekestu() {
      this.paikestu = [];
      api.get("xwcloud-pkxk/paike/paikexiaoke/getpaikexiaoekestuList",{
        pkID: this.pkID,
        stuName: this.stuName,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // this.paikestu = res.obj;
          this.stuSum = res.obj.length;
          this.indeterminate = false;
          this.stuMessage = [];
          res.obj.forEach((item) => {
            if (item.kaoqingStyle != null) {
              this.indeterminate = true;
            }

            this.paikestu.push({
              stuName: item.stuName,
              _check: false,
              stuID: item.id,
              kaoqing: "1",
              keshi: this.timeSum / Number(item.classTimeStyleName), //学员应该扣的课时
              kaoqingStyle: item.kaoqingStyle,
              remainkeshi: item.remainkeshi,
              yujing: item.yujing,
              classTimeStyleName: item.classTimeStyleName,
            });
          });

          this.handleCheckAll();
          this.havestu = true;
        }
      });
    },

    /**获取员工 */
    getallstaffList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getallstaff","").then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstaff = res.obj;
        }
      });
    },
    /**全选学员 */
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.paikestu.forEach((item) => {
          item._check = true;
          this.checkAllGroup.push(item.stuID);
        });
      } else {
        this.checkAllGroup = [];
      }
    },

    /**学员选择状态change */
    checkAllGroupChange(data) {
      this.paikestu[data]._check = !this.paikestu[data]._check;
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

    ok() {
      this.stuMessage = [];
      this.paikestu.forEach((item) => {
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
        return;
      } else {
        this.logForm.studatamesaage = JSON.stringify(this.stuMessage);
        this.logForm.tiankc = JSON.stringify(this.tiankc);
        this.dingjin.tiankc = this.logForm.tiankc;
        this.dingjin.newstu = this.logForm.studatamesaage;
        api.post("xwcloud-pkxk/paike/paikexiaoke/pdstudingjin",this.dingjin).then((res) => {
          if (res.code == "N" && res.success == true) {
            this.$Message.error(res.msg);
          } else {
            api.post("xwcloud-pkxk/paike/paikexiaoke/tiansavestukehao",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                //this.$Message.success(res.msg);
                //同时调用父页面的刷新页面的方法
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
    inputsearch() {
      this.stuMessage = [];
      this.getpaikexiaoekestu();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        this.havestu = false;
        this.GetcampusStuNameList();
        this.tiankc = [];
        this.paikestu = [];
        this.stuName = "";

        this.checkAll = false; //全部选中
        this.checkzj = false;
        this.kechengtime = ""; //课程时长
        this.stuMessage = []; //学员信息
        this.stuSum = 0; //排课学员数
        this.indeterminate = false;
        this.checkAllGroup = [];

        this.allstaff = []; //全部教师
        this.pkID = "";
        this.timeSum = 0;

        //当重新显示增加数据的时候重置整个form表单
        this.$refs["logForm"].resetFields();
        this.getdata = JSON.parse(this.pkdata);

        this.tiankc.push(JSON.parse(this.getdata.tiankc));
        this.pkID = this.tiankc[0].id;
        this.classType = this.tiankc[0].is1v1Class;
        this.kechengtime = this.tiankc[0].classTimeStyleName; //排课课程时长
        this.timeSum = this.getdata.timeSum;
        this.logForm.teacherKeshiNum = this.timeSum / this.kechengtime;
        this.getpaikexiaoekestu();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
