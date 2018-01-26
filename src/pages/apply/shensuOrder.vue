<style lang="less">
  @import "../../assets/css/common";
  .wrap2{
    position: relative;
    padding:0 20rpx;
    .inner{
      position: relative;
      background: white;
      z-index: 10;
      height: 90rpx;
      line-height: 90rpx;
      border-bottom: @border;
      padding:20rpx 0;
      font-size: @fs30;
      .op{
        display: inline-block;
        vertical-align: middle;
        width: 70rpx;
        font-size: @fs26;
      }
      img{
        width: 90rpx;
        height: 90rpx;
        display: inline-block;
        vertical-align: middle;
        margin-right: 20rpx;
      }

    }
    select{
      position: absolute;
      left: 50rpx;
      top: 20rpx;
      width: 1px;
      height: 1px;
    }
  }
  .icon-xialakuangtishitubiao{
    font-size: 12px;
    color: @gray;
    margin-left: 20rpx;
    margin-right: 2rpx;
  }
  .progress{
    background: #efeff4;
    .paddingAll;
    .prog_list{
      overflow: hidden;
      padding-bottom: 20rpx;
      .time{
        width: 58rpx;
        float: left;
        height: 20rpx;
        i{
          margin-top: 60rpx;
          display: inline-block;
        }
      }
      .content{
        float: left;
        width: 610rpx;
        .left{
          display: inline-block;
          image{
            width: 90rpx;
            width: 90rpx;
            border-radius: 50%;
          }
        }
        .right{
          display: inline-block;
          width: 500rpx;
          vertical-align: top;
          text-indent: 20rpx;
          line-height: 40rpx;
          font-size: @fs30;
          position: relative;
          .triangle-left{
            position: absolute;
            left:-130rpx;
            top:40rpx;
          }
          >view{
            padding-top: 5rpx;
            &:nth-child(2){
              font-size: @fs28;
              span{font-size: @fs24;}
            }
          }
        }
        .recommend{
          margin-top: 20rpx;
          p{
            font-size: @fs30;
            line-height: 40rpx;
            padding-top: 10rpx;
          }
          .rec_img{
            overflow: hidden;
            img{
              width: 80rpx;
              height: 80rpx;
              margin:10rpx 10rpx;
            }
          }
        }
      }
    }
  }
  .ps{
    width: 110rpx;
  }
  .firstItem{
    position: relative;
    overflow: hidden;
    label{
      position: absolute;
      right: 20rpx;
      top:40rpx;
    }
    select{
      position: absolute;
      top:-10000rpx;
      width: 0;
      height: 0;
    }
  }
  .inner{
    .strong{
      width: 200rpx;
      display: inline-block;
      vertical-align: middle;
    }
    .rightPart{
      display: inline-block;
      width: 500rpx;
      padding-top: 5rpx;
      vertical-align: top;
    }
  }

  .add{
    .border;
    border-radius: 50%;
    padding: 20rpx;
    .iconfont{
      font-size: 50rpx;
    }
  }
  .fs36{font-size: 36rpx!important;}
  h3 {
    .tac;
    padding: 26rpx;
    font-size: 34rpx;
    color: #323232;
    background: #fafafa;
  }
  .cl{
    .fr;
    width: 4.rpx;
    height: 40rpx;
    .tac;
    line-height: 40rpx;
    border-radius: 50%;
  }
  textarea{
    width: 500rpx!important;
  }
</style>
<template>
  <view class="grayBg " >
    <view class="wrap">
      <view class="bgWhite">
        <view class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom firstItem chooseList" >
          <view class="strong fs30 lh40">审批标题 <text class="red">*</text></view>
          <text class="rightPart fs30 lh40 ">{{detail.approveTitle}}</text>
        </view>
        <view class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
          <strong class="strong fs30 lh40">审批内容 <text class="red">*</text></strong>
          <text class="rightPart fs30 lh40 ">{{detail.approveContext}}</text>
        </view>
        <!--<jifenType v-model="jfType"></jifenType>-->
        <view class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
          <view class="strong fs30 lh40">积分类型 <text class="red">*</text></view>
          <text class="rightPart fs30 lh40 " wx:if="{{detail.type==1}}">A </text>
          <text class="rightPart fs30 lh40 " wx:if="{{detail.type==2}}">B </text>
          <text class="rightPart fs30 lh40 " wx:if="{{detail.type==3}}">C </text>
          <text class="rightPart fs30 lh40 " wx:if="{{detail.type==4}}">基础积分</text>
        </view>
        <view class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
          <view class="strong fs30 lh40">审批备注 <text class="red">*</text></view>
          <text class="rightPart fs30 lh40 ">{{detail.approveRemark||'无'}}</text>
        </view>
        <myInput conttitle="申诉理由"
                 note="输入申诉理由"
                 :value="shensuReason"
                 inpType="textarea"
        ></myInput>

      </view>

    </view>
    <!--upload-->
    <uploadImage :imgUrl="imgList"></uploadImage>
    <!--people list -->
    <view class="paddingAll borderBottom fs30 bgWhite marginTop"> <text class="gray">(如果对审批项目积分有异议，请修改提交二次审批)</text></view>
    <showStaff :showDel="showDel" :scoreRange.sync="scoreRange" :staffList.sync="peopleList"></showStaff>

    <!--approve user-->
    <view  class="paddingAll borderBottom fs30 bgWhite marginTop">审批人</view>
    <view class="progress ">
      <block wx:for="{{detail.approveUserList}}" wx:key="">
        <view class="prog_list">
          <view class="time marginTop">
            <text class="icon iconfont icon-gou blue" wx:if="{{item.checkStatus==0||item.checkStatus==2}}"></text>
            <text class="icon iconfont icon-wait gray" wx:if="{{item.checkStatus==1}}"></text>
            <text class="icon iconfont icon-reject red" wx:if="{{item.checkStatus==3}}"></text>
          </view>
          <view class="content bgWhite paddingAll">
            <view class="left"><image src="{{item.userAvatar}}" class="headPicture" alt=""></image></view>
            <view class="right">
              <view class="overflow">
                {{item.userName}}
                <text class="green fr" wx:if="{{type==1}}">审批通过</text>
                <text class="red fr" wx:if="{{type==2}}">审批不通过</text>

              </view>
              <view class="overflow">
                <text class="gray">{{item.departmentName}}</text>
                <text class="gray fr">{{item.approveDate}}</text>
              </view>
              <view class="triangle-left"></view>
            </view>
            <view class="recommend fs30 lh40">
              <view class="borderTop paddingTop" wx:if="{{item.context}}">
                {{item.context}}
              </view>
              <view class="rec_img" wx:if="{{item.pics}}">
                <block wx:for="{{}}" wx:key=""></block>
                <!--<img :src="item" alt="" v-for="item in item.pics.split(',')">-->
              </view>
            </view>
          </view>
        </view>

      </block>
    </view>
    <!--copy-->
    <copyStaff :copyStaff.sync="chaosongList"></copyStaff>
    <!--confirm-->
    <view class="confBtn" @tap="subData">确定</view>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import commonHttp from '../../mixins/commonHttp';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import myInput from '../../components/myInput'
  import copyStaff from '../../components/copyStaff'
  import uploadImage from '../../components/uploadImage'
  import showStaff from '../../components/showStaff'

  export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '申诉'
    }
    components = {
      myInput,
      uploadImage,
      showStaff,
      copyStaff
    }

    data = {
      showDel:false,
      id:'',
      type:'',
      rootId:'',
      aimId:'',
      detail:{},
      imgList:'',
      peopleList:[],
      userMessage:{},
      shensuReason:'',
      spImg:[],
      chaosongList:[]
    }
    mixins = [input,commonHttp]
    computed = {

    }

    methods = {
      async subData(){
        if(!this.shensuReason){
          tips.alert('请输入申诉理由');
          return
        }
        let score = [];
        let that = this;
        this.peopleList.forEach(item=>{
          score.push(item.selectAddScore)
        });
        let approveUserId = [];
        if(this.detail.approveUserList.length){
          this.detail.approveUserList.forEach(item=>{
            approveUserId.push(item.userId);
          })
        }
        let beApproveUserId = [];
        this.peopleList.forEach(item=>{
          beApproveUserId.push(item.id);
        });
        let copyUserId = [];
        if(this.chaosongList.length) {
            this.chaosongList.forEach(item=> copyUserId.push(item.id));
        }
        let res = await http.post('/missionApprove/submitMissionApprove', {
          addScore: score.join(','),
          aimId: this.detail.aimId,
          approveContext: this.detail.approveContext,
          approveRemark: this.detail.approveRemark,
          approveTitle: this.detail.approveTitle,
          approveUserId: approveUserId.join(','),
          beApproveUserId: beApproveUserId.join(','),
          copyUserId: copyUserId.join(','),
          missionPics: this.imgList,
          rootId:this.detail.rootId,
          type:this.detail.type,
          submitType:1
        });
        if(res.code==200000){
          tips.alert('提交成功');
          setTimeout(_=>{
            wx.navigateBack()
          },1000)
        }else{
          tips.alert(res.message);
        }
      }
    }
    getSelfInf(){
      //获取自己分数
      this.userMessage = wepy.$instance.globalData.userData;
      let selfInf = {
        id:this.userMessage.userId,
        userName:this.userMessage.userName,
        userAvatar:this.userMessage.userAvatar,
        selectAddScore:this.detail.missionScore
      }
      this.peopleList.push(selfInf);
    }
    async getDetail(){
      let that = this;
      let res = await http.post('/missionApprove/approveDetail', {
        id:this.id
      });
      if(res.code==200000){
        that.detail = res.data;
        that.imgList = that.detail.imgList;
        that.getSelfInf();//get self score
        this.$apply();
      }
    }
    props = {

    };
    events = {

    }
    onShow(){
      //抄送
      if(wx.getStorageSync('copyStaffList')){
        let staff = wx.getStorageSync('copyStaffList');
        console.log(wx.getStorageSync('copyStaffList'))
        staff.forEach(item=>{
          this.chaosongList.push(item);
        });
        wx.removeStorageSync('copyStaffList');
      }
    }
    onLoad(query) {
      this.id=query.id;
      this.type=query.type;
      this.rootId=query.rootId;
      this.aimId=query.aimId;
      this.getScoreRange();
      this.getDetail();
    }
  }
</script>


