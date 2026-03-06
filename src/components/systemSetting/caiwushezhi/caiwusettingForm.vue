<template>
  <Modal
    v-model="show"
    :title="title"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      v-if="qdxianzhi"
      :label-width="300"
      :label-colon="true"
    >
      <Row style="margin-top:20px;">
        <Col span=12 offset=4>
          <FormItem
            label="新签续费退费录入限制天数（天）"
            prop="xianzhiDays"
            :label-width="300"
            :label-colon="true"
          >
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.xianzhiDays"
              placeholder="请输入新签续费退费录入限制天数（天）"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      
    </Form>

    <Form
      ref="shezhiForm1"
      :model="shezhiForm1"
      :rules="shezhiForm1Rule"
      v-if="caiwuxianzhi"
      :label-width="300"
      :label-colon="true"
    >
      <Row style="margin-top:20px;">
        <Col span=12 offset=4>
          <FormItem label="修改财务流水限制天数（天）" prop="cwxianzhiDays">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm1.cwxianzhiDays"
              placeholder="请输入修改财务流水限制天数（天）"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      
    </Form>

    <Form
      ref="shezhiForm2"
      :model="shezhiForm2"
      :rules="shezhiForm2Rule"
      v-if="gzshenheShow"
      :label-width="200"
      :label-colon="true"
    >
      <Row style="margin-top:20px;">
        <Col span=12 offset=4>
          <FormItem label="工资审核人(可多选)" prop="gongzishenheren">
            <Select
              v-model="shezhiForm2.gongzishenheren"
              placeholder="工资审核人(可多选)"
              style="width: 100%"
              multiple
              filterable
            >
              <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
                item.staffName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { update } from "countup";
import { mapActions } from "vuex";
import * as api from "@/api/api.js";

export default {
  name: "UpdateSysParamValue",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    shezhiID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        xianzhiDays: "",
      },
      shezhiFormRule: {
        xianzhiDays: [
          {
            required: true,
            message: "请输入新签续费退费录入限制天数（天）",
            trigger: "blur",
            type: "string",
          },
        ],
      },
      shezhiForm1: {
        cwxianzhiDays: "",
      },
      shezhiForm1Rule: {
        cwxianzhiDays: [
          {
            required: true,
            message: "请输入修改财务流水限制天数（天）",
            trigger: "blur",
            type: "string",
          },
        ],
      },
      shezhiForm2: {
        gongzishenheren: [],
      },
      shezhiForm2Rule: {
        gongzishenheren: [
          {
            required: true,
            message: "请选择工资审核人",
            trigger: "change",
            type: "array",
          },
        ],
      },
      title: "修改新签续费退费录入限制",
      qdxianzhi: false,
      caiwuxianzhi: false,
      gzshenheShow: false,
      allstaffData: [],
    };
  },
  methods: {
    ok() {
      let name =
        this.shezhiID == "43"
          ? "shezhiForm"
          : this.shezhiID == "42"
          ? "shezhiForm1"
          : "shezhiForm2";
      this.$refs[name].validate((valid) => {
        if (valid) {
          let value =
            this.shezhiID == "43"
              ? this.shezhiForm.xianzhiDays
              : this.shezhiID == "42"
              ? this.shezhiForm1.cwxianzhiDays
              : this.shezhiForm2.gongzishenheren.toString();

          console.log(value);
          api.post("xwcloud-sys/sys/SystemSetting/UpdateSysParamValue",{
            id: this.shezhiID,
            value: value,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false);
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
              // 官方目前没有解决方案
              this.loading = false;
              setTimeout(() => {
                this.loading = true;
              }, 0);
            }
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
    checkstaffTel() {},
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
      //this.shezhiID:43:新签续费充值退费录入限制（天）;42:流水账录入限制（天）;20:工资审核权限
      if (val) {
        console.log(this.shezhiID);

        if (this.shezhiID == "20") {
          api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((res) => {
            if (res.code == "Y" && res.success == true) {
              console.log(res);
              this.allstaffData = res.obj;
            }
          });
        }
        api.get("xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: this.shezhiID }).then((res) => {
          if (this.shezhiID == "43") {
            // this.$refs["shezhiForm"].resetFields();
            this.qdxianzhi = true;
            this.caiwuxianzhi = false;
            this.gzshenheShow = false;
            this.title = "修改新签续费退费录入限制";
            this.shezhiForm.xianzhiDays = res.obj == null ? "" : res.obj.modifyValue;
          } else if (this.shezhiID == "42") {
            this.qdxianzhi = false;
            this.caiwuxianzhi = true;
            this.gzshenheShow = false;
            this.title = "修改财务流水限制（天）";
            this.shezhiForm1.cwxianzhiDays = res.obj == null ? "" : res.obj.modifyValue;
          } else if (this.shezhiID == "20") {
            this.title = "工资审核人";
            this.qdxianzhi = false;
            this.caiwuxianzhi = false;
            this.gzshenheShow = true;
            if (res.obj != null) {
              this.shezhiForm2.gongzishenheren = [];
              console.log(res.obj.modifyValue);
              for (let it of res.obj.modifyValue.split(",")) {
                this.shezhiForm2.gongzishenheren.push(it);
              }
              console.log(this.shezhiForm2.gongzishenheren);
            }
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
