<template>
  <div>
    <Alert show-icon style="margin-top: 0px">
      <Icon type="ios-bulb-outline" slot="icon"></Icon>
      <Col>
        <span>温馨提示：</span>
      </Col>
      <Col style="margin-top: 10px">
        <span
          >1、本功能适用于没有排课，直接消课的情况。比如学员临时补课或加课，或批量消以前老学员以前上过的课时；</span
        >
      </Col>
      <Col style="margin-top: 10px">
        <span>2、消课时临时增减学员消课，不会改变学员的插班，只进行临时消课；</span>
      </Col>
      <Col style="margin-top: 10px">
        <span>
          3、本页面的权限请务必设置成
          <font color="red">校区级的权限</font>
          （所在校区或指定校区或全部校区）
        </span>
      </Col>
    </Alert>

    <Card :bordered="false">
      <Form
        ref="nopaikeData"
        :model="nopaikeData"
        :rules="ruleValidate"
        label-position="right"
        :label-width="120"
        :label-colon="true"
      >
        <Row style="margin-top: 20px">
          <Col span="8">
            <FormItem label="课程" prop="kechengID">
              <Select
                filterable
                v-model="nopaikeData.kechengID"
                placeholder="请选择课程"
                @on-change="getclassTiem"
              >
                <Option v-for="item in allkechengData" :value="item.id" :key="item.id">{{
                  item.kechengName
                }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="班级" prop="classidStr">
              <Select
                v-model="nopaikeData.classidStr"
                filterable
                placeholder="请选择班级"
                @on-change="getclassType"
              >
                <Option v-for="item in allclass" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8">
            <FormItem label="教师" prop="shangketeacher">
              <Select
                v-model="nopaikeData.shangketeacher"
                placeholder="请选择教师"
                filterable
              >
                <Option v-for="item in allstaff" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="助教(选填)">
              <Select
                filterable
                v-model="nopaikeData.zhujiaoteacher"
                placeholder="请选择助教"
              >
                <Option v-for="item in allstaff" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row>
          <Col span="8">
            <FormItem label="上课日期" prop="shangkedate">
              <DatePicker
                type="date"
                v-model="nopaikeData.shangkedate"
                format="yyyy-MM-dd"
                placeholder="请选择上课日期"
                style="width: 100%"
                @on-change="cfday"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="上课时间" prop="startLessonDateTime">
              <TimePicker
                v-model="nopaikeData.startLessonDateTime"
                format="HH:mm"
                placeholder="请选择上课时间"
                style="width: 100%"
              ></TimePicker>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="下课时间" prop="endLessonDateTime">
              <TimePicker
                v-model="nopaikeData.endLessonDateTime"
                format="HH:mm"
                placeholder="请选择下课时间"
                style="width: 100%"
              ></TimePicker>
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="5">
            <FormItem label="批量消课">
              重复
              <InputNumber :min="1" v-model="cfnum" @on-change="cfday"></InputNumber>
              <RadioGroup v-model="cftype" @on-change="dayType">
                <Radio label="1">周</Radio>
                <Radio label="2">天</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="批量消课">
              <Checkbox v-model="single"
                >是否检测该消课(当前选择的课程、班级、上课日期、上课时间)是否已有排课记录</Checkbox
              >
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="20">
            <FormItem label="消课日期">
              <Col span="24">
                <span>
                  <Tag
                    v-for="(item, i) in allriqiData"
                    :key="item"
                    :name="item"
                    closable
                    @on-close="handleClose(i)"
                    >{{ item }}
                  </Tag>
                </span>
              </Col>
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="20">
            <FormItem label="说明(选填)">
              <Input
                v-model="nopaikeData.shuoming"
                type="textarea"
                :rows="3"
                placeholder="请输入备注内容..."
              />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row style="margin-bottom: 30px">
        <Col span="20" offset="2">
          <Button type="primary" icon="ios-list-box" @click="getstuMd"
            >添加学员考勤</Button
          >
        </Col>
      </Row>

      <Nopaikestu
        v-model="stuShow"
        :pkdata="allData"
        v-on:handleSearch="getxkdy"
      ></Nopaikestu>
      <xiaokedaying v-model="xkdyShow"></xiaokedaying>
    </Card>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import Nopaikestu from "@/components/jiaowuManage/paikexiaoke/Nopaikestu";
import xiaokedaying from "@/components/jiaowuManage/paikexiaoke/xiaokedaying";
import * as api from "@/api/api.js";

export default {
  components: {
    Nopaikestu,
    xiaokedaying,
  },
  data() {
    return {
      single: true,
      stuShow: false,
      pkxkShow: false,
      xkdyShow: false,
      lookkaoqingShow: false,
      xksetting: "", //是否设置消课后显示打印
      pkcheck: "",
      cfnum: 1,
      cftype: "1",

      checkList: {
        teacher: "",
        haveclassDate: "",
        startLessonDateTime: "",
        endLessonDateTime: "",
        classID: "",
      },
      allData: "", //传给对话框去不排课消课的全部数据
      pkxkDataStr: "", //传给排课消课弹出数据
      pkxkData: {
        // pkID: "",
        // classTime: -1,
        timeSum: 0,
        tiankc: "",
      },
      kqdateStr: "",
      allcampusData: [], //校区查询获取到的校区数据
      allkechengData: [], //课程
      allclass: [], //班级
      allstaff: [], //老师
      nopaikeData: {
        classidStr: "",
        shangkedate: "",
        shangketeacher: "",
        startLessonDateTime: "",
        endLessonDateTime: "",
        zhujiaoteacher: "",
        kechengID: "",
        classTimeNum: "", //课程时长
        shuoming: "",
        allriqi: "",
        classType: "",
      },
      ruleValidate: {
        kechengID: [{ required: true, message: "请选择课程", trigger: "change" }],
        classidStr: [{ required: true, message: "请选择班级", trigger: "change" }],
        shangketeacher: [{ required: true, message: "请选择老师", trigger: "change" }],
        shangkedate: [
          {
            required: true,
            type: "string",
            message: "请选择上课日期",
            trigger: "change",
          },
        ],
        startLessonDateTime: [
          { required: true, message: "请选择上课时间", trigger: "change" },
        ],
        endLessonDateTime: [
          { required: true, message: "请选择下课时间", trigger: "change" },
        ],
      },
      allriqiData: [], //批量日期
    };
  },
  methods: {
    getclassType() {
      this.nopaikeData.classType = "";
      this.allclass.forEach((item) => {
        if (item.id == this.nopaikeData.classidStr) {
          this.nopaikeData.classType = item.is1v1Class;
        }
      });
    },

    /**
     * 根据校区获取课程
     */
    getallkechengByCampusIdList() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/GetAllkechengInfoByQuanxian", {})
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allkechengData = res.obj;
          }
        });
    },

    /**
     * 获取班级数据
     */
    getNOpaikegetclassList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/NOpaikegetclass", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allclass = res.obj;
        }
      });
    },

    /**
     * 获取全部在职员工
     */
    getallstaffList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getallstaff", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstaff = res.obj;
        }
      });
    },

    /**消课打印设置 */
    getxiaokedayingsyssetting() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getxiaokedaying", {}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.xksetting = res.obj;
        }
      });
    },

    /**检测排课冲突 */
    checkIsHavePaike() {
      this.stuShow = false;
      this.allData = "";
      this.checkList.haveclassDate = this.nopaikeData.allriqi;
      console.log(this.checkList);
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/IsHavePaike", this.checkList)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.pkcheck = res.msg;

            //this.nopaikeData.allriqi = JSON.stringify(this.allriqiData);
            console.log(this.nopaikeData.allriqi);
            if (this.pkcheck == "没有冲突") {
              this.stuShow = true;
              this.allData = JSON.stringify(this.nopaikeData);
            } else {
              this.$Modal.info({
                title: "排课检测",
                content: "<p>" + this.pkcheck + "</p>",
                closable: true,
                onOk: () => {},
                onCancel: () => {},
              });
            }
          }
        });
    },

    /**课程时长 */
    getclassTimeList() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getclassTime", {
          kechengID: this.nopaikeData.kechengID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.nopaikeData.classTimeNum = res.obj;
            console.log(res.obj);
          }
        });
    },

    /**循环添加消课日期 */
    cfday() {
      if (this.nopaikeData.shangkedate == "") {
        this.$Message.info("请选择上课日期");
      } else {
        this.allriqiData = [];
        this.nopaikeData.allriqi = "";
        this.nopaikeData.shangkedate = toolbox.dateFtt(
          this.nopaikeData.shangkedate,
          "yyyy-MM-dd"
        );

        let date = new Date(this.nopaikeData.shangkedate);
        let tsdate = date;

        this.allriqiData.push(toolbox.dateFtt(date, "yyyy-MM-dd"));
        this.nopaikeData.allriqi = toolbox.dateFtt(date, "yyyy-MM-dd") + ",";
        if (this.cfnum > 1) {
          if (this.cftype == "1") {
            //循环周
            for (var i = 0; i < this.cfnum - 1; i++) {
              let datehave = toolbox.dateFtt(
                date.setDate(date.getDate() - 7),
                "yyyy-MM-dd"
              );
              // tsdate = datehave;
              this.allriqiData.push(datehave);
              this.nopaikeData.allriqi += datehave + ",";
            }
          } else if (this.cftype == "2") {
            //循环天
            for (var i = 0; i < this.cfnum - 1; i++) {
              let datehave = toolbox.dateFtt(
                date.setDate(date.getDate() - 1),
                "yyyy-MM-dd"
              );
              // tsdate = datehave;
              this.allriqiData.push(datehave);
              this.nopaikeData.allriqi += datehave + ",";
            }
          }
        }
      }
    },

    dayType() {
      this.cfday();
    },

    /**
     * 弹出不排课消课学员信息
     */
    getstuMd() {
      this.$refs["nopaikeData"].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.checkList.teacher = this.nopaikeData.shangketeacher;
          this.checkList.haveclassDate = this.nopaikeData.shangkedate;
          this.checkList.startLessonDateTime = this.nopaikeData.startLessonDateTime;
          this.checkList.endLessonDateTime = this.nopaikeData.endLessonDateTime;
          this.checkList.classID = Number(this.nopaikeData.classidStr);

          this.checkIsHavePaike(); //去检测排课
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    /**查看学员考勤 */
    lookstukaoqing(value) {
      this.kqdateStr = JSON.stringify(value.row);
      this.lookkaoqingShow = true;
    },

    /**获取课程时长 */
    getclassTiem() {
      this.getclassTimeList();
    },

    /***获取打印设置 */
    getxkdy() {
      //  nopaikeData
      this.$refs["nopaikeData"].resetFields();
      this.allriqiData = [];
      this.cftype = "1";
      this.cfnum = 1;

      if (this.xksetting == "是") {
        this.xkdyShow = true;
      }
    },

    handleClose(ind) {
      console.log(ind);
      if (this.allriqiData.length > 1) {
        this.allriqiData.splice(ind, 1);
      } else {
        this.$Message.error("单上课日期不允许删除!");
      }
    },
  },
  mounted: function () {
    this.getallkechengByCampusIdList();
    this.getNOpaikegetclassList();
    this.getallstaffList();
  },
};
</script>
