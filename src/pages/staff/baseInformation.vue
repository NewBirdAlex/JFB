
<template>
  <view class=" grayBg" >
    <view class="head  tac bgWhite paddingAll borderBottom">
      <div>
        <image src="{{userInf.userAvatar||'../../assets/img/defaultHead.png'}}"  alt=""></image>
      </div>
      <view>{{userInf.userName}}的基础信息</view>
      <view><span class="blue">基础积分：{{userInf.baseScore}}</span></view>
    </view>

    <view class="paddingAll bgWhite fs30 borderBottom lh40">
      <text class="icon iconfont icon-job fs36"></text>
      <text>职位：{{userInf.jobMap.jobTitle}}</text>
      <text class="fr">+{{userInf.jobMap.jobScore}}分</text>
    </view>

    <view class="paddingAll bgWhite marginTop fs30 borderBottom">
      <text class="icon iconfont icon-yuangongnianling fs36"></text>
      <text>工龄奖励</text>
      <text class="gray fs26">（{{userInf.entryTime}}）</text>
    </view>

    <view class="praise" wx:if="{{userInf.jobYearList}}">
      <block wx:for="{{ userInf.jobYearList}}" wx:key="">
        <view><i></i>{{item.jobYearTitle}}</view>
      </block>
      <view wx:if="{{!userInf.jobYearList.length}}" class="gray ">暂无</view>
    </view>

    <view class="paddingAll bgWhite fs30 borderBottom marginTop">
      <text class="icon iconfont icon-education fs36"></text>
      <text>学历：{{userInf.eduMap.eduTitle}}</text>
      <text class="fr">+{{userInf.eduMap.eduScore}}</text>
    </view>


    <view class="paddingLeft  borderBottom bgWhite overflow mulItem fs30" wx:if="{{userInf.techList}}">
      <view class="left paddingTop paddingBottom">
        <text class="icon iconfont icon-zhicheng fs36"></text>
        <text>职称：</text>
      </view>
      <view class="right">
        <block wx:for="{{userInf.techList}}" wx:key="">
          <view class=" borderBottom paddingAll" >
            {{item.techTitle}}
            <text class="fr">+{{item.techScore}}分</text>
          </view>
        </block>

        <view  wx:if="{{!userInf.techList.length}}" class="gray lh50 marginTop"> 暂无</view>
      </view>
    </view>

    <view class="paddingLeft  borderBottom bgWhite overflow mulItem fs30"  wx:if="{{userInf.honorList}}">
      <view class="left paddingTop paddingBottom">
        <text class="icon iconfont icon-renwu1 fs36"></text>
        <text>荣誉：</text>
      </view>
      <view class="right">
        <block wx:for="{{userInf.honorList}}" wx:key="">
          <view class=" borderBottom paddingAll" >
            {{item.honorTitle}}
            <text class="fr">+{{item.honorScore}}分</text>
          </view>
        </block>
        <view  wx:if="{{!userInf.honorList.length}}" class="gray lh50 marginTop"> 暂无</view>

      </view>
    </view>


    <view class="paddingLeft  borderBottom bgWhite overflow mulItem fs30" wx:if="{{userInf.skillList}}">
      <view class="left paddingTop paddingBottom">
        <text class="icon iconfont icon-techang fs36"></text>
        <text>特长：</text>
      </view>
      <view class="right">
        <block wx:for="{{userInf.skillList}}" wx:key="">
          <view class=" borderBottom paddingAll" >
            {{item.skillTitle}}
            <text class="fr">+{{item.skillScore}}分</text>
          </view>
        </block>

        <view  wx:if="{{!userInf.skillList.length}}" class="gray lh50 marginTop"> 暂无</view>
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class baseInformation extends wepy.page {
    config = {
      navigationBarTitleText: '个人信息'
    }
    components = {
    }

    data = {
      userInf:{}
    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    props = {

    }
    async getDetail(){
      let that = this;
      let res = await http.post('/user/getUserBaseInfo', {
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

      this.id = query.id;
      this.getDetail();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .icon{
    position: relative;
    top:-2px;
  }
  .mulItem{
    .left{
      .fl;
      width: 140rpx;
    }
    .right{
      .fr;
      width: 570rpx;
      .paddingAll{
        &:last-child{
          border-bottom: none;
        }
      }
    }
  }

  .praise {
    .bgWhite;
    .paddingAll;
    >view{
      .fs26;
      line-height: 50rpx;
      text-indent: 50rpx;
      .iconfont {
        display: inline-block;
        width: 20rpx;
        height: 20rpx;
        background: @blue;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 20rpx;
      }
    }
  }

  .iconfont{
    vertical-align: middle
  }

  .head {
    font-size: @fs30;
    image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 50%;
      margin-bottom: 20rpx;
      .marginTop;
    }
    .blue {
      font-size: @fs26;
      padding: 10rpx 20rpx;
      color: #338ecc;
      .marginTop;
      display: inline-block;
      background-color: rgba(221, 241, 255, 1);
      border-radius: 6px 6px 6px 6px;
    }
  }
</style>
