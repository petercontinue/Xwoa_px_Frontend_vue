<template>
  <Modal
    v-model="show"
    title="班级学生信息"
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
          <FormItem label="学生" prop="stuID">
            <Select
              v-model="params.stuID"
              placeholder="请选择学生"
              @on-change="changestu"
            >
              <Option v-for="item in stuData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="课程" prop="kechengID">
            <Select v-model="params.kechengID" placeholder="请选择课程">
              <Option v-for="item in kechengData" :value="item.id" :key="item.id">{{
                item.name
              }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <Button type="success" @click="addstu">添加学生</Button>
          <Button type="warning" @click="resetstu">重置学生</Button>
        </Col>
      </Row>
      <Row>
        <Button type="warning" @click="deletexuanzhong">移除选中学员</Button>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="24">
          <Table
            border
            highlight-row
            ref="selection"
            @on-row-click="onClickRow"
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
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  components: {},
  name: "addliushuiForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    classID: {
      type: String,
    },
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        stuID: "",
        kechengID: "",
      },
      paramsRule: {
        // 验证输入
        stuID: [{ required: true, message: "请选择学生", trigger: "blur" }],
        kechengID: [{ required: true, message: "请选择课程", trigger: "blur" }],
      },
      stuData: [],
      kechengData: [],
      checkList: [],
      columns: [
        {
          title: " ",
          align: "center",
          key: "checkBox",
          width: 60,
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row._checked,
                },
                on: {
                  "on-change": (e) => {},
                },
              }),
            ]);
          },
        },
        {
          title: "学号",
          key: "id",
          align: "center",
        },
        {
          title: "姓名",
          key: "stuName",
          align: "center",
        },
        {
          title: "类型",
          key: "beizhu",
          align: "center",
          render: (h, params) => {
            if (params.row.type == 1) {
              return h("div", [h("span", { style: { color: "green" } }, "（原班学员）")]);
            } else {
              return h("div", [h("span", { style: { color: "red" } }, "（新加学员）")]);
            }
          },
        },
        {
          title: "补习课程",
          key: "kechengName",
          align: "center",
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      //classinfoID: this.classID,
      paikeid: 0,
    };
  },
  methods: {
    onClickRow(row, index) {
      this.checkList = [];
      if (this.$refs.selection.data[index]._checked == true) {
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
      } else {
        this.data.forEach((items) => {
          //先取消所有对象的勾选，checkBox设置为false
          this.$set(items, "_checked", false);
        });
        //改变为勾选样式
        this.$refs.selection.data[index]._checked = !this.$refs.selection.data[index]
          ._checked;
        this.checkList = this.$refs.selection.data[index];
      }
    },

    ok() {
      this.$emit("increment", JSON.stringify(this.data));
      this.closeModal(false);
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
    },
    getstuList() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/GetClassStuList",{
        classID: this.classID,
        paikeid: this.paikeid,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "_checked", false);
          });
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
    changestu() {
      api.get("xwcloud-pkxk/paike/paikexiaoke/getxkStu",{ stuID: this.params.stuID }).then((res) => {
        console.log(res);
        if (res.code == "Y" && res.success == true) {
          this.kechengData = res.obj;
        }
      });
    },
    //新增加排课学员
    addstu() {
      this.stuData.forEach((element) => {
        if (element.id == this.params.stuID) {
          this.kechengData.forEach((item) => {
            if (item.id == this.params.kechengID) {
              this.data.push({
                bxID: item.id,
                id: element.id,
                is1v1Class: 0,
                kechengName: item.name,
                stuName: element.name,
                type: 2,
                _checked: false,
              });
            }
          });
        }
      });
    },
    //重置排课学员
    resetstu() {
      this.data = [];
      this.getstuList();
    },
    //移除选中学员
    deletexuanzhong() {
      this.$Modal.confirm({
        title: "删除数据",
        content: "<p>确定要删除数据吗?</p>",
        onOk: () => {
          for (var i = 0; i < this.data.length; i++) {
            if (this.data[i]._checked) {
              this.data.splice(i, 1);
            }
          }
        },
        onCancel: () => {},
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
        this.getstuList();
        api.get("xwcloud-pkxk/paike/paikexiaoke/GetcampusStuName",{}).then((res) => {
          console.log(res);
          if (res.code == "Y" && res.success == true) {
            this.stuData = res.obj;
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
