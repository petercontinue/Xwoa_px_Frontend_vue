<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1、本页面仅仅只是给家长推送一条学员到校和离校的微信消息；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            <font color="red">
              特别注意：签到/签退是否扣课时选择否时：不扣减课时，不会产生上课记录！
              选择是：会扣减课时，也会产生上课记录！
            </font>
          </span>
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

    <Modal
      v-model="modal1"
      title="签到签退流水"
      transfer
      :styles="{ left: '10', top: '20px' }"
      width="70"
    >
      <div :is="currentView"></div>
    </Modal>
    <pxQdQt
      v-model="QdQtShow"
      :datast="QdStr"
      v-on:handleSearch="getPaikeQiandaoListPage"
    ></pxQdQt>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import qiandaoqiantuiliushui from "@/components/jiaowuManage/paikexiaoke/qiandaoqiantui/qiandaoqiantuiliushui";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import pxQdQt from "@/components/jiaowuManage/paikexiaoke/pxQdQt";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    qiandaoqiantuiliushui,
    pxQdQt,
  },
  data() {
    //数据

    return {
      modal1: false,
      data: [], // 接口数据接收
      total: 0,
      menuID: "246",
      liushuiShow: false,
      QdQtShow: false,
      QdList: {
        paikeID: "",
        stuID: "",
        type: -1,
      },
      QdStr: "",
      allcampusData: [], //校区查询获取到的校区数据
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stuName: "",
        kechengName: "",
        className: "",
        startDate: "",
        endDate: "",
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
          title: "学号",
          key: "stuNo",
          align: "center",
          width: 120,
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
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 150,
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
          title: "课程",
          key: "kechengName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "课程",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.kechengName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班级",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.className = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课日期",
          key: "haveClassDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.haveClassDate,
              "yyyy-MM-dd - hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上课日期",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.startDate = value[0];
                    this.params.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "上课时间",
          key: "startLessonDateTime",
          align: "center",
        },
        {
          title: "下课时间",
          key: "endLessonDateTime",
          align: "center",
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.qiandao(params, 1);
                    },
                  },
                },
                "签到"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.qiandao(params, 2);
                    },
                  },
                },
                "签退"
              ),
            ]);
          },
        },
      ],
      currentView: qiandaoqiantuiliushui,
    };
  },

  methods: {
    /**
     * 页面加载
     */
    getPaikeQiandaoListPage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getPaikeQiandaoPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
          }
        });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 246 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      if (onclicks == "derive()") {
        this.deriveqiandao();
      } else if (onclicks == "qdqtliushui()") {
        this.modal1 = true;
        this.qiandaoliushui();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.kechengName = "";
      this.params.className = "";
      this.params.startDate = "";
      this.params.endDate = "";
      this.getPaikeQiandaoListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getPaikeQiandaoListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getPaikeQiandaoListPage();
    },

    /**
     * 导出
     */
    deriveqiandao() {
      //console.log(getToken());
      this.btnLoading = true;
      axios
        .request({
          method: "get",
          url: "/xwcloud-pkxk/paike/paikexiaoke/ExportArtificialQiandao",
          headers: {
            Authorization: "Bearer " + getToken(),
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
          link.setAttribute("download", "人工排课签到签退导出.xls");
          link.click();
          link = null;
          this.$Message.success("导出成功");
        })
        .catch((err) => {
          this.btnLoading = false;
          this.$Message.error("下载失败");
        });
    },

    /**
     * 打开签到流水
     */
    qiandaoliushui() {
      this.liushuiShow = true;
    },
    qiandao(value, type) {
      console.log(value, type);
      this.QdList.paikeID = value.row.paikeID;
      this.QdList.stuID = value.row.stuID;
      this.QdList.type = type;
      this.QdStr = JSON.stringify(this.QdList);
      this.QdQtShow = true;
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getPaikeQiandaoListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getPaikeQiandaoListPage();
    this.getAllCampusList();
  },
};
</script>
