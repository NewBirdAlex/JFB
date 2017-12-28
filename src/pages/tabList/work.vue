
<template>
  <view class=" " >
    <!--swiper-->
    <mySwiper swipeType='2'></mySwiper>
    <!--审批-->
    <view class="normalTille grayBg">审批日记</view>
    <view class="overflow">
      <block wx:for="{{aboutMe}}" wx:key="">
        <navigator url="{{item.router}}">
          <view class="stationItem">
            <text class="vline"></text>
            <!--红点-->
            <!--<span class="redpoint" v-if="index%3==0"></span>    -->
            <view style="padding: 25rpx 0"> <text class="num">{{item.num}}</text></view>
            <view>{{item.name}}</view>
          </view>
        </navigator>

      </block>
    </view>
    <!--管理-->
    <view class="normalTille grayBg">管理应用（仅管理员可见）</view>
    <view class="overflow">
      <block wx:for="{{adminStation}}" wx:key="">
        <view class="vpadding stationItem" wx:if="{{item.show}}">
          <text class="vline"></text>
          <!--<view > <text class="icon iconfont {{item.icon}}" style="color:{{item.color}}"></text></view>-->
          <image class="iconImage" src="{{item.moduleCover}}" alt=""></image>
          <view>{{item.name}}</view>
        </view>
      </block>
    </view>
    <!--我得应用-->
    <view class="normalTille grayBg">日常积分</view>
    <view class="overflow">
      <block wx:for="{{myStation}}" wx:key="">
        <view class="vpadding stationItem borderBottom" wx:if="{{item.show}}">
          <text class="vline"></text>
          <!--<view > <text class="icon iconfont {{item.icon}}" style="color:{{item.color}}"></text></view>-->
          <image class="iconImage" src="{{item.moduleCover}}" alt=""></image>
          <view>{{item.name}}</view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import mySwiper from '../../components/mySwiper'
  export default class Work extends wepy.page {
    config = {
      navigationBarTitleText: '工作台'
    }
    components = {
      mySwiper
    }

    data = {
      aboutMe:[
        {
          name:"审批日志",
          num:"0",
          router:'../approve/approveRecord'
        },{
          name:"待我审批",
          num:"0 ",
          router:'../approve/approveList?type=1'
        },{
          name:"我发起的",
          num:" 0",
          router:'../approve/approveList?type=2'
        },{
          name:"抄送我的",
          num:"0 ",
          router:'../approve/approveList?type=3'
        }
      ],
      adminStation:[
        {
          name:"发布任务",
          icon:'icon-faburenwu',
          color:'#fa6e77',
          router:'/publicMission'
        },
        {
          name:"领导表扬",
          icon:'icon-zhicheng',
          color:'#fec170',
          router:'/praise/1'
        },
        {
          name:"管理奖扣",
          icon:'icon-guanli',
          color:'#50bee6',
          router:'/praise/2'
        },
        {
          name:"发布公告",
          icon:'icon-gonggao',
          color:'#fd8f64',
          router:'/announcement'
        }
      ],
      myStation:[
        {
          name:"考勤",
          icon:'icon-dingweikaoqin',
          color:'#3da5d0',
          moduleCover:'http://image.vshi5.com/img_jfb/2017/10/13/e4550a4ba9814c519601e2b3c525fb90.png',
          router:'/checkingin',
          show:false
        },
        {
          name:"工作日志",
          icon:'icon-rizhi',
          color:'#84d76f',
          router:'/workDiary',
          show:false
        },
        {
          name:"悬赏任务",
          icon:'icon-renwuxuanshang',
          color:'#feaa3b',
          router:'/missionList/1',
          show:false
        },
        {
          name:"申报积分",
          icon:'icon-daiban',
          color:'#fe6973',
          router:'jfSelect',
          show:false
        },
        {
          name:"公告",
          icon:'icon-gonggao1',
          color:'#feaa3b',
          router:'/announcementList',
          show:false
        },
        {
          name:"爱心点赞",
          //icon:'icon-hongxin',
          icon:'icon-zuanaixinkong',
          color:'#fb3333',
          router:'love',
          show:false
        },
        {
          name:"积分申诉",
          icon:'icon-shensuzhongxin',
          color:'black',
          router:'/shensuList',
          show:false
        },
        {
          name:"自由奖扣",
          icon:'icon-moneychange',
          color:'#5bb3d3',
          router:'/freePrize',
          show:false
        },
        {
          name:"经营哲学",
          icon:'icon-kaohe',
          color:'#8ddfb9',
          router:'/philosophy',
          show:false
        },
        {
          name:"水平考核",
          icon:'icon-kaohe',
          color:'#78c7e3',
          router:'/kpi',
          show:false
        },
        {
          name:"积分商城",
          icon:'icon-lianmengkeyongjifen',
          color:'#fa6e77',
          router:'/shop',
          show:false
        },
        {
          name:"积分抽奖",
          icon:'icon-choujiang',
          color:'#feaa3b',
          router:'/lottery',
          show:false
        },
      ]
    }
    mixins = []
    computed = {

    }

    methods = {

    }
    props = {

    }

    async getNumber(){
      let res =await http.post('/approveLogs/getCount');
      if(res.data){
        this.aboutMe[0].num= res.data[0].approveLog;
        this.aboutMe[1].num= res.data[0].waitApprove;
        this.aboutMe[2].num= res.data[0].sendApprove;
        this.aboutMe[3].num= res.data[0].copy;
        this.$apply();
      }
    }
    async getWorkStation(){
      let res = await http.post('/module/listModuleByUser');
      if(res.data){

        wepy.$instance.globalData.adminStation.forEach(item=>{
          for(let i = 0 ; i<res.data.length;i++){
            if(res.data[i].moduleTitle==item.name){
              item.show=res.data[i].status==1?true:false;
              item.moduleCover=res.data[i].moduleCover;
              break;
            }
          }
        })
        wepy.$instance.globalData.myStation.forEach(item=>{
          for(let i = 0 ; i<res.data.length;i++){
            if(res.data[i].moduleTitle==item.name){
              item.show=res.data[i].status==1?true:false;
              item.moduleCover=res.data[i].moduleCover;
              break;
            }
          }
        })

        this.adminStation = wepy.$instance.globalData.adminStation;
        this.myStation = wepy.$instance.globalData.myStation;
      }
    }
    events = {

    }

    onLoad() {

      if(wepy.$instance.globalData.firstEnter){
        // work station init
        wepy.$instance.globalData.firstEnter=false;
        this.getWorkStation();
      }
      this.$apply();
      console.log(this.adminStation)
      console.log(this.myStation)
      this.getNumber();

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .stationItem{
    float: left;
    width: 25%;
    padding-bottom: 30rpx;
    .tac;
    font-size: @fs28;
    position: relative;
    overflow: hidden;
    /*width: 1.875rpx;*/
    /*min-height: 1.875rpx;*/
    .vline{
      position: absolute;
      right: 0;
      top:0;
      height: 100%;
      border-right: @border;
    }
    .iconImage{
      width: 60rpx;
      height: 60rpx;
      margin-top: 30rpx;
      .marginBottom;
    }
    .hline{
      position: absolute;
      left:0;
      bottom: 0;
      height: 0;
      width: 100%;
      border-bottom: @border;
    }
    .num{
      font-size: @fs36;
    }

    .icon{
      font-size: 60rpx;
    }
    .redpoint{
      position: absolute;
      width: 20rpx;
      height: 20rpx;
      background: red;
      border-radius: 50%;
      right: 40rpx;
      top:30rpx;
    }
    .new{
      position: absolute;
      width: 100%;
      line-height: 40rpx;
      .tac;
      background: #f75555;
      color:white;
      left:0;
      top:0;
      transform: rotate(45deg) translate(0.5rpx,-0.5rpx);
    }
  }
</style>
