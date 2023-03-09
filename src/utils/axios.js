/*
 * @Author: liutong
 * @Date: 2022-10-12 13:11:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 11:16:35
 * @Descripttion: http配置
 * @FilePath: \ic_web\src\utils\axios.js
 */

import axios from 'axios'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style


const errorCode = {
    '401': '当前操作没有权限',
    '403': '当前操作没有权限',
    '404': '资源不存在',
    '417': '未绑定登录账号，请使用密码登录后绑定',
    '423': '演示环境不能操作，如需了解联系冷冷',
    '426': '用户名不存在或密码错误',
    '428': '验证码错误,请重新输入',
    '429': '请求过频繁',
    '479': '演示环境，没有权限操作',
    'default': '系统未知错误,请反馈给管理员'
}

// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

NProgress.configure({ showSpinner: false })// NProgress Configuration
//  let msg

// HTTP请求拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  //if (store.getters.access_token) {
    //eed4a693-0c5f-4b2b-a5f8-ed3d20db3c9f
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    //config.headers['Authorization'] = 'Bearer ' + 'eed4a693-0c5f-4b2b-a5f8-ed3d20db3c9f' // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  //}
  return config
}, error => {
  LogOut();
  return Promise.reject(error)
})

// HTTP响应拦截
axios.interceptors.response.use(data => {
  NProgress.done()
  if(data.data.code == 401){

    LogOut();
    return Promise.reject(new Error(data.data.message))
  }
  return data.data
}, error => {
  NProgress.done()
  let errMsg = error.toString()
  let code = errMsg.substr(errMsg.indexOf('code') + 5)
  if(code == 401){
    let data = error.response.data;
    if(data.msg === "密码错误！"){
      Message({
        message: '用户名或密码错误,请重新输入',
        type: 'error'
      });
    }else if(data.error_description == 'notbindcompany'){
      Message({
        message: '您暂未绑定公司,请联系管理员',
        type: 'error'
      });
    }else if(data.error_description == 'noauthset'){
      Message({
        message: '您暂未设置权限,请联系管理员',
        type: 'error'
      });
    }else{
      Message({
        message: errorCode[code] || errorCode['default'],
        type: 'error'
      })
    }
  }else{
    Message({
      message: errorCode[code] || errorCode['default'],
      type: 'error'
    })
  }
  return Promise.reject(new Error(error))
})

//退出
async function LogOut() {
  store.dispatch('logout');
}
export default axios
