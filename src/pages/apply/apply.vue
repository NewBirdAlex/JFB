
<template>
<view class="grayBg ">
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
      <text wx:if="{{mission=='true'}}">
        <text class="rightPart fs30 lh40 " wx:if="{{detail.type==3}}">C</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.type==1}}">A</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.type==2}}">B</text>
      </text>
      <text wx:else>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.rootId==11}}">A</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.rootId==12}}">C</text>
        <text class="rightPart fs30 lh40 " wx:if="{{detail.rootId==13}}">B</text>
      </text>

    </view>
  </view>
  <myInput conttitle="审批备注"
           note="输入备注"
           :value="beizhu"
           inpType="textarea"
          ></myInput>
  <!--upload-->
  <uploadImage></uploadImage>

</view>
</template>

<script>
import wepy from 'wepy';
import input from '../../mixins/input';
import http from '../../common/http';
import tips from '../../common/tips';
import myInput from '../../components/myInput'
import uploadImage from '../../components/uploadImage'
export default class Apply extends wepy.page {
  config = {
    navigationBarTitleText: ''
  }
  components = {
    myInput,
    uploadImage
  }

  data = {
    beizhu:"",
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
    peopleList:null,
    chaosongList:null,
    shenpiList:null,
    approveUserList:null,
    imgList:'',
    imgData:{},
    mission:false,
    src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
  }
  mixins = [input]
  computed = {

  }

  methods = {

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
      this.$apply();
      return
      if(response.data.data.approveUser.length){
        //是否有审批人
        that.approveUserList = response.data.data.approveUser;
      }else{
        //that.approveUserList=null;
      }
      //get score select range
      let minScore = this.detail.minuxScore;
      let maxScore = this.detail.maxScore;
      let level = this.detail.scoreLevel;
      this.scoreRange = myTool.getScoreRange(minScore,maxScore,level);
      // get score select range

      that.peopleList = [];
      //                        //默认添加自己
      that.selfInf={
        userAvatar:that.userMessage.userAvatar,
        userName:that.userMessage.userName,
        selectAddScore:that.scoreRange[0],
        id:that.userMessage.userId
      };
      that.peopleList.push(that.selfInf);

    }
  }
  events = {

  }

  onLoad() {
    this.id=3828;
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
