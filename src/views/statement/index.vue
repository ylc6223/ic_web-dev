<!--
 * @Author: liutong
 * @Date: 2023-01-04 19:20:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 19:47:08
 * @Descripttion: IC卡售水
 * @FilePath: \ic_web\src\views\icCrad\index.vue
-->
<template>
  <div class="">
    <Menu
      :activeIndex="activeIndex"
      :menuList="menuList"
      @select="handleSelect"
    ></Menu>

    <Dialog
      :visible="visible"
      @close="handleClose"
    >
      <template slot="title">
        <h1>弹窗1</h1>
      </template>
      <template v-slot:content>
        <p>2222222222</p>
      </template>
    </Dialog>

    <Dialog
      :visible="visible1"
      @close="handleClose1"
    >
      <template slot="title">
        <h1>弹窗2</h1>
      </template>
      <template v-slot:content>
        <p>3333333333333</p>
      </template>
    </Dialog>
  </div>
</template>
<script>
// import { getUser } from '@/api/user'
import Menu from "@/components/menu.vue";
export default {
  data(){
    return{
      activeIndex:'',
      menuList:[
        {label:'业主购买明细',icon:'xgfymx.png', path:'11'},
        {label:'业主购买统计',icon:'srmx.png', path:'12'},
        {label:'退购明细',icon:'tgmx.png', path:'13'},
        {label:'取消交易明细',icon:'wxmx.png', path:'14'},
        {label:'补卡明细',icon:'salemx.png', path:'15'},
      ],
      visible:false,
      visible1:false,
    }
  },
  components:{
    Menu
  },
  //
  created(){
    // getUser().then(res=>{
    //   console.log('res',res)
    // })
  },
  mounted(){

  },
  // 计算变量
  computed:{

  },
  // 监听
  watch:{

  },
  //方法
  methods:{
    handleSelect(key,keyPath) {
      console.log(key,keyPath)
    },
    handleClick(){
      this.visible = true;
      console.log('111111111111')
    },
    handleClick1(){
      this.visible1 = true;
      console.log('2222222')
    },
    handleClose(value){
      this.visible = value;
    },
    handleClose1(value){
      this.visible1 = value;
    }
  },
  // 销毁
  destroyed(){

  }
}
</script>
<!-- <style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  position: relative;
}
</style> -->
