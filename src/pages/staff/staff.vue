
<template>
  <view class=" " >
    <block wx:for="{{staffList}}" wx:key="">
      <view class="list overflow paddingAll borderBottom">
        <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}" class="marginRight headPicture fl" alt=""></image>
        <view class="fl">
          <view class="fs30 ">{{item.userName}}</view>
          <view class="gray marginTop fs28">{{item.departmentName}}</view>
        </view>
        <text class="cl" :class="{'border':!item.pick}" @tap="choosePeople({{index}})" wx:if="{{!item.pick}}"></text>
        <text class="icon iconfont icon-gou blue fr marginTop" @tap="choosePeople({{index}})" style="font-size: 50rpx;" wx:else></text>
      </view>
    </block>
    <view class="obtn bgWhite">
      <view class="" @tap="cancel">取消</view>
      <view class="active" @tap="outputData">确认</view>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class Staff extends wepy.page {
    config = {
      navigationBarTitleText: '选择员工'
    }
    components = {
    }

    data = {
      apartmentallLoaded: false,
      allLoaded: false,
      showOption: false,
      listWrap: '',
      showStaff: false,
      showApartment: true,//click show apartment or joblist
      pageNumber: 1,
      pageSize: 10,
      apartmentNum: 1,
      apartmentSize: 20,
      jobNum: 1,
      jobSize: 20,
      lastPage: false,
      keyWord: '',
      departmentId: '',
      jobId: '',
      jobList: [],
      staffList: [],
      apartMentList: [],
      topImgList: [],
      apartmentLast: false
    }
    mixins = [input]
    computed = {

    }

    methods = {
      choosePeople(index){
        this.staffList[index].pick=!this.staffList[index].pick;
        this.$apply();
      },
      outputData() {
        //返回员工
        let arr = [];
        this.staffList.forEach(item => {
          if (item.pick) {
            arr.push(item)
          }
        })
        this.topImgList = arr;
        this.staffList.forEach(item => item.pick = false)
        if(wx.getStorageSync('approveStaff')){//审批人
          wx.setStorageSync('approveStaffList', arr);
          wx.removeStorageSync('approveStaff');
        }else if(wx.getStorageSync('copyStaff')){//抄送人
          wx.setStorageSync('copyStaffList', arr);
          wx.removeStorageSync('copyStaff');
        }else{//选择员工
          wx.setStorageSync('staff', arr)
        }
        wx.navigateBack();
      },
      cancel() {
        //this.staffList.forEach(item => item.pick = false);
        wx.navigateBack();
      },
    }
    onReachBottom(){
      if(this.lastPage||this.allLoaded) return
      this.getStaff();
    }
    async getStaff() {
      let that = this;
      let res = await http.post('/user/userList', {
        departmentId: this.departmentId,
        jobId: this.jobId,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        sortOrder: "asc",
        sortType: "id",
        userName: this.keyWord
      })
      if(res.data){
        that.allLoaded = false;
        that.pageNumber+=1;
        that.staffList = that.staffList.concat(res.data.content);
        that.staffList.forEach(item => item.pick = false);// click or not
        if (res.data.last) {  //no more data
          that.lastPage = true;
        }
        this.$apply();
      }
    }
    props = {

    };
    events = {

    }
    onLoad() {
      this.getStaff();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .topList {
    display: inline-block;
    width: 120rpx;
    height: 140rpx;
    .marginTop;
    .tac;
    .marginRight;
    .marginLeft;
    .overflow;
  }

  #selectPeople {
    display: inline-block;
    vertical-align: top;
    .marginTop;
    .marginLeft;
    width: 100rpx;
    height: 100rpx;
    .tac;
    line-height: 100rpx;
    border-radius: 50%;
    .border;
    .icon {
      font-size: 50rpx;
      .gray;
    }
  }

  .apartmentList {
    height: 700rpx;
    overflow: scroll;
    li {
      padding: 30rpx 0;
      .borderBottom;
      .fs30;
    }
  }

  .listWrap {
    height: calc(~"100% - 200rpx");
    overflow: scroll;
  }

  .obtn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .tac;
    view{
      width: 40%;
      line-height: 80rpx;
      color: @blue;
      .fl;
      .tac;
      .fs36;
      background-color: #e5f5ff;
      &:nth-child(2) {
        width: 60%;
        .activeBtn;
      }
    }
  }

  .option {
    position: fixed;
    left: 0;
    top: 100rpx;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
    //        .bgWhite;
    overflow: hidden;
    .ol {
      width: 40%;
      background: white;
      .fl;
      text-indent: 2em;
      i {
        .fs36;
        .marginRight;
        position: relative;
        top: -2px;
      }
      div {
        padding: 30rpx 0;
        .borderBottom;
        .fs30;

      }
    }
    .or {
      width: 60%;
      box-sizing: border-box;
      padding-top: 8rpx;
      .border;
      .bgWhite;
      border-right: none;
      .fl;
    }
  }

  .cl {
    .fr;
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    .tac;
    line-height: 40rpx;
    margin-top: 20rpx;
    border-radius: 50%;
    .icon {
      .fl;
      font-size: 45rpx;
    }
  }

  .wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    opacity: 1;
    .grayBg;
  }

  .search {
    .borderBottom;

    position: relative;
    .left {
      width: 200rpx;
      .fl;
      .tac;
      font-size: @fs30;
      padding-top: 10rpx;
    }
    .right {
      .fl;
      width: 500rpx;
      text-indent: 1em;
      padding: 10rpx 0;
      .borderRadius;
      input {
        margin-left: 20rpx;
        border: none;
        outline: none;
      }
    }
  }
</style>
