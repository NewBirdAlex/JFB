<template>
    <view>
      <view class="bnav" >
        <view >
              <text>
                  <text class="icon iconfont " :class="item.icon"></text><br/>
                  <text>{{item.name}}</text>
              </text>
        </view>
      </view>
    </view>
</template>
<style scoped lang="less">
  @import "../assets/css/common";
  .bnav{
    position: fixed;
    bottom: 0;
    left:0;
    width: 750rpx;
    .overflow;
    background: @grayBg;
    border-top: @border;
    .fs26;
    padding:10rpx 0;
    >view{
      .fl;
      width: 250rpx;
      .tac;
      .icon{
        font-size: 60rpx;
        display: inline-block;
        margin-bottom: 10rpx;
      }
    }
  }
</style>
<script>
  import wepy from 'wepy'

  export default class MyInput extends wepy.component {
    data = {
      navList:[
        {
          path:'/workDiary/menu',
          icon:'icon-bianji',
          name:"写日记"
        },
        {
          path:'/workDiary/watch',
          name:"看日记",
          icon:'icon-yanjing'
        },
        {
          path:'/workDiary/diaryCount',
          icon:'icon-tongji',
          name:"日记统计"
        }
      ]
    }
    props = {

    }
    events = {

    }

    methods = {
      write(event) {
        this.value = event.detail.value;
      }
    }

    onLoad() {

    }
  }
</script>

