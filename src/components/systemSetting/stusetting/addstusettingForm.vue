<template>
  <Modal
    v-model="show"
    :title="title"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="45"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      v-if="yxqxr"
      :label-width="150"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="意向权限人" prop="yxquanxianren">
            <Select
              v-model="shezhiForm.yxquanxianren"
              placeholder="请选择意向权限人"
              style="width: 100%"
            >
              <Option value="1">登记人</Option>
              <Option value="2">市场人</Option>
              <Option value="3">负责人</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm1"
      :model="shezhiForm1"
      :rules="shezhiForm1Rule"
      v-if="yxsrycfxz"
      :label-width="150"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="录入冲突方式" prop="lurustyle">
            <Select
              v-model="shezhiForm1.lurustyle"
              placeholder="请选择录入方式"
              style="width: 100%"
            >
              <Option value="1">姓名相同</Option>
              <Option value="2">电话相同</Option>
              <Option value="3">姓名和电话都相同</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm2"
      :model="shezhiForm2"
      :rules="shezhiForm2Rule"
      v-if="yxwgj"
      :label-width="200"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="意向客户未跟进天数（天）" prop="weigenjinDays">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm2.weigenjinDays"
              placeholder="请输入意向客户未跟进天数（天）"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>

    <Form
      ref="shezhiForm3"
      :model="shezhiForm3"
      :rules="shezhiForm3Rule"
      v-if="nextgenjin"
      :label-width="150"
      :label-colon="true"
    >
      <Row style="margin-top: 20px">
        <Col span="12" offset="4">
          <FormItem label="设置项" prop="nextGenjin">
            <Select
              v-model="shezhiForm3.nextGenjin"
              placeholder="请选择设置项"
              style="width: 100%"
            >
              <Option value="1">选填</Option>
              <Option value="2">必填</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { update } from "countup";
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
        yxquanxianren: "",
      },
      shezhiFormRule: {
        yxquanxianren: [
          {
            required: true,
            message: "请选择意向权限人",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm1: {
        lurustyle: "",
      },
      shezhiForm1Rule: {
        lurustyle: [
          {
            required: true,
            message: "请选择录入方式",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm2: {
        weigenjinDays: "",
      },
      shezhiForm2Rule: {
        weigenjinDays: [
          {
            required: true,
            message: "请输入意向客户未跟进天数",
            trigger: "change",
            type: "string",
          },
        ],
      },
      shezhiForm3: {
        nextGenjin: "",
      },
      shezhiForm3Rule: {
        nextGenjin: [
          {
            required: true,
            message: "请选择意向学员下次跟进是否为必填项",
            trigger: "change",
            type: "string",
          },
        ],
      },
      title: "修改意向权限人",
      yxqxr: false, //意向权限人
      yxsrycfxz: false, //意向学员冲突录入的选择
      yxwgj: false, //意未跟进
      nextgenjin: false, //意向学员下次跟进是否为必填项
    };
  },
  methods: {
    ok() {
      let value =
        this.shezhiID == "84"
          ? this.shezhiForm1.lurustyle == 1
            ? "1"
            : this.shezhiForm1.lurustyle == 2
            ? "2"
            : "3"
          : this.shezhiID == "85"
          ? this.shezhiForm.yxquanxianren == 1
            ? "登记人"
            : this.shezhiForm.yxquanxianren == 2
            ? "市场人"
            : "负责人"
          : this.shezhiID == "86"
          ? this.shezhiForm3.nextGenjin == 1
            ? "选填"
            : "必填"
          : this.shezhiForm2.weigenjinDays;
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
      if (val) {
        console.log(this.shezhiID);
        api.get("/xwcloud-sys/sys/SystemSetting/GetSystemParamsById",{ paramsID: this.shezhiID }).then((res) => {
          if (this.shezhiID == "85") {
            // this.$refs["shezhiForm"].resetFields();
            this.yxsrycfxz = false;
            this.yxwgj = false;
            this.nextgenjin = false;
            this.yxqxr = true;
            this.title = "修改意向权限人";
            this.shezhiForm.yxquanxianren =
              res.obj.modifyValue == "登记人"
                ? "1"
                : res.obj.modifyValue == "市场人"
                ? "2"
                : "3";
            console.log(this.shezhiForm.yxquanxianren);
          } else if (this.shezhiID == "84") {
            this.yxqxr = false;
            this.yxwgj = false;
            this.nextgenjin = false;
            this.yxsrycfxz = true;
            this.title = "修改意向学员重复录入限制";
            this.shezhiForm1.lurustyle =
              res.obj.modifyValue == "姓名和电话都相同"
                ? "3"
                : res.obj.modifyValue == "姓名相同"
                ? "2"
                : "1";
          } else if (this.shezhiID == "87") {
            this.title = "修改意向客户未跟进天数（天）";
            this.yxqxr = false;
            this.yxsrycfxz = false;
            this.nextgenjin = false;
            this.yxwgj = true;
            this.shezhiForm2.weigenjinDays = res.obj.modifyValue;
          } else if (this.shezhiID == "86") {
            this.title = "意向学员下次跟进时间";
            this.yxqxr = false;
            this.yxsrycfxz = false;
            this.yxwgj = false;
            this.nextgenjin = true;
            this.shezhiForm3.nextGenjin = res.obj.modifyValue == "选填" ? "1" : "2";
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
