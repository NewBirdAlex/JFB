<style lang="less">
  @import "../../assets/css/common";
  .people{
    line-height: 50rpx;
    .rp{
      padding: 5rpx 10rpx;
      color: white;
      background: @red;
      border-radius: 30rpx;
      vertical-align: middle;
    }
    .blue{
      margin-top: 20rpx;
    }
  }
  .search{
    padding: 20rpx;
    .borderRadius;
    .iconfont{
      .fs34;
      margin-right: 20rpx;
      vertical-align: middle;
    }

    input{
      border: none;
      outline: none;
      vertical-align: middle;
      width: 500rpx;
    }
  }
</style>
<template>
  <view class="grayBg " >
    <view class="paddingAll  bgWhite fs30">
      <text class="blue">联系人</text>
      <text @tap="getAllApartment">
        <text class="iconfont icon-right gray"></text>
          <text class="gray" :class="{'blue':showApartment.length}">{{userMessage.companyName}}</text>
      </text>
      <block wx:for="{{showApartment}}" wx:key="">
        <text  @click="searchFromTitle({{item}},{{index}})" >
          <text class="iconfont icon-right gray"></text>
          <text class="gray" wx:if="{{index==showApartment.length-1}}">{{item.name}}</text>
          <text class="blue" wx:else>{{item.name}}</text>
        </text>
      </block>


    </view>

    <!--部门-->
    <view class="marginTop bgWhite fs30">
      <block wx:for="{{companyApartment}}" wx:key="">
        <view class="borderBottom paddingAll"  @tap="selectApartment({{item}},{{index}})">
          {{item.name}}<text class="icon iconfont icon-right gray fr"></text>
        </view>
      </block>

    </view>

    <!--staff-->
    <block wx:for="{{staffList}}" wx:key="">
      <view class="borderBottom bgWhite">
        <view class="overflow paddingAll people fs30 ">
          <view >
            <image src="{{item.userAvatar||'../../assets/img/defaultHead.png'}}"  class="headPicture fl marginRight" alt="" @tap="go({{item}})"></image>
          </view>

          <view class="fl">
            <view> <text style="display: inline-block;width: 150rpx">{{item.userName}}</text> <text class="rp" wx:if="{{item.isAdmin}}">管理员</text></view>
            <view class="gray">{{item.jobTitle}}</view>
          </view>
          <a class="blue fr" href="{{'tel:'+item.userPhone}}">{{item.userPhone}}</a>
        </view>
      </view>
    </block>

  </view>
</template>

<script>
  import wepy from 'wepy';
  import input from '../../mixins/input';
  import http from '../../common/http';
  import tips from '../../common/tips';
  export default class structure extends wepy.page {
    config = {
      navigationBarTitleText: '公司架构'
    }
    components = {
    }

    data = {
      userMessage:{},
      list:[],
      staffName:'',
      showApartment:[],
      pageNumber: 1,
      pageSize: 20,
      lastPage: false,
      loading: false,
      departmentId:0,
      staffList:[],
      companyApartment:[]
    }
    mixins = [input]
    computed = {

    }

    methods = {
      go(item){
        wx.navigateTo({url:`/pages/staff/resume?id=${item.id}`});
      },
      searchFromTitle(item,index){
        if(index+1==this.showApartment.length) {
          return
        }
        let arr = this.showApartment;
        this.showApartment = [];
        for( let i=0;i<=index;i++){
          this.showApartment.push(arr[i]);
        }
        this.reset();
        this.getStaff();
        this.$apply();
      },
      getAllApartment(){
        this.departmentId=0;
        this.loading=false;
        this.reset();
        this.showApartment=[];
        this.getApartment();
        this.getManager();
        this.$apply();
      },
      selectApartment(item,index){
        this.showApartment.push(item)
        this.departmentId = item.id;
        this.reset();
        this.getApartment();

        this.getStaff();
        this.$apply();
      }
    }
    props = {

    }
    reset(){
      this.pageNumber=1;
      this.lastPage=false;
      this.staffList=[];
      this.$apply();
    }
    onReachBottom(){
      if(!this.lastPage) this.getStaff();
    }
    async getStaff(){
      let that = this;
      let res = await http.post('/user/userList', {
        departmentId :this.departmentId,
        userName :this.staffName,
        pageNumber:this.pageNumber,
        pageSize:this.pageSize
      });
      if(res.code==200000){
        that.staffList = that.staffList.concat(res.data.content);
        this.pageNumber+=1;
        if(res.data.last) {
          that.lastPage=true;
          that.loading=false;
        }
        this.$apply();
      }
    }
    async getManager(){
      let that = this;
      let  res = await http.post('/companyUser/getAdminList', {

      });
      if(res.code==200000){
        that.staffList = res.data;
        that.lastPage=true;
        this.$apply();
      }
    }
    async getApartment(){
      let that = this;
      let res = await http.post('/companyUser/listComUser', {
        departmentId :this.departmentId,
        departName:'',
        pageNumber:1,
        pageSize:1000
      });
      if(res.code==200000){
        that.companyApartment =res.data.departmentList;
        this.$apply();
      }
    }
    events = {

    }

    onLoad() {
      this.userMessage = wepy.$instance.globalData.userData;
      this.getApartment();
      this.getManager();
      this.getStaff();
    }
  }
</script>


