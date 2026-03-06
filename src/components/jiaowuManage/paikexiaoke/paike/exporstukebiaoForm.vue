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
          <FormItem label="学生姓名" prop="stuID">
            <Select v-model="params.stuID" placeholder="请选择学生">
              <Option
                v-for="item in stuData"
                :value="item.id"
                :key="item.id"
                >{{ item.stuname }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="年月" prop="nianyue">
            <DatePicker
              type="month"
              placeholder="选择年月"
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
        stuID: "",
        nianyue: "",
      },
      paramsRule: {
        // 验证输入
        stuID: [
          {
            required: true,
            message: "请选择学生",
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
      stuData: [],
      kechengData: [],
    };
  },
  methods: {
    ok() {
      this.$refs["addliushuiForm"].validate((valid) => {
        if (valid) {
          axios
            .request({
              method: "get",
              url: "/xwcloud-pkxk/paike/paikexiaoke/ExportstukebiaoList",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: {
                stuID: this.params.stuID,
                yearMouth: toolbox.dateFtt(this.params.nianyue, "yyyy-MM-dd"),
              },
              responseType: "blob",
            })
            .then((res) => {
              this.btnLoading = false;
              // 文件下载
              const blob = new Blob([res], {
                type: "application/vnd.ms-excel",
              });
              let link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.setAttribute("download", "学生课表信息.xls");
              link.click();
              link = null;
              this.$Message.success("导出成功");
              this.closeModal(false);
            })
            .catch((err) => {
              this.btnLoading = false;
              this.$Message.error("下载失败");
            });
        } else {
          this.$Message.error("请将必填字段填写完整!");
          // 官方目前没有解决方案
          this.loading = false;
          setTimeout(() => {
            this.loading = true;
          }, 0);
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
        this.$refs["addliushuiForm"].resetFields();
        api.get("xwcloud-pkxk/paike/paikexiaoke/GetAllStuList",{})
          .then((result) => {
            if (result.code == "Y" && result.success == true) {
              this.stuData = result.obj;
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
