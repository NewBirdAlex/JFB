
<style lang="less">
  @import "../../assets/css/common";
  .result{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    .inner{
      position: absolute;
      left:50%;
      top:50%;
      .borderRadius;
      .paddingAll;
      transform: translate(-50%,-50%);
      width: 500rpx;
      //background: url("../../assets/img/colorBg.jpg") ;
      background-size: 100% auto;
      color: white;
      .fs36;
      .icon-close48{
        font-size: 4r0px   ;
      }
      .icon-sad1,.icon-Smile{
        font-size: 100rpx;
        color: @yellow;
        margin:50rpx 0;
        display: inline-block;
      }
      .goon{
        width: 280rpx;
        height: 68rpx;
        line-height: 68rpx;
        display: inline-block;
        .marginTop;
        border-radius: 34rpx;
        border: solid 2px rgba(255, 166, 156, 1);
      }
    }
  }
  .wp1 {
    background: #fe4237;
  }

  .wp2 {
    color: @wdYellow;
    background: #e72920;
  }

  @lighYellow: #ffd66b;
  @wdYellow: #ffd66b;
  .wdYellow {
    color: @wdYellow;
    border-bottom: 1px solid #f9625a
  }

  .cjTable {
    width: 620rpx;
    color: @wdYellow;
    .marginTop;
    margin-left: 40rpx;
    .lh40;
    td, th {
      padding: 10rpx 0;
    }
  }

  .title {
    width: 580rpx;
    height: 88rpx;
    margin: 0 auto;
    color: #bd1008;
    font-size: 36rpx;
    .tac;
    line-height: 88rpx;
    background-color: rgba(255, 214, 107, 1);
    border-radius: 0px 0px 6px 6px;
  }

  .myLottery {
    padding: 0 10rpx;
  }

  .wrap {
    background: #bd1008;
    padding-bottom: 100rpx;
  }

  .spc {
    position: relative;
    padding-bottom: 78rpx;

    .sanjiao {
      position: absolute;
      bottom: 0rpx;
      left: 0;
      transform: translate(-100%);
      width: 30rpx;
      &:nth-child(2) {
        right: 0;
        left: auto;
        transform: translate(100%);
      }
      &:nth-child(3) {
        bottom: 0;
        left: 0;
        width: 100%;
        transform: translateY(100%);
      }
    }
  }

  .rec {
    margin: 100rpx 12rpx;
    padding: 10rpx;
    .wp1;
    > view {
      .wp2;
      padding: 10rpx;
    }
  }

  .roll {
    /*padding: 0.3rpx 0.1rpx;*/
    padding: 30rpx 0;
    .tac;
    .overflow;
    color:black;
    .item {
      margin-top: 20rpx;
      width: 210rpx;
      border-radius: 10rpx;
      overflow: hidden;
      height: 270rpx;
      display: inline-block;
      position: relative;
      >image {
        width: 210rpx;
        height: 210rpx;
      }
      .paddingAll {
        padding: 15rpx 0
      }
      .cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #f4d48e;
        opacity: 0.6;
      }
    }
    .midSpace {
      margin: 20rpx 18rpx 0;

    }
    .img-co{
      height: 210rpx;
      overflow: hidden;
      background: #fefefe;
      color: #666;
      font-size: 100rpx;
      image{
        min-height: 100%;
      }
    }
  }

  .midItem{
    position: relative;
    vertical-align: top;
    >view{
      width: 180rpx;
      height: 180rpx;
      color: #bd1008;
      margin:0 auto;
      margin-top: 45rpx;
      .fs30;
      border-radius: 50%;
      background-color: rgba(245, 206, 108, 1);
      position: relative;
      >view{
        width: 144rpx;
        height: 144rpx;
        position: absolute;
        left:18rpx;
        top:18rpx;
        border-radius: 50%;
        background-color: rgba(255, 214, 107, 1);
        box-shadow: 0px 2px 2px 0px rgba(4, 0, 0, 0.16);
        p:first-child{
          padding-top: 40rpx;
          font-weight: bold;
          padding-bottom: 10rpx;
          padding-bottom: 10rpx;
        }
      }
    }
  }
  .recode-a-l{
    tr{
      display: flex;
    }
    td{
      flex: 1;
    }
  }
  image{
    /*height: auto!important;*/
  }
  .flexTable{
    display: flex;

    >view{
      flex:1;
      color: @wdYellow;
      text-align: center;
      line-height: 50rpx;
    }
  }
</style>

<template>
  <view class="wrap " >
    <view class="top overflow">
      <image src="../../assets/img/coujiang.jpg" class="fl w100" alt=""></image>
    </view>
    <view class="paddingTop"></view>
    <view class="wp1 marginAll myLottery marginTop marginBottom borderRadius">
      <view class="wp2 spc borderRadius">
        <image src="../../assets/img/sanjiao.png" mode="widthFix" class="sanjiao" alt=""></image>
        <image src="../../assets/img/sanjiao2.png" mode="widthFix" class="sanjiao" alt=""></image>
        <image src="../../assets/img/sanjiao3.png" mode="widthFix" class="sanjiao" alt=""></image>
        <view class="title">我的抽奖</view>
        <view  class="flexTable fs30">
          <view>抽奖主题</view>
          <view class="tac">排名</view>
          <view class="tac">抽奖次数</view>
        </view>
        <block wx:for="{{luckList}}" wx:key="">
          <view class="flexTable fs30">
            <view>{{index+1}}. {{ item.listTitle }}</view>
            <view class="tac">{{ item.sort }}</view>
            <view class="tac">{{ item.count }}</view>
          </view>
        </block>
      </view>
    </view>


    <!--lottery-->
    <view class="rec borderRadius">
      <view class="borderRadius">
        <view class="">
          <navigator url="../mall/lotteryRec" >
            <view tag="div" to="/lotteryRec" class="paddingTop paddingRight paddingBottom borderBottom fs30 wdYellow">
              我的抽奖记录
              <text class="icon iconfont icon-right fs30 fr"></text>
            </view>
          </navigator>
          <view class="roll">
            <block wx:for="{{prizeList}}" wx:key="">
              <view class="item  tac fs28 bgWhite"
                    :class="{'midSpace':index==1||index==4||index==7}" wx:if="{{index!=4}}">
                <view class="img-co iconfont">
                  <image src="{{item.luckyShopPic||'../../assets/img/qiuqiu.jpg'}}"  alt=""></image>
                </view>
                <view class="paddingAll overflow" style="text-overflow:ellipsis ;white-space: nowrap;width: 100%;">{{ item.luckyShopName }}</view>
                <view class='fuck' :class="{'cover':item.light}"></view>
              </view>

              <view wx:else class="item tac midSpace midItem">
                <view @tap="start">
                  <view>
                    <view style="padding-top: 30rpx;">START</view>
                    <view>开始抽奖</view>
                  </view>
                </view>
              </view>
            </block>

          </view>
        </view>
      </view>
    </view>


    <!--recording-->
    <view class="wp1 marginAll myLottery marginTop marginBottom borderRadius" v-if="recordAL&&recordAL.length">
      <view class="wp2 spc borderRadius">
        <navigator url="../mall/lotteryRec?type=me" >

          <view tag='div' to='/lotteryRec?type=me' class="title">中奖记录</view>
        </navigator>
        <block wx:for="{{recordAL}}" wx:key="">
          <view class="flexTable fs30">
            <view>{{ item.userName?item.userName:'***' }}</view>
            <view class="tac">{{ item.luckName }}</view>
          </view>
        </block>
      </view>
    </view>

    <!--rule-->
    <view class="wp1 marginAll myLottery marginTop marginBottom borderRadius rec">
      <view class="wp2 spc borderRadius">
        <view class="title">抽奖规则</view>
        <view class="fs30 marginTop">1. 当抽奖主题活动存在并且可抽奖次数不为0，抽奖活动开始即可抽奖。</view>
        <view class="fs30 marginTop"> 2. 如果存在多个抽奖主题，则会一个主题抽完再进入下一个抽奖主题，直至用光所有抽奖次数。</view>
        <view class="fs30 marginTop">3. 每个抽奖主题的抽奖商品可能不一样，并且已经被抽完的奖品不会再次被抽中。</view>
        <view class="fs30 marginTop">4. 当你没有抽奖主题活动时，无抽奖商品显示仅显示默认图片。</view>
      </view>
    </view>

    <view class="result" wx:if="{{showResult}}">
      <view class="inner tac" style="background: url('../../assets/img/colorBg.jpg');background-size: 100% 100%;">
        <view>{{ prize.groupTitle }}</view>
        <view><text class="icon iconfont icon-Smile"></text></view>
        <view>{{ prize.luckyShopName }}</view>
        <view class="goon" @tap="continuer">继续抽奖</view>
      </view>
    </view>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class lottery extends wepy.page {
    config = {
      navigationBarTitleText: '积分抽奖'
    }
    components = {
    }

    data = {
      showResult:false,
      rollArr: [0, 1, 2, 5, 8, 7, 6, 3],
      canClick: true,
      timer: null,//计时器id
      times: 0,
      speed: 500,
      circle: 48,
      maskIndex: 0,
      prizeList:[],
      luckList:[],
      prize:null,//抽到的奖品
      recordAL:null,
    }
    mixins = [input]
    computed = {

    }

    methods = {
      continuer(){
        this.rollArr = [0, 1, 2, 5, 8, 7, 6, 3];
        this.times = 0;
        this.speed = 500;
        this.showResult = false;
        this.$apply();
        this.recordByAll();
        this.getLuckListByUser();
      },
      start(){
        if (this.canClick) {
          this.getLuckDrawRes();
        }
      }
    }
    props = {

    }
    init() {
      this.speed = 500;
      this.times = 0;
      this.maskIndex = 0;
      this.$apply();
    }
    async getLuckDrawRes(){
      if(!(this.luckList[0] && this.luckList[0].count)){
        tips.alert('抽奖次数已用完');
        return;
      }
      let res = await http.post('/luckyRecord/userStartLuckyDraw',{
        "pageNumber": 1,
        "pageSize": 1000
      });
      if(res.code==200000){
        this.init();
        this.canClick = false;
        this.prize = res.data.luckShop;
        this.$apply();
        this.roll();

      }else{
        tips.alert(res.message);
      }
    }
    brake(){
      let that = this;
      this.speed = this.speed > 300?300:(this.speed + 50);
      this.maskIndex = this.maskIndex+2 > this.rollArr.length?0:this.maskIndex + 1;
      this.activeMask(this.maskIndex);
      let nowId = this.prizeList[this.rollArr[this.maskIndex]].id;
      if(this.speed >= 300 && this.prize.id == nowId){
        this.showResult = true;
        this.$apply();
        return;
      }else{
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){that.brake()},this.speed);
      }
      this.$apply();
    }
    roll() {
      clearTimeout(this.timer);
      let that = this;
      that.times++;
      that.speed = that.speed < 60 ?60:(that.speed - (130/that.times));
      if (that.times >= 50) {// stop rolling
        let bol = false;
        for(let i = 0; i<this.prizeList.length;i++){
          if(this.prizeList[i].id == this.prize.id){
            this.prize.index = i;
            this.brake();
            bol = true;
            break;
          }
        }
        if(bol) return;
//        this.prizeList.forEach((item,index)=>{
//          if(item.id == this.prize.id){
//            this.prize.index = index;
//            console.log('end 50 times');
//
//            this.brake();
//            return;
//          }
//        });
      }
      that.maskIndex = that.maskIndex+2 > 8?0:that.maskIndex + 1;
      this.activeMask(this.maskIndex);
      this.$apply();
      that.timer = setTimeout(function(){that.roll();},that.speed)

    }
    activeMask(num) {

      this.prizeList.forEach(item => item.light = false);
      let act = this.rollArr[num];
      //this.$set(this.prizeList[act],'light',true);
      this.prizeList[act].light = true;
    }
    async recordByAll(){
      let res = await http.post('/luckyRecord/luckRecordByAll',{
        "pageNumber": 1,
        "pageSize": 10,
      });
      this.recordAL = res.data.content;
      this.$apply();
    }
    async getLuckListByUser(){
      let res = await http.post('/luckUser/luckListByUser',{
        pageNumber: 1,
        pageSize: 8
      })
      if(res.code==200000){
        this.luckList = res.data.luckList;
        res.data.drawShop.forEach((v,i)=>{
          v['light'] = false;
        })
        res.data.drawShop.splice(4,0,[]);
        this.prizeList = res.data.drawShop;
        this.canClick=true;
        this.$apply();
      }
    }
    events = {

    }

    onLoad() {
      this.getLuckListByUser();
      this.recordByAll();
    }
  }
</script>
