
<template>
  <view class="" >
    <view class="content " >

      <view class="head fs30 paddingLeft paddingRight ">
        <image src="{{orderDetail.userAvatar||'../../assets/img/defaultHead.png'}}"  alt=""></image>
        <text>{{orderDetail.userName}}</text>
        <text class="yellow fr" wx:if="{{orderDetail.checkStatus==1}}">等待审批</text>
        <text class="green fr" wx:if="{{orderDetail.checkStatus==2}}">审批通过</text>
        <text class="red fr" wx:if="{{orderDetail.checkStatus==3}}">审批不通过</text>
      </view>
      <view class="myUl lh50 fs30 paddingLeft paddingRight ">
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

      <view class="showImg" wx:if="{{orderDetail.missionPics}}">
        <block wx:for="{{imgList}}" wx:key="">
          <image src="{{item}}" @tap = 'previewImg({{item}})'   alt=""></image>
        </block>
        <!--<scaleImg :imgList="orderDetail.missionPics.split(',')"></scaleImg>-->
      </view>

      <view class="progress" wx:if="{{orderDetail.approveUserList&&orderDetail.approveUserList.length}}">
        <view class="prog_list" wx:for="{{orderDetail.approveUserList}}" wx:key="">
          <view class="time">
            <text class="icon iconfont icon-gou blue" wx:if="{{item.checkStatus==0||item.checkStatus==2}}"></text>
            <text class="icon iconfont icon-wait gray" wx:if="{{item.checkStatus==1}}"></text>
            <text class="icon iconfont icon-reject red" wx:if="{{item.checkStatus==3}}"></text>
          </view>
          <view class="content paddingAll">
            <view class="left">
              <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" wx:if="{{item.userAvatar}}" class="headPicture" alt=""></image>
            </view>
            <view class="right">
              <view class="overflow">
                {{item.userName}}
                <text class="yellow fr" wx:if="{{item.checkStatus==0}}">提交审批</text>
                <text class="yellow fr" wx:if="{{item.checkStatus==1}}">审批中</text>
                <text class="green fr" wx:if="{{item.checkStatus==2}}">审批通过</text>
                <text class="red fr" wx:if="{{item.checkStatus==3}}">审批不通过</text>
                <text class="red fr" wx:if="{{item.checkStatus==4}}">等待审批</text>

              </view>
              <view class="overflow">
                <text class="gray">{{item.departmentName}}</text>
                <text class="gray fr">{{item.approveDate}}</text>
              </view>
              <view class="triangle-left"></view>
            </view>
            <view class="recommend">
              <view class="borderTop" wx:if="{{item.context}}">
                {{item.context}}
              </view>
              <view class="rec_img" wx:if="{{item.pics}}">
                <block wx:for="{{item.pics.split(',')}}" wx:key="" wx:for-item="itemname">
                  <image src="{{itemname}}" alt="" ></image>
                </block>

              </view>
            </view>
          </view>
        </view>
      </view>

    </view>

    <view class="opBtn"  wx:if="{{orderDetail.btnStatus=='1'}}">
      <text class="green" @tap="go(2)"> 同意</text>
      <text class="yellow" @tap="go(3)"> 拒绝</text>
      <text class="blue" @tap="go(4)"> 撤回</text>
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
      orderDetail:{},
      imgList:[]
    }
    mixins = []
    computed = {

    }

    methods = {
      previewImg(item){
        wx.previewImage({
          current: item, // 当前显示图片的http链接
          urls: this.imgList // 需要预览的图片http链接列表
        })
      },
      async go(type){
        let that = this;

        if (type == 4) {
          //cancel
          let res = await http.post('/missionApprove/cancelApprove', {
            id: this.id
          })
          if(res.code==200000){

          }
        } else {
          wx.navigateTo({
            url: `/pages/apply/spDetail?type=${type}&id=${this.id}`
          })
        }
      }
    }
    async getDetail() {

      let res =await http.post('/missionApprove/approveDetail', {
        id: this.id
      })
      if(res.data){
        this.orderDetail = res.data;
        if(this.orderDetail.missionPics){
          this.imgList = this.orderDetail.missionPics.split(',')
        }
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
        .iconfont{
          margin-top: 64rpx;
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
