<template>
  <Modal
    v-model="show"
    title="微请假导出"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="qingjiaFrom"
      :model="qingjia"
      :rules="qingjiaRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="校区" prop="campusID">
        <Select v-model="qingjia.campusID" placeholder="请选择校区">
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
  name: "editLaoshikehoupingjia",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    fileName: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      qingjia: {
        campusID: "",
      },
      qingjiaRule: {
        // 验证输入
        //note: [{ required: true, message: "请输入评价", trigger: "blur" }],
      },
      allcampusData: [],
    };
  },
  methods: {
    ok() {
      // 点击确定按钮时调用
      toolbox.exportExcel(
        "/xwcloud-homeschool/homeschool/pxqingjiatable/exportQingjia",
        this.qingjia,
        this.fileName,
        this
      );
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
        this.$refs["qingjiaFrom"].resetFields();
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",this.qingjia).then((res) => {
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
