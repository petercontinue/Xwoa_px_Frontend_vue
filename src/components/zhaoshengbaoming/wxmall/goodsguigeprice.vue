<template>
  <div>
    <Table :columns="columns1" :data="data1" border></Table>
    <updateshuxingjiage
      v-model="showeditprice"
      :editData="editData"
      v-on:handleSearch="getshuxingData"
    ></updateshuxingjiage>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import updateshuxingjiage from "@/components/zhaoshengbaoming/wxmall/updateshuxingjiage.vue";
export default {
  components: {
    updateshuxingjiage,
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
      columns1: [
        {
          title: "规格",
          key: "shuxing",
          align: "center",
        },
        {
          title: "原价",
          key: "originalprice",
          align: "center",
        },
        {
          title: "现价",
          key: "price",
          align: "center",
        },
        {
          title: "积分兑换价",
          key: "jifenprice",
          align: "center",
        },
        {
          title: "限时抢购价",
          key: "onlytimebuyprice",
          align: "center",
        },
        {
          title: "砍价成功价格",
          key: "kanjiasuccessprice",
          align: "center",
        },
        {
          title: "操作",
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
                      this.updateshuxingjiage(params);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          },
        },
      ],
      data1: [],
      showeditprice: false,
      editData: "",
    };
  },
  methods: {
    ...mapActions(["GetAllShuxingValueList", "GetShuxingzuhePrice"]),
    getshuxingData() {
      this.data1 = [];
      this.GetAllShuxingValueList({ goodsID: this.goodsID })
        .then((result) => {
          if (result.code == "Y" && result.success == true) {
            let shuxingzuhe = this.descartes(result.obj);
            shuxingzuhe.forEach((element) => {
              let shuxinglist = "";
              element.forEach((element) => {
                shuxinglist += element + ",";
              });
              this.GetShuxingzuhePrice({
                shuxing: shuxinglist,
                goodsid: this.goodsID,
              }).then((response) => {
                if (response.code == "Y" && response.success == true) {
                  let shuxing = {
                    shuxing: shuxinglist,
                    originalprice: response.obj.originalprice,
                    price: response.obj.price,
                    jifenprice: response.obj.jifenprice,
                    onlytimebuyprice: response.obj.onlytimebuyprice,
                    kanjiasuccessprice: response.obj.kanjiasuccessprice,
                    goodsid: this.goodsID,
                  };
                  this.data1.push(shuxing);
                } else {
                  let shuxing = {
                    shuxing: shuxinglist,
                    originalprice: 0,
                    price: 0,
                    jifenprice: 0,
                    onlytimebuyprice: 0,
                    kanjiasuccessprice: 0,
                    goodsid: this.goodsID,
                  };
                  this.data1.push(shuxing);
                }
              });
            });
          }
        })
        .catch((err) => {});
    },
    /**
     * 生成笛卡尔积
     * @returns {*}
     */
    descartes(array) {
      if (array.length < 2) return array[0] || [];
      return [].reduce.call(array, function (col, set) {
        var res = [];
        col.forEach(function (c) {
          set.forEach(function (s) {
            var t = [].concat(Array.isArray(c) ? c : [c]);
            t.push(s);
            res.push(t);
          });
        });
        return res;
      });
    },
    updateshuxingjiage(data) {
      this.editData = JSON.stringify(data.row);
      this.showeditprice = true;
    },
  },
  mounted() {
    this.getshuxingData();
  },
  watch: {
    key(val){
      cpnsole.log(val);
    },
  },
};
</script>
