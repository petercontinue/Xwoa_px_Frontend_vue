<template>
  <div>
    <div style="margin-top: 0px">
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1、本功能只适用于没报课，刷卡从充值的余额里扣减费用的情况；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2、操作方法：选择消课课程，输入扣减金额，然后学员刷卡。特别提醒：刷卡时，系统光标放在【学员卡-卡号】的文本框内</span
          >
        </Col>
      </Alert>
    </div>
    <br />

    <div>
      <Row align="middle">
        <Col span="2" offset="7" style="text-align: right">
          <P>
            消课课程
            <font color="red">*</font>：
          </P>
        </Col>
        <Col span="8">
          <Select v-model="xiaoke.kechengID" placeholder="请选择类型">
            <Option v-for="item in allkecheng" :value="item.id" :key="item.id">
              {{ item.name }}
            </Option>
          </Select>
        </Col>
      </Row>
      <br />

      <Row align="middle">
        <Col span="2" offset="7" style="text-align: right">
          <p>
            扣减金额
            <font color="red">*</font>：
          </p>
        </Col>
        <Col span="8">
          <Input v-model="xiaoke.money" placeholder="请输入本次消课要扣减的费用" />
        </Col>
      </Row>
      <br />

      <Row align="middle">
        <Col span="2" offset="7" style="text-align: right">
          <p>
            学员卡-卡号
            <font color="red">*</font>：
          </p>
        </Col>
        <Col span="8">
          <Input
            v-model="xiaoke.cardNumber"
            placeholder="刷卡时确保光标在本框内"
            @on-change="saveyuexioake"
          />
        </Col>
      </Row>
      <br />
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
    <deriveyuexiaoke-form v-model="deriveShow"></deriveyuexiaoke-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import deriveyuexiaokeForm from "@/components/jiaowuManage/paikexiaoke/deriveyuexiaokeForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    deriveyuexiaokeForm,
  },
  data() {
    return {
      xkMoney: "",
      xktuCard: "",
      data: [], // 接口数据接收
      total: 0,
      menuID: "250",
      deriveShow: false,
      allcampusData: [], //校区查询获取到的校区数据
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stuName: "",
      },
      xiaoke: {
        cardNumber: "",
        kechengID: -1,
        kechengName: "",
        money: 0,
      },
      allkecheng: [],
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
        },
        {
          title: "学员卡",
          key: "cardNum",
          align: "center",
          render: (h, params) => {
            let state = "**";
            if (params.row.cardNum == "" || params.row.cardNum == null) {
              state = "-";
            } else {
              state = params.row.cardNum;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "消课金额",
          key: "chongzhiPayMoney",
          align: "center",
        },
        {
          title: "操作教师",
          key: "addUser",
          align: "center",
        },
        {
          title: "备注",
          key: "beizhu",
          align: "center",
        },
        {
          title: "刷卡时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd - hh:mm:ss");
            return h("div", [h("span", datehave)]);
          },
        },
      ],
    };
  },

  methods: {
    getyuexiaokeListPage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getyuexiaokePage", this.params)
        .then((res) => {
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
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 250 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    getKcToYueXiaoKeList() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getKcToYueXiaoKe", {
          menuID: Number(this.menuID),
        })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allkecheng = res.obj;
            console.log("adsd54");
            console.log(res);
          }
        });
    },

    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.derive();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.stuName = "";
      this.getyuexiaokeListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getyuexiaokeListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getyuexiaokeListPage();
    },
    derive() {
      this.deriveShow = true;
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getyuexiaokeListPage();
    },
    saveyuexioake() {
      this.allkecheng.forEach((element) => {
        if (element.id == this.xiaoke.kechengID) {
          this.xiaoke.kechengName = element.name;
          api
            .post("xwcloud-pkxk/paike/paikexiaoke/addyuexiaoke", this.xiaoke)
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getyuexiaokeListPage();
                this.xiaoke.cardNumber = "";
                this.xiaoke.kechengID = 0;
                this.xiaoke.kechengName = "";
                this.xiaoke.money = 0;
              } else {
                this.$Message.error("操作失败");
                this.getyuexiaokeListPage();
              }
            });
        }
      });
    },
  },

  mounted: function () {
    // 初始化页面
    this.getyuexiaokeListPage();
    this.getAllCampusList();
    this.getKcToYueXiaoKeList();
  },
};
</script>
