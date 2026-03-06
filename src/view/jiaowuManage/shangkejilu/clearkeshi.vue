<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            只有在系统设置-教务设置 里面设置了
            <font style="color: red">“到期后自动清零学员剩余课时”</font
            >,才会在学员课程到期后自动清零学员剩余课时;
          </span>
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

    <clearkeshi-form v-model="deriveShow"></clearkeshi-form>
  </div>
</template>

<script>
/**
 * 引入
 */
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import clearkeshiForm from "@/components/jiaowuManage/shangkejilu/clearkeshiForm";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    clearkeshiForm,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "254",
      deriveShow: false,
      allcampusData: [], //校区查询获取到的校区数据
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        stuName: "",
        kcName: "",
      },
      delids: "",
      checkAll: false,
      /**
       * table绑定数据
       */
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
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程",
          key: "buxiName",
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
                    this.params.kcName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "清空课时",
          key: "keshiNum",
          align: "center",
        },
        {
          title: "清空学费",
          key: "xuefei",
          align: "center",
        },
        {
          title: "说明",
          key: "beizhu",
          align: "center",
        },
        {
          title: "清空时间",
          key: "addDate",
          align: "center",
          render: (h, params) => {
            let datehave = toolbox.dateFtt(params.row.addDate, "yyyy-MM-dd");
            return h("div", [h("span", datehave)]);
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

    /**
     * 获取页面数据
     */
    getClearListPage() {
      api.get("xwcloud-pkxk/kehao/ClassRecord/getClearPage", this.params).then((res) => {
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
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.derive();
      } else if (onclicks == "del()") {
        this.Ondel();
      } else {
        this.$Message.info("该页面不应该存在该功能");
      }
    },

    Ondel() {
      this.delids = "";
      this.data.forEach((item) => {
        if (item._checked) {
          this.delids += item.id + ",";
        }
      });

      if (this.delids == "") {
        this.$Message.error("请选择要删除的数据！");
      } else {
        this.$Modal.confirm({
          content:
            "<p>还原前，请确保已关闭课时到期自动清零，否则恢复的课时已到期，后续任然会自动清零！</p>",
          onOk: () => {
            api
              .del("xwcloud-pkxk/kehao/ClassRecord/deletekeshiClear", {
                ids: this.delids,
              })
              .then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("还原成功");
                  this.getClearListPage();
                } else {
                  this.$Message.error(res.msg);
                }
              });
          },
          onCancel: () => {},
        });
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
      this.params.kcName = "";
      this.getClearListPage();
    },
    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getClearListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getClearListPage();
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getClearListPage();
    },

    /***按钮事件 */
    derive() {
      this.deriveShow = true;
    },
  },

  /**
   *  初始化页面
   */
  mounted: function () {
    this.getClearListPage();
    this.getAllCampusList();
  },
};
</script>
