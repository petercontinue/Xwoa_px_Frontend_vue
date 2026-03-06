<template>
  <Modal
    v-model="show"
    title="添加/修改学员考级"
    :mask-closable="false"
    width="40"
    @on-cancel="closeModal(false)"
  >
    <Form ref="logForm" :model="logForm" :rules="logFormRule" :label-width="100">
      <Row class="divShow">
        <Col span="16" offset="4">
          <FormItem label="学员:" prop="stuID">
            <Select v-model="logForm.stuID" @on-change="getsubject" filterable>
              <Option v-for="item in allstu" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row class="divShow">
        <Col span="16" offset="4">
          <FormItem label="科目:" prop="kemuid">
            <Select v-model="logForm.kemuid" filterable>
              <Option v-for="item in allsubject" :value="item.id" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row class="divShow">
        <Col span="16" offset="4">
          <FormItem label="当前等级:" prop="jibie">
            <Input v-model="logForm.jibie" />
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="primary" v-if="type==1" @click="saveKaoji('logForm',1)">保存并继续添加</Button>
      <Button type="primary" @click="saveKaoji('logForm',2)">保存并关闭</Button>
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
  name: "addOreditkaoji",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    kjdata: { type: String },
    type: { type: Number },
  },
  data() {
    return {
      show: this.value,
      logFormRule: {
        stuID: [{ required: true, message: "请选择学员", trigger: "change" }],
        kemuid: [{ required: true, message: "请选择科目", trigger: "change" }],
        jibie: [{ required: true, message: "请输入当前级别", trigger: "blur" }],
      },
      logForm: {
        kjID: "",
        stuID: "",
        kemuid: "",
        jibie: "",
      },
      getData: JSON,
      stucampusID: "",
      allstu: [],
      allsubject: [],
    };
  },
  methods: {

    /**保存 */
    saveKaoji(name, type) {
      this.$refs[name].validate((valid) => {
        console.log(valid);
        if (valid) {
          if (this.type == 1) {
            //添加
            api.post("xwcloud-stu/stu/buxikecheng/addKaoJI",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.$refs[name].resetFields();
                this.allstu = [];
                this.allsubject = [];
                if (type == 2) {
                  this.closeModal(false);
                }
              } else {
                this.$Message.error(res.msg);
                this.closeModal(false);
              }
            });
          } else if (this.type == 2) {
            //修改
            api.post("xwcloud-stu/stu/buxikecheng/updateKaoJI",this.logForm).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.$refs[name].resetFields();
                this.allstu = [];
                this.allsubject = [];
                this.closeModal(false);
              } else {
                this.$Message.error("保存失败");
                this.closeModal(false);
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
    closeModal(val) {
      this.$emit("input", val);
    },
    /**获取所有学员 */
    GetAllSelectedStuNamesList() {
      api.get("xwcloud-stu/stu/buxikecheng/GetAllSelectedStuNames",{ menuID: 226 }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allstu = res.obj;
          if (this.type == 2) {
            this.logForm.stuID = this.getData.stuID;
            this.logForm.kjID = this.getData.id;
            this.logForm.kemuid = this.getData.subjectID;
            this.logForm.jibie = this.getData.jibie;
            this.getsubject();
          }
        }
      });
    },
    /**获取学员的科目 */
    getsubject() {
      this.allstu.forEach((item) => {
        if (item.id == this.logForm.stuID) {
          this.stucampusID = item.campusID;
          api.get("xwcloud-stu/stu/buxikecheng/GetcampusIDkemu",{ campusID: this.stucampusID }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allsubject = res.obj;
            }
          });
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      if (val) {
        this.GetAllSelectedStuNamesList();
        if (this.type == 2) {
          this.getData = JSON.parse(this.kjdata);
        }
        console.log(this.logForm);
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
