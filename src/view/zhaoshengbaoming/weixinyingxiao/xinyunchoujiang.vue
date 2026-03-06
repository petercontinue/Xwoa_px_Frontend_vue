<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>温馨提示：</Col>
        <Col style="margin-top: 10px">
          <span>先【添加】抽奖活动、然后记得【设置活动奖品】、最后操作【上架】;</span>
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
        <Button type="info" ghost @click="jpInfo()">奖品</Button>
        <Button type="info" ghost @click="huojiang()">获奖</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
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

    <addChoujiang
      v-model="addShow"
      :editData="editData"
      :Addtype="showtype"
      v-on:handleSearch="getWhdChoujiangHuodong"
    ></addChoujiang>
    <jiangpinInfo v-model="JPShow" :ID="hdID"></jiangpinInfo>
    <huojiangInfo v-model="hjShow" :ID="hdID"></huojiangInfo>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import addChoujiang from "@/components/zhaoshengbaoming/weixinyingxiao/addChoujiang";
import jiangpinInfo from "@/components/zhaoshengbaoming/weixinyingxiao/jiangpinInfo";
import huojiangInfo from "@/components/zhaoshengbaoming/weixinyingxiao/huojiangInfo";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    addChoujiang,
    jiangpinInfo,
    huojiangInfo,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "116",

      params: {
        size: 10,
        current: 1,
        choujianghuodongname: "",
        starttime: "",
        endtime: "",
        addtime: "",
        adduser: "",
        isup: -1,
      },
      checkAll: false,
      UpStyle: [
        { id: 1, name: "已上架" },
        { id: 2, name: "未上架" },
      ],
      checkhd: [],
      allcheck: {
        id: "",
        isup: "",
      },
      addShow: false,
      showtype: "",
      editData: "",

      JPShow: false,
      hjShow: false,
      hdID: "",
      columns6: [
        {
          title: " ",
          align: "center",
          key: "checkBox",
          width: 60,
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {
                  "on-change": (e) => {},
                },
              }),
            ]);
          },
        },
        {
          title: "活动名称",
          key: "choujiangHuodongName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "活动名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.choujiangHuodongName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "抽奖次数限制",
          key: "choujiangstyle",
          align: "center",
          render: (h, params) => {
            if (params.row.choujiangstyle == 2) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  "一个人每天能抽多少次"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "green",
                    },
                  },
                  "一个人共能抽奖多少次"
                ),
              ]);
            }
          },
        },
        {
          title: "抽奖次数",
          key: "cishu",
          align: "center",
        },
        {
          title: "说明",
          key: "shuoming",
          align: "center",
        },
        {
          title: "活动奖品",
          key: "jiangpingName",
          align: "center",
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
                      this.hdID = params.row.id;
                      this.JPShow = true;
                    },
                  },
                },
                "活动奖品"
              ),
            ]);
          },
        },
        {
          title: "参加及获奖详情",
          key: "stuSex",
          align: "center",
          render: (h, params) => {
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
                      this.hdID = params.row.id;
                      this.hjShow = true;
                    },
                  },
                },
                "参加及获奖详情"
              ),
            ]);
          },
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.startTime != "") {
              datehave = toolbox.dateFtt(params.row.startTime, "yyyy-MM-dd");
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.endTime != "") {
              datehave = toolbox.dateFtt(params.row.endTime, "yyyy-MM-dd");
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "添加人",
          key: "staffName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "添加人",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.staffName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "添加时间",
          key: "addTime",
          align: "center",
          render: (h, params) => {
            let datehave = "";
            if (params.row.addTime != "") {
              datehave = toolbox.dateFtt(params.row.addTime, "yyyy-MM-dd hh:mm");
            } else {
              datehave = "-";
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "上架状态",
          key: "isUp",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "上架状态",
                  width: 100,
                  data: this.UpStyle,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.UpStyle.forEach((element) => {
                        if (element.id == value) {
                          this.params.isUp = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.isUp = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            if (params.row.isUp == 2) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  "未上架"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "skyblue",
                    },
                  },
                  "已上架"
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
      this.checkhd = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.checkhd = this.$refs.selection.data[index];
      }
    },

    jpInfo() {
      this.hdID = "1";
      this.JPShow = true;
    },
    huojiang() {
      this.hdID = "1";
      this.hjShow = true;
    },

    getWhdChoujiangHuodong() {
      this.checkAll = false;
      this.checkhd = [];
      api.get("/xwcloud-wsc/wsc/whdChoujiang/getWhdChoujiangHuodongPage",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });

          console.log(this.data);
        }
      });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "addinfo") {
        this.Onaddinfo();
      } else if (onclicks == "edit") {
        this.Onedit();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else if (onclicks == "shangjia()") {
        this.Onshangjia(1);
      } else if (onclicks == "xiajia()") {
        this.Onxiajia();
      } else if (onclicks == "jiangpinshezhi()") {
        this.Onjiangpinshezhi();
      } else if (onclicks == "jiangpinliushui()") {
        this.Onjiangpinliushui();
      }
    },

    /**添加 */
    Onaddinfo() {
      this.showtype = "1";
      this.addShow = true;
    },
    /**修改 */
    Onedit() {
      this.editData = "";
      if (this.checkhd.length == 0) {
        this.$Message.error("请选择要清除的数据");
      } else {
        this.showtype = "2";
        this.editData = JSON.stringify(this.checkhd);
        console.log(this.editData);
        this.addShow = true;
      }
    },
    /**删除 */
    Ondel() {
      if (this.checkhd.length == 0) {
        this.$Message.error("请选择要清除的数据");
      } else {
        this.$Modal.confirm({
          title: "删除抽奖",
          content: "<p>确定要删除抽奖吗?</p>",
          onOk: () => {
            api.post("/xwcloud-wsc/wsc/whdChoujiang/deleteWhdChoujiangHuodongByID",{
              id: this.allcheck.id,
            }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getWhdChoujiangHuodong();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
    /**上架 */
    Onshangjia(type) {
      this.allcheck.id = this.checkhd.id;
      this.allcheck.isup = type;
      if (this.checkhd.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        api.post("/xwcloud-wsc/wsc/whdChoujiang/updateUpStyle",this.allcheck).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.getWhdChoujiangHuodong();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
    /**下架 */
    Onxiajia() {
      this.Onshangjia(2);
    },
    /**奖品设置 */
    Onjiangpinshezhi() {
      console.log(this.checkhd);
      if (this.checkhd.length == 0) {
        this.$Message.error("请选择数据");
      } else {
        this.$router.push({
          path: "/jiangpinSetting",
          query: { ID: this.checkhd.id },
        });
      }
    },
    /**奖品流水 */
    Onjiangpinliushui() {
      this.$router.push({
        path: "/huojiangliushui",
        query: { ID: this.checkhd.id },
      });
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.choujianghuodongname = "";
      this.params.starttime = "";
      this.params.endtime = "";
      this.params.addtime = "";
      this.params.adduser = "";
      this.params.isup = -1;
      this.getWhdChoujiangHuodong();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getWhdChoujiangHuodong();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getWhdChoujiangHuodong();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getWhdChoujiangHuodong();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getWhdChoujiangHuodong();
  },
};
</script>
