
<style lang="less">
  @import "../../assets/css/common";
  .wp > view {
    margin-top: 10rpx;
  }

  .lh50 {
    line-height: 50rpx;
  }

  .left {
    width: 30%;
    .fs28;
  }

  .right {
    width: 70%;
  }

  .read {
    padding: 15rpx 30rpx;
    background: @grayBg;
    color: #646464;
  }

  .unread {
    padding: 15rpx 30rpx;
    background: @blue;
    color: white;
  }

  .search {
    text-align: left;

    .st {
      .paddingAll;
      overflow: hidden;
      line-height: 60rpx;
      .bgWhite {
        float: left;
        width: 600rpx;
        font-size: @fs26;
        border-radius: 8px 8px 8px 8px;
        line-height: 60rpx;
        height: 60rpx;
        .icon{
          font-size: @fs36;
          margin: 0 20rpx;
        }
        input {
          border: none;
          outline: none;
          width: 500rpx;
        }
      }
    }
    .sh {
      line-height: 40rpx;
      .overflow {
        span {
          .grayBg;
          border-radius: 6px 6px 6px 6px;
          padding: 10rpx 20rpx;
          float: left;
          margin: 10rpx;
        }
      }
    }
    .sn {
      .snt {
        .borderBottom;
        position: relative;
        .tac;
        line-height: 0;
        margin: 1rpx 20rpx;

        text {
          position: relative;
          background: white;
          z-index: 2;
          padding: 0 30rpx;
        }
      }
      .snc {
        .tac;
        text {
          display: inline-block;
          line-height: 70rpx;
          margin: 0 20rpx;
          .gray;
          .icon{
            font-size: 60rpx;
            display: block;
          }
        }
      }
    }
  }

  .spTop {
    background: @grayBg;
    .tac;
    font-size: @fs30;
    height: 90rpx;
    line-height: 90rpx;
    .borderBottom;
    text {
      display: inline-block;
      width: 35%;
      margin: 0 5%;
    }
    .active {
      border-bottom: 2px solid @blue;
      color: @blue;
    }
  }

  .sel {
    height: 90rpx;
    line-height: 90rpx;
    background: @grayBg;
    .tac;
    font-size: @fs30;
    .borderBottom;
    position: relative;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      /*display: none;*/
      background: white;
      .sel_type {
        .paddingAll;
        text-align: left;
        text {
          width: 300rpx;
          height: 80rpx;
          .tac;
          display: inline-block;
          line-height: 80rpx;
          background-color: rgba(240, 240, 240, 1);
          border-radius: 6px 6px 6px 6px;
          margin-bottom: 20rpx;
          &:nth-child(odd) {
            float: right;
          }
          &:nth-child(even) {
            float: left;
          }
        }
        .active {
          background: @blue;
          color: white;
        }
        .confBtn {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          margin: 0;
        }
      }
    }
    .filterType {
      float: left;
      width: 50%;
      display: inline-block;
      color: @gray;
    }
  }
</style>
<template>
  <view class="grayBg " >
    <view class="spTop">
      <text :class="{active:spType}" @tap="changeType">我收到的</text>
      <text :class="{active:!spType}" @tap="changeType">我发出的</text>
    </view>

    <view>
        <!--list-->
      <block wx:for="{{list}}" wx:key="">
        <view class="paddingTop paddingLeft paddingRight bgWhite marginBottom">
          <!--<router-link tag="div" :to="'/workDiary/diary/'+item.id+'/'+spType" class="overflow">-->
          <view >
            <view class="overflow">
              <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}"  class="marginRight headPicture fl" alt=""></image>
              <text class="fr" wx:if="spType">
                   <text class="fr unread fs30 borderRadius" wx:if="{{!item.isread}}">未读</text>
                  <text class="fr read fs30 borderRadius active" wx:else>已读</text>
              </text>

              <view class="lh40">
                <view class="fs30">{{item.userName}}</view>
                <view class="gray fs26">{{item.departmentName}}</view>
              </view>
            </view>
            <view class="fs30 lh40 marginTop borderBottom paddingBottom wp">
              <view class="overflow">
                <view class="left fl gray">奖励积分:</view>
                <view class="right fl">
                  {{item.addScore}}分
                </view>
              </view>
              <block wx:for="{{item.content}}" wx:key="" wx:for-index="index2" wx:for-item="obj">
                <view class="overflow">
                  <view class="left fl gray">{{obj.title}}:</view>
                  <view class="right fl">
                    {{index2}}{{obj.content}}
                  </view>
                </view>
              </block>

            </view>
          </view>

          <view class="paddingAll gray fs26">
            <text>{{item.createDate}}</text>
            <text class="fr" @tap="makeAwsome({{index}})">
                <text class="icon iconfont icon-hongxin" :class="{'red':item.likeCount}" ></text> {{item.likeCount || 0}}
            </text>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class dailyList extends wepy.page {
    config = {
      navigationBarTitleText: '日志列表'
    }
    components = {
    }

    data = {
      spType: true,
      filterHeight: 0,
      showWrap: true,
      showSearch: false,
      pageNumber: 1,
      pageSize: 10,
      lastPage: false,
      loading: false,
      list: [],
      searchHistory: [
        '品德积分',
        '人气奖',
        'FG123353525631521',
        '品德积分',
        '最佳人气',
        '人气奖',
      ]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      changeType() {
        this.spType = !this.spType;
        this.reset();
        this.getList();
        this.$apply();
      },
      async makeAwsome(index){
        console.log(1111)
        let res = await http.post('/dailyRecord/goodDaily', {
          addUserId: this.list[index].userId,
          id: this.list[index].id,
        });
        if(res.code==200000){
          this.list[index].likeCount += 1;
          this.$apply();
        }
      }
    }
    props = {

    };
    events = {

    }
    reset() {
      this.pageNumber = 1;
      this.lastPage = false;
      this.list = [];
    }
    async getList() {
      if (this.lastPage) {
        tips.alert('没有更多数据了');
        return
      }
      let that = this;
      var type = 1;
      this.spType ? type = 2 : type = 1;
      let res =await http.post('/dailyRecord/listJson', {
        departmentId: '',
        jobId: '',
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        type: type,
      });
      if(res.code==200000){
        that.pageNumber += 1;
        if (res.data.last) {
          that.lastPage = true;
        }
        res.data.content.forEach(item=>{
          let obj = item.content;
          item.content= JSON.parse(obj);
        });
        that.list = that.list.concat(res.data.content);
        that.loading = false;
        this.$apply();
      }
    }
    onReachBottom(){
      this.getList();
    }
    onLoad() {
      this.getList();
      this.showWrap = false;
    }
  }
</script>

