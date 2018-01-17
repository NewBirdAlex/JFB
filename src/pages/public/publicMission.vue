
<template>
  <view class=" grayBg" >
    <title conttitle="任务标题"
             note="输入任务标题"
             :value="title"
             inpType="input"
    ></title>
    <mydescript conttitle="任务描述"
           note="输入任务描述"
           :value="descript"
           inpType="textarea"
    ></mydescript>
    <mypoint conttitle="任务积分"
                note="输入任务积分"
                :value="point"
                inputType="number"
                inpType="input"
    ></mypoint>
    <missionNum conttitle="限制人数"
                note="请输入任务限制人数"
                :value="number"
                inputType="number"
                inpType="input"
    ></missionNum>
    <scoreType :scoreType="scoreType"></scoreType>

    <apartmentRange :rangeList.sync="rangeList"></apartmentRange>

    <view class="confBtn marginTop" @tap="subMission">提交</view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import Tips from '../../common/tips';
  import myInput from '../../components/myInput';
  import scoreType from '../../components/scoreType';
  import apartmentRange from '../../components/apartmentRange';

  export default class publicMission extends wepy.page {
    config = {
      navigationBarTitleText: '发布任务'
    }
    components = {
      scoreType,
      title:myInput,
      mydescript:myInput,
      mypoint:myInput,
      missionNum:myInput,
      apartmentRange
    }

    data = {
      title:'',
      descript:'',
      point:'',
      number:'',
      rangeList:[],
      scoreType:4
    }
    mixins = [input]
    computed = {

    }

    methods = {
      async subMission() {
        if(!this.title||!this.descript||!this.point||!this.number){
          Tips.alert('请填写完整资料');
          return
        }
        let that =this;
        let apartMentId=[];
        if(this.rangeList.length){
          this.rangeList.forEach(item=>{
            apartMentId.push(item.id)
          })
        }
        let res = await http.post('/mission/userCreateMission', {
          isRepeat: 7,
          missionAddScore: this.point,
          missionAuthority: apartMentId.join(','),
          missionContext: this.descript,
          missionTitle: this.title,
          missionType: 2,
          type: 1,
          userCount: this.number
        })
        if(res.code==200000){
          Tips.alert('提交任务成功');
          setTimeout(()=>{
            wx.navigateBack();
          },1000)

        }else{
          Tips.alert(res.data.message);
        }
      }
    }
    props = {

    };
    events = {

    }
    onShow(){
      if(wx.getStorageSync('showRange')){
        this.rangeList = wx.getStorageSync('showRange');
        wx.removeStorageSync('showRange');
      }
    }
    onLoad() {

    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .strong{
    width: 160rpx;
    display: inline-block;

  }

</style>
