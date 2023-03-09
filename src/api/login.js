/*
 * @Author: liutong
 * @Date: 2023-01-04 19:51:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 11:14:24
 * @Descripttion: 
 * @FilePath: \ic_web\src\api\user.js
 */
'use strict'

import request from '@/utils/axios'

// 如果需要使用mock,打开这个注释,在mock.js中添加相应的服务地址即可
// import data from '../mock/mock.js';


export function getCodeImg(params) {
  return request({
      url: `/api/SysAuth/Captcha`,
      method: 'get',
      params: params
  })
}


export function Login(data) {
  return request({
      url: `/api/SysAuth/Login`,
      method: 'post',
      data: data
  })
}
