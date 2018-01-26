
<template>
  <view class="grayBg overflow paddingBottom"  >
    <block wx:for="{{list}}" wx:key="">
      <view class="marginTop marginLeft marginRight paddingAll bgWhite lh40" @tap="go({{item}})">
        <view class="fs30" >{{item.title}}</view>
        <view class="gray fs26 marginTop">
          <text wx:if="{{item.isOnly==1}}" class=" gray">每天一次</text>
          <text wx:if="{{item.isOnly==2}}" class=" gray">每周一次</text>
          <text wx:if="{{item.isOnly==3}}" class=" gray"> 每月一次</text>
          <text wx:if="{{item.isOnly==4}}" class=" gray">每季一次</text>
          <text wx:if="{{item.isOnly==5}}" class=" gray">每年一次</text>
          <text wx:if="{{item.isOnly==6}}" class=" gray"> 无限制 </text>
          <text wx:if="{{item.isOnly==7}}" class=" gray">仅限一次</text>
          <text class="icon iconfont icon-yanjing marginLeft"></text>
          {{item.sums}}
          <text class="fr blue" wx:if="{{!item.isRead}}">未阅读</text>
          <text class="fr" wx:if="{{item.isRead}}">已阅读</text>
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
  export default class philosophy extends wepy.page {
    config = {
      navigationBarTitleText: '经营哲学'
    }
    components = {
    }

    data = {
      showOption:false,
      list: [],
      pageNumber: 1,
      pageSize: 10,
      lastPage: false,
      loading: false
    }
    mixins = [input]
    computed = {

    }
    onReachBottom(){
      if(!this.lastPage) this.getList();
    }
    methods = {
      go(item){
        wx.navigateTo({
          url:`philosophyDetail?id=${item.id}`
        })
      }
    }
    async getList() {
      let that = this;
      let res = await http.post('/culture/cultureListByUser', {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      });
      if(res.code==200000){
        that.pageNumber += 1;
        if (res.data.last) {
          that.lastPage = true;
        }
        that.list = that.list.concat(res.data.content);
        that.loading = false;
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

<style lang="less">
  @import "../../assets/css/common";

</style>
