/*
 * @Author: liutong
 * @Date: 2023-01-04 20:10:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 11:15:28
 * @Descripttion: 用户模块相关 store
 * @FilePath: \ic_web\src\store\modules\user.js
 */

'use strict'
import Cookie from 'js-cookie';
import router from "@/router/index";
import { setToken } from '@/utils/auth'
import { Login } from '@/api/login'

let UserData = {
  state:{
    userInfo: {}, // 当前登录用户信息
    pageTitle: '欢迎使用IC卡售水管理系统', // 
    ops:false, // 
    group:{}, // 
    list: [], // 
  },
  mutations: {
    getUserinfo(state,data){
      state.userInfo =  data;
    },
		getPageTitle(state,data){
      state.pageTitle =  data;
    },
    getGroup(state,data){
      state.group =  data;
    },
    getOps(state,data){
      state.ops =  data;
    },
    getList(state,data){
      state.list =  data;
    },
  },
  
  actions:{
    changeUserinfo(contenx,data) {
      contenx.commit('getUserinfo',data);
    },
		changePageTitle({ commit },data) {
      commit('getPageTitle',data);
    },
		changeGroup({ commit },data) {
      commit('getGroup',data);
    },
    changeOps({ commit },data) {
      commit('getOps',data);
    },
		changeCompanyList({ commit },data) {
      commit('getCompanyList',data);
    },
		Login({ commit },data) {
      return new Promise((resolve, reject) => {
        Login(data).then(response => {
          const data1 = response.result;
          console.log(data1);
         // Cookie.set('Token', response.data.token) //登录成功后将token存储在cookie之中
          setToken(data1.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        });
      });
    
    },

    //登出
    logout({ commit }){
      window.access_token = null;
      commit('access_token', '')
      Cookie.remove('access_token');
      router.push({path:'/login'})
    }
  },
  modules: {
  }
}

export default UserData;