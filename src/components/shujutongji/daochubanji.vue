<template>
  <Modal
    v-model="show"
    title="导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
  >
  <Alert show-icon>
        温馨提示：若不选择，则全部导出。
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
    </Alert>
    <Form ref="kemutongjiFrom" :model="params" :rules="paramsRule" :label-width="80">
      <FormItem label="校区" prop="campusID">
        <Select v-model="params.campusID" placeholder="请选择校区">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.campusName }}</Option
          >
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "daochubanjikehaotongji",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    daochutype: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        campusID: "",
        // qiyeID: this.$store.state.kehoupingjia.qiyeID,
      },
      paramsRule: {
        // 验证输入
        joinTime: [{}],
        campusID: [{}],
      },
      allcampusData: [],
      
    };
  },
  methods: {
    ok() {
      this.joinTime = "";
      // console.log(this.params);
      this.$refs["kemutongjiFrom"].validate((valid) => {
        if (valid) {
            toolbox.exportExcel(
                "/xwcloud-caiwu/caiwu/tongji/banjishoufei/exportBanjishoufei",
                this.params,
                "导出班级数据",
                this
              );
          
        } else {
          this.$Message.error("请检查数据是否填对!");
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
      if (val) {
        this.$refs["kemutongjiFrom"].resetFields();
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",this.params).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
