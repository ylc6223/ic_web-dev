/*
 * @Author: liutong
 * @Date: 2023-01-04 13:25:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-04 20:14:14
 * @Descripttion: 全局变量
 * @FilePath: \ic_web\src\store\index.js
 */
'use strict'
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import card from './modules/card'
import getters from './getters'


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user,
    card,
  },
  getters,
});