
<template>
  <view class=" grayBg" >
    <myInput conttitle="公告内容"
             note="输入公告内容"
             :value="content"
             inpType="textarea"
    ></myInput>
    <apartmentRange :rangeList.sync="rangeList"></apartmentRange>
    <view class="confBtn marginTop" @tap="subMission">发布公告</view>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import myInput from '../../components/myInput';
  import apartmentRange from '../../components/apartmentRange';
  export default class announcement extends wepy.page {
    config = {
      navigationBarTitleText: '发布公告'
    }
    components = {
      myInput,
      apartmentRange
    }

    data = {
      content:'',
      rangeList:[]
    }
    mixins = []
    computed = {

    }

    methods = {
      async subMission(){
        if(!this.content){
          tips.alert('请填写公告内容')
          return
        }
        let that = this;
        let apartMentId=[];
        if(this.rangeList.length){
          this.rangeList.forEach(item=>{
            apartMentId.push(item.id)
          })
        }
        let res = await http.post('/notes/save', {
          context: this.content,
          permissionDepartment: apartMentId.join(',')
        });
        if(res.code==200000){
          tips.alert('发布公告成功');
          setTimeout(_=>{
            wx.navigateBack();
          },1000)
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
  .confBtn{
    position: fixed;
    bottom:0;
    let:20rpx;
    width: 710rpx;
  }
</style>
