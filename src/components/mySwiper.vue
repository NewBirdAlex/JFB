<style lang="less">
  .slide-image{
    width: 100%;
  }
</style>
<template>
  <view >
    <view wx:if="productList">

      <swiper indicator-dots="{{indicatorDots}}"
              autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
        <block wx:for="{{productList}}" wx:key="">
          <swiper-item>
            <image src="{{item}}" class="slide-image" mode="widthFix"></image>
          </swiper-item>
        </block>
      </swiper>
    </view>
    <view wx:else>
      <swiper indicator-dots="{{indicatorDots}}"
              autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
        <block wx:for="{{imgUrls}}" wx:key="">
          <swiper-item>
            <image src="{{item.cover}}" class="slide-image" mode="widthFix"></image>
          </swiper-item>
        </block>
      </swiper>
    </view>


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
      },
      productList:{
        type:Array
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
      if(this.productList){
        return;
      }
      this.getSwiper();
    }
  }
</script>
