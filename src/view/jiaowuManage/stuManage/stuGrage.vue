<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span
            >温馨提示：该页面是指学员从一年级升为二年级。学员年级进行批量升级；或者年龄段进行升段；</span
          >
        </Col>
        <!-- <Col style="margin-top: 10px">
          <span>该页面是指学员从一年级升为二年级。学员年级进行批量升级；或者年龄段进行升段；</span>
        </Col> -->
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
      menuID: "215",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      checkStuID: [],
      stuIDList: {
        ids: "",
        stuGradeID: "",
      },
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stuName: "",
        stuID: "",
        stuGradeID: "",
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
      ],
    };
  },

  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getStuGrageListPage() {
      this.checkAll = false;
      api
        .get("xwcloud-stu/stu/stuManagement/getStuGragePage", this.params)
        //this.getStuGragePage(this.params)
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
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },
    getstugrade() {
      api
        .get("xwcloud-stu/stu/stuManagement/Getnianji", {})
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
      if (onclicks == "xuanUpGrade()") {
        this.OnxuanUpGrade();
      } else if (onclicks == "Gradejilu()") {
        this.OnGradejilu();
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
      this.params.stuID = "";
      this.params.stuGradeID = "";
      this.getStuGrageListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuGrageListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuGrageListPage();
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
    OnxuanUpGrade() {
      this.addstulist();
      if (this.checkStuID.length == 0) {
        this.$Message.error("请选择要调级的数据");
      } else {
        setTimeout(() => {
          this.$Modal.confirm({
            width: 30,
            closable: true,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "调级")])]),
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
                  "请选择学生要调到的年级或年龄段"
                ),
                h("Row", [
                  h(
                    "Col",
                    {
                      props: {
                        span: 3,
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
                        span: 20,
                      },
                    },
                    [
                      h(
                        "Select",
                        {
                          on: {
                            "on-change": (val) => {
                              // console.log(val);
                              this.stuIDList.stuGradeID = val;
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
              api
                .post("xwcloud-stu/stu/stuManagement/updateStuGrade", this.stuIDList)
                //this.updateStuGrade(this.stuIDList)
                .then((res) => {
                  if (res.code == "Y" && res.success == true) {
                    this.$Message.success(res.msg);
                    this.getStuGrageListPage();
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
    OnGradejilu() {
      this.$router.push({
        path: "/gradejilu",
        query: {},
      });
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuGrageListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getstugrade();
    this.getStuGrageListPage();
  },
};
</script>
