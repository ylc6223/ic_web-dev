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
    <Menu :activeIndex="activeIndex" :menuList="menuList" @select="handleSelect"></Menu>



    <Dialog :visible="nowMenu == 'ReadCard'" @close="nowMenu = ''" width="370px" height="630px">
      <template slot="title">
        <div>读卡</div>
      </template>
      <template v-slot:content style="background: #f9f9f9">
        <el-container style="height: 100%;">
          <el-main style="height: 100%;padding: 10px 15px;background: #f9f9f9">

            <el-card class="box-card" style=" height: calc(100% - 5px); ">
              <el-form label-position="right" class="demo-table-expand" label-width="120px" size="mini">
                  <el-form-item label="卡类型:">
                    <span>{{ nowMap.text }}</span>
                  </el-form-item>
                  <el-form-item v-for="item in nowMap.showList" :label="item.text+':'">
                    <span>{{ ICCard.ReadData.data[item.key] }}</span>
                  </el-form-item>
                </el-form>
            </el-card>
          </el-main>
          <el-footer height="30" ><el-button type="primary" style=" width: 100%; margin: 15px 0px;" @click="ReadICCard">立即读卡</el-button></el-footer>
        </el-container>
      </template>
    </Dialog>




    <Dialog :visible="nowMenu == 'SetCard'" @close="nowMenu = ''" width="370px" height="630px">
      <template slot="title">
        <div>发设置卡</div>
      </template>
      <template v-slot:content style="background: #f9f9f9">
        <el-container style="height: 100%;">
          <el-main style="height: 100%;padding: 10px 15px;background: #f9f9f9">

            <el-card class="box-card" style=" height: calc(100% - 5px); ">


              <el-form label-position="right" class="demo-table-expand" label-width="120px" size="small">
                <el-form-item label="用户类型:" prop="meterSetterID">
                  <el-select v-model="nowSetter.id" placeholder="请选择用户类型"  @change="setterChange">
                    <el-option v-for="(item,index) in MeterSetterList" :key="index" :label="item.showName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                  <el-form-item label="硬件参数:">
                    <span>{{ nowSetter.digits }}</span>
                  </el-form-item>
                  <el-form-item label="显示报警量:">
                    <span>{{ nowSetter.showWarn }}</span>
                  </el-form-item>
                  <el-form-item label="关阀报警量:">
                    <span>{{ nowSetter.closeValue }}</span>
                  </el-form-item>
                  <el-form-item label="限购量:">
                    <span>{{ nowSetter.maxPayValue }}</span>
                  </el-form-item>
                  <el-form-item label="设置量:">
                    <span>{{ nowSetter.preset }}</span>
                  </el-form-item>
                </el-form>
            </el-card>
          </el-main>
          <el-footer height="30" ><el-button type="primary" style=" width: 100%; margin: 15px 0px;" @click="writeSetCard">立即写卡</el-button></el-footer>
        </el-container>
      </template>
    </Dialog>


  </div>
</template>
<script>
// import { getUser } from '@/api/user'
import { AnalysisCode,CreateTGCard ,CreateSetupCard} from '@/api/Bus'
import { ICRead,ICWrite } from '@/api/COM'
import { getMeterSetterList } from '@/api/meterStter'
import Menu from "@/components/menu.vue";
export default {
  data() {
    return {
      activeIndex: '',
      menuList: [
        { label: '读卡', icon: 'search.png', path: 'ReadCard' },
        { label: '清卡', icon: 'clear.png', path: 'ClearCard' },
        { label: '发清零卡', icon: 'writecard.png', path: 'Write0' },
        { label: '发设置卡', icon: 'writecard.png', path: 'SetCard' },
        { label: '发查询卡', icon: 'writecard.png', path: 'SelectCard' },
        { label: '发退购卡', icon: 'writecard.png', path: 'SetTGK' },
      //  { label: '发累计卡', icon: 'writecard.png', path: '17' },
      ],
      ICCard:{
        ReadString:'',
        ReadData:{},
        OkWrite:false
      },
      showKeyMap:[
        {
          _cardType:3,
          text:"用户卡",
          showList:[
            { key:"areaCode",text:"区域号"},
            { key:"cardType1",text:"类型"},//0.开户卡,1.用户卡,2.退购卡
            { key:"userNO",text:"用户编号"},
            { key:"time1",text:"表1购买次数"},
            { key:"value1",text:"表1购买量"},
            { key:"insert1",text:"是否插卡"},
            { key:"leftValue1",text:"限购量/剩余量"},//插过卡试剩余量，未插卡试剩余量
            { key:"flagState1",text:"表1阀门状态"},
            { key:"eleState1",text:"表1电池状态"},
            { key:"cgjState1",text:"表1磁攻击"}
          ]
        },
        {
          _cardType:0,
          text:"清零卡",
          showList:[
            { key:"areaCode",text:"区域号"}
          ]
        },
        {
          _cardType:6,
          text:"空卡"
        },
        {
          _cardType:1,
          text:"设置卡",
          showList:[
            { key:"areaCode",text:"区域号"},
            { key:"meterNo",text:"子表号"},
            { key:"devParam",text:"小数计量位"},
            { key:"time",text:"次数"},
            { key:"setValue",text:"设置量"},
            { key:"showWarn",text:"显示报警量"},
            { key:"offWarn",text:"关阀报警量"},
            { key:"limitValue",text:"限购量"},
            { key:"lessValue",text:"最低消费量"}
          ]
        },
        {
          _cardType:2,
          text:"查询卡",
          showList:[
            { key:"areaCode",text:"区域号"},
            { key:"userNO",text:"用户编号"},
            { key:"meterNO",text:"子表号"},
            { key:"offWarn",text:"关阀报警量"},
            { key:"limitValue",text:"限购量"},
            { key:"time",text:"次数"},
            { key:"sumBuyValue",text:"累计购买量"},
            { key:"leftValue",text:"剩余量"},
            { key:"sumUseValue",text:"累计用量"},
            { key:"overValue",text:"透支量"},
            { key:"flagState",text:"阀门状态"},
            { key:"setState",text:"是否设置过"},
            { key:"khState",text:"是否开户"},
            { key:"eleState",text:"电池状态"},
            { key:"cgjState",text:"磁攻击"}
          ]
        },
      ],
      nowMenu: "ReadCard",
      nowMap:{},
      MeterSetterList:[],
      nowSetter:{
        id:""
      }
    }
  },
  components: {
    Menu
  },
  //
  created() {
    // getUser().then(res=>{
    //   console.log('res',res)
    // })
  },
  mounted() {

  },
  // 计算变量
  computed: {

  },
  // 监听
  watch: {

  },
  //方法
  methods: {
   async ReadICCard(){

    let that = this;
    await ICRead().then(res=>{
        that.ICCard.ReadString = res;
        AnalysisCode(res).then(res1=>{
          that.ICCard.ReadData = res1.result;
          that.nowMap = that.showKeyMap.find(f=>f._cardType == that.ICCard.ReadData._cardType);
        });
      });
    },
    setterChange(val){
      let that = this;
      console.log("ssssssss",that.nowSetter.id);
      var daa = that.MeterSetterList.find(f=>f.id == that.nowSetter.id);

      that.nowSetter = Object.assign(that.nowSetter, daa);
      console.log("ssssssss",that.nowSetter);
    },
    SelectCard(){

      this.$confirm('确定要发查询卡吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ICWrite("105B58595E5F5C5D52535051565754084A4B48494E4F4C4D3D1C37FF").then(res=>{
              this.$message({
              type: 'success',
              message: '发查询卡成功!'
            });
          });
          //105B58595E5F5C5D52535051565754084A4B48494E4F4C4D3D1C37FF

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发查询卡'
          });
        });
    },
    writeQlk(){

      this.$confirm('确定要清卡吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          ICWrite("00000000000000000000000000000000000000000000000000000000").then(res=>{
              this.$message({
              type: 'success',
              message: '清卡成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清卡'
          });
        });
    },
    write0(){

      this.$confirm('确定要发清零卡吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          ICWrite("8D5B58595E5F5C5D52535051565754D54A4B48494E4F4C4D4D2833FD").then(res=>{
              this.$message({
              type: 'success',
              message: '发清零卡成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发清零卡'
          });
        });
    },
    writeTGK(){
      let that =this;
      this.$confirm('确定要发退购卡吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await that.ReadICCard();
          if(that.ICCard.ReadData._cardType != 3){
            this.$message.error('请放置需要退购的用户卡');
          }

          CreateTGCard({userNo:that.ICCard.ReadData.data.userNo,time:that.ICCard.ReadData.data.time}).then(res1=>{

            ICWrite(res1.result).then(res=>{
              this.$message({
                type: 'success',
                message: '发退购卡成功!'
              });
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发退购卡'
          });
        });
    },
    writeSetCard(){
      let that =this;
      CreateSetupCard({
        DevParam:that.nowSetter.digits,
        LimitValue:that.nowSetter.maxPayValue,
        ShowWarn:that.nowSetter.showWarn,
        OffWarn:that.nowSetter.closeValue,
        SetValue:that.nowSetter.preset,
        MeterNo:0,
        LessUse:false}).then(res1=>{

        ICWrite(res1.result).then(res=>{
              this.$message({
                type: 'success',
                message: '发设置卡成功!'
              });
            });
      });

    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)

      let that =this;
      this.nowMenu = key;
      switch (key) {
        case "ClearCard":
          that.writeQlk();
          break;

        case "Write0":
          that.write0();
          break;

          case "SelectCard":
          that.SelectCard();
          break;

          case "SetTGK":
          that.writeTGK();
          break;

          case "SetCard":

          getMeterSetterList().then(res => {
            that.MeterSetterList = res.result;
           // that.nowSetter = that.setterChange(that.MeterSetterList[0].id);
          });
          break
      }
    },
  },
  // 销毁
  destroyed() {

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
