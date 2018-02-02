<style lang="less">
  @import "../../assets/css/common";
  .exchange{
    .tac;
    .paddingAll;
    background: @blue;
    color:white;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    height: 100rpx;
  }
  body{
    padding-bottom: 0;
  }
  .show{
    image{
      width: 100%;
    }
  }
  .slide{
    height:480rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
  .mask{
    position: fixed;
    width: 100%;
    height:100%;
    background: rgba(50,50,50,0.3);
    left: 0;
    top: 0;
  }
  .sele{
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 100rpx;
    background: #fff;
    transition: all 0.2s;
    transform-origin: 100% 100%;
    -webkit-transform: scaleY(0);
    -moz-transform: scaleY(0);
    -ms-transform: scaleY(0);
    -o-transform: scaleY(0);
    transform: scaleY(0);
    border-top: 0.7rpx solid #ccc;
    padding: 10px 0;
    box-sizing: border-box;
    .part1{
      padding: 6rpx;
      height: 150rpx;
      display:flex;
      border-bottom:0.8rpx solid #ccc;
      .cover{
        width: 150rpx;
        height: 150rpx;
        margin-right: 25rpx;
        image{
          width: 100%;
          height: 100%;
        }
      }
      .cont{
        flex: 1;
        .branch{
          font-size:32rpx;
          color: #ff862d;
        }
        .surplus{
          color: #999;
          line-height: 60rpx;
        }
        .explain{
          color: #323232;
        }
      }
      .close{
        width: 50rpx;
        margin-left: 10rpx;
        font-size: 50rpx;
      }
    }
    .part2{
      padding: 6rpx;
      .tit{
        font-size: 28rpx;
        line-height: 60rpx;
      }
      .options{
        .tit{
          font-size: 32rpx;
          color: #666;
        }
        >.btn{
          margin-left: 4rpx;
        }
      }
    }
  }
  .sele-option{
    transform: scaleY(1);
  }

  .productSize{
    display: inline-block;
    display: inline-block;
    font-size: 14px;
    padding: 0 12px;
    height: 33px;
    line-height: 33px;
    margin-left: 0.4rem;
    text-align: center;
    box-sizing: border-box;
    border-radius: 4px;
    color: #656b79;
    background-color: #f6f8fa;
    -webkit-box-shadow: 0 0 1px #b8bbbf;
    box-shadow: 0 0 1px #b8bbbf;
   &.active{
     background: @blue;
     color:white;
   }
  }
</style>
<template>
  <view class=" grayBg" >
    <!--swiper-->
    <mySwiper  :productList.sync="swiperL"></mySwiper>

    <!--introduce-->
    <view class="bgWhite paddingAll lh40">
      <view>
        <text class="strong fs30">{{ detail.shopName||'商品名称'}}</text>
        <text class="fr gray fs26">剩余{{ shopMoreInfo.remainCount}}件</text>
      </view>
      <view class="marginTop">
        <text class="yellow marginRight fs36"> {{ shopMoreInfo.score}}分</text>
        <text class="gray fs24" wx:if="{{$store.state.baseInf.userScore - (detail.Money?detail.Money:0) < 0}}">{{ $store.state.baseInf.userScore - (detail.Money?detail.Money:0) }}</text>
        <text class="fr fs26">已兑换{{ shopMoreInfo.allCount-shopMoreInfo.remainCount }}件</text>
      </view>
    </view>

    <view  class="marginTop paddingAll bgWhite fs26 borderBottom">
      <text>他们都兑换了 <text class="gray">({{ shopMoreInfo.allCount-shopMoreInfo.remainCount }})</text></text>
      <text class="fr rightArrow">
                <text class="icon iconfont icon-xiala1"></text>
            </text>
    </view>

    <view class=" paddingAll bgWhite fs26" @tap='open'>
      <text>选择兑换规格</text>
      <text class="fr rightArrow">
                <text class="icon iconfont icon-xiala1"></text>
            </text>
    </view>

    <view class=" bgWhite">
      <view class="marginTop fs30 paddingAll">
        商品详情
      </view>
      <view class="show paddingAll lh40 fs30" >
        <rich-text  nodes="{{detail.shopDetail}}"></rich-text>
      </view>
    </view>
    <!--mask-->
    <div class="mask" wx:if="{{openSele}}" @tap="open"></div>

    <!--size-->
    <view class="sele" :class="{'sele-option':openSele}">
      <view class="part1">
        <view class="cover">
          <image src="{{detail.shopCover}}"></image>
        </view>
        <view class="cont">
          <view class="branch">{{ selectProduct.score}} 分</view>
          <view class="surplus">剩余{{ selectProduct.remainCount}} 件</view>
          <view class="explain">请选择：按商品规格兑换</view>
        </view>
        <view class="close">
          <text class="iconfont icon-close48" @tap="open"></text>
        </view>
      </view>
      <view class="part2">
        <view class="tit">规格：</view>
        <view class="options">
          <!--<mt-button v-for='(item,i) in shopSpecs' :key="i"  @click='seleSpec(item,i)' class='btn' :type="item.active?'primary':'default'" size="small">{{item.specName}}</mt-button>-->
            <block wx:for="{{shopSpecs}}" wx:key="">
              <text class="productSize" :class="{'active':item.active}" @tap='seleSpec({{item}},{{index}})'>{{item.specName}}</text>
            </block>
        </view>
      </view>
    </view>

    <view class="exchange fs36" @tap='operation'>确认兑换</view>

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
      navigationBarTitleText: '商品详情'
    }
    components = {
      mySwiper
    }

    data = {
      baseInf:'',
      id:'',
      swiperL:[],
      detail:{},
      historytotal:0,
      openSele:false,
      spec:{
        keys:null,
        act:-1,
      },
      shopMoreInfo:{},
      shopSpecs:{},
      selectProduct:{}
    }
    mixins = [input]
    computed = {

    }

    methods = {
      operation(){
        if(!this.openSele){this.openSele=true;return}
        let ableSubmit = false;
        this.shopSpecs.forEach(item=>item.active?ableSubmit=true:'');
        if(ableSubmit){
          this.exchange();
        }else{
          this.openSele=true;
        }
      },
      seleSpec(item,index){
        if(!item.active){
          this.selectProduct=item;
          this.shopSpecs.forEach(item=>item.active=false);
          let obj = this.shopSpecs[index];
          obj.active=true;
        this.$apply();
        }
      },
      open(){
          this.openSele = !this.openSele;
      }
    }
    async getDetail(){

      let res =await http.post('/shop/getShopDetailById',{
        id:this.id,
      });
      if(res.code==200000){
        this.swiperL = res.data.shopInfo.shopPics.split(',');//swipe
        this.detail = res.data.shopInfo;
        this.shopMoreInfo = res.data.shopMoreInfo;
        this.shopSpecs = res.data.shopSpecs;//choose size
        this.shopSpecs.forEach(item=>item.active=false);
        this.selectProduct = res.data.shopSpecs[0];//default select product
        this.$apply();
      }
    }
    async exchange(){
      let res =await http.post('/shopbuylist/toGetShopByUser',{
        specsId:this.selectProduct.id,
      });
      if(res.code==200000){
        tips.alert('兑换成功');
        setTimeout(()=>{
          wx.navigateBack()
        },1000);
      }else{
        tips.alert(res.message);
      }
    }
    props = {

    };
    events = {

    }

    onLoad(query) {
      this.id=query.id;
      this.id=23;
      this.getDetail();
    }
  }
</script>


