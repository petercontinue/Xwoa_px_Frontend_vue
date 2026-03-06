<template>
  <Modal
    v-model="show"
    title="导入学员档案"
    :mask-closable="false"
    width="55"
    ok-text="开始导入"
    :loading="loading"
    @on-ok="ok()"
    @on-cancel="closeModal(false)"
  >
    <div>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span style="color: red">先下载要导入的信息模板文件，组织好数据以后再来操作导入；两面的两种导入功能，选择其中一种操作；</span>
        </Col>
      </Alert>
    </div>
    <Row class="divShow">
      <Col span="6">
        <Button type="primary" @click="deMuban(2)">下载-带签单信息的导入模板文件</Button>
      </Col>
      <Col span="14">
        <span style="color: blue; line-height: 30px">提示：该模板是将学员的交费、课程、课时、单价、班级等信息一次性导入；</span>
      </Col>
    </Row>
    <Row class="divShow">
      <Col span="6">
        <Button type="primary" @click="deMuban(1)">下载-基础信息的导入模板文件</Button>
      </Col>
      <Col span="14">
        <span style="color: blue; line-height: 30px">提示：该模板仅仅只是学员个人的最基本的信息；导入后通过【续费】操作录入学员课程信息；</span>
      </Col>
    </Row>

    <Row class="divShow">
      <Col span="20">
        <RadioGroup v-model="params.jbid" @on-change="typechange">
          <Radio label="1">带签单信息导入</Radio>
          <Radio label="2">基本信息导入</Radio>
        </RadioGroup>
      </Col>
    </Row>

    <Row class="divShow">
      <Col span="4">要导入的Excel文件：</Col>
      <Col span="9">
        <Input v-model="fileName" disabled />
      </Col>
      <Col span="4">
        <Upload
          ref="upload"
          :action= actionUrl
          :headers="requestheader"
          :on-success="uploadSucess"
          :format="['xlsx', 'xls']"
          :data="params"
          :before-upload="uploadBefore"
          :on-format-error="handleFormatError"
          :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline" style="margin-left: 10px" type="info">选择文件</Button>
        </Upload>
      </Col>
    </Row>
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
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import config from '@/config';

export default {
  name: "importstuFiles",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      fileName: "",
      params: {
        jbid: "1",
      },
      files: null,
      actionUrl: ''     //上传文件的请求路径
    };
  },
  methods: {
    ...mapActions([]),

    ok() {
      //点击按钮上传
      if (this.files == null) {
        this.$Message.error("请导入文件！");
        return;
      }

      this.params.jbid = Number(this.params.jbid);
      console.log(this.files);
      this.$refs.upload.post(this.files);
    },
    typechange() {},

    closeModal(val) {
      this.$emit("input", val);
    },
    uploadBefore(file) {
      //上传前钩子
      this.files = file;
      this.fileName = file.name;
      return false;
    },
    uploadError() {
      //失败
      this.$Message.error("导入失败");
    },
    uploadSucess(response) {
      console.log(response);
      // 上传成功钩子;
      if (response.code == "Y" && response.success) {
        this.$Message.success(response.msg);
        this.files = null;
        this.fileName = "";
        this.params.jbid = "1";
        this.$emit("handleSearch");
        this.closeModal(false);
      } else {
        this.$Message.error(response.msg);
      }
    },

    /**文件检测 */
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件 " + file.name + " 格式不正确，请上传.xls,.xlsx文件。",
      });
    },

    /**导出模板 */
    deMuban(type) {
      let fName = "";
      if (type == 1) {
        fName = "基本信息导入模板";
      } else if (type == 2) {
        fName = "带签单信息导入模板";
      }
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-stu/stu/stuManagement/ExportstuFilesMuban",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: { jbid: type },
          responseType: "blob",
        })
        .then((res) => {
          this.btnLoading = false;
          // 文件下载
          const blob = new Blob([res], {
            type: "application/vnd.ms-excel",
          });
          let link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", fName);
          link.click();
          link = null;
          this.$Message.success("导出成功");
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    },
  },
  mounted() {
    const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
    this.actionUrl = baseUrl + "xwcloud-stu/stu/stuManagement/stuFilesExcel";
    // console.log("=======actionUrl:");
    // console.log(this.actionUrl);
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
