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
  .iconfont{
    font-size: 50rpx;
    vertical-align: middle;
  }
</style>
<template>
  <view class=" wrap2 bgWhite">
    <block wx:for="{{staffList}}" wx:key="index">
      <view class="fs30 paddingAll bgWhite marginTop borderBottom" wx:if="{{index==1}}">他们也申请了 <text class="gray">(勾选后可以一次性审批)</text></view>
      <view class="inner">
        <view style="display: inline-block;" wx:if="{{index!=0}}">
          <text  class=" cl marginRight" @tap="selectPerson({{index}})" wx:if="{{!item.select}}"></text>
          <text  @tap="selectPerson({{index}})" class="icon iconfont icon-gou blue marginRight" wx:else></text>
        </view>

        <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture" alt=""></image>
        <text>{{item.userName}}</text>
        <!--pick or input-->
        <view class="fr" wx:if="{{scoreRange}}">
          <picker @change="bindPickerChange({{index}})" value="{{selectIndex[index]}}" range="{{scoreRange}}">
            <view class="picker">

              <text wx:if="{{selectIndex[index]}}">{{scoreRange[selectIndex[index]]}}</text>
              <text wx:else>{{item.addScore}}</text>
              <text class="iconfont icon-arrLeft-fill"></text>
            </view>
          </picker>
        </view>
        <view class="fr" wx:else>
          <!--input score-->
          <input type="number" class="tar marginTop" placeholder="输入分数" value="{{item.addScore}}" id="{{index}}" @input="getScore"/>
        </view>

      </view>
    </block>
  </view>
</template>
<script>
  import wepy from 'wepy'

  export default class ShowStaff extends wepy.component {
    data = {
      imageList:[],
      selAll:false,
      selectIndex:[],
      count:0
    }
    props={
      mySelf:{
        type:[Boolean,String],
        default:true
      },
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

//        if(val.length!=this.count){
//          for(let i = 0;i<val.length-this.count;i++){
//            this.selectIndex.push(0);//init point
//          }
//          this.count = val.length;
//        }
//        this.$apply();
      }
    }
    methods = {
      getScore(event){
        this.staffList[event.target.id].addScore=event.detail.value;
      },
      selectPerson(index){
        this.staffList[index].select=!this.staffList[index].select;

        this.$apply();
        console.log(this.staffList[index].select)
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
          this.staffList[index].addScore=this.scoreRange[event.detail.value]
        }

        this.$apply();
      },
    }

    onLoad () {

    }
  }
</script>
