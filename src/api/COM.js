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

let baseUrl = 'http://localhost:7157';

//串口发送指令
export function COMWrite(data) {
  return request({
      url: baseUrl+`/api/COM/Write`,
      method: 'post',
      data: data
  })
}


//IC卡读卡
export function ICRead() {
  return request({
      url: baseUrl+`/api/IC/ReadCard`,
      method: 'post',
      data: {}
  })
}

//IC卡写卡
export function ICWrite(strCode) {
  return request({
      url: baseUrl+`/api/IC/WriteCard`,
      method: 'post',
      data: {Data:strCode}
  })
}


//IC卡清卡
export function ICClear() {
  return request({
      url: baseUrl+`/api/IC/ClearCard`,
      method: 'post',
      data: {}
  })
}

