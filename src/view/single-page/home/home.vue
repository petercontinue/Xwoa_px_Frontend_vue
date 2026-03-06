<template>
  <div>
    <Row :gutter="20" style="margin-top: 10px">
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card
          shadow
          class="oneOfFourContainer"
          style="background-color: #317eeb !important"
        >
          <span class="leftSpan">
            <span class="iconfont icon-daifukuan" style="font-size: 30px"></span>
          </span>
          <div class="rightDiv">
            <div class="divTitleTxt">新手上路</div>
            <div class="divSubTitleTxt">新手必看指南</div>
          </div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card
          shadow
          class="oneOfFourContainer"
          style="background-color: #33b86c !important"
        >
          <span class="leftSpan">
            <span
              class="iconfont icon-liuchengtu"
              style="font-size: 30px; padding-left: 5px"
            ></span>
          </span>
          <div class="rightDiv">
            <div class="divTitleTxt">系统核心流程</div>
            <div class="divSubTitleTxt">系统核心流程，新手必看</div>
          </div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card
          shadow
          class="oneOfFourContainer"
          style="background-color: #29b6f6 !important"
        >
          <span class="leftSpan">
            <span class="iconfont icon-bofang" style="font-size: 30px"></span>
          </span>
          <div class="rightDiv">
            <div class="divTitleTxt">全套视频教程</div>
            <div class="divSubTitleTxt">系统视频教程在线学习</div>
          </div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="6" style="margin-bottom: 20px">
        <Card
          shadow
          class="oneOfFourContainer"
          style="background-color: #7e57c2 !important"
        >
          <span class="leftSpan">
            <span class="iconfont icon-wenhao" style="font-size: 30px"></span>
          </span>
          <div class="rightDiv">
            <div class="divTitleTxt">在线帮助文档</div>
            <div class="divSubTitleTxt">系统使用百问百答</div>
          </div>
        </Card>
      </i-col>
    </Row>

    <Row :gutter="20" style="margin-top: 10px">
      <i-col :md="24" :lg="16" style="margin-bottom: 20px">
        <!-- <Card shadow style="margin-bottom: 20px">
          <div >11</div>
          <div >12</div>
        </Card> -->
        <Row style="margin-bottom: 20px">
          <Card shadow style="min-height: 310px; height: auto">
            <p slot="title">
              <!-- <Icon type="ios-film-outline"></Icon> -->
              常用入口
            </p>
            <p slot="extra" style="color: #317eeb; cursor: pointer">
              <Button type="text" custom-icon="iconfont icon-shezhi" @click="adddaohang"
                >设置</Button
              >
            </p>
            <div>
              <Row :gutter="20" style="margin-top: 10px; color: #fff">
                <i-col
                  :xs="12"
                  :md="8"
                  :lg="4"
                  style="margin-bottom: 20px"
                  v-for="(item, i) in alldaohang"
                  :key="i"
                  @click.native="todaohangPage(item.url)"
                >
                  <Card
                    shadow
                    style="
                      background-color: #29b6f6;
                      opacity: 0.8;
                      text-align: center;
                      cursor: pointer;
                    "
                  >
                    <span
                      class="iconfont icon-liuchengtu"
                      style="padding-right: 10px"
                    ></span
                    >{{ item.text }}
                  </Card>
                </i-col>
              </Row>
            </div>
          </Card>
        </Row>
        <Row style="margin-bottom: 20px">
          <Card shadow>
            <p slot="title">校区业绩排名</p>
            <p slot="extra">
              <span class="tianSelect" @click="LoadCampusYejiData(1)">7天</span>
              <span class="tianSelect" @click="LoadCampusYejiData(2)">15天</span>
              <span class="tianSelect" @click="LoadCampusYejiData(3)">30天</span>
              <span class="tianSelect" @click="LoadCampusYejiData(4)">90天</span>
              <span class="tianSelect" @click="LoadCampusYejiData(5)">半年</span>
              <span class="tianSelect" @click="LoadCampusYejiData(6)">一年</span>
            </p>
            <example
              style="height: 300px"
              :type="yejiType"
              :yejiDate="yejiDate"
              :series="series"
            />
          </Card>
        </Row>
        <Row style="margin-bottom: 20px">
          <Card shadow>
            <p slot="title">课耗收入</p>
            <p slot="extra">
              <span class="tianSelect">7天</span>
              <span class="tianSelect">15天</span>
              <span class="tianSelect">30天</span>
              <span class="tianSelect">90天</span>
              <span class="tianSelect">半年</span>
              <span class="tianSelect">一年</span>
            </p>
            <Example1
              style="height: 310px"
              :type="kehaoType"
              :yejiDate="kehaoDate"
              :series="serieskh"
            />
          </Card>
        </Row>
      </i-col>
      <i-col :md="24" :lg="8" style="margin-bottom: 20px">
        <Card shadow>
          <p slot="title">待办提醒</p>
          <div>
            <ul class="todoListUL" id="tixing" v-for="(item, i) in pageData">
              <li>
                <router-link :to="'/' + item.url">{{ item.msg }}【点击详情】</router-link>
              </li>
            </ul>
          </div>
        </Card>
      </i-col>
      <i-col :md="24" :lg="8" style="margin-bottom: 20px">
        <Page
          :total="total"
          show-elevator
          show-total
          show-sizer
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </i-col>
    </Row>
    <adddaohang v-model="addShow" v-on:handleSearch="getAlldaohan"></adddaohang>
  </div>
</template>

<script>
import InforCard from "../../../components/info-card/infor-card";
import CountTo from "../../../components/count-to/count-to";
import { ChartPie, ChartBar } from "../../../components/charts";
import Example from "./example.vue";
import Example1 from "./example.vue";
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import adddaohang from "@/components/systemSetting/adddaohang";
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    Example1,
    adddaohang,
  },
  data() {
    return {
      yejiType: 0,
      yejiDate: "",
      series: [],
      kehaoType: 0,
      kehaoDate: "",
      serieskh: [],
      alldaibanData: [],
      pageData: [],
      total: 0,
      current: 1,
      size: 10,
      alldaohang: [],
      addShow: false,
    };
  },
  methods: {
    ...mapActions([
      "getCampusYejiList",
      "GetIndexKehaoInfo",
      "getdaibanTixin",
      "getdaohangtoStaff",
    ]),
    todaohangPage(url) {
      this.$router.push({
        path: url,
        query: {},
      });
    },
    adddaohang() {
      this.addShow = true;
    },
    LoadCampusYejiData(type) {
      this.series = [];
      this.getCampusYejiList({ type: type }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          let ss = [];
          res.obj[0].dateList.forEach((element) => {
            ss.push(toolbox.dateFtt(element, "yyyy-MM-dd"));
          });
          this.yejiDate = JSON.stringify(ss);
          this.yejiType = type;
          res.obj.forEach((ele) => {
            let newyjdata = [];
            ele.yejiData.forEach((element1) => {
              if (element1 == null) {
                newyjdata.push(0);
              } else {
                newyjdata.push(element1);
              }
            });
            this.series.push({
              name: ele.campusName,
              type: "line",
              stack: "总量",
              areaStyle: {
                normal: {
                  color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                },
              },
              data: newyjdata,
            });
          });
        }
      });
    },
    LoadCampusKehaoShouru(type) {
      this.GetIndexKehaoInfo({ type: type }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          let ss = [];
          res.obj[0].dateList.forEach((element) => {
            ss.push(toolbox.dateFtt(element, "yyyy-MM-dd"));
          });
          this.kehaoDate = JSON.stringify(ss);
          this.kehaoType = type;
          res.obj.forEach((ele) => {
            let newyjdata = [];
            ele.yejiData.forEach((element1) => {
              if (element1 == null) {
                newyjdata.push(0);
              } else {
                newyjdata.push(element1);
              }
            });
            this.serieskh.push({
              name: ele.campusName,
              type: "line",
              stack: "总量",
              areaStyle: {
                normal: {
                  color: "#" + Math.floor(Math.random() * 0xffffff).toString(16),
                },
              },
              data: newyjdata,
            });
          });
        }
      });
    },
    /**
     * 获取待办
     */
    getAllDaiBan() {
      this.getdaibanTixin().then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.alldaibanData = res.obj;
          this.total = Number(this.alldaibanData.tixin.length);
          for (let i = (this.current - 1) * 10; i < this.current * this.size; i++) {
            //手动分页
            if (this.alldaibanData.tixin[i]) {
              this.pageData.push(this.alldaibanData.tixin[i]);
            }
          }
        }
      });
    },

    getAlldaohan() {
      this.getdaohangtoStaff().then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.alldaohang = res.obj;
        }
      });
    },

    changePage(current) {
      // 翻页
      this.pageData = [];
      this.current = current;
      this.getAllDaiBan();
    },
    changePageSize(pageSize) {
      // 翻页
      this.pageData = [];
      this.size = pageSize;
      this.getAllDaiBan();
    },
  },
  mounted() {
    this.LoadCampusYejiData(1);
    this.LoadCampusKehaoShouru(1);
    this.getAllDaiBan();
    this.getAlldaohan();
  },
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}

.oneOfFourContainer {
  background-color: #29b6f6;
  border-radius: 3px;
  padding: 5px 0px 10px 0px;
  height: 100px;
  color: #fff;
  overflow: hidden;
  cursor: pointer;
  // border:1px solid #ff0000;
}
.leftSpan {
  float: left;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  border-radius: 100%;
  display: inline-block;
  background-color: rgba(27, 19, 19, 0.2);
  // border:1px solid #ff0000;
}
.rightDiv {
  float: right;
  // border:1px solid #ff0000;
}
.divTitleTxt {
  text-align: right;
  font-size: 24px;
  font-weight: 800;
}
.divSubTitleTxt {
  text-align: right;
}
.tianSelect {
  cursor: pointer;
  color: #317eeb;
  font-size: 12px;
  padding-left: 5px;
}

// 待办提醒
.todoListUL {
  /*border:1px solid #ff0000;*/
  width: calc(100% - 20px);
  margin: 0 auto;
}

.todoListUL li {
  /*border:1px solid #ff0000;*/
  /*border-bottom:1px dotted #0094ff;*/
  border-bottom: 1px dotted #a0a0a0;
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.todoListUL li:hover {
  background-color: #f5f5f5;
}
</style>
