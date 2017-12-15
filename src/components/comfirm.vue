<style lang="less">

</style>
<template>
  <view class="list">
      <text @tap="change">{{title}}</text>
      <button>确定</button>
  </view>
</template>
<script>
  import wepy from 'wepy'

  export default class List extends wepy.component {
    data = {

    }
    props={
      title:{
        type: String,
        default: 'hello',
        twoWay: true
      }
    }
    events = {

    }

    methods = {
      change(){
        this.title='hello Alex'
      }
    }

    onLoad () {
    }
  }
</script>
