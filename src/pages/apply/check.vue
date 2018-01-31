
<template>
  <view class="grayBg">
    <block wx:for="{{list}}" wx:key="">
      <view class="marginBottom" @tap="go({{item}})">
        <view class=" bgWhite paddingAll lh40" >
          <view class="fs30">{{item.title}}</view>
          <view class="fs24 marginTop gray">
            <text class="marginRight" wx:if="{{item.ifOnly==1}}">每天一次</text>
            <text class="marginRight" wx:if="{{item.ifOnly==2}}">每周一次</text>
            <text class="marginRight" wx:if="{{item.ifOnly==3}}"> 每月一次</text>
            <text class="marginRight" wx:if="{{item.ifOnly==4}}">每季一次</text>
            <text class="marginRight" wx:if="{{item.ifOnly==5}}">每年一次</text>
            <text class="marginRight" wx:if="{{item.ifOnly==6}}"> 无限制 </text>
            <text class="marginRight" wx:if="{{item.ifOnly==7}}">仅限一次</text>
            <text class="icon iconfont icon-yanjing marginRight" ></text>{{item.sums}}
            <text class="blue fr"  wx:if="{{item.isRead}}">已考核</text>
            <text class="red fr"  wx:else>未考核</text>
          </view>
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
  export default class check extends wepy.page {
    config = {
      navigationBarTitleText: '考核'
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
      go(item){
        wx.navigateTo({
          url:`checkDetail?id=${item.id}`
        });
      }
    }
    async getList() {
      let that = this;
      if (!that.lastPage) {
        let res = await http.post('/quetions/quetionsListByUser', {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        });
        if(res.code==200000){
          that.pageNumber += 1;
          if (res.data.last) {
            that.lastPage = true;
          }
          that.list = that.list.concat(res.data.content);
          that.loading = false;
          this.$apply();
        }
      }
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
