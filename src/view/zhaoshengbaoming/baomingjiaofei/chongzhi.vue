<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>
            1：利用充值的钱报课程。在【报名交费-新签报名/续费】报课程，支付方式必须选择<span style="color: red">【 充值余额】</span>；
          </span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            2：可以在进销存消费购买商品。操作方法：刷学员卡，支付方式务必选择
            <span style="color: red">【 账户余额】</span>；
          </span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            3：可以在
            <span style="color: red">【教务管理-排课消课-余额消课】</span>直接消课。该方法仅适用于充值以后，不报名课程，上相关课程的时候用学员卡刷卡来扣除费用。
          </span>
        </Col>
        <Col style="margin-top: 10px">
          <span>4：可以在微商城进行消费购买。操作方法：教务管理-家校互联-学员微信账号，在该页面有一个【转金额】的功能，可以把充值的钱转到商城账户里去购买使用；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span style="color: red">特别提醒：微信营销里的微信充值的优惠政策与本页面的优惠政策是数据相通的，优惠政策是一致的。</span>
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
      v-on:handleSearch="getchongzhiInfoPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns" :data="data" @on-row-click="onClickRow"></Table>
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
    <oldstuchongzhi-form v-model="shouoldstucz" v-on:handleSearch="getchongzhiInfoPages"></oldstuchongzhi-form>
    <chongzhiliushui-form
      v-model="showcaxiangqing"
      v-on:handleSearch="getchongzhiInfoPages"
      :stuID="stuID"
    ></chongzhiliushui-form>
    <derivechongzhi-form v-model="daochuchongzhi" v-on:handleSearch="getchongzhiInfoPages"></derivechongzhi-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import derivexinqianForm from "../../../components/zhaoshengbaoming/baomingjiaofei/derivexinqianForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import oldstuchongzhiForm from "../../../components/zhaoshengbaoming/baomingjiaofei/oldstuchongzhiForm.vue";
import chongzhiliushuiForm from "../../../components/zhaoshengbaoming/baomingjiaofei/chongzhiliushuiForm.vue";
import derivechongzhiForm from "../../../components/zhaoshengbaoming/baomingjiaofei/derivechongzhiForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    derivexinqianForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    oldstuchongzhiForm,
    chongzhiliushuiForm,
    derivechongzhiForm,
  },
  data() {
    return {
      columns: [
        {
          // type: "selection",
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {
                  "on-change": (e) => {
                    this.data.forEach((items) => {
                      //先取消所有对象的勾选，checkBox设置为false
                      this.$set(items, "checkBox", false);
                    });
                    this.data[params.index].checkBox = e; //再将勾选的对象的checkBox设置为true
                  },
                },
              }),
            ]);
          },
        },
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
            if (
              params.row.zidingyiStuID == null ||
              params.row.zidingyiStuID == ""
            ) {
              return h("div", [h("span", params.row.id)]);
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
          title: "联系手机",
          key: "parentTel",
          align: "center",
        },
        {
          title: "充值余额",
          key: "remainChongzhi",
          align: "center",
          render: (h, params) => {
            if (
              params.row.remainChongzhi == null ||
              params.row.remainChongzhi == ""
            ) {
              return h("div", [h("span", "0")]);
            } else {
              return h("div", [h("span", params.row.remainChongzhi)]);
            }
          },
        },
        {
          title: "操作",
          key: "beizhu",
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
                      this.chongzhixiangqing(params);
                    },
                  },
                },
                "充值详情"
              ),
            ]);
          },
        },
      ],
      menuID: "143",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      zidingyiStuID: "",
      stuName: "",
      stuGradeID: 0,
      shouoldstucz: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
      showcaxiangqing: false,
      stuID: "",
      daochuchongzhi: false,
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      if (this.$refs.selection.data[index].checkBox == true) {
        this.$refs.selection.data[index].checkBox =
          !this.$refs.selection.data[index].checkBox;
      } else {
        this.data.forEach((items) => {
          //取消所有对象的勾选，checkBox设置为false
          this.$set(items, "checkBox", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index].checkBox =
          !this.$refs.selection.data[index].checkBox;

        this.checkOne = this.$refs.selection.data[index];
      }
    },

    getchongzhiInfoPages() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetStuYuePages",{
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        zidingyiStuID: this.zidingyiStuID,
        stuName: this.stuName,
        stuGradeID: this.stuGradeID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "checkBox", false);
          });
        }
      });
    },
    TableSearch() {
      this.getchongzhiInfoPages();
    },
    changePage(current) {
      this.current = current;
      this.getchongzhiInfoPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getchongzhiInfoPages();
    },
    search() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.zidingyiStuID = "";
      this.stuName = "";
      this.stuGradeID = 0;
      this.getchongzhiInfoPages();
    },
    DeleteQianDanAndStuInfo() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id + "";
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除该充值？</p>",
          onOk: () => {
            api.del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteQianDanAndStu",{ qiandanID: this.editdataID }).then(
              (res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getchongzhiInfoPages();
                } else {
                  this.$Message.error(res.msg);
                }
              }
            );
          },
          onCancel: () => {},
        });
      }
    },
    clickShijian(onclicks) {
      if (onclicks == "del()") {
        this.DeleteQianDanAndStuInfo();
      } else if (onclicks == "huodong()") {
        this.$router.push({
          path: "/chongzhiyhzc",
          query: {},
        });
      } else if (onclicks == "derive()") {
        this.daochuchongzhi = true;
      } else if (onclicks == "xschongzhi()") {
        this.$router.push({
          path: "/addnewchongzhi",
          query: {
            yxstuID: 0,
          },
        });
      } else if (onclicks == "lschongzhi()") {
        this.shouoldstucz = true;
      } else if (onclicks == "liushui()") {
        this.$router.push({
          path: "/chongzhiliushui",
          query: {},
        });
      }
    },
    chongzhixiangqing(params) {
      this.showcaxiangqing = true;
      this.stuID = params.row.id;
    },
  },

  mounted() {
    this.getchongzhiInfoPages();
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: this.menuID }).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.allcampusData = res.obj;
      }
    });
    api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList",{}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.stugradeData = res.obj;
      }
    });
  },
};
</script>