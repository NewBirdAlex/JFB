<style lang="less">
  @import "../assets/css/common";
  .wrap{
    font-size: @fs30;
    line-height: 30rpx;
    position: relative;
    width: 100%;
    background: white;
    .inner{
      border-bottom: @border;
      margin:0 20rpx;
      background: white;
      position: relative;
      z-index: 2;
      padding:30rpx 0;
    }
    .strong{
      width: 160rpx;
      display: inline-block;
      vertical-align: middle;
    }

  }
</style>
<template>
  <view class="wrap ">
    <view class="inner">
      <view class="strong">
        积分类型
        <span class="red" >*</span>
      </view>
      <picker bindchange="bindPickerChange" value="{{index}}" range="{{arr}}" class="fr">
        <view class="picker">
          {{arr[index]}}
          <text class="iconfont icon-arrLeft-fill"></text>
        </view>
      </picker>
    </view>
  </view>
</template>
<script>
  import wepy from 'wepy'

  export default class MyInput extends wepy.component {
    data = {
      index:0,
      arr:[
        '品德积分',
        '业绩积分',
        '行为积分',
        '基础积分',
      ]
    }
    props = {
      scoreType:{
          type:[Number,String],
          default:1,
          twoWay:true
      }
    }
    events = {

    }

    methods = {
      bindPickerChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)

        this.index=e.detail.value;
        this.scoreType=Number(this.index)+1;
      }
    }

    onLoad() {
      this.index=this.scoreType-1;
    }
  }
</script>
