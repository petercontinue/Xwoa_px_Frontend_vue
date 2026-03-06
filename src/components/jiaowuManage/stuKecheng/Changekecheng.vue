<template>
  <Modal v-model="show" title="换课" :mask-closable="false" width="40" @on-cancel="closeModal(false)">
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="100">
      <div>
        <Row class="divShow">
          <Col span="3" offset="2">
            <label>原培训课程:</label>
          </Col>
          <Col span="15">
            <label>
              {{ oldkechengName }}，课程剩余学费：
              <font style="color: red">{{logForm.oldkcMoney}}</font>元
            </label>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="15" offset="2">
            <FormItem label="要换的课程:" prop="kcID">
              <Select
                v-model="logForm.kcID"
                filterable
                placeholder="请选择培训课程"
                @on-change="selectkcChange"
              >
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <div v-if="selectkc">
          <Row class="divShow">
            <Col span="8" offset="2">
              <FormItem label="开始日期:" prop="hkStartDate">
                <DatePicker
                  type="date"
                  placeholder="请选择开始日期"
                  style="width: 200px"
                  v-model="logForm.hkStartDate"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="8" offset="2">
              <FormItem label="结束日期:" prop="hkEndDate">
                <DatePicker
                  type="date"
                  placeholder="请选择结束日期"
                  style="width: 200px"
                  v-model="logForm.hkEndDate"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>

          <Row v-if="logForm.kcjifeistyleNew != 3" class="divShow">
            <Col span="8" offset="2">
              <FormItem label="课程单价:" prop="hkKechengprice">
                <Input
                  v-model="logForm.hkKechengprice"
                  type="number"
                  style="width: 200"
                  @on-blur="getkeshi"
                />
              </FormItem>
            </Col>

            <Col span="8" offset="2">
              <FormItem label="课程课时:" prop="hkKeshi">
                <Input v-model="logForm.hkKeshi" type="number" style="width: 200px" />
              </FormItem>
            </Col>
          </Row>
        </div>
      </div>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveChange('logForm')">保存</Button>
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
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
import * as moment from "moment";

export default {
  name: "Changekecheng",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    chan: { type: String },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {
        kcID: [
          { required: true, message: "请选择培训课程", trigger: "change" },
        ],
        hkStartDate: [
          {
            required: true,
            type: "date",
            message: "请选择开始日期",
            trigger: "change",
          },
        ],
        hkEndDate: [
          {
            required: true,
            type: "date",
            message: "请选择结束日期",
            trigger: "change",
          },
        ],
        hkKechengprice: [
          { required: true, message: "请输入课程单价", trigger: "blur" },
        ],
        hkKeshi: [
          { required: true, message: "请输入课程课时", trigger: "blur",type:"number" },
        ],
      },
      logForm: {
        hkbuxiID: "",
        kcID: "",
        oldkcMoney: 0,
        kcjifeistyleNew: "",
        hkStartDate: "",
        hkEndDate: "",
        hkKechengprice: "",
        hkKeshi: "",
        iszk: false,
        zk: 10,
      },

      allkc: [],
      getData: JSON,
      oldkeshi: "",
      oldkcprice: 0,
      oldkechengName: "",
      selectkc: false,
    };
  },
  methods: {
    ...mapActions(["getnewkcInfo", "saveChangekecheng"]),

    /**保存 */
    saveChange(name) {
      console.log(this.edit);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.logForm.hkStartDate=moment(this.logForm.hkStartDate).format("YYYY-MM-DD");
          this.logForm.hkEndDate=moment(this.logForm.hkEndDate).format("YYYY-MM-DD");
          api.post("xwcloud-stu/stu/buxikecheng/saveChangekecheng",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.getData = null;
              this.oldkechengName = "";
              this.logForm = this.$options.data().logForm;
            } else {
              this.$Message.error(res.msg);
            }
            this.selectkc=false;
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
      this.selectkc=false;
      this.$emit("input", val);
    },
    selectkcChange() {
      this.allkc.forEach((item) => {
        if (item.id == this.logForm.kcID) {
          this.logForm.kcjifeistyleNew = item.jifeiStyleID;
          console.log(item);
          this.selectkc = true;
        }
      });
    },
    /**自动计算课时 */
    getkeshi() {
      this.logForm.hkKeshi =
        this.logForm.oldkcMoney / this.logForm.hkKechengprice;
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        this.getData = JSON.parse(this.chan);
        this.logForm.hkbuxiID = this.getData.id;
        this.oldkechengName = this.getData.buxiCourse;
        this.oldkeshi = this.getData.remainkeshi;
        this.oldkcprice = this.getData.coursePrice;
        this.logForm.oldkcMoney = this.oldkcprice * this.oldkeshi;
        api.get("xwcloud-stu/stu/buxikecheng/getnewkcInfo",{buxikcID:this.getData.id}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res);
            this.allkc = res.obj;
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
