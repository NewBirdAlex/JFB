
<template>
  <view  >
    <view class="bgWhite paddingLeft">
      <view class="paddingTop paddingBottom paddingRight borderBottom fs30">
        <text>奖励积分</text>
        <text class="fr" >{{detail.addScore}}分</text>
      </view>
      <block wx:for="{{inputList}}" wx:key="">
        <view class="paddingTop paddingBottom paddingRight borderBottom fs30 overflow" >
          <text class="lp fl">{{item.title}}</text>
          <input type="text" placeholder="请输入" value="{{item.content}}" class="rp" wx:if="{{item.type==1}}"/>
          <textarea name="" id="" class="rp mul" value="{{item.content}}" placeholder="请输入" wx:else ></textarea>
        </view>
      </block>

    </view>

    <!--upload-->
    <uploadImage :imgUrl="imgList" ></uploadImage>

    <!--copy-->
    <copyStaff :copyStaff.sync="chaosongList" ></copyStaff>

    <view class="confBtn" style="margin-top: 100rpx" @tap="subData" >提交</view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import uploadImage from '../../components/uploadImage'
  import copyStaff from '../../components/copyStaff'

  export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '日志'
    }
    components = {
      uploadImage,
      copyStaff
    }

    data = {
      detail:{

      },
      chaosongList:[],
      chaosongId:'',
      imgList:'',
      inputList:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      subData(){
        let cansubmit = true;
        this.inputList.forEach(item=>{
          if(!item.content) cansubmit=false;
        })
        if(!cansubmit) {
          this.$toast('请填写完整内容');
          return;
        }
        let that = this;
        let str = '';
        for(let i = 0;i<this.inputList.length;i++){
          str+=JSON.stringify(this.inputList[i]);
          if(i!=this.inputList.length-1) str+=',';
        }
        let content = '['+str+']';
        console.log(content)
        this.$http.post('/dailyRecord/submitDaily', {
          checkUser: this.chaosongId,
          content: content,
          pics:this.imgList,
          modelId: this.detail.id,
        })
          .then(function (response) {
            if(response.data.code=='200000'){
              that.$toast('发布日志成功');
              that.$router.go(-1)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
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
    onLoad() {
      this.detail =wx.getStorageSync('diaryInf')
      this.inputList =JSON.parse(this.detail.modelContent) ;
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .mul{
    resize: none;
    height: 100rpx;
    text-align: left!important;
  }
  .lp{
    .marginRight;
  }
  .rp{
    .fl;
    width: 400rpx;
    /*text-align: right;*/
    border:none;
    outline: none;
    padding-left: 20rpx;
  }
</style>
