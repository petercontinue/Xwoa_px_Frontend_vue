<template>
  <div>
    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addImages">添加</Button>
        <Button type="success" size="large" @click="updateImages">修改</Button>
        <Button type="warning" size="large" @click="deletecaijimuban">删除</Button>
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
    <addstu-images
      v-model="showaddstuimages"
      v-on:handleSearch="getmubanImgsListPage"
    ></addstu-images>
  </div>
</template>
<script>
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
//src\components\jiaowuManage\paikexiaoke\shualian\addstuImages.vue
import addstuImages from "@/components/jiaowuManage/paikexiaoke/shualian/addstuImages";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
    addstuImages,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "567",
      allcampusData: [], //校区查询获取到的校区数据
      stugrade: [], //学员年级
      //选中
      checkStuID: [],
      stuIDList: {
        ids: "",
        massage: "", //未使用、占位置
      },
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuName: "",
        campusID: 0,
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
        {
          title: "采集图片",
          key: "stuxiaokeImage",
          align: "center",
          render: (h, params) => {
            if (params.row.stuxiaokeImage) {
              return h(
                "div",
                {
                  attrs: {
                    style: "width: 60px;height: 60px;",
                  },
                },
                [
                  h("img", {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    attrs: {
                      src: params.row.stuxiaokeImage,
                      style: "width: 60px;height: 60px;border-radius: 2px;",
                    },
                    style: {},
                  }),
                ]
              );
            } else {
              return h("div", [h("span", "暂无图片")]);
            }
          },
        },
      ],
      showaddstuimages: false,
      editdataID: "",
    };
  },

  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },

    getmubanImgsListPage() {
      this.checkAll = false;
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/GetAllStuAndMubanImages", this.params)
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
      this.getmubanImgsListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getmubanImgsListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getmubanImgsListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getmubanImgsListPage();
    },
    addImages() {
      this.showaddstuimages = true;
      console.log(this.showaddstuimages);
    },
    deletecaijimuban(data) {
      console.log(this.stuIDList);
      this.data.forEach((items) => {
        if (items._checked) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        console.log(this.editdataID);
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除采集的图片信息？</p>",
          onOk: () => {
            api
              .del("xwcloud-pkxk/paike/paikexiaoke/DeleteStuMubanImage", {
                stuID: this.editdataID,
              })
              .then((res) => {
                console.log(res);
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("图片删除成功");
                  this.getmubanImgsListPage();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
        });
      }
    },
    updateImages() {},
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getmubanImgsListPage();
    this.getstugrade();
  },
};
</script>
