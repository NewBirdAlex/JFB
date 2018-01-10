<style lang="less">
  @import "../assets/css/common";
  .mp{
    display: inline-block;
    vertical-align: top;
    .tac;
    width: 500rpx;
  }
  .strong{
    width: 160rpx;
    display: inline-block;

  }
</style>
<template>
  <navigator url="/pages/public/showRange" open-type="navigate" >
    <view class="paddingAll marginTop bgWhite borderBottom fs30">
      <view class="strong">可见范围</view>
      <view class="gray mp" wx:if="{{!rangeList.length}}">默认全部可见</view>
      <view class="gray mp" wx:else>
        <block wx:for="{{rangeList}}" wx:key="">
          <view>{{item.name}}</view>
        </block>
      </view>
      <text class="iconfont icon-right fr" style="margin-top: 10rpx;"></text>
    </view>
  </navigator>
</template>
<script>
  import wepy from 'wepy'

  export default class apartmentRange extends wepy.component {
    data = {

    }
    props={
      rangeList:{
        type:Array
      }
    }
    events = {

    }

    methods = {

    }

    onLoad () {

    }
  }
</script>
