
<template>
  <view class="marginAll marginTop border borderRadius bgWhite">
    <view class="subt">
      <text class="icon iconfont icon-jifen1 blue"></text>
      <text class="gray">{{des}}</text>
      <text class="iconfont icon-right fr gray"></text>
    </view>

    <view>
      <view class="paddingAll borderBottom">
        <block  wx:for="{{scoreList}}" wx:key="">
          <view class="showdt">
            <view class="left">
              <image src="{{item.userAvatar}}" wx:if="{{item.userAvatar}}"  ></image>
              <image src="../assets/img/defaultHead.png" wx:if="{{!item.userAvatar}}" ></image>
            </view>

            <view class="right">

              <view class="lh40">
                <text>{{item.userName}}</text>
                <text class="fr blue">
                    <text class="marginAll"><text wx:if="{{item.addScore>0}}">+</text>{{item.addScore}}</text>
                    <text wx:if="{{item.scoreType==1}}">A分</text>
                    <text wx:if="{{item.scoreType==2}}">B分</text>
                    <text wx:if="{{item.scoreType==3}}">C分</text>
                    <text wx:if="{{item.scoreType==4}}">基础分</text>
                </text>
              </view>

              <view class="gray lh50">{{item.jobTitle}}</view>
              <view class="lh50"> <text class="fs30">{{item.approveTitle}}</text></view>
              <view wx:if="{{item.approveContext}}">
                {{item.approveContext}}
              </view>

              <view class="cp" wx:if="{{item.approvePics}}">
                <image src="{{item.approvePics.split(',')}}"  alt=""></image>
                <!--<scaleImg :imgList="item.approvePics.split(',')"></scaleImg>-->
              </view>

              <view class="gray">
                <text class="icon iconfont icon-shijian"></text>
                {{item.createDate}}
                <!--<text class=" fr ">-->
                  <!--<text class="icon iconfont icon-aixin-copy"></text>-->
                  <!--100-->
                <!--</text>-->
              </view>
            </view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import http from '../common/http';
  export default class ActiveScore extends wepy.component {


    components = {

    }

    data = {
      pageSize:10,
      pageNumber:1,
      scoreList:[],
      lastPage:false
    }
    computed = {

    }

    methods = {

    }
    async getList(){

      let res =await http.post('/approveRecord/scoreChange',{
        pageNumber: this.pageNumber,
        pageSize: 10
      });

      if(res.data){
        this.pageNumber+=1;
       this.scoreList = this.scoreList.concat(res.data.content);
        this.$apply();

      }
    }
    watch={
      bottomLoading(newValue, oldValue){
        console.log(newValue)
        if(newValue){
          this.getList();
        }
      }
    }
    props = {
      des:{
        type:String
      }
    };
    events = {
      reachBottom(){
        this.getList();
      }
    }

    onLoad() {
      if(this.lastPage) return
      this.getList();
    }
  }
</script>

<style lang="less">
  @import "../assets/css/common";
  .subt{
    font-size: @fs28;
    padding:30rpx 0;
    margin: 0 20rjpx;
    .borderBottom;
    &:nth-child(1){
      margin: 0;
      padding:30rpx 20rpx;
    }
  }
  .showdt{
    .borderBottom;
    padding:20rpx 0;
    .overflow;
    &:last-child{
      border-bottom: none;
    }
    .left{
      width: 110rpx;
      margin-top: 10rpx;
      .fl;
      image{
        width: 90rpx;
        height:90rpx;
        border-radius: 50%;
      }
    }
    .right{
      width: 550rpx;
      .fl;
      line-height: 40rpx;
      font-size: @fs26;
      h4{font-size: @fs30;}
      .cp{
        .overflow;
        image{
          float: left;
          width: 160rpx;
          height: 160rpx;
          margin: 10rpx 1.5%;
        }
      }
    }
  }
</style>
