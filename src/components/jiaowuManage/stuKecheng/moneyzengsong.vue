<template>
  <Modal
    v-model="show"
    title="赠送"
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
                @on-change="getkc"
              >
                <Option v-for="item in allStu" :value="item.id" :key="item.id"
                  >{{ item.name }}_{{ item.parentTel }}</Option
                >
              </Select>
            </FormItem>
          </Col>
          <Col span="7" offset="2">
            <RadioGroup v-model="logForm.zhuansongtype" @on-change="typechange">
              <Radio label="1">赠送给已有课程</Radio>
              <Radio label="2">扩科赠送课时</Radio>
            </RadioGroup>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="10" offset="1" v-if="logForm.zhuansongtype == '1'">
            <FormItem label="赠送到哪个课程:" prop="songbuxikechengID">
              <Select
                v-model="logForm.songbuxikechengID"
                filterable
                placeholder="请选择课程 "
                @on-change="getkcPrice(1)"
              >
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10" offset="1" v-if="logForm.zhuansongtype == '2'">
            <FormItem label="赠送课程:" prop="shoukechengID">
              <Select
                v-model="logForm.shoukechengID"
                filterable
                placeholder="请选择课程 "
                @on-change="getkcPrice(2)"
              >
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{
                  item.name
                }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10" offset="2">
            <FormItem label="赠送课时:" prop="skeshi">
              <InputNumber
                :min="0"
                v-model="logForm.skeshi"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="单价:" prop="kcPrice">
              <InputNumber
                :min="0"
                v-model="logForm.kcPrice"
                style="width: 100%"
              ></InputNumber>
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
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
            <FormItem label="赠送说明:">
              <Input
                v-model="logForm.songYangyin"
                type="textarea"
                :rows="3"
                placeholder="请输入赠送说明"
              />
            </FormItem>
          </Col>
        </Row>
      </div>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveZengsong('logForm', 1)">保存并继续添加</Button>
      <Button type="primary" @click="saveZengsong('logForm', 2)">保存并关闭</Button>
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
  name: "moneyzengsong",
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
        shoukechengID: [{ required: true, message: "请选择课程", trigger: "change" }],
        skeshi: [
          {
            required: true,
            type: "number",
            message: "请输入赠送课时数",
            trigger: "change",
          },
        ],
        kcPrice: [
          {
            required: true,
            type: "number",
            message: "请输入单价",
            trigger: "change",
          },
        ],

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
        zhuansongtype: "1",
        songbuxikechengID: "",
        shoukechengID: "",
        skeshi: 0,
        kcPrice: 0,
        startDate: "",
        endDate: "",
        songYangyin: "",
      },
      allStu: [],
      allkc: [],
    };
  },
  methods: {

    /**保存 */
    saveZengsong(name, type) {
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.logForm.startDate = toolbox.dateFtt(this.logForm.startDate, "yyyy-MM-dd");
          this.logForm.endDate = toolbox.dateFtt(this.logForm.endDate, "yyyy-MM-dd");
          this.logForm.zhuansongtype = Number(this.logForm.zhuansongtype);
          api.post("xwcloud-stu/stu/buxikecheng/addZsKeShi",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
              this.$refs[name].resetFields();
              this.allkc = [];
              this.allStu = [];
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

    getallstuList() {
      api.get("xwcloud-stu/stu/buxikecheng/GetAllSelectedStuNames",{ menuID: 223 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStu = res.obj;
        }
      });
    },

    getkc() {
      console.log(this.logForm.zhuansongtype);
      if (this.logForm.zhuansongtype == "1") {
        api.get("xwcloud-stu/stu/buxikecheng/getZSkechengs",{ stuID: this.logForm.songstuID, type: 1 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allkc = res.obj;
            this.logForm.shoukechengID = "";
          }
        });
      } else {
        api.get("xwcloud-stu/stu/buxikecheng/getOtherKechengs",{ stuID: this.logForm.songstuID, type: 1 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allkc = res.obj;
            this.logForm.songbuxikechengID = "";
          }
        });
      }
    },

    getkcPrice(type) {
      console.log(this.allkc);
      console.log(this.logForm);

      let kc = null;
      if (type == 1) {
        kc = this.logForm.songbuxikechengID;
      } else if (type == 2) {
        kc = this.logForm.shoukechengID;
      }
      this.allkc.forEach((item) => {
        if (item.id == kc) {
          this.logForm.kcPrice = Number(item.kechengprice);
        }
      });
    },

    typechange() {
      this.logForm.kcPrice = 0;
      this.getkc();
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.$refs["logForm"].resetFields();
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
