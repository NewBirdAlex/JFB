
<template>
  <view class=" " >
    <view class="grayBg">
      <!--nav-->
      <view class="gray listWrap firstList" style="font-weight: bold">
        <text>排名</text>
        <text></text>
        <text>姓名</text>
        <text>加分</text>
        <text>扣分</text>
        <text class="blue ">总分</text>
      </view>
      <!--userlist-->
      <block wx:for="{{list}}" wx:key="">
        <view class="bgWhite listWrap tal " >
          <text>
            <text>{{index+1}}</text>
            <!--<text wx:if="{{index>=3}}">{{index+1}}</text>-->
            <!--<text class="iconfont " :class="{'icon-jin':index==0,'icon-jin icon-tong':index==1,'icon-yin':index==2}" wx:if="{{index<3}}"></text>-->
          </text>
          <view>
            <navigator url="../staff/baseDate?id={{item.appUserId}}" >
              <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}"  class="headPicture" alt=""></image>
            </navigator>
          </view>
          <text class="theName">{{item.userName}}</text>
          <text>{{item.addScore||0}}</text>
          <text>{{item.minusScore||0}}</text>
          <text class="blue ">{{item.plusScore||0}}</text>
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
  export default class Board extends wepy.page {
    config = {
      navigationBarTitleText: '积分榜'
    }
    components = {
    }

    data = {
      topStatus: '',
      keyWord:'',
      departmentId:'',
      jobId:'',
      type:'',
      jfType:'',
      searchType:3,
      startTime:'',
      endTime:'',
      allLoaded:false,
      pageNumber:1,
      pageSize:20,
      lastPage:false,
      loading:false,
      list: [],
    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    props = {

    };
    async getList(){
      let res = await http.post('/approveRecord/scoreSortSelectByCom', {
        departmentId: this.departmentId,
        jobId:this.jobId,
        endTime:this.endTime,
        scoreType:this.jfType,
        startTime:this.startTime,
        userName:this.selUserName,
        pageNumber: this.pageNumber,
        type:this.searchType,
        userName:this.keyWord,
        pageSize:this.pageSize
      });
      if(res.data){
        this.list = this.list.concat(res.data.content);
        this.$apply();
      }
    }
    events = {

    }

    onLoad() {
      this.getList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .theName{
    height: 50rpx;
    line-height: 50rpx!important;
    width: 100rpx;
    .overflow;
    vertical-align: middle;
  }
  .listWrap{
    .overflow;
    .fs30;
    .borderBottom;
    padding:20rpx 0;
    >text,>view{
      display: inline-block;
      line-height: 1.2rpx;
      width: calc(~"750rpx/6 - 5px");
      .tac;
      .icon {
        font-size: 60rpx;
      }
    }
  }
  .firstList{
    span{
      line-height: 80rpx!important;
    }

  }
</style>
