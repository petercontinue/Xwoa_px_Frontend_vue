<template>
  <div>
    <Row>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col
          >温馨提示：这里设置的优惠政策是在新签和续费的时候用到的，是对新签和续费的总价进行优惠的政策设置；</Col
        >
        <!-- <Col style="margin-top: 10px">
          <span>1 这里设置的优惠政策是在新签和续费的时候用到的，是对新签和续费的总价进行优惠的政策设置；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2 商品返佣比例不设置的话，就是使用通用的返佣比例；</span>
        </Col> -->
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search(1)">全部</Button>
        <Button type="success" @click="search(2)" ghost>进行中的优惠政策</Button>
        <Button type="error" @click="search(3)" ghost>结束的优惠政策</Button>
      </Col>
    </Row>

    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getYouhuizhengcePages"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          @on-row-click="onClickRow"
          :columns="columns"
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
    <addyouhuizhengce-form
      v-model="addShow"
      v-on:handleSearch="getYouhuizhengcePages"
    ></addyouhuizhengce-form>
    <updateyouhuizc-form
      v-model="updateShow"
      v-on:handleSearch="getYouhuizhengcePages"
      :editdata="editdata"
    ></updateyouhuizc-form>
  </div>
</template>
<script>
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import addyouhuizhengceForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addyouhuizhengceForm";
import updateyouhuizcForm from "../../../components/zhaoshengbaoming/baomingjiaofei/updateyouhuizcForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    addyouhuizhengceForm,
    updateyouhuizcForm,
    selectsearchForm,
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
          title: "优惠类型",
          key: "youhuiType",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "优惠类型",
                  data: this.allyhType,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.allyhType.forEach((element) => {
                        if (element.id == value) {
                          this.yhType = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.yhType = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            if (params.row.youhuiType == 1) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "blue",
                    },
                  },
                  "打折"
                ),
              ]);
            } else if (params.row.youhuiType == 2) {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                    },
                  },
                  "减钱"
                ),
              ]);
            }
          },
        },
        {
          title: "达到多少金额才享受优惠",
          key: "xianzhijine",
          align: "center",
        },
        {
          title: "打几折/减多少钱(元)",
          key: "youhui",
          align: "center",
        },
        {
          title: "优惠活动-开始日期",
          key: "startDateTime",
          align: "center",
          render: (h, params) => {
            return h("label", params.row.startDateTime.substring(0, 10));
          },
        },
        {
          title: "优惠活动-结束日期",
          key: "endDatetime",
          align: "center",
          render: (h, params) => {
            return h("label", params.row.endDatetime.substring(0, 10));
          },
        },

        {
          title: "优惠活动适用于哪些校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "优惠活动适用于哪些年级",
          key: "stugradeNams",
          align: "center",
          // render: (h, params) => {
          //   let beizhu = "";
          //   if (params.row.stuGradeIDs == "-1") {
          //     beizhu = "不限年级";
          //     return h("div", [h("span", beizhu)]);
          //   } else {
          //     return h("div", [h("span", params.row.stugradeNams)]);
          //   }
          // },
        },
        {
          title: "活动可用次数",
          key: "useTimes",
          align: "center",
          render: (h, params) => {
            let beizhu = "";
            if (params.row.useTimes == "-1") {
              beizhu = "不限次数！";
              return h("div", [h("span", beizhu)]);
            } else {
              return h("div", [h("span", params.row.useTimes + "次")]);
            }
          },
        },
        {
          title: "添加时间",
          key: "addTime",
          align: "center",
        },
      ],
      menuID: "149",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      type: -1,
      yhType: -1,
      allyhType: [
        { id: 1, name: "打折" },
        { id: 2, name: "减钱" },
      ],
      addShow: false,
      addoneShow: false,
      updateShow: false,
      editdataID: "",
      editdata: "",
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

    search(type) {
      if (type == 1) {
        this.type = -1;
        this.current = 1;
        this.size = 10;
        this.yhType = -1;
      } else if (type == 2) {
        this.type = 1;
      } else if (type == 3) {
        this.type = 2;
      }
      this.getYouhuizhengcePages();
    },

    getYouhuizhengcePages() {
      let size = this.size;
      let current = this.current;
      let type = this.type;
      let yhType = this.yhType;
      api
        .get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllYouhuizhengcePages", {
          size,
          current,
          type,
          yhType,
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
    changePage(current) {
      this.current = current;
      this.getYouhuizhengcePages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getYouhuizhengcePages();
    },
    onSearch(search) {
      window.console.log(search);
    },
    deleteyouhuizhengce() {
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
          content: "<p>确定删除该优惠政策？</p>",
          onOk: () => {
            api
              .del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteYouHuizhengce", {
                Id: this.editdataID,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getYouhuizhengcePages();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {},
        });
      }
    },
    clickShijian(onclicks) {
      console.log(onclicks);
      if (onclicks == "addinfo") {
        this.addShow = true;
      } else if (onclicks == "del()") {
        this.deleteyouhuizhengce();
      } else if (onclicks == "edit") {
        this.editdata = "";
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdata = JSON.stringify(items);
          }
        });
        if (this.editdata == "") {
          this.$Message.error("请选择要修改的数据");
        } else this.updateShow = true;
      }
    },

    TableSearch() {
      this.getYouhuizhengcePages();
    },
  },

  mounted() {
    //this.kechengID = this.$route.query.id;
    this.getYouhuizhengcePages();
  },
};
</script>
