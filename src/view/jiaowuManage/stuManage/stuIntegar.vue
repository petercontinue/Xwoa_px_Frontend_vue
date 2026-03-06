<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
             1.可以给学员进行添加或扣除积分以外。学员消课是否可以产生积分，可以【点击这里】积分比例设置
          </span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
             2.获得的积分可以在小程序商城上进行积分兑换相应的商品；
          </span>
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          highlight-row
          @on-row-click="onClickRow"
          ref="selection"
          :columns="columns6"
          :data="data"
        ></Table>
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
    <jifenpaiming v-model="paimingShow"></jifenpaiming>
    <addstuIntegar
      v-model="addIntegarShow"
      :typeAorE="addoredir"
      :jfID="addoreditjfID"
      v-on:handleSearch="getStuIntegralListPage"
    ></addstuIntegar>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import jifenpaiming from "@/components/jiaowuManage/stuManage/jifenpaiming";
import addstuIntegar from "@/components/jiaowuManage/stuManage/addstuIntegar";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    jifenpaiming,
    addstuIntegar,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "214",
      paimingShow: false,
      addIntegarShow: false,
      addoredir: "", //添加1 or 修改2
      addoreditjfID: "",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      jfType: [
        { id: "1", name: "增加" },
        { id: "2", name: "扣减" },
      ],
      //选中
      checkStuID: [],
      stuIDList: {
        ids: "",
      },
      //导出
      exPcam: "",
      exPtype: -1,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuID: "",
        campusID: "",
        stuName: "",
        starDate: "",
        endDate: "",
        jingbanStaff: "",
        stuGradeID: "",
        type: -1,
      },
      checkAll: false,
      columns6: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.data.forEach((item) => {
                      item._checked = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {},
              }),
            ]);
          },
        },
        {
          title: "校区",
          key: "campusName",
          align: "center",
          width: 140,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "校区",
                  width: 100,
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = Number(element.id);
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
          width: 100,
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null || params.row.zidingyiStuID == "") {
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
          width: 100,
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
          title: "班主任",
          key: "banzhuren",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            if (params.row.banzhuren == "" || params.row.banzhuren == null) {
              state = "-";
            } else {
              state = params.row.banzhuren;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "年级",
          key: "stuGradeName",
          align: "center",
          width: 100,
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "年级",
                  data: this.stugrade,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.stugrade.forEach((element) => {
                        if (element.id == value) {
                          this.params.stuGradeID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.stuGradeID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        { title: "积分", key: "integral", align: "center", width: 80 },
        {
          title: "变动时间",
          key: "createTime",
          align: "center",
          width: 200,
          render: (h, params) => {
            let datehave = toolbox.dateFtt(
              params.row.createTime,
              "yyyy-MM-dd hh:mm:ss"
            );
            return h("div", [h("span", datehave)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "变动时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.starDate = value[0];
                    this.params.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "经办人",
          key: "jingbanStaff",
          align: "center",
          width: 100,
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
                    this.params.jingbanStaff = value;
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
          width: 100,
          render: (h, params) => {
            let state = "";
            switch (params.row.type) {
              case "1":
                state = "增加";
                break;
              case "2":
                state = "扣减";
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
                  data: this.jfType,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.type = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.type = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        { title: "变动说明", key: "remark", align: "center" },
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked =
        !this.$refs.selection.data[index]._checked;
    },

    getStuIntegralListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/stuManagement/getStuIntegralPage",this.params)
      //this.getStuIntegralPage(this.params)
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
 
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },
    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
      //this.getallcampusList({ menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    /**
     * 获取学员年级
     */
    getstugrade() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList",{})
      //this.getstugradeList({})
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stugrade = res.obj;
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
      } else if (onclicks == "addinfo") {
        this.Onaddinfo();
      } else if (onclicks == "edit") {
        this.Onedit();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "jifenpaiming()") {
        this.Ondjifenpaimingel();
      }
    },

    /**选中的学员添加进列表，方便进行处理 */
    addstulist() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push({
            jfID: items.id, //积分表ID
          });
        }
      });
      this.stuIDList.ids = JSON.stringify(this.checkStuID);
    },

    /**导出学员积分 */
    Onderive() {
      this.$Modal.confirm({
        closable: true,
        width: 40,
        okText: "导出",
        render: (h) => {
          return h("div", [
            h("Row", [
              h("Col", { props: { span: 20 } }, [h("p", "导出学员积分")]),
            ]),
            [
              h("Divider", {
                style: { margin: "10px 0px 20px 0px" },
              }),
            ],
            h(
              "p",
              {
                style: { color: "red", margin: "10px" },
              },
              "注：都不选择即导出全部"
            ),
            h("Row", [
              h(
                "Col",
                {
                  props: {
                    span: 2,
                  },
                },
                [
                  h(
                    "p",
                    {
                      style: { margin: "10px" },
                    },
                    "校区："
                  ),
                ]
              ),
              h(
                "Col",
                {
                  props: {
                    span: 9,
                  },
                },
                [
                  h(
                    "Select",
                    {
                      on: {
                        "on-change": (val) => {
                          this.exPcam = val;
                        },
                      },
                    },
                    this.allcampusData.map((item) => {
                      return h("Option", {
                        props: { value: item.id, label: item.name },
                      });
                    })
                  ),
                ]
              ),
              h(
                "Col",
                {
                  props: {
                    span: 2,
                    offset: 1,
                  },
                },
                [
                  h(
                    "p",
                    {
                      style: { margin: "10px" },
                    },
                    "类型："
                  ),
                ]
              ),
              h(
                "Col",
                {
                  props: {
                    span: 9,
                  },
                },
                [
                  h(
                    "Select",
                    {
                      on: {
                        "on-change": (val) => {
                          this.exPtype = val;
                        },
                      },
                    },
                    this.jfType.map((item) => {
                      return h("Option", {
                        props: { value: item.id, label: item.name },
                      });
                    })
                  ),
                ]
              ),
            ]),
          ]);
        },
        onOk: () => {
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-stu/stu/stuManagement/exportJiFen",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: { campusID: this.exPcam, type: this.exPtype },
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
              link.setAttribute("download", "学员积分导出.xls");
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
    Onaddinfo() {
      this.addeditStuID = "";
      this.addoredir = "1";
      this.addIntegarShow = true;
    },
    Onedit() {
      this.addstulist();
      setTimeout(() => {
        console.log(this.checkStuID);
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要修改的数据");
        } else if (this.checkStuID.length > 1) {
          this.$Message.error("请选择一行");
        } else {
          this.addoredir = "2";
          this.addoreditjfID = this.checkStuID[0].jfID;
          this.addIntegarShow = true;
        }
      }, 200);
    },

    /**删除学员积分 */
    Ondel() {
      this.addstulist();
      setTimeout(() => {
        //确保执行过addstulist
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.$Modal.confirm({
            content: "<p>确定要删除数据吗?</p>",
            width: 25,
            closable: true,
            onOk: () => {
              api.del("xwcloud-stu/stu/stuManagement/delJiFen",this.stuIDList)
              //this.delJiFen(this.stuIDList)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuIntegralListPage();
                } else {
                  this.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {},
          });
        }
      }, 200);
    },
    Ondjifenpaimingel() {
      this.paimingShow = true;
    },
    // tojifenSetting() {
    //   this.$Modal.confirm({
    //     closable: true,
    //     content: "<p>确定跳转至积分比例设置?</p>",
    //     onOk: () => {
    //       this.$router.push({
    //         path: "/jiaowushezhi",
    //         query: {},
    //       });
    //     },
    //     onCancel: () => {},
    //   });
    // },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuID = "";
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.starDate = "";
      this.params.endDate = "";
      this.params.jingbanStaff = "";
      this.params.stuGradeID = "";
      this.params.type = -1;
      this.getStuIntegralListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuIntegralListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuIntegralListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuIntegralListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getstugrade();
    this.getStuIntegralListPage();
  },
};
</script>
