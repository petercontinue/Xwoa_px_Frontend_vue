<template>
  <Modal
    v-model="show"
    title="添加课程内容"
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
      :label-width="100"
      :label-colon="true"
    >
      <FormItem label="总课程次数" prop="sumcishu">
        <Input
          type="number"
          :maxlength="50"
          v-model="shezhiForm.sumcishu"
          placeholder="请输入总课程次数"
          style="width: 100%"
          @on-change="changeSum"
        />
      </FormItem>
      <Row v-for="(item, index) in allcishu" :key="index">
        <FormItem :label="item.label" prop="sumcishu">
          <Input
            type="text"
            :maxlength="500"
            v-model="item.valueName"
            placeholder="请输入第1次课程主题"
            style="width: 100%"
          />
        </FormItem>
      </Row>
    </Form>
     <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";

export default {
  name: "addbuxistyle",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    kechengID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      shezhiForm: {
        sumcishu: 0,
        campusID: "",
        subjectName: "",
      },
      shezhiFormRule: {
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        subjectName: [
          {
            required: true,
            message: "请输入科目名称",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
      allcishu: [],
      allkcContent: [],
    };
  },
  methods: {
    ok() {
      api.post("xwcloud-zsbm/zsbm/BaoMingJiaoFei/PiliangAddKechengContent",{
        kechengcontentList: JSON.stringify(this.allcishu),
        kechengID: this.kechengID,
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
    changeSum() {
      for (var i = 0; i < this.shezhiForm.sumcishu; i++) {
        var list = {
          xuhao: i + 1,
          label: "第" + (i + 1) + "次课程主题",
          valueName: "课程内容" + i,
        };
        this.allcishu.push(list);
      }
      console.log(this.allcishu);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["shezhiForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{}).then((res) => {
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
