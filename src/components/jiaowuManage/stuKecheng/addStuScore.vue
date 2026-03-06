<template>
  <Modal
    v-model="show"
    title="添加学员成绩"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="100">
      <div>
        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="学员姓名:" prop="stuID">
              <Select v-model="logForm.stuID" filterable placeholder="请选择学员" @on-change="getcampus">
                <Option v-for="item in allStu" :value="item.id" :key="item.id">{{ item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="成绩类型:" prop="scoreType">
              <Select v-model="logForm.scoreType" filterable placeholder="请选择成绩类型">
                <Option v-for="item in allscoreType" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="学科科目:" prop="subjectID">
              <Select
                v-model="logForm.subjectID"
                filterable
                placeholder="请选择科目"
                @on-change="getkcBysub"
              >
                <Option v-for="item in allsubject" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="课程:" prop="kechengID">
              <Select v-model="logForm.kechengID" filterable placeholder="请选择课程">
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="分数:" prop="score">
              <Input v-model="logForm.score" type="number" placeholder="请输入分数" />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="单科排名:" prop="dankepaiming">
              <Input v-model="logForm.dankepaiming" type="number" placeholder="请输入单科排名" />
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="总分排名:" prop="zongfenpaiming">
              <Input v-model="logForm.zongfenpaiming" type="number" placeholder="请输入总分排名" />
            </FormItem>
          </Col>
          <Col span="10">
            <FormItem label="考试日期:" prop="scoreDate">
              <DatePicker v-model="logForm.scoreDate" type="date" placeholder="请选择考试日期"></DatePicker>
            </FormItem>
          </Col>
        </Row>

        <Row class="divShow">
          <Col span="10" offset="1">
            <FormItem label="考试类别:" prop="testTypeID">
              <Select v-model="logForm.testTypeID" filterable placeholder="请选择考试类别">
                <Option v-for="item in alltestType" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="20" offset="1">
            <FormItem label="测试内容:" prop="testTitle">
              <Input v-model="logForm.testTitle" type="textarea" :rows="3" placeholder="请输入测试内容" />
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="20" offset="1">
            <FormItem label="备注信息:">
              <Input v-model="logForm.beiZhu" type="textarea" :rows="3" placeholder="请输入备注信息" />
            </FormItem>
          </Col>
        </Row>
      </div>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="savestuScore('logForm',1)">保存并继续添加</Button>
      <Button type="primary" @click="savestuScore('logForm',2)">保存并关闭</Button>
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
  name: "addStuScore",
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
        // 验证输入
        stuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        subjectID: [
          { required: true, message: "请选择学员科目", trigger: "change" },
        ],
        kechengID: [
          { required: true, message: "请选择课程", trigger: "change" },
        ],
        score: [{ required: true, message: "请输入学员成绩", trigger: "blur" }],
        dankepaiming: [
          { required: true, message: "请输入单科排名", trigger: "blur" },
        ],
        zongfenpaiming: [
          { required: true, message: "请输入总分排名", trigger: "blur" },
        ],
        scoreType: [
          { required: true, message: "请选择成绩类型", trigger: "change" },
        ],
        testTypeID: [
          { required: true, message: "请选择考试类别", trigger: "change" },
        ],
        testTitle: [
          { required: true, message: "请输入测试内容", trigger: "blur" },
        ],
        scoreDate: [
          {
            required: true,
            type: "date",
            message: "请选择考试日期",
            trigger: "change",
          },
        ],
      },
      logForm: {
        stuID: "",
        subjectID: "",
        kechengID: "",
        score: "",
        dankepaiming: "",
        zongfenpaiming: "",
        scoreType: "",
        testTypeID: "",
        testTitle: "",
        scoreDate: "",
        beiZhu: "",
      },
      scampusID: "",
      changeI: false,
      allStu: [],
      allsubject: [],
      allkc: [],
      allscoreType: [
        { id: "0", name: "培训机构成绩" },
        { id: "1", name: "在校成绩" },
      ],
      alltestType: [],
    };
  },
  methods: {
    /**保存 */
    savestuScore(name, type) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.logForm.scoreDate = toolbox.dateFtt(
            this.logForm.scoreDate,
            "yyyy-MM-dd"
          );
          api.post("xwcloud-stu/stu/buxikecheng/addScore",this.logForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.$emit("handleSearch");
              this.$refs[name].resetFields();
              if (type == 2) {
                this.closeModal(false);
              }
            } else {
              this.$Message.error(res.msg);
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
      api.get("xwcloud-stu/stu/buxikecheng/GetAllSelectedStuNames",{ menuID: 225 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allStu = res.obj;
        }
      });
    },
    getcampus() {
      this.allStu.forEach((item) => {
        if (this.logForm.stuID == item.id) {
          this.scampusID = item.campusID;
          this.GetcampusIDkemulist();
        }
      });
    },
    GetcampusIDkemulist() {
      api.get("xwcloud-stu/stu/buxikecheng/GetcampusIDkemu",{ campusID: this.scampusID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allsubject = res.obj;
        }
      });
    },
    getTesttypeList() {
      api.get("xwcloud-stu/stu/buxikecheng/getTesttype","").then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.alltestType = res.obj;
        }
      });
    },

    getkcBysub() {
      this.getKcBySubjectlist();
    },
    getKcBySubjectlist() {
      api.get("xwcloud-stu/stu/buxikecheng/getKcBySubject",{ subjectID: this.logForm.subjectID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allkc = res.obj;
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
        this.getTesttypeList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
