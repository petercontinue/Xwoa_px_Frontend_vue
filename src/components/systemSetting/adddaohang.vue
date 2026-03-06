<template>
  <Modal v-model="show" title="常用功能设置" :mask-closable="true" width="40">
    <Card style="width: 100%; margin-bottom: 20px">
      <p slot="title">我的常用功能</p>
      <p>
        <Tag
          type="border"
          size="large"
          closable
          color="success"
          v-for="(item, i) in finaldaohang"
          :key="i"
          @on-close="closeme(i)"
          >{{ item.text }}</Tag
        >
      </p>
    </Card>

    <Collapse v-model="value1">
      <Panel name="1">
        招生报名
        <p slot="content">
          <Collapse
            v-model="zbValue"
            v-for="(item, index) in alldaohao[0].treeList"
            :key="index"
            @on-change="changezsbm(index)"
          >
            <Panel :name="index + ''" style="margin: 5px 0px">
              {{ item.text }}
              <p slot="content">
                <CheckboxGroup v-model="social" @on-change="checkAllGroupChange">
                  <Checkbox
                    border
                    v-for="(items, i) in item.treeList"
                    :label="items.id"
                    :key="i"
                    style="margin: 5px"
                  >
                    <Icon type="logo-twitter"></Icon>
                    <span>{{ items.text }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </p>
            </Panel>
          </Collapse>
        </p>
      </Panel>
      <Panel name="2">
        教务管理
        <p slot="content">
          <Collapse
            v-model="jwValue"
            v-for="(item, index) in alldaohao[1].treeList"
            :key="index"
            @on-change="changejwgl(index)"
          >
            <Panel :name="index + ''" style="margin: 5px 0px">
              {{ item.text }}
              <p slot="content">
                <CheckboxGroup v-model="social1" @on-change="checkAllGroupChange1">
                  <Checkbox
                    border
                    v-for="(items, i) in item.treeList"
                    :label="items.id"
                    :key="i"
                    style="margin: 5px"
                  >
                    <Icon type="logo-twitter"></Icon>
                    <span>{{ items.text }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </p>
            </Panel>
          </Collapse>
        </p>
      </Panel>
      <Panel name="3">
        财务管理
        <p slot="content">
          <Collapse
            v-model="cwValue"
            v-for="(item, index) in alldaohao[2].treeList"
            :key="index"
            @on-change="changecwgl(index)"
          >
            <Panel :name="index + ''" style="margin: 5px 0px">
              {{ item.text }}
              <p slot="content">
                <CheckboxGroup v-model="social2" @on-change="checkAllGroupChange2">
                  <Checkbox
                    border
                    v-for="(items, i) in item.treeList"
                    :label="items.id"
                    :key="i"
                    style="margin: 5px"
                  >
                    <Icon type="logo-twitter"></Icon>
                    <span>{{ items.text }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </p>
            </Panel>
          </Collapse>
        </p>
      </Panel>
      <Panel name="4">
        数据统计
        <p slot="content">
          <Collapse
            v-model="sjtjValue"
            v-for="(item, index) in alldaohao[3].treeList"
            :key="index"
            @on-change="changesjtj(index)"
          >
            <Panel :name="index + ''" style="margin: 5px 0px">
              {{ item.text }}
              <p slot="content">
                <CheckboxGroup v-model="social3" @on-change="checkAllGroupChange3">
                  <Checkbox
                    border
                    v-for="(items, i) in item.treeList"
                    :label="items.id"
                    :key="i"
                    style="margin: 5px"
                  >
                    <Icon type="logo-twitter"></Icon>
                    <span>{{ items.text }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </p>
            </Panel>
          </Collapse>
        </p>
      </Panel>
      <Panel name="5">
        机构管理
        <p slot="content">
          <Collapse
            v-model="jgglValue"
            v-for="(item, index) in alldaohao[4].treeList"
            :key="index"
            @on-change="changejggl(index)"
          >
            <Panel :name="index + ''" style="margin: 5px 0px">
              {{ item.text }}
              <p slot="content">
                <CheckboxGroup v-model="social4" @on-change="checkAllGroupChange4">
                  <Checkbox
                    border
                    v-for="(items, i) in item.treeList"
                    :label="items.id"
                    :key="i"
                    style="margin: 5px"
                  >
                    <Icon type="logo-twitter"></Icon>
                    <span>{{ items.text }}</span>
                  </Checkbox>
                </CheckboxGroup>
              </p>
            </Panel>
          </Collapse>
        </p>
      </Panel>
    </Collapse>

    <div slot="footer">
      <Button type="primary" @click="ok()">保存</Button>
      <Button @click="closeModal(false)" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<style scoped>
.aa {
  margin-bottom: 20px;
}
</style>
<script>
import axios from "@/libs/api.request";
import { getToken } from "@/libs/util";
import toolbox from "@/libs/toolbox";
import * as api from "@/api/api.js";

export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: this.value,
      value1: "",
      zbValue: "",
      jwValue: "",
      cwValue: "",
      sjtjValue: "",
      jgglValue: "",
      savedaohang: {
        dhmessage: "",
      },
      social: [],
      social1: [],
      social2: [],
      social3: [],
      social4: [],
      mydaohang: [],
      checkdaohao: [],
      checkdaohao1: [],
      checkdaohao2: [],
      checkdaohao3: [],
      checkdaohao4: [],
      finaldaohang: [],
      alldaohao: {},
    };
  },

  methods: {
    changezsbm(val) {
      this.zbValue = val + "";
    },
    changejwgl(val) {
      this.jwValue = val + "";
    },
    changecwgl(val) {
      this.cwValue = val + "";
    },
    changesjtj(val) {
      this.sjtjValue = val + "";
    },
    changejggl(val) {
      this.jgglValue = val + "";
    },

    ok() {
      this.savedaohang.dhmessage = "";
      this.savedaohang.dhmessage = JSON.stringify(this.finaldaohang);
      api.post("/xwcloud-sys/sys/SystemSetting/saveUserdaohang",this.savedaohang).then((res) => {
        if (res.code == "Y" && res.success == true) {
          this.$Message.success(res.msg);
          this.$emit("handleSearch");
          this.closeModal(false);
        } else {
          this.$Message.error(res.msg);
          this.closeModal(false);
        }
      });
    },
    closeModal(val) {
      this.$emit("input", val);
    },

    getOverList() {
      this.finaldaohang = [];

      // if (this.mydaohang.length > 0) {
      //   this.mydaohang.forEach((item) => {
      //     this.finaldaohang.push({
      //       id: item.id,
      //       text: item.text,
      //       dhID: item.dhID,
      //       typeID: 0,
      //     });
      //   });
      // }

      if (this.checkdaohao.length > 0) {
        this.checkdaohao.forEach((item) => {
          this.finaldaohang.push(item);
        });
      }
      if (this.checkdaohao1.length > 0) {
        this.checkdaohao1.forEach((item) => {
          this.finaldaohang.push(item);
        });
      }
      if (this.checkdaohao2.length > 0) {
        this.checkdaohao2.forEach((item) => {
          this.finaldaohang.push(item);
        });
      }
      if (this.checkdaohao3.length > 0) {
        this.checkdaohao3.forEach((item) => {
          this.finaldaohang.push(item);
        });
      }
      if (this.checkdaohao4.length > 0) {
        this.checkdaohao4.forEach((item) => {
          this.finaldaohang.push(item);
        });
      }
    },

    checkAllGroupChange() {
      this.checkdaohao = [];
      this.social.forEach((item) => {
        this.alldaohao[0].treeList.forEach((items) => {
          items.treeList.forEach((itema) => {
            if (item == itema.id) {
              this.checkdaohao.push({
                id: 0,
                text: itema.text,
                dhID: itema.id,
                typeID: 1,
              });
            }
          });
        });
      });

      this.getOverList();
    },
    checkAllGroupChange1() {
      this.checkdaohao1 = [];
      this.social1.forEach((item) => {
        this.alldaohao[1].treeList.forEach((items) => {
          items.treeList.forEach((itema) => {
            if (item == itema.id) {
              this.checkdaohao1.push({
                id: 0,
                text: itema.text,
                dhID: itema.id,
                typeID: 1,
              });
            }
          });
        });
      });
      this.getOverList();
    },
    checkAllGroupChange2() {
      this.checkdaohao2 = [];
      this.social2.forEach((item) => {
        this.alldaohao[2].treeList.forEach((items) => {
          items.treeList.forEach((itema) => {
            if (item == itema.id) {
              this.checkdaohao2.push({
                id: 0,
                text: itema.text,
                dhID: itema.id,
                typeID: 1,
              });
            }
          });
        });
      });
      this.getOverList();
    },
    checkAllGroupChange3() {
      this.checkdaohao3 = [];
      this.social3.forEach((item) => {
        this.alldaohao[3].treeList.forEach((items) => {
          items.treeList.forEach((itema) => {
            if (item == itema.id) {
              this.checkdaohao3.push({
                id: 0,
                text: itema.text,
                dhID: itema.id,
                typeID: 1,
              });
            }
          });
        });
      });
      this.getOverList();
    },
    checkAllGroupChange4() {
      this.checkdaohao4 = [];
      this.social4.forEach((item) => {
        this.alldaohao[4].treeList.forEach((items) => {
          items.treeList.forEach((itema) => {
            if (item == itema.id) {
              this.checkdaohao4.push({
                id: 0,
                text: itema.text,
                dhID: itema.id,
                typeID: 1,
              });
            }
          });
        });
      });
      this.getOverList();
    },

    closeme(val) {
      if (this.finaldaohang[val].typeID == 0) {
        this.finaldaohang.splice(val, 1);
      } else if (this.finaldaohang[val].typeID == 1) {
        for (let i = 0; i < this.social.length; i++) {
          if (this.social[i] == this.finaldaohang[val].dhID) {
            this.social.splice(i, 1);
          }
        }

        for (let i = 0; i < this.checkdaohao.length; i++) {
          if (this.checkdaohao[i].dhID == this.finaldaohang[val].dhID) {
            this.checkdaohao.splice(i, 1);
          }
        }
        this.finaldaohang.splice(val, 1);
      } else if (this.finaldaohang[val].typeID == 2) {
        for (let i = 0; i < this.social1.length; i++) {
          if (this.social1[i] == this.finaldaohang[val].dhID) {
            this.social1.splice(i, 1);
          }
        }

        for (let i = 0; i < this.checkdaohao1.length; i++) {
          if (this.checkdaohao1[i].dhID == this.finaldaohang[val].dhID) {
            this.checkdaohao1.splice(i, 1);
          }
        }
        this.finaldaohang.splice(val, 1);
      } else if (this.finaldaohang[val].typeID == 3) {
        for (let i = 0; i < this.social2.length; i++) {
          if (this.social2[i] == this.finaldaohang[val].dhID) {
            this.social2.splice(i, 1);
          }
        }

        for (let i = 0; i < this.checkdaohao2.length; i++) {
          if (this.checkdaohao2[i].dhID == this.finaldaohang[val].dhID) {
            this.checkdaohao2.splice(i, 1);
          }
        }
        this.finaldaohang.splice(val, 1);
      } else if (this.finaldaohang[val].typeID == 4) {
        for (let i = 0; i < this.social3.length; i++) {
          if (this.social3[i] == this.finaldaohang[val].dhID) {
            this.social3.splice(i, 1);
          }
        }

        for (let i = 0; i < this.checkdaohao3.length; i++) {
          if (this.checkdaohao3[i].dhID == this.finaldaohang[val].dhID) {
            this.checkdaohao3.splice(i, 1);
          }
        }
        this.finaldaohang.splice(val, 1);
      } else if (this.finaldaohang[val].typeID == 5) {
        for (let i = 0; i < this.social4.length; i++) {
          if (this.social4[i] == this.finaldaohang[val].dhID) {
            this.social4.splice(i, 1);
          }
        }

        for (let i = 0; i < this.checkdaohao4.length; i++) {
          if (this.checkdaohao4[i].dhID == this.finaldaohang[val].dhID) {
            this.checkdaohao4.splice(i, 1);
          }
        }
        this.finaldaohang.splice(val, 1);
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      //当重新显示增加数据的时候重置整个form表单

      if (val) {
        this.finaldaohang = [];
        this.savedaohang.dhmessage = "";
        this.social = [];
        this.social1 = [];
        this.social2 = [];
        this.social3 = [];
        this.social4 = [];
        this.checkdaohao = [];
        this.checkdaohao1 = [];
        this.checkdaohao2 = [];
        this.checkdaohao3 = [];
        this.checkdaohao4 = [];
        api.get("/xwcloud-sys/sys/PowerManagement/getAllMenu",{ staffpostID: 1 }).then((res) => {
          if (res.code == "Y" && res.success == true) {
            this.alldaohao = res.obj;
            api.get("/xwcloud-sys/sys/SystemSetting/getdaohangtoStaff",{}).then((res) => {
              if (res.code == "Y" && res.success == true) {
                res.obj.forEach((item) => {
                  for (let i = 0; i < 5; i++) {
                    this.alldaohao[i].treeList.forEach((items) => {
                      items.treeList.forEach((itema) => {
                        if (item.menuID == itema.id) {
                          if (i == 0) {
                            this.checkdaohao.push({
                              id: item.id,
                              text: itema.text,
                              dhID: itema.id,
                              typeID: 1,
                            });
                            this.social.push(itema.id);
                          }
                          if (i == 1) {
                            this.checkdaohao1.push({
                              id: item.id,
                              text: itema.text,
                              dhID: itema.id,
                              typeID: 1,
                            });
                            this.social1.push(itema.id);
                          }
                          if (i == 2) {
                            this.checkdaohao2.push({
                              id: item.id,
                              text: itema.text,
                              dhID: itema.id,
                              typeID: 1,
                            });
                            this.social2.push(itema.id);
                          }
                          if (i == 3) {
                            this.checkdaohao3.push({
                              id: item.id,
                              text: itema.text,
                              dhID: itema.id,
                              typeID: 1,
                            });
                            this.social3.push(itema.id);
                          }
                          if (i == 4) {
                            this.checkdaohao4.push({
                              id: item.id,
                              text: itema.text,
                              dhID: itema.id,
                              typeID: 1,
                            });
                            this.social4.push(itema.id);
                          }
                        }
                      });
                    });
                  }
                });
                this.getOverList();
              }
            });
          } else {
            this.$Message.error("菜单信息加载出错了");
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
