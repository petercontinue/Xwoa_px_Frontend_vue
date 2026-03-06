<template>
  <div>
    <div style="margin-top: 0px">
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1、刷卡签退仅仅只是给家长推送一条学员离校的微信消息;</span>
        </Col>
      </Alert>
    </div>
    <br />

    <div style="text-align: center; margin: 20px auto">
      <label>
        学员卡-卡号
        <font color="red">*</font> :
      </label>
      <Input
        v-model="shuakastuCard"
        placeholder="刷卡时确保光标在本框内"
        style="width: 300px"
        @on-change="shuakaqiandao"
      />
    </div>

    <Row>
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

    <deriveshuakaqiandao-form v-model="deriveShow"></deriveshuakaqiandao-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import deriveshuakaqiandaoForm from "../../../components/jiaowuManage/paikexiaoke/deriveshuakaqiandaoForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    deriveshuakaqiandaoForm,
  },
  data() {
    return {
      shuakastuCard: "",
      data: [], // 接口数据接收
      total: 0,
      menuID: "245",
      deriveShow: false,
      allcampusData: [], //校区查询获取到的校区数据
      allgradeData: [], //校区查询获取到的年级数据
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stuGradeID: "",
        stuID: "",
        stuName: "",
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
          title: "年级",
          key: "stuGradeName",
          align: "center",
        },
        {
          title: "学号",
          key: "stuNo",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
              state = params.row.stuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
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
                    this.params.stuID = value;
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
                    this.params.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "离校时间",
          key: "qianDatetime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.qianDatetime,
              "yyyy-MM-dd hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },

  methods: {
    /**
     * 获取刷卡签到页面
     */
    getshuakaListPage() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getshuakaPage", this.params).then((res) => {
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
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 245 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    /**
     *按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.derive();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
      // else if(onclicks=="keshiadd"){
      //         this.keshiadd();
      //     } else {
      //         this.$Message.info("该页面不应该存在该功能");
      //     }
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuGradeID = "";
      this.params.stuID = "";
      this.params.stuName = "";
      this.getshuakaListPage();
    },

    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getshuakaListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getshuakaListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getshuakaListPage();
    },

    /**
     * 导出
     */
    derive() {
      this.deriveShow = true;
    },
    /**
     * 刷卡签到签退
     */
    shuakaqiandao() {
      api
        .post("xwcloud-pkxk/paike/paikexiaoke/shuaqiandaoqiantui", {
          cardNum: this.shuakastuCard,
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.getshuakaListPage();
            this.shuakastuCard = "";
          } else {
            this.$Message.error(res.msg);
            this.getshuakaListPage();
          }
        });
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getshuakaListPage();
    this.getAllCampusList();
  },
};
</script>
