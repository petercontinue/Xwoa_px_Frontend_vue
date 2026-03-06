<template>
  <Modal
    v-model="show"
    title="宿舍管理"
    @on-ok="ok"
    :mask-closable="false"
    width="50"
    @on-cancel="closeModal(false)"
  >
    <Row>
      <Col span="12">
        <Button type="success" @click="OnaddStay()">添加宿舍</Button>
        <Button type="info" @click="OnupdateStay()">修改宿舍</Button>
        <Button type="error" @click="OndelStay()">删除宿舍</Button>
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
    <editstayroom
      v-model="editShow"
      :ID="editID"
      v-on:handleSearch="getRmManageListPage"
    ></editstayroom>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import editstayroom from "@/components/jiaowuManage/stuManage/editstayroom";

export default {
  name: "DormitoryManager",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    inputsearchForm,
    selectsearchForm,
    editstayroom,
  },
  data() {
    return {
      show: this.value,
      data: [], // 接口数据接收
      allcampusData: [], //校区查询获取到的校区数据
      total: 0,
      params: {
        current: 1,
        size: 10,
        RoomNumber: "",
        campusID: "",
      },
      stuIDList: {
        ids: "",
      },
      saveL: {
        campusID: "",
        RoomNumber: "",
        renshu: 0,
      },
      editShow: false,
      editID: "",
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
                    this.checkAll = !this.checkAll;
                    this.data.forEach((item) => {
                      item._checked = this.checkAll; //全选|全取消
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
          title: "宿舍号",
          key: "roomName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "宿舍号",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.RoomNumber = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "人数",
          key: "Num",
          align: "center",
          render: (h, params) => {
            let state = "";
            state = params.row.nowNum + "/" + params.row.num;
            return h("div", [h("span", state)]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      "getRmManagePage",
      "getallcampusList",
      "addStay",
      "delStay",
    ]),
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index]._checked =
        !this.$refs.selection.data[index]._checked;
    },
    TableSearch() {
      this.getRmManageListPage();
    },
    getRmManageListPage() {
      this.getRmManagePage(this.params).then((res) => {
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
      this.getallcampusList({ menuID: 217 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    ok() {
      this.$emit("input", val);
    },
    closeModal(val) {
      this.$emit("handleSearch");
      this.$emit("input", val);
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getRmManageListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getRmManageListPage();
    },

    addstulist() {
      this.checkStuID = [];
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.checkStuID.push({
            id: items.id,
          });
        }
      });
      this.stuIDList.ids = JSON.stringify(this.checkStuID);
    },

    /**添加 */
    OnaddStay() {
      this.editID = "0";
      this.editShow = true;
    },
    OnupdateStay() {
      this.addstulist();
      if (this.checkStuID.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else if (this.checkStuID.length > 1) {
        this.$Message.error("请选择一行");
      } else {
        console.log(this.checkStuID);
        this.editID = this.checkStuID[0].id;
        this.editShow = true;
      }
    },
    /**删除 */
    OndelStay() {
      this.addstulist();
      setTimeout(() => {
        //确保执行过addstulist
        if (this.checkStuID.length == 0) {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.$Modal.confirm({
            title: "删除数据",
            content: "<p>确定要删除数据吗?</p>",
            closable: true,
            onOk: () => {
              this.delStay(this.stuIDList).then((res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success(res.msg);
                  this.getRmManageListPage();
                  this.data.forEach((items) => {
                    //取消所有对象的勾选，_checked设置为false
                    this.$set(items, "_checked", false);
                  });
                } else {
                  this.$Notice.error({
                    top: 50,
                    desc: res.msg,
                    duration: 3,
                  });
                }
              });
            },
          });
        }
      }, 200);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.getRmManageListPage();
        this.getAllCampusList();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
