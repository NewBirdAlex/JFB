
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
                inpType="input"
    ></mypoint>
    <missionNum conttitle="限制人数"
                note="请输入任务限制人数"
                :value="number"
                inpType="input"
    ></missionNum>
    <scoreType :scoreType="scoreType"></scoreType>
    <view class="paddingAll marginTop bgWhite borderBottom">
      <view class="strong">可见范围</view>
      <view class="gray mp">默认全部可见</view>
      <text class="iconfont icon-right fr" style="margin-top: 10rpx;"></text>
    </view>

    <view class="confBtn marginTop" @tap="subMission">提交</view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  import myInput from '../../components/myInput';
  import scoreType from '../../components/scoreType';

  export default class publicMission extends wepy.page {
    config = {
      navigationBarTitleText: '选择可见范围'
    }
    components = {
      scoreType,
      title:myInput,
      mydescript:myInput,
      mypoint:myInput,
      missionNum:myInput,

    }

    data = {
      title:'',
      descript:'',
      point:'',
      number:'',
      scoreType:4
    }
    mixins = [input]
    computed = {

    }

    methods = {
      subMission(){

      }
    }
    props = {

    };
    events = {

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
  .mp{
    display: inline-block;
    .tac;
    width: 500rpx;
  }
</style>
