/*
 * @Author: liutong
 * @Date: 2023-01-04 13:22:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 11:28:15
 * @Descripttion: 路由封装
 * @FilePath: \ic_web\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from "vue-router";
import PageRouter from "./page/";
// import Store from '../store';

Vue.use(VueRouter);

const Router = new VueRouter(PageRouter);

// 路由拦截器
// 路由钩子事件处理,处理路由进出的loading
// 可以修改成一个loading组件,放在App.js中,在store中维护一个是否显示的key来进行控制
// let loadingInstance = null;
Router.beforeEach((to, from, next) => {
  // loadingInstance = ELEMENT.Loading.service({ fullscreen: true });
  // Store.dispatch('changeLoading',true)
  next();
});
Router.afterEach((to, from) => {
  // loadingInstance.close();
  // Store.dispatch('changeLoading',false)
});

export default Router;
