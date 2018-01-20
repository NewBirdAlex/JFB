
<template>
  <view class=" " >
    <view class="wrap">
      <!--<view wx:if="{{needRange}}">-->
        <!--<showStaffSelect :mySelf="selectSelf" :scoreRange.sync="scoreRange" :staffList.sync="mainPerson"></showStaffSelect>-->

      <!--</view>-->
      <!--<view wx:else>-->
        <!--<block wx:for="{{mainPerson}}"  wx:key="">-->
          <!--<view  class="paddingAll bgWhite">-->
            <!--<image src="{{item.userAvatar}}" class="headPicture marginRight" alt=""></image>-->
            <!--{{item.userName}}-->
            <!--<input type="text" class="fr myInput tar fs30 marginTop" placeholder="输入分数" @input="" />-->
          <!--</view>-->
        <!--</block>-->
      <!--</view>-->
      <!--&lt;!&ndash;others&ndash;&gt;-->
      <!--<view class="fs30 paddingAll bgWhite marginTop borderBottom" wx:if="{{peopleList.length}}">他们也申请了 <text class="gray">(勾选后可以一次性审批)</text></view>-->
      <!--<otherPeople :scoreRange.sync="scoreRange" :staffList.sync="peopleList"></otherPeople>-->
      <showStaffSelect :scoreRange.sync="scoreRange" :staffList.sync="peopleList"></showStaffSelect>

      <view class="fs30 paddingAll bgWhite marginTop borderBottom">审批备注</view>
      <textarea name="" id="noteContent" placeholder="输入审批备注信息" value="{{noteContent}}" @input="input"></textarea>
      <uploadImage :imgUrl="imgList"></uploadImage>
      <view class="confBtn" @tap="subData">{{keyword}}</view>


    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import {myTool} from '../../common/myTool'
  import uploadImage from '../../components/uploadImage'
  import showStaffSelect from '../../components/showStaffSelect'

  export default class spDetail extends wepy.page {
    config = {
      navigationBarTitleText: '审批'
    }
    components = {
      uploadImage,
      showStaffSelect,
      otherPeople:showStaffSelect
    }

    data = {
      selectSelf:false,
      type:'',
      keyword:'',
      noteContent:"",
      mainPerson:[],
      peopleList:[],
      orderDetail:{},
      scoreRange:null,
      imgList:'',
      pageNumber:1,
      pageSize:100,
      spOrder:{},
      needRange:true,
      lastPage:false,
    }
    mixins = [input]
    computed = {

    }

    methods = {
      async subData(){
        let that = this;
        let bol = true;
        let otherIds = [];
        let otherScores = [];
//        if(this.scoreRange){
//          otherIds[0]=this.mainPerson[0].id;
//          otherScores[0]=this.mainPerson[0].addScore;
//        }
        if(this.peopleList.length){
          this.peopleList.forEach(item=>{
            if(item.select){
              otherIds.push(item.id);
              otherScores.push(item.addScore)
            }
          });
        }

        console.log(otherIds.join(','))
        console.log(otherScores.join(','))
        let res = await http.post('/missionApprove/approveById', {
          approveRemark: this.input.noteContent,
          checkedStatus: this.type,
          //aimId:this.$route.params.id,
          otherIds: otherIds.join(','),
          otherScores: otherScores.join(','),
          pics: this.imgList
        });
        if(res.code==200000){
          tips.alert('操作成功');
          setTimeout(_=>{
            wx.navigateBack({
              delta: 2
            })
          },1000);
        }
      }
    }
    props = {

    };
    events = {

    }
    async getScoreRange(){
      let that = this;

      let res = await http.post('/actionList/getActionDetail', {
        id:this.spOrder.aimId
      })
      if(res.code==200000){
        // get score select range
        let minScore = res.data.detail.minuxScore;
        let maxScore = res.data.detail.maxScore;
        let level = res.data.detail.scoreLevel;
        that.scoreRange = myTool.getScoreRange(minScore,maxScore,level);
        this.$apply();
      }
    }
    async getList(){
      let that = this;
      let res = await http.post('/missionApprove/sameTypeList', {
        aimId:this.id,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      if(res.code==200000){
        res.data.content.forEach(item=>{
          item.select=false;
        });
        that.peopleList = that.peopleList.concat(res.data.content) ;

      }
    }
    async getDetail() {
      let that = this;
      let res =await http.post('/missionApprove/approveDetail', {
        id: this.id
      });
      if(res.code==200000){
        that.spOrder = res.data;
        //get self information
        let selfData = {
          userName:that.spOrder.userName,
          addScore:that.spOrder.missionScore,
          id:that.id,
          userAvatar:that.spOrder.userAvatar,
          select:true
        }
        //that.mainPerson.unshift(selfData)
        that.peopleList.unshift(selfData);

        //11 品德积分12 行为积分13 业绩积分
        if(that.spOrder.rootId==11||that.spOrder.rootId==12||that.spOrder.rootId==13){
          that.needRange=true;
          that.getScoreRange();
        }else{
          that.needRange=false;
        }
      }
      this.$apply();
    }

    onLoad(query) {
      this.id = query.id;
      this.type = query.type;
//      this.id="204604";
//      this.type=2;

      this.type==2?this.keyword='通过':this.keyword='拒绝';
      this.getList();
      this.getDetail();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  #noteContent{
   display: block;
    .paddingAll;
    .fs30;
    .bgWhite;
    width: auto;
    height: 200rpx;
  }
  .cl{

    width: 40rpx;
    height: 40rpx;
    display: inline-block;
    .tac;
    vertical-align: middle;
    line-height: 40rpx;
    border-radius: 50%;
    .overflow;
    .iconfont{
      font-size: 40rpx;
      display: inline-block;
    }
  }
  .wrap{
    background:@grayBg;
    .icon-gouxuan {
      color:@blue!important;
    }
  }

  .spbz{
    width: 100%;
    border: none;
    outline: none;
    resize: none;
    height: 200rpx;
    line-height: 40rpx;
    font-size: @fs30;
  }
</style>
