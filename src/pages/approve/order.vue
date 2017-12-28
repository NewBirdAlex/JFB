
<template>
  <view class="paddingLeft paddingRight " >
    <view class="content" >

      <view class="head fs30">
        <image src="{{orderDetail.userAvatar||'../../assets/img/defaultHead.png'}}"  alt=""></image>
        <text>{{orderDetail.userName}}</text>
        <text class="yellow fr" wx:if="{{orderDetail.checkStatus==1}}">等待审批</text>
        <text class="green fr" wx:if="{{orderDetail.checkStatus==2}}">审批通过</text>
        <text class="red fr" wx:if="{{orderDetail.checkStatus==3}}">审批不通过</text>
      </view>
      <view class="myUl lh50">
        <view>
          <text class="gray">审批编号</text>
          <text class="fr">{{orderDetail.approveCode}}</text>
        </view>
        <view>
          <text class="gray">所在部门</text>
          <text class="fr">{{orderDetail.departmentName||' '}}</text>
        </view>
        <view>
          <text class="gray">审批标题</text>
          <text class="fr">{{orderDetail.approveTitle||' '}}</text>
        </view>
        <view>
          <text class="gray">审批内容</text>
          <text class="fr">{{orderDetail.approveContext||' '}}</text>
        </view>
        <view>
          <span class="gray">审批时间</span>
          <span class="fr">{{orderDetail.approveDate||" "}}</span>
        </view>
        <view>
          <text class="gray">积分类型</text>
          <text class="fr" wx:if="{{orderDetail.type==3}}">行为积分</text>
          <text class="fr" wx:if="{{orderDetail.type==1}}">品德积分</text>
          <text class="fr" wx:if="{{orderDetail.type==2}}">业绩积分</text>
          <text class="fr" wx:if="{{orderDetail.type==4}}">基础积分</text>
        </view>
        <view>
          <text class="gray">申请积分</text>
          <text class="fr">{{orderDetail.missionScore}}</text>
        </view>
        <view>
          <text class="gray">备注</text>
          <text class="fr">{{orderDetail.approverpxark}}   </text>
        </view>
      </view>

      <div class="showImg" wx:if="{{orderDetail.missionPics}}">
        <!--<img :src="item"  v-for="item in orderDetail.missionPics.split(',')" alt="">-->
        <!--<scaleImg :imgList="orderDetail.missionPics.split(',')"></scaleImg>-->
      </div>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class Order extends wepy.page {
    config = {
      navigationBarTitleText: '详情'
    }
    components = {
    }

    data = {
      id:'',
      orderDetail:{}
    }
    mixins = []
    computed = {

    }

    methods = {

    }
    async getDetail() {

      let res =await http.post('/missionApprove/approveDetail', {
        id: this.id
      })
      if(res.data){
        this.orderDetail = res.data;
        this.$apply();
      }
    }
    props = {

    };
    events = {

    }

    onLoad(query) {
      this.id=query.id;
      this.getDetail();
      this.$apply();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .positionFixed{
    position: fixed;
  }
  .opBtn {
    font-size: @fs30;
    text-align: center;
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
    text {
      display: inline-block;
      line-height: 80rpx;
      width: 32%;
      border-right: @border;
      &:last-child {
        border-right: none;
      }
    }
  }

  .content {
    background: white;
  }

  .head {
    .borderBottom;
    line-height: 90rpx;
    padding: 20rpx 0;
    image {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 20rpx;
      font-size: @fs30;
      border: 0;
    }
  }

  .showImg {
    overflow: hidden;
    image {
      float: left;
      width: 120rpx;
      height: 120rpx;
      margin: 20rpx 10rpx;
      border-radius: 6rpx 6rpx 6rpx 6rpx;
    }
  }
  .myUl >view{
    padding:10rpx 0;
  }
  .triangle-left {
    width: 0;
    height: 0;
    border-top: 10rpx solid transparent;
    border-right: 20rpx solid white;
    border-bottom: 10rpx solid transparent;
  }

  .progress {
    background: #efeff4;
    margin-bottom: 100rpx;
    .paddingAll;
    .prog_list {
      overflow: hidden;
      padding-bottom: 20rpx;
      .time {
        width: 58rpx;
        float: left;
        height: 20rpx;
        i {
          margin-top: 60rpx;
          display: inline-block;
        }
      }
      .content {
        float: left;
        width: 610rpx;
        .left {
          display: inline-block;
          image{
            width: 90rpx;
            width: 90rpx;
            border-radius: 50%;
          }
        }
        .right {
          display: inline-block;
          width: 500rpx;
          vertical-align: top;
          text-indent: 20rpx;
          line-height: 40rpx;
          font-size: @fs30;
          position: relative;
          .triangle-left {
            position: absolute;
            left: -130rpx;
            top: 40rpx;
          }
          >view{
            padding-top: 5rpx;
            &:nth-child(2) {
              font-size: @fs28;
              text {
                font-size: @fs24;
              }
            }
          }
        }
        .recommend {
          margin-top: 20rpx;
          >view{
            font-size: @fs30;
            line-height: 40rpx;
            padding-top: 10rpx;
          }
          .rec_img {
            overflow: hidden;
            image {
              width: 80rpx;
              height: 80rpx;
              margin: 10rpx 10rpx;
            }
          }
        }
      }
    }
  }
</style>
