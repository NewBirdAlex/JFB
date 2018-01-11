
<template>
  <view class="grayBg">
    <block wx:for="{{list}}" wx:key="">
      <view class="overflow bgWhite paddingAll list marginTop">
        <view class="fs30">{{item.context}}</view>
        <view class="fs28 gray overflow"><text class="fr">{{item.companyName}}</text></view>
        <view class="fs26 gray overflow"><text class="fr">{{item.createDate}}</text></view>
      </view>
    </block>
  </view>

</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class announcementList extends wepy.page {
    config = {
      navigationBarTitleText: '公告列表'
    }
    components = {

    }

    data = {
      list: [],
      pageNumber: 1,
      pageSize: 10,
      lastPage: false,
      loading: false
    }
    mixins = [input]
    computed = {

    }

    methods = {

    }
    props = {

    };
    events = {

    }
    async getList() {
      let that = this;
      this.loading = true;
      let res =await http.post('/notes/noteList', {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      if(res.data){
        that.pageNumber += 1;
        if (res.data.last) {
          that.lastPage = true;
        }
        that.list = that.list.concat(res.data.content);
        that.loading = false;
        this.$apply();
      }
    }
    onReachBottom(){
      if(!this.lastPage&&!this.loading){
        this.getList();
      }
    }
    onLoad() {
      this.getList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";

</style>
