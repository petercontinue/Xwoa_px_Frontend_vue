<template>
  <Modal
    v-model="show"
    title="工资录入"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    :width="50"
  >
    <Form
      ref="editgongziForm"
      :model="params"
      :rules="paramsRule"
      :label-width="120"
      :label-colon="true"
    >
      <FormItem label="教师">
        <Input disabled v-model="gongzi.staffName" placeholder="正在获取教师数据..." />
      </FormItem>
      <FormItem label="月份" prop="month">
        <Input disabled v-model="gongzi.salaryDate" placeholder="正在获取月份数据..." />
      </FormItem>
      <Table :columns="columns" :data="gongziproList">
        <template slot-scope="{ row }" slot="money">
          <FormItem label>
            <Input
              v-model="params.gongzipro[row.salarystyleID]"
              placeholder="请输入金额"
              @on-change="moneychange($event, row)"
            />
          </FormItem>
        </template>
      </Table>
    </Form>
  </Modal>
</template>
<script>
import { mapActions, Store } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "editgongziForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    gongziID: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      columns: [
        {
          title: "编号",
          align: "center",
          key: "salarystyleID",
        },
        {
          title: "工资项目",
          align: "center",
          key: "salaryStyle",
        },
        {
          title: "金额",
          align: "center",
          slot: "money",
        },
      ],
      params: {
        salaryID: "",
        gongzipro: {},
        qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        salaryID: [],
      },
      gongzi: {
        staffName: "",
        salaryDate: "",
      },
      gongziproList: [],
    };
  },
  methods: {
    getGongziminxi() {
      api.get("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/getGongziminxiList",{
        salaryID: this.gongziID,
        qiyeID: this.params.qiyeID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.gongziproList = res.obj;
          console.log(res.obj);
          this.params.gongzipro = {};
          for (let index = 0; index < this.gongziproList.length; index++) {
            let pro = this.gongziproList[index];
            let keyid = pro.salarystyleID;
            this.params.gongzipro[keyid] = pro.salarymoney;
          }

        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    moneychange(e, row) {
      let keyid = row.salarystyleID;
      this.params.gongzipro[keyid] = e.target.value;
      console.log(this.params.gongzipro);
    },
    ok() {
      api.post("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/editGongzi",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          console.log(res);
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      this.$refs["editgongziForm"].resetFields();
      if (val) {
        this.params.salaryID = this.gongziID;
        console.log(this.gongziID);
        api.get("xwcloud-caiwu/caiwu/pxgongzitable/gongzimanage/getGongzi",{
          salaryID: this.gongziID,
          qiyeID: this.params.qiyeID,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            console.log(res);
            this.gongzi.staffName = res.obj.staffName;
            this.gongzi.salaryDate = toolbox.dateFtt(
              res.obj.salaryDate,
              "yyyy-MM"
            );
          } else {
            this.$Message.error(res.msg);
          }
        });
        this.getGongziminxi();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
