<template>
  <div>
    <Row>
      <Button type="info" @click="newguige">新增规格</Button>
      <Button type="info" @click="newguigeshuxing">新增规格明细</Button>
    </Row>
    <Row style="margin-top: 20px">
      <Table row-key="id" :columns="columns16" :data="tableData" border></Table>
    </Row>
    <addguige-form
      v-model="showaddguige"
      v-on:handleSearch="loadTableData"
      :goodsID="goodsID"
      :editData="editData"
    ></addguige-form>
    <addguigemingxi-form
      v-model="showshuxing"
      v-on:handleSearch="loadTableData"
      :goodsID="goodsID"
      :editData="editData"
    ></addguigemingxi-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import addguigeForm from "@/components/zhaoshengbaoming/wxmall/addguigeForm.vue";
import addguigemingxiForm from "@/components/zhaoshengbaoming/wxmall/addguigemingxiForm.vue";
export default {
  components: {
    addguigeForm,
    addguigemingxiForm,
  },
  props: {
    goodsID: {
      type: String,
    },
    key:{
      type:Number,
    }
  },
  data() {
    return {
      columns16: [
        {
          title: "ID",
          key: "id",
          tree: true,
        },
        {
          title: "规格类别",
          key: "guigeTypeName",
          align: "center",
        },
        {
          title: "操作",
          key: "address",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.updateguigeshuxing(params);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.deleteguigeshuxing(params);
                    },
                  },
                },
                "删除"
              ),
            ]);
          },
        },
      ],
      tableData: [],
      showaddguige: false,
      showshuxing: false,
      editData: "",
    };
  },
  methods: {
    ...mapActions([
      "GetGoodsShuxingList",
      "deleteWscGoodsGuigeByIDs",
      "deleteWscGoodsAttributeListByIDs",
    ]),
    loadTableData() {
      this.GetGoodsShuxingList({ goodsID: this.goodsID }).then((res) => {
        console.log(res);
        if (res.code == "Y" && res.success == true) {
          this.tableData = res.obj;
          this.$emit("increment", "saveguigeshuxing");
        }
      });
    },
    newguige() {
      this.showaddguige = true;
    },
    newguigeshuxing() {
      this.showshuxing = true;
    },
    updateguigeshuxing(data) {
      this.editData = JSON.stringify(data.row);
      if (data.row.children) {
        this.showaddguige = true;
      } else {
        this.showshuxing = true;
      }
    },
    deleteguigeshuxing(data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定删除该属性？</p>",
        onOk: () => {
          if (data.row.children) {
            //删除商品规格信息
            this.deleteWscGoodsGuigeByIDs({ id: data.row.id }).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("商品规格删除成功");
                this.loadTableData();
              } else {
                this.$Message.error(res.msg);
              }
            });
          } else {
            //删除商品属性信息
            this.deleteWscGoodsAttributeListByIDs({ id: data.row.id }).then(
              (result) => {
                if (result.code == "Y" && result.success == true) {
                  this.$Message.success("商品规格属性删除成功");
                  this.loadTableData();
                } else {
                  this.$Message.error(res.msg);
                }
              }
            );
          }
        },
      });
    },
  },
  watch: {
    key(val){
      cpnsole.log(val);
    },
  },
  mounted() {
    this.loadTableData();
  },
};
</script>
