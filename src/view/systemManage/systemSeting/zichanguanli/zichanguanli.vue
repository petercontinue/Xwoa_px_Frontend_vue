<template>
  <div>
    <Row style="margin-top: 10px">
      <Col span="12">
        <span>快捷查询：</span>
        <Button type="info" ghost @click="searchAll()">全部</Button>
      </Col>
    </Row>
    <buttons-form
      v-model="menuID"
      v-on:handleSearch="getPagesAssetsList"
      @increment="clickShijian"
    ></buttons-form>
    <Row style="margin-top: 20px">
      <Col span="24">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="data"
          @on-row-click="onClickRow"
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
    <addzichang-form
      v-model="addShow"
      v-on:handleSearch="getPagesAssetsList"
    ></addzichang-form>
    <updatezichang-form
      v-model="editShow"
      :editdata="editdata"
      v-on:handleSearch="getPagesAssetsList"
    ></updatezichang-form>
    <derivezichang-form
      v-model="deriveShow"
      v-on:handleSearch="getPagesAssetsList"
    ></derivezichang-form>
    <zichanbaofei-form
      v-model="baofeiShow"
      :editdata="editdata"
      v-on:handleSearch="getPagesAssetsList"
    ></zichanbaofei-form>
    <zichandengji-form v-model="dengjijlShow" :editdata="editdata"></zichandengji-form>
    <zichangbaofeijl-form
      v-model="baofeijlShow"
      :editdata="editdata"
    ></zichangbaofeijl-form>
    <importgudingzichang
      v-model="importShow"
      v-on:handleSearch="getPagesAssetsList"
    ></importgudingzichang>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import buttonsForm from "../../../../components/common-buttons/buttonsForm";
import selectsearchForm from "../../../../components/common-buttons/selectsearchForm";
import inputsearchForm from "../../../../components/common-buttons/inputsearchForm";
import addzichangForm from "../../../../components/systemSetting/zichangguanli/addzichangForm";
import updatezichangForm from "../../../../components/systemSetting/zichangguanli/updatezichangForm";
import derivezichangForm from "../../../../components/systemSetting/zichangguanli/derivezichangForm";
import zichanbaofeiForm from "../../../../components/systemSetting/zichangguanli/zichanbaofeiForm";
import zichandengjiForm from "../../../../components/systemSetting/zichangguanli/zichandengjiForm";
import zichangbaofeijlForm from "../../../../components/systemSetting/zichangguanli/zichangbaofeijlForm";
import importgudingzichang from "@/components/systemSetting/importgudingzichang";
export default {
  components: {
    buttonsForm,
    selectsearchForm,
    inputsearchForm,
    addzichangForm,
    updatezichangForm,
    derivezichangForm,
    zichanbaofeiForm,
    zichandengjiForm,
    zichangbaofeijlForm,
    importgudingzichang,
  },
  data() {
    return {
      columns: [
        {
          width: 60,
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: this.checkAll,
                },
                on: {
                  "on-change": () => {
                    this.value = !this.value;
                    this.data.forEach((item) => {
                      item.checkBox = this.value; //全选|全取消
                    });
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            return h("div", [
              h("Checkbox", {
                props: {
                  value: params.row.checkBox,
                },
                on: {},
              }),
            ]);
          },
        },
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
                      this.campusID = value;
                      this.TableSearch();
                    } else {
                      this.campusID = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "名称",
          key: "assetsName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(inputsearchForm, {
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "名称",
                },
                on: {
                  "on-clickSearch": (value) => {
                    this.assetsName = value;
                    this.TableSearch();
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "类别",
          key: "styleName",
          align: "center",
          renderHeader: (h, params) => {
            return h("div", [
              h(selectsearchForm, {
                // 自定义组件不需要要加引号
                props: {
                  placement: "bottom-start",
                  showArrow: false,
                  content: "类别",
                  data: this.allleibie,
                },
                on: {
                  "on-choosed": (value) => {
                    if (value != "-1") {
                      this.leibieID = value;
                      this.TableSearch();
                    } else {
                      this.leibieID = 0;
                      this.TableSearch();
                    }
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "规格",
          key: "guige",
          align: "center",
        },
        {
          title: "数量",
          key: "num",
          align: "center",
        },
        {
          title: "单位",
          key: "danwei",
          align: "center",
        },
        {
          title: "登记记录",
          key: "",
          align: "center",
          render: (h, params) => {
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
                      this.lookDengji(params, 1);
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
        {
          title: "报废记录",
          key: "",
          align: "center",
          render: (h, params) => {
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
                      this.lookbaofei(params, 1);
                    },
                  },
                },
                "查看"
              ),
            ]);
          },
        },
      ],
      data: [],
      total: 0,
      size: 10,
      current: 1,
      menuID: "551",
      campusID: 0,
      assetsName: "",
      leibieID: 0,
      allcampusData: [],
      allleibie: [],
      addShow: false,
      editShow: false,
      deriveShow: false,
      baofeiShow: false,
      dengjijlShow: false,
      baofeijlShow: false,
      importShow: false,
      editdata: "",
      editID: "",
    };
  },
  methods: {
    ...mapActions([
      "getPagesAssets",
      "getallcampusList",
      "GetAllAssetsStyleList",
      "deleteAssetInfo",
    ]),
    //鼠标单击一行选中
    onClickRow(row, index) {
      //改变为勾选样式
      this.$refs.selection.data[index].checkBox = !this.$refs.selection.data[index]
        .checkBox;
    },
    getPagesAssetsList() {
      this.getPagesAssets({
        size: this.size,
        current: this.current,
        campusID: this.campusID,
        assetsName: this.assetsName,
        leibieID: this.leibieID,
      }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.data = res.obj.records;
          this.total = Number(res.obj.total);
          this.data.forEach((items) => {
            //取消所有对象的勾选，_checked设置为false
            this.$set(items, "checkBox", false);
          });
        }
      });
    },
    changePage(current) {
      this.current = current;
      this.getPagesAssetsList();
    },
    changePageSize(pageSize) {
      // 改变每页记录的条数
      this.size = pageSize;
      this.getPagesAssetsList();
    },
    addstaffinfo() {
      this.addShow = true;
    },
    updateStaff() {
      this.data.forEach((items) => {
        if (items.checkBox) {
          this.editstaffID = items.id;
        }
      });
      if (this.editstaffID == "") {
        this.$Message.error("请选择要修改的数据");
      } else this.updateShow = true;
    },
    getAllCampusList() {
      this.getallcampusList({ menuID: this.menuID }).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allcampusData = res.obj;
        }
      });
      this.GetAllAssetsStyleList({}).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.allleibie = res.obj;
        }
      });
    },
    TableSearch() {
      this.getPagesAssetsList();
    },
    clickShijian(onclicks) {
      window.console.log(onclicks);
      if (onclicks == "addinfo") {
        this.addShow = true;
      } else if (onclicks == "edit") {
        this.editdata = "";
        let i = 0;
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdata = JSON.stringify(items);
            i += 1;
          }
        });
        if (i == 0) {
          this.$Message.error("请选择要修改的数据");
        } else if (i > 1) {
          this.$Message.error("只能选中一行进行修改");
        } else this.editShow = true;
      } else if (onclicks == "del()") {
        this.editID = "";
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editID += items.id + ",";
          }
        });
        if (this.editID == "") {
          this.$Message.error("请选择要删除的数据");
        } else {
          this.deleteAssetInfo({ Id: this.editID }).then((res) => {
            if (res.code == "Y" && res.success == true) {
              this.$Message.success(res.msg);
              this.getPagesAssetsList();
            } else {
              this.$Message.error("删除信息失败");
            }
          });
        }
      } else if (onclicks == "derive()") {
        this.deriveShow = true;
      } else if (onclicks == "fenleiEdit()") {
        this.$router.push({
          path: "/zichangcategory",
          query: {},
        });
      } else if (onclicks == "baofei()") {
        this.editdata = "";
        let i = 0;
        this.data.forEach((items) => {
          if (items.checkBox) {
            this.editdata = JSON.stringify(items);
            i += 1;
          }
        });
        if (this.editdata == "") {
          this.$Message.error("请选择要操作的数据");
        } else if (i > 1) {
          this.$Message.error("只能选中一行进行操作");
        } else {
          this.baofeiShow = true;
        }
      } else if (onclicks == "theimport()") {
        this.importShow = true;
      }
    },
    lookDengji(params, type) {
      console.log(params);
      this.editdata = JSON.stringify(params.row);
      this.dengjijlShow = true;
    },
    lookbaofei(params, type) {
      this.editdata = JSON.stringify(params.row);
      this.baofeijlShow = true;
      console.log(params);
    },
    searchAll() {
      this.size = 10;
      this.current = 1;
      this.campusID = 0;
      this.assetsName = "";
      this.leibieID = 0;
      this.getPagesAssetsList();
    },
  },
  mounted: function () {
    this.getPagesAssetsList();
    this.getAllCampusList();
  },
};
</script>
