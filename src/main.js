import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import VueJsonp from 'vue-jsonp';
import 'vue-easytable/libs/themes-base/index.css';
import {VTable,VPagination} from 'vue-easytable';

// 注册到全局
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
Vue.use(VueJsonp);
Vue.use(Vant);

//全局注册axios，使用方法为:this.$axios
Vue.prototype.$axios = axios;
// 本地开发配置——————————————————————————————————————————————————————————
// axios.defaults.baseURL = '/api/'; // api 即上面 vue.config.js 中配置的地址
// Vue.prototype.$src = '/api/';//全局注册图片加载地址
// 打包上线配置——————————————————————————————————————————————————————————
// axios.defaults.baseURL = 'http://2019ncov.nosugartech.com/';//api前缀
// Vue.prototype.$src = 'http://2019ncov.nosugartech.com/';//全局注册图片加载地址
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
