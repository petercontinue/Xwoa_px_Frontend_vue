<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >1
            在【报名交费-新签报名】操作了新签以后，在本页面就会自动产生一个学员/家长登录【微信学员端】的账号，报名时填的联系手机就是这里的登录账号；</span
          >
        </Col>
        <Col style="margin-top: 10px">
          <span>2 默认登录密码是：123456；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >3
            如果密码修改后又忘记了，可以在这里操作密码重置，密码又会回到最初的密码123456；</span
          >
        </Col>
      </Alert>
    </Row>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchall()">全部</Button>
      </Col>
    </Row>
    <!-- 获取按钮 -->
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
        prev-text="上一页"
        next-text="下一页"
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <editwechat-phone
      v-model="showedit"
      :stuID="selectID"
      v-on:handleSearch="getallstuweichatPage"
    ></editwechat-phone>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import datesearchForm from "../../../components/common-buttons/datesearchForm";
import editwechatPhone from "../../../components/jiaowuManage/editwechatPhone.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    editwechatPhone,
    // 按钮控件
  },
  data() {
    return {
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
                      this.params.campusID = value;
                      this.search();
                    } else {
                      this.params.campusID = "";
                      this.search();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "学员学号",
          key: "zidingyiStuID",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学员学号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.xuehao = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            let state = "";
            if (params.row.zidingyiStuID == null) {
              state = params.row.newstuID;
            } else {
              state = params.row.zidingyiStuID;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "学员姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "学员姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.stuName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班主任",
          key: "banzhurenName",
          align: "center",
          render: (h, params) => {
            if (params.row.banzhurenName) {
              return h("div", [h("span", params.row.banzhurenName)]);
            } else {
              return h("div", [h("span", "-")]);
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
                    this.params.banzhurenName = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "手机号（微信登录账号）",
          key: "parentTel",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "手机号（微信登录账号）",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.tel = value;
                    this.search();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "绑定微信昵称",
          key: "nickName",
          align: "center",
          render: (h, params) => {
            if (params.row.nickName) {
              return h("div", [h("span", params.row.nickName)]);
            } else {
              return h("div", [h("span", { style: { color: "red" } }, "未绑定")]);
            }
          },
        },
        {
          title: "微信商城关联",
          key: "wscName",
          align: "center",
          render: (h, params) => {
            if (params.row.wscName) {
              return h("div", [h("span", params.row.wscName)]);
            } else {
              return h("div", [h("span", { style: { color: "red" } }, "未关联")]);
            }
          },
        },
        {
          title: "其他电话",
          key: "stuTel",
          align: "center",
          render: (h, params) => {
            if (params.row.stuTel) {
              return h("div", [h("span", params.row.stuTel)]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
        {
          title: "状态",
          key: "activity",
          align: "center",
          render: (h, params) => {
            if (params.row.activity == 1) {
              return h("div", [h("span", { style: { color: "red" } }, "冻结")]);
            } else {
              return h("div", [h("span", { style: { color: "green" } }, "正常")]);
            }
          },
        },
      ],
      data: [], // 接口数据接收
      menuID: "270",
      total: 0,
      // 搜索参数
      params: {
        size: 10,
        current: 1,
        campusID: "",
        xuehao: "",
        stuName: "",
        banzhurenName: "",
        tel: "",
      },
      selectID: "",
      showedit: false,
      allcampusData: [],
    };
  },
  methods: {
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    getallstuweichatPage() {
      api
        .get("xwcloud-homeschool/homeschool/pxstuweixin/GetStuweixinPages", this.params)
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
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getallstuweichatPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getallstuweichatPage();
    },
    clickShijian(onclicks) {
      // 按钮事件
      console.log(onclicks);
      switch (onclicks) {
        case "edit":
          let selectlist = [];
          console.log(this.data);
          this.data.forEach((items) => {
            if (items._checked) {
              selectlist.push(items);
            }
          });
          if (selectlist.length == 0) {
            this.$Message.error("请选择要修改的数据");
          } else if (selectlist.length > 1) {
            this.$Message.error("只能选择一行");
          } else {
            console.log(this.selectlist);
            this.selectID = selectlist[0].newstuID;
            this.showedit = true;
          }

          break;
        case "ksdongjie()":
          this.selectID = "";
          this.data.forEach((items) => {
            if (items._checked) {
              this.selectID = items.newstuID;
            }
          });
          if (this.selectID == "") {
            this.$Message.error("请选择要操作的数据");
          } else {
            this.$Modal.confirm({
              title: "冻结账号",
              content: "<p>确定冻结当前微信账号？</p>",
              onOk: () => {
                api
                  .get("xwcloud-homeschool/homeschool/pxstuweixin/freeze", {
                    stuID: this.selectID,
                  })
                  .then((res) => {
                    if (res.code == "Y" && res.success == true) {
                      this.$Message.success("冻结账号成功！");
                      this.getallstuweichatPage();
                    } else {
                      this.$Message.error(res.msg);
                    }
                  });
              },
            });
          }
          break;
        case "ksjiedong()":
          this.selectID = "";
          this.data.forEach((items) => {
            if (items._checked) {
              this.selectID = items.newstuID;
            }
          });
          if (this.selectID == "") {
            this.$Message.error("请选择要操作的数据");
          } else {
            this.$Modal.confirm({
              title: "解冻学员微信账号",
              content: "<p>确定解冻当前学员微信账号？</p>",
              onOk: () => {
                api
                  .get("xwcloud-homeschool/homeschool/pxstuweixin/thaw", {
                    stuID: this.selectID,
                  })
                  .then((res) => {
                    if (res.code == "Y" && res.success == true) {
                      this.$Message.success("微信账号解冻成功");
                      this.getallstuweichatPage();
                    } else {
                      this.$Message.error(res.msg);
                    }
                  });
              },
            });
          }
          break;
        case "chongzhi()":
          this.selectID = "";
          this.data.forEach((items) => {
            if (items._checked) {
              this.selectID = items.newstuID;
            }
          });
          if (this.selectID == "") {
            this.$Message.error("请选择要操作的数据");
          } else {
            this.$Modal.confirm({
              title: "重置密码",
              content: "<p>确定将该学员微信端账号密码重置为123456？</p>",
              onOk: () => {
                api
                  .get("xwcloud-homeschool/homeschool/pxstuweixin/resetPassword", {
                    stuID: this.selectID,
                  })
                  .then((res) => {
                    if (res.code == "Y" && res.success == true) {
                      this.$Message.success("重置密码成功");
                      this.getallstuweichatPage();
                    } else {
                      this.$Message.error(res.msg);
                    }
                  });
              },
            });
          }
          break;
        case "jiechuWeixinBind()":
          this.selectID = "";
          this.data.forEach((items) => {
            if (items._checked) {
              this.selectID = items.newstuID;
            }
          });
          if (this.selectID == "") {
            this.$Message.error("请选择要操作的数据");
          } else {
            this.$Modal.confirm({
              title: "解绑微信账号",
              content: "<p>确定解除该学员的微信绑定信息？</p>",
              onOk: () => {
                api
                  .get("xwcloud-homeschool/homeschool/pxstuweixin/unbindWeChat", {
                    stuID: this.selectID,
                  })
                  .then((res) => {
                    if (res.code == "Y" && res.success == true) {
                      this.$Message.success("解除微信绑定成功");
                      this.getallstuweichatPage();
                    } else {
                      this.$Message.error(res.msg);
                    }
                  });
              },
            });
          }
          break;
        case "wscContact()":
          break;
        case "zhuan()":
          break;
      }
    },
    search() {
      this.getallstuweichatPage();
    },
    searchall() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.xuehao = "";
      this.params.stuName = "";
      this.params.banzhurenName = "";
      this.params.tel = "";
      this.getallstuweichatPage();
    },
  },
  mounted: function () {
    // 初始化页面
    this.getallstuweichatPage();
    api
      .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: this.menuID })
      .then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
  },
};
</script>
