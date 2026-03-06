<template>
  <Modal
    v-model="show"
    title="修改图书"
    @on-ok="ok"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="50"
  >
    <Form
      ref="bookFrom"
      :model="params"
      :rules="paramsRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="学员校区" prop="campusID">
        <Select v-model="params.campusID" placeholder="请选择校区">
          <Option
            v-for="item in allcampusData"
            :value="item.id"
            :key="item.id"
            >{{ item.campusName }}</Option
          >
        </Select>
      </FormItem>
      <FormItem label="名称" prop="booksName">
        <Input v-model="params.booksName" placeholder="请输入名称" />
      </FormItem>
      <FormItem label="总数量" prop="allnum">
        <Input v-model="params.allnum" placeholder="请输入总数量" />
      </FormItem>
      <FormItem label="作者">
        <Input v-model="params.author" placeholder="请输入作者" />
      </FormItem>
      <FormItem label="出版社">
        <Input v-model="params.press" placeholder="请输入出版社" />
      </FormItem>
      <FormItem label="版次">
        <Input v-model="params.banci" placeholder="请输入版次" />
      </FormItem>
      <FormItem label="ISBN">
        <Input v-model="params.isbn" placeholder="请输入ISBN" />
      </FormItem>
      <FormItem label="出版日期">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          type="date"
          placeholder="请选择出版日期"
          v-model="params.chubanDate"
          @on-change="setchubanriqi"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
      <FormItem label="是否带答案册">
        <RadioGroup v-model="params.iSdaance">
          <Radio label="true">
            <span>是</span>
          </Radio>
          <Radio label="false">
            <span>否</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="是否带光盘">
        <RadioGroup v-model="params.iSdisc">
          <Radio label="true">
            <span>是</span>
          </Radio>
          <Radio label="false">
            <span>否</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="备注">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="params.neirong"
          placeholder="请输入备注"
        />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "editbooks",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    IDs: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        id: this.IDs,
        campusID: "",
        booksName: "",
        allnum: "",
        cunnum: "",
        iSdaance: "",
        iSdisc: "",
        author: "",
        press: "",
        chubanDate: "",
        banci: "",
        isbn: "",
        bookLocationCode: "",
        shuoming: ""
      },
      paramsRule: {
        // 验证输入
        campusID: [{ required: true, message: "请选择校区", trigger: "blur" }],
        booksName: [
          { required: true, message: "请输入图书名称", trigger: "blur" },
        ],
        allnum: [
          { required: true, message: "请输入图书数量", trigger: "blur",type:"number" },
        ],
      },
      allcampusData: [], // 班级数据列表
    };
  },
  methods: {
    ok() {
      api.post("xwcloud-homeschool/homeschool/pxbooks/editBook",this.params).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          // 提交表单数据成功则关闭当前的modal框
          this.closeModal(false);
          // 同时调用父页面的刷新页面的方法
          this.$emit("handleSearch");
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    setchubanriqi(val) {
      this.params.chubanDate = toolbox.dateFtt(val, "yyyy-MM-dd");
    },
    closeModal(val) {
      // 改变v-model 绑定的值
      this.$emit("input", val);
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
        this.$refs["bookFrom"].resetFields();
        this.params.id = this.IDs;
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList",{}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-homeschool/homeschool/pxbooks/getPxbook",{
          id: this.IDs,
        }).then((res) => {
          console.log(res.obj);
          if (res.code == "Y" && res.success == true) {
            // 获取作业信息
            this.params.campusID = res.obj.campusID;
            this.params.booksName = res.obj.booksName;
            this.params.allnum = res.obj.allnum;
            this.params.author = res.obj.author;
            this.params.press = res.obj.press;
            this.params.banci = res.obj.banci;
            this.params.isbn = res.obj.isbn;
            this.params.chubanDate = toolbox.dateFtt(
              res.obj.chubanDate,
              "yyyy-MM-dd"
            );
            this.params.iSdaance = res.obj.iSdaance + "";
            this.params.iSdisc = res.obj.iSdisc + "";
            this.params.shuoming = res.obj.shuoming;
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
