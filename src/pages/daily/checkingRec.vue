<style lang="less">
  @import "../../assets/css/common";
  ul{
    padding-bottom: 1rpx;
  }
  .specilIcon {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 400rpx;
    /*animation-duration: 1s;*/
    transition: all 1s;
    /*animation: kiss 0s linear 1s infinite ;*/
  }

  .activeIcon {
    /*transform: translate(-50%,-50%) scale(3)!important;*/
    animation: kiss 1s linear 500ms 1;
  }

  @keyframes kiss {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -75%) scale(3);
    }
    100% {
      transform: translate(-50%, -50%) scale(6);
      opacity: 0;
    }
  }

  .list {
    .overflow;
    .bgWhite;
    line-height: 40rpx;
    .fs28;
    .borderBottom;
    &.rb {
      border: none;
      .right {
        .borderBottom;
      }
    }
    .paddingTop;
    .sg {
      margin-top: 25rpx;
    }
    .left {
      width: 10%;
      height: 100%;
      .tac;
      .fs36;
    }
    .right {
      width: 90%;
      .paddingBottom;
      .md {
        width: 320rpx;

      }
      .icon {
        font-size: 50rpx;
      }
    }

  }

  .top {
    .active {
      .blue;
      border-bottom: 1px solid @blue;
    }
    .borderBottom;
    text {
      display: inline-block;
      width: 30%;
      margin: 0 5%;
      .paddingAll;
      padding-top: 0;
    }
  }
</style>

<template>
  <view class=" " >
    <view class="top  fs30 tac">
      <text :class="{'active':chooseNum}" @tap="change">今日考勤榜</text>
      <text :class="{'active':!chooseNum}" @tap="change">本月考勤榜</text>
    </view>
    <!--select-->
    <view class="bgWhite paddingAll fs28 borderBottom">
      按上班时间排序
      <view class="fr tm fs30" @click="openDate">
        <picker mode="date" value="{{rightTime}}" start="2015-09-01" end="{{now}}" bindchange="bindDateChange" class="fr">
          <view class="picker fr">
            {{rightTime}}<text class="icon iconfont icon-arrLeft-fill "></text>
          </view>
        </picker>
      </view>
    </view>
    <!--list-->
    <view class="bgWhite">
      <block wx:for="{{list}}" wx:key="">
        <view class="list" wx:if="{{chooseNum}}">
          <!--本日考勤-->
          <text class="left fl sg tac">{{index + 1}}</text>
          <view class="right fl">
            <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture fl marginRight" alt=""></image>
            <view class="fl md lh40">
              <view class="fs30">{{item.userName}}</view>
              <view class="gray fs28">
                <text>{{item.checkTime[0]}}</text>
                <text wx:if="{{item.checkStatus==0}}">缺勤</text>
                <text wx:if="{{item.checkStatus==1}}">内勤正常上班</text>
                <text wx:if="{{item.checkStatus==2}}">内勤正常下班</text>
                <text wx:if="{{item.checkStatus==3}}">外勤打卡上班成功</text>
                <text wx:if="{{item.checkStatus==4}}">外勤打卡下班成功</text>
                <text wx:if="{{item.checkStatus==5}}">上班早到</text>
                <text wx:if="{{item.checkStatus==6}}">上班迟到</text>
                <text wx:if="{{item.checkStatus==7}}">下班早退</text>
                <text wx:if="{{item.checkStatus==8}}">加班</text>
              </view>
            </view>
            <view class="fr paddingRight tac marginLeft">
              <view>{{item.score || 0}}</view>
              <text @click="makeAwsome(item)"><i class="icon iconfont icon-dianzanmw fs36 gray"
                                                 :class="{'blue':item.score>0}"></i></text>
            </view>
            <view class="fr blue sg">
              {{item.checkTime[1]}}
            </view>
          </view>
        </view>
        <!--本月考勤-->
        <view class="list rb" wx:else >
          <text class="left fl sg tac">{{index + 1}}</text>
          <view class="right fl">
            <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture fl marginRight" alt=""></image>
            <view class="fl md">
              <view class="fs30">{{item.userName}}</view>
              <view class="gray fs28" v-else>{{item.departmentName}}</view>
            </view>
            <view class="fr paddingRight tac marginLeft">
              <view>{{item.score || 0}}</view>
              <text @click="makeAwsome(item)"><text class="icon iconfont icon-dianzanmw fs36 gray"
                                                 :class="{'blue':item.score>0}"></text></text>
            </view>
            <view class="fr blue sg">
              {{item.totalScore}} 分
            </view>

          </view>
        </view>
      </block>

    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import {myTool} from '../../common/myTool';
  export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: ''
    }
    components = {
    }

    data = {
      rightTime:myTool.getNowDate(),
      now:myTool.getNowDate(),
      clickHeart: false,
      chooseNum: true,
      selectTime: false,
      pickerVisible: '',
      list: [],
      myCheck: [],
      needMycheck:true,
      pageNumber: 1,
      pageSize: 10,
      lastPage: false,
      loading: false
    }
    mixins = [input]
    computed = {

    }
    onReachBottom(){
      if(!this.lastPage) this.getList();
    }
    methods = {
      change(){
        this.chooseNum = !this.chooseNum;
        this.reset();
        this.getList();
        this.$apply();

      }
    }
    bindDateChange(e){
      this.rightTime=e.detail.value;
      this.getList();
      this.$apply();
    }
    reset(){
      this.lastPage = false;
      this.pageNumber = 1;
      this.list = [];
      this.$apply();
    }
    async getList(){
      let that = this;
      if (this.chooseNum) {
        let res = await http.post('/dailyCheck/todayOrder', {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          selectTime: this.rightTime
        });
        if(res.code==200000){
          that.pageNumber += 1;
          if (res.data.list.last) {
            that.lastPage = true;
          }
          //handle check time
          res.data.list.content.forEach(item=>{
            let time = item.checkTime;
            item.checkTime = time.split(' ');
          });
          that.list = that.list.concat(res.data.list.content);
          console.log(res.data.list.content);
          if(that.needMycheck && res.data.myCheck) {
            that.needMycheck=false;
            that.myCheck = res.data.myCheck;
          }
          that.loading = false;
        }
      } else {
        let res = await http.post('/dailyCheck/monthOrder', {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        });
        if(res.code==200000){
          that.pageNumber += 1;
          if (res.data.last) {
            that.lastPage = true;
          }
          that.list = that.list.concat(res.data.content);
          that.loading = false;
        }
      }
      this.$apply();

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

