<style lang="less">
  @import "../../assets/css/common";
  .list{
    .overflow;
    .bgWhite;
    line-height: 40rpx;
    .fs28;
    .borderBottom;
    &.rb{
      border:none;
      .right{
        .borderBottom;
      }
    }
    .paddingTop;
    .sg{
      margin-top: 25rpx;
    }
    .left{
      width: 10%;
      height: 100%;
      .tac;
    }
    .right{
      width: 90%;
      .paddingBottom;
      .md{
        width: 360rpx;
      }
      .icon{
        font-size: 40rpx;
      }
    }

  }
  .top{
    .active{
      .blue;
      border-bottom: 1px solid @blue;
    }
    .borderBottom;
    >text{
      display: inline-block;
      width: 30%;
      margin: 0 5%;
      .paddingAll;
    }
  }
</style>
<template>
  <view class="grayBg " >
    <view class="top  fs30 tac">
      <text :class="{'active':chooseNum}" @tap="change">本日统计</text>
      <text :class="{'active':!chooseNum}" @tap="change">本月统计</text>
    </view>

    <view class="bgWhite paddingAll fs28 borderBottom" wx:if="{{chooseNum}}">
      按上班时间排序
      <view class="fr tm fs30 blue" @tap="openDate">
        <picker mode="date" value="{{rightTime}}" start="2015-09-01" end="{{now}}" bindchange="bindDateChange" class="fr">
          <view class="picker fr">
            {{rightTime}}
          </view>
        </picker>
      </view>
    </view>


    <view >
      <view class="list marginBottom" wx:if="{{chooseNum}}">
        <text class="left fl sg tac"></text>
        <view class="right fl">
          <image src="{{selfInfo.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture fl marginRight"  alt=""></image>
          <view class="fl md">
            <view class="fs30">{{selfInfo.userName}}</view>
            <view class="gray fs28">
              <text>发布日记：{{selfInfo.sendCount||0}}</text>
              <text>累计点赞：{{selfInfo.likeCount||0}}</text>
            </view>
          </view>
          <view class="fr blue sg marginRight">
            {{selfInfo.totalScore||0}}分
          </view>
        </view>
      </view>
      <block wx:for="{{list}}" wx:key="">
        <view class="list ">
          <text class="left fl sg tac fs30">{{index+1}}</text>
          <view class="right fl">
            <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture fl marginRight"  alt=""></image>

            <view class="fl md">
              <view class="fs30">{{item.userName}}</view>
              <view class="gray fs28" v-if="chooseNum">
                <text>发布日记：{{item.sendCount||0}}</text>
                <text>累计点赞：{{item.likeCount||0}}</text>
              </view>
              <view class="gray fs28" v-else>
                <text>{{item.departmentName}}</text>
              </view>
            </view>
            <view class="fr paddingRight tac" v-if="!chooseNum">
              <view>{{item.likeCount||0}}</view>
              <text class="icon iconfont icon-damuzhi gray" :class="{'blue':item.likeCount>0}" @tap="makeAwsome({{index}})"></text>
            </view>
            <view class="fr blue sg marginRight">
              {{item.totalScore||0}}分
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
  export default class dailyCount extends wepy.page {
    config = {
      navigationBarTitleText: '日志统计'
    }
    components = {
    }

    data = {
      chooseNum:true,
      pageNumber: 1,
      pageSize: 10,
      lastPage: false,
      loading: false,
      rightTime:'',
      now:'',
      pickerVisible:'',
      list:[],
      selfInfo:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      bindDateChange(e){
        this.rightTime=e.detail.value;
        this.reset();
        this.getList();
        this.$apply();
      },
      change(){
        this.chooseNum=!this.chooseNum;
        this.rightTime = this.now;
        this.reset();
        this.getList();
        this.$apply();
      },
      async makeAwsome(index){
        let that = this;
        let res = await http.post('/dailyRecord/goodDaily', {
          addUserId: this.list[index].userId,
          id:this.list[index].id,
        });
        if(res.code==200000){
          this.list[index].likeCount+=1;
        }
      }
    }
    props = {

    };
    events = {

    }
    reset(){
      this.pageNumber=1;
      this.lastPage=false;
      this.list=[];
    }
    async getList(){

      if(this.lastPage){
        tips.alert('没有更多数据了');
        return
      }
      let that = this;
      if(this.chooseNum){
        var url = '/dailyRecord/todayList'
      }else{
        var url = '/dailyRecord/monthList'
      }

      let res = await http.post(url, {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        selectTime: "",
      });
      if(res.code==200000){
        that.pageNumber += 1;
        if(that.chooseNum){
          //today
          if (res.data.dailyList.last) {
            that.lastPage = true;
          }
          that.list = that.list.concat(res.data.dailyList.content);
          that.selfInfo = res.data.selfInfo;
        }else{
          //month
          if (res.data.last) {
            that.lastPage = true;
          }
          that.list = that.list.concat(res.data.content);
        }

        that.loading = false;
        this.$apply();
      }
    }
    onReachBottom(){
      this.getList();
    }
    onLoad() {
      //get date
      let data = new Date();
      this.rightTime = this.now =  data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
      this.getList();
    }
  }
</script>


