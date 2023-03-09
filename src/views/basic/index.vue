<!--
 * @Author: liutong
 * @Date: 2023-01-04 19:20:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 20:09:18
 * @Descripttion: 基本管理
 * @FilePath: \ic_web\src\views\basic\index.vue
-->
<template>

  <el-container class="avue-contail">
      <el-header height="50" class="avue-header" style="padding: 0;"  >
        <Menu
        :activeIndex="activeIndex"
        :menuList="menuList"
        @select="handleSelect"
      ></Menu>
      </el-header>
      <el-main class="home" style="background-color: #eee;">
        <Dialog
        :visible="nowMenu=='UserMoneyAdd'"
        @close="nowMenu=''"
      >
        <template slot="title">
          <div>业主充值</div>
        </template>
        <template v-slot:content>
          <DialogUserPay></DialogUserPay>
        </template>
      </Dialog>

      <Dialog
        :visible="nowMenu=='UserAdd'"
        @close="nowMenu=''"
      >
        <template slot="title">
          <div>业主开户</div>
        </template>
        <template v-slot:content>
          <DialogUserAdd></DialogUserAdd>
        </template>
      </Dialog>


      <Dialog :visible="nowMenu=='UserMeterUpdate'" @close="nowMenu=''">
        <template slot="title">
          <div>用户换表</div>
        </template>
        <template v-slot:content>
          <DialogUserMeterUpdate></DialogUserMeterUpdate>
        </template>
      </Dialog>

      <Dialog :visible="nowMenu=='NoUser'" @close="nowMenu=''">
        <template slot="title">
          <div>业主销户</div>
        </template>
        <template v-slot:content>
          <DialogNoUser></DialogNoUser>
        </template>
      </Dialog>

      <Dialog :visible="nowMenu=='M3Price'" @close="nowMenu=''" width="500px" height="480px">
        <template slot="title">
          <div>用户水价管理</div>
        </template>
        <template v-slot:content>
          <DialogM3Price></DialogM3Price>
        </template>
      </Dialog>


      <Dialog :visible="nowMenu=='UserType'" @close="nowMenu=''" width="800px" height="600px">
        <template slot="title">
          <div>用户类型管理</div>
        </template>
        <template v-slot:content>
          <DialogUserType></DialogUserType>
        </template>
      </Dialog>

      </el-main>
    </el-container>

  </template>
  <script>
   import { getUserPage } from '@/api/user'
  import Menu from "@/components/menu.vue";
  import DialogUserAdd from "./components/DialogUserAdd.vue";
  import DialogUserPay from "./components/DialogUserPay.vue";
  import DialogUserMeterUpdate from "./components/DialogUserMeterUpdate.vue";
  import DialogNoUser from "./components/DialogNoUser.vue";
  import DialogM3Price from "./components/DialogM3Price.vue";
  import DialogUserType from "./components/DialogUserType.vue";

  export default {
    data(){
      return{
        activeIndex:'',
        menuList:[
          {label:'业主充值',icon:'pay.png', path:'UserMoneyAdd'},
          {label:'业主开户',icon:'adduser.png', path:'UserAdd'},
         // {label:'业主补卡',icon:'bk.png', path:'UserCardAdd'},
          {label:'业主换表',icon:'change.png', path:'UserMeterUpdate'},
         // {label:'取消交易',icon:'qx.png', path:'NoOrder'},
          {label:'业主销户',icon:'xh.png', path:'NoUser'},
          {label:'用户水价管理',icon:'fp.png', path:'M3Price'},
          {label:'用户类型管理',icon:'usertype.png', path:'UserType'},
         // {label:'仪表管理',icon:'tab.png', path:'UserMeter'},
        ],
        nowMenu:"UserMoneyAdd",
        where:{
          KeyWords:"",
          Page:1,
          PageSize:20
        },
        visible:false,
        visible1:false,
      }
    },
    components:{
      Menu,
      DialogUserAdd,
      DialogUserPay,
      DialogUserMeterUpdate,
      DialogNoUser,
      DialogM3Price,
      DialogUserType
    },
    //
    created(){
       /* getUserPage(where).then(res=>{
         console.log('res',res)
       }) */
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
        this.nowMenu = key;
        switch(key){
          case "1" :
            this.visible = true;
            break;
          case "2":
            this.visible1 = true;
            break;
        }
      },
    },
    // 销毁
    destroyed(){

    }
  }
  </script>
  <style lang="scss" scoped>
  .home {
    background: url("../../assets/ShowHuaMeiHome.jpg") center center no-repeat ;
    background-size:cover;
  }
  </style>
