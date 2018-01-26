
<template>
  <view class="grayBg " >
    <byTitle conttitle="申请标题"
             note="输入申请标题"
             :value="bytitle"
             inpType="input"
    ></byTitle>
    <byContent conttitle="申请内容"
               note="输入申请内容"
               :value="bycontent"
               inpType="textarea"
    ></byContent>
    <scoreType :scoreType="scoreType"></scoreType>
    <!--img-->
    <uploadImage :imgUrl="imgList"></uploadImage>

    <view class="paddingAll borderBottom fs30 bgWhite marginTop">申请人 <text class="gray">(默认申请自己的，可帮其他同事申请)</text></view>
    <showStaff  :inputScore.sync="type" :scoreRange.sync="scoreRange" :staffList.sync="peopleList"></showStaff>
    <!--choose staff-->
    <view  class="paddingAll bgWhite marginTop fs30 " @tap="getStaff">
      选择员工
      <text class="iconfont icon-right fr"></text>
    </view>

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
  import tips from '../../common/tips';
  import myInput from '../../components/myInput'
  import scoreType from '../../components/scoreType'
  import uploadImage from '../../components/uploadImage'
  import showStaff from '../../components/showStaff'
  import approveStaff from '../../components/approveStaff'
  import copyStaff from '../../components/copyStaff'
  export default class freePrize extends wepy.page {
    config = {
      navigationBarTitleText: ''
    }
    components = {
      byTitle:myInput,
      byContent:myInput,
      scoreType,
      uploadImage,
      showStaff,
      copyStaff,
      approveStaff
    }

    data = {
      bytitle:'',
      bycontent:'',
      scoreType:1,
      imgList:'',
      type:2,
      peopleList:[],
      userData:{},
      approveUserList:[],
      chaosongList:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      getStaff(){
        wx.navigateTo({
          url: '/pages/staff/staff'//实际路径要写全
        });
      },
      async subData(){
        let score = [];
        let that = this;
        if(!this.bytitle||!this.bycontent){
          tips.alert('请填写完整资料');
          return
        }
        if(!this.scoreType){
          tips.alert('请选择积分类型');
          return
        }
        if(this.peopleList.length==0){
          tips.alert('至少选择一名员工');
          return
        }
        this.peopleList.forEach(item=>{
          score.push(item.selectAddScore)
        })
        let haveScore =true;
        score.forEach(item=>{
          if(!item){
            haveScore=false;
          }
        });
        if(!haveScore){
          tips.alert('请输入相应分数');
          return
        }
        //审批人 被审批人 抄送人
        let approveUserId = [];
        if(this.approveUserList){
          this.approveUserList.forEach(item=>{
            approveUserId.push(item.id);
          })
        }
        let beApproveUserId = [];
        this.peopleList.forEach(item=>{
          beApproveUserId.push(item.id);
        })
        let copyUserId = [];
        if(this.chaosongList) {
          this.chaosongList.forEach(item=> copyUserId.push(item.id));
        }
        let res = await http.post('/missionApprove/submitMissionApprove', {
          addScore: score.join(','),
          aimId: '',
          approveContext: this.bycontent,
          approveTitle: this.bytitle,
          approveUserId: approveUserId.join(','),
          beApproveUserId: beApproveUserId.join(','),
          copyUserId: copyUserId.join(','),
          missionPics: this.imgList,
          rootId:16,
          type:this.scoreType,
          submitType:2
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
    async getLeader(){
      let that = this;
      let res = http.post('/approvePermission/getApproveUser');
      if(res.code==200000){
        if(res.data.length!=0){
          that.approveUserList=res.data;
        }
        this.$apply();
      }
    }
    getSelfInf(){
      //获取自己分数
      this.selfInf = {
        id:this.userData.userId,
        userName:this.userData.userName,
        userAvatar:this.userData.userAvatar,
        selectAddScore:''
      }
      this.peopleList.push(this.selfInf);
      this.$apply();
    }
    props = {

    };
    events = {

    }
    onShow(){
      //是否从选择员工返回
      if(wx.getStorageSync('staff')){
        let staff = wx.getStorageSync('staff');
        staff.forEach(item=>{
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

    onLoad() {
      this.userData =  wepy.$instance.globalData.userData;
      this.getSelfInf();

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";

</style>
