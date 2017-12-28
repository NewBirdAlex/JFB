
<template>
  <view class=" grayBg paddingTop" >
    <block wx:for="{{list}}" wx:key="">
      <view class="wrap bgWhite marginAll">
        <view class="left">
          <image src="{{item.userAvatar}}" wx:if="{{item.userAvatar}}"  class="headPicture" alt=""></image>
          <image src="../assets/img/defaultHead.png" wx:else class="headPicture" alt=""></image>
        </view>
        <view class="right">
          <view>{{item.approveTitle}} <text class="blue fr">+{{item.addScore}}分</text></view>
          <view style="padding-top: 10rpx;">
            <text class="yellow" wx:if="{{item.status==1}}">审批中</text>
            <text class="green" wx:if="{{item.status==2}}">审批通过</text>
            <text class="red" wx:if="{{item.status==3}}">审批不通过</text>
            <text class="gray fr">{{item.createDate}}</text>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class ApproveRecord extends wepy.page {
    config = {
      navigationBarTitleText: '审批记录'
    }
    components = {
    }

    data = {
      animationData: {},
      list: [],
      pageNumber: 1,
      pageSize: 10,
      lastPage: false,
      loading: false
    }
    mixins = []
    computed = {

    }

    methods = {

    }
    async getList() {

      let res =await http.post('/missionApprove/userGetRecordList', {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      if(res.data){
        this.pageNumber+=1;
        this.list = this.list.concat(res.data.content);
        if(res.data.last) this.lastPage=true;
        this.$apply();
      }

    }
    onReachBottom(){
      if(!this.lastPage) this.getList();
    }
    props = {

    };
    events = {

    }

    onLoad() {
      this.getList();
    }


  }
</script>

<style lang="less">
  @import "../../assets/css/common";

  .wrap{
    .paddingAll;
    .borderBottom;
    .left{
      display: inline-block;
      image{
        width: 90rpx;
        width: 90rpx;
        border-radius: 50%;
      }
    }
    .right{
      display: inline-block;
      width: 570rpx;
      vertical-align: top;
      text-indent: 20rpx;
      line-height: 40rpx;
      font-size: @fs30;
      p{
        padding-top: 5rpx;
        &:nth-child(2){
          font-size: @fs28;
          span{font-size: @fs24;}
        }
      }
    }
  }
</style>
