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

//解析指令
export function AnalysisCode(strCode) {
  return request({
      url: `/api/Bus/AnalysisCode`,
      method: 'get',
      params: {strCode}
  })
}


//查询卡
export function CreateQueryCard() {
  return request({
      url: `/api/Bus/CreateQueryCard`,
      method: 'get',
      params: {}
  })
}

//设置卡
export function CreateSetupCard(params) {
  return request({
      url: `/api/Bus/CreateSetupCard`,
      method: 'get',
      params: params
  })
}

//累加卡
export function CreateLJKCard(params) {
  return request({
      url: `/api/Bus/CreateLJKCard`,
      method: 'get',
      params: params
  })
}
//用户卡
export function CreateUserCard(params) {
  return request({
      url: `/api/Bus/CreateUserCard`,
      method: 'get',
      params: params
  })
}
//退购卡
export function CreateTGCard(params) {
  return request({
      url: `/api/Bus/CreateTGCard`,
      method: 'get',
      params: params
  })
}


//写卡完成
export function WriteCardOver(data) {
  return request({
      url: `/api/MeterLink/meterLink/ICWrite/Over`,
      method: 'post',
      data: data
  })
}
