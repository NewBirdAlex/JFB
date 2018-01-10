
<template>
  <view class=" " style="padding-bottom: 100rpx;" >
    <block wx:for="{{list}}" wx:key="index">
      <view class="paddingAll borderBottom">
        {{item.name}}
        <text class="fr cl" @tap="selApartment({{index}})" wx:if="{{!item.ticket}}"></text>

        <text @tap="selApartment({{index}})" class="icon iconfont icon-gou blue fr fs36" wx:if="{{item.ticket}}"></text>
      </view>
    </block>
    <view class="all">

      全选
      <text class="gray">（不选择默认为单选）</text>
      <text class="fr cl" @tap="chooseAll" wx:if="{{!selectAll}}"></text>
      <text @tap="chooseAll" class="icon iconfont icon-gou blue fs36 fr" wx:if="{{selectAll}}"></text>
    </view>

    <view class="confBtn" @tap="confirmSel">确认选择</view>
  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class showRange extends wepy.page {
    config = {
      navigationBarTitleText: '选择范围'
    }
    components = {
    }

    data = {
      selectAll:false,
      pageNumber:1,
      pageSize:20,
      lastPage:false,
      loading:false,
      list:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      chooseAll(){
        this.selectAll=!this.selectAll;
        this.list.forEach(item=>{
          item.ticket=this.selectAll;
        });

        this.$apply();
      },
      confirmSel(){
        let str = '';
        let arr = [];
        this.list.forEach(function (item) {
          if (item.ticket) {
            arr.push(item)
          }
        });
        wx.setStorageSync('showRange', arr);
        wx.navigateBack();
      },
      selApartment(index){
        this.list[index].ticket=!this.list[index].ticket;
        this.$apply();
      }
    }
     onReachBottom(){
      if(!this.lastPage&&!this.loading){
        this.getList();
      }
    }
    async getList(){
      let that = this;
      this.loading=true;
      let res = await http.post('/companyUser/departmentList',{
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      if(res.data){
        this.pageNumber+=1;
        this.loading=true;
        if(res.data.last) this.lastPage=true;
        that.list=res.data.content ;
        that.list.forEach(item=>item.ticket=false);
        this.$apply();
      }
    }
    props = {

    };
    events = {

    }

    onLoad() {
      this.getList();
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
  .all{
    .paddingAll;
    .borderBottom;
    font-size: @fs30;
  }
  .cl{
    width: 40rpx;
    height: 40rpx;
    border: @border;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    line-height: 40rpx;
    display: inline-block;
    i {
      font-size: 40rpx;
    }
  }
  .icon{
    font-size: 40rpx;
  }
</style>
