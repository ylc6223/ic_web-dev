/*
 * @Author: liutong
 * @Date: 2023-01-04 13:25:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-05 17:53:54
 * @Descripttion: 
 * @FilePath: \ic_web\src\utils\auth.js
 */
import Cookies from 'js-cookie'
const TokenKey = 'x-access-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
