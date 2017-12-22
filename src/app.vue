<style lang="less">

  @import './assets/css/stylesheet.wxss';
  @import 'assets/css/common';
  @import 'assets/css/reset.wxss';

</style>

<script>
import wepy from 'wepy'
import 'wepy-async-function'
import Promise from 'promise-polyfill';
export default class extends wepy.app {
  config = {
    pages: [

      'pages/tabList/home',
      'pages/login/login',
      'pages/tabList/work',
      'pages/tabList/board',
      'pages/tabList/center',

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
    baseUrl: 'http://120.25.177.192/jfbApi'//test
//    baseUrl: 'https://jfb.vshi5.com/jfbApi';//正式
  }

  constructor () {
    super()
    this.use('promisify');
    this.use('requestfix');
  }


  onLaunch() {
    if(!wx.getStorageSync('userData')){
      wx.navigateTo({
        url: 'pages/login/login'
      })
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

  getUserInfo(cb) {
    const that = this
    if (this.globalData.userInfo) {
      return this.globalData.userInfo
    }
    wepy.getUserInfo({
      success (res) {
        that.globalData.userInfo = res.userInfo
        cb && cb(res.userInfo)
      }
    })
  }
}
</script>
