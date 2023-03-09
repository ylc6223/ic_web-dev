<!--
 * @Author: liutong
 * @Date: 2023-01-06 09:28:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 13:41:15
 * @Descripttion:
 * @FilePath: \ic_web\src\page\index.vue
-->

<template>
  <el-container class="avue-contail">
    <el-header height="50" class="avue-header"  >
      <Header></Header>
    </el-header>
    <el-main class="avue-main">
      <keep-alive>
        <transition name="fade-transverse">
          <router-view v-if="$route.meta.keepAlive" />
        </transition>
      </keep-alive>
      <transition name="fade-transverse">
        <router-view v-if="!$route.meta.keepAlive" />
      </transition>
    </el-main>
    <el-footer height="30">系统版本：V1.0.1 版权所有：@泽尔公司</el-footer>
  </el-container>
</template>

<script>
import Header from "./header";
export default {
  name: 'index',
  components:{
    Header
  },
  data() {
    return {
    }
  },
  created() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.avue-contail {
  height: 100%;
}
.avue-main {
  padding: 0;
  border: #eee 1px solid;
}
.avue-header{
  background-color: #eee;
  padding: 0;
}
</style>
