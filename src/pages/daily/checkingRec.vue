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

    methods = {
      change(){
        this.chooseNum = !this.chooseNum;
        this.reset();
        this.getList();
        this.$apply();

      },
      bindDateChange(){
        this.rightTime=e.detail.value;
        this.$apply();
      }
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
          that.list = that.list.concat(res.data.list.content);
          console.log(res.data.list.content)
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

