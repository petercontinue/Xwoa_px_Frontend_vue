<template>
  <Modal
    v-model="show"
    title="添加/修改投票活动"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="80"
  >
    <Form
      ref="addtoupiao"
      :model="addtoupiao"
      :rules="addtoupiaoRule"
      :label-width="200"
      :label-colon="true"
    >
      <Row>
        <Col span="24">
          <FormItem label="投票活动名称（最多50字）" prop="toupiaohuodongname">
            <Input
              type="text"
              v-model="addtoupiao.toupiaohuodongname"
              placeholder="请输入活动名称"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="活动日期" prop="huodongDate">
            <DatePicker
              type="daterange"
              placement="bottom-end"
              placeholder="选择活动日期"
              style="width: 100%"
              v-model="addtoupiao.huodongDate"
              @on-change="changeDate"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="投票方式" prop="toupiaostyle">
            <Select v-model="addtoupiao.toupiaostyle">
              <Option :value="1" :key="1">每人只能投一次投一票</Option>
              <Option :value="2" :key="2">每人每天都可以投一票</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="活动简介（最多150字）" prop="jigoujianjie">
            <Input type="textarea" placeholder="请输入活动简介，最多150字" v-model="addtoupiao.jigoujianjie" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="活动主图（不可为空）" prop="logo">
            <Upload
              type="drag"
              :action= actionUrl
              :headers="requestheader"
              :on-success="handleSuccess"
            >
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>图片拖拽到此处或点击上传</p>
              </div>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="活动奖品" prop="jiangpin">
            <!-- <edit @increment="changejiangpingInfo"></edit> -->
            <Input v-model="addtoupiao.jiangpin" type="textarea" placeholder="请输入奖品信息" :rows="6" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="活动规则" prop="rules">
            <edit @increment="changeguize"></edit>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import config from '@/config';
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";

export default {
  components: {
    edit,
  },
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      addtoupiao: {
        id: 0,
        toupiaohuodongname: "",
        toupiaostyle: 0,
        huodongDate: [],
        jigoujianjie: "",
        rules: "",
        jiangpin: "",
        starttime: "",
        endtime: "",
        logo: "",
      },
      addtoupiaoRule: {
        toupiaohuodongname: [
          {
            required: true,
            message: "请输入投票活动名称",
            trigger: "change",
            type: "string",
          },
        ],
        toupiaostyle: [
          {
            required: true,
            message: "请选择投票方式",
            trigger: "change",
            type: "number",
          },
        ],
        huodongDate: [
          {
            required: true,
            message: "请选择活动时间",
            trigger: "change",
            type: "array",
          },
        ],
        jigoujianjie: [
          {
            required: true,
            message: "请输入活动简介",
            trigger: "change",
            type: "string",
          },
        ],
      },
      showzongjia: false,
      allcampusData: [],
      allkemu: [],
      allbuxistyleData: [],
      allclasstimestyleData: [],
      kemuText: "",
      buxistyleText: "",
      classtimeStyleText: "",
      jifeistyleText: "",
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ...mapActions(["addWhdToupiaoHuodong", "updateWhdToupiaoHuodongByID"]),

    ok() {
      this.$refs["addtoupiao"].validate((valid) => {
        if (valid) {
          if (this.editData != "") {
            //修改投票信息
            this.updateWhdToupiaoHuodongByID({
              id: this.addtoupiao.id,
              toupiaohuodongname: this.addtoupiao.toupiaohuodongname,
              miaoshu: this.addtoupiao.miaoshu,
              logo: this.addtoupiao.logo,
              toupiaostyle: this.addtoupiao.toupiaostyle,
              jiangpin: this.addtoupiao.jiangpin,
              rules: this.addtoupiao.rules,
              jigoujianjie: this.addtoupiao.jigoujianjie,
              starttime: this.addtoupiao.huodongDate[0],
              endtime: this.addtoupiao.huodongDate[1],
            }).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.$Message.success(result.msg);
                //关闭弹出框
                this.closeModal();
                //刷新父级页面数据
                this.$emit("handleSearch");
              } else {
                this.$Message.error(result.msg);
              }
            });
          } else {
            //添加投票信息
            this.addWhdToupiaoHuodong({
              toupiaohuodongname: this.addtoupiao.toupiaohuodongname,
              miaoshu: this.addtoupiao.miaoshu,
              logo: this.addtoupiao.logo,
              toupiaostyle: this.addtoupiao.toupiaostyle,
              jiangpin: this.addtoupiao.jiangpin,
              rules: this.addtoupiao.rules,
              jigoujianjie: this.addtoupiao.jigoujianjie,
              starttime: this.addtoupiao.huodongDate[0],
              endtime: this.addtoupiao.huodongDate[1],
            }).then((result) => {
              if (result.code == "Y" && result.success == true) {
                this.$Message.success(result.msg);
                //关闭弹出框
                this.closeModal();
                //刷新父级页面数据
                this.$emit("handleSearch");
              } else {
                this.$Message.error(result.msg);
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
    },
    changejiangpingInfo(data) {
      this.addtoupiao.jiangpin = data;
    },
    changeguize(data) {
      this.addtoupiao.rules = data;
    },
    handleSuccess(res, file) {
      this.addtoupiao.log = res;
    },
    changeDate(date, type) {
      this.addtoupiao.starttime = toolbox.dateFtt(date[0], "yyyy-MM-dd");
      this.addtoupiao.endtime = toolbox.dateFtt(date[1], "yyyy-MM-dd");
    },
  },
  mounted() {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["addtoupiao"].resetFields();
        if (this.editData != "") {
          var data = JSON.parse(this.editData);
          console.log(data);

          this.addtoupiao.toupiaohuodongname = data.toupiaoHuodongName;
          this.addtoupiao.toupiaostyle = data.toupiaoStyle;
          this.addtoupiao.jigoujianjie = data.jigouJianjie;
          this.addtoupiao.rules = data.rules;
          this.addtoupiao.jiangpin = data.jiangpin;
          this.addtoupiao.starttime = toolbox.dateFtt(
            data.startTime,
            "yyyy-MM-dd"
          );
          this.addtoupiao.endtime = toolbox.dateFtt(data.endTime, "yyyy-MM-dd");

          this.addtoupiao.huodongDate[0] = this.addtoupiao.starttime;
          this.addtoupiao.huodongDate[1] = this.addtoupiao.endtime;
          this.addtoupiao.logo = data.logo;
          this.addtoupiao.id = data.id;
          console.log(this.addtoupiao);
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
