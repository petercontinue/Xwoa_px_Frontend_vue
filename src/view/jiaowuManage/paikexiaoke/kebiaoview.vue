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
import daykebiao from "@/view/jiaowuManage/paikexiaoke/kebiao/daykebiao";
import subjectkebiao from "@/view/jiaowuManage/paikexiaoke/kebiao/subjectkebiao";
import classroomkebiao from "@/view/jiaowuManage/paikexiaoke/kebiao/classroomkebiao";
import stukebiao from "@/view/jiaowuManage/paikexiaoke/kebiao/stukebiao";
import teacherkebiao from "@/view/jiaowuManage/paikexiaoke/kebiao/teacherkebiao";

export default {
  components: {
    //定义组件
    daykebiao,
    subjectkebiao,
    classroomkebiao,
    stukebiao,
    teacherkebiao,
  },

  data() {
    return {
      //选项卡
      tabList: [
        {
          label: "科目课表",
          name: "subjectkebiao",
        },
        {
          label: "教师课表",
          name: "teacherkebiao",
        },
        {
          label: "学员课表",
          name: "stukebiao",
        },
        {
          label: "教室课表",
          name: "classroomkebiao",
        },
        {
          label: "天课表",
          name: "daykebiao",
        },
      ],
      daykebiao: "daykebiao",
      subjectkebiao: "subjectkebiao",
      classroomkebiao: "classroomkebiao",
      stukebiao: "stukebiao",
      teacherkebiao: "teacherkebiao",
      currentView: "subjectkebiao",//默认进第一个选项卡--科目课表
      //数据
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
