<template>
  <Modal
    v-model="show"
    title="老学员回访"
    width="70"
    :loading="loading"
    :mask-closable="false"
    footer-hide
    @on-cancel="closeModal(false)"
  >
    <Row>
      <Col span="5">
        <Card title="基础信息" dis-hover>
          <p class="pcol">
            <span class="title">联系电话:</span
            ><span class="val">{{ this.basicinfo.phone }}</span>
          </p>
          <p class="pcol">
            <span class="title">其他联系电话:</span
            ><span class="val">{{ this.basicinfo.otherphone }}</span>
          </p>
          <h3 class="htitle">学员信息</h3>
          <p class="pcol">
            <span class="title">校区:</span
            ><span class="val">{{ this.basicinfo.campus }}</span>
          </p>
          <p class="pcol">
            <span class="title">学号:</span
            ><span class="val">{{ this.basicinfo.zidingyiStuID }}</span>
          </p>
          <p class="pcol">
            <span class="title">姓名:</span
            ><span class="val">{{ this.basicinfo.Name }}</span>
          </p>
          <p class="pcol">
            <span class="title">性别:</span
            ><span class="val">{{ this.basicinfo.sex }}</span>
          </p>
          <p class="pcol">
            <span class="title">生日:</span
            ><span class="val">{{ this.basicinfo.birthday | formatDate }}</span>
          </p>
          <p class="pcol">
            <span class="title">班主任:</span
            ><span class="val">{{ this.basicinfo.banzhuren }}</span>
          </p>
          <h3 class="htitle">其他</h3>
          <p class="pcol">
            <span class="title">最后回访时间:</span
            ><span class="val">{{
              this.basicinfo.lasthuifang | formatDate
            }}</span>
          </p>
          <p class="pcol">
            <span class="title">下次回访时间:</span
            ><span class="val">{{
              this.basicinfo.nexthuifang | formatDate
            }}</span>
          </p>
          <Button type="info" @click="seekecheng">查看课程</Button>
        </Card>
      </Col>
      <Col span="18">
        <Card dis-hover>
          <Form
            ref="managereturnForm"
            :model="addparams"
            :rules="addparamsRule"
            inline
          >
            <FormItem prop="text" style="width: 100%">
              <Input
                v-model="addparams.text"
                maxlength="200"
                show-word-limit
                type="textarea"
                placeholder="新建回访记录(必填,200字)"
                :rows="5"
              />
            </FormItem>
            <p>
              <FormItem prop="huifangTime">
                <DatePicker
                  type="date"
                  placeholder="回访时间(必填)"
                  style="width: 200px"
                  v-model="addparams.huifangTime"
                  @on-change="sethuifangTime"
                ></DatePicker>
              </FormItem>
              <FormItem prop="nexthuifangTime">
                <DatePicker
                  type="date"
                  placeholder="下次回访时间(必填)"
                  style="width: 200px"
                  v-model="addparams.nexthuifangTime"
                  @on-change="setnexthuifangTime"
                ></DatePicker>
              </FormItem>
              <Button type="info" @click="addhuifangCard">确认</Button>
            </p>
          </Form>
        </Card>
        <Card dis-hover>
          <Row style="margin-top: 20px">
            <Col span="24">
              <huifang-card-list
                v-model="huifangDataList"
                @huifangCardEditEvent="huifangCardEditEvent"
                @huifangCardDelEvent="huifangCardDelEvent"
              ></huifang-card-list>
            </Col>
          </Row>
          <Row style="margin-top: 15px">
            <Page
              :total="total"
              :page-size="params.size"
              show-elevator
              show-total
              prev-text="上一页"
              next-text="下一页"
              show-sizer
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            />
          </Row>
        </Card>
      </Col>
    </Row>
    <getstukecheng-list
      v-model="kechengshow"
      :StuID="stuID"
    ></getstukecheng-list>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import GetstukechengList from "./getstukechengList.vue";
import HuifangCardList from "./widget/huifangCardList.vue";
import * as api from "@/api/api.js";

export default {
  name: "managereturnForm",
  components: {
    HuifangCardList,
    GetstukechengList,
  },
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    stuID: {
      type: String, // 父页面传来的值
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      total: 0,
      params: {
        size: 3,
        current: "1",
        stuID: "",
      },
      addparamsRule: {
        text: [
          {
            required: true,
            message: "请选输入回访记录",
            trigger: "blur",
          },
        ],
        huifangTime: [
          {
            required: true,
            message: "请选择回访时间",
            trigger: "blur",
          },
        ],
        nexthuifangTime: [
          {
            required: true,
            message: "请选择下次回访时间",
            trigger: "blur",
          },
        ],
      },
      basicinfo: {
        phone: "",
        otherphone: "",
        campus: "",
        zidingyiStuID: "",
        Name: "",
        sex: "",
        birthday: "",
        banzhuren: "",
        lasthuifang: "",
        nexthuifang: "",
        stuID: "",
      },
      huifangjiluList: [],
      addparams: {
        id: "",
        stuID: "",
        text: "",
        huifangTime: "",
        nexthuifangTime: "",
      },
      huifangDataList: [],
      kechengshow: false,
    };
  },
  methods: {
    getLaoxueyuanfangkui() {
      this.params.stuID = this.stuID;
      console.log(this.params);
      api.get("xwcloud-homeschool/homeschool/oldstupxhuifang/getHuifangPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.huifangDataList = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.params.current = current;
      this.getLaoxueyuanfangkui();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getLaoxueyuanfangkui();
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    sethuifangTime(val) {
      this.addparams.huifangTime = toolbox.dateFtt(val, "yyyy-MM-dd");
    },
    setnexthuifangTime(val) {
      this.addparams.nexthuifangTime = toolbox.dateFtt(val, "yyyy-MM-dd");
    },
    huifangCardEditEvent(index) {
      this.addparams.stuID = this.huifangDataList[index].stuID;
      this.addparams.text = this.huifangDataList[index].text;
      this.addparams.huifangTime = toolbox.dateFtt(
        this.huifangDataList[index].huifangTime,
        "yyyy-MM-dd"
      );
      this.addparams.nexthuifangTime = toolbox.dateFtt(
        this.huifangDataList[index].nexthuifangTime,
        "yyyy-MM-dd"
      );
      this.addparams.id = this.huifangDataList[index].id;
      console.log(this.huifangDataList[index]);
    },
    huifangCardDelEvent(index) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该回访记录？</p>",
        onOk: () => {
          api.del("xwcloud-homeschool/homeschool/oldstupxhuifang/delHuifang",{
            ids: this.huifangDataList[index].id,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.search();
              this.$Message.success("删除成功");
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
      });
    },
    addhuifangCard() {
      console.log(this.addparams);
      this.$refs["managereturnForm"].validate((valid) => {
        if (valid) {
          if (this.addparams.id == null || this.addparams.id == "") {
            this.addparams.stuID = this.stuID;
            api.post("xwcloud-homeschool/homeschool/oldstupxhuifang/addHuifang",this.addparams).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$refs["managereturnForm"].resetFields();
                this.addparams.stuID = "";
                this.addparams.text = "";
                this.addparams.huifangTime = "";
                this.addparams.nexthuifangTime = "";
                this.addparams.id = "";
                this.search();
                this.$Message.success("添加成功");
              } else {
                this.$Message.error(res.msg);
              }
            });
          } else {
            api.post("xwcloud-homeschool/homeschool/oldstupxhuifang/editHuifang",this.addparams).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$refs["managereturnForm"].resetFields();
                this.addparams.stuID = "";
                this.addparams.text = "";
                this.addparams.huifangTime = "";
                this.addparams.nexthuifangTime = "";
                this.addparams.id = "";
                this.search();
                this.$Message.success("修改成功");
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        } else {
          this.$Message.error("请检查数据是否填对!");
        }
      });
    },
    getStuMsg() {
      api.get("xwcloud-homeschool/homeschool/oldstupxhuifang/getStu",{
        stuID: this.stuID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.basicinfo.phone = res.obj.parentTel;
          this.basicinfo.campus = res.obj.campusName;
          this.basicinfo.zidingyiStuID = res.obj.zidingyiStuID;
          this.basicinfo.Name = res.obj.stuName;
          this.basicinfo.sex = res.obj.stuSex;
          this.basicinfo.birthday = res.obj.stubirth;
          this.basicinfo.banzhuren = res.obj.banzhurenName;
          this.basicinfo.lasthuifang = res.obj.lastHuifangTime;
          this.basicinfo.nexthuifang = res.obj.nextHuifangTime;
          this.basicinfo.stuID = this.stuID;
        }
      });
    },
    seekecheng() {
      this.kechengshow = true;
    },
    search(val) {
      this.params.current = 1;
      this.params.size = 3;
      this.getLaoxueyuanfangkui();
    },
  },
  filters: {
    formatDate: function (value) {
      let datehave = "";
      if (value != undefined || value != null) {
        datehave = toolbox.dateFtt(value, "yyyy-MM-dd");
      }
      return datehave;
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        console.log(this.stuID);
        //this.$refs["addparams"].resetFields();
        this.getStuMsg();
        this.getLaoxueyuanfangkui();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
<style>
.pcol {
  color: #98a6ad;
  margin: 5px 5px;
}
</style>
