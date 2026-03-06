<template>
  <Modal
    v-model="show"
    title="添加活动信息"
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
      <FormItem label="主题轮播图">
        <addgood-img @increment="changeImgs"></addgood-img>
      </FormItem>

      <FormItem label="机构名称" prop="jigouname">
        <Input
          type="text"
          v-model="shezhiForm.jigouname"
          placeholder="请输入机构名称"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="校区地址" prop="campusaddress">
        <Input
          type="text"
          v-model="shezhiForm.campusaddress"
          placeholder="请输入校区地址"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="咨询热线" prop="zxtel">
        <Input type="text" v-model="shezhiForm.zxtel" placeholder="请输入咨询热线" style="width: 100%" />
      </FormItem>
      <FormItem label="分享标题" prop="fxtitle">
        <Input
          type="text"
          v-model="shezhiForm.fxtitle"
          placeholder="请输入分享标题（20字）"
          maxlength="20"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="分享说明" prop="fxshuoming">
        <Input
          type="textarea"
          v-model="shezhiForm.fxshuoming"
          placeholder="请输入分享说明"
          style="width: 100%"
        />
      </FormItem>
      <FormItem label="分享logo">
        <Card shadow>
          <Upload
            multiple
            type="drag"
            :action= actionUrl
            :headers="requestheader"
            :on-success="uploadSuccess"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖拽需要上传的文件到此处</p>
            </div>
          </Upload>
        </Card>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="savezhuti()">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import addgoodImg from "@/components/zhaoshengbaoming/wxmall/addgoodImg.vue";
import toolbox from "@/libs/toolbox";
import { getToken } from "@/libs/util";
import config from '@/config';

export default {
  components: {
    addgoodImg,
  },
  name: "addOreditzhuti",
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
      shezhiForm: {
        id: "",
        lunboimgs: "",
        jigouname: "",
        campusaddress: "",
        zxtel: "",
        fxtitle: "",
        fxshuoming: "",
        logo: "",
      },
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      shezhiFormRule: {
        jigouname: [
          {
            required: true,
            message: "请输入机构名称",
            trigger: "blur",
          },
        ],
        campusaddress: [
          {
            required: true,
            message: "请输入校区地址",
            trigger: "blur",
          },
        ],
        zxtel: [
          {
            required: true,
            message: "请输入咨询热线",
            trigger: "blur",
          },
        ],
      },
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ...mapActions(["addOreditZhuti"]),

    savezhuti() {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          console.log(this.shezhiForm);
          this.addOreditZhuti(this.shezhiForm).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 提交表单数据成功则关闭当前的modal框
              this.handleReset();
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请将必填字段填写完整!");
        }
      });
    },
    /**清除 */
    handleReset() {
      this.$refs["shezhiForm"].resetFields();
      this.closeModal(false);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
    changeImgs(imgurl) {
      console.log(JSON.parse(imgurl));
      this.shezhiForm.lunboimgs = "";
      let imgdata = JSON.parse(imgurl);
      imgdata.forEach((item) => {
        this.shezhiForm.lunboimgs += item.url + ",";
      });
      console.log(this.shezhiForm);
    },

    uploadSuccess(res, file) {
      //   console.log(res); //图片地址
      this.$Message.success("上传成功！");
      this.shezhiForm.logo = res;
    },
    uploadError(error) {
      this.$Message.error("文件上传失败");
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
        this.$refs["shezhiForm"].resetFields();
        console.log(JSON.parse(this.editdata));
        let getdata = JSON.parse(this.editdata);
        if (this.editdata != "") {
          this.shezhiForm.id = getdata.id;
          //   this.shezhiForm.lunboimgs = getdata.images;
          this.shezhiForm.jigouname = getdata.schoolName;
          this.shezhiForm.campusaddress = getdata.campusAdress;
          this.shezhiForm.zxtel = getdata.lianxiTel;
          this.shezhiForm.fxtitle = getdata.activityName;
          this.shezhiForm.fxshuoming = getdata.activityDiscription;
          this.shezhiForm.logo = getdata.logo;
          console.log(this.shezhiForm);
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
