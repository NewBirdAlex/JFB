
<template>
  <view class=" " >
    <view class="jfNav fs30" >
      <block wx:for="{{idList}}" wx:key="">
        <view  @tap="selId(item,index)" :class="{'active':item.sel}">
          {{item.name}}
          <text class="iconfont icon icon-arrLeft-fill"></text>
          <!--<ul v-if="item.showNav" class="black">-->
          <!--<li v-for="(obj,index2) in item.subList" @click="selMod elType(obj)" :key="index2">{{obj.title}}</li>-->
          <!--</ul>-->
        </view>
      </block>

    </view>
    <view class="marginAll bgWhite search">
      <text class="icon iconfont icon-sousuo"></text>
      <input type="text" class="myInput fs26 marginLeft" style="width: 500rpx" placeholder="请输入你要找的关键字" >
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
      selId(item) {
        return
        this.searchKeyword = '';
        if(item.sel){
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
          this.idList.forEach(function (a) {
            a.sel = false;
          })
          item.sel = true;
          this.type = item.type;
          this.modelType = '';
          this.goReset=true;
          this.chooseMissionType();
        }
      }
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
    onLoad() {
      this.getTypeList();
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/common";
  .littleSpace{
    margin-top: 100rpx;
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
      ul{
        position: absolute;
        left:0;
        top:81rpx;
        width: 100%;
        z-index: 10;
        background: white;
        li{
          line-height: 70rpx;
          .border;
          border-top:0;
          .tac;
        }
      }
      &.active {
        color: #338ecc;
        border-bottom: 2px solid @blue;
      }

    }
  }
</style>
