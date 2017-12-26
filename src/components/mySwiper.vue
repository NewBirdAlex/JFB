<style lang="less">
  .slide-image{
    width: 100%;
  }
</style>
<template>
  <view >
    <swiper indicator-dots="{{indicatorDots}}"
            autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
      <block wx:for="{{imgUrls}}" wx:key="">
        <swiper-item>
          <image src="{{item.cover}}" class="slide-image" mode="widthFix"></image>
        </swiper-item>
      </block>
    </swiper>

  </view>
</template>
<script>
  import wepy from 'wepy'
  import http from '../common/http';
  export default class MySwiper extends wepy.component {
    data = {
      imgUrls: [
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000
    }
    props={
      swipeType:{
        type: [Number, String],
        default:1
      }
    }
    events = {

    }
    async getSwiper(){

      let res = await http.post('/advert/listByCom',{
        companyId:wepy.$instance.globalData.userData.companyId,
        locationType:this.swipeType
      })
      if(res.data){
        this.imgUrls = res.data.content;
        this.$apply();
      }

    }
    methods = {

    }

    onLoad () {

      this.getSwiper();
    }
  }
</script>
