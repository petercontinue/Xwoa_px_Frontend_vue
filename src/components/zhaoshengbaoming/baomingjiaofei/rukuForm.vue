<template>
  <Modal
    v-model="show"
    title="商品入库"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
  >
    <Form
      ref="shezhiForm"
      :model="shezhiForm"
      :rules="shezhiFormRule"
      :label-width="150"
      :label-colon="true"
    >
      <Row
        ><FormItem label="商品条码" prop="wupintiaoma">
          <Input
            type="text"
            :maxlength="50"
            v-model="shezhiForm.wupintiaoma"
            placeholder="请输入商品条码"
          />
        </FormItem>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select v-model="shezhiForm.campusID" placeholder="请选择校区">
              <Option
                v-for="item in allcampusData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="商品名称" prop="name">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.name"
              placeholder="请输入商品名称"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="商品类别" prop="typeId">
            <Select v-model="shezhiForm.typeId" placeholder="请选择商品类别">
              <Option
                v-for="item in allgoodsTypeData"
                :value="item.id"
                :key="item.id"
                >{{ item.typeName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="商品规格" prop="specs">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.specs"
              placeholder="请输入商品规格"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="入库数量" prop="StockNum">
            <InputNumber
              placeholder="请输入入库数量"
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.StockNum"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="数量单位" prop="StockUnit">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.StockUnit"
              placeholder="请输入数量单位"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="进货单价" prop="buyPrice">
            <InputNumber
              placeholder="请输入进货单价"
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.buyPrice"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="官方指导销售价" prop="salePrice">
            <InputNumber
              placeholder="请输入官方指导销售价"
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.salePrice"
              style="width: 100%"
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="入库时间" prop="addDate">
            <DatePicker
              type="date"
              placeholder="请选择入库时间"
              v-model="shezhiForm.addDate"
              format="yyyy-MM-dd"
              style="width: 100%"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="采购人" prop="acceptStaffId">
            <Select
              v-model="shezhiForm.acceptStaffId"
              placeholder="请选择采购人"
              style="width: 100%"
              filterable
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
        <FormItem label="入库说明" prop="addReason">
          <Input
            type="textarea"
            :maxlength="50"
            v-model="shezhiForm.addReason"
            placeholder="请输入入库说明"
          />
        </FormItem>
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
        id: 0,
        wupintiaoma: "",
        campusID: "",
        typeId: "",
        name: "",
        StockNum: 0,
        specs:"",
        StockUnit: "",
        buyPrice: 0,
        salePrice: 0,
        addDate: "",
        acceptStaffId: "",
        addReason: "",
      },
      shezhiFormRule: {
        wupintiaoma: [
          {
            required: true,
            message: "请输入物品条码",
            trigger: "change",
            type: "string",
          },
        ],
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "change",
            type: "string",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "change",
            type: "string",
          },
        ],
        specs: [
          {
            required: true,
            message: "请输入商品规格",
            trigger: "change",
            type: "string",
          },
        ],
        typeId: [
          {
            required: true,
            message: "请选择商品类别",
            trigger: "change",
            type: "string",
          },
        ],
        StockNum: [
          {
            required: true,
            message: "请输入入库数量",
            trigger: "change",
            type: "number",
          },
        ],
        StockUnit: [
          {
            required: true,
            message: "请输入数量单位",
            trigger: "change",
            type: "string",
          },
        ],
        buyPrice: [
          {
            required: true,
            message: "请输入进货单价",
            trigger: "change",
            type: "number",
          },
        ],
        salePrice: [
          {
            required: true,
            message: "请输入官方指导销售价",
            trigger: "change",
            type: "number",
          },
        ],
        addDate: [
          {
            required: true,
            message: "请选择入库时间",
            trigger: "change",
            type: "date",
          },
        ],
        acceptStaffId: [
          {
            required: true,
            message: "请选择采购人",
            trigger: "change",
            type: "string",
          },
        ],
        addReason: [
          {
            required: true,
            message: "请输入入库说明",
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
          api.post("xwcloud-zsbm/zsbm/JinXiaoCun/Enter_supplies",{
            campusID: this.shezhiForm.campusID,
            id: this.shezhiForm.id,
            acceptStaffId: this.shezhiForm.acceptStaffId,
            typeId: this.shezhiForm.typeId,
            name: this.shezhiForm.name,
            specs: this.shezhiForm.specs,
            stockNum: this.shezhiForm.StockNum,
            stockUnit: this.shezhiForm.StockUnit,
            addReason: this.shezhiForm.addReason,
            addDate: this.shezhiForm.addDate,
            buyPrice: this.shezhiForm.buyPrice,
            salePrice: this.shezhiForm.salePrice,
            wupintiaoma: this.shezhiForm.wupintiaoma,
          }).then((res) => {
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
            }
            // 官方目前没有解决方案
            this.loading = false;
            setTimeout(() => {
              this.loading = true;
            }, 0);
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
        this.$refs["shezhiForm"].resetFields();
        if (this.editdata != "") {
          let data = JSON.parse(this.editdata);
          console.log(data);
          this.shezhiForm.id = data.id;
          this.shezhiForm.wupintiaoma = data.changpinTiaoma;
          this.shezhiForm.campusID = data.campusID;
          this.shezhiForm.typeId = data.typeId;
          this.shezhiForm.name = data.name;
          this.shezhiForm.specs = data.specs;
          this.shezhiForm.StockNum = Number(data.stockNum);
          this.shezhiForm.StockUnit = data.stockUnit;
          this.shezhiForm.buyPrice = data.buyPrice;
          this.shezhiForm.salePrice = data.salePrice;
          this.shezhiForm.addDate = data.addDate;
          this.shezhiForm.acceptStaffId = data.yanshouStaffId;
          this.shezhiForm.addReason = data.rukuShuoming;
        } else {
          this.shezhiForm.id = 0;
        }
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{ menuID: 153 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-sys/sys/SystemSetting/GetAllStaffList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstaffData = res.obj;
          }
        });
        api.get("xwcloud-zsbm/zsbm/JinXiaoCun/GetAllTeachingSuppliesTypeList",{}).then((res) => {
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
