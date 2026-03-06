<template>
  <div id="index" ref="imgView">
    <ul class="imgUrl">
      <li v-for="(item, index) of ImgData">
        <img :src="item.image" alt="图片描述" />
      </li>
    </ul>
  </div>
</template>

<script>
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import * as api from "@/api/api.js";

export default {
  props: {
    xiangceID: {
      type: String,
    },
  },
  data() {
    return {
      ImgData: [],
      imgArr: [
        "http://imgs.jxb666.com/38ad2f20-5830-4c66-b11b-8953f50df219.jpg",
        "http://imgs.jxb666.com/38ad2f20-5830-4c66-b11b-8953f50df219.jpg",
        "http://imgs.jxb666.com/38ad2f20-5830-4c66-b11b-8953f50df219.jpg",
      ],
    };
  },
  methods: {
  },
  mounted() {
    const ViewerDom = this.$refs.imgView;
    console.log(ViewerDom);
    const viewer = new Viewer(ViewerDom, {
      // 相关配置项,详情见下面
    });

    api
      .get("prefix/homeschool/pxxiangcetable/getXiangceImagePage", {
        xiangceid: this.xiangceID,
      })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.ImgData = res.obj;
          console.log("刷新");
          viewer.update();
          console.log("刷新完成");
          console.log(ViewerDom);
        }
      });
  },
};
</script>

<style scoped>
.imgUrl {
  display: flex;
  flex-wrap: wrap;
}
.imgUrl li {
  width: 148px;
  height: 148px;
  list-style: none;
  border: 2px solid #ccc;
  border-radius: 3px;
  padding: 1px;
  margin: 10px;
  cursor: pointer;
}
.imgUrl li img {
  width: 100%;
  height: 100%;
}
</style>
