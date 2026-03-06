<template>
  <Modal v-model="show" title="修改宿舍" :mask-closable="false" @on-cancel="closeModal(false)">
    <Form
      ref="logForm"
      :model="logForm"
      :rules="logFormRule"
      label-position="right"
      :label-width="100"
    >
      <div>
        <FormItem label="校区" prop="campusID">
          <Select v-model="logForm.campusID" placeholder="请选择校区" style="width: 70%">
            <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="宿舍号" prop="RoomNumber">
          <Input v-model="logForm.RoomNumber" placeholder="请输入宿舍号(宿舍名称)..." style="width: 70%" />
        </FormItem>
        <FormItem label="最大人数" prop="renshu">
          <InputNumber :max="100" :min="1" v-model="logForm.renshu" style="width: 70%"></InputNumber>
        </FormItem>
      </div>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveRoom('logForm')">保存</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
export default {
  name: "editstayroom",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ID: { type: String },
  },
  data() {
    return {
      show: this.value,
      logForm: {
        id: "",
        campusID: "",
        RoomNumber: "",
        renshu: 0,
      },
      allcampusData: [], //校区查询获取到的校区数据
      logFormRule: {
        renshu: [
          {
            required: true,
            type: "number",
            message: "请输入最大入住人数",
            trigger: "change",
          },
        ],
        RoomNumber: [
          { required: true, message: "请输入宿舍号（名称）", trigger: "blur" },
        ],
        campusID: [
          { required: true, message: "请选择校区", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["getallcampusList", "updateStay", "geteditStay", "addStay"]),
    
    closeModal(val) {
      this.$emit("input", val);
    },
    /**获取校区 */
    getAllCampusList() {
      this.getallcampusList({ menuID: 217 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },
    /**保存 */
    saveRoom(name) {
      this.logForm.renshu = Number(this.logForm.renshu);
      console.log(this.logForm);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          if (this.ID != 0) {
            this.updateStay(this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.closeModal(false);
              } else {
                this.$Message.error(res.msg);
                this.closeModal(false);
              }
            });
          } else {
            this.addStay(this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                this.$emit("handleSearch");
                this.closeModal(false);
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        } else {
          this.$Message.error("请完成必填项！!");
        }
      });
    },
    /**清除 */
    handleReset() {
      this.$refs["logForm"].resetFields();
      this.closeModal(false);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["logForm"].resetFields();

        console.log(this.ID);
        this.getAllCampusList();
        if (this.ID != 0) {
          this.logForm.id = this.ID;
          this.geteditStay({ id: this.ID }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.logForm.campusID = res.obj.campusID;
              this.logForm.RoomNumber = res.obj.number;
              this.logForm.renshu = res.obj.renshu;
            }
          });
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
