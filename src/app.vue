<style lang="less">

  @import 'assets/css/stylesheet.wxss';
  @import 'assets/css/common';
  @import 'assets/css/reset.wxss';

</style>

<script>
import wepy from 'wepy'
import 'wepy-async-function'
import Promise from 'promise-polyfill';
import http from './common/http';

export default class extends wepy.app {
  config = {
    pages: [

      'pages/tabList/home',
      'pages/login/loginByWx',

      'pages/daily/dailyMenu',
      'pages/daily/dailyList',
      'pages/daily/dailyCount',


      'pages/daily/write',


      'pages/staff/baseDate',
      'pages/staff/baseInformation',

      'pages/information/structure',

      'pages/mall/lottery',
      'pages/mall/lotteryRec',
      'pages/mall/exchangeRec',

      'pages/mall/product',

      'pages/mall/mall',

      'pages/apply/check',
      'pages/apply/checkDetail',


      'pages/apply/shensuList',

      'pages/apply/shensuOrder',


      'pages/daily/philosophy',

      'pages/daily/philosophyDetail',
      'pages/apply/freePrize',
      'pages/daily/likes',
      'pages/daily/clockIn',
      'pages/daily/checkingRec',
      'pages/apply/praise',
      'pages/apply/spDetail',
      'pages/apply/missionList',
      'pages/public/announcement',
      'pages/public/announcementList',
      'pages/public/publicMission',
      'pages/public/showRange',
      'pages/apply/applyMenu',
      'pages/apply/apply',
      'pages/staff/staff',
      'pages/staff/resume',
      'pages/login/login',
      'pages/tabList/work',
      'pages/tabList/board',
      'pages/tabList/center',
      'pages/approve/approveRecord',
      'pages/approve/approveList',
      'pages/approve/order',
      'pages/index/index'
    ],
    tabBar: {
      color: '#999999',
      selectedColor:'#55caf5',
      list: [
        {
          iconPath:'assets/img/tabbar/icon_index_nor.png',
          selectedIconPath:'assets/img/tabbar/icon_index_pre.png',
          pagePath: "pages/tabList/home",
          text: "首页"
        }, {
          iconPath:'assets/img/tabbar/icon_gzt_nor.png',
          selectedIconPath:'assets/img/tabbar/icon_gzt_pre.png',
          pagePath: "pages/tabList/work",
          text: "工作台"
        }, {
          iconPath:'assets/img/tabbar/icon_jfb_nor.png',
          selectedIconPath:'assets/img/tabbar/icon_jfb_pre.png',
          pagePath: "pages/tabList/board",
          text: "积分榜"
        }, {
          iconPath:'assets/img/tabbar/icon_grzx_nor.png',
          selectedIconPath:'assets/img/tabbar/icon_grzx_pre.png',
          pagePath: "pages/tabList/center",
          text: "个人中心"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '积分宝',
      navigationBarTextStyle: 'black'
    }
  }

  globalData = {
    userInfo: null,
    userData:null,
    loadWork:true,
    firstEnter:true,
    adminStation:[
      {
        name:"发布任务",
        icon:'icon-faburenwu',
        color:'#fa6e77',
        router:'/pages/public/publicMission'
      },
      {
        name:"领导表扬",
        icon:'icon-zhicheng',
        color:'#fec170',
        router:'/pages/apply/praise?type=1'
      },
      {
        name:"管理奖扣",
        icon:'icon-guanli',
        color:'#50bee6',
        router:'/pages/apply/praise?type=2'
      },
      {
        name:"发布公告",
        icon:'icon-gonggao',
        color:'#fd8f64',
        router:'/pages/public/announcement'
      }
    ],
    myStation:[
      {
        name:"考勤",
        icon:'icon-dingweikaoqin',
        color:'#3da5d0',
        moduleCover:'http://image.vshi5.com/img_jfb/2017/10/13/e4550a4ba9814c519601e2b3c525fb90.png',
        router:'/pages/daily/clockIn',
        show:false
      },
      {
        name:"工作日志",
        icon:'icon-rizhi',
        color:'#84d76f',
        router:'/pages/daily/dailyMenu',
        show:false
      },
      {
        name:"悬赏任务",
        icon:'icon-renwuxuanshang',
        color:'#feaa3b',
        router:'/pages/apply/missionList?type=1',
        show:false
      },
      {
        name:"申报积分",
        icon:'icon-daiban',
        color:'#fe6973',
        router:'/pages/apply/applyMenu',
        show:false
      },
      {
        name:"公告",
        icon:'icon-gonggao1',
        color:'#feaa3b',
        router:'/pages/public/announcementList',
        show:false
      },
      {
        name:"爱心点赞",
        //icon:'icon-hongxin',
        icon:'icon-zuanaixinkong',
        color:'#fb3333',
        router:'/pages/daily/likes',
        show:false
      },
      {
        name:"积分申诉",
        icon:'icon-shensuzhongxin',
        color:'black',
        router:'/pages/apply/shensuList',
        show:false
      },
      {
        name:"自由奖扣",
        icon:'icon-moneychange',
        color:'#5bb3d3',
        router:'/pages/apply/freePrize',
        show:false
      },
      {
        name:"经营哲学",
        icon:'icon-kaohe',
        color:'#8ddfb9',
        router:'/pages/daily/philosophy',
        show:false
      },
      {
        name:"水平考核",
        icon:'icon-kaohe',
        color:'#78c7e3',
        router:'/pages/apply/check',
        show:false
      },
      {
        name:"积分商城",
        icon:'icon-lianmengkeyongjifen',
        color:'#fa6e77',
        router:'/pages/mall/mall',
        show:false
      },
      {
        name:"积分抽奖",
        icon:'icon-choujiang',
        color:'#feaa3b',
        router:'/pages/mall/lottery',
        show:false
      },
    ],
    //baseUrl: 'http://192.168.0.102:8888/'//利民
    baseUrl: 'http://120.78.218.32/jfbApi'//test
//    baseUrl: 'https://jfb.vshi5.com/jfbApi'//正式
  }

  constructor () {
    super();
    this.use('promisify');
    this.use('requestfix');
  }


  onLaunch() {
    // init user data
    if(!wx.getStorageSync('userData')){
      this.getUserInfo();
      return
    }else{
      wepy.$instance.globalData.userData=wx.getStorageSync('userData');
    }
    this.testAsync()
  }

  sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

  async testAsync () {
    const data = await this.sleep(3)
    console.log(data)
  }

  async getUserInfo(cb) {

    const that = this;
    if (this.globalData.userInfo) {
      console.log(this.globalData.userInfo)

      return this.globalData.userInfo
    }
    let wxcode =await wepy.login();
    console.log('wxcode='+wxcode.code);
    let userInfo = await wepy.getUserInfo();
    that.globalData.userInfo = userInfo.userInfo;
    let data = await http.post('/byWxCodeMicro',{
      "code": wxcode.code,
      "wxUserInfoStr": JSON.stringify(userInfo.userInfo)
    });
    if(data.code==600000){

      //save openid
      wx.setStorageSync('opid', data.data);
      wx.navigateTo({
        url: '/pages/login/loginByWx'
      });
    }
  }
}
</script>
