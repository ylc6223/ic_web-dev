<!--
 * @Author: liutong
 * @Date: 2023-01-03 13:21:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-06 14:47:10
 * @Descripttion:
 * @FilePath: \ic_web\src\components\dialog.vue
-->
<template>
  <div
    class="parameter"
    v-dialogDrag
    v-if="visible"
    :style="{width:width,height:height}"
    center="true"
  >
    <div class="drag-title">
      <slot name="title"></slot>
      <div class="close" @click.stop="handleClose">
        <img
          src="../assets/close.png"
          alt=""
        >
      </div>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 显隐
    visible: {
      type: Boolean,
      required: true,
      default:()=>false,
    },
    // 弹窗宽度    px  或者 %
    width:{
      type:String,
      default:()=>'1200px',
    },
    // 弹窗高度   px  或者 %
    height:{
      default:()=>'720px',
    },
  },
  data(){
    return{
    }
  },
  methods:{
    handleClose(){
      this.$emit('close',false)
    }
  }
}
</script>
<style lang="scss">
.parameter {
  height: 569px;
  width: 960px;
  min-width: 200px;
  min-height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: calc(-960px / 2);
  margin-top: calc(-569px / 2);

 /*  display: flex;
  flex-direction: column;
  margin:0 !important;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,calc(-50% + 50px)); */
  z-index: 999;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0px 12px 32px 0px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  .rightBlank {
    position: absolute;
    top: 48px;
    right: -5px;
    width: 5px;
    height: calc(100% - 53px);
  }
  .bottomBlank {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 5px;
  }
  .drag-title {
    display: flex;
    font-size: 16px;
    height: 48px;
    line-height: 48px;
    background: #f5f5f5;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.12);
    border-radius: 2px 2px 0px 0px;
    padding: 0 20px;
    z-index: 99;
    font-size: 16px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .close {
      img {
        width: 10px;
      }
      margin-left: auto; // 右对齐
    }
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 48px);
    box-sizing: border-box;
    background: #fff;
    overflow: auto;
  }
  .el-dialog{
       display: flex;
       flex-direction: column;
       margin:0 !important;
       position:absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
   }
}
</style>
