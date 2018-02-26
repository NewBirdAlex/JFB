
<style lang="less">
  @import "../../assets/css/common";
  .wp > view {
    margin-top: 10rpx;
  }

  .lh50 {
    line-height: 50rpx;
  }

  .left {
    width: 30%;
    .fs28;
  }

  .right {
    width: 70%;
  }

  .read {
    padding: 15rpx 30rpx;
    background: @grayBg;
    color: #646464;
  }

  .unread {
    padding: 15rpx 30rpx;
    background: @blue;
    color: white;
  }

  .search {
    text-align: left;

    .st {
      .paddingAll;
      overflow: hidden;
      line-height: 60rpx;
      .bgWhite {
        float: left;
        width: 600rpx;
        font-size: @fs26;
        border-radius: 8px 8px 8px 8px;
        line-height: 60rpx;
        height: 60rpx;
        .icon{
          font-size: @fs36;
          margin: 0 20rpx;
        }
        input {
          border: none;
          outline: none;
          width: 500rpx;
        }
      }
    }
    .sh {
      line-height: 40rpx;
      .overflow {
        span {
          .grayBg;
          border-radius: 6px 6px 6px 6px;
          padding: 10rpx 20rpx;
          float: left;
          margin: 10rpx;
        }
      }
    }
    .sn {
      .snt {
        .borderBottom;
        position: relative;
        .tac;
        line-height: 0;
        margin: 1rpx 20rpx;

        text {
          position: relative;
          background: white;
          z-index: 2;
          padding: 0 30rpx;
        }
      }
      .snc {
        .tac;
        text {
          display: inline-block;
          line-height: 70rpx;
          margin: 0 20rpx;
          .gray;
          .icon{
            font-size: 60rpx;
            display: block;
          }
        }
      }
    }
  }

  .spTop {
    background: @grayBg;
    .tac;
    font-size: @fs30;
    height: 90rpx;
    line-height: 90rpx;
    .borderBottom;
    text {
      display: inline-block;
      width: 35%;
      margin: 0 5%;
    }
    .active {
      border-bottom: 2px solid @blue;
      color: @blue;
    }
  }

  .sel {
    height: 90rpx;
    line-height: 90rpx;
    background: @grayBg;
    .tac;
    font-size: @fs30;
    .borderBottom;
    position: relative;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      /*display: none;*/
      background: white;
      .sel_type {
        .paddingAll;
        text-align: left;
        text {
          width: 300rpx;
          height: 80rpx;
          .tac;
          display: inline-block;
          line-height: 80rpx;
          background-color: rgba(240, 240, 240, 1);
          border-radius: 6px 6px 6px 6px;
          margin-bottom: 20rpx;
          &:nth-child(odd) {
            float: right;
          }
          &:nth-child(even) {
            float: left;
          }
        }
        .active {
          background: @blue;
          color: white;
        }
        .confBtn {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          margin: 0;
        }
      }
    }
    .filterType {
      float: left;
      width: 50%;
      display: inline-block;
      color: @gray;
    }
  }
</style>
<template>
  <view class=" " >
    <view class="spTop">
      <text :class="{active:spType}" @tap="changeType">我收到的</text>
      <text :class="{active:!spType}" @tap="changeType">我发出的</text>
    </view>
    here is list
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class dailyList extends wepy.page {
    config = {
      navigationBarTitleText: '日志列表'
    }
    components = {
    }

    data = {

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

    onLoad() {

    }
  }
</script>

