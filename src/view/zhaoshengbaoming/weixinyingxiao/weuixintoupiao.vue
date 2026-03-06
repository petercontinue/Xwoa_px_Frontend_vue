<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span
            >操作步骤：首先【主题设置】，可以设置多种主题。然后【添加】创建投票活动——>【设置参加投票学员】——>活动【上架】，一个投票活动即创建完成了！</span
          >
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
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
          show-sizer
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
    <addtoupiao-form
      v-model="showAdd"
      :editData="editData"
      v-on:handleSearch="getteachSubjectPages"
    ></addtoupiao-form>
    <toupiaomingxi-form v-model="showxiangqing" :editdata="editData"></toupiaomingxi-form>
    <depiaoban-form v-model="showpaihang" :editdata="editData"></depiaoban-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import addtoupiaoForm from "../../../components/zhaoshengbaoming/weixinyingxiao/addtoupiaoForm.vue";
import toupiaomingxiForm from "../../../components/zhaoshengbaoming/weixinyingxiao/toupiaomingxiForm.vue";
import depiaobanForm from "../../../components/zhaoshengbaoming/weixinyingxiao/depiaobanForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    datesearchForm,
    addtoupiaoForm,
    toupiaomingxiForm,
    depiaobanForm,
  },
  data() {
    return {
      columns: [
        {
          // type: "selection",
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width: 100,
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
          title: "投票活动名称",
          key: "toupiaoHuodongName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "投票活动名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.huodongName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "活动简介",
          key: "jigouJianjie",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "活动简介",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.userName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "活动主图",
          key: "logo",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  style: "width: 40px;height: 40px;",
                },
              },
              [
                h("img", {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  attrs: {
                    src: params.row.logo,
                    style: "width: 40px;height: 40px;border-radius: 2px;",
                  },
                  style: {},
                }),
              ]
            );
          },
        },
        {
          title: "投票方式",
          key: "toupiaostyle",
          align: "center",
          render: (h, params) => {
            if (params.row.toupiaostyle == 1) {
              return h("div", [h("span", "一人只能投一票 ")]);
            } else {
              return h("div", [h("span", "一人一天一票 ")]);
            }
          },
        },
        {
          title: "活动开始时间",
          key: "startTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.startTime, "yyyy-MM-dd")),
            ]);
          },
        },
        {
          title: "活动结束时间",
          key: "endTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.endTime, "yyyy-MM-dd")),
            ]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(datesearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "活动结束时间",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.startDate = value[0];
                    this.endDate = value[1];
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "投票明细",
          key: "beizhu",
          align: "center",
          render: (h, params) => {
            if (params.row.toupiaoCount > 0) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                    },
                    on: {
                      click: () => {
                        this.toupiaomingxi(params);
                      },
                    },
                  },
                  "查看详情"
                ),
              ]);
            } else {
              return h("div", [h("span", "0")]);
            }
          },
        },
        {
          title: "得票榜",
          key: "beizhu",
          align: "center",
          render: (h, params) => {
            if (params.row.toupiaoCount > 0) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                    },
                    on: {
                      click: () => {
                        this.toupiaopaihang(params);
                      },
                    },
                  },
                  "查看详情"
                ),
              ]);
            } else {
              return h("div", [h("span", "0")]);
            }
          },
        },
        {
          title: "活动上架状态",
          key: "isup",
          align: "center",
          render: (h, params) => {
            if (params.row.isUp == 0) {
              return h("div", { style: { color: "red" } }, [h("span", "未上架")]);
            } else {
              return h("div", { style: { color: "green" } }, [h("span", "已上架")]);
            }
          },
        },
        {
          title: "活动创建时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm:ss")),
            ]);
          },
        },
      ],
      menuID: "113",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      huodongName: "",
      toupiaoStyle: 0,
      isUp: 0,
      staffName: "",
      showAdd: false,
      editdataID: "",
      editData: "",
      showxiangqing: false,
      showpaihang: false,
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
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
    },
    search() {
      this.size = 10;
      this.current = 1;
      this.huodongName = "";
      this.toupiaoStyle = 0;
      this.isUp = 0;
      this.staffName = "";
      this.showAdd = false;
      this.editdataID = "";
      this.editData = "";
      this.showxiangqing = false;
      this.showpaihang = false;
      this.getteachSubjectPages();
    },
    getteachSubjectPages() {
      api
        .get("/xwcloud-wsc/wsc/whdToupiao/getWhdToupiaoHuodongPage", {
          size: this.size,
          current: this.current,
          huodongName: this.huodongName,
          toupiaoStyle: this.toupiaoStyle,
          isUp: this.isUp,
          staffName: this.staffName,
          type: 0,
        })
        .then((res) => {
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
    onSearch(search) {},
    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "addinfo") {
        this.showAdd = true;
      } else if (onclicks == "del()") {
        this.deletetoupiaoInfo();
      } else if (onclicks == "edit") {
        this.editData = "";
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editData = JSON.stringify(items);
          }
        });
        if (this.editData == "") {
          this.$Message.error("请选择要编辑的数据");
        } else {
          this.showAdd = true;
        }
      } else if (onclicks == "addCS()") {
        this.editdataID = "";
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdataID = items.id;
          }
        });
        if (this.editdataID == "") {
          this.$Message.error("请选择活动");
        } else {
          this.$router.push({
            path: "/toupiaostuinfo",
            query: { huodongID: this.editdataID },
          });
        }
      } else if (onclicks == "shangjia()") {
        this.updatehuodongState(1);
      } else if (onclicks == "xiajia()") {
        this.updatehuodongState(0);
      } else if (onclicks == "setfenxiang()") {
        this.Onsetfenxiang();
      }
    },

    Onsetfenxiang() {
      this.$router.push({
        path: "/zhutiSetting",
        query: {},
      });
    },

    deletetoupiaoInfo() {
      this.editdataID = "";
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
          content: "<p>确定删除该投票活动？</p>",
          onOk: () => {
            api
              .del("/xwcloud-wsc/wsc/whdToupiao/deleteWhdToupiaoHuodongByIDs", {
                id: this.editdataID,
              })
              .then((result) => {
                if (result.code == "Y" && result.success == true) {
                  this.$Message.success("投票信息删除成功");
                } else {
                  this.$Message.error(result.msg);
                }
                this.getteachSubjectPages();
              });
          },
          onCancel: () => {},
        });
      }
    },

    updatehuodongState(type) {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID = items.id + "";
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要操作的投票活动");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content:
            type == 1 ? "<p>确定上架该投票活动？</p>" : "<p>确定下架该投票活动？</p>",
          onOk: () => {
            api
              .get("/xwcloud-wsc/wsc/whdToupiao/UpdateToupiaohuodongState", {
                id: this.editdataID,
                state: type,
              })
              .then((result) => {
                if (result.code == "Y" && result.success == true) {
                  this.$Message.success("投票信息操作成功");
                } else {
                  this.$Message.error(result.msg);
                }
                this.getteachSubjectPages();
              });
          },
          onCancel: () => {},
        });
      }
    },
    toupiaomingxi(data) {
      this.editData = JSON.stringify(data.row);
      console.log(this.editData);
      this.showxiangqing = true;
    },
    toupiaopaihang(data) {
      this.editData = JSON.stringify(data.row);
      console.log(this.editData);
      this.showpaihang = true;
    },
  },

  mounted() {
    this.getteachSubjectPages();
  },
};
</script>
