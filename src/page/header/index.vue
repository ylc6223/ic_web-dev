<!--
 * @Author: liutong
 * @Date: 2023-01-06 09:56:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 19:25:44
 * @Descripttion: 
 * @FilePath: \ic_web\src\page\header\index.vue
-->
<template>
  <Menu
    background-color="#eee"
    :activeIndex="activeIndex"
    :menuList="menuList"
    @select="handleSelect"
  ></Menu>
</template>

<script>
import Menu from "@/components/menu.vue";
export default {
  name: 'index',
  data() {
    return {
      activeIndex: '1',
      menuList:[
        {label:'基本管理',icon:'baseinfo.png', path:'basic'},
        {label:'IC卡操作',icon:'ICcard.png', path:'icCrad'},
        {label:'报表管理',icon:'bkmx.png', path:'statement'},
        {label:'系统管理',icon:'wy.png', path:'system',children:[
          {label:'操作员管理',icon:'usermx.png', path:'1'},
          {label:'修改用户密码',icon:'wx.png', path:'2'},
         // {label:'小区信息设置',icon:'bkmx.png', path:'3'},
          {label:'硬件设备设置',icon:'yj.png', path:'4'},
          {label:'系统帮助信息',icon:'tsmx.png', path:'5'},
         // {label:'清除注册信息',icon:'bkmx.png', path:'6'},
        ]},
        {label:'退出系统',icon:'xh.png', path:'login'},
      ]
    }
  },
  components:{
    Menu
  },
  methods: {
    handleSelect(key,keyPath) {
      if(keyPath[0] !== "system"){
        this.$router.push({ 
          name:keyPath[0],
          params:{
            type:key
          }
        },()=>{})
      }
    }
  },
}
</script>

