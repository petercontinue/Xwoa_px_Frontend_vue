<template>
  <div>
    <Row style="background: #eee; padding: 20px">
      <Col span="11">
        <Card :bordered="false">
          <p slot="title">签单信息</p>
          <p style="margin-top: 10px">签单校区：{{ qiandanData.campusName }}</p>
          <p style="margin-top: 10px">学员姓名：{{ qiandanData.stuName }}</p>
          <p style="margin-top: 10px">学员年级/年龄段：{{ qiandanData.stuGradeName }}</p>
          <p style="margin-top: 10px">签单总金额：{{ qiandanData.hetongMoney }}</p>
          <p style="margin-top: 10px">交费时间：{{ qiandanData.qiandandate }}</p>
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
      <p slot="title">合同文件信息</p>
      <Row style="background: #eee; padding: 20px">
        <div class="oneXC" v-for="(item, index) in hetongFile">
          <img :src="item" alt="" @click.prevent="wordDetail(item)" :href="item" />
          <div class="txtDiv">
            <div class="txtLeft">合同</div>
            <div class="txtRight">
              <Button type="error" @click="deletehetongwenjian(item, index)">删除</Button>
            </div>
          </div>
        </div>
      </Row>
    </Card>
  </div>
</template>
<script>
import { getToken } from "@/libs/util";
import config from "@/config";
import * as api from "@/api/api.js";

export default {
  data() {
    return {
      qiandanData: [],
      requestheader: {
        Authorization: "Bearer " + getToken(),
      },
      hetongFile: [],
      actionUrl: "", //上传文件的请求路径
    };
  },

  methods: {
    //查看合同
    wordDetail(url) {
      let hz1 = url.substring(url.length - 4, url.length);
      let hz2 = url.substring(url.length - 5, url.length);

      // 微软提供的方法
      if (hz1 == ".pdf") {
        window.open(url);
      } else if (hz2 == ".docx") {
        window.open("https://view.officeapps.live.com/op/view.aspx?src=" + url);
      }
    },
    /**获取合同数据 */
    getshuju() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanInfoByQiandanID_ht",{
        qiandanID: this.$route.query.qiandanID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.qiandanData = res.obj;
          if (this.qiandanData.hetong != null) {
            let hetonglist = this.qiandanData.hetong.split(",");
            console.log(hetonglist);
            hetonglist.forEach((item) => {
              if (item) {
                this.hetongFile.push(item);
              }
            });
          }
        }
      });
    },

    //-----------------------------上传-------------------------------
    uploadSuccess(response, file, fileList) {
      console.log(response);
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/SaveQiandanHetong",{
        qiandanID: this.$route.query.qiandanID,
        imgurl: response,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.error("文件上传成功");
        } else {
          this.$Message.error("文件上传失败");
        }
      });
    },
    uploadError(error) {
      this.$Message.error("文件上传失败");
    },

    /**删除合同 */
    deletehetongwenjian(url, i) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该文件？</p>",
        onOk: () => {
          // console.log(key.split("com/")[1]);

          // this.delFileFromAliOss({
          //   delFilePath: url,
          // }).then((res) => {
          //   if (res.code == "Y" && res.success == true) {
          //     this.$Message.success("删除成功");
          //   } else {
          //     this.$Message.error("删除失败");
          //   }
          // });

          this.hetongFile.splice(i, 1);

          let newurl = "";
          this.hetongFile.forEach((item) => {
            newurl += item + ",";
          });
          api.del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/Deletehetong",{
            qiandanID: this.$route.query.qiandanID,
            newhetong: newurl,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("删除合同文件成功");
            } else {
              this.$Message.error("删除合同文件失败");
            }
          });
        },
      });
    },
  },

  mounted() {
    const baseUrl =
      process.env.NODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro;
    //this.actionUrl = baseUrl + "xwcloud-sys/qiniu/image";
    this.actionUrl = baseUrl + "xwcloud-sys/aliyun/uploadFileToAliOss";
    console.log("签单ID：" + this.$route.query.qiandanID);
    this.getshuju();
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
