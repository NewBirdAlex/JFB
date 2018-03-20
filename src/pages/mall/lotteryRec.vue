
<template>
  <view class=" " >
    <block wx:for="{{record}}" wx:key="">
      <view class="paddingAll borderBottom bgWhite lh40">
        <view class="fs30">
          {{ item.luckName }}
          <text class="yellow fr" wx:if="{{item.status == 1}}">兑换中</text>
          <text class="green fr" wx:if="{{item.status == 2}}">已兑换</text>
          <text class="red fr" wx:if="{{item.status == 0}}">兑换失败</text>
        </view>
        <view class="fs26 gray">
          <text>{{ item.groupTitle }}</text>
          <text class="fr fs24">{{ item.createDate }}</text>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class lotteryRec extends wepy.page {
    config = {
      navigationBarTitleText: '抽奖记录'
    }
    components = {
    }

    data = {
      record:[],
      send:{
        "pageNumber": 1,
        "pageSize": 10,
      },
      loading:false,
      lastPage:false,
      requrl:'',
    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    async getList(){

      let res = await http.post(this.requrl,this.send);
      if(res.code==200000){
        this.send.pageNumber++;
        this.record = this.record.concat(res.data.content);
        this.lastPage =res.data.last;
        this.loading =res.data.last;
        this.$apply();
      }
    }
    props = {

    };
    events = {

    }
    onReachBottom(){
      if(!this.lastPage){
        this.getList();

      }
    }
    onLoad(query) {
      this.requrl = query.type?'/luckyRecord/luckRecordByUser':'/luckyRecord/luckRecordByAll';
      this.getList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";

</style>
