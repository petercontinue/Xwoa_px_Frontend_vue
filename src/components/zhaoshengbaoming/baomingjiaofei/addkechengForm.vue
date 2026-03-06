<template>
  <Modal
    v-model="show"
    title="添加课程"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="80"
  >
    <Form
      ref="addkechengForm"
      :model="addkechengForm"
      :rules="addkechengFormRule"
      :label-width="170"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select
              v-model="addkechengForm.campusID"
              placeholder="请选择校区"
              @on-change="changeCampus"
              style="width: 100%"
            >
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="科目" prop="subjectID">
            <Select
              v-model="addkechengForm.subjectID"
              placeholder="请选择科目"
              @on-change="shengchengkechengName(1)"
              style="width: 100%"
            >
              <Option v-for="item in allkemu" :value="item.id" :key="item.id">
                {{ item.name }}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col
          span="4"
          style="text-align: left; padding-left: 5px; padding-top: 8px; color: #2d8cf0"
        >
          自定义设置
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="培训方式">
            <RadioGroup v-model="bxtype" @on-change="changebxType">
              <Radio label="一对一"></Radio>
              <Radio label="其他培训方式"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="6" v-if="bxtype == '其他培训方式'">
          <FormItem label="其他培训方式" prop="buxiStyleID">
            <Select
              v-model="addkechengForm.buxiStyleID"
              placeholder="请选择培训方式"
              style="width: 100%"
              @on-change="checkbuxi"
            >
              <Option v-for="item in allbuxistyleData" :value="item.id" :key="item.id">
                {{ item.name }}
              </Option>
            </Select>
          </FormItem></Col
        >
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="计费方式" prop="jifeiStyleID">
            <Select
              v-model="addkechengForm.jifeiStyleID"
              placeholder="请选择计费方式"
              @on-change="changejifeistyle"
              style="width: 100%"
            >
              <Option value="1">按课时计费</Option>
              <Option value="2">按课时包计费</Option>
              <Option value="3">按起止日期计费</Option>
            </Select>
          </FormItem>
        </Col>
        <Col
          span="4"
          style="text-align: left; padding-left: 5px; padding-top: 8px; color: #2d8cf0"
        >
          重要！【点这里】看说明
        </Col>
        <Col span="8">
          <FormItem
            label="课程时长"
            prop="classTimeStyleID"
            v-if="addkechengForm.jifeiStyleID != 3"
          >
            <Select
              v-model="addkechengForm.classTimeStyleID"
              placeholder="请选择课程时长"
              @on-change="shengchengkechengName(3)"
              style="width: 100%"
            >
              <Option
                v-for="item in allclasstimestyleData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>

          <FormItem
            label="课程时长"
            prop="classTimeStyleID"
            v-if="addkechengForm.jifeiStyleID == 3"
          >
            <Select
              v-model="addkechengForm.classTimeStyleID"
              placeholder="请选择课程时长"
              @on-change="shengchengkechengName(3)"
              style="width: 100%"
              disabled
            >
              <Option
                v-for="item in allclasstimestyleData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>

        <Col
          span="4"
          style="text-align: left; padding-left: 5px; padding-top: 8px; color: #2d8cf0"
        >
          重要！【点这里】看说明
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="课程名称" prop="kechengName">
            <Input
              type="text"
              v-model="addkechengForm.kechengName"
              placeholder="请输入课程名称"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="课程颜色" prop="kechengcolor">
            <Tooltip content="是指该课程在课表中的颜色" style="width: 100%">
              <ColorPicker
                v-model="addkechengForm.kechengcolor"
                recommend
                style="width: 100%"
              />
            </Tooltip>
          </FormItem>
        </Col>
        <Col
          span="4"
          style="text-align: left; padding-left: 5px; padding-top: 8px; color: #2d8cf0"
        >
          是课表中显示的课程背景颜色
        </Col>
      </Row>

      <Row v-if="priceShow">
        <Col span="12">
          <FormItem label="课时原单价" prop="kechengOriginalPrice">
            <Input
              type="text"
              v-model="addkechengForm.kechengOriginalPrice"
              placeholder="请输入课时原单价"
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="课时销售单价" prop="kechengprice">
            <Input
              type="text"
              v-model="addkechengForm.kechengprice"
              placeholder="请输入课时销售单价"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row v-if="showMonthNums">
        <Col span="12" v-if="addkechengForm.jifeiStyleID != 1">
          <FormItem label="费用计算单位">
            <RadioGroup v-model="addkechengForm.byMonthOrDay">
              <Radio label="1">按月数</Radio>
              <Radio label="2">按天数</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="课时数（月数）" prop="keshiNum">
            <Input
              type="text"
              v-model="addkechengForm.keshiNum"
              placeholder="请输入课时数（月数）"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row v-if="showzongjia">
        <Col span="12">
          <FormItem label="总价" prop="buyZonjia">
            <Input
              type="text"
              v-model="addkechengForm.buyZonjia"
              placeholder="请输入总价"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="6">
          <Tooltip
            placement="top"
            style="width: 100%"
            max-width="200"
            content="每多少天,可以请假多少次，如果不填，表示不限制"
          >
            <FormItem label="每" prop="perdaysqj">
              <InputNumber
                :max="1000"
                :min="1"
                :step="1"
                placeholder="请输入每多少天可以请假次数"
                v-model="addkechengForm.perdaysqj"
                style="width: 40%"
              ></InputNumber
              >天可以请假次数
            </FormItem>
          </Tooltip>
        </Col>
        <Col span="6">
          <Tooltip
            placement="top"
            style="width: 100%"
            max-width="200"
            content="每多少课时,可以请假多少次，如果不填，表示不限制"
          >
            <FormItem label="每" prop="perkeshiqj">
              <InputNumber
                :max="500"
                :min="1"
                :step="1"
                placeholder="请输入每多少课时可以请假次数"
                style="width: 40%"
                v-model="addkechengForm.perkeshiqj"
              ></InputNumber
              >课时可以请假次数
            </FormItem>
          </Tooltip>
        </Col>
        <Col span="4">
          <FormItem label="限制请假次数" prop="qingjiaTimes">
            <Tooltip content="该门课程可以请假的限制次数" style="width: 100%">
              <InputNumber
                :max="1000"
                :min="1"
                :step="1"
                placeholder="请输入总价"
                v-model="addkechengForm.qingjiaTimes"
                style="width: 100%"
              ></InputNumber>
            </Tooltip>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="请假是否扣课时" prop="iskoukeshi">
            <Select
              v-model="addkechengForm.iskoukeshi"
              placeholder="请选择"
              style="width: 100%"
            >
              <Option value="1">扣课时</Option>
              <Option value="0">不扣课时</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="课程备注信息" prop="kechengbeizhu">
            <Input
              type="textarea"
              v-model="addkechengForm.kechengbeizhu"
              placeholder="请输入课程备注信息"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="其他显示">
            <RadioGroup v-model="addkechengForm.showInApp">
              <Radio label="1">不显示到小程序</Radio>
              <Radio label="2">显示到小程序</Radio>
            </RadioGroup>
          </FormItem></Col
        >
        <Col span="12" v-if="addkechengForm.showInApp == '2'">
          <FormItem label="课程图片">
            <addgood-img @increment="changeImgs"></addgood-img>
          </FormItem>
        </Col>
      </Row>
      <Row v-if="addkechengForm.showInApp == '2'">
        <FormItem label="课程详情">
          <edit @increment="changeGoodsDetail"></edit>
        </FormItem>
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
import addgoodImg from "@/components/zhaoshengbaoming/wxmall/addgoodImg.vue";
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
export default {
  components: {
    addgoodImg,
    edit,
  },
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      bxtype: "一对一",
      onebyoneID: "",
      addkechengForm: {
        id: 0,
        campusID: "",
        subjectID: "",
        buxiStyleID: "",
        classTimeStyleID: "",
        jifeiStyleID: "",
        kechengName: "",
        iskoukeshi: "",
        addTime: "",
        addstaffID: "",
        beizhu: "",
        kechengcolor: "#DBF0FC",
        qingjiaTimes: 0,
        perdaysqj: 0,
        perkeshiqj: 0,
        is1v1KC: 1,
        kechengOriginalPrice: 0,
        kechengprice: 0,
        keshiNum: 0,
        buyZonjia: 0,
        qiyeID: "",
        kechengbeizhu: "",
        kechengImg: "",
        kechengcontent: "",
        showInApp: "1",
        byMonthOrDay: "1",
      },
      addkechengFormRule: {
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        subjectID: [
          {
            required: true,
            message: "请选择科目",
            trigger: "change",
            type: "string",
          },
        ],
        buxiStyleID: [
          {
            required: true,
            message: "请选择补习方式",
            trigger: "change",
            type: "string",
          },
        ],
        classTimeStyleID: [
          {
            required: true,
            message: "请选择课程时长",
            trigger: "change",
            type: "string",
          },
        ],
        jifeiStyleID: [
          {
            required: true,
            message: "请选择计费方式",
            trigger: "change",
            type: "string",
          },
        ],
        kechengName: [
          {
            required: true,
            message: "请输入课程名称",
            trigger: "change",
            type: "string",
          },
        ],
        kechengcolor: [
          {
            required: true,
            message: "请选择课程颜色",
            trigger: "change",
            type: "string",
          },
        ],
        keshiNum: [
          {
            required: true,
            message: "请输入课时数",
            trigger: "change",
            type: "string",
          },
        ],
        buyZonjia: [
          {
            required: true,
            message: "请输入课程总价",
            trigger: "change",
            type: "string",
          },
        ],
        is1v1KC: [
          {
            required: true,
            message: "请选择是不是一对一课程",
            trigger: "change",
            type: "string",
          },
        ],

        iskoukeshi: [
          {
            required: true,
            message: "请选择请假是否扣课时",
            trigger: "change",
            type: "string",
          },
        ],
        qingjiaTimes: [
          {
            required: true,
            message: "请输入请假次数",
            trigger: "change",
            type: "number",
          },
        ],
      },

      allcampusData: [],
      allkemu: [],
      allbuxistyleData: [],
      allclasstimestyleData: [],
      kemuText: "",
      buxistyleText: "",
      classtimeStyleText: "",
      jifeistyleText: "",
      priceShow: false, //课程单价框要不要显示
      showzongjia: false, //课程总价框要不要显示
      showMonthNums: false, //课程月数要不要显示
      qizhiriqiclassTimeStyleID: "",
    };
  },
  methods: {
    changebxType() {
      if (this.bxtype == "一对一") {
        this.addkechengForm.buxiStyleID = this.onebyoneID;
        this.addkechengForm.is1v1KC = 1;
      } else {
        this.addkechengForm.is1v1KC = 0;
      }
      this.shengchengkechengName(2);
    },
    checkbuxi() {
      this.buxistyleText = "";
      this.shengchengkechengName(2);
    },
    ok(type) {
      this.$refs["addkechengForm"].validate((valid) => {
        if (valid) {
          if (this.addkechengForm.id == 0) {
            api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/AddKechengInfo",{
              kechengName: this.addkechengForm.kechengName,
              subjectID: this.addkechengForm.subjectID,
              buxiStyleID: this.addkechengForm.buxiStyleID,
              is1v1KC: this.addkechengForm.is1v1KC,

              classTimeStyleID: this.addkechengForm.classTimeStyleID,
              kechengOriginalPrice: this.addkechengForm.kechengOriginalPrice,
              kechengprice: this.addkechengForm.kechengprice,
              keshiNum: this.addkechengForm.keshiNum,
              buyZonjia: this.addkechengForm.buyZonjia,
              isShow: 1,
              ZSid: null,
              jifeiStyleID: this.addkechengForm.jifeiStyleID,
              campusID: this.addkechengForm.campusID,
              bgColor: this.addkechengForm.kechengcolor,
              perdaysqj: this.addkechengForm.perdaysqj,
              perkeshiqj: this.addkechengForm.perkeshiqj,
              qingjiaTimes: this.addkechengForm.qingjiaTimes,
              iskoukeshi: this.addkechengForm.iskoukeshi,
              kechengImg: this.addkechengForm.kechengImg,
              kechengbeizhu: this.addkechengForm.kechengbeizhu,
              kechengcontent: this.addkechengForm.kechengcontent,
              showInApp: this.addkechengForm.showInApp,
              byMonthOrDay: this.addkechengForm.byMonthOrDay,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                if (type == 2) {
                  // 提交表单数据成功则关闭当前的modal框
                  this.closeModal(false);
                }
                this.$refs["addkechengForm"].resetFields();
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
                // 官方目前没有解决方案
                this.loading = false;
                setTimeout(() => {
                  this.loading = true;
                }, 0);
              }
            });
          } else {
            api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/UpdateKechengInf",{
              id: this.addkechengForm.id,
              kechengName: this.addkechengForm.kechengName,
              subjectID: this.addkechengForm.subjectID,
              buxiStyleID: this.addkechengForm.buxiStyleID,
              is1v1KC: this.addkechengForm.is1v1KC,
              classTimeStyleID: this.addkechengForm.classTimeStyleID,
              kechengOriginalPrice: this.addkechengForm.kechengOriginalPrice,
              kechengprice: this.addkechengForm.kechengprice,
              keshiNum: this.addkechengForm.keshiNum,
              buyZonjia: this.addkechengForm.buyZonjia,
              isShow: 1,
              ZSid: 0,
              jifeiStyleID: this.addkechengForm.jifeiStyleID,
              campusID: this.addkechengForm.campusID,
              qiyeID: this.addkechengForm.qiyeID,
              bgColor: this.addkechengForm.bgColor,
              perdaysqj: this.addkechengForm.perdaysqj,
              perkeshiqj: this.addkechengForm.perkeshiqj,
              qingjiaTimes: this.addkechengForm.qingjiaTimes,
              iskoukeshi: this.addkechengForm.iskoukeshi == "0" ? true : false,
              kechengImg: this.addkechengForm.kechengImg,
              kechengbeizhu: this.addkechengForm.kechengbeizhu,
              kechengcontent: this.addkechengForm.kechengcontent,
              showInApp: this.addkechengForm.showInApp,
              byMonthOrDay: this.addkechengForm.byMonthOrDay,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                if (type == 2) {
                  // 提交表单数据成功则关闭当前的modal框
                  this.closeModal(false);
                }
                this.$refs["addkechengForm"].resetFields();
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
                // 官方目前没有解决方案
                this.loading = false;
                setTimeout(() => {
                  this.loading = true;
                }, 0);
              }
            });
          }
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
    changeCampus() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllSubjectListBycampusID",{
        campusID: this.addkechengForm.campusID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allkemu = res.obj;
        }
      });
    },
    changejifeistyle() {
      if (this.addkechengForm.jifeiStyleID == 2) {
        this.showzongjia = true;
        this.priceShow = true;
        this.showMonthNums = true;
      } else if (this.addkechengForm.jifeiStyleID == 3) {
        this.addkechengForm.classTimeStyleID = this.qizhiriqiclassTimeStyleID; //按起止日期的课程课程时长只能是-2
        this.showzongjia = true;
        this.priceShow = true;
        this.showMonthNums = true;
      } else {
        //this.addkechengForm.jifeiStyleID == 1
        this.showzongjia = false;
        this.priceShow = false;
        this.showMonthNums = false;
      }
      this.shengchengkechengName(4);
    },
    shengchengkechengName(type) {
      if (type == "1") {
        this.allkemu.forEach((res) => {
          if (res.id == this.addkechengForm.subjectID) {
            this.kemuText = res.name;
          }
        });
      } else if (type == 2) {
        if (this.bxtype == "一对一") {
          this.buxistyleText = "一对一";
        } else {
          this.allbuxistyleData.forEach((item) => {
            if (item.id == this.addkechengForm.buxiStyleID) {
              this.buxistyleText = item.name;
            }
          });
        }
      } else if (type == 3) {
        this.allclasstimestyleData.forEach((item) => {
          if (item.id == this.addkechengForm.classTimeStyleID) {
            this.classtimeStyleText = item.name;
          }
        });
      } else if (type == 4) {
        if (this.addkechengForm.jifeiStyleID == "1") {
          this.jifeistyleText = "按课时计费";
        } else if (this.addkechengForm.jifeiStyleID == "2") {
          this.jifeistyleText = "按课时包计费";
        } else if (this.addkechengForm.jifeiStyleID == "3") {
          this.jifeistyleText = "按起止日期计费";
        }
      }
      if (
        this.kemuText != "" &&
        this.buxistyleText != "" &&
        this.classtimeStyleText != "" &&
        this.jifeistyleText != ""
      ) {
        this.addkechengForm.kechengName =
          this.kemuText +
          this.buxistyleText +
          "(" +
          this.classtimeStyleText +
          ")" +
          this.jifeistyleText;
      }
    },
    changeGoodsDetail(data) {
      this.addkechengForm.kechengcontent = data;
    },
    changeImgs(data) {
      this.addkechengForm.kechengImg = JSON.parse(data).url;
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["addkechengForm"].resetFields();
        if (this.editData != "") {
          api.get("xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetKechengInfoById",{ Id: JSON.parse(this.editData).id }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              console.log("============GetKechengInfoById:");
              console.log(res.obj);
              this.addkechengForm.id = res.obj.id;
              this.addkechengForm.campusID = res.obj.campusID;
              api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllSubjectListBycampusID",{
                campusID: res.obj.campusID,
              }).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.allkemu = res.obj;
                }
              });
              this.addkechengForm.subjectID = res.obj.subjectID;
              this.addkechengForm.buxiStyleID = res.obj.buxiStyleID;
              this.addkechengForm.classTimeStyleID = res.obj.classTimeStyleID;
              this.addkechengForm.kechengcolor = res.obj.bgColor;
              this.addkechengForm.kechengName = res.obj.kechengName;
              this.addkechengForm.iskoukeshi = res.obj.iskoukeshi == true ? "0" : "1";
              this.addkechengForm.perdaysqj = res.obj.perdaysqj;
              this.addkechengForm.perkeshiqj = res.obj.perkeshiqj;
              this.addkechengForm.kechengOriginalPrice = res.obj.kechengOriginalPrice;
              this.addkechengForm.kechengprice = res.obj.kechengprice;
              this.addkechengForm.keshiNum = res.obj.keshiNum;
              if (res.obj.jifeiStyleID != 1) {
                this.showMonthNums = true;
              }
              this.addkechengForm.buyZonjia = res.obj.buyZonjia;
              this.addkechengForm.jifeiStyleID = res.obj.jifeiStyleID + "";

              this.addkechengForm.showInApp = res.obj.showInApp + "";
              this.addkechengForm.ZSid = res.obj.ZSid;
              this.addkechengForm.qiyeID = res.obj.qiyeID;
              this.addkechengForm.kechengbeizhu = res.obj.kechengbeizhu;
              this.addkechengForm.bgColor = res.obj.bgColor;
              this.addkechengForm.qingjiaTimes = res.obj.qingjiaTimes;
              this.addkechengForm.byMonthOrDay = res.obj.byMonthOrDay + "";

              this.changebxType();
            }
          });
        }
        api.post("/xwcloud-sys/sys/pxassets/addAssetInf",{ menuID: 146 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        this.GetAllBuxistyleList({}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allbuxistyleData = [];
            res.obj.forEach((item) => {
              if (item.name != "一对一") {
                this.allbuxistyleData.push(item);
              } else {
                this.onebyoneID = item.id;
                this.addkechengForm.buxiStyleID = this.onebyoneID;
                this.buxistyleText = "一对一";
                //console.log(this.onebyoneID);
              }
            });
          }
        });
        api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllClassTimeStyleList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allclasstimestyleData = res.obj;

            res.obj.forEach((item) => {
              if (item.name == "一天") {
                this.qizhiriqiclassTimeStyleID = item.id;
                this.classtimeStyleText = "一天";
              }
            });
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
