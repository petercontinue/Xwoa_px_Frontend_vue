<template>
  <Modal v-model="show" title="修改学员" :mask-closable="false" width="60">
    <div v-if="haveInfo">
      <Form ref="edit" :model="edit" :rules="logFormRule" :label-width="100">
        <Row>
          <Col span="20" style="text-align: right">
            <Content :style="{ background: '#fff' }">
              <Row class="row">
                <Col span="10" class="col" offset="1">
                  <FormItem label="自定义学号：">
                    <Input v-model="edit.zidingyiStuID" />
                  </FormItem>
                </Col>
                <Col span="10" class="col" offset="1">
                  <FormItem label="学员姓名：" prop="stuName">
                    <Input v-model="edit.stuName" />
                  </FormItem>
                </Col>
              </Row>

              <Row class="row">
                <Col span="10" class="col" offset="1">
                  <FormItem label="联系电话：" prop="parentTel">
                    <Input v-model="edit.parentTel" maxlength="11" />
                  </FormItem>
                </Col>
                <Col span="10" class="col" offset="1">
                  <FormItem label="联系人关系：">
                    <Select
                      v-model="edit.parentTelRelation"
                      placeholder="请选择"
                      style="text-align: left"
                    >
                      <Option
                        v-for="item in parentTelRelationList"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
              </Row>

              <Row class="row">
                <Col span="10" class="col" offset="1">
                  <FormItem label="学员校区:" prop="campusID">
                    <Select
                      v-model="edit.campusID"
                      placeholder="请选择校区"
                      style="text-align: left"
                    >
                      <Option
                        v-for="item in allcampusData"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</Option
                      >
                    </Select>
                  </FormItem>
                </Col>
                <Col span="10" class="col" offset="1">
                  <FormItem label="学员年级:" prop="stuGradeID">
                    <Select
                      v-model="edit.stuGradeID"
                      placeholder="请选择年级"
                      style="text-align: left"
                    >
                      <Option v-for="item in stugrade" :value="item.id" :key="item.id">{{
                        item.name
                      }}</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row class="row">
                <Col span="10" class="col" offset="1">
                  <FormItem label="学员性别:">
                    <Select
                      v-model="edit.stuSex"
                      placeholder="请选择性别"
                      style="text-align: left"
                    >
                      <Option v-for="item in sex" :value="item.name" :key="item.id">{{
                        item.name
                      }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="10" class="col" offset="1">
                  <FormItem label="学员生日:">
                    <DatePicker
                      type="date"
                      v-model="edit.stubirth"
                      format="yyyy-MM-dd"
                      placeholder="请选择学员生日"
                    ></DatePicker>
                  </FormItem>
                </Col>
              </Row>
              <Row class="row">
                <Col span="10" class="col" offset="1">
                  <FormItem label="学员电话:">
                    <Input v-model="edit.stuTel" @on-blur="checkMobile(edit.parentTel)" />
                  </FormItem>
                </Col>
                <Col span="10" class="col" offset="1">
                  <FormItem label="学员年龄:">
                    <Input v-model="nianling" disabled />
                  </FormItem>
                </Col>
              </Row>
              <Row class="row">
                <Col span="10" class="col" offset="1">
                  <FormItem label="录入人:">
                    <Select
                      filterable
                      v-model="edit.dengjiTeacherID"
                      placeholder="请选登记人"
                      style="text-align: left"
                    >
                      <Option v-for="item in allstaff" :value="item.id" :key="item.id">{{
                        item.name
                      }}</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="10" class="col" offset="1">
                  <FormItem label="录入时间:">
                    <Input v-model="dengjiTime" disabled />
                  </FormItem>
                </Col>
              </Row>
              <Row class="row">
                <Col span="10" class="col" offset="1">
                  <FormItem label="原就读学校:">
                    <Input v-model="edit.oldSchool" />
                  </FormItem>
                </Col>
                <Col span="10" class="col" offset="1">
                  <FormItem label="合作老师:">
                    <Input v-model="edit.oldSchoolTeacher" />
                  </FormItem>
                </Col>
              </Row>
              <Row class="row">
                <Col span="22" class="col" offset="1">
                  <FormItem label="备注:">
                    <Input v-model="edit.stuXuexi" type="textarea" :rows="2" />
                  </FormItem>
                </Col>
              </Row>
            </Content>
          </Col>
          <Col span="4" style="text-align: left">
            <Avatar class="ava" v-model="edit.stuPhoto" />
          </Col>
        </Row>
      </Form>

      <Collapse simple v-model="value1">
        <Panel name="1">
          自定义字段
          <div slot="content">
            <Card class="allparam">
              <Form
                ref="allstuParams"
                v-model="allstuParams"
                :label-width="100"
                :label-colon="true"
              >
                <Row>
                  <div v-for="(item, index) in allstuParams.items" :key="index">
                    <Col span="8" v-if="item.widthType == 0 || item.widthType == null">
                      <FormItem
                        :label="'* ' + item.stuParamTypeName"
                        v-if="item.isBiTian == true"
                        :prop="'items.' + index + '.pvalue'"
                      >
                        <!-- :rules="{
                          required: true,
                          type: 'string',
                          message: '必填项',
                          trigger: 'change',
                        }" -->
                        <Input v-model="item.pvalue" type="text" />
                      </FormItem>

                      <FormItem
                        :label="item.stuParamTypeName"
                        v-if="item.isBiTian == false"
                      >
                        <Input v-model="item.pvalue" />
                      </FormItem>
                    </Col>

                    <Col span="16" v-if="item.widthType == 1">
                      <FormItem
                        :label="'* ' + item.stuParamTypeName"
                        v-if="item.isBiTian == true"
                        :prop="'items.' + index + '.pvalue'"
                      >
                        <!-- :rules="{
                          required: true,
                          type: 'string',
                          message: '必填项',
                          trigger: 'change',
                        }" -->
                        <Input v-model="item.pvalue" type="textarea" />
                      </FormItem>

                      <FormItem
                        :label="item.stuParamTypeName"
                        v-if="item.isBiTian == false"
                      >
                        <Input v-model="item.pvalue" type="textarea" />
                      </FormItem>
                    </Col>

                    <Col span="8" v-if="item.widthType == 2">
                      <FormItem
                        :label="'* ' + item.stuParamTypeName"
                        v-if="item.isBiTian == true"
                        :prop="'items.' + index + '.pvalue'"
                      >
                        <!-- :rules="{ required: true, type: 'string', message: '必填项',
                        trigger: 'change', }" -->
                        <Select v-model="item.pvalue" style="width: 200px">
                          <Option
                            v-for="item2 in selectValue[item.pid]"
                            :value="item2.id"
                            :key="item2.id"
                            >{{ item2.name }}</Option
                          >
                        </Select>
                      </FormItem>

                      <FormItem
                        :label="item.stuParamTypeName"
                        v-if="item.isBiTian == false"
                      >
                        <Select v-model="item.pvalue" style="width: 200px">
                          <Option
                            v-for="item2 in selectValue[item.pid]"
                            :value="item2.id"
                            :key="item2.id"
                            >{{ item2.name }}</Option
                          >
                        </Select>
                      </FormItem>
                    </Col>
                  </div>
                </Row>
              </Form>
            </Card>
          </div>
        </Panel>
      </Collapse>
    </div>
    <div slot="footer">
      <Button type="primary" @click="saveEditStu('edit')">保存</Button>
      <Button @click="handleReset('edit')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.row {
  margin-top: 15px;
}
.col {
  text-align: right;
  line-height: 32px;
  font-family: 黑体;
  font-weight: bolder;
}
.ava {
  margin-top: 10px;
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
export default {
  name: "editStu",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
  },
  data() {
    return {
      value1: "",
      oldtelNum: "",
      oldstuTel: "",
      show: this.value,
      loading: true,
      haveInfo: false,
      birth: "",
      data: [], // 接口数据接收
      stugrade: [], //学员年级
      allcampusData: [], //校区查询获取到的校区数据
      allstuParams: {
        items: [
          // {
          //   id: "-1",
          //   isBiTian: false,
          //   pid: null,
          //   pvalue: null,
          //   qiyeID: "",
          //   stuParamTypeName: "假数据",
          //   widthType: "0",
          // },
        ],
      },
      allstuParam: [],
      //学员自定义字段
      allstuValue: [],
      selectValue: [],
      sex: [
        { id: 1, name: "男" },
        { id: 2, name: "女" },
      ],
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
      allstaff: [], //老师
      params: {
        current: 1,
        size: 10,
        stuID: "",
      },
      nianling: 0,
      dengjiTime: "",
      edit: {
        stuID: 0,
        zidingyiStuID: "",
        stuName: "",
        parentTel: "",
        campusID: 0,
        stuSex: "",
        parentTelRelation: "",
        // buxiStateID:0,
        stuGradeID: 0,
        // jifenNum:"",
        stubirth: "",
        stuTel: "",
        oldSchool: "",
        oldSchoolTeacher: "",
        // luruType:0,
        dengjiTeacherID: 0,
        oldTeacherTel: "",
        alldata: "",
      },
      logFormRule: {
        stuName: [{ required: true, message: "请输入学员姓名", trigger: "blur" }],
        stuGradeID: [{ required: true, message: "请选择年级", trigger: "change" }],
        parentTel: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            type: "string",
            max: 11,
            message: "请输入不超过11位的联系电话",
            trigger: "blur",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
        campusID: [{ required: true, message: "请选择校区", trigger: "change" }],
      },
    };
  },
  methods: {
    ...mapActions([
      "getkehaoInfoPage",
      "getstuInfoPage",
      "Getnianji",
      "getallcampusList",
      "getallstaff",
      "UpdateStu",
      "Getstuparamtype",
      "Getselectparamvalue",
    ]),

    getstuInfo() {
      this.getstuInfoPage(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj[0];
          this.edit.stuID = res.obj[0].id;
          this.edit.zidingyiStuID = res.obj[0].zidingyiStuID;
          this.edit.stuName = res.obj[0].stuName;
          this.edit.parentTel = res.obj[0].parentTel;
          this.oldtelNum = res.obj[0].parentTel;
          this.edit.parentTelRelation = res.obj[0].parentTelRelation;
          this.edit.campusID = res.obj[0].campusID;
          this.edit.stuGradeID = res.obj[0].stuGradeID;
          this.edit.stuSex = res.obj[0].stuSex;

          if (res.obj[0].stubirth == null || res.obj[0].stubirth == "") {
            this.edit.stubirth = "";
          } else {
            this.edit.stubirth = toolbox.dateFtt(res.obj[0].stubirth, "yyyy-MM-dd");
          }
          this.edit.stuTel = res.obj[0].stuTel;
          this.oldstuTel = res.obj[0].stuTel;
          this.edit.dengjiTeacherID = res.obj[0].dengjiTeacherID;

          this.edit.oldSchool = res.obj[0].oldSchoolName;
          this.edit.oldSchoolTeacher = res.obj[0].oldSchoolTeacherName;
          this.nianling = res.obj[0].nianling;
          this.dengjiTime = toolbox.dateFtt(res.obj[0].dengjiTime, "yyyy-MM-dd");

          this.edit.stuXuexi = res.obj[0].stuXuexi;
          this.haveInfo = true;
        }
      });
    },
    /**
     * 获取全部在职员工
     */
    getallstaffList() {
      this.getallstaff().then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstaff = res.obj;
        }
      });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      this.getallcampusList({ menuID: 211 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    /**
     * 获取学员年级
     */
    getstugrade() {
      this.Getnianji({}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stugrade = res.obj;
          console.log(this.stugrade);
        }
      });
    },

    /**获取学员自定义信息 */
    GetstuparamtypeList() {
      this.selectValue = [];
      this.Getstuparamtype({ stuID: this.stuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          // res.obj.forEach((items) => {
          //   this.allstuParams.items.push(items);
          // });

          this.allstuParams.items = res.obj;

          let i = 0;
          console.log(this.allstuParams);
          this.allstuParams.items.forEach((itema) => {
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

    /**保存 */
    saveEditStu(name) {
      this.$refs['edit'].validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.allstuParams.items);
          let isstuvalue = false;
          this.allstuParams.items.forEach((itema) => {
            if (itema.isBiTian == true && (itema.pvalue == "" || itema.pvalue == null)) {
              isstuvalue = true;
            }
          });

          if (isstuvalue) {
            this.value1 = "1";
            this.$Message.error("请完成【学员自定义字段】必填项！!");
          } else {
            this.edit.alldata = JSON.stringify(this.allstuParams.items);
            this.UpdateStu(this.edit).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.closeModal(false);
              } else {
                this.$Message.error("保存失败");
                this.closeModal(false);
              }
            });
          }

          // this.$refs["allstuParams"].validate((valids) => {
          //   console.log(valids);
          //   if (valids) {
          //     this.edit.alldata = JSON.stringify(this.allstuParams.items);
          //     this.UpdateStu(this.edit).then((res) => {
          //       if (res.code == "Y" && res.success == true) {
          //         this.$Message.success("保存成功");
          //         // 同时调用父页面的刷新页面的方法
          //         this.$emit("handleSearch");
          //         this.closeModal(false);
          //       } else {
          //         this.$Message.error("保存失败");
          //         this.closeModal(false);
          //       }
          //     });
          //   } else {
          //     this.value1 = "1";
          //     this.$Message.error("请完成自定义字段必填项！!");
          //   }
          // });
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    /**清除 */
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
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
        // this.$refs["edit"].resetFields();
        // this.allstuParams = { items: [] };
        console.log(this.stuID);
        this.getstuInfo();
        this.getstugrade();
        this.getAllCampusList();
        this.getallstaffList();
        this.GetstuparamtypeList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
