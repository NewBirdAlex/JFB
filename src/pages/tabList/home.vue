
<template>
  <view class=" " >
    <mySwiper ></mySwiper>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import mySwiper from '../../components/mySwiper'
  export default class Home extends wepy.page {
    config = {
      navigationBarTitleText: '首页'
    }
    components = {
      mySwiper
    }

    data = {

    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    props = {

    };
    events = {

    }

    onLoad() {
      if(!wepy.$instance.globalData.userData){
        wx.navigateTo({
          url: '../login/login'
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";

</style>
