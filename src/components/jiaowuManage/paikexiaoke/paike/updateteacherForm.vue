<template>
  <Modal
    v-model="show"
    title="按时间段修改排课老师"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="addliushuiForm"
      :model="params"
      :rules="paramsRule"
      :label-width="130"
      :label-colon="true"
    >
      <Row>
        <Col span="12">
          <FormItem label="原上课老师" prop="oldteacherID">
            <Select
              v-model="params.oldteacherID"
              placeholder="请选择原上课老师"
            >
              <Option
                v-for="item in allteacherData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="新上课老师" prop="newteacherID">
            <Select
              v-model="params.newteacherID"
              placeholder="请选择新上课老师"
            >
              <Option
                v-for="item in allteacherData"
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
          <FormItem label="上课日期" prop="shangkeDate">
            <DatePicker
              type="daterange"
              placeholder="选择上课日期"
              v-model="params.shangkeDate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="上课时间" prop="shangkeTime">
            <TimePicker
              type="timerange"
              placeholder="请选择上课时间"
              v-model="params.shangkeTime"
              style="width: 100%"
               format="HH:mm"
            ></TimePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "searchteacher",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        oldteacherID: "",
        newteacherID: "",
        shangkeDate: "",
        shangkeTime: "",
      },
      paramsRule: {
        // 验证输入
        oldteacherID: [
          {
            required: true,
            message: "请选择原上课老师",
            trigger: "blur",
            type: "string",
          },
        ],
        newteacherID: [
          {
            required: true,
            message: "请选择新上课老师",
            trigger: "blur",
            type: "string",
          },
        ],
        shangkeDate: [
          {
            required: true,
            message: "请选择上课日期",
            trigger: "blur",
            type: "array",
          },
        ],
        shangkeTime: [
          {
            required: true,
            message: "请选择上课时间",
            trigger: "blur",
            type: "array",
          },
        ],
      },
      allteacherData: [],
      classRoomName: "",
    };
  },
  methods: {
    ok() {
      this.closeModal(false);
      api.get("xwcloud-pkxk/paike/paikexiaoke/upDateTeacherByTime",{
        startDate: toolbox.dateFtt(this.params.shangkeDate[0], "yyyy-MM-dd"),
        endDate: toolbox.dateFtt(this.params.shangkeDate[1], "yyyy-MM-dd"),
        startLessonDateTime: this.params.shangkeTime[0],
        endLessonDateTime: this.params.shangkeTime[1],
        oldteaTeidt: this.params.oldteacherID,
        newteaTeidt: this.params.newteacherID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success("修改成功");
          this.$emit("handleSearch");
        }
      });
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    getstuList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getkongxianClassRoom",{
        current: this.current,
        size: this.size,
        campusID: this.params.campusID,
        haveClassDate: toolbox.dateFtt(this.params.shangkeDate, "yyyy-MM-dd"),
        starTime: this.params.shangkeTime[0],
        endTime: this.params.shangkeTime[1],
        classRoomName: this.classRoomName,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
          this.total = Number(res.obj.total);
        }
      });
    },
    changePage(current) {
      this.current = current;
      this.getstuList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getstuList();
    },
    onSearch(search) {
      window.console.log(search);
    },
    searchTeacher() {
      this.$refs["addliushuiForm"].validate((valid) => {
        if (valid) {
          this.getstuList();
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
  },
  watch: {
    value(val) {
      // 当value改变时
      this.show = val;
    },
    show(val) {
      // 当show改变时
      //当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.$refs["addliushuiForm"].resetFields();
        api.get("xwcloud-pkxk/paike/paikexiaoke/getallstaff",{}).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.allteacherData = res.obj;
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
