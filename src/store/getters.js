/*
 * @Author: liutong
 * @Date: 2023-01-04 20:08:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-04 20:14:42
 * @Descripttion: 
 * @FilePath: \ic_web\src\store\getters.js
 */

const getters = {
  userInfo: state => state.user.userInfo,
  pageTitle: state => state.user.pageTitle,
  ops: state => state.user.ops,
  group: state => state.user.group,
  list: state => state.user.list,

  cardId:state => state.card.cardId,
}

export default getters
