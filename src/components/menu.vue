<!--
 * @Author: liutong
 * @Date: 2023-01-06 19:18:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 19:42:02
 * @Descripttion: 
 * @FilePath: \ic_web\src\components\menu.vue
-->
<template>
  <el-menu :default-active="activeIndex" style="background-color:inherit;"  class="el-menu" mode="horizontal" @select="handleSelect">
    <template v-for="(e,i) in menuList">
      <el-menu-item :key="i" :index="e.path" v-if="!e.children">
        <img :src="require(`@/assets/${e.icon}`) " alt="">
        <span style="padding: 0 5px;">{{e.label}}</span>
      </el-menu-item>
      <el-submenu  :key="i" :index="e.path" v-else>
        <template slot="title">
          <img :src="require(`@/assets/${e.icon}`) " alt="">
          <span >{{e.label}}</span>
        </template>
        <el-menu-item v-for="(item,index) in e.children" :key="index" :index="item.path" >
          <img :src="require(`@/assets/${item.icon}`) " alt="">
          <span>{{item.label}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
export default {
  props: {
    activeIndex:{
      type:String,
      default:()=>''
    },
    menuList:{
      // type:Object,
      required: true,
      default:()=>[]
    },
  },
  data () {
    return {
    }
  },
  methods:{
    handleSelect(key,keyPath){
      this.$emit('select',key,keyPath)
    }
  }
}
</script>