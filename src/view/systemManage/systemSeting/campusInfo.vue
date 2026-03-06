<template>
  <div>
    <div>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1.校区启用或不启用，需联系客服进行处理；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span
            >2.系统支持各个校区嫁接不同的微信公众号和商户平台（也可以是同一个），具体的嫁接操作请联系客服；</span
          >
        </Col>
      </Alert>
    </div>

    <!-- <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row> -->

    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="success" size="large" @click="edit()">修改</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          highlight-row
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
    <gongzhonghao-form
      v-model="gongzhonghaoShow"
      v-on:handleSearch="getteachSubjectPages"
      :campusID="editCampusID"
    ></gongzhonghao-form>
    <shangchengshezhi-form
      v-model="shanghuhaoShow"
      v-on:handleSearch="getteachSubjectPages"
      :campusID="editCampusID"
    ></shangchengshezhi-form>
    <updatecampusname-form
      v-model="updatecampusnameShow"
      v-on:handleSearch="getteachSubjectPages"
      :campusIDprops="editCampusID"
      :campusNameprops="campusNameA"
    ></updatecampusname-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import gongzhonghaoForm from "../../../components/systemSetting/gongzhonghaoForm";
import shangchengshezhiForm from "../../../components/systemSetting/shangchengshezhiForm";
import updatecampusnameForm from "../../../components/systemSetting/updatecampusnameForm";
export default {
  components: {
    inputsearchForm,
    gongzhonghaoForm,
    shangchengshezhiForm,
    updatecampusnameForm,
  },
  data() {
    return {
      columns: [
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
          title: "校区名称",
          key: "campusName",
          align: "center",
          // renderHeader: (h, params) => {
          //   return h("div", [
          //     h(inputsearchForm, {
          //       props: {
          //         placement: "bottom-start",
          //         showArrow: false,
          //         content: "校区名称",
          //       },
          //       on: {
          //         "on-clickSearch": (value) => {
          //           this.campusName = value;
          //           this.getteachSubjectPages();
          //         },
          //       },
          //     }),
          //   ]);
          // },
        },
        {
          title: "状态",
          key: "isOpen",
          align: "center",
          render: (h, params) => {
            if (params.row.isOpen == 1) {
              return h("div", [h("span", "启用")]);
            } else {
              return h("div", [h("span", "未启用")]);
            }
          },
        },
        {
          title: "校区地址",
          key: "campusAddress",
          align: "center",
        },
        {
          title: "购买时间",
          key: "buyDateTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.buyDateTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.buyDateTime, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "到期时间",
          key: "nextPayTime",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.nextPayTime == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.nextPayTime, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "微信公众号配置",
          key: "shuoming",
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
                      this.clickpeizhi(params, 1);
                    },
                  },
                },
                "设置"
              ),
            ]);
          },
        },
        {
          title: "商城设置",
          key: "shuoming",
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
                      this.clickpeizhi(params, 2);
                    },
                  },
                },
                "设置"
              ),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      campusName: "",
      gongzhonghaoShow: false,
      shanghuhaoShow: false,
      updatecampusnameShow: false,
      editdataID: "",
      campusNameA: "",
      editCampusID: "",

      checkIDs: [],
      IDsList: {
        ids: "",
        massage: "",
      },
      checkAll: false,
    };
  },
  methods: {
    ...mapActions(["GetAllCampusInfoPages", "deletebuxistyle"]),
    //鼠标单击一行选中
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
        ._checked;
    },
    /**选中的学员添加进列表，方便进行处理 */
    addIDslist() {
      this.checkIDs = [];
      // console.log("=====2:");
      // console.log(this.data);
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.editData = JSON.stringify(items);
          this.checkIDs.push({
            id: items.id,
          });
        }
      });
      this.IDsList.ids = JSON.stringify(this.checkIDs);
    },
    getteachSubjectPages() {
      this.checkAll = false;
      let size = this.size;
      let current = this.current;
      let campusName = this.campusName;
      this.GetAllCampusInfoPages({
        size,
        current,
        campusName,
      }).then((res) => {
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
    edit() {
      // this.editCampusID = "";
      // this.data.forEach((items) => {
      //   if (items.checkBox) {
      //     this.editCampusID = items.id;
      //     this.campusNameA = items.campusName;
      //   }
      // });
      // if (this.editCampusID == "") {
      //   this.$Message.error("请选择要修改的数据");
      // } else {
      //   this.updatecampusnameShow = true;
      // }
      this.addIDslist();
      if (this.checkIDs.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkIDs.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.data.forEach((item) => {
          if (item._checked) {
            // console.log("select item:");
            // console.log(item);
            this.editCampusID = item.id;
            this.campusNameA = item.campusName;
          }
        });
        this.updatecampusnameShow = true;
      }
    },
    clickpeizhi(param, type) {
      if (type == 1) {
        this.gongzhonghaoShow = true;
        this.editCampusID = param.row.id;
      } else {
        this.shanghuhaoShow = true;
        this.editCampusID = param.row.id;
      }
    },
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getteachSubjectPages();
  },
};
</script>
