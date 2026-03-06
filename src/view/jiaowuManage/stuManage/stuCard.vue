<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span
            >温馨提示：需要给学员派发学员卡，才派发；不派发学员卡不影响系统其他功能的使用；</span
          >
        </Col>
        <!-- <Col style="margin-top: 10px">
          <span>需要给学员派发学员卡，才派发；不派发学员卡不影响系统其他功能的使用；</span>
        </Col> -->
      </Alert>
    </div>

    <Row style="margin-top: 20px">
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
          ref="selection"
          highlight-row
          @on-row-click="onClickRow"
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
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "213",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      //选中
      checkStuID: [],
      stuIDList: {
        ids: "",
        massage: "", //未使用、占位置
      },

      //导出
      exPcam: "",
      exPgra: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuName: "",
        stuID: 0,
        campusID: 0,
        cardID: "",
        stuGradeID: 0,
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
          title: "卡号",
          key: "cardID",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.cardID == "" || params.row.cardID == null) {
              state = "-";
            } else {
              state = params.row.cardID;
            }
            return h("div", [h("span", state)]);
          },

          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "卡号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.cardID = value;
                    this.TableSearch();
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
          title: "年级",
          key: "stuGradeName",
          align: "center",
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
      ],
    };
  },

  methods: {

    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getStuCardListPage() {
      this.checkAll = false;
      api
        .get("xwcloud-stu/stu/stuManagement/getStuCardPage", this.params)
        //this.getStuCardPage(this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(res);
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
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
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
      api.get("xwcloud-stu/stu/stuManagement/Getnianji",{})
      //this.Getnianji({})
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
      } else if (onclicks == "addCard()") {
        this.OnaddCard();
      } else if (onclicks == "delCard()") {
        this.OndelCard();
      }
    },

    /**选中的学员添加进列表，方便进行处理 */
    addstulist() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push({
            id: items.stuID,
          });
        }
      });
      this.stuIDList.ids = JSON.stringify(this.checkStuID);
    },
    Onderive() {
      this.$Modal.confirm({
        closable: true,
        width: 40,
        okText: "导出",
        render: (h) => {
          return h("div", [
            h("Row", [h("Col", { props: { span: 20 } }, [h("p", "导出学员卡")])]),
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
                    "年级："
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
                          this.exPgra = val;
                        },
                      },
                    },
                    this.stugrade.map((item) => {
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
              url: "/xwcloud-stu/stu/stuManagement/ExportStuCard",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: { campusID: this.exPcam, stuGradeID: this.exPgra },
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
              link.setAttribute("download", "学员卡导出.xls");
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

    /**添加/修改学员卡绑定 */
    OnaddCard() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push(items);
        }
      });
      if (this.checkStuID.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkStuID.length > 1) {
        this.$Message.error("请选择一行");
      } else {
        this.$Modal.confirm({
          width: 35,
          closable: true,
          render: (h) => {
            let create = this.$createElement;
            let dom = create("Input", {
              ref: "tagInput",
              props: {
                value: this.checkStuID[0].cardID,
                autofocus: true,
                placeholder: "请输入卡号",
              },
              on: {
                input: (val) => {
                  this.value = val;
                },
                "on-focus": (event) => {
                  this.value = event.target.value;
                },
              },
            });
            return h("div", [
              h("Row", [h("Col", { props: { span: 20 } }, [h("p", "绑定学员卡")])]),
              [
                h("Divider", {
                  style: { margin: "10px 0px 20px 0px" },
                }),
              ],
              h(
                "p",
                {
                  style: { color: "blue", margin: "10px" },
                },
                "推荐方法：先鼠标点在输入框里，然后学员卡在刷卡器上刷卡，自动将卡号读取到卡号的输入里"
              ),
              h("Row", [
                h(
                  "Col",
                  {
                    props: {
                      span: 4,
                    },
                  },
                  [
                    h(
                      "p",
                      {
                        style: { margin: "10px" },
                      },
                      "输入卡号："
                    ),
                  ]
                ),
                h(
                  "Col",
                  {
                    props: {
                      span: 20,
                    },
                  },
                  [dom]
                ),
              ]),
            ]);
          },
          onOk: () => {
            this.$refs["tagInput"].focus();
            console.log(this.value);
            this.stuIDList.massage = this.value;
            api.post("xwcloud-stu/stu/stuManagement/updateCardID",{
              stuID: this.checkStuID[0].stuID,
              cardNum: this.value,
            })
            // this.updateCardID({
            //   stuID: this.checkStuID[0].stuID,
            //   cardNum: this.value,
            // })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getStuCardListPage();
                this.value = "";
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
    /**删除学员卡绑定 */
    OndelCard() {
      this.addstulist();
      setTimeout(() => {
        //确保执行过addstulist
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.$Modal.error({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            width: 25,
            closable: true,
            onOk: () => {
              api.del("xwcloud-stu/stu/stuManagement/delstuCard",this.stuIDList)
              //this.delstuCard(this.stuIDList)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuCardListPage();
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

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuName = "";
      this.params.stuID = 0;
      this.params.campusID = 0;
      this.params.cardID = "";
      this.params.stuGradeID = 0;
      this.getStuCardListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuCardListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuCardListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuCardListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getStuCardListPage();
    this.getstugrade();
  },
};
</script>
