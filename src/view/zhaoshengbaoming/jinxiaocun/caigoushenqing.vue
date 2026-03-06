<template>
  <div>
    <Row style="margin-top: 20px">
      <Col span="24">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
      <!---->
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getteachSubjectPages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns"
          :data="data"
          @on-row-click="onClickRow"
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
    <addcaigoushenqin-form
      v-model="showaddcaigou"
      v-on:handleSearch="getteachSubjectPages"
      :editdata="editdata"
    ></addcaigoushenqin-form>
  </div>
</template>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import addcaigoushenqinForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addcaigoushenqinForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    addcaigoushenqinForm,
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
          title: "分类",
          key: "typeName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "分类",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.shangpingType = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "名称",
          key: "shangpingName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.shangpingName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "规格",
          key: "guigeID",
          align: "center",
        },
        {
          title: "数量",
          key: "buyNum",
          align: "center",
        },
        {
          title: "单位",
          key: "danwei",
          align: "center",
        },
        {
          title: "备注",
          key: "beizhu",
          align: "center",
        },
        {
          title: "申请人",
          key: "staffName",
          align: "center",
        },
        {
          title: "申请时间",
          key: "addDate",
          align: "center",
        },
        {
          title: "状态",
          key: "isshenhe",
          align: "center",
          render: (h, params) => {
            if (params.row.isshenhe == 0) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  "未审核"
                ),
              ]);
            } else if (params.row.isshenhe == 1) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  "审核通过"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  "审核不通过"
                ),
              ]);
            }
          },
        },
      ],
      menuID: "154",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusID: 0,
      shangpingType: "",
      shangpingName: "",
      staffname: "",
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
      showaddcaigou: false,
    };
  },
  methods: {
    //鼠标单击一行选中
    onClickRow(row, index) {
      this.data.forEach((items) => {
        //取消所有对象的勾选，checkBox设置为false
        this.$set(items, "checkBox", false);
      });
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox =
        !this.$refs.selection.data[index].checkBox;
    },
    getteachSubjectPages() {
      api.get("/xwcloud-zsbm/zsbm/JinXiaoCun/GetTeachingSuppliesbuyPages",{
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        shangpingType: this.shangpingType,
        shangpingName: this.shangpingName,
        staffname: this.staffname,
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
      this.getteachSubjectPages();
    },
    changePage(current) {
      this.current = current;
      this.getteachSubjectPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getteachSubjectPages();
    },
    onSearch(search) {
      window.console.log(search);
    },

    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "derive()") {
        this.showderive = true;
      } else if (onclicks == "addinfo") {
        this.editdata = "";
        this.showaddcaigou = true;
      } else if (onclicks == "edit") {
        this.editdata = "";
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdata = JSON.stringify(items);
          }
        });
        if (this.editdata == "") {
          this.$Message.error("请选择要编辑的数据");
        } else {
          this.showaddcaigou = true;
        }
      } else if (onclicks == "del()") {
        this.deletecaigoushenqing();
      } else if (onclicks == "Yaudit()") {
        this.shenhetonguo();
      } else if (onclicks == "Naudit()") {
        this.shenhebutonguo();
      }
    },
    deletecaigoushenqing() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "确定删除",
          content: "<p>确认删除选中数据?</p>",
          onOk: () => {
            api.del("/xwcloud-zsbm/zsbm/JinXiaoCun/delcaigou",{ Id: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getteachSubjectPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
    shenhetonguo() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要审核的数据");
      } else {
        this.$Modal.confirm({
          title: "确定通过",
          content: "<p>确定审核通过该采购申请?</p>",
          onOk: () => {
            api.get("/xwcloud-zsbm/zsbm/JinXiaoCun/caigoushenhe",{ Id: this.editdataID, type: 1 }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getteachSubjectPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
    shenhebutonguo() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id;
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要审核的数据");
      } else {
        this.$Modal.confirm({
          title: "确定不通过",
          content: "<p>确定审核不通过该采购申请?</p>",
          onOk: () => {
            api.get("/xwcloud-zsbm/zsbm/JinXiaoCun/caigoushenhe",{ Id: this.editdataID, type: 2 }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getteachSubjectPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
    searchAll() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.shangpingType = "";
      this.shangpingName = "";
      this.staffname = "";
      this.getteachSubjectPages();
    },
  },

  mounted() {
    this.getteachSubjectPages();
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