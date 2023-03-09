/*
 * @Author: liutong
 * @Date: 2023-01-04 20:10:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-04 20:37:07
 * @Descripttion: 卡模块相关 store
 * @FilePath: \ic_web\src\store\modules\card.js
 */

'use strict'
import { setStore, getStore, removeStore } from '@/utils/store.js'
// import Cookie from 'js-cookie';
// import ajax from '../../utils/ajax';
// import config from "../../config/index";

let CardData = {
  state:{
    cardId: getStore({ name: 'cardId' }) || '',
  },
  mutations: {
    //存储卡号
    setCardId(state,data){
      state.cardId = data;
      setStore({
				name: 'cardId',
				content: state.cardId
			})
    },
    //移除卡号
    removeCardId(state,data){
      state.cardId = '';
			removeStore({
				name: 'cardId'
			});
    }
  },
  actions:{
    changeCardId(contenx,data) {
      contenx.commit('setCardId',data);
    },
  },
  modules: {
  }
}

export default CardData;