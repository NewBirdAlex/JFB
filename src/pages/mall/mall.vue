<style lang="less">
  @import "../../assets/css/common";
  .product{
    .fl;
    .marginAll;
    .bgWhite;
    .borderRadius;
    .overflow;
    height: 450rpx;
    .paddingBottom;
    .lh40;
    width:calc(~"50% - 40rpx");
    .img-box{
      width:345rpx;
      height:345rpx;
      background: #ddd;
      overflow: hidden;
    }
    .shopName{
      width: 100%;
      height: 40rpx;
      .overflow;
      display: inline-block;
    }
    h4{padding-top: 10rpx}
    >image{
      width: 100%;
      min-height: 100%;
    }
    .cj{
      padding: 3rpx 20rpx;
      color: white;
      background: red;
      display: inline-block;
      vertical-align: middle;
      border-radius: 30rpx;
      .fr;
      .marginRight;
    }
    .dh{
      .bgWhite;
      border:1px solid @red;
      color:@red;
    }

  }
  .item{
    .fl;
    width: calc(~"50% - 20rpx");
    .tac;
    .fs30;
    .iconfont{
      font-size: 60rpx;
    }
  }
  .slide{
    height: 300rpx;
    position: relative;
    image{
      width: 100%;
      height: 100%;
    }
  }
  .null-goods{

    width: 50%;
    margin:100rpx auto;
    image{
      width: 100%;
    }
  }
</style>
<template>
  <view class="grayBg " >
    <!--swiper-->
    <mySwiper swipeType='3'></mySwiper>

    <view class="paddingAll bgWhite overflow">
      <view class="item">
        <text class="icon iconfont icon-jifen yellow"></text>
        可用积分：<span class="yellow">{{ baseInf.remainScore }}</span>
      </view>
      <view  class="item">
        <text class="icon iconfont icon-duihuanjilu blue"></text>
        兑换记录
      </view>
    </view>

    <view class="marginTop bgWhite paddingAll tac">
      <view class="fs34">他们都在兑</view>
      <view class="blue fs30 marginTop">每个职位兑换分数不一样喔</view>
    </view>

    <!--list-->
    <view class="overflow marginTop">
      <block wx:for="{{list}}" wx:key="">
        <view class="product">
          <view class="img-box">
            <image src="{{item.shopCover||'../../assets/img/null.png'}}" alt=""></image>
          </view>
          <view class="paddingLeft fs30"> <strong class="shopName">{{ item.shopName?t.shopName:'暂无商品名' }}</strong></view>
          <view class="paddingLeft fs26 " style="padding-top: 10rpx">
            <text class="yellow fs30">{{ item.score }}</text>
            <text class="gray marginRight">积分</text>
            <text class="cj" :class="{'dh':index==2}" wx:if="{{item.status == 1}}" @tap="exchange({{item.spescId}})">兑换</text>
            <text  class="cj" wx:if='{{item.status == 2}}'>抽奖</text>
          </view>
        </view>
        <view class="null-goods" wx:if="{{!list.length}}">
          <image  src="../../assets/img/nullGoods.png" alt=""></image>
        </view>
      </block>
    </view>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import mySwiper from '../../components/mySwiper'

  export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '积分商城'
    }
    components = {
      mySwiper
    }

    data = {
      send:{
        "pageNumber": 1,
        "pageSize": 20,
      },
      list:[],
      loading:false,
      lastPage:false
    }
    mixins = [input]
    computed = {

    }
    onReachBottom(){
      this.getProduct();
    }
    methods = {
      exchange(id){
        wx.navigateTo({url:`product?id=${id}`});
      }
    }
    props = {

    }
    async getProduct(){
      if(this.lastPage) return;
      let res = await http.post('/shop/getShopListByUser',this.send);
      if(res.code==200000){
        this.send.pageNumber++;
        this.list = this.list.concat(res.data.content);
        console.log(this.list);
        this.lastPage = res.data.last;
        this.$apply();
      }
    }
    events = {

    }

    onLoad() {
      this.getProduct();
    }
  }
</script>


