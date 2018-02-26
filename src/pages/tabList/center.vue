
<template>
  <view class="grayBg " >
      <view class="paddingAll">
        <!--顶部-->
        <view class="pt">
          <navigator url="../staff/baseDate?id={{baseInf.userId}}" >
            <view class="borderBottom overflow paddingBottom marginBottom">
              <image class="phead" src="{{baseInf.userAvatar||'../../assets/img/defaultHead.png'}}" alt=""></image>
              <view class="right">
                <view class="fs30"> {{baseInf.userName}}</view>
                <view class="gray fs26">
                  {{baseInf.departmentName}} {{baseInf.jobTitle}}
                  <text class="fr iconfont icon-right"></text>
                </view>
                <view class="fs28">积分：{{baseInf.userScore}}   基础积分：{{baseInf.baseScore}}</view>
              </view>
            </view>
          </navigator>
          <canvas style="width: 100%;height: 500rpx"  canvas-id="main"></canvas>

        </view>

        <!--导航-->
        <view class="pt marginTop opItem fs28">
          <view class="item">
            <navigator url="../information/structure" >
              <text class="leftPart  iconfont icon-phone"></text>
              <view class="rightPart">
                企业组织架构
                <text class="fr iconfont icon-right"></text>
              </view>
            </navigator>
          </view>

          <view class="item">
            <navigator url="../apply/missionList?type=2" >
              <text class="leftPart  iconfont icon-phone"></text>
              <view class="rightPart">
                我的任务
                <text class="fr iconfont icon-right"></text>
              </view>
            </navigator>
          </view>
          <view class="item">
            <text class="leftPart  iconfont icon-phone"></text>
            <view class="rightPart">
              我的日记
              <text class="fr iconfont icon-right"></text>
            </view>
          </view>

          <!--<div class="item">-->
          <!--<router-link to="/manageDiary">-->
          <!--<i class="leftPart icon iconfont icon-guanli1"></i>-->
          <!--<div class="rightPart">-->
          <!--我的管理-->
          <!--<span class="fr rightArrow">-->
          <!--<i class=" icon iconfont icon-xiala1"></i>-->
          <!--</span>-->
          <!--</div>-->
          <!--</router-link>-->
          <!--</div>-->
        </view>
        <view class="logout" @click="logOut">
          退出登录
        </view>
      </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import http from '../../common/http';
  import tips from '../../common/tips';

  var wxCharts = require('../../common/wxcharts.js');
  export default class Center extends wepy.page {
    config = {
      navigationBarTitleText: '个人中心'
    }
    components = {
    }

    data = {
      baseInf:{}
    }
    mixins = []
    computed = {

    }

    methods = {
      logOut(){

      }
    }
    async getScoreList(){
      let res = await http.post('/approveRecord/getLeftPieData', {
        type:4,
        getUserId:this.baseInf.userId
      });
      if(res.data){
        new wxCharts({
          canvasId: 'main',
          type: 'column',

          categories: ['A分', 'B分', 'C分', '基础', '加分', '减分','总分'],
          series: [{
            color:"#c23531",
            data: [res.data.morally, res.data.achivment, res.data.behavior,res.data.baseScore, res.data.plusScore, res.data.minusScore,res.data.sumScore]
          }],
          yAxis: {
            format: function (val) {
              return val ;
            }
          },
          width: 320,
          height: 250
        });
      }
    }
    props = {

    };
    events = {

    }

    onLoad() {
      this.baseInf =wepy.$instance.globalData.userData;
      this.getScoreList();

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  #main{
    height: 500rpx;
    width: 120%;
    position: relative;
    z-index: 10;
    left:-3%;
  }
  .logout {
    width: 710rpx;
    height: 88rpx;
    line-height: 88rpx;
    .tac;
    .blue;
    margin-top: 100rpx;
    font-size: @fs36;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 8px 8px 8px 8px;
  }

  .opItem {
    .item {
      padding-top: 30rpx;
      font-size: @fs30;
      .overflow;
      &:first-child{padding-top: 0}
      .leftPart {
        float: left;
        width: 10%;
        .blue;
      }
      .rightPart {
        float: left;
        width: 90%;
        padding-bottom: 20rpx;
        .borderBottom;
      }
      &:last-child {
        .rightPart {
          border: none;
        }
      }
    }
  }

  .pt {
    border: @border;
    overflow: hidden;
    .bgWhite;
    .paddingAll;
    padding-bottom: 0;
    border-radius: 8px 8px 8px 8px;
    .phead {
      display: inline-block;
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
    }
    .right {
      width: 520rpx;
      .fr;
      line-height: 50rpx;
      span {
        transform: rotate(-90deg);
      }

    }
  }
</style>
