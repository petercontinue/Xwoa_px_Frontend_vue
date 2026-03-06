// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from '@/locale'
import config from '@/config'
import ViewUi from 'view-design';
import 'view-design/dist/styles/iview.css';
import Print from 'vue-print-nb' //打印
import './assets/icon_custom/iconfont.css'
import './assets/icon_qiandan/iconfont.css'


import VueQuillEditor from "vue-quill-editor"; 
import 'quill/dist/quill.core.css'; 
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';


import VueTippy, { TippyComponent } from "vue-tippy";
 
Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);



Vue.use(VueQuillEditor)


import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)


Vue.use(ViewUi, {
  i18n: (key, value) => i18n.t(key, value)
});


Vue.use(Print)
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
