<template>
  <div>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addteachSubject">添加</Button>
        <Button type="success" size="large" @click="updateteachSubject">修改</Button>
        <Button type="warning" size="large" @click="deleteTeachsubject">删除</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          highlight-row
          @on-row-click="onClickRow"
          ref="selection"
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
    <addbmfjzd-form
      v-model="addShow"
      v-on:handleSearch="getteachSubjectPages"
    ></addbmfjzd-form>
    <updatebmfjzd-form
      v-model="updateShow"
      v-on:handleSearch="getteachSubjectPages"
      :stuparams="stuparams"
    ></updatebmfjzd-form>
    <xialaxuanxiang-form
      v-model="showxiala"
      :xialaID="xialaID"
      v-on:handleSearch="getteachSubjectPages"
    ></xialaxuanxiang-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addbmfjzdForm from "../../../../components/systemSetting/stusetting/addbmfjzdForm";
import updatebmfjzdForm from "../../../../components/systemSetting/stusetting/updatebmfjzdForm";
import xialaxuanxiangForm from "@/components/systemSetting/stusetting/xialaxuanxiangForm.vue";
export default {
  components: {
    addbmfjzdForm,
    updatebmfjzdForm,
    xialaxuanxiangForm,
  },
  data() {
    return {
      columns: [
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
          title: "学员属性",
          key: "stuParamTypeName",
          align: "center",
        },
        {
          title: "是否必填",
          key: "isBiTian",
          align: "center",
          render: (h, params) => {
            if (params.row.isBiTian == true) {
              return h("div", [
                h(
                  "label",
                  {
                    style: { color: "red" },
                  },
                  "必填"
                ),
              ]);
            } else {
              return h("div", [h("label", "选填")]);
            }
          },
        },
        {
          title: "类型",
          key: "widthType",
          align: "center",
          render: (h, params) => {
            if (params.row.widthType == 0) {
              return h("div", [h("span", "短框")]);
            } else if (params.row.widthType == 1) {
              return h("div", [h("span", "长框")]);
            } else {
              return h("div", [h("span", "下拉款")]);
            }
          },
        },
        {
          title: "操作",
          key: "shuoming",
          align: "center",
          render: (h, params) => {
            if (params.row.widthType == 2) {
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
                        this.clickpeizhi(params);
                      },
                    },
                  },
                  "设置下拉选项"
                ),
              ]);
            } else {
              return h("div", [h("span", "-")]);
            }
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      addShow: false,
      updateShow: false,
      showxiala: false,
      editdataID: "",
      qiyeID: "",
      buxiStyleNameA: "",
      stuparams: "",
      xialaID: "",
      checkList: [],
    };
  },
  methods: {
    ...mapActions(["GetStuParamtypePages", "DeleteStuParamType"]),

    onClickRow(row, index) {
      this.checkList = [];
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
        this.checkList = this.$refs.selection.data[index];
      }
    },

    getteachSubjectPages() {
      let size = this.size;
      let current = this.current;
      this.GetStuParamtypePages({
        size,
        current,
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
    addteachSubject() {
      this.addShow = true;
    },
    updateteachSubject() {
      this.stuparams = "";
      this.stuparams = JSON.stringify(this.checkList);
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要修改的数据");
      } else {
        this.updateShow = true;
      }
    },
    deleteTeachsubject() {
      this.editdataID = "";
      if (this.checkList.length == 0) {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "<p>确定删除报名附加字段？</p>",
          onOk: () => {
            this.editdataID = this.checkList.id;
            this.DeleteStuParamType({ Id: this.editdataID }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("删除报名附加字段成功");
                this.getteachSubjectPages();
              } else {
                this.$Message.error(res.msg);
              }
            });
          },
        });
      }
    },
    clickpeizhi(data) {
      console.log(data);
      this.xialaID = data.row.id;
      this.showxiala = true;
    },
  },

  mounted() {
    // this.staffID = this.$route.query.id;
    this.getteachSubjectPages();
  },
};
</script>
