
<template>
  <view class=" " >

    <view class="bgWhite marginTop">

      <view class="borderBottom paddingAll overflow tar fs30" style="line-height: 0.5rem">
        <text class=" fl">头像</text>
        <image src="{{baseInf.userAvatar||'../../assets/img/defaultHead.png'}}" class="littleHead " alt=""></image>
        <text class="rightArrow fr">
                   <text class="icon iconfont icon-xiala1"></text>
                </text>
      </view>

      <view class="borderBottom paddingAll overflow  fs30">
        <text class=" ">用户名</text>
        <text class="fr gray">{{baseInf.userName}}</text>
      </view>
      <view class="borderBottom paddingAll overflow  fs30">
        <text class=" ">所在部门</text>
        <text class="fr gray">{{baseInf.departmentName}}</text>
      </view>
      <view class="borderBottom paddingAll overflow  fs30">
        <text class=" ">职位</text>
        <text class="fr gray">{{baseInf.jobTitle}}</text>
      </view>
      <view class="borderBottom paddingAll overflow  fs30">
        <text class=" ">工号</text>
        <text class="fr gray">{{baseInf.employeeNo}}</text>
      </view>
      <view class="borderBottom paddingAll overflow  fs30">
        <text class=" ">总积分</text>
        <text class="fr gray">{{baseInf.userScore}}</text>
      </view>

      <view class="borderBottom paddingAll overflow  fs30">
        <navigator url="../staff/baseInformation?id={{baseInf.userId}}" >
          <text class=" ">基础积分</text><text class="icon iconfont icon-right fr " style="margin-top: 15rpx"></text>
          <text class="fr gray">{{baseInf.baseScore}}</text>
        </navigator>
      </view>
    </view>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class baseDate extends wepy.page {
    config = {
      navigationBarTitleText: '个人信息'
    }
    components = {
    }

    data = {
      baseInf:{}
    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    props = {

    };
    events = {

    }
    async getInformation(){
      let res = await http.post('/user/getUserInfo', {
        getInfoUserId:this.userId
      });
      if(res.code==200000){
        this.baseInf=res.data;
        this.$apply();
      }
    }
    onLoad(query) {
      this.userId = query.id;
      this.getInformation();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";

</style>
