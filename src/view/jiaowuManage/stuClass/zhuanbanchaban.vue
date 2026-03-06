<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1.班课类的班级或一对一班级，操作不启用时，该班级会自动删除当前时间以后的所有排课，但学员未自动退班；重新启用时需重新排课；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2.班课类的班级学员单独退班时，要选择从哪一次排课开始退出现有排课；单个学员插班时也要选择从哪一次排课开始加入；单个学员转班时也需要选择从原班级的哪一次排课退出，从新班级的哪一次排课开始加入；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span
            >3.批量退班时，默认是从当前时间开始退出排课；批量转班时，默认也是从当前时间开始退出原有排课，从当前时间开始插入新班级的排课；</span
          >
        </Col>
      </Alert>
    </Row>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="primary" ghost @click="search(1)">全部</Button>
        <Button type="success" ghost @click="search(3)">未插班</Button>
        <Button type="info" ghost @click="search(2)">已插班</Button>
      </Col>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="24">
        <!-- <Button type="success" size="large" @click="addclass()">新建班级</Button> -->
        <Button type="primary" size="large" @click="allnoStuCharu()">批量插班</Button>
        <Button type="info" size="large" @click="saveplChangeClass()">批量转班</Button>
        <Button type="warning" size="large" @click="tuichuClassall()">批量退班</Button>
        <Button type="info" size="large" @click="kaoxiaoqu()">跨校区插班</Button>
        <Button type="error" size="large" @click="DeriveChabanXinxi()"
          >导出插班信息</Button
        >
      </Col>
    </Row>
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
    <addclass
      v-model="addShow"
      :campusName="addcampusName"
      :campusID="addcampusID"
      :kecheng="addkecheng"
      v-on:handleSearch="getzhuangbanchaListban"
    ></addclass>

    <!-- 插班 -->
    <upclass
      v-model="upShow"
      :buxiID="upID"
      :type="uptype"
      :campusID="upcampusID"
      v-on:handleSearch="getzhuangbanchaListban"
    ></upclass>
    <!-- 转班 -->
    <editclass
      v-model="editShow"
      :buxiID="editID"
      :campusID="upcampusID"
      :campusName="editcampusName"
      :kechengName="editkechengName"
      v-on:handleSearch="getzhuangbanchaListban"
    ></editclass>
    <downclass
      v-model="downShow"
      :buxiID="downID"
      :campusName="downcampusName"
      :kechengName="downkechengName"
      v-on:handleSearch="getzhuangbanchaListban"
    ></downclass>
    <alleditclass
      v-model="allzbShow"
      :buxiID="allID"
      :campus="allcampus"
      :campusID="upcampusID"
      v-on:handleSearch="getzhuangbanchaListban"
    ></alleditclass>
    <haveClass v-model="haveClassShow" :buxiID="haveID"></haveClass>
    <kxqupclass v-model="kxqcbShow"></kxqupclass>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import addclass from "@/components/jiaowuManage/stuClass/addclass";
import upclass from "@/components/jiaowuManage/stuClass/upclass";
import editclass from "@/components/jiaowuManage/stuClass/editclass";
import downclass from "@/components/jiaowuManage/stuClass/downclass";
import haveClass from "@/components/jiaowuManage/stuClass/haveClass";
import alleditclass from "@/components/jiaowuManage/stuClass/alleditclass";
import kxqupclass from "@/components/jiaowuManage/stuClass/kxqupclass";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
    addclass,
    upclass,
    editclass,
    downclass,
    haveClass,
    alleditclass,
    kxqupclass,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      checkcam: [],
      showtype: [
        { id: 0, name: "不启用" },
        { id: 1, name: "启用" },
      ],
      campuscheck: false,
      //建班
      addShow: false,
      addcampusName: "",
      addcampusID: "",
      addkecheng: "",
      //插班
      upShow: false,
      upID: "",
      uptype: "",
      upcampusID: "",
      //转班
      editShow: false,
      editcampusName: "",
      editkechengName: "",
      editID: "",
      //退班
      downShow: false,
      downcampusName: "",
      downkechengName: "",
      downID: "",
      OneDown: {
        ids: "",
        classids: null,
        pkid: "",
      },
      //批量转班
      allzbShow: false,
      allID: "",
      allcampus: "",

      checkList: [],
      haveClassShow: false, //已插班级
      haveID: "",

      kxqcbShow: false,
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stuID: "",
        stuName: "",
        stuGradeID: "",
        kechengName: "",
        isShow: -1,
        className: "",
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
          width: 120,
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
          width: 120,
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
          title: "课程状态",
          key: "isShow",
          align: "center",
          width: 120,
          render: (h, params) => {
            let state = "";
            switch (params.row.isShow) {
              case "1":
                state = "启用";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "green" },
                    },
                    state
                  ),
                ]);
              case "0":
                state = "未启用";
                return h("div", [
                  h(
                    "span",
                    {
                      style: { color: "red" },
                    },
                    state
                  ),
                ]);
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
                  content: "课程状态",
                  data: this.showtype,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.showtype.forEach((element) => {
                        if (element.id == value) {
                          this.params.isShow = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.isShow = "";
                      this.TableSearch();
                    }
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
          render: (h, params) => {
            if (params.row.classcount < 1) {
              return h("div", [h("span", { style: { color: "red" } }, "未插班")]);
            } else if (params.row.classcount == 1) {
              return h("div", [
                h("span", { style: { color: "black" } }, params.row.className),
              ]);
            } else if (params.row.classcount > 1) {
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
                        this.haveclassInfo(params);
                      },
                    },
                  },
                  params.row.classcount + "-详情"
                ),
              ]);
            }
          },
        },
        {
          title: "操作",
          key: "caozuo",
          align: "center",
          render: (h, params) => {
            if (params.row.classcount < 1) {
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
                        this.addclass(params);
                      },
                    },
                  },
                  "建班"
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
                        this.upclass(params);
                      },
                    },
                  },
                  "插班"
                ),
              ]);
            } else if (params.row.classcount >= 1) {
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
                        this.addclass(params);
                      },
                    },
                  },
                  "建班"
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
                        this.upclass(params);
                      },
                    },
                  },
                  "插班"
                ),
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
                        this.editclass(params);
                      },
                    },
                  },
                  "转班"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.downclass(params);
                      },
                    },
                  },
                  "退班"
                ),
              ]);
            }
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

    getzhuangbanchaListban() {
      this.checkAll = false;
      api.get("xwcloud-stu/stu/stuClass/getzhuangbanchaban", this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
          this.checkList = [];
          this.checkcam = [];
        }
      });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: "231" })
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
      api.get("xwcloud-stu/stu/stuManagement/Getnianji", {}).then((res) => {
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
        this.derive();
      }
    },

    /**
     * 快捷查询
     */
    search(type) {
      this.params.size = 10;
      this.params.current = 1;
      if (type == 1) {
        this.params.campusID = "";
        this.params.stuID = "";
        this.params.stuName = "";
        this.params.stuGradeID = "";
        this.params.kechengName = "";
        this.params.isShow = -1;
        this.params.className = "";
        this.params.type = -1;
      } else if (type == 2) {
        this.params.type = 2;
      } else if (type == 3) {
        this.params.type = 1;
      }
      this.getzhuangbanchaListban();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getzhuangbanchaListban();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getzhuangbanchaListban();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getzhuangbanchaListban();
    },

    /**已插班级 */
    haveclassInfo(value) {
      this.haveID = value.row.id;
      this.haveClassShow = true;
    },

    /**选中数据 */
    addchecklist() {
      this.checkList = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkList.push({
            id: items.id,
          });
        }
      });
      this.OneDown.ids = JSON.stringify(this.checkList);
    },

    /**导出 */
    DeriveChabanXinxi() {
      this.$Modal.confirm({
        title: "导出插班信息",
        content: "<p>点击确定按钮，开始导出插班信息，数据过多时，请耐心等待。</p>",
        width: 30,
        onOk: () => {
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-stu/stu/stuClass/DeriveChabanXinxi",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: {},
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
              link.setAttribute("download", "插班信息导出.xls");
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

    /**批量插班 */
    allnoStuCharu() {
      this.uptype = "2";
      this.checkList = [];
      this.checkcam = [];
      this.campuscheck = false;
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkList.push({
            id: items.id,
          });
          this.checkcam.push(items.campusID);
        }
      });
      if (this.checkList.length <= 0) {
        this.$Message.error("请选择数据");
      } else {
        let one = this.checkcam[0];
        this.checkcam.forEach((itema) => {
          if (itema != one) {
            this.campuscheck = true;
          }
        });
        if (this.campuscheck) {
          this.$Message.error("请选择相同校区数据");
          this.campuscheck = false;
          return;
        } else {
          this.upID = JSON.stringify(this.checkList);
          this.upShow = true;
          this.upcampusID = one;
        }
      }
    },

    /**批量转班 */
    saveplChangeClass() {
      this.checkList = [];
      this.checkcam = [];
      this.campuscheck = false;
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkList.push({
            id: items.campusID,
          });
          this.checkcam.push(items.campusName);
        }
      });
      if (this.checkList.length <= 0) {
        this.$Message.error("请选择数据");
      } else {
        let one = this.checkcam[0];
        this.checkcam.forEach((itema) => {
          if (itema != one) {
            this.campuscheck = true;
          }
        });
        if (this.campuscheck) {
          this.$Message.error("请选择相同校区数据");
          this.checkcam = [];
          return;
        } else {
          this.allcampus = one;
          this.upcampusID = this.checkList[0].id;
          this.allID = JSON.stringify(this.checkList);
          this.allzbShow = true;
        }
      }
    },

    kaoxiaoqu() {
      this.kxqcbShow = true;
    },

    //表格按钮事件---------
    /** 建班*/
    addclass(value) {
      console.log(value);
      this.addcampusName = value.row.campusName;
      this.addcampusID = value.row.campusID;
      this.addkecheng = value.row.kechengName;
      this.addShow = true;
      //nostuaddclass
    },

    /**插班 */
    upclass(value) {
      this.uptype = "1";
      this.upID = value.row.id;
      this.upcampusID = value.row.campusID;
      if (value.row.isShow == 0) {
        this.$Message.error("未启用课程不允许插班！");
      } else {
        //打开插班弹框
        this.upShow = true;
      }
    },

    /**转班 */
    editclass(value) {
      this.editID = value.row.id;
      this.editcampusName = value.row.campusName;
      this.editkechengName = value.row.kechengName;
      this.upcampusID = value.row.campusID;
      this.editShow = true;
    },

    /**退班 */
    downclass(value) {
      // if (value.row.classcount > 1) {
      this.downID = value.row.id;
      this.downcampusName = value.row.campusName;
      this.downkechengName = value.row.kechengName;
      this.downShow = true;
      // } else {
      //   this.checkList.push({ id: value.row.id });
      //   this.OneDown.ids = JSON.stringify(this.checkList);
      //   //只有1个班级时
      //   this.$Modal.confirm({
      //     title: "退班",
      //     content: "<p>确定退出班级吗?</p>",
      //     onOk: () => {
      //       this.tuichuClass(this.OneDown).then((res) => {
      //         if (res.code == "Y" && res.success == true) {
      //           this.$Message.success(res.msg);
      //           this.getzhuangbanchaListban();
      //         } else {
      //           this.$Message.error(res.msg);
      //         }
      //       });
      //     },
      //     onCancel: () => {},
      //   });
      // }
    },

    /**批量退班 */
    tuichuClassall() {
      this.addchecklist();
      if (this.checkList.length <= 0) {
        this.$Message.error("请选择数据");
      } else {
        this.$Modal.confirm({
          title: "退班",
          content: "<p>确定退出班级吗?</p>",
          onOk: () => {
            api.post("xwcloud-stu/stu/stuClass/tuichuClass", this.OneDown).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getzhuangbanchaListban();
                this.OneDown.ids = "";
                this.OneDown.classids = "";
                this.OneDown.pkid = "";
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

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getzhuangbanchaListban();
    this.getstugrade();
  },
};
</script>
