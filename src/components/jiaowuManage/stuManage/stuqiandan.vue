<template>
  <Modal
    v-model="show"
    title="交费信息"
    @on-ok="ok"
    :mask-closable="false"
    width="90"
    @on-cancel="closeModal(false)"
  >
    <div>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table border ref="selection" :columns="columns6" :data="data"></Table>
        </Col>
      </Row>

      <Row style="margin-top: 15px">
        <Page
          :total="total"
          show-elevator
          show-total
          prev-text="上一页"
          next-text="下一页"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Row>
      <kechengInfo v-model="kCShow" :stuID="stuInfoID" :qdID="QDID"></kechengInfo>
      <stuzaifeiInfo v-model="zfShow" :qdID="zfqdID"></stuzaifeiInfo>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import kechengInfo from "@/components/jiaowuManage/stuManage/kechengInfo";
import stuzaifeiInfo from "@/components/jiaowuManage/stuManage/stuzaifeiInfo";

export default {
  name: "stuqiandan",
  components: { kechengInfo, stuzaifeiInfo },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      data: [], // 接口数据接收
      total: 0,
      kCShow: false,
      zfShow: false,
      QDID: "",
      stuInfoID: "",
      zfqdID: "",
      params: {
        current: 1,
        size: 10,
        stuID: 0,
      },
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          width: 150,
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          width: 100,
        },
        {
          title: "签单实收金额",
          key: "shishouTotalMoney",
          align: "center",
          width: 150,
        },
        {
          title: "课程学费",
          key: "kechengMoney",
          align: "center",
          width: 150,
        },
        {
          title: "代金券",
          key: "daijinquan",
          align: "center",
          width: 100,
        },
        {
          title: "学杂费",
          key: "otherMoney",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.lookzaMoney(params);
                    },
                  },
                },
                "(详情)"
              ),
            ]);
          },
        },
        {
          title: "优惠政策金额",
          key: "youhuijine",
          align: "center",
          width: 150,
          render: (h, params) => {
            let state = "";
            if (params.row.youhuijine == null) {
              state = "无";
            } else {
              state = params.row.youhuijine;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "交费类型",
          key: "moneyStyle",
          align: "center",
          width: 100,
          render: (h, params) => {
            let state = "";
            switch (params.row.moneyStyle) {
              case 1:
                state = "新签";
                break;
              case 2:
                state = "续费";
                break;
              case 3:
                state = "退费";
                break;
              case 4:
                state = "转送";
                break;
              case 5:
                state = "换课（换出）";
                break;
              case 6:
                state = "换课得到";
                break;
              default:
                state = "-";
                break;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "经办人",
          key: "staffNames",
          align: "center",
          width: 150,
        },
        {
          title: "签单日期",
          key: "qiandandate",
          align: "center",
        },
        {
          title: "课程信息",
          key: "kcmessage",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  on: {
                    click: () => {
                      this.lookkc(params);
                    },
                  },
                },
                "(详情)"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions(["getstuQiandanInfoPage"]),

    getstuQiandanInfo() {
      this.getstuQiandanInfoPage(this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          console.log(res);
        }
      });
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getstuQiandanInfo();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getstuQiandanInfo();
    },
    /**
     * 表头搜索
     */
    TableSearch() {
      this.getstuQiandanInfo();
    },
    lookzaMoney(value) {
      this.zfqdID = value.row.qdID;
      this.zfShow = true;
    },
    lookkc(value) {
      this.QDID = value.row.qdID;
      this.stuInfoID = value.row.stuID;

      console.log("kc:" + this.stuInfoID);
      this.kCShow = true;
    },

    ok() {
      this.$emit("input", val);
    },
    closeModal(val) {
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.params.stuID = this.stuID;
        this.getstuQiandanInfo();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
