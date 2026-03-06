<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：该页面是学员报名（新签或续费）时交纳杂费的流水记录；</span>
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getteachSubjectPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns" :data="data"></Table>
      </Col>
    </Row>
    <Row style="margin-top: 15px">
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
    </Row>
    <derive-form
      v-model="showderive"
      v-on:handleSearch="getteachSubjectPages"
      @increment="deriveExcel"
    ></derive-form>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import deriveForm from "../../../components/zhaoshengbaoming/baomingjiaofei/deriveForm.vue";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    deriveForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
  },
  data() {
    return {
      columns: [
        // {
        //   // type: "selection",
        //   title: "选择操作",
        //   align: "center",
        //   key: "checkBox",
        //   width: 80,
        //   render: (h, params) => {
        //     return h("div", [
        //       h("Checkbox", {
        //         props: {
        //           value: params.row.checkBox,
        //         },
        //         on: {
        //           "on-change": (e) => {
        //             this.data.forEach((items) => {
        //               //先取消所有对象的勾选，checkBox设置为false
        //               this.$set(items, "checkBox", false);
        //             });
        //             this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
        //           },
        //         },
        //       }),
        //     ]);
        //   },
        // },
        {
          title: "校区",
          key: "campusName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "校区",
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.campusID = value;
                      this.TableSearch();
                    } else {
                      this.campusID = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学号",
          key: "zidingyiStuID",
          align: "center",
          render: (h, params) => {
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
              return h("div", [h("span", params.row.stuID)]);
            } else {
              return h("div", [h("span", params.row.zidingyiStuID)]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.zidingyiStuID = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "年级/年龄段",
          key: "stuGradeName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年级/年龄段",
                  data: this.stugradeData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.stuGradeID = value;
                      this.TableSearch();
                    } else {
                      this.stuGradeID = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "费项名称",
          key: "otherMoneyName",
          align: "center",
        },
        {
          title: "总金额",
          key: "zongMoney",
          align: "center",
        },
        {
          title: "交费时间",
          key: "qiandandate",
          align: "center",
        },
      ],
      menuID: "148",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      zidingyiStuID: "",
      stuName: "",
      stuGradeID: 0,
      showderive: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
    };
  },
  methods: {
    getteachSubjectPages() {
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetQiandanOtherMoneyPages", {
          size: this.size,
          current: this.current,
          campusID: this.campusID,
          zidingyiStuID: this.zidingyiStuID,
          stuName: this.stuName,
          stuGradeID: this.stuGradeID,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
          }
        });
    },
    search() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.zidingyiStuID = "";
      this.stuName = "";
      this.stuGradeID = 0;
      this.getteachSubjectPages();
    },
    TableSearch() {
      this.getteachSubjectPages();
    },
    changePage(current) {
      this.current = current;
      this.getteachSubjectPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getteachSubjectPages();
    },
    onSearch(search) {
      window.console.log(search);
    },

    clickShijian(onclicks) {
      if (onclicks == "derive()") {
        this.showderive = true;
      }
    },
    deriveExcel(data) {
      console.log(data);
      axios
        .request({
          method: "get",
          url: "/xwcloud-zsbm/zsbm/BaoMingJiaoFei/exportzafeiList",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
          params: {
            campusID: data.campusID,
            startDate: data.joinTime[0],
            endDate: data.joinTime[1],
          },
          responseType: "blob",
        })
        .then((res) => {
          this.btnLoading = false;
          // 文件下载
          const blob = new Blob([res], {
            type: "application/vnd.ms-excel",
          });
          let link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.setAttribute("download", "杂费流水.xls");
          link.click();
          link = null;
          this.$Message.success("导出成功");
          this.showderive = false;
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    },
  },

  mounted() {
    this.getteachSubjectPages();
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList", {}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.stugradeData = res.obj;
      }
    });
  },
};
</script>
