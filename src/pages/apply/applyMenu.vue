
<template>
  <view class=" " >
    <!--nav-->
    <view class="jfNav fs30" >
      <block wx:for="{{idList}}" wx:key="index" wx:for-index="index" wx:for-item="item">
        <view  @tap="selId({{index}})" :class="{'active':item.sel}">
          {{item.name}}
          <text class="iconfont icon icon-arrLeft-fill"></text>
          <view wx:if="{{item.showNav}}" class="black ul">
            <block wx:for="{{item.subList}}" wx:for-index="index2" wx:for-item="obj" wx:key="index2">
              <view class="li"  @tap="selModelType({{obj}})" >{{obj.title}}</view>
            </block>
          </view>
        </view>
      </block>

    </view>
    <!--search-->
    <view class="marginAll bgWhite search">
      <text class="icon iconfont icon-sousuo"></text>
      <input type="text" class="myInput fs26 marginLeft" value="{{searchKeyword}}" style="width: 500rpx" placeholder="请输入你要找的关键字" @input="getSearch" />
    </view>
    <!--list-->
    <view class=" grayBg">
      <block wx:for="{{list2}}" wx:key="">
        <view @tap="go({{item}})" class=" paddingAll marginBottom bgWhite lh50" >
          <view class="fs30 ">{{item.title}}</view>
          <view class="fs26 lh30 littleSpace">{{item.context}}</view>
          <view class="fs28 littleSpace">
            积分奖励：<text class="blue">{{item.minuxScore}}-{{item.maxScore}}分</text>
            <text wx:if="{{item.isOnly==1}}" class="fr gray">每天一次</text>
            <text wx:if="{{item.isOnly==2}}" class="fr gray">每周一次</text>
            <text wx:if="{{item.isOnly==3}}" class="fr gray"> 每月一次</text>
            <text wx:if="{{item.isOnly==4}}" class="fr gray">每季一次</text>
            <text wx:if="{{item.isOnly==5}}" class="fr gray">每年一次</text>
            <text wx:if="{{item.isOnly==6}}" class="fr gray"> 无限制 </text>
            <text wx:if="{{item.isOnly==7}}" class="fr gray">仅限一次</text>
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
  export default class ApplyMenu extends wepy.page {
    config = {
      navigationBarTitleText: ''
    }
    components = {
    }

    data = {
      type:1,
      showMask:false,
      searchKeyword:'',
      idList: [
        {
          type:1,
          name: '行为积分',
          sel: false,
          showNav:false,
          subList:[]
        },
        {
          type:2,
          name: '品德积分',
          sel: false,
          showNav:false,
          subList:[]
        },
        {
          type:3,
          name: '业绩积分',
          sel: false,
          showNav:false,
          subList:[]
        }
      ],
      typeList:[],
      list2:[],
      num:3,
      modelType:'',
      pageNumber:1,
      pageSize:10,
      lastPage:false,
      loading:false,
      goReset:false,
      enter:true
    }
    mixins = [input]
    computed = {

    }

    methods = {
      getSearch(event){
        console.log(event.detail.value);
        this.searchKeyword=event.detail.value;
        this.goReset=true;
        this.chooseMissionType();
      },
      selId(index) {

        let item = this.idList[index];
        console.log(item)
        console.log(item.sel)
        this.searchKeyword = '';
        if(item.sel){
          console.log(11)
          item.sel=!item.sel;
          if(item.showNav){
            item.sel=!item.sel;
            item.showNav=false;
          }else{
            item.sel=true;
            item.showNav=true;
            this.modelType='';

          }
        }else{
          console.log(22)

          this.idList.forEach(function (a) {
            a.sel = false;
          })
          item.sel = true;
          this.type = item.type;
          this.modelType = '';
          this.goReset=true;
          this.chooseMissionType();
        }
//        this.$apply();
      },
      selModelType(item){
        this.modelType=item.id;
        this.type=item.type;
        this.goReset=true;
        this.chooseMissionType();
      },
      go(item){
        console.log(item);
        wx.navigateTo({
          url: '/pages/apply/apply?mission=false&id='+item.id+'&type='+this.type//实际路径要写全
        })
      }
    }
    reset(){
      this.list2=[];
      this.pageNumber=1;
      this.lastPage=false;
    }
    async chooseMissionType(){
      let that = this;
      if(that.goReset){
        that.reset();
        that.goReset=false;
      }
      let res =await http.post('/actionList/getActionListByCompany',{
        modelType: this.modelType,
        type:this.type,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        title:this.searchKeyword
      });
      if(res.data){
        that.pageNumber+=1;
        that.list2=that.list2.concat(res.data.content);
        if(res.data.last){
          that.lastPage=true;
        }
        that.loading = false;
      }
      this.$apply();
    }
    props = {

    };
    events = {

    }
    async getTypeList(){
      let that = this;
      let res = await http.post('/actionModel/modelListByCom',{
      })
      if(res.data){
        res.data.content.forEach(item=>{
          switch (item.type){
            case 1:
              that.idList[0].subList.push(item);
              break;
            case 2:
              that.idList[1].subList.push(item);
              break;
            case 3:
              that.idList[2].subList.push(item);
              break;
          }
        });
        this.$apply();
      }
    }
    onReachBottom(){
      if(!this.lastPage&&!this.loading){
        this.chooseMissionType();
        this.loading = true;
      }else if(this.lastPage){
        this.loading = false;
      }
    }
    onLoad() {
      this.getTypeList();
      this.chooseMissionType();
      this.pageNumber=1;
      this.$apply();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .littleSpace{
    margin-top: 10rpx;
  }
  .search{
    line-height: 60rpx;
    height: 60rpx;
    .border;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 8rpx;
    i{
      .fs36;
      .marginLeft;
    }
  }
  .jfNav {
    .borderBottom;

    height: 80rpx;
    >view {
      .fl;
      width: 33%;
      .tac;

      position: relative;
      .ul{
        position: absolute;
        left:0;
        top:81rpx;
        width: 100%;
        z-index: 10;
        background: white;
        .li{
          line-height: 70rpx;
          .border;
          border-top:0;
          .tac;
        }
      }
      &.active {
        color: #338ecc;
        //border-bottom: 2px solid @blue;
      }

    }
  }
</style>
