<style lang="less">
  @import "../assets/css/common";
  .wrap2{
    position: relative;
    padding:0 20rpx;
    .inner{
      position: relative;
      background: white;
      z-index: 10;
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: @border;
      padding:20rpx 0;
      font-size: @fs30;
      .op{
        display: inline-block;
        vertical-align: middle;
        width: 70rpx;
        font-size: @fs26;
      }
      image{
        width: 90rpx;
        height: 90rpx;
        display: inline-block;
        vertical-align: middle;
        margin-right: 20rpx;
      }
    }
  }
  .icon-xialakuangtishitubiao{
    font-size: 12px;
    color: @gray;
    margin-left: 20rpx;
    margin-right: 20rpx;
  }
</style>
<template>
  <view class=" wrap2 bgWhite">
    <block wx:for="{{staffList}}" wx:key="">
      <view class="inner">
        <text class="iconfont icon-close48 marginRight" @tap="deleteStaff({{index}})"></text>
        <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture" alt=""></image>
        <text>{{item.userName}}</text>
        <view class="fr">
          <picker @change="bindPickerChange({{index}})" value="{{selectIndex[index]}}" range="{{scoreRange}}">
            <view class="picker">
              {{scoreRange[selectIndex[index]]}}
              <text class="iconfont icon-arrLeft-fill"></text>
            </view>
          </picker>
        </view>
      </view>
    </block>
    <view class="bgWhite paddingAll lh40 fs28" v-if="$route.params.mission!='true'">
      <text>全选积分</text>
      <text class="gray">(选择可批量修改申请的积分)</text>
      <view class="fr  cl" :class="{'border':!selAll}" @tap="selectAll"><text style="font-size: 40rpx;" class=" iconfont icon-gou blue" wx:if="{{selAll}}"></text></view>
    </view>
  </view>
</template>
<script>
  import wepy from 'wepy'

  export default class ShowStaff extends wepy.component {
    data = {
      imageList:[],
      selAll:false,
      selectIndex:[0]
    }
    props={
      staffList:{
        type:Array,
        twoWay: true
      },
      scoreRange:{
        type:Array
      }
    }
    events = {

    }
    watch={
      staffList(val){
        console.log(val)
        val.forEach(item=>{
          this.selectIndex.push(0)
        })
      }
    }
    methods = {
      selectAll(){
        this.selAll=!this.selAll;
        this.$apply();
      },
      deleteStaff(index){
        this.staffList.splice(index,1);
        this.selectIndex.splice(index,1);
      },
      bindPickerChange: function(index,event) {
        if(this.selAll){
          //全选
          for(let i = 0;i<this.selectIndex.length;i++){
            this.staffList[i].selectAddScore=this.scoreRange[event.detail.value]
            this.selectIndex[i]=event.detail.value;
          }
        }else{
          this.selectIndex [index]= event.detail.value;
          this.staffList[index].selectAddScore=this.scoreRange[event.detail.value]
        }

        this.$apply();
      },
    }

    onLoad () {

    }
  }
</script>
