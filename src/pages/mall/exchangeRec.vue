
<template>
  <view class=" " >
    <block wx:for="{{list}}" wx:key="">
      <view class="paddingAll borderBottom exr overflow" >
        <image src="{{item.shopCover}}" class=" marginRight" alt=""></image>
        <view class="lh40">
          <view class="fs30 "> <strong>{{item.shopName}}</strong></view>
          <view class="fs26 gray">兑换时间：{{item.creatDate}}</view>
          <text class="yellow type fs30" wx:if="{{item.checkStatus==2}}">审核中</text>
          <text class="green type fs30" wx:if="{{item.checkStatus==1}}">已兑换</text>
          <text class="red type fs30" wx:if="{{item.checkStatus==3}}">兑换失败</text>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class exchangeRec extends wepy.page {
    config = {
      navigationBarTitleText: '兑换记录'
    }
    components = {
    }

    data = {
      list: [],
      pageNumber: 1,
      pageSize: 20,
      lastPage: false,
      loading: false
    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    props = {

    }
    async getList() {
      let that = this;
      let res =await http.post('/shopbuylist/shopBuyRecordByUser', {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      });
      if(res.code==200000){
        that.pageNumber += 1;
        if (res.data.last) {
          that.lastPage = true;
        }
        that.list = that.list.concat(res.data.content);
        that.loading = false;
        this.$apply();
      }
    }
    onReachBottom(){
      if(!this.lastPage) this.getList();
    }
    events = {

    }

    onLoad() {
      this.getList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .exr{
    position: relative;
    image{
      .fl;
      width: 120rpx;
      height: 120rpx;
      .borderRadius;
    }
    >view{
      margin-top: 15rpx;
    }
    .type{
      position: absolute;
      right: 20rpx;
      top:50%;
      transform: translateY(-50%);
    }

  }
</style>
