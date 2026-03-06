<template>
  <Modal
    v-model="show"
    title="老师课后反馈"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="laoshipingjiaFrom"
      :model="laoshipingjia"
      :rules="laoshipingjiaRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区">
        <Input type="text" readonly v-model="laoshipingjia.campusName" placeholder="请输入校区" />
      </FormItem>
      <FormItem label="上课班级">
        <Input type="text" readonly v-model="laoshipingjia.className" placeholder="请输入上课班级" />
      </FormItem>
      <FormItem label="上课时间段">
        <Input type="text" readonly v-model="laoshipingjia.sksjd" placeholder="请输入时间段" />
      </FormItem>
      <FormItem label="要点评的学员">
        <Input type="text" readonly v-model="laoshipingjia.stuName" placeholder="请输入学员" />
      </FormItem>
      <FormItem label="评价老师">
        <Input type="text" readonly v-model="laoshipingjia.staffName" placeholder="请输入老师" />
      </FormItem>
      <FormItem label="反馈内容" prop="note">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="laoshipingjia.note"
          placeholder="请输入反馈内容"
        />
      </FormItem>
      <FormItem label="图片">
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

    <Card v-if="haveImg">
      <span style="margin:20px;width:160px" v-for="(item,i) in allImg" :key="i">
        <img :src="item" class="iimg" />
        <Button
          type="error"
          size="small"
          style="position:relative;top:20px;left:-100px "
          @click="delImg(i)"
        >删除</Button>
      </span>
    </Card>
  </Modal>
</template>
<style>
.iimg {
  border: 2px solid rgb(8, 8, 8);
  border-radius: 5px;
  width: 150px;
  height: 150px;
}
</style>


<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import config from '@/config';
import * as api from "@/api/api.js";

export default {
  name: "editLaoshikehoupingjia",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    pinjiaID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      loading: true,
      laoshipingjia: {
        id: "",
        campusName: "", // 校区
        className: "",
        sksjd: "",
        stuName: "",
        staffName: "",
        note: "",
        imgAddr: "",
      },
      haveImg: false,
      allImg: [],
      laoshipingjiaRule: {
        // 验证输入
        note: [{ required: true, message: "请输入评价", trigger: "blur" }],
      },
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ...mapActions(["getFeedback", "editFeedback", "delFeedbackImg"]),
    ok() {
      // 点击确定按钮时调用
      api.post("xwcloud-homeschool/homeschool/pxevaluationtable/editFeedback",this.laoshipingjia).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    uploadSuccess(res, file) {
      console.log(res);
      this.$Message.success("上传成功！");
      this.laoshipingjia.imgAddr = res;
    },
    uploadError(error) {
      this.$Message.error("文件上传失败");
    },
    delImg: function (index) {
      this.allImg.splice(index, 1);
      console.log(this.pinjiaID);
      let imgUrl = "";
      this.allImg.forEach((item) => {
        imgUrl += item + ",";
      });

      this.delFeedbackImg({
        id: this.pinjiaID,
        ImgUrl: imgUrl,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
  },
  mounted() {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
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
        this.laoshipingjia.id = this.pinjiaID;
        this.allImg = [];
        this.haveImg = false;
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/pxevaluationtable/getFeedback",this.laoshipingjia).then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res.obj);
            this.laoshipingjia.campusName = res.obj.campusName;
            this.laoshipingjia.className = res.obj.className;
            let haveClassDate = toolbox.dateFtt(
              res.obj.haveClassDate,
              "yyyy-MM-dd"
            );
            let startLessonDateTime = toolbox.dateFtt(
              res.obj.startLessonDateTime,
              "hh:mm:ss"
            );
            let endLessonDateTime = toolbox.dateFtt(
              res.obj.endLessonDateTime,
              "hh:mm:ss"
            );
            this.laoshipingjia.sksjd =
              haveClassDate +
              " " +
              startLessonDateTime +
              "~" +
              endLessonDateTime;
            this.laoshipingjia.stuName = res.obj.stuName;
            this.laoshipingjia.staffName = res.obj.staffName;
            this.laoshipingjia.note = res.obj.note;
            if (res.obj.pjmp3Url != "" && res.obj.pjmp3Url != null) {
              this.haveImg = true;
              this.allImg = res.obj.pjmp3Url.split(",");
            }
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
