<template>
  <Modal
    v-model="isShow"
    title="跟进"
    :footer-hide="true"
    :mask-closable="false"
    @on-cancel="closeModal(false)"
    width="60"
  >
    <Row>
      <Col span="4">
        <Divider>基础信息</Divider>
        <div>家长联系电话：{{ yxData.parentTel }}</div>
        <div>电话关系：{{ parentTelRelation }}</div>
        <Divider>学员信息</Divider>
        <div>姓名：{{ yxData.stuName }}</div>
        <div>性别：{{ yxData.stuSex }}</div>
        <div>生日：{{ yxData.stubirth | formatDate }}</div>
        <div>来源途径：{{ yxData.telFromName }}</div>
        <Divider>其他信息</Divider>
        <div>最后跟进时间：{{ yxData.lastFollowDate | formatDate }}</div>
        <div>下次跟进时间：{{ yxData.nextGenjinTime | formatDate }}</div>
        <div>登记人：{{ yxData.dengjiStaffName }}</div>
        <div>市场人：{{ yxData.shichangStaffName }}</div>
        <div>负责人：{{ yxData.fuzeStaffName }}</div>
      </Col>
      <Col span="20">
        <Form
          ref="genjin"
          :model="genjinFrom"
          :rules="genjinRule"
          :label-width="115"
        >
          <Row>
            <Col span="24">
              <FormItem label="跟进记录" prop="gengjinText">
                <Input
                  v-model="genjinFrom.gengjinText"
                  type="textarea"
                  placeholder="请输入跟进记录"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="7">
              <FormItem label="跟进时间" prop="gengjinTime">
                <DatePicker
                  type="date"
                  placeholder="跟进时间"
                  style="width: 100%"
                  v-model="genjinFrom.gengjinTime"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem
                label="下次跟进时间"
                prop="nextGenjinTime"
                :rules="
                  nextGenjingRequired
                    ? {
                        required: true,
                        message: '请选择下一次跟进时间',
                        trigger: 'change',
                        type: 'date',
                      }
                    : null
                "
              >
                <DatePicker
                  type="date"
                  placeholder="下次跟进时间"
                  style="width: 100%"
                  v-model="genjinFrom.nextGenjinTime"
                ></DatePicker>
              </FormItem>
            </Col>
            <Col span="7">
              <FormItem label="意向程度">
                <Select
                  clearable
                  filterable
                  v-model="genjinFrom.yxLevelID"
                  placeholder="选择新的意向程度"
                >
                  <Option
                    v-for="telLevel in telLevelList"
                    :key="telLevel.id"
                    :value="telLevel.id"
                    >{{ telLevel.name }}</Option
                  >
                </Select>
              </FormItem>
            </Col>
            <Col span="2" push="1">
              <Button type="primary" @click="submitGinjing" :loading="loading"
                >提交</Button
              >
            </Col>
          </Row>
        </Form>

        <Row>
          <Col span="23" push="1">
            <Table :columns="genjinColumn" :data="genjinList">
              <template slot-scope="{ row,index }" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  @click="edit(row)"
                  >编辑</Button
                >
                <Button type="error" size="small" @click="remove(row)"
                  >删除</Button
                >
              </template>
            </Table>
            <Row style="margin-top: 15px">
              <Page
                :total="total"
                show-elevator
                show-total
                prev-text="上一页"
                next-text="下一页"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
              />
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Modal>
</template>

<script>
import { mapActions } from "vuex";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  name: "ginjinModal",
  props: {
    value: { default: false, type: Boolean },
    nextGenjingRequired: { default: false, type: Boolean },
    stuID: { default: "", type: String },
    yxData: { default: {}, type: Object },
    telLevelList: { default: [], type: Array },
  },
  data() {
    return {
      isShow: this.value,
      loading: false,
      total: 0,
      genjinColumn: [
        {
          title: "跟进人",
          align: "center",
          key: "addStaffName",
          width: 120,
        },
        {
          title: "跟进时间",
          align: "center",
          key: "gengjinTime",
          width: 120,
        },
        {
          title: "跟进内容",
          align: "center",
          key: "gengjinText",
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 150,
        },
      ],
      genjinList: [],
      searchData: {
        size: 10,
        current: 1,
        stuID: null,
      },
      genjinFrom: {
        id: null,
        stuID: null,
        gengjinText: null,
        gengjinTime: null,
        nextGenjinTime: null,
        yxLevelID: null,
      },
      genjinRule: {
        gengjinText: [
          {
            required: true,
            message: "请输入跟进内容",
            trigger: "change",
          },
        ],
        gengjinTime: [
          {
            required: true,
            message: "请选择跟进时间",
            trigger: "change",
            type: "date",
          },
        ],
      },
    };
  },
  computed: {
    parentTelRelation: function () {
      let relation = "";
      if (this.yxData.parentTelRelation) {
        switch (this.yxData.parentTelRelation) {
          case "1":
            relation = "本人";
            break;
          case "2":
            relation = "爸爸";
            break;
          case "3":
            relation = "妈妈";
            break;
          case "4":
            relation = "爷爷";
            break;
          case "5":
            relation = "奶奶";
            break;
          case "6":
            relation = "外公";
            break;
          case "7":
            relation = "外婆";
            break;
          case "8":
            relation = "保姆";
            break;
          case "9":
            relation = "其他";
            break;
        }
        return relation;
      }
    },
  },
  filters: {
    formatDate: function (value) {
      let datehave = "";
      if (value != undefined || value != null) {
        datehave = toolbox.dateFtt(value, "yyyy-MM-dd");
      }
      return datehave;
    },
  },
  methods: {
    closeModal(val) {
      this.$emit("input", val);
    },
    edit(row) {
      this.genjinFrom.gengjinText = row.gengjinText;
      this.genjinFrom.gengjinTime = row.gengjinTime;
      this.genjinFrom.nextGenjinTime = row.nextGenjinTime;
      this.genjinFrom.id = row.id;
      this.genjinFrom.yxLevelID = row.yxLevelID;
    },
    remove(row) {
      api.del("xwcloud-zsbm/yxstu/YixiangStu/deletegenjinRecords/"+row.id,{}).then((res) => {
        if (res.success) {
          this.$Message.success("操作成功");
          this.$emit("handleSearch");
          this.getGenjinList();
        } else {
          this.$Message.error("操作失败");
        }
      });
    },
    getGenjinList() {
      api.get("xwcloud-zsbm/yxstu/YixiangStu/getStuGenjinRecordsPages",this.searchData).then((res) => {
        this.genjinList = res.obj.records;
        this.total = Number(res.obj.total);
      });
    },
    submitGinjing() {
      this.$refs.genjin.validate((valid) => {
        if (valid) {
          this.loading = true;
          api.post("xwcloud-zsbm/yxstu/YixiangStu/saveAndUpdateStuGenjinInfo",this.genjinFrom).then((res) => {
            if (res.success) {
              this.$Message.success(res.msg);
              this.genjinFrom.id = null;
              this.$refs.genjin.resetFields();
              setTimeout(() => {
                this.$refs.genjin.resetFields();
              }, 20);
              this.getGenjinList();
              this.loading = false;
              this.$emit("handleSearch");
            } else {
              this.loading = false;
              this.$Message.error(res.msg);
            }
          });
        } else {
          this.$Message.error("请完善信息!");
        }
      });
    },
    changePage(current) {
      this.searchData.current = current;
      this.getStuInvitationList();
    },
    changePageSize(pageSize) {
      this.searchData.size = pageSize;
      this.getStuInvitationList();
    },
  },
  watch: {
    value(val) {
      this.isShow = val;
      if (val) {
        //当重新显示增加数据的时候重置整个form表单
        this.$refs.genjin.resetFields();
        setTimeout(() => {
          this.$refs.genjin.resetFields();
        }, 10);
        this.genjinFrom.id = null;
      } else {
        // 反之则关闭页面
        this.closeModal(val);
      }
    },
    stuID(val) {
      if (val) {
        this.genjinFrom.stuID = val;
        this.searchData.stuID = val;
        this.getGenjinList();
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>