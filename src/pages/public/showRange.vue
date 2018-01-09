
<template>
  <view class=" " >
    <block wx:for="{{list}}" wx:key="index">
      <view class="paddingAll borderBottom">
        {{item.name}}
        <text class="fr cl" @tap="selApartment({{index}})" wx:if="{{!item.ticket}}"></text>

        <text @tap="selApartment({{index}})" class="icon iconfont icon-gou blue fr fs36" wx:if="{{item.ticket}}"></text>
      </view>
    </block>
    <view class="all">

      全选
      <text class="gray">
      （不选择默认为单选）
      </text>

      <text class="fr cl" @click="chooseAll" v-if="!selectAll">

      </text>
      <text @click="chooseAll" class="icon iconfont icon-gou blue fs36 fr"
            v-if="selectAll"></text>
    </view>

    <view class="confBtn" @click="confirmSel">确认选择</view>
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
      pageNumber:1,
      pageSize:20,
      list:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      selApartment(index){
        this.list[index].ticket=!this.list[index].ticket;
        this.$apply();
      }
    }
    async getList(){
      let that = this;
      let res = await http.post('/companyUser/departmentList',{
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      if(res.data){
        console.log(res)
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
  .all{
    .paddingAll;
    .borderBottom;
    font-size: @fs30;
    height: 0.5rem;
    line-height: 0.5rem;
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
