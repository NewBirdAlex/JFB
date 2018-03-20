
<template>
  <view class="grayBg " >
    <view class="nav fs30" >
      <text wx:for="{{idList}}" wx:key="" @tap="selId({{index}})" :class="{'active':item.sel}">{{item.name}}</text>
    </view>

    <!--list-->
    <view class="ml">
      <block wx:for="{{list}}" wx:key="">
        <view class="marginBottom bgWhite">
          <view class="paddingAll borderBottom">
            <view @tap="goApply({{item}})" >
              <view class="fs30">{{item.missionTitle}} <span class="fr blue">+{{item.missionAddScore}}分</span></view>
              <view class=" fs28">{{item.missionContext}}</view>
              <view class=" gray lh40 fs28" wx:if="{{active==3}}">{{item.missionEndTime}} 前完成</view>
            </view>

            <view class=" fs26 gray">
              <text wx:if="{{active!=1}}">剩余： {{item.remainCount||'0'}}</text>
              <text wx:else>
                <text wx:if="{{item.isRepeat==1}}">每天一次</text>
                <text wx:if="{{item.isRepeat==2}}">每周一次</text>
                <text wx:if="{{item.isRepeat==3}}"> 每月一次</text>
                <text wx:if="{{item.isRepeat==4}}">每季一次</text>
                <text wx:if="{{item.isRepeat==5}}">每年一次</text>
                <text wx:if="{{item.isRepeat==6}}"> 无限制 </text>
                <text wx:if="{{item.isRepeat==7}}">仅限一次</text>
              </text>
              <text class="fr qd borderRadius" wx:if="{{active==2&&item.getStatus==0&&item.remainCount>0}}" @tap="getOrder({{item}})">抢单</text>
              <text class="fr qd borderRadius" wx:if="{{active==3&&item.getStatus==0&&item.remainCount>0}}" @tap="getOrder({{item}})">挑战</text>
            </view>
            <!--<i class="icon iconfont icon-icon" wx:if="item.isComplete"></i>-->
            <!--<span wx:if="item.getStatus==1">-->
            <text wx:if="{{active==2||active==3}}">
              <text wx:if="item.getStatus!=0">
                <i class="icon iconfont icon-iconcompleted blue" wx:if="{{item.isComplete==1}}"></i>
                <i class="icon iconfont icon-uncomplete gray" wx:else></i>
              </text>

            </text>
            <text wx:else>
              <text class="icon iconfont icon-iconcompleted blue" wx:if="{{item.isComplete&&!item.rpxainCount}}"></text>
              <text class="icon iconfont icon-uncomplete gray" wx:if="{{!item.isComplete&&item.rpxainCount}}"></text>
            </text>

          </view>
          <view class="paddingAll gray overflow fs30" wx:if="{{item.list.length}}" @tap="go(item)">
            他们已抢单：
            <text class="icon iconfont icon-right fr"></text>
            <view class="fr countPeople">
              <block wx:for="{{item.list}}" wx:key="" wx:for-index="idx" wx:for-item="itemName">
                <image src="{{itemName.userAvatar}}" class="littleHead"></image>
              </block>
            </view>
          </view>
        </view>

      </block>

    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class missionList extends wepy.page {
    config = {
      navigationBarTitleText: '悬赏任务'
    }
    components = {
    }

    data = {
      active: 1,
      type:1,
      idList: [
        {
          id: 1,
          name: '日常任务',
          sel: true
        },
        {
          id: 2,
          name: '抢单任务',
          sel: false
        },
        {
          id: 3,
          name: '挑战任务',
          sel: false
        }
      ],
      list:[],
      num:3,
      pageNumber:1,
      pageSize:10,
      lastPage:false,
      loading:false
    }
    mixins = [input]
    computed = {

    }

    methods = {
      async getOrder(item){
        let that = this;
        let res =await http.post('/missionRecord/getMission',{
          missionId:item.missionId
        });
        if(res.code==200000){
          tips.alert('抢单成功');
          that.reset();
        }else{
          tips.alert(res.message);
        }
      },
      goApply(item){
        console.log(item);
        if(this.active!=1&&item.getStatus==0){
          tips.alert('请先领取任务');
        }else{
          wx.navigateTo({
            url: '/pages/apply/apply?id='+item.missionId+'&type='+item.type+'&mission=true'
          });
        }
      },
      selId(index) {
        this.idList.forEach(function (a) {
          a.sel = false;
        })
        this.idList[index].sel = true;
        this.active = this.idList[index].id;

        //change type
        this.reset();
      }
    }
    onReachBottom(){
      this.getList();
    }
    reset(){
      this.pageNumber=1;
      this.lastPage=false;
      this.list=[];

      this.getList();
      this.$apply();
    }
    async getList(){
      let that = this;
      let url = '';
      this.type==2?url='/mission/userGetList':url='/missionRecord/userGetMissionList';
      if(!that.lastPage){
        let res = await http.post(url,{
          missionType:this.active,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        });
        if(res.data){
          that.pageNumber+=1;
          if(res.data.isLastPage){
            that.lastPage=true;
          }
          if(res.data.List){that.list=that.list.concat(res.data.list)}
          if(res.data.content){that.list=that.list.concat(res.data.content)}
          that.loading = false;
          this.$apply();
        }
      }else{
        that.loading = false;

        tips.alert( '没有更多数据了');
      }

    }
    props = {

    };
    events = {

    }

    onLoad(query) {
      if(query.type) this.type = query.type;
      this.getList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .ml {
    line-height: 50rpx;

    margin-bottom: 20rpx;
    >view{
      position: relative;
    }
    .icon-icon,.icon-iconcompleted,.icon-uncomplete{
      position: absolute;
      right: 130rpx;
      top:10rpx;
      font-size: 120rpx;
    }
    .littleHead {
      margin-right: 20rpx;
      margin-bottom: 10rpx;
    }

  }
  .qd{
    padding: 10rpx 40rpx;
    color: white;
    .fs30;
    background: @blue;
    margin-top: -20rpx;
  }

  .nav {
    .borderBottom;
    .overflow;
    text {
      .fl;
      width: 33%;
      .tac;
      padding: 30rpx 0;
      &.active {
        color: #338ecc;
        border-bottom: 4rpx solid @blue;
      }

    }
  }
</style>
