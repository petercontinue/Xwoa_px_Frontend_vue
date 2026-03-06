<template>
  <div>
    <Row>
      <Col span="6">
        <Row>
          <Col span="12">
            <Input v-model="params.title" placeholder="请输入标题模糊查询" />
          </Col>
          <Col span="4"><Button @click="searchTitle">查询</Button></Col>
          <Col span="4"><Button @click="allxiangce">全部</Button></Col>
          <Col span="4"
            ><Button type="primary" @click="addphotoClick"
              >新建相册</Button
            ></Col
          >
        </Row>
      </Col>
    </Row>
    <Row>
      <Col span="4" class="colimg" v-for="item in data" :key="item.id">
        <img :src="item.imgurl" />
        <p>
          <span class="oneLeft">{{ item.stuName }}</span>
          <span class="oneRight" v-if="item.type == 1">学员相册</span>
          <span class="oneRight" v-else-if="item.type == 2">校区相册</span>
          <span class="oneRight" v-else-if="item.type == 3">班级相册</span>
        </p>
        <p>
          <span class="oneLeft">{{ item.title }}</span
          ><span class="oneRight"
            ><a @click="updatexiangce(item)">修改</a>
            <a @click="deletexiangce(item)">删除</a></span
          >
        </p>
      </Col>
    </Row>
    <Row>
      <Page
        :total="total"
        show-elevator
        show-total
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addphoto
      v-model="addphotoshow"
      v-on:handleSearch="getPhotoPage"
      :editData="editData"
    ></addphoto>
  </div>
</template>
<script>
import Addphoto from "./addphoto.vue";
import * as api from "@/api/api.js";

export default {
  components: { Addphoto },
  data() {
    return {
      addphotoshow: false,
      total: 0,
      params: {
        size: 10,
        current: 1,
        type: 2,
        title: "",
      },
      data: [],
      editData: "",
      addnewxiangce: false,
    };
  },
  methods: {
    getPhotoPage() {
      api.get("xwcloud-homeschool/homeschool/pxxiangcetable/getXiangcePage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
        }
      });
    },
    addphotoClick() {
      this.editData = "";
      this.addphotoshow = true;
    },
    updatephoto() {},
    changePage(current) {
      // 翻页
      this.current = current;
      this.getPhotoPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.size = pageSize;
      this.getPhotoPage();
    },
    searchTitle() {
      this.getPhotoPage();
    },
    allxiangce() {
      this.params.title = "";
      this.params.size = 10;
      this.params.current = 1;
      this.getPhotoPage();
    },
    deletexiangce(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该相册？</p>",
        onOk: () => {
          api.del("xwcloud-homeschool/homeschool/pxxiangcetable/delXiangce",{ ID: data.id }).then((res) => {
            console.log(res);
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("相册删除成功");
              this.getPhotoPage();
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
      });
    },
    updatexiangce(data) {
      this.editData = JSON.stringify(data);
      this.addphotoshow = true;
    },
  },
  mounted: function () {
    this.getPhotoPage();
  },
};
</script>

<style>
.colimg {
  padding: 10px;
  background-color: white;
  margin: 20px;
  text-align: center;
}
.colimg img {
  width: 240px;
  height: 200px;
}
.colimg .oneLeft {
  float: left;
  width: 160px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: left;
}
.colimg .oneRight {
  float: right;
  width: 60px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: right;
}
</style>