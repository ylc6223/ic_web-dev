
<template>
  <el-container style="height: 100%;">
    <el-aside width="320px">
      <el-card class="box-card" style="height: calc(100% - 10px);margin: 2px 10px;">
        <div slot="header" class="clearfix">

        <!-- <el-autocomplete style="width: 100%;" v-model="where.keyWord" :fetch-suggestions="querySearchAsync"
            :trigger-on-focus="false" placeholder="请输入用户姓名/编号" @select="handleSelect">
            <template slot-scope="{ item }">
              <div class="name">{{ item.userNo + "." + item.userName }} <span class="addr">{{ item.phone }}</span></div>
              <span class="addr">表号：{{ item.defaultMeter.no }}</span>
            </template>
                  </el-autocomplete> -->
          <el-input placeholder="请输入用户姓名/编号/表号/手机号" v-model="where.keyWord" clearable @input="KeyWordInput"></el-input>
          <!-- <el-button  size="medium" style="float: right;" type="primary" icon="el-icon-search">搜索</el-button> -->
        </div>
        <div style="height: 100%;">
          <div style="font-size: 16px;font-weight: bold;background: wheat;padding: 0px 5px;">用户列表</div>
          <div style="height: calc(100% - 140px);overflow: auto;">
            <el-collapse accordion style="border: none;" :value="NowUser.id" @change="userChange">

              <el-collapse-item v-for="item in UserList" :name="item.id">
                <template slot="title">
                  {{ item.userNo }}.<span style="font-weight: bold;margin-right: 5px;">{{ item.userName }}</span> {{
                    item.phone }}<el-tag size="small" type="success" style="margin-left: 5px;">已制卡</el-tag>
                </template>
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item label="用户编号">
                    <span>{{ item.userNo }}</span>
                  </el-form-item>
                  <el-form-item label="用户姓名">
                    <span>{{ item.userName }}</span>
                  </el-form-item>
                  <el-form-item label="表号">
                    <span>{{ item.defaultMeter.no }}</span>
                  </el-form-item>
                  <el-form-item label="充值次数">
                    <span>{{ item.payCount }}</span>
                  </el-form-item>
                  <el-form-item label="硬件参数">
                    <span>{{ item.defaultMeter.digits }}</span>
                  </el-form-item>
                  <el-form-item label="累计购买">
                    <span>{{ item.paySumMoney }}</span>
                  </el-form-item>
                  <el-form-item label="房号">
                    <span>{{ item.roomText }}</span>
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>

      <!-- <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
                </div> -->
      </el-card>
    </el-aside>
    <el-container>
      <el-header style="height: auto;overflow: hidden;padding: 0;">
        <el-card class="box-card">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="true" size="small" label-position="right"
            label-width="80px" class="demo-ruleForm">
            <el-row :gutter="1">
              <el-col :span="5">
                <el-form-item label="姓名" prop="userName" placeholder="请输入姓名">
                  <el-input v-model="ruleForm.userName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="蓝牙表号" prop="no">
                  <el-input v-model="ruleForm.no" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="ruleForm.phone" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model="ruleForm.idCard" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="1">
              <el-col :span="5">
                <el-form-item label="楼栋" prop="roomText0">
                  <el-input v-model="ruleForm.roomText0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="单元" prop="roomText1">
                  <el-input v-model="ruleForm.roomText1"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="房号" prop="roomNumber">
                  <el-input v-model="ruleForm.roomNumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="备注" prop="expText">
                  <el-input v-model="ruleForm.expText"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="1">
              <el-col :span="6">
                <el-form-item label="用户类型" prop="meterSetterID">
                  <el-select v-model="ruleForm.meterSetterID" placeholder="请选择用户类型">
                    <el-option v-for="item in MeterSetterList" :key="item.id" :label="item.showName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="水价" prop="pricePlanID">
                  <el-select v-model="ruleForm.pricePlanID" placeholder="请选择水价" @change="payInput">
                    <el-option v-for="item in PricePlanList" :key="item.id" :label="item.planName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <div style="padding: 5px 20px;margin:10px 0px; background-color: #F2F6FC;">
          <el-row :gutter="15">
            <!-- <el-col :span="2"><span style="font-size: 20px;">金额：</span></el-col> -->
            <el-col :span="20">
              <el-input v-model="Input.expText" clearable  prefix-icon="el-icon-user-solid" placeholder="请输入销户原因"></el-input>
            </el-col>
           
            <el-col :span="4">
              <el-button style="margin-left: 5px;" type="danger" @click="sysToPay">确认销户</el-button>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col class="MoneyText" :span="18">
              <span>购水量：<b>{{ ruleForm.payM3 }}</b></span><span>充值金额：<b>{{ ruleForm.payMoney * 1 }}</b></span><span>应收：<b
                  style="color: red;">{{ (ruleForm.payMoney * 1) }}</b></span>
            </el-col>
          </el-row> -->
        </div>
      </el-header>
      <el-main style="padding: 0;">

        <el-tabs type="border-card" @tab-click="tabClick" v-model="tabName">

          <el-tab-pane label="充值记录" name="czjl">

            <el-table size="mini" :data="UserOrders.items" style="width: 100%">
              <el-table-column prop="rechargeNo" label="订单号" width="200">
              </el-table-column>
              <el-table-column prop="amount" label="充值金额">
              </el-table-column>
              <el-table-column prop="value" label="充值水量">
              </el-table-column>
              <el-table-column prop="payType" label="支付类型">
                <template slot-scope="scope">
                  <el-tag size="medium">{{ scope.row.payType == 0 ? "系统充值" : scope.row.payType == 1 ? "小程序充值" : "售后充值"
                  }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="订单状态">
                <template slot-scope="scope">
                  <el-tag size="medium" type="success">{{ scope.row.status == 0 ? "待支付" : scope.row.status ==
                    1 ? "已到账" : scope.row.status == 2 ? "待到账" : "取消交易" }}</el-tag>
                <!-- <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                          </el-popover> -->
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="日期" width="180">
              </el-table-column>
            </el-table>
            <el-pagination @current-change="queryTabList(tabName)" :page-size="UserOrders.pageSize"
              :current-page="UserOrders.page" style="text-align: center;" layout="prev, pager, next"
              :total="UserOrders.totalPages">
            </el-pagination>
          </el-tab-pane>

          <el-tab-pane label="补卡记录" name="bkjl">

            <el-table size="mini" :data="UserMakeCard.items" style="width: 100%">
              <el-table-column prop="payCount" label="补卡时充值次数" width="180">
              </el-table-column>
              <el-table-column prop="surplus" label="补卡时剩余量">
              </el-table-column>
              <el-table-column prop="use" label="补卡时累计使用量">
              </el-table-column>
              <el-table-column prop="money" label="补卡费用">
              </el-table-column>
              <el-table-column prop="createTime" label="日期" width="180">
              </el-table-column>
            </el-table>
            <el-pagination @current-change="queryTabList(tabName)" :page-size="UserMakeCard.pageSize"
              :current-page="UserMakeCard.page" style="text-align: center;" layout="prev, pager, next"
              :total="UserMakeCard.totalPages">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="换表记录" name="hbjl">
            <el-table size="mini" :data="UserMeterReplace.items" style="width: 100%">
              <el-table-column prop="oldMeterNo" label="旧表表号" width="150">
              </el-table-column>
              <el-table-column prop="newMeterNo" label="新表表号" width="150">
              </el-table-column>
              <el-table-column prop="oldHaveValue" label="旧表度数">
              </el-table-column>
              <el-table-column prop="newHaveValue" label="新表底度数">
              </el-table-column>
              <el-table-column prop="fillValue" label="补充量">
              </el-table-column>
              <el-table-column prop="newNowValue" label="新表度数">
              </el-table-column>
              <el-table-column prop="createTime" label="换表时间" width="180">
              </el-table-column>
            </el-table>
            <el-pagination @current-change="queryTabList(tabName)" :page-size="UserMeterReplace.pageSize"
              :current-page="UserMeterReplace.page" style="text-align: center;" layout="prev, pager, next"
              :total="UserMeterReplace.totalPages">
            </el-pagination>

          </el-tab-pane>
        </el-tabs>

      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { getUserList, postUser } from '@/api/user'
import { getPricePlanList } from '@/api/Price'
import { getMeterSetterList } from '@/api/meterStter'
import { getOrderPage, SysPay } from '@/api/order'
import { getMakeCardPage } from '@/api/makeCard'
import { getMeterReplacePage } from '@/api/meterReplace'

export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        openMoney: 100.00,
        GetShowMoney: 0,
        payM3: 0,
        payMoney: "",
        pricePlanID: "",
        meterSetterID: "",
        expText: "",
        roomNumber: "",
        roomText0: "",
        roomText1: "",
        roomText2: "",
        phone: "",
        no: "",
        idCard: ""
      },
      Input:{
        expText:"",
      },
      NowUser: {},
      UserList: [],
      AllUserList: [],
      PricePlanList: [],
      MeterSetterList: [],
      UserOrders: {},
      UserMakeCard: {},
      UserMeterReplace: {},
      tabName: "czjl",
      rules: {
        userName: [
          { required: true, trigger: "blur", message: "请输入您的姓名" }
        ],
        meterSetterID: [
          { required: true, trigger: "blur", message: "请选择您的用户类型" }
        ],
        pricePlanID: [
          { required: true, trigger: "blur", message: "请选择一个水价" }
        ],
      },
      where: {
        keyWord: ""
      },
      orderWhere: {
        Page: 1,
        PageSize: 5,
      },
    }
  },
  created() {
    let that = this;
    console.log("eeeeeeeeeee");
    that.queryUserAsync();
    getPricePlanList().then(res => {
      that.PricePlanList = res.result;
    });
    getMeterSetterList().then(res => {
      that.MeterSetterList = res.result;
    });
  },
  methods: {
    payInput() {
      let that = this;
      var price = that.PricePlanList.find(f => f.id == that.ruleForm.pricePlanID);
      if (!price || !price?.prices[0]?.money) {
        that.ruleForm.payM3 = '-';
        return;
      }
      that.ruleForm.payM3 = that.ruleForm.payMoney / price?.prices[0]?.money ?? "0";
    },
    tabClick(tab) {
      let that = this;
      that.tabName = tab.name;
      that.queryTabList(that.tabName);
    },
    userChange(activeName) {
      if (!activeName) {
        that.NowUser = null;
        this.resetForm("ruleForm");
        return;
      }
      let that = this;
      that.NowUser = that.UserList.find(f => f.id == activeName);

      that.queryTabList(that.tabName);

      that.ruleForm = Object.assign(that.ruleForm, that.NowUser);
      var rtArr = that.NowUser.roomText.split(">");
      console.log("id:", rtArr);
      that.ruleForm.no = that.NowUser.defaultMeter.no;
      that.ruleForm.roomText0 = rtArr[0];
      that.ruleForm.roomText1 = rtArr[1];
      that.ruleForm.roomNumber = rtArr[2];
      that.ruleForm.meterSetterID = that.NowUser.defaultMeter.meterSetterID;
      that.ruleForm.pricePlanID = that.NowUser.defaultMeter.pricePlanID;
      that.ruleForm.GetShowMoney = that.ruleForm.openMoney + that.ruleForm.payMoney;
      console.log("showmo", that.ruleForm.meterSetterID);

    },
    queryTabList(strTab) {
      let that = this;
      if (strTab == "czjl" && that.NowUser?.id) {
        getOrderPage({ UserId: that.NowUser.id, page: that.UserOrders?.page ?? 1, PageSize: that.UserOrders?.PageSize ?? 5 }).then(res => {
          that.UserOrders = res.result;
        });
      }
      if (strTab == "bkjl" && that.NowUser?.defaultMeter?.id) {
        getMakeCardPage({ MeterID: that.NowUser.defaultMeter.id, page: that.UserMakeCard?.page ?? 1, PageSize: that.UserMakeCard?.PageSize ?? 5 }).then(res => {
          that.UserMakeCard = res.result;
          console.log("补卡记录", that.UserMakeCard);
        });
      }

      if (strTab == "hbjl" && that.NowUser?.id) {
        getMeterReplacePage({ UserID: that.NowUser.id, page: that.UserMakeCard?.page ?? 1, PageSize: that.UserMakeCard?.PageSize ?? 5 }).then(res => {
          that.UserMeterReplace = res.result;
        });
      }

    },
    async queryUserAsync() {
      let that = this;
      await getUserList(that.where).then(res => {
        that.AllUserList = res.result;
        that.UserList = that.AllUserList;
      })

    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    KeyWordInput() {
      this.NowUser = {};
      this.ruleForm = {};
      this.UserList = this.AllUserList.filter(f =>
        f.userName.indexOf(this.where.keyWord) != -1
        || f.phone.indexOf(this.where.keyWord) != -1
        || f.userNo.indexOf(this.where.keyWord) != -1
        || f.defaultMeter.no.indexOf(this.where.keyWord) != -1);
    },
    async querySearchAsync(queryString, cb) {
      await this.queryUserAsync();
      cb(this.UserList);
    },
    sysToPay() {
      let that = this;
      if(!that.NowUser.id>0){
        this.$message.error('请先选择要充值的用户');
        return;
      }

      if(that.ruleForm.payMoney<=0){
        this.$message.error('请先输入要充值的金额');
        return;
      }

      this.$confirm('即将为用户 [' + that.NowUser.userName + '] 充值金额：' + that.ruleForm.payMoney + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        SysPay({ UserId: that.NowUser.id, payMoney: that.ruleForm.payMoney, PayType: 0 }).then(res => {
          if (res.code == 200) {
            this.queryTabList("czjl");
            this.$message({
              type: 'success',
              message: '充值成功!'
            });
          }
        });
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