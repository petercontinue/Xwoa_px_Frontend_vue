<template>
  <Modal v-model="show" title="借书" :mask-closable="false" width="60">
    <Form
      ref="bookFrom"
      :model="jieshuparams"
      :rules="paramsRule"
      :label-width="150"
      :label-colon="true"
    >
      <FormItem label="学员校区">
        <Select disabled v-model="params.campusID" placeholder="请选择校区">
          <Option v-for="item in allcampusData" :value="item.id" :key="item.id">{{
            item.campusName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="图书名称">
        <Input v-model="params.booksName" placeholder="请输入名称" disabled />
      </FormItem>
      <FormItem label="总数量">
        <Input v-model="params.allnum" placeholder="请输入总数量" disabled />
      </FormItem>
      <FormItem label="作者">
        <Input v-model="params.author" placeholder="请输入作者" disabled />
      </FormItem>
      <FormItem label="出版社">
        <Input v-model="params.press" placeholder="请输入出版社" disabled />
      </FormItem>
      <FormItem label="版次">
        <Input v-model="params.banci" placeholder="请输入版次" disabled />
      </FormItem>
      <FormItem label="ISBN">
        <Input v-model="params.isbn" placeholder="请输入ISBN" disabled />
      </FormItem>
      <FormItem label="出版日期">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          disabled
          type="date"
          placeholder="请选择出版日期"
          v-model="params.chubanDate"
          @on-change="setchubanriqi"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
      <FormItem label="是否带答案册">
        <RadioGroup v-model="params.iSdaance" disabled>
          <Radio label="true" disabled>
            <span>是</span>
          </Radio>
          <Radio label="false" disabled>
            <span>否</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="是否带光盘">
        <RadioGroup v-model="params.iSdisc" disabled>
          <Radio label="true" disabled>
            <span>是</span>
          </Radio>
          <Radio label="false" disabled>
            <span>否</span>
          </Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="备注" prop="">
        <Input
          type="textarea"
          :rows="4"
          :maxlength="100"
          v-model="jieshuparams.beizhu"
          placeholder="请输入备注"
        />
      </FormItem>
      <FormItem label="角色" prop="role">
        <Select v-model="jieshuparams.role" placeholder="请选择">
          <Option v-for="item in roleData" :value="item.id" :key="item.id">{{
            item.roleName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="姓名" prop="people">
        <Select
          v-model="jieshuparams.people"
          placeholder="请选择"
          v-if="jieshuparams.role == 1"
        >
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
        <Select
          v-model="jieshuparams.people"
          placeholder="请选择"
          v-if="jieshuparams.role == 2"
        >
          <Option v-for="item in allstuData" :value="item.id" :key="item.id">{{
            item.stuName
          }}</Option>
        </Select>
      </FormItem>
      <FormItem label="库存数量">
        <Input v-model="params.cunnum" placeholder="请输入总数量" disabled />
      </FormItem>
      <FormItem label="借出数量" prop="borrownum">
        <Input v-model="jieshuparams.borrownum" placeholder="请输入总数量" />
      </FormItem>
      <FormItem label="归还时间" prop="endDate">
        <!-- <DatePicker type="date" placeholder="Select date" ></DatePicker> -->
        <DatePicker
          type="date"
          placeholder="请选择归还时间"
          v-model="jieshuparams.endDate"
          @on-change="setchubanriqi"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
      <FormItem label="借出时间" prop="doDate">
        <DatePicker
          type="date"
          placeholder="请选择借出时间"
          v-model="jieshuparams.doDate"
          @on-change="setdjsj"
          style="width: 100%"
        ></DatePicker>
      </FormItem>
      <FormItem label="经办人" prop="dostaffID">
        <Select v-model="jieshuparams.dostaffID" placeholder="请选择">
          <Option v-for="item in allstaffData" :value="item.id" :key="item.id">{{
            item.staffName
          }}</Option>
        </Select>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(fasle)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "jieshuForm",
  props: {
    value: {
      type: Boolean, // 父页面传来的值
      default: false,
    },
    bookID: {},
  },
  data() {
    return {
      show: this.value, // 父页面传来的值
      loading: true,
      params: {
        id: this.bookID,
        campusID: "",
        booksName: "",
        allnum: "",
        cunnum: "",
        iSdaance: "false",
        iSdisc: "false",
        author: "",
        press: "",
        chubanDate: "",
        banci: "",
        isbn: "",
        bookLocationCode: "",
        shuoming: "",
        addstaffID: "",
        addDate: "",
      },
      jieshuparams: {
        booksID: "",
        people: "",
        role: null,
        borrownum: "",
        endDate: "",
        dostaffID: "",
        doDate: "",
        beizhu: "",
      },
      paramsRule: {
        // 验证输入
        role: [
          { required: true, type: "number", message: "请选择角色", trigger: "change" },
        ],
        people: [{ required: true, message: "请选择姓名", trigger: "change" }],
        borrownum: [{ required: true, message: "请输入借阅数量", trigger: "blur" }],
        endDate: [
          {
            required: true,
            message: "请选择时间",
            // type: "date",
            type: "string",
            trigger: "change",
          },
        ],
        doDate: [
          {
            required: true,
            message: "请选择经办时间",
            // type: "date",
            type: "string",
            trigger: "change",
          },
        ],
        dostaffID: [{ required: true, message: "请选择经办人", trigger: "change" }],
      },
      allcampusData: [],
      allstaffData: [],
      allstuData: [],
      roleData: [
        { id: 2, roleName: "学生" },
        { id: 1, roleName: "教师" },
      ],
    };
  },
  methods: {
    ok() {
      this.$refs["bookFrom"].validate((valid) => {
        if (valid) {
          api
            .post("xwcloud-homeschool/homeschool/pxbooks/borrowBooks", this.jieshuparams)
            .then((res) => {
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
        } else {
          this.$Message.error("请完成必填项");
        }
      });
    },
    setchubanriqi(val) {
      // 还书时间
      this.jieshuparams.endDate = toolbox.dateFtt(val, "yyyy-MM-dd");
    },
    setdjsj(val) {
      // 借书时间
      this.jieshuparams.doDate = toolbox.dateFtt(val, "yyyy-MM-dd");
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
        this.params.id = this.bookID;
        this.jieshuparams.booksID = this.bookID;
        // 获取校区列表
        api.get("xwcloud-homeschool/homeschool/public/getCampusList", {}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
        api.get("xwcloud-homeschool/homeschool/public/getStaffList", {}).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allstaffData = res.obj;
          }
        });
        api
          .get("xwcloud-homeschool/homeschool/public/getPublicStuList", {})
          .then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.allstuData = res.obj;
            }
          });
        if (this.bookID != null || this.bookID != "") {
          api
            .get("xwcloud-homeschool/homeschool/pxbooks/getPxbook", {
              id: this.bookID,
            })
            .then((res) => {
              if (res.code == "Y" && res.success == true) {
                console.log(res);
                // 获取作业信息
                this.params.campusID = res.obj.campusID;
                this.params.booksName = res.obj.booksName;
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
                this.params.allnum = res.obj.allnum;
                this.params.cunnum = res.obj.cunnum;
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
