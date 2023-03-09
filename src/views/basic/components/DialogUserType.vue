
<template>
  <el-container style="height: 100%;">
    
    <el-container>
      <el-header style="height: auto;overflow: hidden;padding: 10px;">
       
        <el-card class="box-card">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="small"  label-position="right" label-width="90px"
            class="demo-ruleForm">
            <el-row :gutter="1">
              <el-col :span="6">
                <el-form-item label="类型名" prop="showName" placeholder="类型名">
                  <el-input v-model="ruleForm.showName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="小数位" prop="digits">
                  <el-select v-model="ruleForm.digits" placeholder="小数位">
                    <!-- <el-option v-for="item in MeterSetterList" :key="item.id" :label="item.showName" :value="item.id">
                    </el-option> -->
                    <el-option label="0.1" value="0.1"></el-option>
                    <el-option label="0.01" value="0.01"></el-option>
                    <el-option label="10" value="10"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="最大购买量" prop="maxPayValue">
                  <el-input v-model="ruleForm.maxPayValue"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="预置量" prop="preset">
                  <el-input v-model="ruleForm.preset"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="1">
              <el-col :span="6">
                <el-form-item label="显示报警量" prop="showWarn">
                  <el-input v-model="ruleForm.showWarn"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="6">
                  <el-form-item label="关阀报警量" prop="closeValue">
                    <el-input v-model="ruleForm.closeValue"></el-input>
                  </el-form-item>
                </el-col>
            <el-col :span="12">
              <el-button style="float: right;margin-left: 5px;" type="primary" @click="updateMeterSetter">修 改</el-button>
              <el-button style="float: right;margin-left: 5px;" type="success" @click="submitForm('ruleForm')">添 加</el-button>
            </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-header>
      <el-main style="padding: 5px;">

            <el-table size="mini" :data="MeterSetterList.items" style="width: 100%" highlight-current-row @current-change="handleCurrentChange">
              <el-table-column prop="showName" label="名称" >
              </el-table-column>
              <el-table-column prop="digits" label="小数位" >
              </el-table-column>
              <el-table-column prop="maxPayValue" label="最大购买量" >
              </el-table-column>
              <el-table-column prop="preset" label="预置量" >
              </el-table-column>
              <el-table-column prop="showWarn" label="显示报警量" >
              </el-table-column>
              <el-table-column prop="closeValue" label="关阀报警量" >
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
        <el-pagination @current-change="PageCurrentChange" :page-size="MeterSetterList.pageSize"
              :current-page="MeterSetterList.page" style="text-align: center;" layout="prev, pager, next"
              :total="MeterSetterList.total">
            </el-pagination>
      </el-footer>
    </el-container>
    
  </el-container>
</template>
<script>
import { getMeterSetterPage,postMeterSetter,putMeterSetter,deleteMeterSetter } from '@/api/meterStter'

export default {
  data() {
    return {
      ruleForm: {
        showName: "",
        digits: "0.1",
        maxPayValue: 1000,
        preset: 2.5,
        showWarn: 2,
        closeValue: 2,
      },
      rules: {
        showName: [
          { required: true, trigger: "blur", message: "请输入类型名称" }
        ],
        digits: [
          { required: true, trigger: "blur", message: "请选择计算小数位" }
        ],
      },
      MeterSetterList:{
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
      this.MeterSetterList.page = val;
      this.QueryPricePage();
    },
    QueryPricePage(){
      let that = this;
        getMeterSetterPage({page:that.MeterSetterList.page,pageSize:that.MeterSetterList.pageSize}).then(res => {
        that.MeterSetterList = res.result;
        that.resetForm("ruleForm");
      });
    },
    handleCurrentChange(val){
      this.NowRow = val;
      this.ruleForm = val;
      console.log("rrrrrrrr",val);
    },
    addMeterSetter(){
      postMeterSetter(this.ruleForm).then(res=>{
        if(res.code == 200){
          this.$message({
                type: 'success',
                message: '添加成功'
              });
          this.QueryPricePage();
        }
      });
    },
    updateMeterSetter(){
      /* this.NowRow.planName = this.Input.planName;
      this.NowRow.prices[0].money = this.Input.Value; */
      this.ruleForm.id = this.NowRow.id;
      putMeterSetter(this.ruleForm).then(res=>{
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          this.QueryPricePage();
      });
    },
    handleDelete(index,row){
      deleteMeterSetter(row.id).then(res=>{
        
        this.$message({
              type: 'success',
              message: '删除成功'
            });
        this.QueryPricePage();
      });
    },
    submitForm(formName) {
      let that =this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.addMeterSetter();
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
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