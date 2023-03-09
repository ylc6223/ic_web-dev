/*
 * @Author: liutong
 * @Date: 2023-01-04 13:31:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 18:59:52
 * @Descripttion: 前端路由表,使用按需加载方式,优化首屏渲染速度
 * @FilePath: \ic_web\src\router\page\index.js
 */

import Layout from '@/page/index.vue';

const Login = () => import("@/views/login.vue");
const Basic = () => import("@/views/basic/index.vue");
const IcCrad = () => import("@/views/icCrad/index.vue");
const Statement = () => import("@/views/statement/index.vue");
const System = () => import("@/views/system/index.vue");


export default {
  routes: [
    { 
      path:'/login',
      name:'login',
      component:Login
    },
    { 
      path: "/", 
      component: Layout, 
      redirect: '/basic',
      children:[
        {
          //基本管理
          path:'/basic',
          name:'basic',
          component:Basic
        },
        { 
          //IC卡售水
          path: "/icCrad", 
          name:'icCrad',
          component: IcCrad, 
          // meta: { keepAlive: true }, 
        },
        {
          // 报表管理
          path:'/statement',
          name:'statement',
          component:Statement
        },
        { 
          // 系统管理
          path: "/system", 
          name:'system',
          component: System, 
          // meta: { keepAlive: true }, 
        },
      ]
    },  
  ],
};
