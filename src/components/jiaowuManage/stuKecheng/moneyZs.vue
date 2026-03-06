<template>
  <Modal
    v-model="show"
    title="转送课时"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="100">
      <div>
        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="学员姓名:" prop="songstuID">
              <Select
                v-model="logForm.songstuID"
                filterable
                placeholder="请选择学员"
                @on-change="getstukc"
              >
                <Option v-for="item in allStu" :value="item.id" :key="item.id"
                  >{{ item.name }}_{{ item.parentTel }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="培训课程:" prop="songbuxikechengID">
              <Select
                v-model="logForm.songbuxikechengID"
                filterable
                placeholder="请选择课程"
                @on-change="getkcmessage"
              >
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="转送课时:" prop="skeshi">
              <Input
                v-model="logForm.skeshi"
                type="number"
                placeholder="转送课时"
                @on-blur="checkks"
              />
            </FormItem>
          </Col>

          <Col span="10">
            <FormItem label="转送课时单价:">
              <Input v-model="logForm.songPrice" disabled />
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow" v-if="havekc">
          <Col span="3" offset="1">课时信息:&nbsp;</Col>
          <Col span="20">
            <font style="color: red">这门课程最多可转送:{{ songRemainkeshi }} 学时</font>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="3" offset="1">转送方式: &nbsp;&nbsp;&nbsp;&nbsp;</Col>
          <Col span="15">
            <RadioGroup v-model="logForm.zhuansongtype" @on-change="getkeshiOrMoney">
              <Radio label="1">按单价折算</Radio>
              <Radio label="2">等课时转送</Radio>
              <Radio label="3">扩科转送</Radio>
            </RadioGroup>
          </Col>
        </Row>

        <div v-if="havekc">
          <Row class="divShow">
            <Col span="10" offset="1">
              <FormItem label="接收学员:" prop="shoustuID">
                <Select
                  v-model="logForm.shoustuID"
                  filterable
                  placeholder="请选择学员"
                  @on-change="getshoustukc"
                >
                  <Option v-for="item in allStu" :value="item.id" :key="item.id"
                    >{{ item.name }}_{{ item.parentTel }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="10">
              <FormItem label="接收课程:" prop="shoubuxikechengID">
                <Select
                  v-model="logForm.shoubuxikechengID"
                  filterable
                  placeholder="请选择课程"
                  @on-change="getshoukcmessage"
                >
                  <Option v-for="item in allShoustukc" :value="item.id" :key="item.id">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row class="divShow">
            <Col span="10" offset="1">
              <FormItem label="接收课时:" prop="skeshi">
                <Input v-model="logForm.shkeshi" disabled />
              </FormItem>
            </Col>

            <Col span="10" v-if="logForm.zhuansongtype != 3">
              <FormItem label="接收单价" prop="skeshi">
                <Input v-model="logForm.shPrice" disabled />
              </FormItem>
            </Col>
            <Col span="10" v-if="logForm.zhuansongtype == 3">
              <FormItem label="接收单价" prop="skeshi">
                <Input v-model="logForm.shPrice" @on-change="changenewprice" />
              </FormItem>
            </Col>
          </Row>
          <Row v-if="logForm.zhuansongtype == 3">
            <Col span="10" offset="1">
              <FormItem label="开始日期:" prop="startDate">
                <DatePicker
                  v-model="logForm.startDate"
                  type="date"
                  placeholder="请选择开始日期"
                ></DatePicker>
              </FormItem>
            </Col>

            <Col span="10" offset="2">
              <FormItem label="结束日期:" prop="endDate">
                <DatePicker
                  v-model="logForm.endDate"
                  type="date"
                  placeholder="请选择结束日期"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>

          <Row class="divShow">
            <Col span="20" offset="1">
              <FormItem label="说明:">
                <Input
                  v-model="logForm.shuoming"
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
      <Button type="primary" @click="saveZs('logForm', 1)">保存并继续添加</Button>
      <Button type="primary" @click="saveZs('logForm', 2)">保存并关闭</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.divShow {
  margin-top: 10px;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "moneyZs",
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
        songstuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        songbuxikechengID: [{ required: true, message: "请选择课程", trigger: "change" }],
        skeshi: [{ required: true, message: "请输入课时数", trigger: "blur" }],
        shoustuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        shoubuxikechengID: [{ required: true, message: "请选择课程", trigger: "change" }],
        startDate: [
          {
            required: true,
            type: "date",
            message: "请选择开始日期",
            trigger: "change",
          },
        ],
        endDate: [
          {
            required: true,
            type: "date",
            message: "请选择结束日期",
            trigger: "change",
          },
        ],
      },
      logForm: {
        songstuID: "",
        songbuxikechengID: "",
        skeshi: "",
        zhuansongtype: "1",
        shoustuID: "",
        songPrice: "",
        shoubuxikechengID: "",
        shkeshi: "",
        shPrice: "",
        shuoming: "",
        startDate: "",
        endDate: "",
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
    saveZs(name, type) {
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.logForm.zhuansongtype = Number(this.logForm.zhuansongtype);
          api.post("xwcloud-stu/stu/buxikecheng/addKeShiZhs",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              // this.logForm = this.$options.data().logForm;
              this.$refs[name].resetFields();
              this.allkc = [];
              this.allStu = [];
              this.allShoustukc = [];
              if (type == 2) {
                this.closeModal(false);
              } else {
                this.logForm.zhuansongtype == "1";
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
      api.get("xwcloud-stu/stu/buxikecheng/getzhuangsongkecheng",{ stuID: this.logForm.songstuID, type: 1 }).then(
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
        if (item.id == this.logForm.songbuxikechengID) {
          console.log(item);
          this.logForm.songPrice = item.kechengprice;
          this.songRemainkeshi = item.remainkeshi;
          this.havekc = true;
        }
      });
    },
    /**检测送的课时数 */
    checkks() {
      if (this.logForm.skeshi < 0) {
        this.$Message.error("转送课时不能小于0！");
        this.logForm.skeshi = 0;
      } else {
        if (this.logForm.skeshi > this.songRemainkeshi) {
          this.$Message.error("超过所选课程剩余课时！");
          this.logForm.skeshi = 0;
        }
      }
    },
    /**获取接收学员的课程 */
    getshoustukc() {
      api.get("xwcloud-stu/stu/buxikecheng/getzhuangsongkecheng",{ stuID: this.logForm.shoustuID, type: 2 }).then(
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
        this.logForm.songstuID == this.logForm.shoustuID &&
        this.logForm.songbuxikechengID == this.logForm.shoubuxikechengID &&
        (this.shoustuID != "" || this.logForm.shoustuID != "")
      ) {
        this.$Message.error("同一学员，接收和转送课程不能相同");
        this.logForm.shoubuxikechengID = "";
        this.logForm.shkeshi = "";
        this.logForm.shPrice = "";
      } else {
        this.allShoustukc.forEach((item) => {
          if (item.id == this.logForm.shoubuxikechengID) {
            if (this.logForm.zhuansongtype == "1") {
              this.logForm.shPrice = item.kechengprice;
              this.logForm.shkeshi =
                (this.logForm.skeshi * this.logForm.songPrice) / this.logForm.shPrice;
            } else if (
              this.logForm.zhuansongtype == "2" ||
              this.logForm.zhuansongtype == "3"
            ) {
              this.logForm.shkeshi = this.logForm.skeshi;
              this.logForm.shPrice = this.logForm.songPrice;
            }
          }
        });
      }
    },

    changenewprice() {
      this.logForm.shkeshi =
        (this.logForm.skeshi * this.logForm.songPrice) / this.logForm.shPrice;
    },
    /**选择类型改变事件 */
    getkeshiOrMoney() {
      if (this.logForm.zhuansongtype == "3") {
        this.logForm.shoubuxikechengID = "";
        api.get("xwcloud-stu/stu/buxikecheng/getcamkecheng",{ stuID: this.logForm.shoustuID }).then((res) => {
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
