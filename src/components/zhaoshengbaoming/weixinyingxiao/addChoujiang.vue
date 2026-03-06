<template>
  <Modal
    v-model="show"
    title="添加/修改抽奖活动"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="addchoujiang"
      :model="addchoujiang"
      :rules="addchoujiangRule"
      :label-width="200"
      :label-colon="true"
    >
      <Row>
        <Col span="24">
          <FormItem label="抽奖活动名称（最多50字）" prop="choujianghuodongname">
            <Input
              type="text"
              v-model="addchoujiang.choujianghuodongname"
              placeholder="请输入活动名称"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="抽奖次数限制" prop="choujiangstyle">
            <Select v-model="addchoujiang.choujiangstyle">
              <Option :value="1" :key="1">一个人共能抽奖多少次</Option>
              <Option :value="2" :key="2">一个人每天能抽多少次</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="抽奖次数" prop="cishu">
            <Input
              type="number"
              v-model="addchoujiang.cishu"
              placeholder="请输入抽奖次数"
              style="width: 100%"
            />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="活动开始日期" prop="starttime">
            <DatePicker
              type="date"
              placement="bottom-end"
              placeholder="选择活动开始日期"
              style="width: 100%"
              v-model="addchoujiang.starttime"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="活动结束日期" prop="endtime">
            <DatePicker
              type="date"
              placement="bottom-end"
              placeholder="选择活动结束日期"
              style="width: 100%"
              v-model="addchoujiang.endtime"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="活动简介" prop="shuoming">
            <edit
              @increment="changejiangpingInfo"
              v-model="edshow"
              :detailInfo="addchoujiang.shuoming"
            ></edit>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import edit from "@/components/zhaoshengbaoming/wxmall/edit.vue";
import * as api from "@/api/api.js";
export default {
  components: {
    edit,
  },
  name: "addChoujiang",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    Addtype: {
      type: String,
    },
    editData: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      edshow: false,
      addchoujiang: {
        choujianghuodongname: "",
        shuoming: "",
        starttime: "",
        endtime: "",
        choujiangstyle: "",
        cishu: "",
      },
      getData: JSON,
      huodongDate: "",
      addchoujiangRule: {
        choujianghuodongname: [
          {
            required: true,
            message: "请输入抽奖活动名称",
            trigger: "blur",
            type: "string",
          },
        ],
        choujiangstyle: [
          {
            required: true,
            message: "抽奖次数限制",
            trigger: "change",
            type: "number",
          },
        ],
        cishu: [
          {
            required: true,
            message: "请输入抽奖次数",
            trigger: "blur",
            type: "string",
          },
        ],
        shuoming: [
          {
            required: true,
            message: "请输入活动简介",
            trigger: "blur",
            type: "string",
          },
        ],
        starttime: [
          {
            required: true,
            type: "date",
            message: "请选择开始时间",
            trigger: "change",
          },
        ],
        endtime: [
          {
            required: true,
            type: "date",
            message: "请选择截止时间",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    ok() {
      console.log(this.addchoujiang);
      this.$refs["addchoujiang"].validate((valid) => {
        if (valid) {
          if (this.Addtype == "1") {
            api.get("xwcloud-wsc/wsc/whdChoujiang/addWhdChoujiangHuodong",this.addchoujiang).then((res) => {
              if (res.code == "Y" && res.success == true) {
                this.$Message.success("保存成功");
                // 同时调用父页面的刷新页面的方法
                this.$emit("handleSearch");
                this.closeModal(false);
              } else {
                this.$Message.error("保存失败");
                this.closeModal(false);
              }
            });
          } else if (this.Addtype == "2") {
            api.post("xwcloud-wsc/wsc/whdChoujiang/updateWhdChoujiangHuodongByID",this.addchoujiang).then(
              (res) => {
                if (res.code == "Y" && res.success == true) {
                  this.$Message.success("保存成功");
                  // 同时调用父页面的刷新页面的方法
                  this.$emit("handleSearch");
                  this.closeModal(false);
                } else {
                  this.$Message.error("保存失败");
                  this.closeModal(false);
                }
              }
            );
          }
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

    closeModal(val) {
      this.$emit("input", val);
    },

    changejiangpingInfo(data) {
      this.addchoujiang.shuoming = data;
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        console.log(this.Addtype);
        this.$refs["addchoujiang"].resetFields();
        if (this.Addtype == "2") {
          //修改
          this.getData = JSON.parse(this.editData);
          console.log(this.getData);
          this.addchoujiang.choujianghuodongname =
            this.getData.choujiangHuodongName;
          this.addchoujiang.shuoming = this.getData.shuoming;
          this.addchoujiang.starttime = toolbox.dateFtt(
            this.getData.startTime,
            "yyyy-MM-dd hh:mm"
          );

          this.addchoujiang.endtime = toolbox.dateFtt(
            this.getData.endTime,
            "yyyy-MM-dd hh:mm"
          );

          this.addchoujiang.choujiangstyle = this.getData.choujiangStyle;
          this.addchoujiang.cishu = this.getData.cishu;
          this.edshow = true;
          console.log(this.addchoujiang);
        }
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
