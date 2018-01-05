
<template>
<view class="bgWhite marginTop">
  <view class="paddingAll borderBottom fs30">审批人</view>
  <view class="paddingAll">
    <block wx:for="{{approveStaff}}" wx:key="">
      <view class=" item tac marginTop marginRight">
        <image src="{{item.userAvatar||'/assets/img/defaultHead.png'}}"></image>
        <text class="iconfont icon-close48" @tap="delectApproveStaff({{index}})"></text>
        <view class="fs30 ">{{item.userName}}</view>
      </view>
    </block>
    <text class="iconfont icon-close48 add" wx:if="{{!approveStaff.length}}" @tap="addStaff"></text>
  </view>
</view>
</template>

<script>
  import wepy from 'wepy';
  export default class approveStaff extends wepy.component {

    components = {
    }

    data = {

    }
    computed = {

    }

    methods = {
      delectApproveStaff(index){
        this.approveStaff.splice(index,1);
      },
      addStaff(){
        wx.setStorageSync('approveStaff', 'true');
        wx.navigateTo({
          url: '/pages/staff/staff'//实际路径要写全
        });
      }
    }
    props = {
      approveStaff:{
        type:Array,
        twoWay:true
      }
    };
    events = {

    }

    onLoad() {

    }
  }
</script>

<style lang="less">
  @import "../assets/css/common";
  .add{
    display: inline-block;
    vertical-align: top;
    font-size: 60rpx;
    .marginLeft;
  }
  .item{
    width: 110rpx;
    position: relative;
    display: inline-block;
    .iconfont{
      position: absolute;
      right: -20rpx;
      top:-20rpx;
      font-size: 30rpx;
    }
    image{
      width: 90rpx;
      height: 90rpx;
      margin-bottom: 10rpx;
      border-radius: 50%;
    }
  }
</style>
