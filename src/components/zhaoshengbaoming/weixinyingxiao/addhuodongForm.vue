<template>
  <Modal
    v-model="show"
    title="添加活动信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="45"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="选择活动" prop="huodongID">
        <Select v-model="shezhiForm.huodongID" placeholder="请选择选择活动" style="width: 100%">
          <Option
            v-for="item in allhuodongData"
            :value="item.id"
            :key="item.id"
          >{{ item.huodongName }}</Option>
        </Select>
      </FormItem>
      <FormItem label="是否显示" prop="isShow">
        <Select v-model="shezhiForm.isShow" placeholder="请选择是否显示" style="width: 100%">
          <Option :value="0" :key="0">不显示</Option>
          <Option :value="1" :key="1">显示</Option>
        </Select>
      </FormItem>
      <div
        v-if="shezhiForm.huodongID!='6'&&shezhiForm.huodongID!='5'&&shezhiForm.huodongID!='6'&&shezhiForm.huodongID!='7'"
      >
        <FormItem label="活动开始时间" prop="startDatetime">
          <DatePicker
            type="date"
            style="width: 100%"
            placeholder="请选择活动开始时间"
            v-model="shezhiForm.startDatetime"
          ></DatePicker>
        </FormItem>
        <FormItem label="活动结束时间" prop="endDatetime">
          <DatePicker
            type="date"
            style="width: 100%"
            placeholder="请选择活动结束时间"
            v-model="shezhiForm.endDatetime"
          ></DatePicker>
        </FormItem>
        <FormItem label="活动图片">
          <addgood-img @increment="changeImgs"></addgood-img>
        </FormItem>
        <FormItem label="活动标题" prop="huodongtitle">
          <Input
            type="text"
            v-model="shezhiForm.huodongtitle"
            placeholder="请输入活动标题"
            style="width: 100%"
          />
        </FormItem>
        <FormItem label="活动说明">
          <edit
            @increment="changehuodongshuoming"
            :detailInfo="shezhiForm.huodongshuoming"
            v-model="showshuoming"
          ></edit>
        </FormItem>
      </div>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";
import addgoodImg from "@/components/zhaoshengbaoming/wxmall/addgoodImg.vue";
import toolbox from "@/libs/toolbox";
export default {
  components: {
    edit,
    addgoodImg,
  },
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdata: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.value,
      showshuoming: false,
      loading: true,
      shezhiForm: {
        id: "",
        huodongID: "",
        isShow: 1,
        huodongtitle: "",
        huodongImg: "",
        huodongshuoming: "",
        startDatetime: "",
        endDatetime: "",
      },
      shezhiFormRule: {
        huodongID: [
          {
            required: true,
            message: "请选择活动",
            trigger: "change",
            type: "string",
          },
        ],
        isShow: [
          {
            required: true,
            message: "请选择活动是否显示",
            trigger: "change",
            type: "number",
          },
        ],
        huodongtitle: [
          {
            required: true,
            message: "请输入活动标题",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allhuodongData: [],
    };
  },
  methods: {
    ...mapActions([
      "addWscHuodongVal",
      "GetAllShowHuodongList",
      "updateWscHuodongValByID",
      "getwscHuodongInfoByID",
    ]),
    ok() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          if (this.editdata == "") {
            this.addWscHuodongVal({
              huodongid: this.shezhiForm.huodongID,
              paixu: 0,
              isshow: this.shezhiForm.isShow,
              huodongtitle: this.shezhiForm.huodongtitle,
              huodongImg: this.shezhiForm.huodongImg,
              huodongshuoming: this.shezhiForm.huodongshuoming,
              startDatetime: this.shezhiForm.startDatetime,
              endDatetime: this.shezhiForm.endDatetime,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
                this.loading = false;
                setTimeout(() => {
                  this.loading = true;
                }, 0);
              }
            });
          } else {
            this.updateWscHuodongValByID({
              id: this.shezhiForm.id,
              huodongid: this.shezhiForm.huodongID,
              paixu: 0,
              isshow: this.shezhiForm.isShow,
              huodongtitle: this.shezhiForm.huodongtitle,
              huodongImg: this.shezhiForm.huodongImg,
              huodongshuoming: this.shezhiForm.huodongshuoming,
              startDatetime: this.shezhiForm.startDatetime,
              endDatetime: this.shezhiForm.endDatetime,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
              } else {
                this.$Message.error(res.msg);
                this.loading = false;
                setTimeout(() => {
                  this.loading = true;
                }, 0);
              }
            });
          }
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
        }
      });
    },
    checkstaffTel() {},
    closeModal(val) {
      this.$emit("input", val);
      this.showshuoming = false;
    },
    changehuodongshuoming(content) {
      this.shezhiForm.huodongshuoming = content;
    },
    changeImgs(imgurl) {
      this.shezhiForm.huodongImg = JSON.parse(imgurl)[0].url;
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shezhiForm"].resetFields();
        this.GetAllShowHuodongList({}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allhuodongData = res.obj;
          }
        });
        console.log(JSON.parse(this.editdata));
        if (this.editdata != "") {
          this.shezhiForm.huodongID = JSON.parse(this.editdata).huodongID;
          this.shezhiForm.isShow = JSON.parse(this.editdata).isShow;
          this.shezhiForm.id = JSON.parse(this.editdata).id;

          console.log(this.shezhiForm);

          this.getwscHuodongInfoByID({
            huodongID: this.shezhiForm.huodongID,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              console.log(res);
              this.shezhiForm.huodongtitle = res.obj.huodongtitle;
              this.shezhiForm.huodongImg = res.obj.huodongImg;
              this.shezhiForm.huodongshuoming = res.obj.huodongshuoming;

              if (
                res.obj.startDatetime != "" &&
                res.obj.startDatetime != null
              ) {
                this.shezhiForm.startDatetime = toolbox.dateFtt(
                  res.obj.startDatetime,
                  "yyyy-MM-dd HH:mm:ss"
                );
              }

              if (res.obj.endDatetime != "" && res.obj.endDatetime != null) {
                this.shezhiForm.endDatetime = toolbox.dateFtt(
                  res.obj.endDatetime,
                  "yyyy-MM-dd HH:mm:ss"
                );
              }

              this.showshuoming = true;
            }
          });
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
