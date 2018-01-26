
<template>
  <view>
    <view class="paddingAll bgWhite lh40">
      <view class="fs30">{{detail.title}}</view>
      <view class="fs24 gray marginTop">{{detail.companyName}} 布于 {{detail.createDate}}</p>
        <view class="gray">
          <text wx:if="{{detail.isOnly==1}}">每天可阅读一次</text>
          <text wx:if="{{detail.isOnly==2}}">每周可阅读一次</text>
          <text wx:if="{{detail.isOnly==3}}">每月可阅读一次</text>
          <text wx:if="{{detail.isOnly==4}}">每季可阅读一次</text>
          <text wx:if="{{detail.isOnly==5}}">每年可阅读一次</text>
          <text wx:if="{{detail.isOnly==6}}">无限制阅读次数</text>
          <text wx:if="{{detail.isOnly==7}}">仅限一次</text>
          <text class="icon iconfont icon-yanjing"></text>{{detail.sums}}
          <text class="fr blue" wx:if="{{!detail.isRead}}">未阅读</text>
          <text class="fr" wx:if="{{detail.isRead}}">已阅读</text>
        </view>
      </view>

      <view v-html="detail.context" class="paddingAll bgWhite marginTop lh40"></view>

      <view class=" bgWhite marginTop" wx:if="{{recordUser.length}}">
        <view class=" paddingAll borderBottom fs30">他们都阅读了</view>
        <view class=" paddingAll overflow">
          <block wx:for="{{recordUser}}" wx:key="">
            <view class="people tac fl marginRight marginTop marginLeft">
              <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture" alt=""></image>
              <view class="fs24 lh40">{{item.userName}}</view>
            </view>
          </block>
        </view>
      </view>

      <view class="btn fs30 " :class="{'forbiden':forbiden||detail.isRead==1}" @tap="read">
        已阅读并遵守（+{{detail.score}}分）
      </view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class philosophyDetail extends wepy.page {
    config = {
      navigationBarTitleText: ''
    }
    components = {
    }

    data = {
      detail:{},
      forbiden:false,
      id:'',
      recordUser:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      async read(){
        if(this.detail.isRead==1)return;
        let that = this;
        let res = await http.post('/culture/userReadCulture', {
          id:this.id
        });
        if(res.code==200000){
          that.forbiden=true;
          tips.alert('感谢您的阅读，继续努力。。。');
          this.$apply();
        }
      }
    }
    async getDetail() {
      let that = this;
      let res = await http.post('/culture/cultureDetailById', {
        id:this.id
      });
        if(res.code==200000){
          that.detail= res.data.detail;
          that.recordUser= res.data.recordUser;
          this.$apply();
        }
    }
    props = {

    };
    events = {

    }

    onLoad(query) {
      this.id = query.id;
      this.getDetail();

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .btn{
    height: 88rpx;
    line-height:88rpx;
    .marginAll;
    background-color: @blue;
    border-radius: 8px 8px 8px 8px;
    color:white;
    .tac;
    margin-top: 100rpx;
  }
  .forbiden{
    background: #ccc;
    color: @gray;
  }
</style>
