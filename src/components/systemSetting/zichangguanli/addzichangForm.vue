<template>
  <Modal
    v-model="show"
    title="固定资产添加"
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
      <Row>
        <Col span="12">
          <FormItem label="登记时间" prop="addTime">
            <DatePicker
              type="date"
              v-model="addzichangForm.addTime"
              placeholder="请选择登记时间"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="经办人" prop="addstaffID">
            <Select
              v-model="addzichangForm.addstaffID"
              placeholder="请选择经办人"
              style="width: 100%"
            >
              <Option
                v-for="item in allstaffData"
                :value="item.id"
                :key="item.id"
                >{{ item.staffName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="备注" prop="beizhu">
          <Input
            type="textarea"
            :rows="4"
            :maxlength="100"
            v-model="addzichangForm.beizhu"
            placeholder="请输入备注"
            style="width: 80%"
          />
        </FormItem>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续添加</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
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
  },
  data() {
    return {
      show: this.value,
      loading: true,
      addzichangForm: {
        campusID: "",
        leibie: "",
        assetsName: "",
        guige: "",
        num: "",
        danwei: "",
        addTime: "",
        addstaffID: "",
        beizhu: "",
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
            type: "date",
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
    ok(closetype) {
      this.$refs["addzichangForm"].validate((valid) => {
        if (valid) {
          api.post("/xwcloud-sys/sys/pxassets/addAssetInfo",{
            campusID: this.addzichangForm.campusID,
            assetsName: this.addzichangForm.assetsName,
            leibie: this.addzichangForm.leibie,
            guige: this.addzichangForm.guige,
            num: this.addzichangForm.num,
            danwei: this.addzichangForm.danwei,
            addTime: this.addzichangForm.addTime,
            addstaffID: this.addzichangForm.addstaffID,
            beizhu: this.addzichangForm.beizhu,
          }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              if (closetype == 2) {
                // 提交表单数据成功则关闭当前的modal框
                this.closeModal(false);
              }
              this.$refs["addzichangForm"].resetFields();
              // 同时调用父页面的刷新页面的方法
              this.$emit("handleSearch");
            } else {
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请将必填字段填写完整!");
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
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
