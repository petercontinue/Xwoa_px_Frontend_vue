<template>
  <div>
    <Row style="background: #eee; padding: 20px">
      <Col span="11">
        <Card :bordered="false">
          <p slot="title">相册信息</p>
          <p style="margin-top: 10px" v-if="xiangceData.type == 1">相册类型：学员相册</p>
          <p style="margin-top: 10px" v-if="xiangceData.type == 2">相册类型：校区相册</p>
          <p style="margin-top: 10px" v-if="xiangceData.type == 3">相册类型：班级相册</p>
          <p style="margin-top: 10px">相册标题：{{ xiangceData.title }}</p>
          <p style="margin-top: 10px">相册描述：{{ xiangceData.miaoshu }}</p>
        </Card>
      </Col>
      <Col span="11" offset="2">
        <Card shadow>
          <p slot="title">选择上传文件</p>
          <Upload
            multiple
            type="drag"
            :action="actionUrl"
            :headers="requestheader"
            :on-success="uploadSuccess"
          >
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或拖拽需要上传的文件到此处</p>
            </div>
          </Upload>
        </Card>
      </Col>
    </Row>
    <Card :bordered="false">
      <p slot="title">相册图片信息</p>
      <!-- <showbig-img :xiangceID="xiangceID"></showbig-img> -->
      <Row style="background: #eee; padding: 20px">
        <view class="oneXC" v-for="item in hetongFile">
          <img :src="item.image" alt="" @click="handleView(item.image)" />
          <div class="txtDiv">
            <div class="txtLeft">
              <span v-if="item.miaoshu != ''">{{ item.miaoshu }}</span>
              <span v-if="item.miaoshu == ''">无图片说明</span>
            </div>
            <div class="txtRight">
              <Button type="error" @click="deletexiangceImg(item)">删除</Button>
            </div>
          </div>
        </view>
      </Row>
    </Card>
    <Modal title="查看大图" v-model="visible" class-name="fl-image-modal">
      <img :src="imgUrl" v-if="visible" style="width: 100%; height: 100%" />
    </Modal>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { getToken } from "@/libs/util";
import config from "@/config";
import showbigImg from "../../../components/jiaowuManage/showbigImg.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    showbigImg,
  },

  methods: {
    LoadxiangceImg() {
      api
        .get("xwcloud-homeschool/homeschool/pxxiangcetable/GetXiangceInfo", {
          xiangceid: this.$route.query.xiangceID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res);
            this.xiangceData = res.obj;
          }
        });
      api
        .get("xwcloud-homeschool/homeschool/pxxiangcetable/getXiangceImagePage", {
          xiangceid: this.$route.query.xiangceID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.hetongFile = res.obj;
            this.imgData = JSON.stringify(res.obj);
          }
        });
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      api
        .post("xwcloud-homeschool/homeschool/pxxiangcetable/addXiangceImage", {
          xiangceid: this.$route.query.xiangceID,
          image: response,
          miaoshu: "",
        })
        .then((result) => {
          if (result.code == "Y" && result.success == true) {
            this.LoadxiangceImg();
            this.$Message.success("图片上传保存成功");
          } else {
            this.$Message.error("图片上传保存失败");
          }
        });
    },
    uploadError(error) {
      this.$Message.error("文件上传失败");
    },
    deletexiangceImg(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该图片文件？</p>",
        onOk: () => {
          console.log(data);
          api
            .del("xwcloud-homeschool/homeschool/pxxiangcetable/delXiangceImage", {
              id: data.id,
            })
            .then((res) => {
              console.log(res);
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除图片信息成功！");
                this.LoadxiangceImg();
              } else {
                this.$Message.error("删除相册图片失败");
              }
            });
        },
      });
    },
    handleView(url) {
      this.imgUrl = url;
      this.visible = true;
    },
  },
  data() {
    return {
      xiangceData: [],
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      hetongFile: "",
      visible: false,
      imgUrl: "",
      xiangceID: this.$route.query.xiangceID,
      actionUrl: "", //上传文件的请求路径
    };
  },
  mounted() {
    const baseUrl =
      process.env.NODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro;
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";

    this.LoadxiangceImg();
  },
};
</script>
<style>
.oneXC {
  width: 260px;
  height: 280px;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  margin: 20px;
  float: left;
  box-shadow: 8px 8px 5px #f5f5f5;
  overflow: hidden;
}

.oneXC:hover {
  border: 1px solid #d2ebfd;
  /*box-shadow: 8px 8px 5px #d2ebfd;*/
}

.oneXC img {
  display: block;
  width: 240px;
  height: 200px;
  margin: 0px auto;
  margin-top: 10px;
}
</style>
