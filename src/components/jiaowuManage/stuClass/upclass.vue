<template>
  <Modal v-model="show" title="插班" :mask-closable="false" width="30">
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      :label-width="180"
      :label-colon="true"
    >
      <Row>
        <Col span="20">
          <FormItem label="班级" prop="classid">
            <Select v-model="logForm.classid" placeholder="选择班级" @on-change="checkClass" :filterable="true">
              <Option v-for="item in allbankeData" :value="item.id" :key="item.id">{{ item.name}}</Option>
              </Select>
          </FormItem>
        </Col>
      </Row>

      <Row v-if="havepaike">
        <Col span="20">
          <FormItem label="是否插入现有排课">
            <RadioGroup v-model="crPaike" @on-change="charupaike">
              <Radio label="插入"></Radio>
              <Radio label="不插入"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row v-if="logForm.cbckb">
        <Col span="20">
          <Tooltip content="从选择的排课开始（包含），添加之后排课" max-width="200">
            <FormItem label="插入排课" prop="pkid">
              <Select v-model="logForm.pkid" placeholder="选择排课" style="width: 200px">
                <Option v-for="item in paikeDate" :value="item.id" :key="item.id"
                  >{{ item.haveClassDate | formatDate }} {{ item.startLessonDateTime }}-{{
                    item.endLessonDateTime
                  }}</Option
                >
              </Select>
            </FormItem>
          </Tooltip>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit()">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  name: "upclass",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxiID: { type: String },
    type: { type: String },
    campusID: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        classid: "",
        ids: "",
        cbckb: false, //true
        pkid: "",
      },
      allbankeData: [], //校区查询获取到的校区数据
      logFormRule: {
        classid: [{ required: true, message: "请选择班级", trigger: "change" }],
        pkid: [{ required: true, message: "请选择排课", trigger: "change" }],
      },
      havepaike: false,
      paikeDate: [],
      crPaike: "插入",
      InCampusID: "",
    };
  },
  filters: {
    formatDate: function (value) {
      let datehave = toolbox.dateFtt(value, "yyyy-MM-dd");
      return datehave;
    },
  },
  methods: {
    handleSubmit() {
      this.$refs["logForm"].validate((vaild) => {
        console.log(vaild);
        console.log(this.logForm);

        if (vaild) {
          if (this.type == 1) {
            api.post("xwcloud-stu/stu/stuClass/StuCharu",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.closeModal(false);
              } else {
                this.$Message.error(res.msg);
                this.closeModal(false);
              }
            });
          } else if (this.type == 2) {
            api.post("xwcloud-stu/stu/stuClass/allnoStuCharu",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.closeModal(false);
                this.havepaike = false;
              } else {
                this.$Message.error(res.msg);
                this.closeModal(false);
              }
            });
          }
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },

    handleReset() {
      this.$refs["logForm"].resetFields();
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    getallbankeData() {
      api.get("xwcloud-stu/stu/stuClass/getallbanke",{ campusID: this.InCampusID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allbankeData = res.obj;
        }
      });
    },
    /** 检测班级是否有排课 */
    checkClass() {
      api.get("xwcloud-stu/stu/stuClass/getPaikeByclassIDList",{ classID: this.logForm.classid }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          //说明是有排课，显示排课时间
          this.paikeDate = res.obj;
          console.log(this.paikeDate);
          if (this.paikeDate.length == 0) {
            this.havepaike = false;
            this.crPaike = "不插入";
          } else {
            this.havepaike = true;
            this.crPaike = "插入"; //默认是要插排课的
          }
        } else {
          this.havepaike = false;
          this.crPaike = "不插入";
        }

        this.charupaike();
      });
    },
    /**插入班级 */
    charupaike() {
      console.log(this.crPaike);
      if (this.crPaike == "插入") {
        this.logForm.cbckb = true;
      } else if (this.crPaike == "不插入") {
        this.logForm.cbckb = false;
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
      this.logForm.classid = "";
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.havepaike = false;
        this.logForm.cbckb = false;
        this.$refs["logForm"].resetFields();
        this.InCampusID = this.campusID;
        this.logForm.ids = this.buxiID;
        this.getallbankeData();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
