<template>
  <Modal
    v-model="show"
    title="学员转校区"
    @on-ok="ok"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="45"
  >
    <div>
      <Row>
        <Form
          ref="logForm"
          :model="logForm"
          :rules="logFormRule"
          :label-width="200"
          :label-colon="true"
        >
          <FormItem label="先选择要转入的校区">
            <Select
              v-model="zxqcampusID"
              placeholder="请选择校区"
              @on-change="changecampus"
            >
              <Option
                v-for="item in allcampus"
                :value="item.id"
                :key="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
        </Form>
      </Row>
      <div v-if="Incampus">
        <Row
          v-for="(itema, i) in stubuxi"
          :value="itema.id"
          :key="itema.id"
          style="margin-top: 15px"
        >
          <Card>
            <Row>
              <Col span="24">第{{ i + 1 }}门课程</Col>
            </Row>
            <Row>
              <Col span="2"><Label>原课程：</Label></Col>
              <Col span="10"
                >{{ itema.buxiStyleName }} &nbsp; ({{ itema.jfName }})</Col
              >
              <Col span="3"><label>选择要转入的新校区的课程：</label></Col>
              <Col span="9">
                <Select
                  v-model="modelke[i]"
                  placeholder="请选择课程"
                  @on-change="changeKC(itema.id, i)"
                >
                  <Option
                    v-for="itemkc in allnewkechengList[i]"
                    :value="itemkc.id"
                    :key="itemkc.id"
                    >{{ itemkc.name }}</Option
                  >
                </Select></Col
              >
            </Row>
            <Row v-if="itema.jfName != '起止日期'">
              <Col span="2">单价*：</Col>
              <Col span="6"
                >{{ itema.kechengprice }} ->{{ itema.kechengprice }}</Col
              >
              <Col span="2">剩余课时*：</Col>
              <Col span="6"
                >{{ itema.remainkeshi }} ->{{ itema.remainkeshi }}</Col
              >
              <Col span="2">剩余金额*：</Col>
              <Col span="6"
                >{{ itema.remainjine }} ->{{ itema.remainjine }}</Col
              >
            </Row>

            <Row v-if="itema.jfName == '起止日期'">
              <Col span="2">开始日期*：</Col>
              <Col span="8">{{ itema.startDate }} ->{{ itema.startDate }}</Col>
              <Col span="2">结束日期*：</Col>
              <Col span="8">{{ itema.endDate }} ->{{ itema.endDate }}</Col>
            </Row>
          </Card>
        </Row>
      </div>
    </div>
  </Modal>
</template>
<script>
import { mapActions } from "vuex";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
export default {
  name: "stuzcq",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    stuID: { type: String },
  },
  data() {
    return {
      show: this.value,
      loading: true,
      logForm: {
        parmValue: "",
        newcampus: 0,
        stuid: 0,
      },
      alldata: [],
      camstuID: "",
      allcampus: [],
      Incampus: false,
      stubuxi: [],
      zxqcampusID: 0,
      allnewkechengList: [],
      modelke: [],
      chagekcmassage: [],
      logFormRule: {},
    };
  },
  methods: {
    ...mapActions([
      "getzxqCampus",
      "getzxqbuxiList",
      "getallJFkcshuList",
      "getxinbxkc",
      "zhuanxiaoqu",
    ]),
    ok() {
      this.logForm.stuid = this.camstuID;
      this.logForm.newcampus = this.zxqcampusID;
      this.logForm.parmValue = JSON.stringify(this.alldata);
      this.zhuanxiaoqu(this.logForm).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          this.$emit("handleSearch");
          this.closeModal(false);
        } else {
          this.$Message.error("操作失败");
          this.closeModal(false);
        }
      });
    },
    closeModal(val) {
      this.$emit("input", val);
    },

    getzxqCampusList() {
      this.getzxqCampus({ stuID: this.camstuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampus = res.obj;
        }
      });
    },

    getzxqbuxi() {
      this.getzxqbuxiList({ stuID: this.camstuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.stubuxi = res.obj;
          console.log(res);
        }
      });
    },

    changeKC(bxID, i) {
      console.log(this.modelke);
      this.alldata.push({ bxID: bxID, NkcID: this.modelke[i] });
      // this.getxinbxkc({newkcID:this.modelke[i]}).then((res)=>{
      //   if(res.code=="Y" && res.success==true){
      //     this.chagekcmassage[i]=res.obj;
      //     console.log(this.chagekcmassage);
      //   }
      // })
    },
    changecampus() {
      this.stubuxi.forEach((items) => {
        this.getallJFkcshuList({
          campusID: this.zxqcampusID,
          JifeiStyle: items.jifeiStyleID,
          buxiStyleName: items.buxiStyleName,
        }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allnewkechengList.push(res.obj);
            this.modelke.push(items.buxiStyleID); //双向绑定课程
            // this.chagekcmassage.push({kechengprice:0});//双向绑定改变后课程信息
          }
        });
        this.Incampus = true;
      });

      console.log(this.chagekcmassage);
    },
  },

  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单
      this.$refs["logForm"].resetFields();
      // Object.assign(this.$data, this.$options.data());
      if (val) {
        console.log(this.stuID);
        this.camstuID = this.stuID;
        this.getzxqCampusList();
        this.getzxqbuxi();
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
  },
};
</script>
