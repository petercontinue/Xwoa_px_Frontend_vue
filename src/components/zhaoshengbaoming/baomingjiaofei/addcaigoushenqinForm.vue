<template>
  <Modal
    v-model="show"
    title="添加采购申请"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="120"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select v-model="shezhiForm.campusID" placeholder="请选择校区" filterable>
              <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="商品类别" prop="typeId">
            <Select v-model="shezhiForm.typeId" placeholder="请选择商品类别" filterable>
              <Option v-for="item in allgoodsTypeData" :value="item.id" :key="item.id">{{
                item.typeName
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="教学用品" prop="name">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.name"
              placeholder="请输入教学用品"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="规格" prop="specs">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.specs"
              placeholder="请输入规格"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="采购数量" prop="buyNum">
            <InputNumber
              placeholder="请输入采购数量"
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.buyNum"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="单位" prop="stockUnit">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.stockUnit"
              placeholder="请输入单位"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="说明" prop="Reason">
          <Input
            type="textarea"
            :maxlength="50"
            v-model="shezhiForm.Reason"
            placeholder="请输入说明"
          />
        </FormItem>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="采购时间" prop="addDate">
            <DatePicker
              type="date"
              placeholder="请选择采购时间"
              v-model="shezhiForm.addDate"
              format="yyyy-MM-dd"
              style="width: 100%"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="采购人" prop="cgstaffName">
            <Select
              v-model="shezhiForm.cgstaffName"
              placeholder="请选择采购人"
              style="width: 100%"
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
    <div slot="footer">
      <Button type="primary" @click="ok(1)">保存并继续</Button>
      <Button type="primary" @click="ok(2)">保存并关闭</Button>
      <Button @click="closeModal(false)">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";
export default {
  name: "addbuxistyle",
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
      shezhiForm: {
        buyID: 0,
        campusID: "",
        cgstaffName: "",
        typeId: "",
        name: "",
        specs: "",
        buyNum: 0,
        stockUnit: "",
        Reason: "",
        addDate: "",
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
        typeId: [
          {
            required: true,
            message: "请选择分类",
            trigger: "change",
            type: "string",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入教学物品名称",
            trigger: "change",
            type: "string",
          },
        ],
        buyNum: [
          {
            required: true,
            message: "请输入购买数量",
            trigger: "change",
            type: "number",
          },
        ],
        stockUnit: [
          {
            required: true,
            message: "请输入数量单位",
            trigger: "change",
            type: "string",
          },
        ],
        Reason: [
          {
            required: true,
            message: "请输入说明",
            trigger: "change",
            type: "string",
          },
        ],
        addDate: [
          {
            required: true,
            message: "请选择采购时间",
            trigger: "change",
            type: "date",
          },
        ],
        cgstaffName: [
          {
            required: true,
            message: "请选择采购人",
            trigger: "change",
            type: "string",
          },
        ],
        specs: [
          {
            required: true,
            message: "请输入规格",
            trigger: "change",
            type: "string",
          },
        ],
      },
      allcampusData: [],
      allgoodsTypeData: [],
      allstaffData: [],
    };
  },
  methods: {
    ok(closetype) {
      this.$refs["shezhiForm"].validate((valid) => {
        if (valid) {
          api
            .post("/xwcloud-zsbm/zsbm/JinXiaoCun/AddTeachingSuppliesInfo", {
              buyID: this.shezhiForm.buyID,
              campusID: this.shezhiForm.campusID,
              cgstaffName: this.shezhiForm.cgstaffName,
              typeId: this.shezhiForm.typeId,
              name: this.shezhiForm.name,
              specs: this.shezhiForm.specs,
              buyNum: this.shezhiForm.buyNum,
              stockUnit: this.shezhiForm.stockUnit,
              reason: this.shezhiForm.Reason,
              addDate: toolbox.dateFtt(this.shezhiForm.addDate, "yyyy-MM-dd"),
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                if (closetype == 2) {
                  //关闭弹出框
                  this.closeModal();
                }
                this.$refs["shezhiForm"].resetFields();
                //刷新父级页面数据
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
    changechukusl() {
      this.shezhiForm.shengyuNumber =
        Number(this.shezhiForm.StockNum) - Number(this.shezhiForm.outNum);
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
        if (this.editdata != "") {
          let data = JSON.parse(this.editdata);
          console.log(data);
          this.shezhiForm.buyID = data.id;
          this.shezhiForm.campusID = data.campusID;
          this.shezhiForm.typeId = data.shangpingTypeID;
          this.shezhiForm.name = data.shangpingName;
          this.shezhiForm.specs = data.guigeID;
          this.shezhiForm.buyNum = data.buyNum;
          this.shezhiForm.stockUnit = data.danwei;
          this.shezhiForm.Reason = data.beizhu;
          this.shezhiForm.addDate = data.addDate;
          this.shezhiForm.cgstaffName = data.addStaffID;
        } else {
          this.shezhiForm.buyID = 0;
        }
        api
          .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 154 })
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allcampusData = res.obj;
            }
          });
        api.get("/xwcloud-sys/sys/SystemSetting/GetAllStaffList", {}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstaffData = res.obj;
          }
        });
        api
          .get("/xwcloud-zsbm/zsbm/JinXiaoCun/GetAllTeachingSuppliesTypeList", {})
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allgoodsTypeData = res.obj;
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
