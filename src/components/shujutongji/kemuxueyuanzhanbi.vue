<template>
  <div>
    <Row style="margin-bottom: 24px">
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="info" ghost @click="search(2)">本月学生排课统计</Button>
        <Button type="info" ghost @click="search(3)">下月学生排课统计</Button>
        <span>按起止日期查询</span>
        <Date-picker
          v-model="datesoe"
          type="daterange"
          placeholder="选择日期"
          style="width: 200px"
          @on-change="search(4)"
        ></Date-picker>
        <Divider type="vertical" />
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <Card>
          <chart-pie
            style="height: 300px"
            v-model="pieData"
            text="科目学员占比"
          ></chart-pie> </Card
      ></Col>
    </Row>
    <Row>
      <Col span="24">
        <Row style="margin-top: 20px">
          <Col span="24">
            <Table
              border
              ref="selection"
              :columns="columns6"
              :data="data"
            ></Table>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";
import { ChartPie, ChartBar } from "@/components/charts";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import datesearchyearForm from "@/components/common-buttons/datesearchyearForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    ChartPie,
  },
  data() {
    return {
      pieData: [],
      columns6: [
        {
          title:"校区",
          key:"campusName",
          align:"center"
        },
        {
          title: "科目",
          key: "subjectName",
          align: "center",
        },
        {
          title: "报名人数",
          key: "subNUM",
          align: "center",
        },
      ],
      data: [], // 接口数据接收
      menuID: "35",
      total: 0,
      params: {
        type: null,
        startDate: "",
        endDate: "",
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      datesoe: null,
    };
  },
  methods: {
    getKumuStuZhanbiData() {
      api.get("xwcloud-caiwu/shujutongji/other/getKumuStu",this.params).then((res) => {
        // if (res.obj.length == 0) {
        //   this.$Message.error("获取数据为空!");
        //   return;
        // }
        if (res.code == "Y" && res.success == true) {
          this.pieData = [];
          for (let item in res.obj) {
            if (res.obj[item].subjectName == undefined) {
              res.obj[item].subjectName = "其他";
            }
            this.pieData.push({
              value: res.obj[item].subNUM,
              name: res.obj[item].subjectName,
            });
          }
          this.data = res.obj;
        }
      });
    },
    search(type = null) {
      this.params.type = type;
      if (type == 1) {
        this.datesoe = null;
        this.params = {
          type: null,
          startDate: "",
          endDate: "",
        };
      } else if (type == 4) {
        if (this.datesoe) {
          this.params.startDate = toolbox.dateFtt(
            this.datesoe[0],
            "yyyy-MM-dd"
          );
          this.params.endDate = toolbox.dateFtt(this.datesoe[1], "yyyy-MM-dd");
          // console.log(this.params.datesoe);
        }
      }
      else{
        this.datesoe = null;
      }
      this.getKumuStuZhanbiData();
    },
    clickShijian() {},
  },
  mounted: function () {
    // 初始化页面
    this.getKumuStuZhanbiData();
  },
};
</script>

<style>
</style>