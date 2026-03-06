<template>
  <Modal
    v-model="show"
    title="添加优惠政策"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="活动校区" prop="campusID">
            <Select
              v-model="shezhiForm.campusID"
              placeholder="请选择校区"
              style="width: 100%"
            >
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="优惠类型" prop="youhuiType">
            <Select
              v-model="shezhiForm.youhuiType"
              placeholder="请选择优惠类型"
              @on-change="changeyouhuiType"
              style="width: 100%"
            >
              <Option v-for="item in allyouhuiType" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="活动年级">
            <Row>
              <Col span="6">
                <RadioGroup v-model="gradetype" @on-change="editgradesType">
                  <Radio label="全部年级"></Radio>
                  <Radio label="指定年级"></Radio>
                </RadioGroup>
              </Col>
              <Col span="12" v-if="gradeShow">
                <FormItem label prop="stuGradeIDs">
                  <Select
                    v-model="shezhiForm.stuGradeIDs"
                    placeholder="请选择年级"
                    multiple
                    style="width: 100%"
                  >
                    <Option
                      v-for="item in allcampusGrades"
                      :value="item.id"
                      :key="item.id"
                      >{{ item.stugradename }}</Option
                    >
                  </Select>
                </FormItem>
              </Col>
              <Col span="6" style="text-align: left; padding-left: 5px" v-if="gradeShow">
                <label style="color: #2d8cf0">可多选</label>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="开始时间" prop="startDateTime">
            <DatePicker
              type="date"
              placeholder="请选择开始时间"
              v-model="shezhiForm.startDateTime"
              style="width: 100%"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="结束时间" prop="endDatetime">
            <DatePicker
              type="date"
              placeholder="请选择结束时间"
              v-model="shezhiForm.endDatetime"
              style="width: 100%"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="条件金额" prop="xianzhijine">
            <InputNumber
              :max="1000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.xianzhijine"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="10" style="text-align: left; padding-left: 5px; padding-top: 8px">
          <label style="color: #2d8cf0">是指达到多少金额才享受优惠</label>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="减多少钱/打几折" prop="youhui">
            <InputNumber
              :max="maxyouhui"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.youhui"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="10" style="text-align: left; padding-left: 5px; padding-top: 8px">
          <label style="color: #2d8cf0"
            >打几折或减多少钱;
            例：打9折请输入9，打8.5折请输入8.5；减钱200元请输入200</label
          >
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="使用次数限制">
            <Row>
              <Col span="6">
                <RadioGroup v-model="timeType" @on-change="editTimeType">
                  <Radio label="不限次数"></Radio>
                  <Radio label="限制次数"></Radio>
                </RadioGroup>
              </Col>
              <Col span="12" v-if="timesShow">
                <FormItem prop="useTimes">
                  <InputNumber
                    :max="1000000"
                    :min="-1"
                    :step="1"
                    v-model="shezhiForm.useTimes"
                    style="width: 100%"
                  ></InputNumber>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    kechengID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        campusID: "",
        youhuiType: "",
        stuGradeIDs: "",
        startDateTime: "",
        endDatetime: "",
        xianzhijine: 0.01,
        youhui: 0.01,
        useTimes: -1,
      },
      gradetype: "全部年级",
      gradeShow: false,
      timeType: "不限次数",
      timesShow: false,
      shezhiFormRule: {
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        youhuiType: [
          {
            required: true,
            message: "请选择优惠类型",
            trigger: "change",
            type: "string",
          },
        ],
        stuGradeIDs: [
          {
            required: true,
            message: "请选择年级",
            trigger: "change",
            type: "array",
          },
        ],
        startDateTime: [
          {
            required: true,
            message: "请选择开始时间",
            trigger: "change",
            type: "date",
          },
        ],
        endDatetime: [
          {
            required: true,
            message: "请选择结束时间",
            trigger: "change",
            type: "date",
          },
        ],
        xianzhijine: [
          {
            required: true,
            message: "请输入限制金额",
            trigger: "change",
            type: "number",
          },
        ],
        youhui: [
          {
            required: true,
            message: "请输入优惠金额/折扣",
            trigger: "change",
            type: "number",
          },
        ],
      },
      allcampusData: [],
      allcampusGrades: [],
      allyouhuiType: [
        { id: "1", name: "打折" },
        { id: "2", name: "减钱" },
      ],
      maxyouhui: 100000,
    };
  },
  methods: {

    editgradesType() {
      console.log(this.gradetype);
      if (this.gradetype == "全部年级") {
        this.shezhiForm.stuGradeIDs = -1;
        this.gradeShow = false;
      } else if (this.gradetype == "指定年级") {
        this.gradeShow = true;
      }
    },
    editTimeType() {
      console.log(this.timeType);
      if (this.timeType == "不限次数") {
        this.shezhiForm.useTimes = -1;
        this.timesShow = false;
      } else if (this.timeType == "限制次数") {
        this.timesShow = true;
      }
    },

    ok(closeFlag) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          let nianji = "";
          if (this.gradetype == "全部年级") {
            nianji = "-1";
          } else if (this.gradetype == "指定年级") {
            this.shezhiForm.stuGradeIDs.forEach((element) => {
              nianji += element + ",";
            });

            //nianji = nianji.substring(0, nianji.length - 1);
          }
          api.post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddYouhuizhengCe",{
            youhuiType: this.shezhiForm.youhuiType,
            xianzhijine: this.shezhiForm.xianzhijine,
            youhui: this.shezhiForm.youhui,
            startDateTime: this.shezhiForm.startDateTime,
            endDatetime: this.shezhiForm.endDatetime,
            campusID: this.shezhiForm.campusID,
            stuGradeIDs: nianji,
            useTimes: this.shezhiForm.useTimes,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              if (closeFlag == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
              this.gradetype = "全部年级";
              this.timeType = "不限次数";
              this.shezhiForm.useTimes = -1;
              this.$refs["shezhiForm"].resetFields();
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
        }
      });
    },
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
    },
    changeyouhuiType() {
      if (this.shezhiForm.youhuiType == "1") {
        this.maxyouhui = 10;
      } else {
        this.maxyouhui = 100000;
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shezhiForm"].resetFields();
        this.gradetype = "全部年级";
        this.timeType = "不限次数";
        this.shezhiForm.useTimes = -1;
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 149 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("/xwcloud-sys/sys/SystemSetting/GetAllStuGradeList",{ campusID: this.shezhiForm.campusID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusGrades = res.obj;
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
