<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1、先【宿舍管理】设置好有哪些宿舍，然后通过【修改】功能去设置学员在哪个宿舍；</span
          >
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
    <DormitoryManager
      v-model="dormitoryShow"
      v-on:handleSearch="getOksushe"
    ></DormitoryManager>
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
import DormitoryManager from "@/components/jiaowuManage/stuManage/DormitoryManager";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    DormitoryManager,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "217",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      sushelist: [],
      checkStuID: [],
      stuIDList: {
        ids: "",
        roomID: "",
      },
      checkAll: false,
      dormitoryShow: false,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuID: "",
        campusID: "",
        stuName: "",
        stuGradeID: "",
        roomName: "",
      },
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
          title: "班主任",
          key: "banzhuren",
          align: "center",
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
        {
          title: "宿舍号",
          key: "roomName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.roomName == "" || params.row.roomName == null) {
              state = "-";
            } else {
              state = params.row.roomName;
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "宿舍号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.roomName = value;
                    this.TableSearch();
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

    getStuStayListPage() {
      this.checkAll = false;
      api
        .get("xwcloud-stu/stu/stuManagement/getStuStayPage", this.params)
        //this.getStuStayPage(this.params)
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
      // this.getallcampusList({ menuID: this.menuID })
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
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
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getstugradeList", {})
        // this.getstugradeList({})
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.stugrade = res.obj;
          }
        });
    },
    getOksushe() {
      api
        .get("xwcloud-stu/stu/stuManagement/getOkList", {})
        //this.getOksusheList({})
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.sushelist = res.obj;
          }
        });

      this.getStuStayListPage();
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.Onderive();
      } else if (onclicks == "edit") {
        this.Onedit();
      } else if (onclicks == "susheguanli()") {
        this.Onsusheguanli();
      } else if (onclicks == "del()") {
        this.Ondel();
      }
    },
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
            h("Row", [h("Col", { props: { span: 20 } }, [h("p", "导出学员住宿")])]),
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
              url: "/xwcloud-stu/stu/stuManagement/exportStuRoom",
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
              link.setAttribute("download", "学员住宿导出.xls");
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
    Onedit() {
      this.addstulist();
      if (this.checkStuID.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        setTimeout(() => {
          this.$Modal.confirm({
            width: 30,
            closable: true,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "修改宿舍")])]),
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
                  "请选择学生要调整的宿舍"
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
                        "选择宿舍："
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
                    [
                      h(
                        "Select",
                        {
                          props: {
                            filterable: true,
                          },
                          on: {
                            "on-change": (val) => {
                              // console.log(val);
                              this.stuIDList.roomID = val;
                            },
                          },
                        },
                        this.sushelist.map((item) => {
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
              // this.stuIDList.massage = this.value;
              api.post("xwcloud-stu/stu/stuManagement/updateRoom",this.stuIDList)
              //this.updateRoom(this.stuIDList)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuStayListPage();
                  this.value = "";
                } else {
                  this.$Message.error(res.msg);
                }
              });
            },
            onCancel: () => {},
          });
        }, 200);
      }
    },
    Onsusheguanli() {
      this.dormitoryShow = true;
    },
    Ondel() {
      this.addstulist();
      setTimeout(() => {
        //确保执行过addstulist
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要清除的数据");
        } else {
          this.$Modal.error({
            title: "清除学员住宿",
            content: "<p>确定要清除数据吗?</p>",
            closable: true,
            onOk: () => {
              console.log(this.stuIDList);
              api.post("xwcloud-stu/stu/stuManagement/delStuStay",this.stuIDList)
              //this.delStuStay(this.stuIDList)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuStayListPage();
                  this.data.forEach((items) => {
                    //取消所有对象的勾选，_checked设置为false
                    this.$set(items, "_checked", false);
                  });
                } else {
                  this.$Message.error(res.msg);
                }
              });
            },
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
      this.params.stuID = "";
      this.params.campusID = "";
      this.params.stuName = "";
      this.params.stuGradeID = "";
      this.params.roomName = "";
      this.getStuStayListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuStayListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuStayListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuStayListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getStuStayListPage();
    this.getstugrade();
    this.getOksushe();
  },
};
</script>
