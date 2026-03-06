<template>
  <Tabs value="name1">
    <TabPane label="模板库" name="name1">
      <div>
        <Tag
          checkable
          color="primary"
          size="large"
          :checked="searchData.mbTypeID == 0"
          :key="0"
          :name="0"
          @click.native="clickSearch(0)"
          >全部</Tag
        >
        <Tag
          checkable
          color="primary"
          size="large"
          :checked="searchData.mbTypeID == item.id"
          v-for="item in allhuodongData"
          :key="item.id"
          :name="item.id"
          @click.native="clickSearch(item.id)"
          >{{ item.huodongName }}</Tag
        >
      </div>
      <Row>
        <div>
          <div
            style="width: 15%;margin-top: 1%;float: left;margin-right: 20px;margin-bottom: 20px;padding-bottom: 15px;border-bottom: 1px solid #ededed;border-radius: 5px;"
            v-for="item in allzhaoxuexiuData"
          >
            <Card>
              <vue-hover-mask @click="handleClick">
                <!-- 默认插槽 -->
                <img
                  :src="item.mbImgUrl"
                  alt=""
                  style="width: 100%; height: 180px"
                />
                <!-- action插槽 -->
                <template v-slot:action>
                  <div
                    style="
                      width: 55%;
                      height: 55%;
                      position: absolute;
                      top: 40%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                  >
                    <img
                      id="erweimaimg"
                      style="width: 100%; height: 100%"
                      :src="qrcode"
                      alt=""
                    />
                    <p style="margin-top: 1.5%">扫一扫手机制作</p>
                  </div>
                </template>
              </vue-hover-mask>
              <p style="text-align: center; font-size: 8px">
                {{ item.mbName }}
              </p>
              <div style="text-align: center">
                <Button type="primary" @click="zhizuozhaoxuexiu(item)"
                  >立即制作</Button
                >
              </div>
            </Card>
          </div>
        </div>
      </Row>
      <Row>
        <Page
          :total="total"
          show-sizer
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size="searchData.size"
          :current="searchData.current"
        />
      </Row>
    </TabPane>
    <TabPane label="已发布的招生活动" name="name2">
      <Row>
        <div>
          <div
            style="
              width: 15%;
              margin-top: 1%;
              float: left;
              margin-right: 20px;
              margin-bottom: 20px;
              padding-bottom: 15px;
              border-bottom: 1px solid #ededed;
              border-radius: 5px;
            "
            v-for="item in allMobanmymb"
          >
            <Card>
              <vue-hover-mask>
                <!-- 默认插槽 -->
                <img
                  :src="item.mbImgUrl"
                  alt=""
                  style="width: 100%; height: 180px"
                />
                <!-- action插槽 -->
                <template v-slot:action>
                  <div
                    style="
                      width: 55%;
                      height: 55%;
                      position: absolute;
                      top: 40%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                  >
                    <img
                      id="erweimaimg"
                      style="width: 100%; height: 100%"
                      :src="qrcode"
                      alt=""
                    />
                    <p style="margin-top: 1.5%">扫一扫手机制作</p>
                  </div>
                </template>
              </vue-hover-mask>
              <p style="text-align: center; font-size: 8px">
                {{ item.mbName }}
              </p>
              <div style="text-align: center">
                <Button type="primary">立即制作</Button>
              </div>
            </Card>
          </div>
        </div>
      </Row>
      <Row>
        <Page
          :total="total"
          show-sizer
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePagemymb"
          @on-page-size-change="changePageSizemymb"
          :page-size="searchData.size"
          :current="searchData.current"
        />
      </Row>
    </TabPane>
    <TabPane label="素材模板中心" name="name3">
      <Form
        ref="sucaiForm"
        :model="sucaiForm"
        :rules="sucaiFormRules"
        :label-width="200"
        :label-colon="true"
      >
        <Row>
          <FormItem label="联系方式">
            <Input
              type="textarea"
              :rows="6"
              v-model="sucaiForm.mbLianxifangshi"
              placeholder="请输入机构联系方式信息"
            />
          </FormItem>
          <FormItem label="咨询二维码">
            <addgood-img @increment="changeImgs" ></addgood-img>
          </FormItem>
          <FormItem label="机构简介">
            <edit @increment="changeGoodsDetail" :detailInfo="sucaiForm.jigoujianjie" v-if="showedit"></edit>
          </FormItem>
          <FormItem label="机构名称">
            <Tooltip
              content="名称将用于部分活动页/支付确认页的展示，≤50个字"
              style="width: 100%"
              :max-width="300"
            >
              <Input
                type="text"
                placeholder="请输入机构名称"
                style="width: 100%"
                v-model="sucaiForm.mbSchoolName"
              />
            </Tooltip>
          </FormItem>
          <FormItem label="机构电话">
            <Tooltip
              content="设置机构电话后，家长可快速拨打电话进行咨询"
              style="width: 100%"
              :max-width="300"
            >
              <Input
                type="tel"
                placeholder="请输入机构电话"
                style="width: 100%"
                v-model="sucaiForm.mbschoolTel"
              />
            </Tooltip>
          </FormItem>
        </Row>
      </Form>
      <Row style="text-align: center">
        <Button type="primary" @click="savejigou">保存信息</Button>
        <Button>取消</Button>
      </Row>
    </TabPane>
  </Tabs>
</template>
<script>
import VueHoverMask from "vue-hover-mask";
import QRCode from "qrcode";
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";
import addgoodImg from "@/components/zhaoshengbaoming/wxmall/addgoodImg.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    VueHoverMask,
    QRCode,
    edit,
    addgoodImg,
  },
  data() {
    return {
      showqrcode: false,
      qrcode: "",
      searchData: {
        size: 12,
        current: 1,
        mbTypeID: 0,
      },
      allzhaoxuexiuData: [],
      allhuodongData: [],
      total: 0,
      searchMymbData: {
        size: 12,
        current: 1,
      },
      totalmymb: 0,
      allMobanmymb: [],
      sucaiForm: {
        id: "",
        mbLianxifangshi: "",
        mbLianxifangshiUrl: "",
        mbSchoolName: "",
        mbschoolTel: "",
        jigoujianjie:"",
      },
      sucaiFormRules: {},
      showedit:false,
    };
  },
  methods: {
    handleClick() {
      console.log("click");
    },
    useqrcode() {
      var canvas = document.getElementById("qrcode");
      QRCode.toCanvas(canvas, "http://www.baidu.com", function (error) {
        if (error) console.error(error);
      });
    },
    getAllData() {
      api.get("/xwcloud-wsc/zhaoxuexiu/GetAllMubanPages",this.searchData).then((result) => {
        if (result.code == "Y" && result.success == true) {
          this.allzhaoxuexiuData = result.obj.records;
          this.total = Number(result.obj.total);
        } else {
          this.$Message.error("加载模板信息出错了");
        }
      });
    },
    changePage(current) {
      this.searchData.current = current;
      this.getAllData();
    },
    changePageSize(pageSize) {
      this.searchData.size = pageSize;
      this.getAllData();
    },
    getallhuodongType() {
      api.get("/xwcloud-wsc/zhaoxuexiu/GetAllHuodongTypeList",{}).then((response) => {
        if (response.code == "Y" && response.success == true) {
          console.log(response);
          this.allhuodongData = response.obj;
        }
      });
    },
    clickSearch(typeID) {
      this.searchData.mbTypeID = typeID;
      this.searchData.current = 1;
      this.searchData.size = 12;
      this.getAllData();
    },

    getMyMoban() {
      api.get("/xwcloud-wsc/zhaoxuexiu/GetAllMyMobanFabuPages",this.searchMymbData).then((result) => {
        if (result.code == "Y" && result.success == true) {
          this.allMobanmymb = result.obj.records;
          this.totalmymb = Number(result.obj.total);
        } else {
          this.$Message.error("查询发布活动信息出错了");
        }
      });
    },
    changePagemymb(current) {
      this.searchMymbData.current = current;
      this.getMyMoban();
    },
    changePageSizemymb(pageSize) {
      this.searchMymbData.size = pageSize;
      this.getMyMoban();
    },
    changeGoodsDetail(data) {
      console.log(data);
      this.sucaiForm.jigoujianjie=data;
    },
    changeImgs(data) {
      console.log(data);
      this.sucaiForm.mbLianxifangshiUrl=data;
    },

    GetjigouInfo() {
      api.get("/xwcloud-wsc/zhaoxuexiu/GetjigouInfoByqiyeID",{}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res.obj[0]);
          this.sucaiForm = res.obj[0];
          this.showedit=true;
        }
      });
    },
    savejigou() {
      api.post("/xwcloud-wsc/zhaoxuexiu/SavejigouInfo",this.sucaiForm).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
        } else {
          this.$$Message.error(res.msg);
        }
      });
    },
    zhizuozhaoxuexiu(item) {
      this.$router.push({
        path: "/h5creat",
        query: {
          huodongID: item.hid ? item.hid : "0",
          mobanID: item.hid ? item.mobanID : item.id,
          mbName:item.mbName,
        },
      });
    },
  },
  mounted() {
    this.getAllData();
    this.getallhuodongType();
    this.getMyMoban();
    this.GetjigouInfo();
    QRCode.toDataURL("http://www.baidu.com", {
      //这个this.url就是你扫码后要跳转的地址
      //或者是长按识别跳转的地址（两者是一样的），这个url是全局变量
      //这里也可以是文本内容，扫描后会弹出一个空白界面文本
      version: 7, //这个是版本号，
      errorCorrectionLevel: "Q", //这个是容错率,(建议选较低)更高的级别可以识别
      //更模糊的二维码，但会降低二维码的容量
      width: 280,
      height: 280, //设置二维码图片大小
      margin: 0,
    })
      .then((url) => {
        //这个url是二维码生成地址，也就是相当于图片地址
        this.qrcode = url; //这个是vue实例全局的变量，赋值给他。后面会用在img的src属性上
      })
      .catch((err) => {
        console.error(err); //这里看不懂的话去看一下Promise（then, catch）
      });
  },
};
</script>
