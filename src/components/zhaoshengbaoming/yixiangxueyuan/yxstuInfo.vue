<template>
  <Modal
    v-model="isShow"
    :title="title"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="80"
  >
    <Form ref="yxForm" :model="fromYX" :rules="formYXRule" :label-width="110">
      <Row>
        <Col span="8">
          <FormItem label="联系电话" prop="parentTel">
            <Input
              v-model="fromYX.parentTel"
              readonly
              placeholder="请输入联系电话"
            ></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="学生姓名" prop="stuName">
            <Input v-model="fromYX.stuName" readonly placeholder="请输入学生姓名"></Input>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="电话关系" prop="parentTelRelation">
            <Select v-model="fromYX.parentTelRelation" clearable filterable disabled>
              <Option value="1">本人</Option>
              <Option value="2">爸爸</Option>
              <Option value="3">妈妈</Option>
              <Option value="4">爷爷</Option>
              <Option value="5">奶奶</Option>
              <Option value="6">外公</Option>
              <Option value="7">外婆</Option>
              <Option value="8">保姆</Option>
              <Option value="9">其他</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="学员电话" prop="stuTel">
            <Input v-model="fromYX.stuTel" readonly placeholder="请输入学员电话"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="校区" prop="campusID">
            <Select v-model="fromYX.campusID" readonly clearable filterable>
              <Option v-for="campus in campusList" :key="campus.id" :value="campus.id">{{
                campus.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="年龄段/年级" prop="stuGradeID">
            <Select v-model="fromYX.stuGradeID" clearable filterable disabled>
              <Option
                v-for="stuGrade in stuGradeList"
                :key="stuGrade.id"
                :value="stuGrade.id"
                >{{ stuGrade.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="招生途径" prop="yxFromID">
            <Select v-model="fromYX.yxFromID" clearable filterable disabled>
              <Option
                v-for="telFrom in telFromList"
                :key="telFrom.id"
                :value="telFrom.id"
                >{{ telFrom.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="学员性别" prop="stuSex">
            <Select v-model="fromYX.stuSex" clearable filterable disabled>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="学员生日" prop="stubirth">
            <Date-picker
              disabled
              v-model="fromYX.stubirth"
              type="date"
              placeholder="选择学员生日"
              style="width: 100%"
            ></Date-picker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="意向科目" prop="yixiangkemu">
            <Select v-model="fromYX.yixiangkemu" clearable filterable disabled>
              <Option
                v-for="subject in subjectList"
                :key="subject.id"
                :value="subject.id"
                >{{ subject.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="意向程度" prop="yxLevelID">
            <Select v-model="fromYX.yxLevelID" clearable filterable disabled>
              <Option
                v-for="telLevel in telLevelList"
                :key="telLevel.id"
                :value="telLevel.id"
                >{{ telLevel.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="市场人" prop="yxshichangTeacherID">
            <Select v-model="fromYX.yxshichangTeacherID" clearable filterable disabled>
              <Option v-for="staff in staffList" :key="staff.id" :value="staff.id">{{
                staff.staffName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="学习情况" prop="stuXuexi">
            <Input
              type="textarea"
              v-model="fromYX.stuXuexi"
              readonly
              placeholder="请输入学习情况"
            ></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Collapse simple v-model="diyParamPanel">
            <Panel name="diyParamPanel">
              自定义字段
              <p slot="content">
                <Row>
                  <Col span="8" v-for="diyParam in diyShortParam" :key="diyParam.id">
                    <FormItem
                      :label="diyParam.stuparamtypename"
                      :prop="'diyParam_' + diyParam.id"
                    >
                      <Input
                        readonly
                        :placeholder="'请输入' + diyParam.stuparamtypename"
                        v-model="fromYX['diyParam_' + diyParam.id]['paramValue']"
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="8" v-for="diyParam in diySelectParam" :key="diyParam.id">
                    <FormItem
                      :label="diyParam.stuparamtypename"
                      :prop="'diyParam_' + diyParam.id"
                    >
                      <Select
                        clearable
                        filterable
                        disabled
                        v-model="fromYX['diyParam_' + diyParam.id]['paramValue']"
                      >
                        <Option
                          v-for="dropDown in dropDownOptions(diyParam.id)"
                          :key="dropDown.id"
                          :value="dropDown.id"
                          >{{ dropDown.dropDownOptions }}</Option
                        >
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="12" v-for="diyParam in diyLongParam" :key="diyParam.id">
                    <FormItem
                      :label="diyParam.stuparamtypename"
                      :prop="'diyParam_' + diyParam.id"
                    >
                      <Input
                        readonly
                        type="textarea"
                        v-model="fromYX['diyParam_' + diyParam.id]['paramValue']"
                        :placeholder="'请输入' + diyParam.stuparamtypename"
                      ></Input>
                    </FormItem>
                  </Col>
                </Row>
              </p>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
import toolbox from "@/libs/toolbox";
export default {
  name: "yxstuInfo",
  props: {
    title: { default: "", type: String },
    yxData: { default: "", type: Object },
    value: { default: false, type: Boolean },
    stuGradeList: { default: [], type: Array },
    telFromList: { default: [], type: Array },
    telLevelList: { default: [], type: Array },
    campusList: { default: [], type: Array },
    diyParamList: { default: [], type: Array },
    dropDownOptionList: { default: [], type: Array },
    subjectList: { default: [], type: Array },
    staffList: { default: [], type: Array },
  },
  data() {
    return {
      isShow: this.value,
      loading: true,
      diyParamPanel: "",
      fromYX: {
        id: null,
        parentTel: null,
        stuName: null,
        parentTelRelation: null,
        campusID: null,
        stuGradeID: null,
        stuTel: null,
        yxFromID: null,
        stubirth: null,
        yixiangkemu: null,
        stuSex: null,
        yxLevelID: null,
        yxshichangTeacherID: null,
        stuXuexi: null,
      },
      formYXRule: {
        parentTel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "change",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "change",
          },
        ],
        stuTel: [
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    diyShortParam: function () {
      return this.diyParamList.filter((diyParam) => {
        return diyParam.widthtype == 0;
      });
    },
    diyLongParam: function () {
      return this.diyParamList.filter((diyParam) => {
        return diyParam.widthtype == 1;
      });
    },
    diySelectParam: function () {
      return this.diyParamList.filter((diyParam) => {
        return diyParam.widthtype == 2;
      });
    },
    dropDownOptions: function () {
      return (id) => {
        return this.dropDownOptionList.filter((dropDownOption) => {
          return dropDownOption.stuParamTypeId == id && dropDownOption.isShow == 1;
        });
      };
    },
  },
  methods: {
    // ok() {
    //   this.$refs.yxForm.validate((valid) => {
    //     if (valid) {
    //       // this.$Message.success("通过!");
    //       let diyParam = [];
    //       let diyParam_temp = {};
    //       for (const key in this.fromYX) {
    //         if (
    //           Object.hasOwnProperty.call(this.fromYX, key) &&
    //           key.indexOf("_") > -1
    //         ) {
    //           const element = this.fromYX[key];
    //           if (element) {
    //             diyParam.push({
    //               id: element.id,
    //               stuParamTypeID: key.split("_")[1],
    //               paramValue: element.paramValue,
    //             });
    //           }
    //           diyParam_temp[key] = this.fromYX[key];
    //           delete this.fromYX[key];
    //         }
    //       }
    //       this.fromYX.diyParam = diyParam;
    //       // console.log(this.fromYX);
    //       // return;
    //       this.addYixiangStuInfo(this.fromYX).then((res) => {
    //         if (res.success) {
    //           this.$Message.success("操作成功");
    //           this.$emit("refreshPage", "refresh");
    //           this.closeModal();
    //           this.isShow = false;
    //           for (const key in diyParam_temp) {
    //             if (Object.hasOwnProperty.call(diyParam_temp, key)) {
    //               const element = diyParam_temp[key];
    //               this.fromYX[key] = element;
    //             }
    //           }
    //         } else {
    //           this.$Message.error(res.msg);
    //           this.loading = false;
    //           this.$nextTick(() => {
    //             this.loading = true;
    //           });
    //           for (const key in diyParam_temp) {
    //             if (Object.hasOwnProperty.call(diyParam_temp, key)) {
    //               const element = diyParam_temp[key];
    //               this.fromYX[key] = element;
    //             }
    //           }
    //         }
    //       });
    //     } else {
    //       this.$Message.error("请完善信息!");
    //       // console.log(this.diyParamList.find((val) => val.isbitian == 1));
    //       if (this.diyParamList.find((val) => val.isbitian == 1)) {
    //         this.diyParamPanel = "diyParamPanel";
    //       }
    //       this.loading = false;
    //       this.$nextTick(() => {
    //         this.loading = true;
    //       });
    //     }
    //   });
    // },
    closeModal(val) {
      this.diyParamPanel = "";
      this.$emit("input", val);
    },
    ok() {
      this.closeModal();
    },
    getDiyParamValueList(id) {
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getDiyParamValue/" + id, {}).then((res) => {
        // console.log(res);
        if (res.success) {
          let diyParamValueData = res.obj;
          for (const key in diyParamValueData) {
            if (Object.hasOwnProperty.call(diyParamValueData, key)) {
              const element = diyParamValueData[key];
              let attrNmae = "diyParam_" + element.stuParamTypeID;
              // console.log(attrNmae);
              this.fromYX[attrNmae] = element;
            }
          }
          // fromYX
          // console.log(this.fromYX)
        }
      });
    },
  },
  watch: {
    yxData(val) {
      console.log("yxData", val);
      if (val) {
        this.getDiyParamValueList(val.id);
        setTimeout(() => {
          for (const key in this.fromYX) {
            if (Object.hasOwnProperty.call(this.fromYX, key) && val[key]) {
              if (key == "stubirth") {
                this.fromYX[key] = toolbox.dateFtt(val[key], "yyyy-MM-dd");
              } else {
                this.fromYX[key] = val[key];
              }
            }
          }
        }, 100);
      }
    },
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.fromYX.id = null;
        this.$refs.yxForm.resetFields();
        setTimeout(() => {
          this.$refs.yxForm.resetFields();
        }, 10);
        // this.$refs.yxForm.resetFields();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    diyParamList(list) {
      console.log("pushRelu", list);
      list.forEach((diyParam, index) => {
        let attrName = "diyParam_" + diyParam.id;
        //push from
        if (!Object.hasOwnProperty.call(this.fromYX, attrName)) {
          this.fromYX[attrName] = {};
        }
        //push relu
        if (diyParam.isbitian == 1) {
          this.formYXRule[attrName] = [
            {
              required: true,
              message: "请输入" + diyParam.stuparamtypename,
              trigger: "change",
              validator: (rule, value, callback) => {
                // console.log("value",value);
                // console.log(this.fromYX[attrName]);
                return this.fromYX[attrName].paramValue ? true : false;
              },
            },
          ];
        }
      });
    },
  },
  mounted() {},
};
</script>
