
<template>
  <view class=" " >
    <mySwiper ></mySwiper>
    <view class="border borderRadius marginLeft marginRight marginTop">
      <title title="今日代办" icon="icon-phone"></title>
      <block  wx:for="{{waitingList}}" wx:key="">
        <view class="ul_list ">{{item.missionTitle}} <text class="fr blue">+{{item.missionAddScore}}</text></view>
      </block>

    </view>
    <!--今日积分排名-->
    <view class="marginAll marginTop border borderRadius bgWhite">
      <view class="subt">
        <text class="icon iconfont icon-paiming yellow"></text>
        <text class="gray">今日积分排名</text>
      </view>
      <view class="subt overflow ">
        <view class="fl half">
          <view class="blue">{{scoreRank.myOrderNum}}</view>
          <view class="gray">排名</view>
        </view>
        <view class="fl half">
          <view class="blue">{{scoreRank.myScore}}</view>
          <view class="gray">今日积分</view>
        </view>
      </view>
      <view class="subt addHead" wx:if="scoreRank.noOneName">
        <image src="{{scoreRank.noOneAvatar}}" alt="" class="marginRight"></image>
        <text class="blue">{{scoreRank.noOneName}}获得今日的积分冠军</text>
        <text class="fr icon iconfont icon-xiala1"></text>
      </view>
    </view>

    <!--积分动态-->
    <activeScore des="积分动态" ></activeScore>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import mySwiper from '../../components/mySwiper'
  import title from '../../components/sheetTitle'
  import activeScore from '../../components/ActiveScore'
  export default class Home extends wepy.page {
    config = {
      navigationBarTitleText: '首页',
      onReachBottomDistance:50

    }
    components = {
      mySwiper,
      title,
      activeScore
    }

    data = {
      waitingList:[],
      scoreRank:{
        myOrderNum:0,
        myScore:0,
        noOneName:''
      },
      bottomLoading:false
    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    onReachBottom(){
      console.log('bottom')
      this.bottomLoading=true;
      this.$broadcast('reachBottom');
      this.$apply();
    }
    async getWaiting(){
      let res = await http.post('/missionRecord/todayMission',{
        pageNumber: 1,
        pageSize: 10
      });
      if(res.data){
        this.waitingList = res.data.list;
        this.$apply();
      }
    }
    async getScoreRank(){
      let res = await http.post('/approveRecord/todayScoreOrder');
      if(res.data){
        this.scoreRank = res.data;
        this.$apply();
      }
    }
    props = {

    };
    events = {

    }

    onLoad() {
      this.getWaiting();
      this.getScoreRank();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .half{
    width: 50%;
    .tac;
    .blue{
      font-size: 60rpx;
      margin-bottom: 20rpx;
    }

  }
  .addHead{
    image{
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
      vertical-align: middle;
    }
    .gray{margin-top: 0.15rem}
  }
</style>
