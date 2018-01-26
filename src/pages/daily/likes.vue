<style lang="less">
  @import "../../assets/css/common";
  .specilIcon{
    position: fixed;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    font-size: 400rpx;
    /*animation-duration: 1s;*/
    transition: all 1s;
    /*animation: kiss 0s linear 1s infinite ;*/
  }
  .activeIcon{
    /*transform: translate(-50%,-50%) scale(3)!important;*/
    animation: kiss 1s linear 500ms 1 ;
  }
  @keyframes kiss {
    0%{ transform: translate(-50%,-50%) scale(1);}
    100%{transform: translate(-50%,-50%) scale(6);opacity: 0;}
  }
  .yellow{color:#f5b739;}
  .red{color:#f55839;}
  i{vertical-align: middle}
  .loveList{
    line-height: 50rpx;
    padding: 30rpx 0 0 0 ;
    &:last-child{
      .right{
        border: none;
      }
    }
    .icon{font-size: 50rpx}
    .left{
      width: 10%;
      .tac;
      font-size: 50rpx;
      padding-top: 20rpx;
    }
    .right{
      width: 90%;
      .borderBottom;
      padding-bottom: 20rpx;
    }
  }
</style>

<template>
  <view class="fs30 " >
    <!--爱心排行榜-->
    <view class="paddingAll borderBottom">
      <text>您本月可用的爱心分：{{canUseScore}}分</text>
      <text class="fr">
                <text class="marginRight"><text class="icon iconfont icon-sun3 yellow fs36"></text> {{sunScore}}分</text>
                <text><text class="icon iconfont icon-hongxin red fs36"></text> {{loveScore}}分</text>
            </text>
    </view>
    <!--list-->
    <view class="">
      <block wx:for="{{list}}" wx:key="">
        <view class="overflow  fs36 loveList ">
          <view class="fl left  ">{{index+1}}</view>
          <view class="fl right">
            <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture fl marginRight" alt=""></image>
            <view class="fl">
              <view><text>{{item.userName}}</text></view>
              <view class="gray fs30">本月 {{item.allLove||0}}分</view>
            </view>
            <view class="fr  tac marginRight marginLeft">
              <view>{{item.workLove||0}}</view>
              <view><text class="icon iconfont icon-hongxin gray" :class="{'red':item.workLove!=0}" @tap="kissU({{item}},{{index}},1)"></text></view>
            </view>
            <view class="fr marginRight tac">
              <view>{{item.adminLove||0}}</view>
              <view><text class="icon iconfont icon-sun3 gray " :class="{'yellow':item.adminLove!=0}" @tap="kissU({{item}},{{index}},2)"></text></view>
            </view>
          </view>
        </view>
      </block>
    </view>

    <text class="icon iconfont icon-kiss red specilIcon" :class="{'activeIcon':clickHeart}" wx:if="{{clickHeart}}"></text>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class likes extends wepy.page {
    config = {
      navigationBarTitleText: ''
    }
    components = {
    }

    data = {
      userData:{},
      showOption:false,
      clickHeart:false,
      loading:false,
      lastPage:false,
      pageNumber:1,
      pageSize:20,
      canUseScore:0,
      loveScore:0,
      sunScore:0,
      selUserName:'',
      scoreProps:{},
      list:[],
      departmentId:'',
      jobId:'',
      type:'',
      startTime:'',
      endTime:'',
      needReset:false
    }
    mixins = [input]
    computed = {

    }
    onReachBottom(){
      if(!this.lastPage) this.getList();
    }
    methods = {
      async kissU(item,index,type){
        let that = this;
        if(this.canUseScore<=0){
          tips.alert('您的分数不足')
          return;
        }
        let res = await http.post('/love/loveGood', {
          getUserId: item.id,
          type: type
        });
        if(res.code==200000){
          // awesome type
          if(type==1){
            that.list[index].workLove+=that.loveScore;
            that.canUseScore-=that.loveScore;
          }else{
            that.list[index].adminLove+=that.sunScore;
            that.canUseScore-=that.sunScore;
          }
          that.getBaseInf();
          //animation going
          that.clickHeart=true;
          let timer = null;
          clearTimeout(timer);
          setTimeout(()=>{that.clickHeart=false;that.$apply();},1000);
          this.$apply();
        }else{
          tips.alert(res.message)
        }
      }

    }
    async getBaseInf(){
      let that = this;
      let res =await http.post('/user/canUseLoveScore');
      if(res.code==200000){
        that.canUseScore =res.data.canUseScore;
        that.loveScore = res.data.loveScore;
        that.sunScore = res.data.sunScore;
        this.$apply();
      }
    }
    async getList(){
      let that = this;
      let res =await http.post('/user/loveOrder', {
        departmentId: this.departmentId,
        jobId:this.jobId,
        endTime:this.endTime,
        type:this.type,
        startTime:this.startTime,
        userName:this.selUserName,
        pageNumber: this.pageNumber,
        pageSize:this.pageSize
      });
      if(res.code==200000){
        if(that.needReset){
          that.reset();
          that.needReset = false;
        }
        that.list = that.list.concat(res.data.content);
        if(res.data.last) that.lastPage = true;
        that.loading = false;
        that.pageNumber+=1;
        this.$apply();

      }
    }
    props = {

    }
    events = {

    }

    onLoad(){

      this.useInf = wepy.$instance.globalData.userData;
      this.getList();
      this.getBaseInf();
    }
  }
</script>

