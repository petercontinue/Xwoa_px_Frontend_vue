<template>
  <div>
    <div>
      <Alert show-icon style="margin-top: 0px">
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        <Col>
          <span>温馨提示：</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>1、本页面仅仅只是给家长推送一条学员到校和离校的微信消息；</span>
        </Col>
        <Col style="margin-top: 10px">
          <span>
            <font color="red"
              >特别注意：不会消课（不扣减课时，也不会产生上课记录！）</font
            >
          </span>
        </Col>
      </Alert>
    </div>
    <Row style="margin-top: 30px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table border ref="selection" :columns="columns6" :data="data"></Table>
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
    <ziyouqiandaoclassstu
      v-model="lookclassShow"
      :classID="classID"
      v-on:handleSearch="getziyouqiandaoListPage"
    ></ziyouqiandaoclassstu>

    <qiandaostu v-model="qiandaostuShow" :classID="classID"></qiandaostu>
    <qiantuistu v-model="qiantuistuShow" :classID="classID"></qiantuistu>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import ziyouqiandaoclassstu from "@/components/jiaowuManage/paikexiaoke/ziyouqiandaoclassstu";
import qiandaostu from "@/components/jiaowuManage/paikexiaoke/qiandaostu";
import qiantuistu from "@/components/jiaowuManage/paikexiaoke/qiantuistu";
import * as api from "@/api/api.js";

export default {
  components: {
    inputsearchForm,
    selectsearchForm,
    ziyouqiandaoclassstu,
    qiandaostu,
    qiantuistu,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      lookclassShow: false,
      qiandaostuShow: false,
      qiantuistuShow: false,
      classID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        campusID: "",
        className: "",
      },
      allcampusData: [], //校区查询获取到的校区数据
      columns6: [
        {
          title: "校区",
          key: "campusName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "校区",
                  data: this.allcampusData,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.allcampusData.forEach((element) => {
                        if (element.id == value) {
                          this.params.campusID = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.campusID = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "班级",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.className = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "班级总人数",
          key: "yingQianDaoCount",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.lookclassStu(params);
                    },
                  },
                },
                params.row.yingQianDaoCount + "-详情"
              ),
            ]);
          },
        },
        {
          title: "已签到人数",
          key: "yiQianDaoCount",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.qiandaoStu(params);
                    },
                  },
                },
                params.row.yiQianDaoCount + "-详情"
              ),
            ]);
          },
        },
        {
          title: "已签退人数",
          key: "yituiDaoCount",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.qiantuiStu(params);
                    },
                  },
                },
                params.row.yituiDaoCount + "-详情"
              ),
            ]);
          },
        },
      ],
    };
  },

  methods: {
    /**
     * 获取自由签到签退页面数据
     */
    getziyouqiandaoListPage() {
      api
        .get("xwcloud-pkxk/paike/paikexiaoke/getziyouqiandaoPage", this.params)
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.data = res.obj.records;
            this.total = Number(res.obj.total);
            console.log(res);
          }
        });
    },

    /**
     * 获取校区数据
     */
    getAllCampusList() {
      api
        .get("xwcloud-sys/sys/StaffManagement/GetAllcampus", { menuID: 246 })
        .then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.allcampusData = res.obj;
          }
        });
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.campusID = "";
      this.params.className = "";
      this.getziyouqiandaoListPage();
    },

    /**
     * 翻页
     */
    changePage(current) {
      this.params.current = current;
      this.getziyouqiandaoListPage();
    },
    changePageSize(pageSize) {
      this.params.size = pageSize;
      this.getziyouqiandaoListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getziyouqiandaoListPage();
    },
    lookclassStu(value) {
      console.log(value.row);
      this.classID = value.row.classID;
      this.lookclassShow = true;
    },
    qiandaoStu(value) {
      this.classID = value.row.classID;
      this.qiandaostuShow = true;
    },
    qiantuiStu(value) {
      this.classID = value.row.classID;
      this.qiantuistuShow = true;
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getziyouqiandaoListPage();
    this.getAllCampusList();
  },
};
</script>
