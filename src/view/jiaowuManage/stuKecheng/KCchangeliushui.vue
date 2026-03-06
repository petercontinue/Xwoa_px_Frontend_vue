<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>学员课程发生改价、换课、课程合并、转送、赠送等课程课时和费用发生变动时，会在本页面添加一条记录；用于记录和查询学员课程课时变化的过程；</span>
        </Col>
      </Alert>
    </div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
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
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "248",
      allcampusData: [], //校区查询获取到的校区数据
      alltype: [
        { id: 1, name: "新签" },
        { id: 2, name: "续费" },
        { id: 3, name: "改签单" },
        { id: 4, name: "删签单" },
        { id: 5, name: "退费" },
        { id: 6, name: "添加课程" },
        { id: 7, name: "删除课程" },
        { id: 8, name: "转送" },
        { id: 9, name: "赠送" },
        { id: 10, name: "课程改单价" },
        { id: 11, name: "课程合并" },
        { id: 12, name: "课程换课" },
        { id: 13, name: "课程延期" },
      ],
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        type: -1,
        stuName: "",
        campusID: "",
        newStu: "",
      },
      columns6: [
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
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "姓名",
          key: "oldStu",
          align: "center",
          width: 90,
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
                    this.params.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "变动类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let state = "";
            switch (params.row.type) {
              case 1:
                state = "新签";
                break;
              case 2:
                state = "续费";
                break;
              case 3:
                state = "改签单";
                break;
              case 4:
                state = "删签单";
                break;
              case 5:
                state = "退费";
                break;
              case 6:
                state = "添加课程";
                break;
              case 7:
                state = "删除课程";
                break;
              case 8:
                state = "转送";
                break;
              case 9:
                state = "赠送";
                break;
              case 10:
                state = "课程改单价";
                break;
              case 11:
                state = "课程合并";
                break;
              case 12:
                state = "课程换课";
                break;
              case 13:
                state = "课程延期";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "变动类型",
                  data: this.alltype,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.alltype.forEach((element) => {
                        if (element.id == value) {
                          this.params.type = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.type = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "原课程",
          key: "oldkechengName",
          align: "center",
          width: 150,
        },
        {
          title: "原单价",
          key: "oldprice",
          align: "center",
        },
        {
          title: "原课时",
          key: "oldrkeshi",
          align: "center",
        },
        {
          title: "原总价",
          key: "oldzongjia",
          align: "center",
        },
        {
          title: "原开始时间",
          key: "oldstartDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.oldstartDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.oldstartDate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "原结束时间",
          key: "oldendDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.oldendDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.oldendDate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "新学员",
          key: "newStu",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.newStu == null) {
              datehave = "-";
            } else {
              datehave = params.row.newStu;
            }
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "新学员",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.newStu = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "新课程",
          key: "newkechengName",
          align: "center",
          width: 150,
          render: (h, params) => {
            let datehave = null;
            if (params.row.newkechengName == null) {
              datehave = "-";
            } else {
              datehave = params.row.newkechengName;
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "新单价",
          key: "newprice",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.newprice == null) {
              datehave = "-";
            } else {
              datehave = params.row.newprice;
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "新课时",
          key: "newrkeshi",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.newrkeshi == null) {
              datehave = "-";
            } else {
              datehave = params.row.newrkeshi;
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "新总价",
          key: "newzongjia",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.newzongjia == null) {
              datehave = "-";
            } else {
              datehave = params.row.newzongjia;
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "新开始时间",
          key: "newstartDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.newstartDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.newstartDate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "新结束时间",
          key: "newendDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.newendDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.newendDate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "操作人",
          key: "jingbanren",
          align: "center",
        },
        {
          title: "操作时间",
          key: "addDate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.addDate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.addDate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },

  methods: {
    getkcLiuShuiListPage() {
      api.get("xwcloud-stu/stu/buxikecheng/getkcLiuShuiPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },
    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{menuID:this.menuID}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.Onderive();
      }
    },

    Onderive() {
      this.$Modal.confirm({
        title: "导出",
        content: "是否要导出课程变动流水",
        onOk: () => {
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-stu/stu/buxikecheng/ExportkcLiuShui",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: { campusID: this.exportcampus },
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
              link.setAttribute("download", "课程变动流水.xls");
              link.click();
              link = null;
              this.$Message.success("导出成功");
            })
            .catch((err) => {
              this.btnLoading = false;
              this.$Message.error("下载失败");
            });
        },
        onCancel: () => {},
      });
    },
    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.type = -1;
      this.params.stuName = "";
      this.params.campusID = "";
      this.params.newStu = "";
      this.getkcLiuShuiListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getkcLiuShuiListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getkcLiuShuiListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getkcLiuShuiListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getkcLiuShuiListPage();
    this.getAllCampusList();
  },
};
</script>
