<template>
  <Modal
    v-model="show"
    title="导入图书信息"
    :loading="loading"
    :mask-closable="false"
    width="50"
  >
    <div>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col style="margin-top: 10px">
          <span>温馨提示：先下载导入模板文件，再进行导入</span>
        </Col>
      </Alert>
    </div>

    <Row>
      <Col span="2">下载模板：</Col>
      <Col span="4">
        <Button type="success" @click="deMuban()">下载图书导入模板</Button>
      </Col>
      <Col span="4" offset="1">要导入的Excel文件：</Col>
      <Col span="9">
        <Input v-model="fileName" disabled />
      </Col>
      <Col span="4">
        <Upload
          ref="upload"
          type="drag"
          :action="actionUrl"
          :headers="requestheader"
          :on-success="uploadSuccess"
          :format="['xlsx', 'xls']"
          :before-upload="uploadBefore"
          :on-format-error="handleFormatError"
          :show-upload-list="false"
        >
          <Button icon="ios-cloud-upload-outline" style="margin-left: 10px"
            >选择文件</Button
          >
        </Upload>
      </Col>
    </Row>
    <div slot="footer">
      <Button type="primary" @click="ok()">导入</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { getToken } from "@/libs/util";
import axios from "@/libs/api.request";
import config from "@/config";
import * as api from "@/api/api.js";

export default {
  name: "addLaoshikehoupingjia",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    stuID: {
      //学生ID
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      fileName: "",
      actionUrl: "", //上传文件的请求路径
    };
  },
  methods: {
    ok() {
      // 点击确定按钮时调用
      //   this.$refs["updatephoneFrom"].validate((valid) => {
      //     if (valid) {
      //     } else {
      //       this.$Message.error("请将必填字段填写完整!");
      //       // 官方目前没有解决方案
      //       this.loading = false;
      //       setTimeout(() => {
      //         this.loading = true;
      //       }, 0);
      //     }
      //   });
      //点击按钮上传
      if (this.files == null) {
        this.$Message.error("请导入文件！");
        return;
      }
      this.$refs.upload.post(this.files);
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      if (response.code == "Y" && response.success == true) {
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
        desc: "文件 " + file.name + " 格式不正确，请上传.xls,.xlsx文件。",
      });
    },
    uploadBefore(file) {
      //上传前钩子
      this.files = file;
      this.fileName = file.name;
      return false;
    },
    /**导出模板 */
    deMuban() {
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-homeschool/homeschool/pxbooks/tushuInfoMuban",
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
          link.setAttribute("download", "图书信息导入模板.xls");
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
    const baseUrl =
      process.env.NODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro;
    this.actionUrl = baseUrl + "xwcloud-homeschool/homeschool/pxbooks/readExcel";
    // console.log("=======actionUrl:");
    // console.log(this.actionUrl);
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
        // this.$refs["updatephoneFrom"].resetFields();
        // 获取校区列表
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
