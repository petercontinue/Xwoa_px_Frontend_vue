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
      :label-width="100"
      :label-colon="true"
    >
      <Row>
        <Col span="24">
          <FormItem label="商品名称" prop="name">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.name"
              placeholder="请输入商品名称"
              readonly
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="校区" prop="campusID">
            <Select
              v-model="shezhiForm.campusID"
              placeholder="请选择校区"
              disabled
              style="width: 100%"
            >
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
          <FormItem label="商品类别" prop="typeId">
            <Select
              v-model="shezhiForm.typeId"
              placeholder="请选择商品类别"
              disabled
              style="width: 100%"
            >
              <Option
                v-for="item in allgoodsTypeData"
                :value="item.id"
                :key="item.id"
                >{{ item.typeName }}</Option
              >
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="商品规格" prop="specs">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.specs"
              placeholder="请输入商品规格"
              readonly
              style="width: 100%"
            />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="数量单位" prop="StockUnit">
            <Input
              type="text"
              :maxlength="50"
              v-model="shezhiForm.StockUnit"
              placeholder="请输入数量单位"
              readonly
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="当前库存" prop="StockNum">
            <InputNumber
              placeholder="请输入当前库存"
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.StockNum"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="出库数量" prop="outNum">
            <InputNumber
              placeholder="请输入出库数量"
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.outNum"
              style="width: 100%"
              @on-change="changechukusl"
            ></InputNumber>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="剩余数量" prop="shengyuNumber">
            <InputNumber
              placeholder="请输入剩余数量"
              :max="10000000"
              :min="0.01"
              :step="0.01"
              v-model="shezhiForm.shengyuNumber"
              style="width: 100%"
              readonly
            ></InputNumber>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="出库时间" prop="outDate">
            <DatePicker
              type="date"
              placeholder="请选择出库时间"
              v-model="shezhiForm.outDate"
              format="yyyy-MM-dd"
              style="width: 100%"
              :editable="false"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="领用人" prop="lingyongStaffId">
            <Select
              v-model="shezhiForm.lingyongStaffId"
              placeholder="请选择领用人"
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
        <Col span="12">
          <FormItem label="经办人" prop="jibanStaffId">
            <Select
              v-model="shezhiForm.jibanStaffId"
              placeholder="请选择经办人"
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
        <FormItem label="出库说明" prop="outReason">
          <Input
            type="textarea"
            :maxlength="50"
            v-model="shezhiForm.outReason"
            placeholder="请输入出库说明"
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
        id: 0,
        wupintiaoma: "",
        campusID: "",
        typeId: "",
        name: "",
        StockNum: 0,
        StockUnit: "",
        outNum: 0,
        shengyuNumber: 0,
        outDate: "",
        lingyongStaffId: "",
        jibanStaffId: "",
        outReason: "",
      },
      shezhiFormRule: {
        outNum: [
          {
            required: true,
            message: "请输入出库数量",
            trigger: "change",
            type: "number",
          },
        ],
        outDate: [
          {
            required: true,
            message: "请选择出库时间",
            trigger: "change",
            type: "date",
          },
        ],
        lingyongStaffId: [
          {
            required: true,
            message: "请选择领用人",
            trigger: "change",
            type: "string",
          },
        ],
        jibanStaffId: [
          {
            required: true,
            message: "请选择经办人",
            trigger: "change",
            type: "string",
          },
        ],
        outReason: [
          {
            required: true,
            message: "请输入出库说明",
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
          api.post("xwcloud-zsbm/zsbm/JinXiaoCun/Out_supplie",{
            id: this.shezhiForm.id,
            outNum: this.shezhiForm.outNum,
            outReason: this.shezhiForm.outReason,
            lingyongStaffId: this.shezhiForm.lingyongStaffId,
            jibanStaffId: this.shezhiForm.jibanStaffId,
            outDate: toolbox.dateFtt(this.shezhiForm.outDate, "yyyy-MM-dd"),
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
          this.shezhiForm.id = data.id;
          this.shezhiForm.wupintiaoma = data.changpinTiaoma;
          this.shezhiForm.campusID = data.campusID;
          this.shezhiForm.typeId = data.typeId;
          this.shezhiForm.name = data.name;
          this.shezhiForm.specs = data.specs;
          this.shezhiForm.StockNum = Number(data.stockNum);
          this.shezhiForm.StockUnit = data.stockUnit;
          this.shezhiForm.shengyuNumber = Number(data.stockNum);
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
