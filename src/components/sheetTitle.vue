
<template>
  <view class="subt">
    <text class=" iconfont {{icon}} blue"></text>
    <text class="gray">{{title}}</text>
    <text class="iconfont icon-right fr marginRight"></text>
  </view>
</template>

<script>
  import wepy from 'wepy';
  export default class title extends wepy.component {

    components = {
    }

    data = {

    }
    computed = {

    }

    methods = {

    }
    props = {
      title:{
        type:String
      },
      icon:{
        type:String
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
  .subt{
    .fs30;
    text-indent: 1em;
    padding:20rpx 0;
    .borderBottom;
    .icon{
      .fs34;
    }
  }
</style>
