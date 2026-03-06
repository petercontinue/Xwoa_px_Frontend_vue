<template>
  <Modal
    v-model="show"
    title="起止日期计费课程-天转送"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="100">
      <div>
        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="学员姓名:" prop="daysongstuID">
              <Select
                v-model="logForm.daysongstuID"
                filterable
                placeholder="请选择学员"
                @on-change="getstukc"
              >
                <Option v-for="item in allStu" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10" offset="1">
            <FormItem label="培训课程:" prop="daysongbxkechengID">
              <Select
                v-model="logForm.daysongbxkechengID"
                filterable
                placeholder="请选择课程"
                @on-change="getkcmessage"
              >
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="转送天:" prop="daysongbxkechengID">
              <Input v-model="logForm.sdays" type="number" placeholder="转送天数" @on-blur="checkks" />
            </FormItem>
          </Col>

          <Col span="10" offset="1">
            <FormItem label="送出单价:">
              <Input v-model="logForm.daysprice" disabled />
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow" v-if="havekc">
          <Col span="3" offset="1">课时信息:&nbsp;</Col>
          <Col span="20">
            <font style="color: red">这门课程最多可转送:{{ songRemainkeshi }} 天课时</font>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="3" offset="1">转送方式</Col>
          <Col span="15">
            <RadioGroup v-model="logForm.zhuansongdayType" @on-change="getkeshiOrMoney">
              <Radio label="1">按单价折算</Radio>
              <Radio label="2">等课时转送</Radio>
              <Radio label="3">扩科转送</Radio>
            </RadioGroup>
          </Col>
        </Row>

        <div v-if="havekc">
          <Row class="divShow">
            <Col span="10" offset="1">
              <FormItem label="接收学员:" prop="dayshoustuID">
                <Select
                  v-model="logForm.dayshoustuID"
                  filterable
                  placeholder="请选择学员"
                  @on-change="getshoustukc"
                >
                  <Option v-for="item in allStu" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="10" offset="1">
              <FormItem label="培训课程:" prop="dayshoubxkechengID">
                <Select
                  v-model="logForm.dayshoubxkechengID"
                  filterable
                  placeholder="请选择课程"
                  @on-change="getshoukcmessage"
                >
                  <Option v-for="item in allShoustukc" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row class="divShow">
            <Col span="10" offset="1">
              <FormItem label="接收天数:">
                <Input v-model="logForm.dayshdays" disabled />
              </FormItem>
            </Col>

            <Col span="10" offset="1">
              <FormItem label="接收天数:">
                <Input v-model="logForm.dayshprice" disabled />
              </FormItem>
            </Col>
          </Row>

          <Row class="divShow">
            <Col span="20" offset="1">
              <FormItem label="转送课时:" prop="skeshi">
                <Input
                  v-model="logForm.dayshuoming"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入赠送说明"
                />
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveZsDay('logForm',1)">保存并继续添加</Button>
      <Button type="primary" @click="saveZsDay('logForm',2)">保存并关闭</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.divShow {
  margin-top: 10px;
}
.col-ti {
  text-align: right;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "moneydayZs",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {
        daysongstuID: [
          { required: true, message: "请选择学员", trigger: "change" },
        ],
        daysongbxkechengID: [
          { required: true, message: "请选择课程", trigger: "change" },
        ],
        sdays: [{ required: true, message: "请输入转送天数", trigger: "blur" }],
        dayshoustuID: [
          { required: true, message: "请选择接收学员", trigger: "change" },
        ],
        dayshoubxkechengID: [
          { required: true, message: "请选择接收课程", trigger: "change" },
        ],
      },
      logForm: {
        daysongstuID: "",
        daysongbxkechengID: "",
        sdays: "",
        daysprice: "",
        zhuansongdayType: "1",
        dayshoustuID: "",
        dayshoubxkechengID: "",
        dayshdays: "",
        dayshprice: "",
        dayshuoming: "",
      },

      songRemainkeshi: "",
      havekc: false,
      allkc: [],
      allStu: [],
      allShoustukc: [],
    };
  },
  methods: {
    /**保存 */
    saveZsDay(name, type) {
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.logForm.zhuansongdayType = Number(this.logForm.zhuansongdayType);
          api.post("xwcloud-stu/stu/buxikecheng/addDayZhs",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.logForm = this.$options.data().logForm;
              this.allkc = [];
              this.allStu = [];
              this.allShoustukc = [];
              if (type == 2) {
                this.closeModal(false);
              } else {
                this.logForm.zhuansongdayType == "1";
              }
            } else {
              this.$Message.error("保存失败");
              this.closeModal(false);
            }
          });
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
    closeModal(val) {
      this.$emit("input", val);
    },

    /**获取全部学员 */
    getallstuList() {
      api.get("xwcloud-stu/stu/buxikecheng/GetAllSelectedStuNames",{ menuID: 222 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStu = res.obj;
        }
      });
    },
    /**获取转送学员的课程 */
    getstukc() {
      api.get("xwcloud-stu/stu/buxikecheng/getzhuangsongdaykecheng",{ stuID: this.logForm.daysongstuID }).then(
        (res) => {
          if (res.code == "Y" && res.success == true) {
            this.allkc = res.obj;
          }
        }
      );
    },
    /** 获取送学员的课程的信息*/
    getkcmessage() {
      this.allkc.forEach((item) => {
        if (item.id == this.logForm.daysongbxkechengID) {
          console.log(item);
          this.logForm.daysprice = item.kechengprice;
          this.songRemainkeshi = item.remainkeshi;
          this.havekc = true;
        }
      });
    },
    /**检测送的课时数 */
    checkks() {
      if (this.logForm.sdays < 0) {
        this.$Message.error("转送课时不能小于0！");
        this.logForm.sdays = 0;
      } else {
        if (this.logForm.sdays > this.songRemainkeshi) {
          this.$Message.error("超过所选课程剩余课时！");
          this.logForm.sdays = 0;
        }
      }
    },
    /**获取接收学员的课程 */
    getshoustukc() {
      api.get("xwcloud-stu/stu/buxikecheng/getzhuangsongdaykecheng",{ stuID: this.logForm.dayshoustuID }).then(
        (res) => {
          if (res.code == "Y" && res.success == true) {
            this.allShoustukc = res.obj;
          }
        }
      );
    },
    /** 获取接收学员的课程的信息*/
    getshoukcmessage() {
      if (
        this.logForm.daysongstuID == this.logForm.dayshoustuID &&
        this.logForm.daysongbxkechengID == this.logForm.dayshoubxkechengID &&
        (this.shoustuID != "" || this.logForm.dayshoustuID != "")
      ) {
        this.$Message.error("同一学员，接收和转送课程不能相同");
        this.logForm.dayshoubxkechengID = "";
        this.logForm.dayshdays = "";
        this.logForm.dayshprice = "";
      }
      {
        this.allShoustukc.forEach((item) => {
          if (item.id == this.logForm.dayshoubxkechengID) {
            if (this.logForm.zhuansongdayType == "1") {
              this.logForm.dayshprice = item.kechengprice;
              this.logForm.dayshdays =
                (this.logForm.sdays * this.logForm.daysprice) /
                this.logForm.dayshprice;
            } else if (
              this.logForm.zhuansongdayType == "2" ||
              this.logForm.zhuansongdayType == "3"
            ) {
              this.logForm.dayshdays = this.logForm.sdays;
              this.logForm.dayshprice = this.logForm.daysprice;
            }
          }
        });
      }
    },
    /**选择类型改变事件 */
    getkeshiOrMoney() {
      if (this.logForm.zhuansongdayType == "3") {
        this.logForm.dayshoubxkechengID = "";
        api.get("xwcloud-stu/stu/buxikecheng/getcamkecheng",{ stuID: this.logForm.dayshoustuID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allShoustukc = res.obj;
          }
        });
      } else {
        this.getshoustukc();
      }
      this.getshoukcmessage();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        this.getallstuList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
