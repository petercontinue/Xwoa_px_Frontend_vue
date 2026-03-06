<template>
  <div>
    <Row>
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="search()">全部</Button>
      </Col>
    </Row>

    <buttons-form v-model="menuID" @increment="clickShijian"></buttons-form>

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
    <addstuzhengshu
      v-model="addShow"
      :stuID="fzstuID"
      :zSid="fzzsID"
      v-on:handleSearch="getfazhengListPage"
    ></addstuzhengshu>
    <lookzs v-model="lookShow" :address="imgaddresss"></lookzs>
  </div>
</template>
<script>
import toolbox from "@/libs/toolbox";
import buttonsForm from "../../../components/common-buttons/buttonsForm";
import inputsearchForm from "@/components/common-buttons/inputsearchForm";
import selectsearchForm from "@/components/common-buttons/selectsearchForm";
import datesearchForm from "@/components/common-buttons/datesearchForm";
import addstuzhengshu from "@/components/jiaowuManage/stuKecheng/addstuzhengshu";
import lookzs from "@/components/jiaowuManage/stuKecheng/lookzs";
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import * as api from "@/api/api.js";

export default {
  components: {
    buttonsForm,
    inputsearchForm,
    selectsearchForm,
    datesearchForm,
    addstuzhengshu,
    lookzs,
  },
  data() {
    return {
      data: [], // 接口数据接收
      total: 0,
      menuID: "227",
      allcampusData: [], //校区查询获取到的校区数据
      alltype: [
        { id: 0, name: "未发证" },
        { id: 1, name: "已发证" },
      ],
      addShow: false,
      lookShow: false,
      imgaddresss: "",
      fzstuID: "",
      fzzsID: "",
      // 搜索参数
      params: {
        current: 1,
        size: 10,
        stuName: "",
        FZstate: -1,
      },
      columns6: [
        {
          title: "姓名",
          key: "stuName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "姓名",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.params.stuName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "课程",
          key: "kechengName",
          align: "center",
        },
        {
          title: "证书名称",
          key: "zsName",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.zsName == null) {
              state = "-";
            } else {
              state = params.row.zsName;
            }
            return h("div", [h("span", state)]);
          },
        },
        {
          title: "发证状态",
          key: "fzstate",
          align: "center",
          render: (h, params) => {
            let state = "";
            if (params.row.fzstate == 0) {
              state = "未发证";
            } else if (params.row.fzstate > 0) {
              state = "已发证";
            } else {
              state = "-";
            }
            return h("div", [h("span", state)]);
          },
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "发证状态",
                  data: this.alltype,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      console.log(value);
                      this.alltype.forEach((element) => {
                        if (element.id == value) {
                          this.params.FZstate = element.id;
                          this.TableSearch();
                        }
                      });
                    } else {
                      this.params.type = "";
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "经办人",
          key: "fzstaff",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.fzstaff == null) {
              datehave = "-";
            } else {
              datehave = params.row.fzstaff;
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "发证时间",
          key: "fzdate",
          align: "center",
          render: (h, params) => {
            let datehave = null;
            if (params.row.fzdate == null) {
              datehave = "-";
            } else {
              datehave = toolbox.dateFtt(params.row.fzdate, "yyyy-MM-dd");
            }
            return h("div", [h("span", datehave)]);
          },
        },
        {
          title: "操作",
          key: "caozuo",
          align: "center",
          width: 120,
          render: (h, params) => {
            if (params.row.fzstate == 0) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.Onfazheng(params);
                      },
                    },
                  },
                  "点击-发证"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.Onlook(params);
                      },
                    },
                  },
                  "查看"
                ),
              ]);
            }
          },
        },
      ],
    };
  },

  methods: {
    getfazhengListPage() {
      api.get("xwcloud-stu/stu/buxikecheng/getfazhengPage",this.params).then((res) => {
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
      api.get("xwcloud-sys/sys/StaffManagement/GetAllcampus",{menuID:this.menuID}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
    },

    /**
     * 按钮事件
     */
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "derive()") {
        this.Onderive();
      } else if ((onclicks = "zhengshushezhi()")) {
        this.Onzhengshushezhi();
      }
    },
    Onderive() {
      this.$Modal.confirm({
        title: "导出",
        content: "确认导出发证信息",
        onOk: () => {
          this.btnLoading = true;
          axios
            .request({
              method: "get",
              url: "/xwcloud-stu/stu/buxikecheng/Exportzhengshu",
              headers: {
                Authorization: "Bearer " + getToken(),
              },
              params: {},
              responseType: "blob",
            })
            .then((res) => {
              this.btnLoading = false;
              // 文件下载
              const blob = new Blob([res], {
                type: "application/vnd.ms-excel",
              });
              let link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.setAttribute("download", "发证.xls");
              link.click();
              link = null;
              this.$Message.success("导出成功");
            })
            .catch((err) => {
              this.btnLoading = false;
              this.$Message.error("下载失败");
            });
        },
        onCancel: () => {},
      });
    },
    Onzhengshushezhi() {
      this.$router.push({
        path: "/kcZhengshuSetting",
        query: {},
      });
    },
    Onfazheng(value) {
      console.log(value.row);
      if (
        value.row.zsid == 0 ||
        value.row.zsid == "" ||
        value.row.zsid == null
      ) {
        this.$Message.error("请先绑定课程对应证书!");
      } else {
        this.fzstuID = value.row.stuID;
        this.fzzsID = value.row.zsid;
        this.addShow = true;
      }
    },
    Onlook(value) {
      console.log(value);
      this.imgaddresss = value.row.fzimage;
      console.log(this.imgaddresss);
      this.lookShow = true;
    },

    /**
     * 快捷查询
     */
    search() {
      this.params.size = 10;
      this.params.current = 1;
      this.params.stuName = "";
      this.params.FZstate = -1;
      this.getfazhengListPage();
    },
    changePage(current) {
      // 翻页
      this.params.current = current;
      this.getfazhengListPage();
    },
    changePageSize(pageSize) {
      // 翻页
      this.params.size = pageSize;
      this.getfazhengListPage();
    },

    /**
     * 表头搜索
     */
    TableSearch() {
      this.getfazhengListPage();
    },
  },

  /**
   * 初始化页面
   */
  mounted: function () {
    this.getAllCampusList();
    this.getfazhengListPage();
  },
};
</script>
