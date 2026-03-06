<template>
  <Modal
    v-model="show"
    title="查询空闲老师"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="70"
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
          <FormItem label="校区" prop="campusID">
            <Select v-model="params.campusID" placeholder="请选择校区">
              <Option
                v-for="item in campusData"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="上课日期" prop="shangkeDate">
            <DatePicker
              type="date"
              placeholder="选择上课日期"
              v-model="params.shangkeDate"
              style="width: 100%"
            ></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
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
        <Col span="12" style="text-align: center">
          <Button type="success" style="width: 50%" @click="searchTeacher"
            >查询</Button
          >
        </Col>
      </Row>
    </Form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          @on-search="onSearch"
          ref="selection"
          :columns="columns"
          :data="data"
        ></Table>
      </Col>
    </Row>
    <Row style="margin-top: 15px">
    <Page
        :total="total"
        show-elevator
        show-total
        show-sizer
        prev-text="上一页"
        next-text="下一页"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
      />
    </Row>
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
        campusID: "",
        shangkeDate: "",
        shangkeTime: "",
      },
      paramsRule: {
        // 验证输入
        campusID: [
          {
            required: true,
            message: "请选择校区",
            trigger: "blur",
            type: "string",
          },
        ],
        shangkeDate: [
          {
            required: true,
            message: "请选择上课日期",
            trigger: "blur",
            type: "date",
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
      campusData: [],
      columns: [
        {
          title: "教师姓名",
          key: "staffName",
          align: "center",
        },
        {
          title: "校区",
          key: "campusName",
          align: "center",
        },
        {
          title: "部门",
          key: "staffpostName",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      paikeid: 0,
      searchteacherName: "",
    };
  },
  methods: {
    ok() {
      this.closeModal(false);
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    getstuList() {
      console.log(this.params);
      api.get("xwcloud-pkxk/paike/paikexiaoke/getkongxianTeacher",{
        current: this.current,
        size: this.size,
        campusID: this.params.campusID,
        haveClassDate: toolbox.dateFtt(this.params.shangkeDate, "yyyy-MM-dd"),
        starTime: this.params.shangkeTime[0],
        endTime: this.params.shangkeTime[1],
        TeacherName: this.searchteacherName,
      }).then((res) => {
         if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
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
        api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{menuID:241}).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.campusData = res.obj;
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
