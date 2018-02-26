
<template>
  <view class=" " >
    <view class="head bgWhite paddingAll overflow">
      <view class="left">
        <image class="headPicture"  src="{{userInf.userAvatar||'../../assets/img/defaultHead.png'}}" alt=""></image>
      </view>
      <view class="right">
        <view>
          <text>{{userInf.userName}}</text>
          <text>{{userInf.jobTitle}}</text>
        </view>
        <view class="gray">
          总积分：{{userInf.userScore}}
          基础积分：{{userInf.baseScore}}
        </view>
      </view>
    </view>

    <block wx:for="{{itemList}}" wx:key="">
      <view class="showList bgWhite paddingAll fs30"  :class="{'marginTop':index==2}" @tap="go({{item}})">
        {{item.name}}

        <text >{{item.right}}</text>
        <text v-else>
                <text class="fr blue" wx:if="{{item.right}}">{{item.right}}</text>
                <text class="iconfont icon-right fr" wx:else></text>
            </text>
      </view>
    </block>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class resume extends wepy.page {
    config = {
      navigationBarTitleText: '个人信息'
    }
    components = {
    }
    data = {
      id:'',
      userInf:{
        userId:''
      },
    }
    mixins = [input]
    computed = {
      itemList(){
        return [
          {
            name:'基础信息',
            right:'',
            router:'/baseInfor/'+this.userInf.userId
          },
          {
            name:'电话号码',
            right:this.userInf.userPhone,
            router:''
          },
          {
            name:'积分日志',
            right:'',
            router:'/manageDiary/'+this.userInf.userId
          },
        ]
      }
    }

    methods = {
      go(item){
        wx.navigateTo({url:`baseInformation?id=`+this.userInf.userId});
      }
    }
    props = {

    }
    async getDetail(){
      let that = this;
      let res = await http.post('/user/getUserInfo', {
        getInfoUserId:this.id
      });
      if(res.code==200000){
        that.userInf = res.data;
        this.$apply();
      }
    }
    events = {

    }

    onLoad(query) {
      this.id=query.id;
      this.getDetail();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .showList{
    padding: 30rpx 20rpx;
    .borderBottom;
    &:last-child{
      border: none;
    }
  }
  .head {
    margin-bottom: 20rpx;
    .left {
      .fl;
      width: 110rpx;
    }
    .right {
      .fl;
      width: 600rpx;
      line-height: 40rpx;
      >view{
        margin-bottom: 10rpx;
        &:nth-child(1) {
          font-size: @fs30;
          span {
            font-size: @fs26;
            margin-left: 30rpx;
            background: @red;
            border-radius: 18rpx;
            color: white;
            padding: 5rpx 20rpx;
          }
        }
        &:nth-child(2) {
          font-size: @fs26;
        }
      }
    }
  }
</style>
