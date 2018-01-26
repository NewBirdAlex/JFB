<style lang="less">
  @import "../../assets/css/common";
  .newTop{
    .overflow;
    text{
      width: 50%;
      .fl;
      padding:30rpx 0;
      &.active{
        background: @blue;
        color:white;
      }
    }
  }
  .blackBg{
    background: #ccc!important;
  }
  .grayBg{
    background: #ccc!important;
  }

  .map{
    width: 100%;
    height: 400rpx;
  }
  .tm{
    padding: 20rpx;
    background-color: rgba(221, 241, 255, 1);
    border-radius: 6px 6px 6px 6px;
    color: #338ecc;
    position: relative;
  }
  .bwp{
    position: relative;
    border-radius: 50%;
    background-color: rgba(162, 242, 235, 1);
    /*border:1px solid #a2f2eb;*/
    margin: 20rpx auto;
    .tac;
    width: 220rpx;
    height: 220rpx;
    line-height: 200rpx;
  }
  .ckbtn{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    background-color: rgba(51, 214, 208, 1);
    .tac;
    color:white;
    .fs30;
    display: inline-block;
    vertical-align: middle;
    line-height: 30rpx;
    >view{
      &:first-child{margin-top: 70rpx}
    }
  }
  .mpwrap{
    background-color: rgba(239, 250, 250, 1);
  }
  #allmap{
    height: 40rpx;
  }
  .inf{
    position: relative;
    border-left:@border;
    line-height: 40rpx;
    padding:0 40rpx;
    .marginLeft;
    .btn{
      padding: 10rpx 20rpx;
      background-color: rgba(211, 252, 251, 1);
      color:#22b2ad;
      .borderRadius;
      margin: 20rpx;
      display: inline-block;

    }
    .type{
      position: absolute;
      left: 0;
      top:0;
      transform: translate(-50%);
      background: @gray;
      color:white;
      border-radius: 50%;
      padding: 10rpx;
      width: 30rpx;
      height: 30rpx;
      .tac;
      line-height: 30rpx;

    }
    .active{
      background: @blue;
      color:white;
    }
  }
  .lh{
    line-height: 40rpx;
  }
  .top{
    .active{
      .blue;
      border-bottom: 1px solid @blue;
    }
    .borderBottom;
    span{
      display: inline-block;
      width: 40%;
      .paddingAll;
    }
  }
</style>

<template>
  <view class=" " >
    <view class="newTop  fs30 tac borderBottom">
      <text :class="{'active':chooseNum==1}" @tap="changeChooseNum(1)">内勤</text>
      <text :class="{'active':chooseNum==2}" @tap="changeChooseNum(2)">外勤</text>
    </view>
    <!--staff-->
    <view class="bgWhite paddingAll overflow borderBottom">
      <image src="{{userData.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture fl marginRight" alt=""></image>
      <view class="fl lh" style="padding-top: 0.1rem">
        <view class="fs30"><strong>{{userData.userName}}</strong></view>
        <view class="fs28 gray" wx:if="{{clockInformation.groupName}}">{{clockInformation.groupName}}</view>
        <view class="fs28 red" wx:else>暂无此考勤组信息,请切换考勤组</view>
      </view>
      <view class="fr tm fs30" @click="openDate">
        <picker mode="date" value="{{rightTime}}" start="2015-09-01" end="{{now}}" bindchange="bindDateChange" class="fr">
          <view class="picker fr">
            {{rightTime}}
          </view>
        </picker>
      </view>
    </view>

    <navigator url="checkingRec" ><view class="tar fs30 paddingRight marginTop blue">参看考勤榜</view></navigator>
    <!--clock inf-->
    <view class="paddingAll bgWhite fs30">
      <view class="inf  bgWhite " >
        <view class="fs30 lh50">上班时间  {{startTime}}</view>
        <view wx:if="{{checkList[0]}}"><text class="btn">{{checkList[0].checkDesc}}</text>  <text class="btn">{{checkList[0].tip}}</text></view>
        <view class="gray" wx:if="{{checkList[0]}}">打卡时间  {{checkList[0].checkTime}}</view>
        <view wx:else class="gray">无打卡信息</view>
        <text class="type " :class="{'active':checkList[0]}">上</text>
      </view>
      <view class="inf  bgWhite marginTop" >
        <view class="fs30 lh50">下班时间  {{endTime}}</view>
        <view wx:if="{{checkList[1]}}"><text class="btn" >{{checkList[1].checkDesc}}</text>  <text class="btn">{{checkList[1].tip}}</text></view>
        <view class="gray" wx:if="{{checkList[1]}}">打卡时间  {{checkList[1].checkTime}}</view>
        <view wx:else class="gray">无打卡信息</view>
        <text class="type " :class="{'active':checkList[1]}">下</text>
      </view>
    </view>
    <!-- map.wxml -->
    <map wx:if="{{center.lon}}"
         id="map"
         longitude="{{center.lon}}"
         latitude="{{center.lat}}"
         scale="14"
         controls="{{controls}}"
         bindcontroltap="controltap"
         markers="{{markers}}"
         bindmarkertap="markertap"
         polyline="{{polyline}}"
         bindregionchange="regionchange"
         show-location style="width: 100%; height: 200px;">

    </map>

    <!--clock-->
    <view style="padding:1rem 0" >
      <view class="bwp" :class="{'blackBg':!couldClick}" @click="checkIn" >
        <view class="ckbtn" :class="{'grayBg':!couldClick}">
          <view>打卡</view>
          <view>{{time.h|addZero}}:{{time.m|addZero}}:{{time.s|addZero}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class clockIn extends wepy.page {
    config = {
      navigationBarTitleText: '考勤'
    }
    components = {
    }

    data = {
      userData:{},
      time:'',
      chooseNum:2,
      rightTime:'',
      ak:'jzbCq3Pg2pZ0wb2A5c6weIO62n2fdlh3',
      center: {lng: 0, lat: 0},
      zoom: 15,
      pickerVisible:'',
      //submit params
      checkAddress:'',
      checkPics:'',
      checkRemark:'',
      latitude:'',
      longitude:'',
      checkList:[],
      clockInformation:{},
      startTime:'',
      endTime:'',
      couldClick:false,
      //submit params
      time:{
        h:'',
        m:'',
        s:''
      },
      //map params
      center:{
        lat:'23.099994',
        lon:'113.324520'
      },
      markers: [{
        iconPath: "../../assets/img/location.png",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color:"#FF0000DD",
        width: 2,
        dottedLine: true
      }],
      controls: [{
        id: 1,
        iconPath: "../../assets/img/location.png",
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }
    mixins = [input]
    computed = {

    }
    regionchange(e) {
      console.log(e.type)
    }
    markertap(e) {
      console.log(e.markerId)
    }
    controltap(e) {
      console.log(e.controlId)
    }
    methods = {
      bindDateChange(e){
        this.rightTime=e.detail.value;
        this.$apply();
        this.getClockIn();
      },
      changeChooseNum(num){
        this.checkList=[];
        this.chooseNum = num;
        this.clockInformation = {};
        wx.setStorageSync('chooseNum', num)
        this.getClockIn();
        this.$apply();
      }
    }
    countTime(){
      //打卡时间
      let that = this;
      let timer = setTimeout(function () {
        let nowDate = new Date();
        that.time.h=nowDate.getHours();
        that.time.m=nowDate.getMinutes();
        that.time.s=nowDate.getSeconds();
        that.time.h<10?that.time.h='0'+that.time.h:'';
        that.time.m<10?that.time.m='0'+that.time.m:'';
        that.time.s<10?that.time.s='0'+that.time.s:'';
        that.$apply();
        that.countTime();
      },1000)
    }
    async getClockIn(){
      //check clock in information
      let that = this;
      that.startTime = '';
      that.endTime = '';
      let res =await http.post('/dailyCheck/getCheckDetail', {
        selectTime:this.rightTime,
        type:this.chooseNum
      });
      if(res.code == 500000) {
        that.couldClick=false;
        return
      }
      if(res.code==200000){

        that.checkList = res.data.checkList;
        that.clockInformation = res.data;
        that.startTime = res.data.startTime;
        that.endTime = res.data.endTime;
        if(that.rightTime!=that.now&&that.rightTime){
          //today or not
          setTimeout(function(){that.couldClick=false;},500)
        }else{
          that.checkList.length==2?that.couldClick=false:that.couldClick=true;
        }
        this.$apply();
      }

    }
    props = {

    };
    events = {

    }

    onLoad() {
      //
      if(wx.getStorageSync('chooseNum')){
        this.chooseNum = wx.getStorageSync('chooseNum');
      }
      let that =this;
      //location
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          that.center.lat = res.latitude;
          that.center.lon = res.longitude;
          let speed = res.speed;
          let accuracy = res.accuracy;
          console.log(res)
        }
      });
      //get date
      let data = new Date();
      this.rightTime = this.now =  data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();

      this.userData = wepy.$instance.globalData.userData;
      this.countTime();
      this.getClockIn();
    }
  }
</script>

