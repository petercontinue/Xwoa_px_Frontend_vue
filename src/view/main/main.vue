<template>
  <Layout style="height: 100%" class="main">
    <Sider
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="64"
      v-model="collapsed"
      class="left-sider"
      :style="{ overflow: 'hidden' }"
    >
      <side-menu
        accordion
        ref="sideMenu"
        :active-name="$route.name"
        :collapsed="collapsed"
        @on-select="turnToPage"
        :menu-list="menuList"
      >
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :message-unread-count="unreadCount" :user-avatar="userAvatar" />
          <!-- <error-store
            v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
            :has-read="hasReadErrorPage"
            :count="errorCount"
          ></error-store> -->
          <fullscreen v-model="isFullscreen" style="margin-right: 10px" />
          <!-- 顶部机构名称 -->

          <label
            style="
              margin-right: 20px;
              font-size: 18px;
              font-weight: bolder;
              cursor: pointer;
            "
            @click="isShowDrawer = true"
            v-if="!isbigRole"
            >{{ jigou.khShowJigouName }}</label
          >
          <Drawer
            title="系统服务"
            :closable="true"
            v-model="isShowDrawer"
            v-if="!isbigRole"
          >
            <!-- 如果机构名称过长，这里是要截断一下还是让它自然换行 -->
            <div>{{ jigou.khShowJigouName }}</div>
            <!-- 如果只有一个校区，直接显示到期时间，如果是多个校区，把下面的年月日换成【查看】按钮，点击后弹框显示各个校区的到期时间 -->
            <div>系统到期时间：{{ jigou.nextPayTime | FtDate }}</div>
            <div>购买人：{{ jigou.kehucontractname }}</div>
            <div>购买人手机：{{ jigou.kehutelphone }}</div>
            <Divider></Divider>
            <div>{{ jigou.workName }}</div>
            <div>{{ jigou.worktel }}</div>
            <Divider></Divider>
            <div class="oneLineInfo">校君宝官网</div>
            <div class="oneLineInfo">校君宝公众号</div>
            <!-- <div class="oneLineInfo">成为校君宝合伙人</div> -->
          </Drawer>

          <label
            style="
              margin-right: 20px;
              font-size: 18px;
              font-weight: bolder;
              cursor: pointer;
            "
            v-if="isbigRole"
            @click="isShowDrawer = true"
            >{{ jigou[0].khShowJigouName }}</label
          >
          <Drawer
            title="系统服务"
            :closable="true"
            v-model="isShowDrawer"
            v-if="isbigRole"
          >
            <!-- 如果机构名称过长，这里是要截断一下还是让它自然换行 -->
            <div>{{ jigou.khShowJigouName }}</div>
            <!-- 如果只有一个校区，直接显示到期时间，如果是多个校区，把下面的年月日换成【查看】按钮，点击后弹框显示各个校区的到期时间 -->

            <div v-for="(item, i) in jigou" :key="i">
              {{ item.campusName }} 到期时间：{{ item.nextPayTime | FtDate }}
            </div>
            <div>购买人：{{ jigou[0].kehucontractname }}</div>
            <div>购买人手机：{{ jigou[0].kehutelphone }}</div>
            <Divider></Divider>
            <div>售后客服：{{ jigou[0].workName }}</div>
            <div>售后热线：{{ jigou[0].worktel }}</div>
            <Divider></Divider>
            <div class="oneLineInfo">校君宝官网</div>
            <div class="oneLineInfo">校君宝公众号</div>
            <!-- <div class="oneLineInfo">成为校君宝合伙人</div> -->
          </Drawer>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav
              :value="$route"
              @input="handleClick"
              :list="tagNavList"
              @on-close="handleCloseTag"
            />
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view />
            </keep-alive>
            <ABackTop
              :height="100"
              :bottom="80"
              :right="50"
              container=".content-wrapper"
            ></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from "./components/side-menu";
import HeaderBar from "./components/header-bar";
import TagsNav from "./components/tags-nav";
import User from "./components/user";
import ABackTop from "./components/a-back-top";
import Fullscreen from "./components/fullscreen";
import ErrorStore from "./components/error-store";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getNewTagList, routeEqual } from "@/libs/util";
import routers from "@/router/routers";
import minLogo from "@/assets/logo-min.png";
import maxLogo from "@/assets/logo.png";
import "./main.less";
export default {
  name: "Main",
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop,
  },
  data() {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      isShowDrawer: false, //是否打开页面右边的抽屉
      isbigRole: false,
      jigou: [],
    };
  },
  filters: {
    FtDate(date) {
      date = new Date(date);
      let fmt = "yyyy-MM-dd";
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
  },
  
  computed: {
    ...mapGetters(["errorCount"]),

    tagNavList() {
      return this.$store.state.app.tagNavList;
    },
    tagRouter() {
      return this.$store.state.app.tagRouter;
    },
    userAvatar() {
      // console.log("=====this.$store.state.user.avatarImgPath:");
      // console.log(this.$store.state.user.avatarImgPath);
      return this.$store.state.user.avatarImgPath;
    },
    cacheList() {
      const list = [
        "ParentView",
        ...(this.tagNavList.length
          ? this.tagNavList
              .filter((item) => !(item.meta && item.meta.notCache))
              .map((item) => item.name)
          : []),
      ];
      return list;
    },
    menuList() {
      // console.log("=====this.$store.getters.menuList:");
      // console.log(this.$store.getters.menuList);
      return this.$store.getters.menuList;
    },
    local() {
      return this.$store.state.app.local;
    },
    hasReadErrorPage() {
      return this.$store.state.app.hasReadErrorPage;
    },
    unreadCount() {
      return this.$store.state.user.unreadCount;
    },
  },
  methods: {
    ...mapMutations([
      "setBreadCrumb",
      "setTagNavList",
      "addTag",
      "setLocal",
      "setHomeRoute",
      "closeTag",
    ]),
    ...mapActions([
      "handleLogin",
      "getUnreadMessageCount",
      "getqiyeName",
      "getxitongremainDay",
    ]),
    turnToPage(route) {
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name,
        params,
        query,
      });
    },
    handleCollapsedChange(state) {
      this.collapsed = state;
    },
    handleCloseTag(res, type, route) {
      if (type !== "others") {
        if (type === "all") {
          this.turnToPage(this.$config.homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    handleClick(item) {
      this.turnToPage(item);
    },
    //顶部显示机构名称
    Getqiye() {
      this.isbigRole = false;
      this.getqiyeName().then((res) => {
        if (res.code == "Y" && res.success == true) {
          if (res.obj.length < 2) {
            this.jigou = res.obj[0];
          } else {
            this.isbigRole = true;
            this.jigou = res.obj;
          }
        }
      });
    },
    getxitongdays() {
      this.getxitongremainDay().then((res) => {
        if (res.code == "Y" && res.success == true) {
          if (res.obj < 10) {
            this.$Message["error"]({
              top: 50,
              content: "系统还有" + res.obj + "天到期，为保证系统正常使用，请及时续费。",
              duration: 10,
              closable: true,
              background: true,
            });
          }
        }
      });
    },
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTag({
        route: { name, query, params, meta },
        type: "push",
      });
      this.setBreadCrumb(newRoute);
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.$refs.sideMenu.updateOpenName(newRoute.name);
    },
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.getxitongdays();
    this.Getqiye();
    this.setTagNavList();
    this.setHomeRoute(routers);
    const { name, params, query, meta } = this.$route;
    this.addTag({
      route: { name, params, query, meta },
    });
    this.setBreadCrumb(this.$route);
    // 设置初始语言
    this.setLocal(this.$i18n.locale);
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find((item) => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName,
      });
    }
    // 获取未读消息条数
    //this.getUnreadMessageCount()
  },
};
</script>
<style>
.oneLineInfo {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  /* font-style: 14px; */
}
.oneLineInfo:hover {
  color: #2d8cf0;
}
</style>
