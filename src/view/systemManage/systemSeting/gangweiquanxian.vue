<template>
  <div>
    <Row>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1 建议先设置好岗位，分配好岗位对应的权限后，再去添加员工账号；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>2.教师微信教务端权限、手机APP权限和后台权限是一致的；即电脑端、微信端、手机APP的权限均是同步的；</span>
        </Col>
      </Alert>
    </Row>

    <Row style="margin-top: 20px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="add()">添加</Button>
        <Button type="success" size="large" @click="edit()">修改</Button>
        <Button type="warning" size="large" @click="del()">删除</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          highlight-row
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
        show-sizer
        show-total
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
    <addandupdategangwei-form
      v-model="addShow"
      v-on:handleSearch="getAllDataPages"
      :editData="editData"
    ></addandupdategangwei-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import addbuxistyleForm from "../../../components/systemSetting/addbuxistyleForm";
import addandupdategangweiForm from "../../../components/systemSetting/addandupdategangweiForm.vue";
export default {
  components: {
    inputsearchForm,
    addbuxistyleForm,
    addandupdategangweiForm,
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
                      this.params.campusID = -1;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "岗位",
          key: "staffpostName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "岗位",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.staffpostName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "权限设置",
          key: "quanxian",
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
                      this.houtaiquanxian(params);
                    },
                  },
                },
                "权限管理"
              ),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      menuID: "521", //521 机构设置

      addShow: false,
      editData: "",
      checkIDs: [],
      IDsList: {
        ids: "",
        massage: "",
      },

      qiyeID: "",
      checkAll: false,

      allcampusData: [], //校区查询获取到的校区数据
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: -1,
        staffpostName: "",
      },
    };
  },
  methods: {
    ...mapActions(["getallcampusList", "getAllstaffPostPages", "DeleteStaffPost"]),
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
    getAllDataPages() {
      this.checkAll = false;
      this.getAllstaffPostPages(this.params).then((res) => {
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
      this.getAllDataPages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getAllDataPages();
    },
    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = -1;
      this.params.staffpostName = "";
      this.getAllDataPages();
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getAllDataPages();
    },
    /**
     * 获取校区数据
     */
    getAllCampusList() {
      this.getallcampusList({ menuID: 521 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    add() {
      this.editData = "";
      this.addShow = true;
    },
    edit() {
      this.addIDslist();
      if (this.checkIDs.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkIDs.length > 1) {
        this.$Message.error("只能选择一行");
      } else {
        this.addShow = true;
      }
    },
    del() {
      this.addIDslist();
      if (this.checkIDs.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除岗位信息？</p>",
          onOk: () => {
            let ids = "";
            this.checkIDs.forEach((item, index) => {
              ids += item.id + ",";
            });
            ids = ids.substring(0, ids.length - 1);
            console.log(ids);
            this.DeleteStaffPost({ ids: ids }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getAllDataPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
    houtaiquanxian(data) {
      this.$router.push({
        path: "/houtaiquanxian",
        query: { staffpostID: data.row.id },
      });
    },
    wxquanxian() {},
    appquanxian() {},
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getAllCampusList();
    this.getAllDataPages();
  },
};
</script>
