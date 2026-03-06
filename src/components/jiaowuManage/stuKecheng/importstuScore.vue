<template>
  <Modal
    v-model="show"
    title="导入学员成绩"
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
          <span>先【下载成绩导入模板】Excel，组织好成绩数据,然后再导入</span>
        </Col>
      </Alert>
    </div>

    <Row>
      <Col span="2">下载模板：</Col>
      <Col span="4">
        <Button type="success" @click="deMuban()">下载成绩导入模板</Button>
      </Col>
      <Col span="4" offset="1">要导入的Excel文件：</Col>
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
          :before-upload="uploadBefore"
          :on-format-error="handleFormatError"
          :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline" style="margin-left: 10px">选择文件</Button>
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
import * as api from "@/api/api.js";

export default {
  name: "importstuScore",
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
      files: null, //上传的文件
      fileName: "",
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
      this.$refs.upload.post(this.files);
    },

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
        desc: "文件 " + file.name + " 格式不正确，请上传.xls,.xls文件。",
      });
    },

    /**导出模板 */
    deMuban() {
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-stu/stu/buxikecheng/ExportstuScoreMuban",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {},
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
          link.setAttribute("download", "导入学员成绩模板.xls");
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
    this.actionUrl = baseUrl + "xwcloud-stu/stu/buxikecheng/stuScorereadExcel";
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
