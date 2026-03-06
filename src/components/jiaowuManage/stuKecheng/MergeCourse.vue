<template>
  <Modal
    v-model="show"
    title="课程合并"
    :mask-closable="false"
    width="40"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="180">
      <div>
        <Row class="divShow">
          <Col span="5" offset="2">
            <label>原培训课程:</label>
          </Col>
          <Col span="15">
            <label>
              {{ oldkechengName }}，单价{{logForm.oldkcprice}}元/课时，剩余课时数：
              <font
                style="color: red"
              >{{logForm.oldkeshi}}</font>
            </label>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="5" offset="2">
            <label>原培训课程:</label>
          </Col>
          <Col span="12">
            <label>选择将原课程课时并入到哪个课程</label>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="19">
            <FormItem label="并入到哪个课程:" prop="newbxID">
              <Select
                v-model="logForm.newbxID"
                filterable
                placeholder="请选择培训课程"
                @on-change="changekc"
              >
                <Option v-for="item in allkc" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="5" offset="2">
            并入课程的单价
            <font style="color: red">*</font>:
          </Col>
          <Col span="4">
            <Input v-model="logForm.newkc_price" type="number" style="width: 100px" readonly />
          </Col>
          <Col span="11">
            <font style="color: green">温馨提示：原课程并入过来的时候，会根据单价来进行课时的折算；</font>
          </Col>
        </Row>
        <Row class="divShow">
          <Col span="5" offset="2">
            并入后的总课时
            <font style="color: red">*</font>:
          </Col>
          <Col span="4">
            <Input v-model="logForm.new_allkeshi" type="number" style="width: 100px" readonly />
          </Col>
          <Col span="13">
            <font style="color: blue">并入后的总课时=原剩余课时+并入进来的折算课时</font>
          </Col>
        </Row>
      </div>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="saveMerge('logForm')">保存</Button>
      <Button @click="handleReset('logForm')" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style>
.divShow {
  margin-top: 10px;
}
</style>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "MergeCourse",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    buxi: { type: String },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {
        newbxID: [
          {
            required: true,
            message: "请选择要合并到的课程",
            trigger: "change",
          },
        ],
      },

      logForm: {
        oldbxID: "",
        newbxID: "",
        newkc_price: "",
        newkc_keshi: "",
        new_allkeshi: "",
        oldkeshi: "",
        oldkcprice: 0,
      },
      allkc: [],
      getData: JSON,
      oldkechengName: "",
    };
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    changekc() {
      this.allkc.forEach((item) => {
        if (item.id == this.logForm.newbxID) {
          this.logForm.newkc_price = item.kechengprice;
          this.logForm.newkc_keshi = item.remainkeshi;
          this.logForm.new_allkeshi =
            this.logForm.newkc_keshi +
            (this.logForm.oldkeshi * this.logForm.oldkcprice) /
              this.logForm.newkc_price;
          // ((Number(this.logForm.newkc_price)*Number(this.logForm.newkc_keshi))+(Number(this.oldkeshi)*this.oldkcprice))/Number(this.logForm.newkc_price);
          console.log(this.logForm.new_allkeshi);
        }
      });
    },

    /**保存 */
    saveMerge(name) {
      console.log(this.edit);
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          if (this.logForm.newbxID == "") {
            this.$Message.error("请选择要合并到的课程");
          } else {
            api.post("xwcloud-stu/stu/buxikecheng/MergeCourse",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success(res.msg);
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.getData = null;
                this.oldkechengName = "";
                this.logForm = this.$options.data().logForm;
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
    handleReset(name) {
      this.$refs[name].resetFields();
      this.closeModal(false);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        this.getData = JSON.parse(this.buxi);
        this.logForm.oldbxID = this.getData.id;
        this.oldkechengName = this.getData.buxiCourse;
        this.logForm.oldkeshi = Number(this.getData.remainkeshi);
        this.logForm.oldkcprice = this.getData.coursePrice;
        api.get("xwcloud-stu/stu/buxikecheng/getHebingTokecheng",{ oldbuxiID: this.logForm.oldbxID }).then(
          (res) => {
            if (res.code == "Y" && res.success == true) {
              console.log(res);
              this.allkc = res.obj;
            }
          }
        );
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
