<template>
  <div>
    <div>
      选择设置岗位：
      <Select
        v-model="staffpostID"
        placeholder="请选择岗位"
        style="width: 200px"
        @on-change="changestaffPost"
      >
        <Option v-for="item in staffpostData" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
    </div>
    <div style="margin-top: 15px">
      <Collapse accordion v-for="item in data" :key="item.id">
        <Panel name="1">
          {{ item.text }}
          <div slot="content">
            <Card>
              <Row
                style="margin-top: 8px"
                v-for="item1 in item.treeList"
                :key="item1.id"
              >
                <Col span="24">
                  <Collapse accordion>
                    <Panel :name="item1.id">
                      {{ item1.text }}
                      <p slot="content">
                        <Row>
                          <Col span="10">
                            <RadioGroup
                              v-model="item1.datafanwei"
                              @on-change="checkGroupChange(item1)"
                            >
                              <Radio label="0">全选个人数据</Radio>
                              <Radio label="-1">全选所在校区</Radio>
                              <Radio label="-2">全选全部校区</Radio>
                            </RadioGroup>
                          </Col>
                          <Col span="14">
                            <Button type="primary" @click="savepowers(item1)"
                              >保存</Button
                            ></Col
                          >
                        </Row>
                        <Row
                          v-for="item2 in item1.treeList"
                          :key="item2.id"
                          style="margin-top: 8px"
                        >
                          <Col span="3">
                            <Checkbox
                              @on-change="changemenu(item2)"
                              v-model="item2.checkmenu"
                              >{{ item2.text }}</Checkbox
                            >
                          </Col>
                          <Col span="9">
                            <RadioGroup v-model="item2.dataFanweicheck">
                              <Radio label="0">个人数据</Radio>
                              <Radio label="-1">所在校区</Radio>
                              <Radio label="-2">全部校区</Radio>
                              <Radio label="-3">指定校区</Radio>
                              <Button
                                type="primary"
                                label="small"
                                v-if="item2.dataFanweicheck == '-3'"
                                @click="settingxiaoqu(item2)"
                                >设置</Button
                              >
                            </RadioGroup>
                          </Col>
                          <Col span="12">
                            <Checkbox
                              v-for="itembtn in item2.menubtns"
                              :key="itembtn.id"
                              border
                              v-model="itembtn.ischeck"
                              >{{ itembtn.buttonName }}</Checkbox
                            >
                          </Col>
                        </Row>
                      </p>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </Card>
          </div>
        </Panel>
      </Collapse>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <selectcampus-form
      v-model="showselectcampus"
      :menuData="menuData"
    ></selectcampus-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import selectcampusForm from "../../../components/systemSetting/selectcampusForm.vue";
export default {
  components: {
    selectcampusForm,
  },
  data() {
    return {
      staffpostID: "",
      data: [],
      staffpostName: "",
      showselectcampus: false,
      menuData: "",
      staffpostData: [],
      spinShow: false,
    };
  },
  methods: {
    ...mapActions(["getAllMenu", "savepowerInfo", "getallstaffpostList"]),
    checkGroupChange(data) {
      data.treeList.forEach((element) => {
        element.datafanwei = data.datafanwei + "";
        element.dataFanweicheck = data.datafanwei;
        element.checkmenu = true;
        element.menubtns.forEach((item) => {
          item.ischeck = true;
        });
      });
    },
    changemenu(data) {
      if (data.checkmenu) {
        data.menubtns.forEach((element) => {
          element.ischeck = true;
        });
        data.datafanwei = "-2";
      } else {
        data.datafanwei = "1";
        data.menubtns.forEach((element) => {
          element.ischeck = false;
        });
      }
    },
    savepowers(power) {
      power.staffpostID = this.$route.query.staffpostID;
      this.savepowerInfo(power).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success("权限信息保存成功");
        } else {
          this.$Message.error(
            "信息保存失败，请Ctrl+F5刷新页面后重试！仍然有问题请联系客服！"
          );
        }
      });
    },
    settingxiaoqu(data) {
      data.staffpostID = this.$route.query.staffpostID;
      this.showselectcampus = true;
      this.menuData = JSON.stringify(data);
    },
    changestaffPost() {
      console.log(this.staffpostID);
      this.LoadAllMenuInfo();
    },
    LoadAllMenuInfo() {
      this.spinShow = true;
      //获取菜单
      this.getAllMenu({ staffpostID: this.staffpostID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj;
          this.spinShow = false;
        } else {
          this.$Message.error("菜单信息加载出错了");
          this.spinShow = false;
        }
      });
    },
  },
  mounted() {
    this.staffpostID = this.$route.query.staffpostID;
    this.getallstaffpostList({}).then((res) => {
      if (res.code == "Y" && res.success == true) {
        this.staffpostData = res.obj;
      }
    });
    this.LoadAllMenuInfo();
  },
};
</script>
