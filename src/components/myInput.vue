<style lang="less">
@import "../assets/css/common";
.wrap {
    font-size: @fs30;
    line-height: 30rpx;
    overflow: hidden;
    background: white;
    .inner {
        border-bottom: @border;
        margin: 0 20rpx;
        background: white;
        position: relative;
        z-index: 2;
        padding: 30rpx 0;
    }
    .strong {
        width: 160rpx;
        display: inline-block;
        vertical-align: middle;
    }
    input {
        border: 0;
        outline: none;
        vertical-align: middle;
        position: relative;
        z-index: 2;
        background: white;
        width: 521rpx;
    }
    textarea {
        resize: none;
        border: none;
        outline: 0;
        vertical-align: top;
        height: 180rpx;
        width: 521rpx;
        display: inline-block;
    }
}
</style>
<template>
<view class="wrap">
  <view class="inner">
    <view class="strong">
      {{conttitle}}
      <text class="red" wx:if="{{need}}">*</text>
    </view>
    <input type="{{inputType}}" placeholder="{{note}}" value="{{value}}" wx:if="{{inpType=='input'}}" @input="write"/>
    <textarea name="" class="lh40" placeholder="{{note}}" value="{{value}}" wx:if="{{inpType=='textarea'}}" id="" cols="30" rows="10" @input="write"/>
  </view>
</view>
</template>
<script>
import wepy from 'wepy'

export default class MyInput extends wepy.component {
  data = {

  }
  props = {
    conttitle: {
      type: String
    },
    need: {
      type: Boolean,
      default: true
    },
    note: {
      type: String
    },
    value: {
      type: String,
      twoWay: true
    },
    inpType: {
      type: String
    },
    inputType: {
      type: String,
      default: 'text'
    },
    title: {
      type: String,
      default: 'hello',
      twoWay: true
    }
  }
  events = {

  }

  methods = {
    write(event) {
      this.value = event.detail.value;
    }
  }

  onLoad() {

  }
}
</script>
