<style scoped>
.editor {
  height: 250px;
}
</style>
<template>
  <div v-model="show">
    <Upload
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="['jpg', 'jpeg', 'png', 'gif']"
      :max-size="2048"
      :action="actionUrl"
      :headers="requestheader"
    >
      <Button icon="ios-cloud-upload-outline"></Button>
    </Upload>
    <quill-editor
      v-model="content"
      ref="QuillEditor"
      :options="options"
      @change="onEditorChange($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import config from "@/config";
import { mapActions } from "vuex";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  name: "editor",
  props: {
    value: {
      type: Boolean,
    },
    goodsID: {
      type: String,
      default: "",
    },
    detailInfo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.value,
      quill: null,
      options: {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image", "video"],
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  // 调用iview图片上传
                  document.querySelector(".ivu-upload .ivu-btn").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
        placeholder: "输入信息",
      },
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      content: "",
      actionUrl: "", //上传文件的请求路径
    };
  },
  mounted() {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? config.baseUrl.dev
        : config.baseUrl.pro;
      process.env.NODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro;
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
    if (this.goodsID != "") {
      this.GetGoodsInfoDetail({ goodsID: this.goodsID }).then((response) => {
        if (response.code == "Y" && response.success == true) {
          this.content = response.obj.goodinfo;
        }
      });
    }
  },
  methods: {
    ...mapActions(["GetGoodsInfoDetail", "uploadimagetoqiniuyun"]),
    //直接打印出富文本内容
    getContent() {
      const html = document.querySelector(".editor").children[0].innerHTML;
    },
    handleSuccess(res) {
      console.log(res);
      console.log(this.$refs.QuillEditor);
      // 获取富文本组件实例
      let quill = this.$refs.QuillEditor.quill;
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, "image", res);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        // 提示信息，需引入Message
        Message.error("图片插入失败");
      }
    },
    onEditorChange(data) {
      this.$emit("increment", this.content);
    },
    onEditorReady(dom) {
      this.content = this.detailInfo; // 在ready方法中手动赋值
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      console.log(this.detailInfo);
      if (this.detailInfo == "null") {
        this.content = "";
      } else {
        this.content = this.detailInfo;
      }
    },
  },
};
</script>
<style scoped>
.ivu-upload {
  display: none;
}
</style>
