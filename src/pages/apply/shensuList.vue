<style lang="less">
  @import "../../assets/css/common";
  .wrap2{
    padding:20rpx 0;
    .borderBottom;
    background: white;
    overflow: hidden;
    .head{
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      margin:20rpx;
      float:left;
    }
    .right{
      float:left;
      display: inline-block;
      width: 600rpx;
      font-size: @fs26;
      line-height: 35rpx;
      padding-right: 20rpx;
      padding-top: 20rpx;
      >view{
        &:nth-child(1){
          font-size: @fs30;
        }
        &:nth-child(2){
          margin-bottom: 10rpx;
        }
        &:nth-child(4){
          margin-bottom: 10rpx;
        }
      }
    }
  }
  .search{
    text-align: left;

    .st{
      .paddingAll;
      overflow: hidden;
      line-height: 0.6rpx;
      .bgWhite{
        float: left;
        width: 600rpx;
        font-size: @fs26;
        border-radius: 8px 8px 8px 8px;
        line-height: 60rpx;
        height: 60rpx;
        .iconfont{
          font-size: @fs36;
          margin: 0 20rpx;
        }
        input{
          border: none;
          outline: none;
          width: 500rpx;
        }
      }
    }
    .sh{
      line-height: 40rpx;
      .overflow{
        span{
          .grayBg;
          border-radius: 6px 6px 6px 6px;
          padding:10rpx 20rpx;
          float: left;
          margin: 10rpx;
        }
      }
    }
    .sn{
      .snt{
        .borderBottom;
        position: relative;
        .tac;
        line-height: 0;
        margin: 100rpx 20rpx;

        >text{
          position: relative;
          background: white;
          z-index: 2;
          padding: 0 30rpx;
        }
      }
      .snc{
        .tac;
        span{
          display: inline-block;
          line-height: 70rpx;
          margin:0 20rpx;
          .gray;
          .iconfont{
            font-size: 60rpx;
            display: block;
          }
        }
      }
    }
  }

  .spTop {
    background: @grayBg;
    .tac;
    font-size: @fs30;
    height: 90rpx;
    line-height: 90rpx;
    .borderBottom;
    text {
      display: inline-block;
      width: 35%;
      margin: 0 5%;
    }
    .active{
      border-bottom:2px solid @blue;
      color:@blue;
    }
  }
  .sel{
    height: 90rpx;
    line-height: 90rpx;
    background: @grayBg;
    .tac;
    .borderBottom;
    position: relative;
    .filter{
      position: absolute;
      top:0;
      left:0;
      width: 100%;
      z-index: 100;
      .fs30;
      background: white;
      .sel_type{
        .paddingAll;
        text-align: left;
        >text{
          width: 300rpx;
          height: 80rpx;
          .tac;
          display: inline-block;
          line-height: 0.8rpx;
          background-color: rgba(240, 240, 240, 1);
          border-radius: 6px 6px 6px 6px;
          margin-bottom: 20rpx;
          &:nth-child(odd){
            float:right;
          }
          &:nth-child(even){
            float:left;
          }
        }
        .active{
          background: @blue;
          color: white;
        }
        .confBtn{
          position: absolute;
          bottom: 0;
          left:0;
          width: 100%;
          margin:0;
        }
      }
    }
    .filterType{
      float: left;
      width:50%;
      display: inline-block;
      color: @gray;
    }
  }
</style>
<template>
  <view class=" " >
    <view class="spTop" ref="myFilter">
      <text :class="{active:spType==1}" @tap="changeStatu(1)">审批通过</text>
      <text :class="{active:spType==2}" @tap="changeStatu(2)">审批拒绝</text>
    </view>

    <!--list-->
    <view>
      <block wx:for="{{orderList}}" wx:key="">
        <view class="wrap2" @tap="go({{item}})">
          <image class="head" src="{{item.userAvatar}}" alt=""></image>
          <view class="right">
            <view class="lh50">
              {{item.approveTitle}}
              <text class="blue fr" wx:if="{{item.addScore>0}}">+{{item.addScore}}分</text>
              <text class="blue fr" wx:else>{{item.addScore}}分</text>
            </view>
            <view class="lh50">
              <text class="green" wx:if="{{spType==1}}">审批通过</text>
              <text class="red" wx:if="{{spType==2}}">审批拒绝</text>
              <text class="fr gray">{{item.createDate}}</text>
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
  export default class shensuList extends wepy.page {
    config = {
      navigationBarTitleText: ''
    }
    components = {
    }

    data = {
      spType:1,
      filterHeight:0,
      showWrap:true,
      showSearch:false,
      pageNumber:1,
      pageSize:10,
      lastPage:false,
      loading:false,
      orderList:[],
      history:[],
      searchContext:'',
      rootId:'',
      jfType:[
        {
          name:'日常任务',
          active:false,
          id:8
        },{
          name:'品德积分',
          active:false,
          id:11
        },{
          name:'行为积分',
          active:false,
          id:12
        },{
          name:'业绩积分',
          active:false,
          id:131
        },{
          name:'积分申诉',
          active:false,
          id:15
        },{
          name:'自由奖扣',
          active:false,
          id:16
        },{
          name:'抢单任务',
          active:false,
          id:34
        },{
          name:'挑战任务',
          active:false,
          id:34
        }

      ],
      searchHistory:[
        '品德积分',
        '人气奖',
        'FG123353525631521',
        '品德积分',
        '最佳人气',
        '人气奖',
      ]
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
          url: `shensuOrder?id=${item.id}&type=${this.spType}&rootId=${item.rootId}&aimId=${item.aimId}`
        })
      },
      changeStatu(msg){
        this.spType = msg;

        this.reset();
        this.$apply();
      },
    }
    reset(){
      this.pageNumber=1;
      this.lastPage=false;
      this.orderList=[];
      this.getList();
    }
    async getList(){
      //different type
      let url = '/missionApprove/getSelectList';
      let that = this;
      let res = await http.post(url, {
        checkedStatus: this.spType,//1:审批通过;2:已审批 reject,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        searchContext: "",
        searchContext:this.searchContext,
        rootId:this.rootId
      });
      if(res.code==200000){
        that.pageNumber+=1;
        if(res.data.length){
          that.orderList = [];
        }
        that.orderList =that.orderList.concat(res.data.content) ;
        //last page
        res.data.last? that.lastPage=true:'';
        that.loading = false;
        this.$apply();
      }
    }
    props = {

    }
    events = {

    }

    onLoad() {
      this.getList();
    }
  }
</script>


