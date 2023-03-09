/*
 * @Author: liutong
 * @Date: 2023-01-03 13:21:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 14:10:40
 * @Descripttion:
 * @FilePath: \ic_web\src\main.js
 */
import Vue from 'vue';
import Store from './store';
import axios from './utils/axios';
import VueAxios from 'vue-axios';
import router from './router/index.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import options from './directive/drag.js'
Vue.directive("dialogDrag",options)
import Dialog from "@/components/dialog";

Vue.component('Dialog', Dialog)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  store: Store,
  render: h => h(App),
});


