<template>
  <div>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addyouhuizhengce">添加</Button>
        <Button type="success" size="large" @click="edityouhuizhengce"
          >修改</Button
        >
        <Button type="warning" size="large" @click="Deletechongzhihuodong"
          >删除</Button
        >
      </Col>
    </Row>
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
    <addchongzhiyhzc-form
      v-model="showadd"
      :editData="editdata"
      v-on:handleSearch="getchongzhiyouhuizhengcePages"
    ></addchongzhiyhzc-form>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import addchongzhiyhzcForm from "../../../components/zhaoshengbaoming/baomingjiaofei/addchongzhiyhzcForm.vue";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    addchongzhiyhzcForm,
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
          title: "充值金额",
          key: "zongmoney",
          align: "center",
        },
        {
          title: "(达到充值金额即赠送)赠送金额",
          key: "huodongmoney",
          align: "center",
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            if (params.row.type == 1) {
              return h("div", [h("span", "满赠")]);
            } else {
              return h("div", [h("span", "未知")]);
            }
          },
        },
        {
          title: "优惠活动开始时间",
          key: "sdate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.sdate, "yyyy-MM-dd")),
            ]);
          },
        },
        {
          title: "优惠活动结束时间",
          key: "edate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", toolbox.dateFtt(params.row.edate, "yyyy-MM-dd")),
            ]);
          },
        },
      ],
      menuID: "148",
      data: [],
      total: 0,
      size: 10,
      current: 1,
      showadd: false,
      editdataID: "",
      editdata: "",
      allcampusData: [],
      stugradeData: [],
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

    getchongzhiyouhuizhengcePages() {
      api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetczyouhuizhengcePages",{
        size: this.size,
        current: this.current,
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
      this.getchongzhiyouhuizhengcePages();
    },
    changePage(current) {
      this.current = current;
      this.getchongzhiyouhuizhengcePages();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getchongzhiyouhuizhengcePages();
    },
    onSearch(search) {
      window.console.log(search);
    },
    addyouhuizhengce() {
      this.editdata = "";
      this.showadd = true;
    },
    Deletechongzhihuodong() {
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
          content: "<p>确定删除该充值优惠活动</p>",
          onOk: () => {
            api.del("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/DeleteCzhuodong",{ Id: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.getchongzhiyouhuizhengcePages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
          onCancel: () => {},
        });
      }
    },
    edityouhuizhengce() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editdata = JSON.stringify(items);
        }
      });
      if (this.editdata == "") {
        this.$Message.error("请选择要编辑的数据");
      } else {
        this.showadd = true;
      }
    },
  },

  mounted() {
    this.getchongzhiyouhuizhengcePages();
    api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{}).then((res) => {
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