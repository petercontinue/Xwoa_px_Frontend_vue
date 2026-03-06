<template>
  <div>
    <div>
      <Label>{{ showName }} 的交费信息</Label>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection"
            :columns="columns5"
            :data="dataa"
            show-summary
            :summary-method="handleSummarya"
          ></Table>
        </Col>
      </Row>

      <Row style="margin-top: 15px">
        <Page
          :total="totala"
          show-elevator
          show-total
          show-sizer
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Row>
    </div>

    <div style="margin-top: 100px">
      <Label>{{ showName }} 的已上课时记录</Label>
      <Row style="margin-top: 20px">
        <Col span="12">
          <span>快捷查询：</span>
          <Button type="info" ghost @click="search()">全部</Button>
        </Col>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            ref="selection"
            :columns="columns6"
            :data="datab"
            show-summary
            :summary-method="handleSummary"
          ></Table>
        </Col>
      </Row>

      <Row style="margin-top: 15px">
        <Page
          :total="totalb"
          show-elevator
          show-total
          show-sizer
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePageb"
          @on-page-size-change="changePagebSize"
        />
      </Row>
    </div>
  </div>
</template>

<script>
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
  },
  data() {
    return {
      dataa: [], // 接口数据接收
      datab: [],
      totala: 0,
      totalb: 0,
      params: {
        current: 1,
        size: 10,
        stuID: "",
      },
      paramsb: {
        current: 1,
        size: 10,
        stuID: "",
      },
      showName: "",
      columns5: [
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "校区",
          key: "campusName",
          align: "center",
          width: 200,
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
          width: 100,
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 100,
        },
        {
          title: "缴费金额",
          key: "shiMoney",
          align: "center",
        },
        {
          title: "代金券",
          key: "daijiMoney",
          align: "center",
          width: 100,
        },
        {
          title: "付费方式",
          key: "moneystyleName",
          align: "center",
          width: 100,
        },
        {
          title: "费用类型",
          key: "moneyStyle",
          align: "center",
          width: 150,

          render: (h, params) => {
            let state = "";
            switch (params.row.className) {
              case "1":
                state = "新签";
                break;
              case "2":
                state = "新签";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "交费时间",
          key: "qiandandate",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.qiandandate) {
              datehave = toolbox.dateFtt(params.row.qiandandate, "yyyy-MM-dd - hh:mm:ss");
            } else {
              datehave = "-";
            }

            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "经办人",
          key: "jingbanren",
          align: "center",
          width: 100,
        },
      ],
      columns6: [
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          width: 100,
          render: (h, paramsb) => {
            let state = "";
            if (paramsb.row.zidingyiStuID == null) {
              state = paramsb.row.stuID;
            } else {
              state = paramsb.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 100,
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.haveClassDate) {
              datehave = toolbox.dateFtt(params.row.haveClassDate, "yyyy-MM-dd");
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "课单价",
          key: "kechengPrice",
          align: "center",
          width: 150,
        },
        {
          title: "课时",
          key: "keshiNum",
          align: "center",
          width: 150,
        },
        {
          title: "消耗学费小计",
          key: "payMoney",
          align: "center",
        },
      ],
    };
  },
  methods: {
    qiandanStuShowListPage() {
      api
        .get("xwcloud-pkxk/kehao/ClassRecord/qiandanStuShowPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.dataa = res.obj.records;
            this.totala = Number(res.obj.total);
            console.log(res);
          }
        });
    },

    getstukehaoShowListPage() {
      console.log(this.paramsb);
      api
        .get("xwcloud-pkxk/kehao/ClassRecord/getstukehaoShowPage", this.paramsb)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.datab = res.obj.records;
            this.totalb = Number(res.obj.total);
          }
        });
    },

    /**
     * 快捷查询（全部）
     */
    search() {
      this.paramsb.size = 10;
      this.paramsb.current = 1;
      this.paramsb.stuID = "";
      this.getstukehaoShowListPage();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.qiandanStuShowListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.qiandanStuShowListPage();
    },

    /**
     * 翻页
     */
    changePageb(current) {
      this.paramsb.current = current;
      this.getstukehaoShowListPage();
    },
    changePagebSize(pageSize) {
      this.paramsb.size = pageSize;
      this.getstukehaoShowListPage();
    },

    /**
     * 表头查询
     */
    TableSearch() {
      this.getstukehaoShowListPage();
    },

    handleSummary({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 5) {
          sums[key] = {
            key,
            value: "总价",
          };
          return;
        } else if (index != 5 && index != 6) {
          sums[key] = {
            key,
            value: "",
          };
          return;
        }
        const values = data.map((item) => Number(item[key]));
        if (!values.every((value) => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[key] = {
            key,
            value: v + " 元",
          };
        } else {
          sums[key] = {
            key,
            value: "",
          };
        }
      });

      return sums;
    },

    handleSummarya({ columns, data }) {
      const sums = {};
      columns.forEach((column, index) => {
        const key = column.key;
        if (index === 3) {
          sums[key] = {
            key,
            value: "总价",
          };
          return;
        } else if (index != 3 && index != 4) {
          sums[key] = {
            key,
            value: "",
          };
          return;
        }
        const values = data.map((item) => Number(item[key]));
        if (!values.every((value) => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[key] = {
            key,
            value: v + " 元",
          };
        } else {
          sums[key] = {
            key,
            value: "",
          };
        }
      });

      return sums;
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.params.stuID = this.$route.query.ID; //获取上级页面传过来的学员ID
    this.paramsb.stuID = this.$route.query.ID; //获取上级页面传过来的学员ID
    this.showName = this.$route.query.stuName;
    this.qiandanStuShowListPage();
    this.getstukehaoShowListPage();
  },
};
</script>
