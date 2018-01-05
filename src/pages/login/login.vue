
<template>
  <view class="wrap bgWhite" >
    <view class="top" >
      <image src="../../assets/img/hxbg.png" alt=""></image>
      <image src="../../assets/img/hx.png" alt=""></image>
      <view>积分宝</view>
    </view>

    <view class="middle bgWhite">
      <view>
        <text class=" iconfont icon-phone blue"></text>
        <input type="tel" class="myInput" id="phone" placeholder="请输入您的手机号" @input="input" value="{{phone}}"/>
      </view>
      <view>
        <text class=" iconfont icon-lock blue"></text>
        <input type="password" class="myInput" id="psw" placeholder="请输入登录密码" @input="input"  value="{{psw}}"/>
      </view>
      <!--<div class="blue marginTop change">修改密码</div>-->
    </view>
    <view class="btn" @tap="submitData">
      登录
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  var md5 = require('../../mixins/md5');
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class Login extends wepy.page {
    config = {
      navigationBarTitleText: '登录'
    }
    components = {
    }

    data = {

    }
    mixins = [input]
    computed = {

    }

    methods = {
      async submitData(){
        if(!this.input.psw&&!this.input.phone){
          tips.alert('请填写账号密码');
          return
        }
        let res = await http.post('/login',{
          password:md5.hexMD5(this.input.psw),
          userName: this.input.phone
        })

        if(res.data){
          wepy.$instance.globalData.userData=res.data;
          wx.setStorageSync('userData', res.data);
          wx.switchTab({
            url: '../tabList/home'
          })
        }else{
          tips.alert(res.message);
        }
      }
    }
    props = {
      twoWayValue: {
        type: String,
        default: '',
        twoWay: true
      }
    };
    events = {

    }

    onLoad() {

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .change{
    margin-left: 180px;
  }
  .btn{
    width: 520rpx;
    height: 88rpx;
    margin: 0 auto;
    margin-top: 100rpx;
    .tac;
    color: white;
    line-height: 88rpx;
    .fs36;
    background-image: linear-gradient(0deg,
    #56bfe6 0%,
    #8fdffc 100%),
    linear-gradient(
      #fffdf0,
      #fffdf0);
    background-blend-mode: normal,
    normal;
    border-radius: 44rpx;
  }
  .top{
    height:483rpx;
    background-size: 100% 100%;
    .tac;
    .fs34;
    color:white;
    position: relative;
    image{
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;

      .marginBottom;
      &:nth-child(2){
        width: 180rpx;
        height: 180rpx;
        left:285rpx;
        top:100rpx;
      }
    }
  }
  .blue{
    color:#57c0e6;
  }
  .middle{
    .tac;
    margin:100rpx 0;
    .lh50;
    >div{
      .marginBottom;
    }
    .icon{
      font-size: 40rpx;
      .marginRight;
      margin-bottom: 20rpx;
    }
    input{
      border-bottom: 1px solid #57c0e6;
      margin-top: 20rpx;
      .fs28;
      position: relative;
      top:10rpx;
      border-radius: 0;

    }
  }
</style>
