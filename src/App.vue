<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
/*全局引入iconfont在线样式 css */
	@import url('https://at.alicdn.com/t/font_2549166_33cbcih50t8.css');

#app {
  .size;
}
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
