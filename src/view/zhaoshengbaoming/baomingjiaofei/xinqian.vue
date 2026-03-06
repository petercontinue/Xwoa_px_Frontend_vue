<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：以下几种情况是不允许【修改】签单的：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1 学员课程已经有课耗的，修改签单时，该课程不允许修改；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            2
            学员课程有转送、改价、课程合并或删除或添加、转校区、跨校区上课、课程延期、结课、退费操作的，不允许修改签单；
          </span>
        </Col>
        <Col style="margin-top: 10px"
          >3 签单最初是定金报名，后面又补交过尾款的签单，不允许修改；</Col
        >
        <Col style="margin-top: 10px">
          <span>
            4 意向学员充值、新生充值的学员 报课程时 点击本页面 新签报名-> 点击 充值学员
            ,选择充值学员进行报课程；
          </span>
        </Col>

        <Col style="margin-top: 10px; color: red">
          <span>5 使用打印功能时，请先选中要打印的数据行，在开始打印。</span>
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="error" @click="search(2)" ghost>未缴清尾款</Button>
        <!-- <Button type="warning" v-print="printObj" ghost>打印</Button> -->
      </Col>
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getXinqianInfoPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          @on-row-click="onClickRow"
          :columns="columns"
          :data="data"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button
              size="small"
              style="margin-right: 5px"
              type="warning"
              v-print="printObj"
              >打印</Button
            >
          </template>
        </Table>
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
    <derivexinqian-form
      v-model="showderive"
      :type="type"
      v-on:handleSearch="getXinqianInfoPages"
    ></derivexinqian-form>
    <bujiaoweikuan
      v-model="weikuanShow"
      :wkData="wkData"
      v-on:handleSearch="getXinqianInfoPages"
    ></bujiaoweikuan>
    <div id="loading" v-show="printLoading">
      <div id="printMe" style="background: red">
        <div style="text-align: center">
          <h1>新签小票</h1>
        </div>

        <Row>
          <Col span="12">校区</Col>
          <Col span="12">{{ checkOne.campusName }}</Col>
        </Row>
        <Row>
          <Col span="12">学号</Col>
          <Col span="12" v-if="checkOne.zidingyiStuID">{{ checkOne.zidingyiStuID }}</Col>
          <Col span="12" v-if="!checkOne.zidingyiStuID">{{ checkOne.stuID }}</Col>
        </Row>
        <Row>
          <Col span="12">学员姓名</Col>
          <Col span="12">{{ checkOne.stuName }}</Col>
        </Row>
        <Row>
          <Col span="12">年级/年龄段：</Col>
          <Col span="12">{{ checkOne.stuGradeName }}</Col>
        </Row>
        <Row>
          <Col span="12">合同金额</Col>
          <Col span="12">{{ checkOne.hetongMoney }}</Col>
        </Row>
        <Row>
          <Col span="12">实收金额</Col>
          <Col span="12">{{ checkOne.kechengMoney }}</Col>
        </Row>
        <Row>
          <Col span="12">尾款金额</Col>
          <Col span="12">{{ checkOne.weikuan }}</Col>
        </Row>
        <Row>
          <Col span="12">代金券</Col>
          <Col span="12">{{ checkOne.daijinquanMoney }}</Col>
        </Row>
        <Row>
          <Col span="12">其他费用</Col>
          <Col span="12">{{ checkOne.sumotherMoney }}</Col>
        </Row>
        <Row>
          <Col span="12">录入人</Col>
          <Col span="12">{{ checkOne.jinbanStaffName }}</Col>
        </Row>
        <Row>
          <Col span="12">费用类型</Col>
          <Col span="12">新签</Col>
        </Row>
        <Row>
          <Col span="12">交费时间</Col>
          <Col span="12">{{ checkOne.qiandandate }}</Col>
        </Row>
      </div>
    </div>

    <daifukuanqiandan v-model="showdaifukuan" :moneystyle="1"></daifukuanqiandan>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import derivexinqianForm from "../../../components/zhaoshengbaoming/baomingjiaofei/derivexinqianForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import bujiaoweikuan from "@/components/zhaoshengbaoming/baomingjiaofei/bujiaoweikuan";
import couponsVue from "../weixinyingxiao/coupons.vue";
import daifukuanqiandan from "@/components/zhaoshengbaoming/baomingjiaofei/daifukuanqiandan";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    derivexinqianForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    bujiaoweikuan,
    daifukuanqiandan,
    // xinqianInfo,
  },
  data() {
    return {
      printLoading: false,
      printObj: {
        id: "printMe",
        popTitle: "打印",
      },
      type: Number(1),
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
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
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
          title: "总金额",
          key: "hetongMoney",
          align: "center",
        },
        {
          title: "代金券",
          key: "daijinquanMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.daijinquanMoney == null || params.row.daijinquanMoney == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.daijinquanMoney)]);
            }
          },
        },
        {
          title: "优惠金额",
          key: "youhuijine",
          align: "center",
          render: (h, params) => {
            if (params.row.youhuijine == null || params.row.youhuijine == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.youhuijine)]);
            }
          },
        },
        {
          title: "实收金额",
          key: "shishouTotalMoney",
          align: "center",
        },
        {
          title: "应收（元）",
          key: "hetongMoney",
          align: "center",
        },
        {
          title: "尾款（元）",
          key: "weikuan",
          align: "center",
        },
        {
          title: "课程学费",
          key: "kechengMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.kechengMoney == null || params.row.kechengMoney == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.kechengMoney)]);
            }
          },
        },
        {
          title: "杂费",
          key: "sumotherMoney",
          align: "center",
          render: (h, params) => {
            if (params.row.sumotherMoney == null || params.row.sumotherMoney == "") {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.sumotherMoney)]);
            }
          },
        },
        {
          title: "商品费用",
          key: "qiandansuppliesMoney",
          align: "center",
          render: (h, params) => {
            if (
              params.row.qiandansuppliesMoney == null ||
              params.row.qiandansuppliesMoney == ""
            ) {
              return h("div", [h("span", 0)]);
            } else {
              return h("div", [h("span", params.row.qiandansuppliesMoney)]);
            }
          },
        },
        {
          title: "费用说明",
          key: "beizhu",
          align: "center",
          render(h, params) {
            if (params.row.beizhu) {
              return h("div", params.row.beizhu);
            } else {
              return h("div", "-");
            }
          },
        },
        {
          title: "交费时间",
          key: "qiandandate",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "交费时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.Sqiandandate = value[0];
                    this.Eqiandandate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "经办人",
          key: "jinbanStaffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "经办人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.jinbanStaffName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "业绩人",
          key: "yejistaffName",
          align: "center",
          render: (h, params) => {
            if (params.row.yejistaffName == null || params.row.yejistaffName == "") {
              return h("div", [h("span", "-")]);
            } else {
              return h("div", [h("span", params.row.yejistaffName)]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "业绩人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.yejistaffname = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "市场人",
          key: "shichangtea",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.shichangtea == "" || params.row.shichangtea == null) {
              state = "-";
            } else {
              state = params.row.shichangtea;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "转介绍",
          key: "zhuanjieshaoID",
          align: "center",
        },
        {
          title: "操作",
          key: "caozuo",
          align: "center",
          render: (h, params) => {
            //判断补交尾款按钮是否显示
            if (params.row.weikuan > 0) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small",
                    },
                    style: {
                      margin: "5px 10px 5px 0px",
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/qiandaninfo",
                          query: { qiandanID: params.row.id },
                        });
                      },
                    },
                  },
                  "详情"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    style: {
                      margin: "5px 10px 5px 0px",
                    },
                    on: {
                      click: () => {
                        // this.addclass(params);
                        this.wkData = JSON.stringify(params.row);
                        this.weikuanShow = true;
                      },
                    },
                  },
                  "补交尾款"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small",
                    },
                    style: {
                      margin: "5px 10px 5px 0px",
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/qiandaninfo",
                          query: { qiandanID: params.row.id },
                        });
                      },
                    },
                  },
                  "详情"
                ),
              ]);
            }
          },
        },
        {
          title: "打印",
          slot: "action",
          width: 80,
          align: "center",
        },
      ],
      isweikuan: -1,
      menuID: "141",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      zidingyiStuID: "",
      stuName: "",
      stuGradeID: 0,
      Sqiandandate: "",
      Eqiandandate: "",
      jinbanStaffName: "",
      yejistaffname: "",
      showderive: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
      checkOne: [],
      weikuanShow: false,
      wkData: "",
      showdaifukuan: false,
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.checkOne = [];
      if (this.$refs.selection.data[index].checkBox == true) {
        this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
          .checkBox;
      } else {
        this.data.forEach((items) => {
          //取消所有对象的勾选，checkBox设置为false
          this.$set(items, "checkBox", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
          .checkBox;

        this.checkOne = this.$refs.selection.data[index];
      }
    },

    search(type) {
      if (type == 1) {
        this.size = 10;
        this.current = 1;
        this.zidingyiStuID = "";
        this.campusID = 0;
        this.stuName = "";
        this.stuGradeID = 0;
        this.jinbanStaffName = "";
        this.Sqiandandate = "";
        this.Eqiandandate = "";
        this.yejistaffname = "";
        this.Eqiandandate = "";
        this.isweikuan = -1;
      } else if (type == 2) {
        this.isweikuan = 2;
      }
      this.getXinqianInfoPages();
    },

    getXinqianInfoPages() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/getAllQianDanInfoPages",{
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        zidingyiStuID: this.zidingyiStuID,
        stuName: this.stuName,
        stuGradeID: this.stuGradeID,
        jinbanStaffName: this.jinbanStaffName,
        Sqiandandate: this.Sqiandandate,
        Eqiandandate: this.Eqiandandate,
        yejistaffname: this.yejistaffname,
        menuID: this.menuID,
        isweikuan: this.isweikuan,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(this.data);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "checkBox", false);
          });
        }
      });
    },
    TableSearch() {
      this.getXinqianInfoPages();
    },
    changePage(current) {
      this.current = current;
      this.getXinqianInfoPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getXinqianInfoPages();
    },
    onSearch(search) {
      window.console.log(search);
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
          content:
            "<p>如果学员只有这一个签单，删除签单就相当于把这个学员的所有信息全部删除了（如果还有充值余额的情况除外）,确定删除该签单？</p>",
          onOk: () => {
            api.del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteQianDanAndStu",{ qiandanID: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getXinqianInfoPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "addX()") {
        this.$router.push({
          path: "/addxinqian",
          query: {
            yxstuID: 0,
          },
        });
      } else if (onclicks == "del()") {
        this.DeleteQianDanAndStuInfo();
      } else if (onclicks == "edit") {
        this.editdata = "";
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdata = JSON.stringify(items);
            this.editdataID = items.id;
          }
        });
        if (this.editdata == "") {
          this.$Message.error("请选择要修改的数据");
        } else {
          this.$router.push({
            path: "/updateqiandan",
            query: { qiandanID: this.editdataID },
          });
        }
      } else if (onclicks == "derive()") {
        this.showderive = true;
      } else if (onclicks == "editfyshuoming()") {
        this.Oneditfyshuoming();
      } else if (onclicks == "daifukuan()") {
        this.showdaifukuan = true;
      } else if (onclicks == "daishenpi()") {
        this.$router.push({
          path: "/qiandanshenpi",
          query: {},
        });
      }
    },

    /**修改费用说明 */
    Oneditfyshuoming() {
      if (this.checkOne.length == 0) {
        this.$Message.error("请选择要修改的签单");
      } else {
        this.$Modal.confirm({
          title: "修改费用说明",
          width: 50,
          render: (h) => {
            return h("Input", {
              props: {
                value: this.checkOne.beizhu,
                autofocus: true,
                placeholder: "请输入费用说明",
                type: "textarea",
                rows: 3,
              },
              on: {
                input: (val) => {
                  this.value = val;
                },
              },
            });
          },
          onOk: () => {
            console.log(this.checkOne);
            api.post("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/updateqdbeizhu",{
              id: this.checkOne.id,
              beizhu: this.value,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getXinqianInfoPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
  },

  mounted() {
    this.getXinqianInfoPages();
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
