<template>
  <Modal
    v-model="show"
    title="校区推送"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Form
      ref="wxqfForm"
      :model="wxqfForm"
      :rules="wxqfFormRule"
      :label-width="180"
      :label-colon="true"
    >
      <FormItem label="校区名称（可多选）" prop="stuIDs">
        <Select
          v-model="wxqfForm.stuIDs"
          placeholder="请选择校区名称（可多选）"
          multiple
        >
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="推送类型" prop="tuisongType">
        <Select v-model="wxqfForm.tuisongType" placeholder="请选择推送类型">
          <Option
            v-for="item in alltuisongtype"
            :value="item.id"
            :key="item.id"
            >{{ item.name }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="推送内容" prop="content">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="wxqfForm.content"
          placeholder="请输入推送内容"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import uploadimgForm from "../../components/common-buttons/uploadimgForm";
import * as api from "@/api/api.js";

export default {
  components: {
    uploadimgForm,
  },
  name: "addlog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      wxqfForm: {
        content: "",
        tuisongType: "",
        stuIDs: [],
      },
      wxqfFormRule: {
        content: [
          {
            required: true,
            message: "请输入推送内容",
            trigger: "blur",
            type: "string",
          },
        ],
        stuIDs: [
          {
            required: true,
            message: "请选择学生",
            trigger: "change",
            type: "array",
          },
        ],
        tuisongType: [
          {
            required: true,
            message: "请选择推送类别",
            trigger: "change",
            type: "string",
          },
        ],
      },
      alltuisongtype: [],
      AllstuData: [],
      allcampusData: [],
      imgurl: "",
    };
  },
  methods: {
    ok() {
      this.$refs["wxqfForm"].validate((valid) => {
        if (valid) {
          let stuidstring = "";
          this.wxqfForm.stuIDs.forEach((element) => {
            stuidstring += element + ",";
          });
          var reg = /,$/gi;
          stuidstring = stuidstring.replace(reg, "");
          api.post("xwcloud-homeschool/homeschool/pxtuisongtable/campusMassRelease",{
            campusIds: stuidstring,
            tuisongType: this.wxqfForm.tuisongType,
            content: this.wxqfForm.content,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success("推送信息保存成功!");
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
      if (val) {
        this.$refs["wxqfForm"].resetFields();
        api.get("/xwcloud-zsbm/zsbm/BaoMingJiaoFei/GetAllxufeistuList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.AllstuData = res.obj;
          }
        });
        api.get("xwcloud-homeschool/homeschool/pxtuisongtable/GetAllTuisongType",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.alltuisongtype = res.obj;
          }
        });
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{menuID:271}).then((res) => {
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
