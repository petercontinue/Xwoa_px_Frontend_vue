<template>
  <Modal
    v-model="show"
    title="导出科目课表"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="addliushuiForm"
      :model="params"
      :rules="paramsRule"
      :label-width="130"
      :label-colon="true"
    >
      <Row>
        <Col>
          <FormItem label="科目" prop="subjectID">
            <Select v-model="params.subjectID" placeholder="请选择科目">
              <Option
                v-for="item in subjectData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="起止日期" prop="nianyue">
            <DatePicker
              type="daterange"
              placeholder="选择起止日期"
              v-model="params.nianyue"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import { getLodop } from "@/libs/LodopFuncs";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "addliushuiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    classID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        subjectID: "",
        nianyue: "",
      },
      paramsRule: {
        // 验证输入
        subjectID: [
          {
            required: true,
            message: "请选择科目",
            trigger: "blur",
            type: "string",
          },
        ],
        nianyue: [
          {
            required: true,
            message: "请选择年月",
            trigger: "blur",
            type: "date",
          },
        ],
      },
      subjectData: [],
      kechengData: [],
    };
  },
  methods: {
    ok() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/GetPrintSubjectKebiao",{
        startDate: this.params.nianyue[0],
        endDate: this.params.nianyue[1],
        subjectID: this.params.subjectID,
      }).then((res) => {
        console.log(res);
      });
      // this.closeModal(false);
      // LODOP.SET_PRINT_PAGESIZE(2, "", "", "A4");
      // LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
      // LODOP.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW", true);
      // LODOP.ADD_PRINT_HTM(
      //   "0.5%",
      //   "1.5%",
      //   "100%",
      //   "100%",
      //   "哈哈哈哈哈哈哈哈啊啊啊啊哈哈哈哈哈哈哈哈哈"
      // );
      // LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", 1);
      // LODOP.PREVIEW();
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
        this.$refs["addliushuiForm"].resetFields();
        api.get("xwcloud-pkxk/paike/paikexiaoke/GetAllKemuList",{})
          .then((result) => {
            if (result.code == "Y" && result.success == true) {
              this.subjectData = result.obj;
            }
          })
          .catch((err) => {});
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
