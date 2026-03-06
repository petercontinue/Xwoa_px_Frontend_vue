<template>
  <div>
    <Row style="margin-top: 25px">
      <Col span="24">
        <Button type="info" size="large" @click="addoreditTeaRate(1)"
          >添加</Button
        >
        <Button type="success" size="large" @click="addoreditTeaRate(2)"
          >修改</Button
        >
        <Button type="warning" size="large" @click="deleteTeacRate"
          >删除</Button
        >
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

    <addteaRate
      v-model="addShow"
      :editdata="editdata"
      v-on:handleSearch="getAllRateList"
    ></addteaRate>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addteaRate from "../../../../components/systemSetting/jiaowusetting/addteaRate";
export default {
  components: {
    addteaRate,
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
          title: "评分项",
          key: "pfName",
          align: "center",
        },
      ],
      data: [],
      addShow: false,
      editdataID: "",
      checkList: [],
      editdata: "",
    };
  },
  methods: {
    ...mapActions(["getTeaRateitemList", "delTeaRate"]),

    onClickRow(row, index) {
      this.$refs.selection.data[index]._checked =
        !this.$refs.selection.data[index]._checked;
    },

    getAllRateList() {
      this.getTeaRateitemList().then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
        }
      });
    },

    addoreditTeaRate(type) {
      this.editdata = "";

      if (type == 2) {
        let i = 0;
        this.data.forEach((items) => {
          if (items._checked == true) {
            i += 1;
            this.editdata = JSON.stringify(items);
          }
        });
        if (i == 0) {
          this.$Message.error("请选择要修改的数据");
        } else if (i > 1) {
          this.$Message.error("请选择一行数据");
        } else {
          this.addShow = true;
        }
      } else {
        this.addShow = true;
      }
    },

    deleteTeacRate() {
      this.editdataID = "";
      this.data.forEach((items) => {
        if (items._checked == true) {
          this.editdataID += items.id + ",";
        }
      });
      if (this.editdataID == "") {
        this.$Message.error("请选择要删除的数据");
      } else {
        this.delTeaRate({ ids: this.editdataID }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.$Message.success(res.msg);
            this.getAllRateList();
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
    },
  },

  mounted() {
    this.getAllRateList();
  },
};
</script>
