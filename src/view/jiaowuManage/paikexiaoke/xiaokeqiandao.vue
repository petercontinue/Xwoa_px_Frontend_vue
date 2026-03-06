<template>
  <Tabs @on-click="tabChange">
    <TabPane
      v-for="(tab, index) in tabList"
      :key="index"
      :label="tab.label"
      :name="tab.name"
    >
      <div :is="currentView" v-if="currentView === tab.name"></div>
    </TabPane>
  </Tabs>
</template>

<script>
//引入页面
import nopaikexiaoke from "@/view/jiaowuManage/paikexiaoke/nopaikexiaoke";
import rengongxiaoke from "@/view/jiaowuManage/paikexiaoke/rengongxiaoke";
import shuakaxiaoke from "@/view/jiaowuManage/paikexiaoke/shuakaxiaoke";
import yuexiaoke from "@/view/jiaowuManage/paikexiaoke/yuexiaoke";
import autoxiaoke from "@/view/jiaowuManage/paikexiaoke/autoxiaoke";
import shuakapage from "@/view/jiaowuManage/paikexiaoke/shuakapage";
import paikeqiaodaoqiantui from "@/view/jiaowuManage/paikexiaoke/paikeqiaodaoqiantui";
import ziyouqiandao from "@/view/jiaowuManage/paikexiaoke/ziyouqiandao";
import facepage from "@/view/jiaowuManage/paikexiaoke/facepage";
import * as api from "@/api/api.js";

export default {
  components: {
    //定义组件
    nopaikexiaoke,
    rengongxiaoke,
    shuakaxiaoke,
    yuexiaoke,
    autoxiaoke,
    shuakapage,
    facepage,
    paikeqiaodaoqiantui,
    ziyouqiandao,
  },

  data() {
    return {
      //选项卡
      tabList: [
        {
          label: "不排课消课/批量消课",
          name: "nopaikexiaoke",
        },
        {
          label: "按排课(班级)消课签到",
          name: "rengongxiaoke",
        },
        {
          label: "按排课(个人)签到签退",
          name: "paikeqiaodaoqiantui",
        },
        // {
        //   label: "刷脸签到签退",
        //   name: "facepage",
        // },
        {
          label: "自动消课",
          name: "autoxiaoke",
        },
        {
          label: "刷卡消课",
          name: "shuakaxiaoke",
        },
        {
          label: "刷卡签退",
          name: "shuakapage",
        },
        {
          label: "余额消课",
          name: "yuexiaoke",
        },
        {
          label: "自由签到签退",
          name: "ziyouqiandao",
        }
      ],

      //数据
      nopaikexiaoke: "nopaikexiaoke",
      rengongxiaoke: "rengongxiaoke",
      shuakaxiaoke: "shuakaxiaoke",
      yuexiaoke: "yuexiaoke",
      autoxiaoke: "autoxiaoke",
      shuakapage: "shuakapage",
      facepage: "facepage",
      paikeqiaodaoqiantui: "paikeqiaodaoqiantui",
      ziyouqiandao: "ziyouqiandao",
      currentView: "nopaikexiaoke",
    };
  },
  methods: {
    //页面切换
    tabChange: function (name) {
      //console.log(name);
      this.currentView = name;
    },
  },

  mounted: function () {
    // 初始化页面
    //this.tabChange(this.currentView);
  },
};
</script>
