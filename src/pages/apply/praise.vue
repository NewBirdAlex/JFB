
<template>
  <view class=" grayBg" >
    <byTitle conttitle="表扬标题"
             note="输入表扬标题"
             :value="bytitle"
             inpType="input"
    ></byTitle>
    <byContent conttitle="表扬内容"
             note="输入表扬内容"
             :value="bycontent"
             inpType="textarea"
    ></byContent>
    <scoreType :scoreType="scoreType"></scoreType>
    <view wx:if="{{type==2}}">
      <view class="section bgWhite fs30 paddingAll">
        <text class="section__title">日期选择器</text>
        <picker mode="date" value="{{date}}" start="2015-09-01" end="2017-09-01" bindchange="bindDateChange" class="fr">
          <view class="picker fr">
            <text class="gray" wx:if="{{!date}}">选择时间</text>{{date}}
          </view>
        </picker>
      </view>
    </view>
    <!--img-->
    <uploadImage :imgUrl="imgList"></uploadImage>
    <!--staff-->
    <view wx:if="{{type==1}}" class="paddingAll borderBottom fs30 bgWhite marginTop">表扬可用积分 <text class="gray">({{useInf.flowScore}})</text></view>
    <view wx:else class="paddingAll borderBottom fs30 bgWhite marginTop">奖扣员工</view>
    <showStaff  :inputScore.sync="type" :scoreRange.sync="scoreRange" :staffList.sync="staffList"></showStaff>

    <!--choose staff-->
    <view  class="paddingAll bgWhite marginTop fs30 " @tap="getStaff">
      选择员工
      <text class="iconfont icon-right fr"></text>
    </view>
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
  import scoreType from '../../components/scoreType'
  import uploadImage from '../../components/uploadImage'
  import showStaff from '../../components/showStaff'

  export default class Praise extends wepy.page {
    config = {
      navigationBarTitleText: '奖扣'
    }
    components = {
      byTitle:myInput,
      byContent:myInput,
      scoreType,
      uploadImage,
      showStaff
    }

    data = {
      date:'',
      bytitle:'',
      bycontent:'',
      scoreType:1,
      imgList:'',
      staffList:[],
      type:'',
      useInf:''
    }
    mixins = [input,commonHttp]
    computed = {

    }

    methods = {
      bindDateChange(e){
        this.date=e.detail.value;
        this.$apply();
      },
      getStaff(){
        wx.navigateTo({
          url: '/pages/staff/staff'//实际路径要写全
        });
      },
      async subData(){
        if(!this.bytitle||!this.bycontent){
          tips.alert('请填写完整资料');
          return
        }
        if(!this.staffList.length){
          tips.alert('请选择员工');
          return
        }
        let score = [];
        let that = this;
        this.staffList.forEach(item=>{
          score.push(item.selectAddScore)
        })
        let approveUserId = [];
        this.staffList.forEach(item=>{
          approveUserId.push(item.id);
        })
        let params = {
          addScore: score.join(','),
          beApproveUserId :approveUserId.join(','),
          praiseContext:this.bycontent,
          praisePics :this.imgList,
          praiseTitle :this.bytitle,
          type :this.scoreType,
        }
        let url = '/missionApprove/praiseUser';
        if(this.type==2){
          params.dealDate = this.date;
          url = '/missionApprove/dealScore'
        }
        let res =await http.post(url, params);
        if(res.code==200000){
          tips.alert('提交成功');
          setTimeout(()=>{
            wx.navigateBack()
          },1000)
        }
      }
    }
    props = {

    };
    events = {

    }
    onShow(){
      if(wx.getStorageSync('staff')){
        this.staffList =this.staffList.concat(wx.getStorageSync('staff')) ;
        wx.removeStorageSync('staff');
      }
    }
    onLoad(query) {
      this.useInf = wepy.$instance.globalData.userData;
      this.type=query.type;
      this.getScoreRange();
      this.getLeader();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";

</style>
