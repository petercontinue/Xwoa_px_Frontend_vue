<template>
  <Modal
    v-model="show"
    title="添加按课时包计费课程"
    :mask-closable="false"
    width="40"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="200">
      <div>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="先选择学员:" prop="stuID">
              <Select v-model="logForm.stuID" filterable placeholder="请选择学员" @on-change="getnewkc">
                <Option v-for="item in allStu" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="选择要添加的培训课程:" prop="kcID">
              <Select v-model="logForm.kcID" filterable placeholder="请选择培训课程" @on-change="changeKC">
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="开始日期:" prop="bx_startDate">
              <DatePicker type="date" v-model="logForm.bx_startDate" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="结束日期:" prop="bx_endDate">
              <DatePicker type="date" v-model="logForm.bx_endDate" format="yyyy-MM-dd"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="原单价:" prop="bx_odj">
              <Input v-model="logForm.bx_odj" type="number" />
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="现单价:" prop="bx_dj">
              <Input v-model="logForm.bx_dj" type="number" />
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="课时:" prop="bx_ksKSB">
              <Input v-model="logForm.bx_ksKSB" type="number" />
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="14" offset="4">
            <FormItem label="课程总价:" prop="bx_priceKSB">
              <Input v-model="logForm.bx_priceKSB" type="number" />
            </FormItem>
          </Col>
        </Row>
      </div>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="addksBKc('logForm')">保存</Button>
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
  name: "addKcKSB",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxi: { type: String },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {
        stuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        kcID: [{ required: true, message: "请选择课程", trigger: "change" }],
        bx_startDate: [
          {
            required: true,
            type: "date",
            message: "请选择开始日期",
            trigger: "change",
          },
        ],

        bx_endDate: [
          {
            required: true,
            type: "date",
            message: "请选择结束日期",
            trigger: "change",
          },
        ],
        bx_odj: [{ required: true, message: "请输入原单价", trigger: "blur" }],
        bx_dj: [{ required: true, message: "请输入现单价", trigger: "blur" }],
        bx_ksKSB: [
          { required: true, message: "请输入课时包课时", trigger: "blur" },
        ],
        bx_priceKSB: [
          { required: true, message: "请输入单价", trigger: "blur" },
        ],
      },
      logForm: {
        stuID: "",
        kcID: "",
        bx_startDate: "",
        bx_endDate: "",
        bx_odj: "",
        bx_dj: "",
        bx_ksKSB: "",
        bx_priceKSB: "",
      },
      allStu: [],
      allkc: [],
    };
  },
  methods: {
    /**保存 */
    addksBKc(name) {
      console.log(this.edit);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.logForm.bx_startDate = toolbox.dateFtt(
            this.logForm.bx_startDate,
            "yyyy-MM-dd"
          );
          this.logForm.bx_endDate = toolbox.dateFtt(
            this.logForm.bx_endDate,
            "yyyy-MM-dd"
          );
          api.post("xwcloud-stu/stu/buxikecheng/addKSCourseBag",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("保存成功");
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.$refs[name].resetFields();
              this.allStu = [];
              this.allkc = [];
              this.closeModal(false);
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

    getallstuList() {
      api.get("xwcloud-stu/stu/stuManagement/getallstu",{ menuID: 221 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStu = res.obj;
          console.log(res);
        }
      });
    },

    getnewkc() {
      console.log(this.logForm.stuID);
      if (this.logForm.stuID != "" && this.logForm.stuID != null) {
        this.GetnewkcList();
      }
    },

    GetnewkcList() {
      api.get("xwcloud-stu/stu/buxikecheng/Getnewkc",{ stuID: this.logForm.stuID, type: 2 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allkc = res.obj;
          console.log(res);
        }
      });
    },

    changeKC() {
      this.allkc.forEach((item) => {
        if (item.id == this.logForm.kcID) {
          this.logForm.bx_odj = item.kechengOriginalPrice;
          this.logForm.bx_dj = item.kechengprice;
          this.logForm.bx_ksKSB = item.keshiNum;
          this.logForm.bx_priceKSB = item.buyZonjia;
        }
      });
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
