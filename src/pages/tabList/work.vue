
<template>
  <view class=" " >
    <!--swiper-->
    <mySwiper swipeType='2'></mySwiper>
    <!--审批-->
    <view class="normalTille grayBg">审批日记</view>
    <view class="overflow">
      <block wx:for="{{aboutMe}}" wx:key="">
        <navigator url="{{item.router}}">
          <view class="stationItem">
            <text class="vline"></text>
            <!--红点-->
            <!--<span class="redpoint" v-if="index%3==0"></span>    -->
            <view style="padding: 25rpx 0"> <text class="num">{{item.num}}</text></view>
            <view>{{item.name}}</view>
          </view>
        </navigator>

      </block>
    </view>
    <!--管理-->
    <view class="normalTille grayBg">管理应用（仅管理员可见）</view>
    <view class="overflow">
      <block wx:for="{{adminStation}}" wx:key="">
        <navigator url="{{item.router}}">
          <view class="vpadding stationItem" wx:if="{{item.show}}">
            <text class="vline"></text>
            <!--<view > <text class="icon iconfont {{item.icon}}" style="color:{{item.color}}"></text></view>-->
            <image class="iconImage" src="{{item.moduleCover}}" alt=""></image>
            <view>{{item.name}}</view>
          </view>
        </navigator>

      </block>
    </view>
    <!--我得应用-->
    <view class="normalTille grayBg">日常积分</view>
    <view class="overflow">
      <block wx:for="{{myStation}}" wx:key="">
        <view class="vpadding stationItem borderBottom" wx:if="{{item.show}}">
          <navigator url="{{item.router}}">
            <text class="vline"></text>
            <!--<view > <text class="icon iconfont {{item.icon}}" style="color:{{item.color}}"></text></view>-->
            <image class="iconImage" src="{{item.moduleCover}}" alt=""></image>
            <view>{{item.name}}</view>
          </navigator>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import mySwiper from '../../components/mySwiper'
  export default class Work extends wepy.page {
    config = {
      navigationBarTitleText: '工作台'
    }
    components = {
      mySwiper
    }

    data = {
      aboutMe:[
        {
          name:"审批日志",
          num:"0",
          router:'../approve/approveRecord'
        },{
          name:"待我审批",
          num:"0 ",
          router:'../approve/approveList?type=1'
        },{
          name:"我发起的",
          num:" 0",
          router:'../approve/approveList?type=2'
        },{
          name:"抄送我的",
          num:"0 ",
          router:'../approve/approveList?type=3'
        }
      ],
      adminStation:[],
      myStation:[]
    }
    mixins = []
    computed = {

    }

    methods = {

    }
    props = {

    }

    async getNumber(){
      let res =await http.post('/approveLogs/getCount');
      if(res.data){
        this.aboutMe[0].num= res.data[0].approveLog;
        this.aboutMe[1].num= res.data[0].waitApprove;
        this.aboutMe[2].num= res.data[0].sendApprove;
        this.aboutMe[3].num= res.data[0].copy;
        this.$apply();
      }
    }
    async getWorkStation(){
      let res = await http.post('/module/listModuleByUser');
      if(res.data){

        wepy.$instance.globalData.adminStation.forEach(item=>{
          for(let i = 0 ; i<res.data.length;i++){
            if(res.data[i].moduleTitle==item.name){
              item.show=res.data[i].status==1?true:false;
              item.moduleCover=res.data[i].moduleCover;
              break;
            }
          }
        })
        wepy.$instance.globalData.myStation.forEach(item=>{
          for(let i = 0 ; i<res.data.length;i++){
            if(res.data[i].moduleTitle==item.name){
              item.show=res.data[i].status==1?true:false;
              item.moduleCover=res.data[i].moduleCover;
              break;
            }
          }
        })

        this.adminStation = wepy.$instance.globalData.adminStation;
        this.myStation = wepy.$instance.globalData.myStation;
        this.$apply();
      }
    }
    events = {

    }

    onLoad() {

      if(wepy.$instance.globalData.firstEnter){
        // work station init
        wepy.$instance.globalData.firstEnter=false;
        this.getWorkStation();
      }

      this.getNumber();

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .stationItem{
    float: left;
    width: 25%;
    padding-bottom: 30rpx;
    .tac;
    font-size: @fs28;
    position: relative;
    overflow: hidden;
    /*width: 1.875rpx;*/
    /*min-height: 1.875rpx;*/
    .vline{
      position: absolute;
      right: 0;
      top:0;
      height: 100%;
      border-right: @border;
    }
    .iconImage{
      width: 60rpx;
      height: 60rpx;
      margin-top: 30rpx;
      .marginBottom;
    }
    .hline{
      position: absolute;
      left:0;
      bottom: 0;
      height: 0;
      width: 100%;
      border-bottom: @border;
    }
    .num{
      font-size: @fs36;
    }

    .icon{
      font-size: 60rpx;
    }
    .redpoint{
      position: absolute;
      width: 20rpx;
      height: 20rpx;
      background: red;
      border-radius: 50%;
      right: 40rpx;
      top:30rpx;
    }
    .new{
      position: absolute;
      width: 100%;
      line-height: 40rpx;
      .tac;
      background: #f75555;
      color:white;
      left:0;
      top:0;
      transform: rotate(45deg) translate(0.5rpx,-0.5rpx);
    }
  }
</style>
