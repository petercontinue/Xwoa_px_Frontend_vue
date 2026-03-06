<template>
  <Modal
    v-model="show"
    title="修改固定资产信息"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="65"
  >
    <Form
      ref="addzichangForm"
      :model="addzichangForm"
      :rules="addzichangFormRule"
      :label-width="100"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select
              v-model="addzichangForm.campusID"
              placeholder="请选择校区"
              style="width: 100%"
            >
              <Option
                v-for="item in allcampusData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem></Col
        >
        <Col span="12">
          <FormItem label="类别" prop="leibie">
            <Select
              v-model="addzichangForm.leibie"
              placeholder="请选择类别"
              style="width: 100%"
            >
              <Option
                v-for="item in allleibie"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="名称" prop="assetsName">
            <Input
              type="text"
              :maxlength="50"
              v-model="addzichangForm.assetsName"
              placeholder="请输入名称"
              style="width: 100%"
            /> </FormItem
        ></Col>
        <Col span="12">
          <FormItem label="规格" prop="guige">
            <Input
              type="text"
              :maxlength="50"
              v-model="addzichangForm.guige"
              placeholder="请输入规格"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="数量" prop="num">
            <Input
              type="text"
              :maxlength="50"
              v-model="addzichangForm.num"
              placeholder="请输入数量"
              style="width: 100%"
            /> </FormItem
        ></Col>
        <Col span="12">
          <FormItem label="单位" prop="danwei">
            <Input
              type="text"
              :maxlength="50"
              v-model="addzichangForm.danwei"
              placeholder="请输入单位"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
        <div slot="footer">
      <Button type="primary" @click="ok()">保存修改</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import * as api from "@/api/api.js";
export default {
  name: "updatezichang",
  components: {},
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    editdata: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      addzichangForm: {
        id: "",
        campusID: "",
        leibie: "",
        assetsName: "",
        guige: "",
        num: "",
        danwei: "",
        qiyeID: "",
      },
      addzichangFormRule: {
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        leibie: [
          {
            required: true,
            message: "请选择类别",
            trigger: "change",
            type: "string",
          },
        ],
        assetsName: [
          {
            required: true,
            message: "请输入资产名称",
            trigger: "change",
            type: "string",
          },
        ],
        guige: [
          {
            required: true,
            message: "请输入规格",
            trigger: "change",
            type: "string",
          },
        ],
        num: [
          {
            required: true,
            message: "请输入数量",
            trigger: "change",
            type: "string",
          },
        ],
        danwei: [
          {
            required: true,
            message: "请输入单位",
            trigger: "change",
            type: "string",
          },
        ],
        addTime: [
          {
            required: true,
            message: "请选择添加时间",
            trigger: "change",
            type: "string",
          },
        ],
        addstaffID: [
          {
            required: true,
            message: "请选择添加人",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
      allleibie: [],
      allstaffData: [],
    };
  },
  methods: {
    ok() {
      api.post("/xwcloud-sys/sys/pxassets/updateAssetInfo",{
        id: this.addzichangForm.id,
        campusID: this.addzichangForm.campusID,
        assetsName: this.addzichangForm.assetsName,
        leibie: this.addzichangForm.leibie,
        guige: this.addzichangForm.guige,
        num: this.addzichangForm.num,
        danwei: this.addzichangForm.danwei,
        qiyeID: this.addzichangForm.qiyeID,
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
      setTimeout(() => {
        this.loading = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 1000);
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
        this.$refs["addzichangForm"].resetFields();
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 551 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("/xwcloud-sys/sys/pxassets/GetAllAssetsStyleList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allleibie = res.obj;
          }
        });
        api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstaffData = res.obj;
          }
        });
        console.log(JSON.parse(this.editdata));
        this.addzichangForm = JSON.parse(this.editdata);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>

