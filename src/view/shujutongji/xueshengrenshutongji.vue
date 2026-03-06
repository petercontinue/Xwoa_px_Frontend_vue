<template>
  <div>
    <Row>
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Divider type="vertical" />
        <span>按校区查询</span>
        <Select
          style="float: revert; width: 200px"
          v-model="params.campusID"
          placeholder="请选择"
          clearable
        >
          <Option v-for="item in campusList" :value="item.id" :key="item.id">{{
            item.campusName
          }}</Option>
        </Select>
      </Col>
    </Row>
    <!-- 获取按钮 -->
    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          show-summary
          sum-text="合计人数:"
          :columns="columns6"
          :data="data"
        ></Table>
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
    <daochuxueshengrenshutongji
      v-model="showdaochu"
      :subjectList="subjectList"
    ></daochuxueshengrenshutongji>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "@/components/common-buttons/buttonsForm";

import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import Daochuxueshengrenshutongji from "../../components/shujutongji/daochuxueshengrenshutongji.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    Daochuxueshengrenshutongji,
  },
  data() {
    return {
      columns6: [
        {
          title: "年级/年龄段",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "(在读+停课)总人数",
          key: "zaiting",
          align: "center",
        },
        {
          title: "在读人数",
          key: "zaidu",
          align: "center",
        },
        {
          title: "活跃学员数(当月有课耗人数)",
          key: "huoyue",
          align: "center",
        },
        {
          title: "停课1-2个月人数",
          key: "tingke1",
          align: "center",
        },
        {
          title: "停课3-5个月人数",
          key: "tingke2",
          align: "center",
        },
        {
          title: "停课6个月以上人数",
          key: "tingke3",
          align: "center",
        },
      ],
      data: [], // 接口数据接收

      menuID: "431",
      total: 0,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
      },
      campusList: [],
      subjectList: [],
      showdaochu: false,
    };
  },
  methods: {
    getXuesherenshuData() {
      console.log(this.params);
      api
        .get("xwcloud-caiwu/shujutongji/renshu/getXuesherenshu", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            // console.log(this.data);
          }
        });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getXuesherenshuData();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getXuesherenshuData();
    },
    // changeDate(val) {
    //   this.params.year = toolbox.dateFtt(val, "yyyy");
    //   this.getXuesherenshuData();
    // },
    search(type = null) {
      if (type == 1) {
        this.params = {
          size: 10,
          current: 1,
          campusID: "",
        };
      }
      this.getXuesherenshuData();
    },
    clickShijian(val) {
      if (val == "derive()") {
        this.showdaochu = true;
      }
    },
    getSubjectList() {
      api.get("xwcloud-caiwu/shujutongji/other/getSubject", {}).then((res) => {
        if (res.code == "success") {
          // console.log(res)
          this.subjectList = res.obj;
        }
      });
    },
  },
  mounted: function () {
    // 初始化页面
    // this.params.year = toolbox.dateFtt(new Date(), "yyyy");
    this.getXuesherenshuData();
    this.getSubjectList();
    api
      .get("xwcloud-homeschool/homeschool/public/getCampusList", this.params)
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.campusList = res.obj;
        } else {
          this.$Message.error(res.msg);
        }
      });
  },
  watch: {
    "params.campusID"(val) {
      this.getXuesherenshuData();
    },
    "params.subjectID"(val) {
      this.getXuesherenshuData();
    },
  },
};
</script>
