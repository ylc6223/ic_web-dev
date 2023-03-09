
<template>
  <el-container style="height: 100%;">
    
    <el-container>
      <el-header style="height: auto;overflow: hidden;padding: 0;">
       
        <div style="padding: 5px 20px;margin:10px 0px; background-color: #F2F6FC;">
          <el-row :gutter="15">
            <!-- <el-col :span="2"><span style="font-size: 20px;">金额：</span></el-col> -->
            <el-col :span="9">
              <el-input v-model="Input.planName"  clearable  prefix-icon="el-icon-user-solid" placeholder="名称"></el-input>
            </el-col>
            <el-col :span="6">
              <el-input v-model="Input.Value"  clearable  prefix-icon="el-icon-user-solid" placeholder="单价"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button style="margin-left: 5px;" type="success" @click="addPricePlan">添加</el-button>
              <el-button style="margin-left: 5px;" type="warning" @click="updatePricePlan">修改</el-button>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main style="padding: 0;">

            <el-table  :data="PricePlanList.items" style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
              <el-table-column prop="planName" label="名称" >
              </el-table-column>
              <el-table-column prop="newMeterNo" label="水价" width="150">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.prices[0] ? scope.row.prices[0].money:"-" }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                
                <template slot-scope="scope">
                  <el-button size="mini"  type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                
              </el-table-column>
            </el-table>
            <!-- <el-pagination @current-change="queryTabList(tabName)" :page-size="UserMeterReplace.pageSize"
              :current-page="UserMeterReplace.page" style="text-align: center;" layout="prev, pager, next"
              :total="UserMeterReplace.totalPages">
            </el-pagination> -->


      </el-main>
      <el-footer height="50">
        <el-pagination @current-change="PageCurrentChange" :page-size="PricePlanList.pageSize"
              :current-page="PricePlanList.page" style="text-align: center;" layout="prev, pager, next"
              :total="PricePlanList.total">
            </el-pagination>
      </el-footer>
    </el-container>
    
  </el-container>
</template>
<script>
import { getPricePlanPage,postPricePlan,putPricePlan,deletePricePlan } from '@/api/Price'

export default {
  data() {
    return {
      Input:{
        planName:"",
        Value:"",
      },
      PricePlanList:{
        page:1,
        pageSize:5
      },
      NowRow:{},
    }
  },
  created() {
    this.QueryPricePage();
  },
  methods: {
    PageCurrentChange(val){
      this.PricePlanList.page = val;
      this.QueryPricePage();
    },
    QueryPricePage(){
      let that = this;
        that.NowRow = {};
        that.Input.planName = "";
        that.Input.Value = "";
      getPricePlanPage({page:that.PricePlanList.page,pageSize:that.PricePlanList.pageSize}).then(res => {
        that.PricePlanList = res.result;
      });
    },
    handleCurrentChange(val){
      this.NowRow = val;
      this.Input.planName = this.NowRow.planName;
      this.Input.Value = this.NowRow.prices[0]?.money??"";
    },
    addPricePlan(){
      postPricePlan(this.Input).then(res=>{
        if(res.code == 200){
          this.$message({
                type: 'success',
                message: '添加成功'
              });
          this.QueryPricePage();
        }
      });
    },
    updatePricePlan(){
      this.NowRow.planName = this.Input.planName;
      this.NowRow.prices[0].money = this.Input.Value;
      putPricePlan(this.NowRow).then(res=>{
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          this.QueryPricePage();
      });
    },
    handleDelete(index,row){
      deletePricePlan(row.id).then(res=>{
        
        this.$message({
              type: 'success',
              message: '删除成功'
            });
        this.QueryPricePage();
      });
    }
  },
}
</script>
<style>
.MoneyText span {
  margin: 0 15px;
  font-size: medium;
  color: #909399;

}

.MoneyText span b {
  font-size: large;
  color: #303133;

}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.el-card__body {
  height: 100%;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}</style>