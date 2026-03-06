<template>
  <div>
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
    <addhuodong-form
      v-model="showhuodongList"
      :editdata="editdata"
      v-on:handleSearch="getteachSubjectPages"
    ></addhuodong-form>
  </div>
</template>
<script>
import inputsearchForm from "../../../components/common-buttons/inputsearchForm";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import addhuodongForm from "../../../components/zhaoshengbaoming/weixinyingxiao/addhuodongForm.vue";
import * as api from "@/api/api.js";
export default {
  components: {
    buttonsForm,
    inputsearchForm,
    addhuodongForm,
  },
  data() {
    return {
      columns: [
        {
          // type: "selection",
          title: "选择操作",
          align: "center",
          key: "checkBox",
          width: 150,
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
          title: "活动名称",
          key: "huodongName",
          align: "center",
        },
        {
          title: "启用/不启用",
          key: "isshow",
          align: "center",
          render: (h, params) => {
            if (params.row.isshow == 1) {
              return h("div", { style: { color: "green" } }, [
                h("span", "启用"),
              ]);
            } else {
              return h("div", { style: { color: "red" } }, [
                h("span", "不启用"),
              ]);
            }
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      isShow: 1,
      showhuodongList: false,
      menuID: "110",
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
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[
        index
      ].checkBox;
    },
    getteachSubjectPages() {
      api.get("/xwcloud-wsc/wsc/wsc/getWscHuodongValPage",{
        size: this.size,
        current: this.current,
        isShow: this.isShow,
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
      if (onclicks == "addinfo") {
        this.editdata = "";
        this.showhuodongList = true;
      } else if (onclicks == "edit") {
        this.updateteachSubject();
      } else if (onclicks == "del()") {
        this.deleteTeachsubject();
      }
    },
    updateteachSubject() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdata = JSON.stringify(items);
        }
      });
      if (this.editdata == "") {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.showhuodongList = true;
      }
    },
    deleteTeachsubject() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdataID += items.id + ",";
        }
      });
      this.editdataID = this.editdataID.substring(
        0,
        this.editdataID.length - 1
      );
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        let ids = this.editdataID;
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除该营销活动？</p>",
          onOk: () => {
            api.del("/xwcloud-wsc/wsc/wsc/deleteWscHuodongValByIDs/"+ids,{}).then((res) => {
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
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getteachSubjectPages();
  },
};
</script>
