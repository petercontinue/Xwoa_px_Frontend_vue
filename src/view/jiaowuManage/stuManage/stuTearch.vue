<style>
/*选中某一行高亮*/
.ivu-table-row-highlight td {
  background-color: #01f7ff !important;
}
</style>
<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="info" ghost @click="search(2)">未分配</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          @on-row-click="onClickRow"
          no-data-text="暂无数据"
          :columns="columns4"
          :data="data"
          highlight-row
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

    <stuclass v-model="stuclassShow" :stuID="lookstuID"></stuclass>
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
import stuclass from "@/components/jiaowuManage/stuManage/stuclass";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    stuclass,
  },
  data() {
    return {
      selecteds: [],
      checkAll: false,
      columns4: [
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
                    this.params.id = value;
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
          title: "班级",
          key: "banji",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.tostuclass(params);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
        {
          title: "班主任",
          key: "banzhuren",
          align: "center",
          render: (h, params) => {
            if (params.row.banzhuren == null) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  "未分配班主任"
                ),
              ]);
            } else {
              return h("div", [h("span", params.row.banzhuren)]);
            }
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班主任",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.Banzhuren = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
      ],
      data: [], // 接口数据接收
      total: 0,
      menuID: "212",
      allcampusData: [], //校区查询获取到的校区数据
      allstaff: [],

      //选中
      checkStuID: [],
      stuIDList: {
        ids: "",
        teacher: 0,
      },
      exportcampus: "",
      stuclassShow: false,
      lookstuID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        Banzhuren: "",
        stuName: "",
        id: 0,
        campusID: 0,
      },
    };
  },
  methods: {
    onSelect(selection) {
      console.log(this.$refs.selection.data);
      console.log(this.data);
      this.selecteds = selection;
    },
    onClickRow(row, index) {
      //改变为勾选样式
      //将当前行加入到selection
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getStuTearchListPage() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/stuManagement/getStuTearchPage",this.params)
      //this.getStuTearchPage(this.params)
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
        //this.getallcampusList({ menuID: this.menuID })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    GetBanzhurenFenpeiList() {
      api.get("xwcloud-stu/stu/stuManagement/GetBanzhurenFenpei",{})
      this.GetBanzhurenFenpei({})
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstaff = res.obj;
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
      } else if (onclicks == "fenpei()") {
        this.Onfenpei();
      } else if (onclicks == "delbzr()") {
        this.Ondelbzr();
      } else if (onclicks == "editbzr()") {
        this.Oneditbzr();
      }
    },

    /**
     * 快捷查询
     */
    search(type) {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuName = "";
      this.params.id = 0;
      this.params.campusID = 0;
      if (type == 1) {
        this.params.Banzhuren = "";
      } else {
        this.params.Banzhuren = "NoHave5";
      }
      this.getStuTearchListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getStuTearchListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getStuTearchListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getStuTearchListPage();
    },

    /**选中的学员信息添加进列表，方便进行处理 */
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

    /**导出 */
    Onderive() {
      this.$Modal.confirm({
        closable: true,
        width: 30,
        render: (h) => {
          return h("div", [
            h("Row", [h("Col", { props: { span: 20 } }, [h("p", "导出学员班主任")])]),
            [
              h("Divider", {
                style: { margin: "10px 0px 20px 0px" },
              }),
            ],
            h("Row", [
              h("Col", { props: { span: 20 } }, [
                h(
                  "p",
                  {
                    style: { color: "red", margin: "0px 0px 15px 0px" },
                  },
                  "注：不选择即导出全部"
                ),
              ]),
            ]),
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
                    "校区："
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
                          this.exportcampus = val;
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
            ]),
          ]);
        },
        onOk: () => {
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-stu/stu/stuManagement/ExportstuTeacher",
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
              link.setAttribute("download", "学员班主任导出.xls");
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

    /**分配学员班主任 */
    Onfenpei() {
      this.addstulist();
      setTimeout(() => {
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要分配班主任的学员");
        } else {
          console.log(this.selecteds);
          this.$Modal.confirm({
            width: 30,
            closable: true,
            render: (h) => {
              return h("div", [
                h("Row", [h("Col", { props: { span: 20 } }, [h("p", "分配学员班主任")])]),
                [
                  h("Divider", {
                    style: { margin: "10px 0px 20px 0px" },
                  }),
                ],
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
                        "选择老师："
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
                              this.stuIDList.teacher = val;
                            },
                          },
                        },
                        this.allstaff.map((item) => {
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
              api.post("xwcloud-stu/stu/stuManagement/FenPingTeacher",this.stuIDList)
              //this.FenPingTeacher(this.stuIDList)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuTearchListPage();
                  this.stuIDList.ids = "";
                  this.stuIDList.teacher = 0;
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
    /**清除班主任 */
    Ondelbzr() {
      // console.log(this.data);
      this.addstulist();
      setTimeout(() => {
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要清除班主任的学员");
        } else {
          this.$Modal.error({
            title: "清除班主任",
            width: 25,
            content: "<p>确定要给选中学员清除班主任吗？</p>",
            closable: true,
            onOk: () => {
              api.post("xwcloud-stu/stu/stuManagement/deleteTeacher",this.stuIDList)
              //this.deleteTeacher(this.stuIDList)
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getStuTearchListPage();
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
    /**修改班主任 */
    Oneditbzr() {
      this.Onfenpei();
    },
    /**班级详情 */
    tostuclass(value) {
      this.lookstuID = "";
      this.lookstuID = value.row.stuID;
      this.stuclassShow = true;
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getStuTearchListPage();
    this.GetBanzhurenFenpeiList();
  },
};
</script>
