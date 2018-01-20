
<template>
<view class="grayBg">
  <!--part one-->
  <view class="bgWhite">
    <view class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom firstItem chooseList">
      <text class="fs30 lh40 marginRight">审批标题 <text class="red">*</text></text>
      <text class="rightPart fs30 lh40 ">{{detail.title}}</text>
    </view>
    <view class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
      <text class="fs30 lh40 marginRight">审批内容 <text class="red">*</text></text>
      <text class="rightPart fs30 lh40 ">{{detail.context}}</text>
    </view>
    <view class="inner paddingBottom paddingTop marginLeft marginRight bgWhite borderBottom">
      <text class="fs30 marginRight">积分类型 <text class="red">*</text></text>
      <block wx:if="{{mission=='true'}}">
        <text class="rightPart fs30 lh40 " wx:if="{{detail.type==3}}">C</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.type==1}}">A</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.type==2}}">B</text>
      </block>
      <block wx:else>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.rootId==11}}">A</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.rootId==12}}">C</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.rootId==13}}">B</text>
      </block>

    </view>
  </view>
  <myInput conttitle="审批备注"
           note="输入备注"
           :value="beizhu"
           inpType="textarea"
  ></myInput>

  <!--people list -->
  <view class="paddingAll borderBottom fs30 bgWhite marginTop">申请人 <text class="gray">(选择可批量修改申请的积分)</text></view>
  <showStaff wx:if="{{mission!='true'}}" :scoreRange.sync="scoreRange" :staffList.sync="peopleList"></showStaff>

  <view wx:else class="paddingAll bgWhite fs30 lh50">
    <image class="headPicture marginRight"  src="{{userMessage.userAvatar}}" alt=""></image>
    <text>{{userMessage.userName}}</text>
    <text class="fr " style="margin-top: 0.2rem"> {{detail.score}}分</text>
  </view>
  <!--choose staff-->
  <view wx:if="{{mission!='true'}}" class="paddingAll bgWhite marginTop fs30" @tap="getStaff">
    选择员工
    <text class="iconfont icon-right fr"></text>
  </view>

  <!--upload-->
  <uploadImage :imgUrl="imgList"></uploadImage>
  <!--approve-->
  <approveStaff :approveStaff.sync="approveUserList"></approveStaff>
  <!--copy-->
  <copyStaff :copyStaff.sync="chaosongList"></copyStaff>
  <view class="confBtn" @tap="subData">确定</view>
</view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import Tips from '../../common/tips';
  import myInput from '../../components/myInput'
  import uploadImage from '../../components/uploadImage'
  import showStaff from '../../components/showStaff'
  import approveStaff from '../../components/approveStaff'
  import copyStaff from '../../components/copyStaff'
  import {myTool} from '../../common/myTool'
  export default class Apply extends wepy.page {
    config = {
      navigationBarTitleText: '申请积分'
    }
    components = {
      myInput,
      uploadImage,
      showStaff,
      copyStaff,
      approveStaff
    }

    data = {
      userMessage:wepy.$instance.globalData.userData,
      beizhu:"",
      type:'',
      chaosongren:'',
      shenpiren:'',
      newImgList:'http://120.25.177.192/imghouse/jfb/upload/image/2017/7/2/g0hb568H52zi3y5iO8uFRByCoX2i1DPh_$xxx$05_05.jpg',
      showStaff:false,
      dialogImageUrl: '',
      dialogVisible: false,
      selAll:false,
      id:'',
      detail:{},
      scoreRange:[],
      selfInf:{
      },
      inputData: [
        {
          title: "审批备注",
          need: true,
          ph: "请输入内容",
          content: "",
          type: 'textarea'
        }
      ],
      selectType:{
        name: '积分类型',
        need: true,
        selValue: '',
        selectRange: [
          '品德',
          '行为',
          '业绩'
        ]
      },
      peopleList:[],
      chaosongList:[],
      shenpiList:null,
      approveUserList:[],
      imgList:'',
      imgData:{},
      mission:false,
      src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
    }
    mixins = [input]
    computed = {

    }

    methods = {
      async subData(){
        let that = this;
        if(that.peopleList.length==0){
          Tips.alert('选择申请人');
          return
        }
        let score = [];
        if(this.mission=='true'){
          score.push(this.detail.score);
        }else{
          this.peopleList.forEach(item=>{
            score.push(item.selectAddScore)
          })
        }

        let approveUserId = [];
        if(this.approveUserList){
          this.approveUserList.forEach(item=>{
            approveUserId.push(item.id);
          })
        }
        //审批人
        if(approveUserId.length==0){
          Tips.alert('请选择审批人'); return
        }
        //被审批人
        let beApproveUserId = [];
        if(this.mission=='true'){
          beApproveUserId.push(this.userMessage.userId)
        }else{
          this.peopleList.forEach(item=>{
            beApproveUserId.push(item.id);
          })
        }

        let copyUserId = [];
        if(this.chaosongList.length) {
          this.chaosongList.forEach(item=>{
            copyUserId.push(item.id)
          })
        }
        //没有选择任何人的时候默认自己
        let type = '';
        if(this.mission!='true'){

          if(this.detail.rootId==11) type = 1;
          if(this.detail.rootId==12) type = 3;
          if(this.detail.rootId==13) type = 2;
        }else{
          type=this.type;
        }
        let res =await http.post('/missionApprove/submitMissionApprove', {
          addScore: score.join(','),
          aimId: this.id,
          approveContext: this.detail.context,
          approveRemark: this.inputData[0].content,
          approveTitle: this.detail.title,
          approveUserId: approveUserId.join(','),
          beApproveUserId: beApproveUserId.join(','),
          copyUserId: copyUserId.join(','),
          missionPics: this.imgList,
          rootId:this.detail.rootId,
          type:type,
          submitType:2
        })
        if(res.data){
          if(res.code=='200000'){
            Tips.alert('提交成功')
            setTimeout(_=>{
              wx.navigateBack({
                delta: 1
              })
            },1000)
          }
        }else{
          Tips.alert(res.message)
        }
      },
      getStaff(){
        wx.navigateTo({
          url: '/pages/staff/staff'//实际路径要写全
        });
      }
    }
    props = {

    };
    async getDetail(){
      let url = '';
      this.mission=='true'? url='/missionRecord/getMissionDetail': url = '/actionList/getActionDetail';
      let that = this;
      let res = await http.post(url, {
        id:this.id
      });
      if(res.data){
        this.detail = res.data.detail;

        if(res.data.approveUser.length){
          //是否有审批人
          that.approveUserList = res.data.approveUser;
        }else{
          //that.approveUserList=null;
        }
        //get score select range
        let minScore = this.detail.minuxScore;
        let maxScore = this.detail.maxScore;
        let level = this.detail.scoreLevel;
        this.scoreRange = myTool.getScoreRange(minScore,maxScore,level);
        //                        //默认添加自己
        that.selfInf={
          userAvatar:wepy.$instance.globalData.userData.userAvatar,
          userName:wepy.$instance.globalData.userData.userName,
          selectAddScore:that.scoreRange[0],
          id:wepy.$instance.globalData.userData.userId
        };
        that.peopleList.push(that.selfInf);
        this.$apply();
      }
    }
    events = {

    }
    onShow(){
      //是否从选择员工返回
      if(wx.getStorageSync('staff')){
        let staff = wx.getStorageSync('staff');
        staff.forEach(item=>{
          item.selectAddScore=this.scoreRange[0],
          this.peopleList.push(item);
        });
        wx.removeStorageSync('staff');
      }
      //审批
      if(wx.getStorageSync('approveStaffList')){
        let staff = wx.getStorageSync('approveStaffList');
        staff.forEach(item=>{
          this.approveUserList.push(item);
        });
        wx.removeStorageSync('approveStaffList');
      }
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
      this.mission=query.mission;
      this.type=query.type;
      this.$apply();
      this.getDetail();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .icon-xialakuangtishitubiao{
    font-size: 12px;
    color: @gray;
    margin-left: 0.2rpx;
    margin-right: 0.2rpx;
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
    strong{
      width: 160rpx;
      display: inline-block;
      vertical-align: middle;
    }
    .rightPart{
      display: inline-block;
      width: 520rpx;
      vertical-align: top;
    }
  }

  .add{
    .border;
    border-radius: 50%;
    padding: 20rpx;
    i{
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
    width: 40rpx;
    height: 40rpx;
    .tac;
    line-height: 40rpx;
    border-radius: 50%;
  }
</style>
