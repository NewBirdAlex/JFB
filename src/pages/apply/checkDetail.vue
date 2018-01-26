<style lang="less">
  @import "../../assets/css/common";
  .iconfont{
    vertical-align: bottom;
  }
  .crl{
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    .border;
    vertical-align: middle;
    .marginRight;
    .iconfont{font-size: 40rpx}
  }
  .answerWidth{
    .fr;
    width: 550rpx;
    vertical-align: top;
    .lh40;
  }
</style>

<template>
  <view class=" " >
    <view class="paddingAll bgWhite lh40 fs30">
      <view class="">{{orderDetail.title}}</view>
      <view class="fs24 gray marginTop">{{orderDetail.companyName}} 布于 {{orderDetail.createDate||''}}</view>
      <view class="gray">
        <!--<span class="marginRight">每天可考核 {{orderDetail.ifOnly}} 次</span>-->
        <text class="marginRight" wx:if="{{orderDetail.ifOnly==1}}">每天一次</text>
        <text class="marginRight" wx:if="{{orderDetail.ifOnly==2}}">每周一次</text>
        <text class="marginRight" wx:if="{{orderDetail.ifOnly==3}}"> 每月一次</text>
        <text class="marginRight" wx:if="{{orderDetail.ifOnly==4}}">每季一次</text>
        <text class="marginRight" wx:if="{{orderDetail.ifOnly==5}}">每年一次</text>
        <text class="marginRight" wx:if="{{orderDetail.ifOnly==6}}"> 无限制 </text>
        <text class="marginRight" wx:if="{{orderDetail.ifOnly==7}}">仅限一次</text>
        <text class="icon iconfont icon-renwu1"></text>{{orderDetail.sums}}

        <text class="fr blue" wx:if="{{orderDetail.isRead}}">已考核</text>
        <text class="fr red" wx:else>未考核</text>
      </view>
    </view>
    <!--answer-->
    <block wx:for="{{questions}}" wx:key="" wx:for-item="item" wx:for-index="index">

      <view >
        <view class="paddingAll fs30 lh40">
          {{index+1}}.{{item.context}}<text  class="red" style="vertical-align: middle;">*</text>
          <text class="gray">（答对得{{item.score}}分）</text>
        </view>
        <view class="marginLeft marginRight bgWhite borderRadius fs28">
          <block wx:for="{{answers[index].questions}}" wx:key="" wx:for-index="index2" wx:for-item="data">
            <view class="paddingAll borderBottom overflow">
              <text class="crl" @tap="choose({{index}},{{index2}})">
                <text class="icon iconfont icon-gou blue fs36 marginRight" wx:if="{{index2==answers[index].answerNum}}" ></text>
              </text>
              <text  wx:if="{{index2==0}}">A.</text>
              <text  wx:if="{{index2==1}}">B.</text>
              <text  wx:if="{{index2==2}}">C.</text>
              <text  wx:if="{{index2==3}}">D.</text>
              <view class="answerWidth">
                {{data}}
              </view>
            </view>
          </block>

        </view>
      </view>

    </block>

    <!--have done-->
    <view class=" bgWhite marginTop" wx:if="{{userRecordList.length}}" >
      <view class=" paddingAll borderBottom fs30">他们都考核了</view>
      <view class=" paddingAll overflow">
        <block wx:for="{{orderDetail.userRecordList}}" wx:key="">
          <view class="people tac fl marginRight marginTop marginLeft" >
            <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="headPicture" alt=""></image>
            <view class="fs24 lh40">{{item.userName}}</view>
          </view>
        </block>

      </view>
    </view>

    <view class="confBtn" @tap="subAnswer">提交</view>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class Index extends wepy.page {
    config = {
      navigationBarTitleText: '考核内容'
    }
    components = {
    }

    data = {
      id:'',
      orderDetail:{},
      questions:[],
      answers:[],
      userRecordList:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      async subAnswer(){
        let bol = true;
        this.answers.forEach(item=>{
          if(item.answerNum==100){
            bol=false;
          }
        });
        if(bol){
          //提交
          let arr = [];
          let that = this;
          this.answers.forEach(item=>{
            arr.push(item.answerNum+1)
          });
          let res = await http.post('/quetionsList/submitListByUser', {
            aimId:this.id,
            anwsers:arr.join(',')
          });
          if(res.code==200000){
            tips.alert('考核完成，祝您好运');
            setTimeout(()=>{
              wx.navigateBack()
            },1000)
          }else{
            tips.alert(res.message)
          }
        }else {
          //您还有未填写的题目哦
          tips.alert('您还有未填写的题目哦。。。');
        }

      },
      choose(index,index2){
        this.answers[index].answerNum = index2;
        this.$apply();
      }
    }
    async getData(){
      let that = this;
      let res = await http.post('/quetionsList/listById', {
        id:this.id
      });
      if(res.code==200000){
        that.orderDetail = res.data.question;
        that.questions = res.data.quetionList;
        that.userRecordList = res.data.userRecordList;
        that.questions.forEach(item=>{
          that.answers.push({
            answerNum:100,
            questions:[item.queOne,item.queTwo,item.queThree,item.queFour]
          })
        });
        console.log(that.orderDetail)
        this.$apply();
      }
    }
    props = {

    };
    events = {

    }

    onLoad(query) {
      this.id=query.id;
      this.getData();
    }
  }
</script>

