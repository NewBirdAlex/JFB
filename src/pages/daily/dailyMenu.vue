
<template>
  <view class="grayBg wrap">
    <view class="overflow bgWhite" >
      <block wx:for="{{list}}" wx:key="">
        <view class="tac item" @tap="go({{item}})">
          <image src="{{item.modelCover}}" alt=""></image>
          <view class="">{{item.modelTitle}}</view>
        </view>
      </block>

    </view>
    <view class="bar">
      <view>
        <view>写日记</view>
        <view>
          <navigator url="dailyList" >
          看日记
          </navigator>
        </view>
        <view><navigator url="dailyCount" >日记统计 </navigator></view>
      </view>

    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class dailyMenu extends wepy.page {
    config = {
      navigationBarTitleText: '日志'
    }
    components = {
    }

    data = {
      list:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      go(item){
        wx.setStorageSync('diaryInf', item)
        wx.navigateTo({url:'write'})
      }
    }
    props = {

    };
    events = {

    }
    async getList() {
      let that = this;
      let res = await http.post('/dailyModel/dailyModelList');
      if(res.data){
        that.list = res.data
        this.$apply();
      }
    }
    onLoad() {
      this.getList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .wrap{
    min-height: 100vh;
  }
  .item{
    .fl;
    width:250rpx;
    height: 250rpx;
    //border-right: @border;
    //.borderBottom;
    .fs30;
    box-sizing: border-box;
    image{
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      margin-top: 40rpx;
      margin-bottom: 20rpx;

    }
    .crl{
      width: 120rpx;
      height: 120rpx;

      margin: 5rpx0 auto 20rpx auto;
      .tac;
      line-height: 120rpx;
    }
    .icon{
      /*margin-top: 1rpx;*/
      /*display: inline-block;*/
      font-size: 70rpx;
      color: white;
    }

  }
  .bar{
    position: fixed;
    bottom: 0;
    width: 100%;
    left:0;
    padding: 20rpx 0;
    >view{
      display: flex;
      view{
        flex: 1;
        .tac;
      }
    }
  }
</style>
